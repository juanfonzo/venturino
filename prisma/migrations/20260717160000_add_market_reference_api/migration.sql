CREATE TABLE "market_reference_queries" (
  "id" SERIAL NOT NULL,
  "client_id" TEXT NOT NULL,
  "request_id" TEXT NOT NULL,
  "external_operation_id" TEXT,
  "mode" TEXT NOT NULL,
  "categoria" TEXT NOT NULL,
  "marca" TEXT,
  "marca_norm" TEXT,
  "modelo" TEXT NOT NULL,
  "modelo_norm" TEXT NOT NULL,
  "anio" INTEGER,
  "page" INTEGER,
  "page_size" INTEGER,
  "status" TEXT NOT NULL DEFAULT 'processing',
  "result_count" INTEGER NOT NULL DEFAULT 0,
  "result_summary" JSONB,
  "error_code" TEXT,
  "duration_ms" INTEGER,
  "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "completed_at" TIMESTAMP(3),
  CONSTRAINT "market_reference_queries_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "market_reference_queries_client_id_request_id_key"
ON "market_reference_queries"("client_id", "request_id");

CREATE INDEX "market_reference_queries_created_at_idx"
ON "market_reference_queries"("created_at");

CREATE INDEX "market_reference_queries_external_operation_id_idx"
ON "market_reference_queries"("external_operation_id");

CREATE INDEX "market_reference_queries_mode_status_idx"
ON "market_reference_queries"("mode", "status");

CREATE INDEX "listings_market_reference_idx"
ON "listings"("active", "categoria", "condicion", "marca_norm", "modelo_norm");
