import { Badge } from "@/components/ui/Badge";
import {
  REVIEW_STATUS_LABELS,
  type ReviewStatus,
} from "@/lib/superadmin/review";

export function QueryStatusBadge({ status }: { status: string }) {
  if (status === "success") return <Badge variant="green">Correcta</Badge>;
  if (status === "error") return <Badge variant="red">Error</Badge>;
  return <Badge variant="yellow">Procesando</Badge>;
}

export function QueryReviewBadge({ status }: { status: string }) {
  const label = REVIEW_STATUS_LABELS[status as ReviewStatus] || "Sin revisar";
  if (status === "correct") return <Badge variant="green">{label}</Badge>;
  if (status === "incorrect") return <Badge variant="red">{label}</Badge>;
  if (status === "review") return <Badge variant="yellow">{label}</Badge>;
  return <Badge variant="muted">{label}</Badge>;
}
