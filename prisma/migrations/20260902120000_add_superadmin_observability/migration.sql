ALTER TABLE "market_reference_queries"
  ALTER COLUMN "categoria" DROP NOT NULL,
  ALTER COLUMN "modelo" DROP NOT NULL,
  ALTER COLUMN "modelo_norm" DROP NOT NULL;

ALTER TABLE "market_reference_queries"
  ADD COLUMN "http_status" INTEGER,
  ADD COLUMN "failure_stage" TEXT,
  ADD COLUMN "request_payload" JSONB,
  ADD COLUMN "algorithm_version" TEXT NOT NULL DEFAULT 'market-reference-v1.1',
  ADD COLUMN "criterion_code" TEXT,
  ADD COLUMN "sample_strength_code" TEXT,
  ADD COLUMN "review_status" TEXT NOT NULL DEFAULT 'unreviewed',
  ADD COLUMN "review_reason" TEXT,
  ADD COLUMN "review_notes" TEXT,
  ADD COLUMN "reviewed_at" TIMESTAMP(3),
  ADD COLUMN "reviewed_by" TEXT,
  ADD COLUMN "alert_queued_at" TIMESTAMP(3);

UPDATE "market_reference_queries"
SET
  "http_status" = CASE WHEN "status" = 'success' THEN 200 ELSE NULL END,
  "algorithm_version" = COALESCE("algorithm_version", 'market-reference-v1.1')
WHERE "http_status" IS NULL OR "algorithm_version" IS NULL;

CREATE INDEX "market_reference_queries_status_created_at_idx"
ON "market_reference_queries"("status", "created_at");

CREATE INDEX "market_reference_queries_review_status_created_at_idx"
ON "market_reference_queries"("review_status", "created_at");

CREATE INDEX "market_reference_queries_error_code_created_at_idx"
ON "market_reference_queries"("error_code", "created_at");
