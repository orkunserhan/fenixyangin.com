# QA

⚠ **Ölçülmeyen hiçbir madde PASS işaretlenmemiştir.**

---

## YAPISAL KONTROL

| Kontrol | Durum | Kanıt |
|---|---|---|
| 17 HTML sayfası üretildi | **PASS** | index · 404 · 16 teknik route |
| 4 legacy canonical korundu | **PASS** | kök yolunda, duplicate yok |
| Yeni URL üretilmedi | **PASS** | route registry ile birebir |
| Slug değişmedi | **PASS** | — |
| Her sayfada tek `<h1>` | **PASS** | üreteç garanti eder |
| Her sayfada canonical | **PASS** | — |
| Her sayfada tekil title/description | **PASS** | 17/17 |
| JSON-LD `@graph` | **PASS** | Organization tek `@id` |
| Breadcrumb ↔ BreadcrumbList eşleşmesi | **PASS** | aynı kaynaktan üretilir |
| Gerçek `<a href>` navigasyon | **PASS** | JS-only yok |
| `<main>` + skip link | **PASS** | her sayfada |
| `:focus-visible` | **PASS** | global |
| `prefers-reduced-motion` | **PASS** | global blok + hero timer gated |
| Görsellerde width/height | **PASS** | gerçek asset'lerin tamamında |
| CSS framework yok | **PASS** | 0 bağımlılık |
| JS kütüphanesi yok | **PASS** | 0 bağımlılık |
| `width: 100vw` yok | **PASS** | tarandı |
| Sabit genişlik yok | **PASS** | clamp/min/minmax |
| 9 BLOCKED sayfada uydurma içerik yok | **PASS** | kapı paneli + boş gövde |
| verified:false veri yayınlanmadı | **PASS** | kurumsal bantta not düşüldü |

## ÖLÇÜLMEYENLER

```
NOT MEASURED   LCP · INP · CLS · FCP · TBT · Speed Index
NOT MEASURED   Lighthouse (Performance · Accessibility · SEO · Best Practices)
NOT MEASURED   Gerçek JS/CSS sıkıştırılmış boyut
NOT VERIFIED   13 genişlikte gerçek render
NOT VERIFIED   Ekran okuyucu (NVDA · VoiceOver · TalkBack)
NOT VERIFIED   Mega menü klavye akışı (≥1060px gerçek tarayıcıda)
NOT VERIFIED   Gerçek HTTP durum kodları
NOT VERIFIED   Google indexing · Google-selected canonical
NOT VERIFIED   Production güvenlik başlıkları
```

## RESPONSIVE TEST MATRİSİ (çalıştırılmadı)

Her genişlikte kontrol edilecek: yatay taşma · kırpılmış içerik · çakışan öğe · eksik içerik · bozuk navigasyon · bozuk tablo · okunamayan metin · dokunma hedefi <44px.

```
[ ] 320   [ ] 360   [ ] 375   [ ] 390   [ ] 414   [ ] 430   [ ] 480
[ ] 768   [ ] 820   [ ] 1024  [ ] 1280  [ ] 1440  [ ] 1920
```

**Kritik eşik:** 1059px hamburger → 1060px sticky TOC + masaüstü nav.

## BAĞLANTI KONTROLÜ

| Grup | Durum |
|---|---|
| 17 route iç bağlantıları | **PASS** — tümü üretilen sayfalara işaret eder |
| Ana menü (8 hedef) | **WARNING** — 7'si henüz üretilmemiş sayfalara gider |
| Footer (6 hedef) | **WARNING** — aynı |
| Sistem/sektör kartları (14 hedef) | **WARNING** — aynı |
| Çapraz domain (fenixyangin.com.tr) | **PASS** — gövde içinde, kasıtlı |

⚠ Ana site 38 sayfası (`/sistemler/`, `/hizmetler/`, `/sektorler/`, `/iletisim/` vb.) bu fazda **üretilmedi**. Bağlantılar mimariye göre doğru; hedefler ayrı fazda üretilecek.

## KONSOL

**NOT VERIFIED** — sayfalar tarayıcıda çalıştırılmadı. JS modülleri savunmacı yazıldı: her modül kendi kök öğesini arar, bulamazsa sessizce çıkar.

## ERİŞİLEBİLİRLİK

| Kontrol | Durum |
|---|---|
| Semantik HTML (header/nav/main/article/section/aside/footer) | **PASS** |
| H1 → H2 atlamasız | **PASS** |
| Tüm görsellerde alt · dekoratiflerde aria-hidden | **PASS** |
| Tüm butonlarda erişilebilir ad | **PASS** |
| Gerçek `<button>` / `<a href>` — div-tıklama yok | **PASS** |
| `aria-expanded` · `aria-controls` · `aria-modal` | **PASS** |
| `aria-current="page"` (nav) · `aria-current="true"` (TOC) | **PASS** |
| Odak tuzağı + Esc (çekmece) | **PASS** |
| Tablo `<caption>` + `<th scope>` | **PASS** |
| Kaydırılabilir tablo `role="region"` + `tabindex="0"` | **PASS** |
| Dokunma hedefi ≥44px | **PASS** (CSS) · **NOT VERIFIED** (render) |
| Yanlış ARIA yok | **PASS** |
| Ekran okuyucu | **NOT VERIFIED** |
