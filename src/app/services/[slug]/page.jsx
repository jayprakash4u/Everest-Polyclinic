import { notFound } from "next/navigation";
import ServiceDetailView from "@/components/services/ServiceDetailView";
import {
  getAllServiceSlugs,
  getServiceBySlug,
} from "@/lib/data/services";

export async function generateStaticParams() {
  const slugs = await getAllServiceSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);

  if (!service) {
    return { title: "Service Not Found" };
  }

  return {
    title: `${service.title} - Everest International Polyclinic`,
    description: service.shortDescription,
  };
}

export default async function ServiceSlugPage({ params }) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  return <ServiceDetailView service={service} />;
}
