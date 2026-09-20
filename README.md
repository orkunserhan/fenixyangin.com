# FENIX.COM — 2026 Production Web Platform

**Fenix Sistem Yangın Mühendislik Sanayi ve Ticaret A.Ş.** resmi web platformu.

Statik web mimarisi · Saf HTML5 / CSS3 / Vanilla JS · Sıfır çalışma zamanı (runtime) bağımlılığı · Sıfır harici framework.

---

## 1. MİMARİ GENEL BAKIŞ

- **Sayfa Envanteri**: 54 Route (53 İndekslenebilir Kanonik Sayfa + 1 Özelleştirilmiş 404 Sayfası)
- **Tasarım & UI Sistemi**: Mühendislik odaklı, kurumsal, minimal ve responsive component mimarisi
- **Tipografi**: IBM Plex Mono & Archivo (Google Fonts üzerinden güvenli HTTPS iletimi)
- **Güvenlik Mimarisi**: Sıfır secret / API anahtarı, güvenli HTTPS, CSP & HSTS uyumlu başlıklar, sıfır XSS riski
- **SEO & Yapılandırılmış Veri**: %100 Schema.org (`@graph` Organization, WebSite, BreadcrumbList, TechArticle), self-canonical etiketler, optimize edilmiş Open Graph & Twitter Card meta alanları
- **Migration Tamlığı**: Eski WordPress sitesine ait 1.334 taranmış URL için 1.326 adet 301 yönlendirme haritası (0 döngü, 0 zincir, 0 kırık hedef)

---

## 2. DİZİN YAPISI

```
fenix-com/
├── index.html                    Ana sayfa (Hero, Sistemler, Mahal Matrisi, Referanslar)
├── 404.html                      Özelleştirilmiş 404 Hata Sayfası (noindex, follow)
├── robots.txt                    Üretim arama motoru direktifleri ve sitemap referansı
├── sitemap.xml                   53 kanonik indekslenebilir URL içeren XML Site Haritası
├── .htaccess                     Apache / LiteSpeed HTTPS yönlendirmeleri ve güvenlik başlıkları
├── _headers                      Netlify / Cloudflare Pages HTTP güvenlik başlıkları
├── _redirects                    Netlify / Cloudflare Pages 301 yönlendirme kuralları
├── nginx_redirects.conf          NGINX sunucuları için 301 redirect map ve güvenlik başlıkları
│
├── sistemler/                    Yangın Söndürme Sistemleri Hub ve 6 Detay Sayfası
│   ├── fm200/                    FM200 (HFC-227ea) Gazlı Söndürme Sistemi
│   ├── novec-1230/               NOVEC 1230 (FK-5-1-12) Temiz Gaz Söndürme Sistemi
│   ├── co2/                      CO2 (Karbondioksit) Gazlı Söndürme Sistemi
│   ├── davlumbaz/                Mutfak Davlumbaz Yangın Söndürme Sistemi
│   ├── pano-ici/                 Elektrik Panosu İçi Mikro Söndürme Sistemi
│   └── aerosol/                  Aerosol Yangın Söndürme Sistemi
│
├── sektorler/                    Sektörel Çözümler Hub ve 8 Mahal Çözümü Sayfası
│   ├── veri-merkezi/             Veri Merkezi (Data Center) Yangın Koruması
│   ├── endustriyel-mutfak/       Endüstriyel Mutfak Yangın Güvenliği
│   ├── server-odasi/             Server Odası ve Sistem Odası
│   ├── trafo-odasi/              Trafo ve Yüksek Gerilim Odaları
│   ├── ups-enerji/               UPS, Batarya ve Enerji Odaları
│   ├── fabrika/                  Fabrika ve Endüstriyel Üretim Tesisleri
│   ├── telekomunikasyon/         Telekomünikasyon ve Santral Odaları
│   └── hastane/                  Hastane ve Tıbbi Cihaz Mahalli Koruması
│
├── hizmetler/                    Mühendislik ve Saha Hizmetleri Hub ve 6 Hizmet Sayfası
│   ├── dolum/                    FM200 ve Novec 1230 Gaz Dolumu ve Yeniden Sertifikasyon
│   ├── bakim/                    Gazlı Yangın Söndürme Periyodik Bakım ve TSE-HYB Servis
│   ├── muhendislik/              Hidrolik Hesap, Projelendirme ve Danışmanlık
│   ├── montaj/                   Saha Montajı ve Borulama Uygulamaları
│   ├── kurulum/                  Sistem Kurulumu ve Entegrasyonu
│   └── tedarik/                  Sertifikalı Ajan ve Orijinal Ekipman Tedariki
│
├── teknik-icerikler/             Teknik Kütüphane Hub ve 11 Uzmanlık Makalesi
├── kurumsal/                     Hakkımızda, Ekibimiz, Belgelerimiz, Kariyer
├── referanslar/                  Doğrulanmış Müşteri Referansları ve Gerçek Marka Logoları
├── projeler/                     Tamamlanan Saha Projeleri ve Uygulama Galerisi
├── iletisim/                     İletişim ve Teklif Formu (WhatsApp ve Doğrudan Erişim)
├── kvkk/                         Kişisel Verilerin Korunması Aydınlatma Metni
├── gizlilik-politikasi/          Gizlilik Politikası
├── cerez-politikasi/             Çerez Politikası
├── site-haritasi/                Kullanıcı ve Arama Motoru Site Haritası
├── assets/                       Optimize edilmiş logolar, görseller ve vektörel ikonlar
├── css/                          Tasarım token'ları, layout ve modüler stil sayfaları
└── js/                           Erişilebilir, hafif, bağımlılıksız vanilla scriptler
```

---

## 3. YEREL ÖNİZLEME VE ÇALIŞTIRMA

Node.js kurulu ortamda (harici kurulum gerekmez):

```bash
npx serve . -l 3000
```

Python ile (harici paket gerekmez):

```bash
python -m http.server 3000
```

---

## 4. GÜVENLİK VE GİZLİLİK

- Kod tabanında özel anahtar (API key, token, veritabanı parolası) bulunmaz.
- İletişim formu verileri hiçbir üçüncü taraf aracıya gönderilmez; doğrudan istemci taraflı doğrulama ve WhatsApp API (`wa.me`) entegrasyonu ile çalışır.
- Güvenlik bildirimleri ve politikası için lütfen [`SECURITY.md`](SECURITY.md) dosyasını inceleyiniz.

---

## 5. TELİF VE MÜLKİYET

Bu projenin kaynak kodları, tasarım bileşenleri ve teknik içerikleri **Fenix Sistem Yangın Mühendislik Sanayi ve Ticaret A.Ş.** şirketine aittir.  
İzinsiz kopyalanamaz, çoğaltılamaz veya dağıtılamaz.

© 2026 Fenix Sistem Yangın Mühendislik Sanayi ve Ticaret A.Ş. — Tüm Hakları Saklıdır.
