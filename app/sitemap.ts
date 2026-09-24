import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { rooms } from "@/content/rooms";
import { journeys } from "@/content/journeys";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const page = (path: string, priority: number, changeFrequency: "daily" | "weekly" | "monthly") => ({
    url: `${site.url}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
  });

  return [
    page("/", 1, "weekly"),
    page("/rooms", 0.9, "monthly"),
    ...rooms.map((r) => page(`/rooms/${r.slug}`, 0.8, "monthly")),
    page("/dining/restaurant", 0.8, "monthly"),
    page("/dining/cafe", 0.7, "monthly"),
    page("/chocolate", 0.6, "monthly"),
    page("/journeys", 0.8, "monthly"),
    ...journeys.map((j) => page(`/journeys/${j.slug}`, 0.9, "monthly")),
    page("/gallery", 0.5, "monthly"),
    page("/about", 0.5, "monthly"),
    page("/contact", 0.7, "monthly"),
    page("/book", 0.9, "weekly"),
  ];
}
