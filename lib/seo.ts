import { site, amenities, distances, meals } from "@/content/site";
import { rooms } from "@/content/rooms";
import { restaurant, cafe } from "@/content/menu";

const postal = {
  "@type": "PostalAddress",
  streetAddress: site.address.street,
  addressLocality: site.address.locality,
  addressRegion: site.address.region,
  postalCode: site.address.postalCode,
  addressCountry: site.address.country,
};

export function hotelSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Hotel",
    "@id": `${site.url}/#hotel`,
    name: site.name,
    description: site.description,
    url: site.url,
    telephone: site.phone,
    address: postal,
    geo: {
      "@type": "GeoCoordinates",
      latitude: site.geo.lat,
      longitude: site.geo.lng,
    },
    starRating: { "@type": "Rating", ratingValue: site.stars },
    currenciesAccepted: "INR",
    checkinTime: site.checkIn,
    checkoutTime: site.checkOut,
    numberOfRooms: rooms.length,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: site.rating.value,
      reviewCount: site.rating.count,
      bestRating: 5,
    },
    amenityFeature: amenities.map((a) => ({
      "@type": "LocationFeatureSpecification",
      name: a,
      value: true,
    })),
    subOrganization: [{ "@type": "Restaurant", name: restaurant.name }],
  };
}

export function restaurantSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "@id": `${site.url}/dining/restaurant#restaurant`,
    name: restaurant.name,
    servesCuisine: [...restaurant.cuisines],
    address: postal,
    telephone: site.phone,
    priceRange: "₹₹",
    url: `${site.url}/dining/restaurant`,
    openingHoursSpecification: meals.map((m) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: m.from.padStart(5, "0"),
      closes: m.to.padStart(5, "0"),
    })),
  };
}

export function cafeSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "CafeOrCoffeeShop",
    "@id": `${site.url}/dining/cafe#cafe`,
    name: cafe.name,
    servesCuisine: [...cafe.cuisines],
    address: postal,
    telephone: site.phone,
    priceRange: "₹₹",
    url: `${site.url}/dining/cafe`,
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: cafe.hours.from.padStart(5, "0"),
      closes: cafe.hours.to.padStart(5, "0"),
    },
  };
}

export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${site.url}/#business`,
    name: site.name,
        address: postal,
    telephone: site.phone,
    url: site.url,
    geo: {
      "@type": "GeoCoordinates",
      latitude: site.geo.lat,
      longitude: site.geo.lng,
    },
    hasMap: `https://www.google.com/maps/search/?api=1&query=${site.geo.lat},${site.geo.lng}`,
  };
}

export function faqSchema(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function breadcrumbSchema(trail: { name: string; href: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((t, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: t.name,
      item: `${site.url}${t.href}`,
    })),
  };
}

/** The distances are the proposition — say them to the crawler too. §9 */
export const distanceFaqs = distances.map((d) => ({
  q: `How far is ${site.name} from ${d.place}?`,
  a: `${d.display}. ${d.note}`,
}));
