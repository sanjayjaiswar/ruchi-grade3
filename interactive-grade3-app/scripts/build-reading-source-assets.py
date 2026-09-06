"""Render the three fingerprinted Reading curriculum PDFs and record every page.

Run from any directory: python3 scripts/build-reading-source-assets.py
Requires Poppler, cwebp, Pillow, and pypdf. Source downloads and scratch images
stay in the repository's existing ignored tmp directory. No browser capture.
"""
from concurrent.futures import ThreadPoolExecutor
from hashlib import sha256
from pathlib import Path
import json
import subprocess

from PIL import Image
from pypdf import PdfReader

APP = Path(__file__).resolve().parents[1]
ROOT = APP.parent
SCRATCH = ROOT / 'tmp' / 'reading-source-page-audit'
OUTPUT = APP / 'public' / 'source-pages' / 'reading' / 'reviewed'
MANIFEST = json.loads((ROOT / 'docs/reading/grade3-reading-source-manifest.json').read_text())
SOURCES = {
    'scope': 'benchmark-grade3-scope',
    'questions': 'benchmark-grade3-text-evidence-questions',
    'program-sample': 'benchmark-grade3-u1w1-program-sample',
}
SAMPLE_LABELS = [
    'Cover', 'Program introduction', 'Program context',
    'Language learning model', 'Resources illustrated with Grade 4',
    'Kindergarten through Grade 2 components', 'Grades 3 through 6 components',
    'Back cover',
]

if not (ROOT / 'tmp').is_dir():
    raise RuntimeError('The repository tmp directory must already exist.')
subprocess.run(['git', 'check-ignore', '--quiet', 'tmp'], cwd=ROOT, check=True)
SCRATCH.mkdir(exist_ok=True)
documents = []
for key, source_id in SOURCES.items():
    source = next(item for item in MANIFEST['verifiedSources'] if item['id'] == source_id)
    pdf = SCRATCH / f'{key}.pdf'
    if not pdf.exists():
        subprocess.run(['curl', '--fail', '--location', '--silent', '--show-error',
                        '--max-time', '60', source['url'], '-o', str(pdf)], check=True)
    if sha256(pdf.read_bytes()).hexdigest() != source['sha256']:
        raise RuntimeError(f'{key}: source fingerprint changed; review required.')
    reader = PdfReader(pdf)
    if len(reader.pages) != source['pageCount']:
        raise RuntimeError(f'{key}: source page count changed.')
    documents.append(dict(key=key, sourceId=source_id, title=source['title'],
                          original=source['url'], sha256=source['sha256'],
                          pdfPageCount=len(reader.pages)))

OUTPUT.mkdir(parents=True, exist_ok=True)

def render(key, count, width):
    prefix = SCRATCH / f'final-{key}'
    subprocess.run(['pdftoppm', '-png', '-scale-to-x', str(width), '-scale-to-y', '-1',
                    str(SCRATCH / f'{key}.pdf'), str(prefix)], check=True,
                   stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    digits = len(str(count))
    return [SCRATCH / f'final-{key}-{page:0{digits}d}.png' for page in range(1, count + 1)]

with ThreadPoolExecutor(max_workers=3) as pool:
    rendered = dict(zip(SOURCES, pool.map(lambda args: render(*args),
                                         [('scope', 10, 3600), ('questions', 10, 1600),
                                          ('program-sample', 8, 2200)])))

pages = []

def save_page(key, pdf_page, png, filename, label, description, **metadata):
    destination = OUTPUT / f'{filename}.webp'
    subprocess.run(['cwebp', '-quiet', '-lossless', '-m', '4', str(png), '-o', str(destination)], check=True)
    with Image.open(destination) as image:
        width, height = image.size
        image.verify()
    document = next(item for item in documents if item['key'] == key)
    pages.append(dict(id=filename, document=key, pdfPage=pdf_page,
                      label=label, description=description,
                      image=f'/source-pages/reading/reviewed/{filename}.webp',
                      original=f"{document['original']}#page={pdf_page}",
                      width=width, height=height,
                      sha256=sha256(destination.read_bytes()).hexdigest(), **metadata))

for unit, spread_path in enumerate(rendered['scope'], 1):
    with Image.open(spread_path) as spread:
        width, height = spread.size
        for side in range(2):
            printed = 68 + (unit - 1) * 2 + side
            box = (side * width // 2, 0, (side + 1) * width // 2, height)
            cropped = SCRATCH / f'scope-p{printed}.png'
            spread.crop(box).save(cropped)
            topic = 'Reading and word study' if side == 0 else 'Writing and language'
            save_page('scope', unit, cropped, f'scope-p{printed}', f'Scope p. {printed}',
                      f'Benchmark Grade 3 Unit {unit} - {topic}', unit=unit,
                      printedPage=printed, cropPixels=list(box),
                      fullSpreadImage=f'/source-pages/reading/reviewed/scope-unit-{unit:02d}.webp')
    # Preserve the complete spread as well as both logical printed pages.
    save_page('scope', unit, spread_path, f'scope-unit-{unit:02d}',
              f'Unit {unit} - complete spread', f'Benchmark Grade 3 Unit {unit} - both scope pages',
              unit=unit, kind='spread')

for unit, png in enumerate(rendered['questions'], 1):
    save_page('questions', unit, png, f'questions-unit-{unit:02d}', f'Questions - Unit {unit}',
              f'Benchmark Grade 3 Unit {unit} - complete official question page',
              unit=unit, questionNumbers=list(range(1, 11)), kind='question-page')

for page, png in enumerate(rendered['program-sample'], 1):
    save_page('program-sample', page, png, f'program-sample-p{page:02d}',
              f'Document p. {page}', f'Advancing Language Learning - {SAMPLE_LABELS[page-1]}',
              kind='document-page')

# These vector details on document p. 7 were inspected against the complete page.
# PDF coordinates are points from the top-left; render directly at 50 pixels/point.
for name, box, label, description in [
    ('lesson-guide', [425, 139, 462, 187], 'Teacher sample - guide p. 1',
     'Grade 3 Unit 1 Week 1 - complete Guide to Build, Transfer, and Apply detail from document p. 7'),
    ('pacing-guide', [94, 156, 144, 195], 'Grade 3 pacing sample',
     'Grade 3 Unit 1 Week 1 - pacing-guide detail from document p. 7; sample sequence only'),
]:
    x0, y0, x1, y1 = box
    prefix = SCRATCH / name
    subprocess.run(['pdftoppm', '-f', '7', '-l', '7', '-singlefile', '-r', '3600',
                    '-x', str(x0*50), '-y', str(y0*50), '-W', str((x1-x0)*50),
                    '-H', str((y1-y0)*50), '-png', str(SCRATCH / 'program-sample.pdf'),
                    str(prefix)], check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    save_page('program-sample', 7, prefix.with_suffix('.png'), name, label, description,
              kind='detail', unit=1, week=1, cropPdfPoints=box)

catalog = dict(schemaVersion=1, documents=documents, pages=pages)
(APP / 'src/app/data/reading-source-pages.data.json').write_text(json.dumps(catalog, indent=2) + '\n')
print(json.dumps(dict(verifiedDocuments=len(documents), sourcePdfPages=28,
                     logicalScopePages=20, fullScopeSpreads=10,
                     questionPages=10, completeSamplePages=8, enlargedDetails=2,
                     generatedImages=len(pages))))
