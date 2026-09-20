# FENIX.COM — DIŞA AKTARMA VE YEREL GELİŞTİRME KILAVUZU

Tarih: 20 Eylül 2026 · Bu dosya projeyi yerel ortamda devralacak geliştirici/asistan içindir.

---

# 1. MİMARİ ÖZET

## Teknoloji yığını

```
HTML5              Statik, önceden üretilmiş sayfalar (54 dosya)
CSS3               Saf CSS · custom properties (design token) · flex + grid
Vanilla JavaScript 5 küçük modül · ES5 uyumlu · defer ile yüklenir
Node.js            YALNIZCA yerel sunucu ve sayfa üreteci için (çalışma zamanında gerekmez)
```

## KULLANILMAYAN teknolojiler — önemli

```
✗ Tailwind CSS        ✗ Bootstrap         ✗ React / Vue / Svelte
✗ Alpine.js           ✗ jQuery            ✗ FontAwesome
✗ Lucide / Heroicons  ✗ Swiper / Slick    ✗ GSAP / Framer Motion
✗ Webpack / Vite      ✗ npm paketi        ✗ Analytics / GTM
```

Bu **bilinçli bir karardır**. Performans bütçesi JS için 50 KB (sıkıştırılmış) olarak belirlenmişti; React CDN tek başına ~140 KB tuttuğu için framework kullanılmadı. Karusel, mobil menü ve sticky içindekiler listesi yerel tarayıcı API'leriyle yazıldı.

**Kütüphane eklemeyin.** Mevcut bileşenler aynı işi bağımlılık olmadan yapıyor.

## Tek dış bağımlılık: Google Fonts

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Archivo:wght@400;700;800&family=IBM+Plex+Mono:wght@400&display=swap" rel="stylesheet" />
```

Bu üç satır **54 sayfanın tamamının** `<head>` bölümünde zaten mevcuttur. Başka CDN yoktur.

## İkonlar

İkon kütüphanesi yoktur. Arayüzdeki tüm simgeler ya metin karakteridir (`→` `←` `×` `/`) ya da CSS ile çizilmiştir (hamburger menü: üç `background` çizgisi). Bu yüzden ikon kırılması olamaz.

---

## Tasarım dili

### Renk paleti

| Token | Değer | Kullanım |
|---|---|---|
| `--fx-red` | `#A90432` | Fenix kırmızısı · marka · CTA · aktif durum |
| `--fx-red-dark` | `#8A0328` | Buton hover |
| `--fx-red-deep` | `#7A0125` | Bağlantı hover |
| `--fx-red-on-dark` | `#FF7A9C` | **Koyu zeminde zorunlu** — `#A90432` orada 2.53:1 kontrast verir |
| `--fx-yellow` | `#FDB912` | Fenix sarısı · yalnızca küçük teknik vurgu |
| `--fx-ink` | `#16181A` | Ana metin / antrasit |
| `--fx-ink-2` | `#3D4347` | Gövde metni |
| `--fx-ink-3` | `#4D5358` | İkincil gövde |
| `--fx-muted` | `#6B7176` | Yardımcı metin |
| `--fx-muted-2` | `#8A9095` | Etiket |
| `--fx-line` | `#E4E6E8` | Kenarlık |
| `--fx-line-2` | `#EBECED` | Izgara ayırıcı |
| `--fx-surface` | `#FAFAFB` | Açık yüzey |
| `--fx-dark` | `#15171A` | Koyu bölüm |
| `--fx-darker` | `#0D0E10` | Hero zemini |

**Footer gradyanı** (değiştirilmemesi gereken onaylı değer):
```css
linear-gradient(100deg, #1F1216 0%, #2E1119 22%, #550B22 52%, #7E0429 78%, #96032C 100%)
```

### Tipografi

| Aile | Ağırlık | Kullanım |
|---|---|---|
| **Archivo** | 400 · 700 · 800 | Başlık ve gövde |
| **IBM Plex Mono** | 400 | **Yalnızca** teknik değer, etiket, ölçüm |

Mono yazı tipi dekorasyon için kullanılmaz — kural budur.

Tüm boyutlar akışkan:
```css
--fx-h1:   clamp(25px, 4.6vw, 44px)
--fx-h2:   clamp(18px, 2.2vw, 23px)
--fx-body: clamp(14px, 1.4vw, 15.5px)
--fx-lh-body: 1.76
--fx-ls-tight: -0.03em
```

### Izgara ve boşluk

```css
--fx-max:   1200px      /* içerik konteyneri */
--fx-text:  820px       /* metin kolonu (teknik sayfa) */
--fx-toc:   180px       /* sticky içindekiler */
--fx-pad-x: clamp(16px, 3vw, 28px)
--fx-sec:   clamp(30px, 4vw, 46px)
```

### Kritik kural: ızgara ayırıcı çizgisi

```
✗ Konteyner arka planı + gap:1px  →  auto-fit son satırı dolmadığında arka plan SIZAR
✓ Her çocukta box-shadow: 0 0 0 1px, konteynerde gap: 0
```

`--fx-hairline` token'ı bu amaçla vardır. `.fx-cards`, `.fx-strip__grid`, `.fx-sectors`, `.fx-proj`, `.fx-refs` bu kurala tabidir.

### Kırılma noktaları

```
480px    kart ızgarası genişler
768px    tablet düzeni
1060px   KRİTİK EŞİK — hamburger kapanır, masaüstü menü + sticky TOC açılır
```

1060px'in altında ve üstünde **ara durum yoktur**. Tablet dikey mobil deneyimde kalır.

### Hareket

```
Süre:      120–450ms
Özellik:   YALNIZCA transform ve opacity (kompozit edilebilir)
Azaltma:   prefers-reduced-motion → tüm hareket durur, hero zamanlayıcı HİÇ başlamaz
```

---

# 2. KLASÖR VE DOSYA YAPISI

```
fenix-com/
│
├── index.html                    # ANA SAYFA — hero slider, karusel, sektör ızgarası
├── 404.html                      # Hata sayfası (noindex, follow)
├── robots.txt                    # Geliştirme sürümü aktif · üretim bloğu yorumda
├── sitemap.xml                   # 53 canonical URL
├── package.json                  # Yalnızca script tanımları · dependency YOK
│
├── css/                          # ─── STİL KATMANI (5 dosya, kaskad sırası önemli) ───
│   ├── tokens.css                # Design token'lar · TÜM renk/tipografi/boşluk değerleri
│   ├── base.css                  # Reset · skip link · focus · reduced-motion
│   ├── layout.css                # Header · mobil çekmece · breadcrumb · footer
│   ├── components.css            # 13 teknik UI bileşeni (kart, tablo, not, kapı, adım)
│   └── home.css                  # YALNIZCA ana sayfa (hero, karusel, şerit, bant)
│
├── js/                           # ─── DAVRANIŞ KATMANI (5 modül, hepsi defer) ───
│   ├── main.js                   # Giriş noktası · alt aksiyon çubuğu sınıfı
│   ├── nav.js                    # Mobil çekmece · odak tuzağı · Esc · kaydırma kilidi
│   ├── toc.js                    # Sticky içindekiler · IntersectionObserver
│   ├── rail.js                   # Sistem karuseli · scroll-snap · klavye
│   └── hero.js                   # Hero zamanlayıcı · İZOLE · reduced-motion'da başlamaz
│
├── content/                      # ─── VERİ KATMANI (tek doğruluk kaynağı) ───
│   ├── site.js                   # Doğrulanmış şirket verisi + verified:false bayrakları
│   └── routes.js                 # Route kaydı (KİLİTLİ) · başlıklar · blocked listesi
│
├── schema/
│   ├── organization.json         # Referans kopya
│   └── README.md                 # @graph yapısı ve yasaklar
│
├── build/                        # ─── SAYFA ÜRETECİ (çalışma zamanında gerekmez) ───
│   ├── _lib.js                   # Şablon kütüphanesi (head, header, footer, bölüm)
│   ├── _lib2.js                  # Ana sayfa ve yasal sayfa şablonları
│   └── generate.js               # Üreteç girişi
│
├── sistemler/                    # ─── 6 SİSTEM + HUB ───
│   ├── index.html
│   ├── fm200/index.html
│   ├── novec-1230/index.html
│   ├── co2/index.html
│   ├── pano-ici/index.html
│   ├── davlumbaz/index.html
│   └── aerosol/index.html
│
├── hizmetler/                    # ─── 6 HİZMET + HUB ───
│   ├── index.html
│   ├── muhendislik/index.html
│   ├── kurulum/index.html
│   ├── montaj/index.html
│   ├── tedarik/index.html
│   ├── dolum/index.html
│   └── bakim/index.html
│
├── sektorler/                    # ─── 8 SEKTÖR + HUB ───
│   ├── index.html
│   ├── veri-merkezi/index.html
│   ├── server-odasi/index.html
│   ├── ups-enerji/index.html
│   ├── telekomunikasyon/index.html
│   ├── fabrika/index.html
│   ├── endustriyel-mutfak/index.html
│   ├── trafo-odasi/index.html
│   └── hastane/index.html
│
├── teknik-icerikler/             # ─── TEKNİK PLATFORM: HUB + 11 SAYFA ───
│   ├── index.html                              # H0 hub (CollectionPage)
│   ├── gazli-sondurme-ajan-miktari-hesabi/     # T03  içerik var
│   ├── gazli-sondurme-standartlari-ve-onaylar/ # T04  içerik var
│   ├── mahal-bazli-sondurme-sistemi-secimi/    # T05  içerik var
│   ├── fm200-f-gaz-mevzuati/                   # T02  BLOCKED — hukuk
│   ├── oda-sizdirmazlik-testi-yontemi/         # T09  BLOCKED — Fenix dokümanı
│   ├── devreye-alma-ve-kabul-testleri/         # T10  BLOCKED — Fenix dokümanı
│   ├── periyodik-kontrol-programi/             # T11  BLOCKED — Fenix dokümanı
│   ├── gazli-sondurme-ariza-rehberi/           # T12  BLOCKED — güvenlik
│   ├── veri-merkezi-yangin-koruma-tasarimi/    # T13  BLOCKED — Fenix girdisi
│   ├── yangin-sondurme-sistemi-zorunlulugu/    # T22  BLOCKED — hukuk
│   └── gazli-sondurme-ajanlari-insanlara-zararli-mi/  # T31  BLOCKED — lisanslı standart
│
├── novec-1230-ve-fm200-farki/                          # T01  KORUNAN LEGACY (AI 605)
├── elektrik-panosu-otomatik-yangin-sondurme-sistemi/   # T24  KORUNAN LEGACY (AI 2.174)
├── yangin-sondurucu-siniflari-nelerdir/                # T32  KORUNAN LEGACY (AI 642)
├── fm-200-gazli-sondurme-sistemleri-teknik-sartnamesi/ # T30  KORUNAN LEGACY · BLOCKED
│
├── projeler/index.html
├── referanslar/index.html
├── iletisim/index.html           # Form var, backend YOK
│
├── kurumsal/                     # ─── KURUMSAL + 4 ALT ───
│   ├── index.html
│   ├── hakkimizda/index.html
│   ├── ekibimiz/index.html
│   ├── belgelerimiz/index.html
│   └── kariyer/index.html
│
├── kvkk/index.html                    # LEGAL REVIEW REQUIRED
├── gizlilik-politikasi/index.html     # LEGAL REVIEW REQUIRED
├── cerez-politikasi/index.html        # Mevcut durum: çerez kullanılmıyor
├── kullanim-kosullari/index.html      # LEGAL REVIEW REQUIRED
├── site-haritasi/index.html
│
├── README.md · ROUTES.md · BUILD.md · SEO.md · QA.md
└── EXPORT_README.md              # bu dosya
```

**Toplam: 54 HTML · 5 CSS · 5 JS · 2 veri dosyası**

---

# 3. ÇALIŞTIRMA

```bash
cd fenix-com
npm run dev          # → http://localhost:3000
```

**`npm install` GEREKMEZ.** Bağımlılık yoktur; `npx serve` yalnızca yerel HTTP sunucusu sağlar.

Node olmadan:
```bash
python3 -m http.server 3000
```

⚠ **`file://` ile açmayın.** Sayfalar arası bağlantılar kök-mutlak yol (`/hizmetler/`) kullanır; bunlar yalnızca HTTP sunucusu altında çalışır. Bu üretim için doğru kalıptır — göreli yola çevirmeyin.

---

# 4. GÖRSELLER — DİKKAT

Gerçek Fenix görselleri şu anda **müşterinin canlı sitesinden** referanslanır:

```
Logo        https://fenixyangin.com.tr/assets/fenix-logo.png          (1200×223)
Hero        https://fenixyangin.com.tr/assets/img/hero-fenix-yangin.webp  (1920×1062)
Referans    https://fenixyangin.com.tr/assets/img/referanslar/ref-*.webp  (5 logo)
```

**İnternet bağlantısı varken sorunsuz yüklenir.** Üretim yayınında bunlar `assets/` klasörüne kopyalanmalı, AVIF/WebP üretilmeli ve `srcset` eklenmelidir.

**22 görsel slotu yer tutucudur** — çizgili zemin üzerinde ne konması gerektiğini yazan monospace etiket taşır (`.fx-ph` sınıfı). Bunlar stok fotoğrafla doldurulmamıştır; gerçek saha fotoğrafı müşteri materyalidir.

---

# 5. İÇERİK DURUMU — UYDURMAYIN

## 9 BLOCKED teknik sayfa

Bu sayfalarda **kaynak gelmeden içerik yazılmamalıdır**:

| Sayfa | Kapı | Gereken |
|---|---|---|
| T02 · T22 | Hukuk | RG 32693 EK-1/EK-3 · BYKHY birincil metin + hukuk onayı |
| T09 · T10 · T11 · T13 · T30 | Fenix dokümanı | Door fan raporu · devreye alma checklist'i · bakım formu · veri merkezi girdisi · şartname denetim dokümanı |
| T12 | Güvenlik | Fenix mühendis onayı: güvenli arıza kontrol kapsamı |
| T31 | Lisanslı standart | NFPA 2001 §4.3 · NOAEL/LOAEL değerleri |

Her sayfa sarı kapı panelinde **ne yayınlanabilir / ne yayınlanamaz** ayrımını gösterir.

## Kaynak kuralları

```
R1  EN 15004-1:2024 kullanılır — 2019 sürümü KULLANILMAZ
R2  "FM200 yasaklandı / kullanılamaz / kurulamaz" YAZILMAZ
R3  Lisanssız sayısal teknik değer YAYINLANMAZ
    (tasarım konsantrasyonu · NOAEL/LOAEL · boşalma süresi · basınç değerleri)
```

## Doğrulanmamış şirket verisi

```
13+ yıl · 500+ proje · 1000+ müşteri · 7/24 destek
→ content/site.js içinde verified:false · YAYINLANMADI
```

Ana sayfa kurumsal bandında bunların yerine **doğrulanmış** veriler gösterilir: 2011 kuruluş · 89+ referans · TSE-HYB · F-Gaz. Bantta doğrulanmamışların yayınlanmadığı açıkça yazılıdır.

## Doğrulanmış şirket verisi

```
Fenix Sistem Yangın Mühendislik Sanayi ve Ticaret A.Ş.
Kuruluş 2011
Yıldırım Mah. Buğday Sok. No:16, 34405 Bayrampaşa / İstanbul
+90 212 618 07 01 · +90 212 618 07 02 · WhatsApp +90 532 740 90 97
info@fenixyangin.com.tr
89+ doğrulanmış kurumsal referans
TSE-HYB Hizmet Yeterlilik Belgesi · F-Gaz yetki sertifikası
```

Kaynak: `content/site.js`

---

# 6. ROUTE MİMARİSİ — KİLİTLİ

```
16 indekslenebilir teknik route = 15 teknik sayfa + 1 hub
+ 29 ana site sayfası
+ ana sayfa
+ 404 (noindex)
Yeni URL: 0
```

## Hybrid Route Model

Dört legacy URL, doğrulanmış AI arama değeri nedeniyle **kök yolunda** korunur ve `/teknik-icerikler/` altında **duplicate'i açılmaz**:

```
/elektrik-panosu-otomatik-yangin-sondurme-sistemi/      AI 2.174 gösterim
/yangin-sondurucu-siniflari-nelerdir/                   AI 642
/novec-1230-ve-fm200-farki/                             AI 605
/fm-200-gazli-sondurme-sistemleri-teknik-sartnamesi/    (adıyla)
```

Bu URL'ler için **yönlendirme gerekmez** — kendi canonical'larıdır.

⚠ Slug değiştirmeyin, yeni indekslenebilir route eklemeyin, canonical modelini değiştirmeyin.

---

# 7. SEO DURUMU

Her sayfada mevcut: tekil `<title>` · tekil `<meta description>` · self-canonical · robots · Open Graph (locale + site_name dahil) · Twitter card · `@graph` JSON-LD · görünür breadcrumb + `BreadcrumbList` · tek `<h1>`.

```
@graph yapısı
 ├─ Organization    @id: /#organization      ← site genelinde TEK
 ├─ WebSite         @id: /#website
 ├─ WebPage         @id: <url>#webpage       (hub'da CollectionPage)
 └─ BreadcrumbList  @id: <url>#breadcrumb
```

⚠ **Tüm sayfalarda şu an `robots: noindex, nofollow`** — site yayında değil. Üretim geçişinde bu etiketin kaldırılması ayrı bir kontrol maddesidir.

## Şema yasakları

```
✗ review · rating · aggregateRating · award · offer · price
✗ person (gerçek yazar yoksa) · product (Service kullanılır)
✗ FAQPage (sayfada görünür soru-cevap yoksa)
✗ Görünmeyen içeriğin şeması
```

---

# 8. DEĞİŞTİRİLMEMESİ GEREKENLER

```
✗ Tasarımı yeniden yorumlama          ✗ Token/tipografi/boşluk değiştirme
✗ Yeni indekslenebilir route ekleme   ✗ Slug veya canonical değiştirme
✗ Legacy canonical duplicate açma     ✗ Kaynak kapısı gevşetme
✗ Framework / UI kütüphanesi ekleme   ✗ verified:false veriyi yayınlama
✗ fenixyangin.com.tr'yi GÖRSEL kaynak alma (yalnızca içerik kaynağı)
✗ Aynı işlev için ikinci bileşen sistemi
```

Görsel değişiklik yalnızca **hata düzeltmesi** olarak yapılır: kontrast ihlali · taşma · kırpılma · erişilebilirlik hatası · tarayıcı uyumsuzluğu. Tercih değişikliği değildir.

---

# 9. ÖLÇÜLMEYENLER — PASS SAYILMAMALI

```
NOT MEASURED   LCP · INP · CLS · FCP · TBT · Speed Index · Lighthouse
NOT VERIFIED   Ekran okuyucu (NVDA · VoiceOver · TalkBack)
NOT VERIFIED   Gerçek cihazda 320–1920px render
NOT VERIFIED   Google indexing · Google-selected canonical
NOT VERIFIED   Production güvenlik başlıkları
```

## Ölçülen ve geçen yapısal kontroller

```
✔ Kırık iç bağlantı         0  (54 sayfa tarandı)
✔ Asset path hatası         0  (nested route ../ derinliği doğru)
✔ Meta eksiği               0  (54/54 title · description · canonical · tek h1)
✔ Mükerrer title/description 0
✔ CSS framework             0
✔ JS kütüphanesi            0
✔ Üçüncü taraf analytics    0
```

---

# 10. ÜRETİM ÖNCESİ YAPILACAKLAR

```
[ ] Görselleri assets/ altına kopyala · AVIF/WebP üret · srcset + sizes ekle
[ ] Hero görseline <link rel="preload">
[ ] Yazı tiplerini self-host et + Türkçe subset
[ ] CSS/JS minify + brotli
[ ] robots.txt üretim bloğunu etkinleştir
[ ] Tüm sayfalarda noindex kaldır (404 hariç)
[ ] Cache-Control: hash'li asset + immutable + 1 yıl
[ ] Güvenlik başlıkları: CSP · HSTS · X-Content-Type-Options · Referrer-Policy
[ ] İletişim formuna backend bağla (şu an BACKEND REQUIRED)
[ ] KVKK / Gizlilik / Kullanım Koşulları hukuki metinlerini ekle
[ ] 89 referans logosu için yazılı izin al
[ ] 9 BLOCKED sayfanın kaynak kapılarını aç
[ ] 22 görsel slotunu gerçek fotoğrafla doldur
[ ] 13 genişlikte responsive QA · Lighthouse · ekran okuyucu testi
```
