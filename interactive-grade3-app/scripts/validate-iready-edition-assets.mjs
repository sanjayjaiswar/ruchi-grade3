import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { dirname, extname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const appRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const errors = [];
const fail = (message) => errors.push(message);

const expectedGroups = [
  { path: 'public/assets/iready-volume1/student', pattern: /^p-\d{3}\.jpg$/, count: 465, width: 1268, height: 1623 },
  { path: 'public/assets/iready-volume1/teacher-pages', pattern: /^reader-\d{3}\.webp$/, count: 764, width: 1386, height: 1628 },
  { path: 'public/assets/iready-volume2/student', pattern: /^viewer-\d{3}\.webp$/, count: 396, width: 1268, height: 1628 },
  { path: 'public/assets/iready-volume2/teacher', pattern: /^viewer-\d{3}\.webp$/, count: 540, width: 1386, height: 1628 }
];

const jpegSize = (buffer) => {
  let offset = 2;
  while (offset + 9 < buffer.length) {
    if (buffer[offset] !== 0xff) { offset += 1; continue; }
    const marker = buffer[offset + 1];
    const length = buffer.readUInt16BE(offset + 2);
    if (marker >= 0xc0 && marker <= 0xc3) {
      return { width: buffer.readUInt16BE(offset + 7), height: buffer.readUInt16BE(offset + 5) };
    }
    offset += 2 + length;
  }
  throw new Error('JPEG size marker not found');
};

const webpSize = (buffer) => {
  if (buffer.toString('ascii', 0, 4) !== 'RIFF' || buffer.toString('ascii', 8, 12) !== 'WEBP') {
    throw new Error('invalid WebP header');
  }
  const kind = buffer.toString('ascii', 12, 16);
  if (kind === 'VP8 ') {
    return { width: buffer.readUInt16LE(26) & 0x3fff, height: buffer.readUInt16LE(28) & 0x3fff };
  }
  if (kind === 'VP8X') {
    return { width: 1 + buffer.readUIntLE(24, 3), height: 1 + buffer.readUIntLE(27, 3) };
  }
  throw new Error(`unsupported WebP chunk ${kind}`);
};

for (const group of expectedGroups) {
  const root = resolve(appRoot, group.path);
  if (!existsSync(root)) {
    fail(`missing asset group ${group.path}`);
    continue;
  }
  const files = readdirSync(root).filter((file) => group.pattern.test(file)).sort();
  if (files.length !== group.count) fail(`${group.path} expected ${group.count} pages; found ${files.length}`);
  for (const file of files) {
    try {
      const buffer = readFileSync(resolve(root, file));
      const size = extname(file) === '.jpg' ? jpegSize(buffer) : webpSize(buffer);
      if (size.width !== group.width || size.height !== group.height) {
        fail(`${group.path}/${file} is ${size.width}x${size.height}; expected ${group.width}x${group.height}`);
      }
      if (size.width >= size.height) fail(`${group.path}/${file} is spread-shaped instead of one portrait page`);
    } catch (error) {
      fail(`${group.path}/${file} could not be inspected: ${error instanceof Error ? error.message : error}`);
    }
  }
}

const supportCode = readFileSync(resolve(appRoot, 'src/app/pages/iready-interactive/iready-volume1-support.ts'), 'utf8');
const volumeOneTemplate = readFileSync(resolve(appRoot, 'src/app/pages/iready-interactive/iready-interactive.html'), 'utf8');
const volumeTwoTemplate = readFileSync(resolve(appRoot, 'src/app/pages/iready-interactive/iready-volume2-page.html'), 'utf8');
if (!supportCode.includes('/teacher-pages/reader-') || supportCode.includes('/teacher/t-')) {
  fail('Volume 1 Teacher Guide runtime still references physical spread assets');
}
for (const [name, template] of [['Volume 1', volumeOneTemplate], ['Volume 2', volumeTwoTemplate]]) {
  if (!template.includes('edition-page-zoom') || !template.includes('select image to zoom')) {
    fail(`${name} edition view does not expose the full-resolution page image as a zoom target`);
  }
}
if (!volumeOneTemplate.includes('single-logical-page') || !volumeOneTemplate.includes('selectEditionPage(pageIndex)')) {
  fail('Volume 1 lesson view does not enforce one selected logical page at a time');
}

if (errors.length) {
  console.error('i-Ready edition asset validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log('i-Ready edition assets passed: 2,165 clean single-page files, fixed portrait dimensions, full-size zoom links, and no runtime spread paths.');
