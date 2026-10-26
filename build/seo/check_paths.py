import re

files = [
    'hizmetler/tedarik/kidde/index.html',
    'hizmetler/tedarik/siex/index.html'
]

for p in files:
    full = 'C:/Users/orkun/.gemini/antigravity/scratch/FENIX.COM/fenix-com/' + p
    c = open(full, encoding='utf-8').read()
    urls = re.findall(r'(?:href|src)=["\']([^"\']+)["\']', c)
    rel_urls = [u for u in urls if u.startswith('..')]
    bad_urls = [u for u in rel_urls if not u.startswith('../../../')]
    print(f'{p}: {len(rel_urls)} relative URLs, {len(bad_urls)} not 3-levels deep.')
    if bad_urls:
        print('  Bad:', bad_urls)
