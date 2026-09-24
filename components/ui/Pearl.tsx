/**
 * §2.1 — the hero object.
 *
 * Moti Mahal means Pearl Palace. A pearl is formed by an irritant wrapped in
 * layer after layer of nacre until it becomes luminous. It is the opposite of
 * glass-tower luxury: warm, organic, made slowly.
 *
 * The mountains are inside it. The hills, held.
 */
export default function Pearl({ className = "" }: { className?: string }) {
  return (
    <div className={`pearl ${className}`} aria-hidden="true">
      <div className="pearl-shell">
        <div className="pearl-nacre" />
      </div>
      <div className="pearl-horizon" />
      <div className="pearl-rim" />
      <div className="pearl-spec" />
    </div>
  );
}
