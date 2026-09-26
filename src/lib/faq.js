/*
 * Turns the FAQ part of rich-text content into an accordion.
 *
 * The content writes FAQs in several ways:
 *   <p><strong>Q: …?</strong><br>A: …</p>                    (one Q&A per paragraph)
 *   <p><strong>Q: …?</strong><br>A: …<br><br><strong>Q: …   (all Q&As in one paragraph)
 *   <strong>Q: …?</strong><p>…</p>                           (answer in the next paragraph)
 *   <strong>Q. …?</strong>answer text&nbsp;<strong>Q. …      (bare answer text)
 * Every question is a <strong> ending in "?" that follows an "FAQ" / "Frequently Asked Questions" heading,
 * so that is what we split on. Answers keep their inline markup (links, bold text).
 */

const FAQ_HEADING = /<(h[2-6])(\s[^>]*)?>((?:(?!<\/h[2-6]>)[\s\S])*?(?:FAQ|Frequently Asked Questions)(?:(?!<\/h[2-6]>)[\s\S])*?)<\/\1>/i;
const QUESTION = /<strong>\s*((?:[^<]|<br\s*\/?>){3,}?\?)\s*(?:<br\s*\/?>\s*)*<\/strong>/g;

function cleanQuestion(text) {
  return text
    .replace(/&nbsp;|<br\s*\/?>/g, " ")
    .replace(/^\s*(Q\s*\d*\s*[:.]|\d+\s*[.)])\s*/i, "")
    .trim();
}

function cleanAnswer(html) {
  const parts = html
    .replace(/&nbsp;/g, " ")
    .replace(/<\/?p>/g, "\n\n")
    .replace(/(<br\s*\/?>\s*){2,}/g, "\n\n")
    .split(/\n{2,}/)
    .map((s) => s.replace(/^(\s|<br\s*\/?>)+|(\s|<br\s*\/?>)+$/g, "").replace(/^A\s*[:.]\s*/i, ""))
    .filter((s) => s.replace(/<[^>]+>/g, "").trim());
  return parts.map((s) => `<p>${s}</p>`).join("");
}

function toAccordion(region) {
  const matches = [...region.matchAll(QUESTION)];
  if (matches.length < 2) return null;

  // Anything before the first question (e.g. an intro line) stays as normal content
  const before = region.slice(0, matches[0].index).replace(/<p>\s*$/, "");
  const items = matches.map((m, i) => {
    const start = m.index + m[0].length;
    const end = i + 1 < matches.length ? matches[i + 1].index : region.length;
    return { q: cleanQuestion(m[1]), a: cleanAnswer(region.slice(start, end)) };
  });

  const list = items
    .map(
      (it, i) =>
        `<details class="faq-item"${i === 0 ? " open" : ""}><summary><span>${it.q}</span></summary><div class="faq-answer">${it.a}</div></details>`
    )
    .join("");
  return `${before}<div class="faq-list">${list}</div>`;
}

export function withFaqAccordion(html) {
  const heading = html.match(FAQ_HEADING);
  if (!heading) return html;

  const regionStart = heading.index + heading[0].length;
  const next = html.slice(regionStart).search(/<h[2-4][\s>]/);
  const regionEnd = next === -1 ? html.length : regionStart + next;

  const accordion = toAccordion(html.slice(regionStart, regionEnd));
  if (!accordion) return html;
  return html.slice(0, regionStart) + accordion + html.slice(regionEnd);
}
