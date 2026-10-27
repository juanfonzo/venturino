ALTER TABLE "postventa_analysis_runs"
ADD COLUMN "similarity_threshold" DECIMAL(5,4) NOT NULL DEFAULT 0.1;
