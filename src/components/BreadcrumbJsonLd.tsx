import { JsonLd } from "@/components/JsonLd";
import {
  buildBreadcrumbSchema,
  type BreadcrumbItem,
} from "@/lib/breadcrumbs";

type BreadcrumbJsonLdProps = {
  items: BreadcrumbItem[];
};

export function BreadcrumbJsonLd({ items }: BreadcrumbJsonLdProps) {
  return <JsonLd data={buildBreadcrumbSchema(items)} />;
}
