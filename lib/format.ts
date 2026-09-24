/** Bare figure with Indian grouping, for places the ₹ is already set in type. */
export const figure = (n: number) => new Intl.NumberFormat("en-IN").format(n);

export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
export const clamp = (v: number, min = 0, max = 1) => Math.min(max, Math.max(min, v));

/** Price with the rupee sign and Indian grouping: 12500 → "₹12,500". */
export const rupees = (n: number) => `₹${figure(n)}`;
