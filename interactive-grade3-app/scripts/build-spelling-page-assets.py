"""Split the supplied workbook into local, single-page reading/printing assets.

Requires pypdf with AES support, Poppler (pdftoppm), and cwebp.
Printed page N is physical PDF page N + 2. Publisher key sheets 153–186
contain four consecutive workbook pages, starting with 6–9.
"""
import json
import subprocess
import sys
from pathlib import Path

from pypdf import PdfReader, PdfWriter
from pypdf.generic import RectangleObject

APP = Path(__file__).resolve().parents[1]
ASSETS = APP / 'public/assets/spelling'
SCRATCH = APP.parent / 'tmp/spelling-review'
assert SCRATCH.parent.is_dir(), 'Use the existing repository tmp directory.'
SCRATCH.mkdir(exist_ok=True)
PDFS = ASSETS / 'page-pdfs'
ANSWERS = ASSETS / 'answers'
PDFS.mkdir(exist_ok=True)
ANSWERS.mkdir(exist_ok=True)

data = (APP / 'src/app/pages/spelling/spelling-data.ts').read_text()
lessons = json.loads(data.split('export const SPELLING_LESSONS = ', 1)[1].rsplit(' as const;', 1)[0].rstrip(';\n '))
workbook_pages = [lesson['page'] + offset for lesson in lessons for offset in range(4)]
references = [2, 3, 5, *range(142, 154)]
dictionary_only = '--dictionary-only' in sys.argv
reader = PdfReader(ASSETS / 'spelling-grade-3.pdf')

def write_page(source_index, destination, crop=None):
    writer = PdfWriter()
    page = writer.add_page(reader.pages[source_index])
    if crop:
        # Preserve vector type and artwork. The crop includes the printed
        # workbook page label, but excludes the other three answer panels.
        page.mediabox = RectangleObject(crop)
        page.cropbox = RectangleObject(crop)
    writer.add_metadata({'/Title': destination.stem.replace('-', ' ')})
    with destination.open('wb') as output:
        writer.write(output)

def render(pdf, destination):
    prefix = SCRATCH / destination.stem
    subprocess.run(['pdftoppm', '-f', '1', '-l', '1', '-singlefile',
                    '-cropbox', '-scale-to-x', '1400', '-scale-to-y', '-1',
                    '-png', str(pdf), str(prefix)], check=True, capture_output=True)
    subprocess.run(['cwebp', '-quiet', '-q', '92', str(prefix) + '.png',
                    '-o', str(destination)], check=True)

# Exact source page links never use a fragment on the complete workbook.
for page in (range(142, 153) if dictionary_only else sorted(set(workbook_pages + references))):
    pdf = PDFS / f'page-{page}.pdf'
    write_page(page + 1, pdf)
    if not (ASSETS / 'pages' / f'page-{page}.webp').exists():
        render(pdf, ASSETS / 'pages' / f'page-{page}.webp')

if dictionary_only:
    print('Dictionary pp. 142–152 available as individual images and one-page PDFs.')
    raise SystemExit

# Coordinates in the supplied PDF's 657 × 837 point media box, bottom-up.
# Outer margins preserve all four panel borders and page labels. Even-numbered
# key sheets shift the complete layout 18 points left for the binding gutter.
PANELS = [(78, 422, 303, 713), (372, 422, 597, 713),
          (78, 99, 303, 390), (372, 99, 597, 390)]
manifest = []
for page in workbook_pages:
    key = 153 + (page - 6) // 4
    panel = (page - 6) % 4
    x0, y0, x1, y1 = PANELS[panel]
    shift = 18 if key % 2 == 0 else 0
    crop = (x0 - shift, y0, x1 - shift, y1)
    pdf = ANSWERS / f'page-{page}.pdf'
    write_page(key + 1, pdf, crop)
    render(pdf, ANSWERS / f'page-{page}.webp')
    manifest.append({'workbookPage': page, 'sourceViewerPage': page + 2,
                     'keyPrintedPage': key, 'keyViewerPage': key + 2,
                     'cropBox': crop})
(ANSWERS / 'source-map.json').write_text(json.dumps(manifest, indent=2) + '\n')
print(f'Created {len(workbook_pages)} separate answer pages and {len(set(workbook_pages + references))} single-page source PDFs.')
