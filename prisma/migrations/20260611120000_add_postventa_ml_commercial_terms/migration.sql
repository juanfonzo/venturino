ALTER TABLE "postventa_products"
ADD COLUMN "installment_total_ars" DECIMAL(14,2),
ADD COLUMN "installments_quantity" INTEGER,
ADD COLUMN "free_shipping" BOOLEAN;

ALTER TABLE "postventa_price_snapshots"
ADD COLUMN "installment_total_ars" DECIMAL(14,2),
ADD COLUMN "installments_quantity" INTEGER,
ADD COLUMN "free_shipping" BOOLEAN;

ALTER TABLE "postventa_match_candidates"
ADD COLUMN "ml_installment_total_ars" DECIMAL(14,2),
ADD COLUMN "ml_installments_quantity" INTEGER,
ADD COLUMN "ml_free_shipping" BOOLEAN;
