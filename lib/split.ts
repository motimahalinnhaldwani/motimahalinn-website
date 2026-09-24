/**
 * Line splitter.
 *
 * §5.3 — split by line, never by character. Devanagari is written in grapheme
 * clusters that a naive character split shatters (क + ि is one cluster, and
 * reordering vowels are not separable from their consonant at all). Splitting
 * only on whitespace is correct for both scripts by construction: it can never
 * fall inside a cluster, because whitespace is never inside one.
 *
 * Inline structure is preserved. A <em> or a <span lang="hi"> that straddles a
 * line break is cloned into both lines rather than dropped.
 */

const WORD_ATTR = "data-w";
/* Marks a word that was genuinely followed by whitespace in the source. */
const SPACE_ATTR = "data-sp";
const SID_ATTR = "data-sid";

let sidCounter = 0;

function isBlock(el: Element) {
  const d = getComputedStyle(el).display;
  return d !== "inline" && d !== "inline-block" && d !== "contents";
}

function wrapWords(root: HTMLElement) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  const texts: Text[] = [];
  let n = walker.nextNode();
  while (n) {
    /* Whitespace-only nodes are collected too. JSX renders `of{" "}` as a text
       node containing just a space, and skipping it would weld the next word
       onto the previous one. */
    if (n.nodeValue) texts.push(n as Text);
    n = walker.nextNode();
  }

  /* Tracked across the whole walk, not per text node. React renders `#{n}` as
     two adjacent text nodes with no whitespace between them, and so does
     `{place}, which…` — re-inserting a space between every pair of words would
     turn those into "# 14" and "Haldwani ,". */
  let lastWord: HTMLElement | null = null;

  for (const text of texts) {
    const parent = text.parentElement;
    if (!parent) continue;

    /* Tag every inline ancestor so lines can rebuild the chain. */
    let a: HTMLElement | null = parent;
    while (a && a !== root) {
      if (!a.getAttribute(SID_ATTR)) a.setAttribute(SID_ATTR, `s${sidCounter++}`);
      a = a.parentElement;
    }

    const frag = document.createDocumentFragment();
    for (const chunk of text.nodeValue!.split(/(\s+)/)) {
      if (!chunk) continue;
      if (/^\s+$/.test(chunk)) {
        lastWord?.setAttribute(SPACE_ATTR, "");
        frag.appendChild(document.createTextNode(" "));
      } else {
        const span = document.createElement("span");
        span.setAttribute(WORD_ATTR, "");
        span.style.display = "inline-block";
        span.textContent = chunk;
        frag.appendChild(span);
        lastWord = span;
      }
    }
    text.replaceWith(frag);
  }
}

function buildLines(root: HTMLElement): HTMLElement[] {
  const words = Array.from(root.querySelectorAll<HTMLElement>(`[${WORD_ATTR}]`));
  if (!words.length) return [];

  /* Group by vertical position. 2px of tolerance absorbs sub-pixel baselines
     and any inline element with a slightly different font size. */
  const lines: HTMLElement[][] = [];
  let currentTop = Number.NEGATIVE_INFINITY;
  for (const w of words) {
    const top = w.getBoundingClientRect().top;
    if (top - currentTop > 2) {
      lines.push([]);
      currentTop = top;
    }
    lines[lines.length - 1].push(w);
  }

  const frag = document.createDocumentFragment();
  const inners: HTMLElement[] = [];

  for (const line of lines) {
    const mask = document.createElement("span");
    mask.className = "line-mask";
    const inner = document.createElement("span");
    inner.className = "line-inner";
    mask.appendChild(inner);

    line.forEach((word) => {
      const chain: HTMLElement[] = [];
      let p = word.parentElement;
      while (p && p !== root) {
        chain.unshift(p);
        p = p.parentElement;
      }

      let target: HTMLElement = inner;
      for (const anc of chain) {
        const sid = anc.getAttribute(SID_ATTR);
        const last = target.lastElementChild as HTMLElement | null;
        if (last && last.getAttribute(SID_ATTR) === sid) {
          target = last;
        } else {
          const clone = anc.cloneNode(false) as HTMLElement;
          target.appendChild(clone);
          target = clone;
        }
      }

      word.style.display = "";
      const spaced = word.hasAttribute(SPACE_ATTR);
      target.appendChild(word);
      /* The space goes in even at the end of a line. Without it, textContent —
         and therefore copy-paste and anything reading the DOM — welds the last
         word of one line onto the first of the next ("lightof the plains").
         CSS drops trailing white space at the end of a line box, so this costs
         nothing visually, including in centred text. */
      if (spaced) target.appendChild(document.createTextNode(" "));
    });

    frag.appendChild(mask);
    inners.push(inner);
  }

  root.replaceChildren(frag);
  return inners;
}

/**
 * Splits `root` into `.line-mask > .line-inner` pairs and returns the inners,
 * in document order, ready to animate. Recurses into block-level children so a
 * multi-paragraph passage works without extra ceremony.
 */
export function splitIntoLines(root: HTMLElement): HTMLElement[] {
  const blockChildren = Array.from(root.children).filter(isBlock) as HTMLElement[];

  if (blockChildren.length) {
    return blockChildren.flatMap((child) => splitIntoLines(child));
  }

  wrapWords(root);
  return buildLines(root);
}
