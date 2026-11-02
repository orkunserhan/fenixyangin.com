# build/seo/generate_llms_txt.py
# Generates /llms.txt automatically from sitemap.xml and production HTML metadata
# in strict compliance with LLMS_TXT_POLICY.md.

import os
import re
import xml.etree.ElementTree as ET

REPO_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "../.."))
os.chdir(REPO_ROOT)

tree = ET.parse("sitemap.xml")
ns = {"sm": "http://www.sitemaps.org/schemas/sitemap/0.9"}

entries = []
for u in tree.getroot().findall("sm:url", ns):
    loc = u.find("sm:loc", ns).text.strip()
    rel = loc.replace("https://www.fenixyangin.com", "")
    disk_path = "index.html" if rel in ("", "/") else (rel.lstrip("/") + "index.html" if rel.endswith("/") else rel.lstrip("/"))
    if not os.path.exists(disk_path):
        continue
    html = open(disk_path, encoding="utf-8").read()
    title_m = re.search(r"<title>(.*?)</title>", html, re.S)
    title = title_m.group(1).strip() if title_m else rel
    # Strip trailing brand suffix from title for cleaner label
    label = re.sub(r"\s*\|\s*Fenix(?:\s+Yangın)?$", "", title).strip()

    desc_m = re.search(r'<meta\s+name="description"\s+content="([^"]+)"', html)
    if not desc_m:
        desc_m = re.search(r'<meta\s+content="([^"]+)"\s+name="description"', html)
    desc = desc_m.group(1).strip() if desc_m else ""

    entries.append((rel, loc, label, desc))

sistemler = []
hizmetler = []
sektorler = []
teknik = []
kurumsal = []

root_technical_slugs = {
    "/novec-1230-ve-fm200-farki/",
    "/elektrik-panosu-otomatik-yangin-sondurme-sistemi/",
    "/fm-200-gazli-sondurme-sistemleri-teknik-sartnamesi/",
    "/yangin-sondurucu-siniflari-nelerdir/",
}

for rel, loc, label, desc in entries:
    item_line = f"- [{label}]({loc}): {desc}"
    if rel.startswith("/sistemler/"):
        sistemler.append(item_line)
    elif rel.startswith("/hizmetler/"):
        hizmetler.append(item_line)
    elif rel.startswith("/sektorler/"):
        sektorler.append(item_line)
    elif rel.startswith("/teknik-icerikler/") or rel in root_technical_slugs:
        teknik.append(item_line)
    else:
        kurumsal.append(item_line)

lines = [
    "# Fenix Yangın",
    "",
    "> Fenix Sistem Yangın Mühendislik Sanayi ve Ticaret A.Ş. — 2011'den bu yana gazlı yangın söndürme sistemleri, yangın algılama ve ihbar sistemleri, mühendislik, periyodik bakım, sertifikalı gaz dolumu ve oda sızdırmazlık testi (Door Fan Test) çözümleri.",
    "",
    "## Sistemler",
    *sistemler,
    "",
    "## Hizmetler ve Marka Servis Çözümleri",
    *hizmetler,
    "",
    "## Sektörel Uygulamalar",
    *sektorler,
    "",
    "## Teknik İçerikler ve Mühendislik Rehberleri",
    *teknik,
    "",
    "## Kurumsal, Projeler ve Yasal",
    *kurumsal,
    "",
    "## İletişim",
    "- Ticari Unvan: Fenix Sistem Yangın Mühendislik Sanayi ve Ticaret A.Ş.",
    "- Merkez Adres: Yıldırım Mah. Buğday Sok. No:16, 34405 Bayrampaşa / İstanbul, Türkiye",
    "- Telefon: +90 212 618 07 01 / +90 212 618 07 02",
    "- Teknik Destek & WhatsApp: +90 532 740 90 97",
    "- E-posta: info@fenixyangin.com.tr",
    "- Web: https://www.fenixyangin.com/",
    "- Hesaplama ve Uzmanlık Portalı: https://fenixyangin.com.tr/",
    "- Site Haritası (XML): https://www.fenixyangin.com/sitemap.xml",
    "",
]

with open("llms.txt", "w", encoding="utf-8", newline="\n") as f:
    f.write("\n".join(lines))

print(f"Generated llms.txt with {len(entries)} canonical URLs.")
