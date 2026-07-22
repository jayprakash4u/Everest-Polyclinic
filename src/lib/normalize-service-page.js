function splitAbout(text = "") {
  return String(text)
    .split(/\n\n+/)
    .map((part) => part.trim())
    .filter(Boolean)
    .slice(0, 2);
}

function buildOfferingDescription(title) {
  return `Professional ${title.toLowerCase()} delivered with care and clinical precision.`;
}

function normalizeOfferings(service) {
  if (service.serviceOfferings?.length) {
    return service.serviceOfferings;
  }

  const treatments = service.treatments ?? [];
  return treatments.map((title) => ({
    icon: service.icon,
    iconSet: "lucide",
    title,
    description: buildOfferingDescription(title),
  }));
}

function normalizeWhyChooseUs(items = []) {
  return items.map((item) => {
    if (typeof item === "string") {
      return { title: item, description: "", icon: null, iconSet: "lucide" };
    }
    return {
      title: item.title,
      description: item.description ?? "",
      icon: item.icon ?? null,
      iconSet: item.iconSet ?? "lucide",
    };
  });
}

function normalizeFeatures(features = []) {
  return features.map((item) =>
    typeof item === "string"
      ? { label: item, icon: "stethoscope", iconSet: "lucide" }
      : item,
  );
}

export function normalizeServicePage(service) {
  if (!service) return null;

  const aboutSource = service.about ?? "";
  const heroHighlights = service.hero?.highlights ?? [];

  const hero = {
    eyebrow: service.hero?.eyebrow ?? null,
    title: service.hero?.title ?? service.title,
    headline: service.hero?.headline ?? null,
    description: service.hero?.description ?? "",
    image: service.hero?.image ?? service.heroSideImage ?? "/images/doctorchecking.jpg",
    highlights: heroHighlights.slice(0, 4),
    features: normalizeFeatures(service.hero?.features ?? []),
    secondaryCtaLabel: service.hero?.secondaryCtaLabel ?? "Call Now",
    primaryCtaLabel: service.hero?.primaryCtaLabel ?? "Book Appointment",
  };

  const cta = {
    title: service.cta?.title ?? `Need ${service.title} Consultation?`,
    subtitle: service.cta?.subtitle ?? "Book an appointment with our experienced doctors today.",
    image: service.cta?.image ?? hero.image,
    buttonLabel: service.cta?.buttonLabel ?? "Book Appointment",
  };

  const sections = {
    about: {
      eyebrow: service.sections?.about?.eyebrow ?? null,
      title: service.sections?.about?.title ?? `About ${service.title}`,
      subtitle: service.sections?.about?.subtitle ?? null,
    },
    offerings: {
      eyebrow: service.sections?.offerings?.eyebrow ?? null,
      title: service.sections?.offerings?.title ?? "Services We Offer",
      subtitle:
        service.sections?.offerings?.subtitle ??
        "Comprehensive care pathways tailored to your health needs.",
    },
    whyChooseUs: {
      eyebrow: service.sections?.whyChooseUs?.eyebrow ?? null,
      title: service.sections?.whyChooseUs?.title ?? "Why Choose Our Clinic",
      subtitle: service.sections?.whyChooseUs?.subtitle ?? null,
    },
    faq: {
      eyebrow: service.sections?.faq?.eyebrow ?? null,
      title: service.sections?.faq?.title ?? "Have Questions?",
      subtitle:
        service.sections?.faq?.subtitle ??
        "Clear answers to help you prepare for your visit.",
      image: service.sections?.faq?.image ?? null,
    },
  };

  return {
    slug: service.slug,
    title: service.title,
    icon: service.icon,
    hero,
    about: splitAbout(aboutSource),
    aboutBenefits: service.aboutBenefits ?? [],
    conditions: service.conditions ?? [],
    offerings: normalizeOfferings(service),
    whyChooseUs: normalizeWhyChooseUs(service.whyChooseUs ?? []),
    faqs: service.faqs?.length ? service.faqs : [],
    cta,
    sections,
  };
}
