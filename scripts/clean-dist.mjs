import { readdir, unlink, rm, mkdir } from 'node:fs/promises';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const DIST = resolve(fileURLToPath(new URL('../dist/', import.meta.url)));

let removed = 0;
let bytes = 0;

/**
 * Los discos externos exFAT/FAT32 (macOS) generan ficheros AppleDouble (._*).
 * Acaban dentro de dist/ y se desplegarían como archivos basura de 4 KB.
 */
async function walk(dir) {
  let entries;
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch {
    return;
  }
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.name.startsWith('._')) {
      await unlink(full).catch(() => {});
      removed++;
      bytes += 4096;
    } else if (entry.isDirectory()) {
      await walk(full);
    }
  }
}

await walk(DIST);
await rm(join(DIST, '.DS_Store'), { force: true }).catch(() => {});

if (removed > 0) {
  console.log(`[clean-dist] ${removed} ficheros AppleDouble eliminados (~${(bytes / 1048576).toFixed(1)} MB)`);
} else {
  console.log('[clean-dist] sin ficheros AppleDouble');
}
