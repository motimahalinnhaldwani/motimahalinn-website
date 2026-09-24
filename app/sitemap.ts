import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { rooms } from "@/content/rooms";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const page = (path: string, priority: number) => ({
    url: `${site.url}${path}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority,
  });
  return [
    page("/", 1),
    page("/rooms", 0.9),
    ...rooms.map((r) => page(`/rooms/${r.slug}`, 0.8)),
    page("/dining/restaurant", 0.9),
    page("/book", 0.9),
    page("/contact", 0.7),
    page("/gallery", 0.5),
    page("/about", 0.5),
  ];
}
