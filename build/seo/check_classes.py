# build/seo/check_classes.py — repo kökünde: python3 build/seo/check_classes.py
import re, os

# Ensure running from repo root
os.chdir(os.path.abspath(os.path.join(os.path.dirname(__file__), '../..')))

css = ''.join(open('css/' + f, encoding='utf-8').read() for f in os.listdir('css') if f.endswith('.css'))
js = ''.join(open('js/' + f, encoding='utf-8').read() for f in os.listdir('js') if f.endswith('.js'))
defined = set(re.findall(r'\.([a-zA-Z_][\w-]*)', css))
for p in ['sistemler/yangin-algilama', 'hizmetler/tedarik/kidde', 'hizmetler/tedarik/siex', 'sektorler/gemi-tekne-yat']:
    s = open(p + '/index.html', encoding='utf-8').read()
    used = {c for a in re.findall(r'class="([^"]+)"', s) for c in a.split()}
    print(p, sorted(c for c in used if c not in defined and c not in js))
