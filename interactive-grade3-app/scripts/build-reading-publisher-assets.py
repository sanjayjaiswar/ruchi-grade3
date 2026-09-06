"""Reproduce page images from the five reviewed publisher samplers.

Source URLs and fingerprints are in docs/reading/grade3-publisher-source-discovery.json.
Downloads and renders remain in the existing ignored repository tmp directory.
"""
from concurrent.futures import ThreadPoolExecutor
from hashlib import sha256
from pathlib import Path
import json
import subprocess
from PIL import Image, ImageChops
from pypdf import PdfReader

APP = Path(__file__).resolve().parents[1]
ROOT = APP.parent
SCRATCH = ROOT / 'tmp' / 'reading-source-page-audit'
OUTPUT = APP / 'public/source-pages/reading/publisher'
source = json.loads((ROOT / 'docs/reading/grade3-publisher-source-discovery.json').read_text())
assert (ROOT / 'tmp').is_dir()
subprocess.run(['git', 'check-ignore', '--quiet', 'tmp'], cwd=ROOT, check=True)
SCRATCH.mkdir(exist_ok=True)

# Verify every original before producing app assets.
for document in source['documents']:
    for file in document['files']:
        pdf = SCRATCH / file['file']
        if not pdf.exists():
            subprocess.run(['curl', '-f', '-L', '-sS', '--max-time', '60', file['url'], '-o', str(pdf)], check=True)
        assert sha256(pdf.read_bytes()).hexdigest() == file['sha256'], file['url']
        assert len(PdfReader(pdf).pages) == file['pageCount'], file['url']

def page_metadata(key, page):
    unit, week, printed = 0, 0, None
    label = f'Document p. {page}'
    if key == 'language-pacing':
        if 5 <= page <= 34:
            unit, week, printed = (page-5)//3+1, (page-5)%3+1, page-1
            label = f'Language pacing · U{unit} W{week} · p. {printed}'
        else:
            label = {1:'Cover', 2:'Credits', 3:'Contents', 4:'Suggested pacing', 35:'Back cover'}[page]
    elif key == 'student-u4':
        unit = 4
        if 3 <= page <= 34:
            printed = page-2
            label = f'Student p. {printed}'
        else:
            label = {1:'Reader cover', 2:'Annotation guide and credits', 35:'Vocabulary', 36:'Back cover'}[page]
    elif key == 'eld-student-u4':
        unit = 4
        if page >= 2:
            printed = page+66
            label = f'Language student p. {printed}'
        else:
            label = 'Language student cover'
    elif key == 'eld-teacher-u4':
        unit = 4
        if page >= 7:
            printed = page+98
            label = f'Language teacher p. {printed}'
        else:
            label = {1:'Language teacher cover',2:'Unit alignment · left',3:'Unit alignment · right',4:'Divider reverse',5:'Unit 4 divider',6:'Blank divider reverse'}[page]
    elif key == 'apply-u1w1':
        unit, week, printed = 1, 1, page
        label = f'Teacher apply guide p. {page}'
    return dict(unit=unit, week=week, printedPage=printed, label=label)

OUTPUT.mkdir(parents=True, exist_ok=True)
def prepare(document):
    records = []
    for page in range(1, document['pageCount']+1):
        file = document['files'][page-1 if document['split'] else 0]
        pdf_page = 1 if document['split'] else page
        name = f"{document['key']}-{page:02d}"
        png = SCRATCH / f'{name}.png'
        subprocess.run(['pdftoppm','-f',str(pdf_page),'-l',str(pdf_page),'-singlefile','-png','-scale-to','2200',
                        str(SCRATCH/file['file']),str(png.with_suffix(''))],check=True,stdout=subprocess.DEVNULL,stderr=subprocess.DEVNULL)
        webp = OUTPUT / f'{name}.webp'
        subprocess.run(['cwebp','-quiet','-lossless','-m','4',str(png),'-o',str(webp)],check=True)
        with Image.open(png) as original, Image.open(webp) as encoded:
            assert ImageChops.difference(original.convert('RGB'),encoded.convert('RGB')).getbbox() is None
            width,height = encoded.size
        metadata = page_metadata(document['key'],page)
        description = document['title']
        if document['key'] == 'language-pacing':
            description += ' — publisher suggested language-development sequence'
        records.append(dict(id=name,document=document['key'],viewerPage=page,pdfPage=pdf_page,
                            image=f'/source-pages/reading/publisher/{name}.webp',
                            original=f"{document['viewer']}#page={page}",sourcePdf=file['url'],
                            sourceSha256=file['sha256'],width=width,height=height,
                            sha256=sha256(webp.read_bytes()).hexdigest(),description=description,**metadata))
    return records

with ThreadPoolExecutor(max_workers=3) as pool:
    pages = [page for group in pool.map(prepare,source['documents']) for page in group]
catalog = dict(discoveryUrl=source['discoveryUrl'],documents=[{k:v for k,v in d.items() if k not in ['files','renderIndex','split']} for d in source['documents']],pages=pages)
(APP/'src/app/data/reading-publisher-pages.data.json').write_text(json.dumps(catalog,indent=2)+'\n')
print(json.dumps(dict(documents=len(source['documents']),pages=len(pages),losslessVerified=True)))
