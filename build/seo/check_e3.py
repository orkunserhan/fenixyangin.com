import glob
import re
import sys
import os

# Ensure running from repo root
os.chdir(os.path.abspath(os.path.join(os.path.dirname(__file__), '../..')))

sys.stdout.reconfigure(encoding="utf-8")

matches = []
for f in glob.glob("hizmetler/tedarik/**/*.html", recursive=True):
    for i, line in enumerate(open(f, encoding="utf-8"), 1):
        if re.search(r'akredite dolum|akredite istasyon', line, re.IGNORECASE):
            matches.append((f, i, line.strip()))

print(f"Total matches: {len(matches)}")
for f, i, l in matches:
    print(f"{f}:{i}: {l[:100]}")
