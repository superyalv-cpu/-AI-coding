from pathlib import Path

out = Path('/Users/wangya/Documents/New project/app-summary.pdf')

lines = [
    ('title', 'App Summary'),
    ('meta', 'Source basis: repository contents at /Users/wangya/Documents/New project'),
    ('meta', 'Repo evidence status: No files found in workspace root; summary limited to that evidence.'),
    ('h', 'What It Is'),
    ('b', 'Not found in repo.'),
    ('h', 'Who It\'s For'),
    ('b', 'Not found in repo.'),
    ('h', 'What It Does'),
    ('b', 'Not found in repo.'),
    ('b', 'No source files, docs, manifests, or configuration files present.'),
    ('b', 'No UI, API, or service definitions found.'),
    ('b', 'No routes, screens, or commands found.'),
    ('b', 'No integrations or external dependencies found.'),
    ('b', 'No tests or examples found.'),
    ('h', 'How It Works'),
    ('p', 'Compact architecture overview: Not found in repo. No components, services, data models, or data flow can be evidenced because the workspace is empty.'),
    ('h', 'How to Run'),
    ('b', 'Not found in repo.'),
    ('b', 'Minimal getting started steps cannot be derived from repository evidence.'),
    ('h', 'Evidence Checked'),
    ('b', 'Workspace scan returned only the current directory entry (`.`).'),
    ('b', 'No README, package manifest, source tree, Dockerfile, or lockfile found.'),
]

# Simple PDF writer using built-in Helvetica font.
def esc(text: str) -> str:
    return text.replace('\\', '\\\\').replace('(', '\\(').replace(')', '\\)')

content = ['BT', '/F1 11 Tf']
y = 800
left = 54
for kind, text in lines:
    if kind == 'title':
        content += [f'1 0 0 1 {left} {y} Tm', '/F1 20 Tf', f'({esc(text)}) Tj']
        y -= 24
        content += ['/F1 9 Tf']
    elif kind == 'meta':
        content += [f'1 0 0 1 {left} {y} Tm', '/F1 9 Tf', f'({esc(text)}) Tj']
        y -= 14
    elif kind == 'h':
        y -= 8
        content += [f'1 0 0 1 {left} {y} Tm', '/F1 12 Tf', f'({esc(text)}) Tj']
        y -= 16
    elif kind == 'b':
        content += [f'1 0 0 1 {left + 10} {y} Tm', '/F1 10 Tf', f'(• {esc(text)}) Tj']
        y -= 14
    elif kind == 'p':
        # Wrap paragraph roughly to fit page width.
        words = text.split()
        cur = ''
        wrapped = []
        for w in words:
            test = (cur + ' ' + w).strip()
            if len(test) > 95:
                wrapped.append(cur)
                cur = w
            else:
                cur = test
        if cur:
            wrapped.append(cur)
        for line in wrapped:
            content += [f'1 0 0 1 {left + 10} {y} Tm', '/F1 10 Tf', f'({esc(line)}) Tj']
            y -= 13
content.append('ET')
stream = '\n'.join(content).encode('latin-1', 'replace')

objects = []

def add(obj: bytes):
    objects.append(obj)

add(b'<< /Type /Catalog /Pages 2 0 R >>')
add(b'<< /Type /Pages /Count 1 /Kids [3 0 R] >>')
add(b'<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 842] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>')
add(b'<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>')
add(f'<< /Length {len(stream)} >>\nstream\n'.encode('latin-1') + stream + b'\nendstream')

pdf = bytearray(b'%PDF-1.4\n%\xe2\xe3\xcf\xd3\n')
offsets = [0]
for i, obj in enumerate(objects, start=1):
    offsets.append(len(pdf))
    pdf.extend(f'{i} 0 obj\n'.encode('latin-1'))
    pdf.extend(obj)
    pdf.extend(b'\nendobj\n')

xref_start = len(pdf)
pdf.extend(f'xref\n0 {len(objects)+1}\n'.encode('latin-1'))
pdf.extend(b'0000000000 65535 f \n')
for off in offsets[1:]:
    pdf.extend(f'{off:010d} 00000 n \n'.encode('latin-1'))
pdf.extend(f'trailer\n<< /Size {len(objects)+1} /Root 1 0 R >>\nstartxref\n{xref_start}\n%%EOF\n'.encode('latin-1'))

out.write_bytes(pdf)
print(out)
print(out.stat().st_size)
