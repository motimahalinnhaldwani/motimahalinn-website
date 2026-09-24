import { site } from "@/content/site";

/**
 * The real Google map, pinned on "Motimahal Inn Hotel". `loading="lazy"` keeps
 * it off the network until the visitor scrolls near it.
 */
export default function MapEmbed() {
  return (
    <iframe
      title="Google Map showing Motimahal Inn Hotel on Nainital Road, Haldwani"
      src={`https://maps.google.com/maps?q=${encodeURIComponent("Motimahal Inn Hotel, Haldwani")}&ll=${site.geo.lat},${site.geo.lng}&z=17&output=embed`}
      className="h-[26rem] w-full rounded-sm border-0"
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    />
  );
}
