import { ServiceCard } from "@/components/shared/service-card";
import { getServiceSummaries } from "@/content/services";

export function ServicesGrid() {
  const services = getServiceSummaries();
  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {services.map((service) => (
        <ServiceCard key={service.slug} service={service} variant="compact" />
      ))}
    </div>
  );
}
