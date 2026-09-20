# SEO

## Her sayfada uygulanan alanlar

| Alan | Durum |
|---|---|
| `<title>` | ✔ 17 route için tekil |
| `<meta name="description">` | ✔ tekil |
| `<link rel="canonical">` | ✔ self · mutlak · www'lu · HTTPS |
| `<meta name="robots">` | ✔ şu an tamamı `noindex, nofollow` |
| `og:type` · `og:url` · `og:title` · `og:description` | ✔ |
| `og:image` + `width` · `height` · `alt` | ✔ gerçek asset |
| `og:locale` (tr_TR) · `og:site_name` | ✔ |
| `twitter:card` · `title` · `description` · `image` | ✔ |
| `<html lang="tr">` | ✔ |
| favicon + apple-touch-icon | ✔ |
| JSON-LD `@graph` | ✔ |
| Görünür breadcrumb + BreadcrumbList | ✔ birebir eşleşir |
| Tek `<h1>` | ✔ |

⚠ **Tüm sayfalarda `noindex, nofollow`** — site yayında değil. Üretim geçişinde bu etiketin kaldırılması **ayrı bir kontrol maddesidir**.

## Şema eşlemesi

| Sayfa | @type |
|---|---|
| Ana sayfa | WebPage |
| H0 hub | **CollectionPage** |
| 15 teknik sayfa | WebPage |
| 404 | WebPage (noindex) |

Grafik: `Organization` (tek `@id`) → `WebSite` → `WebPage` → `BreadcrumbList`.

**Yasak:** review · rating · award · price · person · product · sahte entity · görünmeyen içeriğin şeması · FAQPage (görünür soru-cevap yoksa).

## İç bağlantı

```
Bağlamsal iç bağlantı    55  (gövde metni içinde, doğal çapa)
Çapraz domain             5  (yalnızca gövdede, header/footer'da değil)
Yaşam döngüsü       T09 → T10 → T11 → T09  (kapalı döngü)
Öksüz sayfa               0  (hub 15 sayfayı listeler)
```

Her bağlantı gerçek `<a href>`. **JS-only navigasyon yok.**

## Kaynak kapıları

| Kural | İçerik |
|---|---|
| **R1** | EN 15004-1:**2024** · 2019 kullanılmaz |
| **R2** | "FM200 yasaklandı/kullanılamaz/kurulamaz" **yazılmaz** |
| **R3** | Lisanssız sayısal teknik değer **yayınlanmaz** |

9 BLOCKED sayfa bu kapılar nedeniyle içerik taşımaz. Sarı kapı paneli **ne yayınlanabilir / ne yayınlanamaz** ayrımını gösterir.

## Doğrulanmamış veri

```
13+ yıl · 500+ proje · 1000+ müşteri · 7/24 destek
→ verified:false · YAYINLANMADI
```

Ana sayfa kurumsal bandında bunların yerine **doğrulanmış** veriler gösterilir: 2011 kuruluş · 89+ referans · TSE-HYB · F-Gaz. Doğrulanmamış olanların yayınlanmadığı bantta açıkça belirtilir.

## Üretim geçişi kontrol listesi

```
[ ] noindex kaldırıldı (404 hariç)
[ ] robots.txt üretim bloğu etkinleştirildi
[ ] sitemap.xml gerçek lastmod ile güncellendi
[ ] 17 title ve description tekillik taraması
[ ] og:image HTTP 200 doğrulandı
[ ] Rich Results Test her şablon tipi için
[ ] Kırık iç bağlantı taraması
[ ] www/non-www 301 · HTTP→HTTPS 301
[ ] Search Console mülkiyet doğrulaması (müşteri hesabı)
```
