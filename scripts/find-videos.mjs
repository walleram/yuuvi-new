#!/usr/bin/env node
const queries = process.argv.slice(2);

if (queries.length === 0) {
  console.error('Uso: node scripts/find-videos.mjs "tendencias moda 2026" "gaming 2026"');
  process.exit(1);
}

const headers = {
  'User-Agent':
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36',
  'Accept-Language': 'es-ES,es;q=0.9',
};

function* walk(node) {
  if (Array.isArray(node)) {
    for (const child of node) yield* walk(child);
    return;
  }
  if (!node || typeof node !== 'object') return;
  if (node.videoRenderer) yield node.videoRenderer;
  for (const value of Object.values(node)) yield* walk(value);
}

function text(value) {
  if (!value) return '';
  if (typeof value.simpleText === 'string') return value.simpleText;
  if (Array.isArray(value.runs)) return value.runs.map((run) => run.text ?? '').join('');
  return '';
}

async function search(query) {
  const url = `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`;
  const response = await fetch(url, { headers });
  const html = await response.text();
  const match = html.match(/var ytInitialData = (\{.*?\});<\/script>/s);
  if (!match) return [];

  const data = JSON.parse(match[1]);
  const results = [];
  const seen = new Set();

  for (const video of walk(data)) {
    const id = video.videoId;
    if (!id || seen.has(id)) continue;
    seen.add(id);
    results.push({
      id,
      title: text(video.title),
      channel: text(video.ownerText),
      views: text(video.viewCountText),
      duration: text(video.lengthText),
    });
    if (results.length >= 10) break;
  }

  return results;
}

for (const query of queries) {
  console.log(`\n# ${query}`);
  const results = await search(query);
  if (results.length === 0) {
    console.log('Sin resultados.');
    continue;
  }
  for (const video of results) {
    console.log(
      [video.id, video.title, video.channel, video.views, video.duration].join('\t'),
    );
  }
}
