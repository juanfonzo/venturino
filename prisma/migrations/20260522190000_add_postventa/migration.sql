-- CreateTable
CREATE TABLE "postventa_import_runs" (
    "id" SERIAL NOT NULL,
    "mongo_db" TEXT NOT NULL DEFAULT 'algorym',
    "mongo_collection" TEXT NOT NULL DEFAULT 'productos',
    "venturino_date" DATE,
    "ml_date" DATE,
    "source_count" INTEGER NOT NULL DEFAULT 0,
    "venturino_count" INTEGER NOT NULL DEFAULT 0,
    "ml_count" INTEGER NOT NULL DEFAULT 0,
    "new_count" INTEGER NOT NULL DEFAULT 0,
    "updated_count" INTEGER NOT NULL DEFAULT 0,
    "deactivated_count" INTEGER NOT NULL DEFAULT 0,
    "snapshots_created" INTEGER NOT NULL DEFAULT 0,
    "snapshots_updated" INTEGER NOT NULL DEFAULT 0,
    "status" TEXT NOT NULL DEFAULT 'success',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "postventa_import_runs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "postventa_products" (
    "id" SERIAL NOT NULL,
    "source" TEXT NOT NULL,
    "external_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price_ars" DECIMAL(14,2),
    "price_text" TEXT,
    "currency" TEXT,
    "url" TEXT,
    "category_ml" TEXT,
    "scraping_date" DATE,
    "scraped_at" TIMESTAMP(3),
    "active" BOOLEAN NOT NULL DEFAULT true,
    "first_seen_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "last_seen_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "last_import_run_id" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "postventa_products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "postventa_price_snapshots" (
    "id" SERIAL NOT NULL,
    "product_id" INTEGER NOT NULL,
    "import_run_id" INTEGER NOT NULL,
    "snapshot_date" DATE NOT NULL,
    "name" TEXT NOT NULL,
    "price_ars" DECIMAL(14,2),
    "price_text" TEXT,
    "url" TEXT,
    "active_in_run" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "postventa_price_snapshots_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "postventa_analysis_runs" (
    "id" SERIAL NOT NULL,
    "import_run_id" INTEGER,
    "algorithm_version" TEXT NOT NULL DEFAULT 'postventa-v0',
    "price_band" DECIMAL(5,4) NOT NULL DEFAULT 0.4,
    "top_n" INTEGER NOT NULL DEFAULT 20,
    "min_score" INTEGER NOT NULL DEFAULT 20,
    "venturino_date" DATE,
    "ml_date" DATE,
    "status" TEXT NOT NULL DEFAULT 'success',
    "summary" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "postventa_analysis_runs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "postventa_product_analyses" (
    "id" SERIAL NOT NULL,
    "analysis_run_id" INTEGER NOT NULL,
    "venturino_product_id" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "median_ml_price_ars" DECIMAL(14,2),
    "vent_vs_median_pct" DECIMAL(8,4),
    "best_confidence" TEXT NOT NULL,
    "strong_candidate_count" INTEGER NOT NULL DEFAULT 0,
    "total_candidates" INTEGER NOT NULL DEFAULT 0,
    "excluded_by_price" INTEGER NOT NULL DEFAULT 0,
    "excluded_by_score" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "postventa_product_analyses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "postventa_match_candidates" (
    "id" SERIAL NOT NULL,
    "product_analysis_id" INTEGER NOT NULL,
    "ml_product_id" INTEGER NOT NULL,
    "rank" INTEGER NOT NULL,
    "score" INTEGER NOT NULL,
    "confidence" TEXT NOT NULL,
    "ml_price_ars" DECIMAL(14,2) NOT NULL,
    "diff_pct" DECIMAL(8,4) NOT NULL,
    "reasons" JSONB NOT NULL,

    CONSTRAINT "postventa_match_candidates_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "postventa_import_runs_venturino_date_idx" ON "postventa_import_runs"("venturino_date");
CREATE INDEX "postventa_import_runs_ml_date_idx" ON "postventa_import_runs"("ml_date");
CREATE INDEX "postventa_import_runs_status_idx" ON "postventa_import_runs"("status");

CREATE UNIQUE INDEX "postventa_products_source_external_id_key" ON "postventa_products"("source", "external_id");
CREATE INDEX "postventa_products_source_active_idx" ON "postventa_products"("source", "active");
CREATE INDEX "postventa_products_name_idx" ON "postventa_products"("name");
CREATE INDEX "postventa_products_price_ars_idx" ON "postventa_products"("price_ars");
CREATE INDEX "postventa_products_scraping_date_idx" ON "postventa_products"("scraping_date");
CREATE INDEX "postventa_products_last_import_run_id_idx" ON "postventa_products"("last_import_run_id");

CREATE UNIQUE INDEX "postventa_price_snapshots_product_id_snapshot_date_key" ON "postventa_price_snapshots"("product_id", "snapshot_date");
CREATE INDEX "postventa_price_snapshots_product_id_idx" ON "postventa_price_snapshots"("product_id");
CREATE INDEX "postventa_price_snapshots_snapshot_date_idx" ON "postventa_price_snapshots"("snapshot_date");
CREATE INDEX "postventa_price_snapshots_import_run_id_idx" ON "postventa_price_snapshots"("import_run_id");

CREATE INDEX "postventa_analysis_runs_import_run_id_idx" ON "postventa_analysis_runs"("import_run_id");
CREATE INDEX "postventa_analysis_runs_created_at_idx" ON "postventa_analysis_runs"("created_at");
CREATE INDEX "postventa_analysis_runs_status_idx" ON "postventa_analysis_runs"("status");

CREATE UNIQUE INDEX "postventa_product_analyses_analysis_run_id_venturino_product_id_key" ON "postventa_product_analyses"("analysis_run_id", "venturino_product_id");
CREATE INDEX "postventa_product_analyses_status_idx" ON "postventa_product_analyses"("status");
CREATE INDEX "postventa_product_analyses_best_confidence_idx" ON "postventa_product_analyses"("best_confidence");
CREATE INDEX "postventa_product_analyses_vent_vs_median_pct_idx" ON "postventa_product_analyses"("vent_vs_median_pct");

CREATE UNIQUE INDEX "postventa_match_candidates_product_analysis_id_rank_key" ON "postventa_match_candidates"("product_analysis_id", "rank");
CREATE UNIQUE INDEX "postventa_match_candidates_product_analysis_id_ml_product_id_key" ON "postventa_match_candidates"("product_analysis_id", "ml_product_id");
CREATE INDEX "postventa_match_candidates_ml_product_id_idx" ON "postventa_match_candidates"("ml_product_id");
CREATE INDEX "postventa_match_candidates_confidence_idx" ON "postventa_match_candidates"("confidence");

-- AddForeignKey
ALTER TABLE "postventa_products" ADD CONSTRAINT "postventa_products_last_import_run_id_fkey" FOREIGN KEY ("last_import_run_id") REFERENCES "postventa_import_runs"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "postventa_price_snapshots" ADD CONSTRAINT "postventa_price_snapshots_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "postventa_products"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "postventa_price_snapshots" ADD CONSTRAINT "postventa_price_snapshots_import_run_id_fkey" FOREIGN KEY ("import_run_id") REFERENCES "postventa_import_runs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "postventa_analysis_runs" ADD CONSTRAINT "postventa_analysis_runs_import_run_id_fkey" FOREIGN KEY ("import_run_id") REFERENCES "postventa_import_runs"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "postventa_product_analyses" ADD CONSTRAINT "postventa_product_analyses_analysis_run_id_fkey" FOREIGN KEY ("analysis_run_id") REFERENCES "postventa_analysis_runs"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "postventa_product_analyses" ADD CONSTRAINT "postventa_product_analyses_venturino_product_id_fkey" FOREIGN KEY ("venturino_product_id") REFERENCES "postventa_products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "postventa_match_candidates" ADD CONSTRAINT "postventa_match_candidates_product_analysis_id_fkey" FOREIGN KEY ("product_analysis_id") REFERENCES "postventa_product_analyses"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "postventa_match_candidates" ADD CONSTRAINT "postventa_match_candidates_ml_product_id_fkey" FOREIGN KEY ("ml_product_id") REFERENCES "postventa_products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
