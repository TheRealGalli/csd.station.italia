// Converts React's generated, trusted HTML. No fetching, extra runtime package, or duplicated content.
export function htmlToMarkdown(html) {
  const stack = [];
  const pieces = [];
  const voidTags = new Set(['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr']);
  const omitted = new Set(['svg', 'script', 'style', 'button', 'nav']);
  const blocks = new Set(['p', 'div', 'section', 'article', 'details', 'summary', 'dl', 'dt', 'dd', 'li']);
  for (const token of html.match(/<!--[\s\S]*?-->|<[^>]+>|[^<]+/g) || []) {
    if (token.startsWith('<!--')) continue;
    const tag = token.match(/^<(\/?)\s*([\w-]+)/);
    if (!tag) {
      if (!stack.at(-1)?.skip) pieces.push(token);
      continue;
    }
    const name = tag[2].toLowerCase();
    if (tag[1]) {
      const item = stack.pop();
      if (!item?.skip && (name === 'span' || name === 'small')) pieces.push(' ');
      if (!item?.skip && (blocks.has(name) || /^h[1-6]$/.test(name))) pieces.push('\n\n');
      continue;
    }
    const skip = Boolean(stack.at(-1)?.skip || omitted.has(name) || /aria-hidden="true"/.test(token));
    if (!skip) {
      if (/^h[1-6]$/.test(name)) pieces.push(`\n\n${'#'.repeat(Math.min(Number(name[1]) + 1, 6))} `);
      else if (name === 'br') pieces.push(' ');
      else if (name === 'li') pieces.push('\n- ');
      else if (blocks.has(name)) pieces.push('\n\n');
    }
    if (!voidTags.has(name)) stack.push({ name, skip });
  }
  return pieces.join('').replace(/&(#x[\da-f]+|#\d+|amp|lt|gt|quot|apos);/gi, (_, entity) => {
    const entities = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'" };
    if (entity.startsWith('#')) return String.fromCodePoint(entity[1] === 'x' ? parseInt(entity.slice(2), 16) : Number(entity.slice(1)));
    return entities[entity];
  }).replace(/[ \t]+/g, ' ').replace(/ *\n */g, '\n').replace(/\n{3,}/g, '\n\n').trim();
}
