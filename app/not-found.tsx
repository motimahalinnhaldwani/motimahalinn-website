import { AipanMotif } from "@/components/ui/AipanMotif";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="shell flex min-h-[80svh] flex-col items-center justify-center text-center">
      <AipanMotif variant="chowki" className="h-28 w-28 text-geru/50" />
      <h1 className="display-lg mt-8 max-w-[16ch] text-rice">
        This road does not go anywhere.
      </h1>
      <p className="lede measure mt-5">
        Which happens in the hills too. Here are the ways back down.
      </p>
      <div className="mt-9 flex flex-wrap justify-center gap-3">
        <Button href="/">Home</Button>
        <Button href="/rooms" variant="ghost">
          Rooms
        </Button>
        <Button href="/dining/restaurant" variant="ghost">
          Restaurant
        </Button>
      </div>
    </section>
  );
}
