# build/seo/apply_redirects.py — repo kökünde çalıştır: python3 build/seo/apply_redirects.py
import csv, json, sys
sys.stdout.reconfigure(encoding='utf-8')
V = 'vercel.json'
v = json.loads(open(V, encoding='utf-8').read())
red = v['redirects']
rt = {r['kaynak']: r['yeni_hedef'] for r in csv.DictReader(open('build/seo/COM_MEVCUT_KURAL_HEDEF_DEGISIKLIGI.csv', encoding='utf-8'))}
changed = 0
for x in red:
    if x['source'] in rt and x['destination'] != rt[x['source']]:
        x['destination'] = rt[x['source']]
        changed += 1
existing = {x['source'] for x in red}
new = []
for r in csv.DictReader(open('build/seo/COM_404_YONLENDIRME.csv', encoding='utf-8')):
    if not r['hedef'].startswith('/'):
        continue  # "YOK" satırları bilerek 404 kalır
    base = r['kaynak'].rstrip('/')
    for s in (base, base + '/'):
        if s not in existing:
            new.append({'source': s, 'destination': r['hedef'], 'statusCode': 301})
            existing.add(s)
# Joker kurallar: trailingSlash:true nedeniyle mevcut /tag/ kuralları gibi eğik çizgili ikizleriyle birlikte
for base, d in [('/page/:n*', '/teknik-icerikler/'), ('/author/:path*', '/kurumsal/ekibimiz/'),
                ('/referans/:path*', '/referanslar/'), ('/haber/:path*', '/teknik-icerikler/'),
                ('/urun/:path*', '/sistemler/')]:
    for s in (base + '/', base):
        if s not in existing:
            new.append({'source': s, 'destination': d, 'statusCode': 301})
            existing.add(s)
idx = next(i for i, x in enumerate(red) if x['source'].startswith(('/tag/:', '/category/:')))
red[idx:idx] = new
assert len(red) <= 2048, len(red)
open(V, 'w', encoding='utf-8').write(json.dumps(v, ensure_ascii=False, indent=2))
print('hedefi değişen:', changed, '| eklenen:', len(new), '| toplam kural:', len(red))
