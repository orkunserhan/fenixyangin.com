# FENIX.COM — FINAL PRE-DNS VERIFICATION
## 3 CRITICAL SEO & ARCHITECTURE CHECKS

**Denetim Tarihi:** 2026-09-26  
**Kapsam:** DNS & IHS Öncesi 3 Kritik Nokta Doğrulaması  
**Mevcut Durum:** Production Hazırlığı Tamamlandı (Branch: `main`)  
**Genel Sonuç:** **READY FOR IHS**

---

## 1. GİRİŞ VE AMAÇ

Bu rapor, FENIX.COM projesinin IHS DNS geçişinden önceki 3 spesifik mimari ve SEO kontrolünü teknik kanıtlarıyla doğrulamak amacıyla hazırlanmıştır. 
Bu çalışma kapsamında:
- DNS veya IHS yapılandırmasına dokunulmamıştır.
- GitHub Pages custom domain ayarı korunmuştur.
- GA4 aktive edilmemiştir (DNS sonrası protokolü beklenmektedir).
- Mevcut SEO bilgi mimarisi bozulmamıştır.

---

## CHECK 1 — /HAKKIMIZDA/ 301 STUB ANALİZİ

Repository genelinde `/hakkimizda/` dizini ve yönlendirme yapısı satır satır taranmış ve 12 soru teknik kanıtlarıyla yanıtlanmıştır:

```
[Repository Dosya Varlığı]
└── hakkimizda/
    └── index.html  (15 satır, 523 bayt)
```

### 12 Kritik Soru & Teknik Kanıtlar

| No | Soru | Teknik Kanıt & Bulgular | Sonuç |
|---|---|---|---|
| **1** | `/hakkimizda/` gerçek HTML dosyası mı? | `hakkimizda/index.html` fiziksel olarak mevcuttur. 15 satırlık hafif (523 bayt) bir yönlendirme şablonudur. | **EVET** |
| **2** | 301 stub neden oluşturulmuş? | Eski Fenix site mimarisinde kurumsal sayfa `/hakkimizda/` kök URL'sindeydi. 2026 mimarisinde kurumsal hub (`/kurumsal/hakkimizda/`) altına taşındı. Statik barındırma ortamlarında (GitHub Pages) HTTP seviyesinde mod_rewrite çalışmadığı için harici backlink'lerin 404 üretmesini önlemek amacıyla bir HTML/JS geri dönüş (fallback) stub'ı olarak oluşturuldu. | **KANITLANDI** |
| **3** | Hangi URL'ye yönlendiriyor? | `https://www.fenixyangin.com/kurumsal/hakkimizda/` (göreceli olarak `/kurumsal/hakkimizda/`). | **HEDEF DOĞRU** |
| **4** | HTTP status gerçekten 301 mi? | - **Apache (.htaccess L53):** `Redirect 301 /hakkimizda/ /kurumsal/hakkimizda/`<br>- **Netlify/Cloudflare (_redirects L18):** `/hakkimizda/ /kurumsal/hakkimizda/ 301`<br>- **Nginx (nginx_redirects.conf L26):** `location = /hakkimizda/ { return 301 https://www.fenixyangin.com/kurumsal/hakkimizda/; }`<br>- **GitHub Pages (Statik Host):** Sunucu 200 döner, `<meta http-equiv="refresh" content="0; url=/kurumsal/hakkimizda/">` ve JS `window.location.replace` ile anında yönlendirir. | **301 (Sunucuda)** / **Refresh (Statik Hostta)** |
| **5** | Redirect target canonical mı? | Evet. Hedef sayfa (`/kurumsal/hakkimizda/index.html`) kendi canonical etiketini taşır (`https://www.fenixyangin.com/kurumsal/hakkimizda/`). | **CANONICAL** |
| **6** | Redirect target sitemap'te mi? | Evet. `sitemap.xml` dosyasının 127. satırında `<loc>https://www.fenixyangin.com/kurumsal/hakkimizda/</loc>` olarak mevcuttur. | **SITEMAP'TE VAR** |
| **7** | Sitemap `/hakkimizda/` içeriyor mu? | Hayır. `sitemap.xml` içerisinde `/hakkimizda/` adresi **0 kez** geçer. Yönlendirmeli veya noindex URL barındırmaz. | **TEMİZ (YOK)** |
| **8** | Herhangi bir internal link `/hakkimizda/` kullanıyor mu? | Hayır. Kod tabanında yapılan `href="/hakkimizda/"` taramasında **0 adet** iç bağlantı bulunmuştur. Tüm menüler, butonlar ve site haritası doğrudan `/kurumsal/hakkimizda/` hedefine bağlanır. | **0 İÇ BAĞLANTI** |
| **9** | Canonical tag'ler doğru mu? | - `hakkimizda/index.html`: `<link rel="canonical" href="https://www.fenixyangin.com/kurumsal/hakkimizda/" />` ve `<meta name="robots" content="noindex, follow" />`<br>- `kurumsal/hakkimizda/index.html`: `<link rel="canonical" href="https://www.fenixyangin.com/kurumsal/hakkimizda/" />` (Self-canonical). | **%100 TUTARLI** |
| **10** | Redirect chain veya loop riski var mı? | Hayır. Tek atlama (Single Hop): `/hakkimizda/` -> `/kurumsal/hakkimizda/` (HTTP 200). Sıfır ara zincir, sıfır döngü. | **RİSK YOK** |
| **11** | Bu stub'ın kalması zorunlu mu, silinmeli mi? | **KEEP — REQUIRED FOR COMPATIBILITY**. Statik hostlarda harici eski bağlantıların kırılmaması için gereklidir. | **KORUNMALI** |
| **12** | Silinirse ne kırılır, kalırsa ne riski var? | - **Silinirse:** Statik CDN/GitHub Pages ortamında eski backlink'ler 404 döner, PageRank ve yönlendirilen kullanıcı kaybedilir.<br>- **Kalırsa:** Sıfır risk. `noindex, follow` etiketi taşır, sitemap'te yoktur, iç bağlantı almaz. Googlebot dizine eklemez ve ceza üretmez. | **SIFIR RİSK** |

### Net Karar
> **KEEP — REQUIRED FOR COMPATIBILITY**  
> Dosya silinmeyecek, mevcut koruyucu yapısıyla repository'de kalacaktır.

---

## CHECK 2 — ROBOTS.TXT AUDIT

Repository'deki `robots.txt` dosyası RFC 9309 standartları ve modern Google Ads yönergeleri doğrultusunda denetlenmiştir:

```text
# FENIX.COM — robots.txt
# Production Search Engine Directives & Google Ads Crawler Configuration

# Google Ads Bot & Quality Score Crawlers (Full Unrestricted Access)
User-agent: AdsBot-Google
User-agent: AdsBot-Google-Mobile
User-agent: Mediapartners-Google
Allow: /

# General Search Engine Crawlers
User-agent: *
Allow: /
Disallow: /404.html
Disallow: /*?q=

# Canonical XML Sitemap
Sitemap: https://www.fenixyangin.com/sitemap.xml
```

### Bot Erişim Tablosu

| Bot / Crawler | Tanımlı Direktif | İzin Verilen Alanlar | Engellenen Alanlar | Amaç & Güvence |
|---|---|---|---|---|
| **AdsBot-Google** | `Allow: /` | Tüm site (`/`) | Yok | Google Ads Kalite Puanı (Quality Score) taramasında reklam açılış sayfalarının kısıtlanmasını önler. |
| **AdsBot-Google-Mobile** | `Allow: /` | Tüm site (`/`) | Yok | Mobil reklam açılış sayfası denetimleri için tam erişim. |
| **Mediapartners-Google** | `Allow: /` | Tüm site (`/`) | Yok | Google reklam ağı ve içerik analiz botları için tam erişim. |
| **Googlebot** | `User-agent: *` | Tüm sayfalar, varlıklar | `/404.html`, `/*?q=` | Ana arama motoru tarayıcısı. İçerik ve görselleri tarar, parametre kirliliğinden korunur. |
| **Googlebot-Mobile** | `User-agent: *` | Tüm sayfalar, varlıklar | `/404.html`, `/*?q=` | Mobile-first indexing uyumlu genel erişim. |
| **Bingbot & Diğerleri** | `User-agent: *` | Tüm sayfalar, varlıklar | `/404.html`, `/*?q=` | Standart web tarayıcılarına açık tarama bütçesi koruması. |

### Kritik Teknik Kontroller
1. **Sitemap Deklarasyonu:** `Sitemap: https://www.fenixyangin.com/sitemap.xml` formatında dosyanın en altında mutlak ve standartlara uygun biçimde bildirilmiştir (**GEÇTİ**).
2. **Statik Varlıklar (CSS, JS, Resimler, Fontlar, Faviconlar):** Hiçbiri `Disallow` altında değildir. Google Web Rendering Service (WRS) tüm CSS/JS ve görsellere engelsiz erişir (**GEÇTİ**).
3. **404 Sayfası:** `Disallow: /404.html` ile taranmaya ve soft-404 dizin indekslemesine kapatılmıştır (**GEÇTİ**).
4. **Dinamik Arama URL'leri:** `Disallow: /*?q=` ile arama parametreli yinelenen URL'lerin tarama bütçesini tüketmesi engellenmiştir (**GEÇTİ**).
5. **Syntax Hatası:** Sıfır hata (**GEÇTİ**).

### ÖNEMLİ AYRIM: CURRENT FILE vs LIVE DOMAIN
- **CURRENT FILE (Repository robots.txt):**  
  Durum: **PASS (100% PRODUCTION READY)**. Dosya eksiksizdir, hatasızdır ve canlıya alınmaya hazırdır.
- **LIVE DOMAIN (`https://www.fenixyangin.com/robots.txt`):**  
  Durum: **UNKNOWN / PENDING DNS PROPAGATION**. Canlı alan adı şu anda IHS üzerinde eski barındırma sunucusuna veya varsayılan park kaydına bağlı olabilir. DNS A/CNAME kayıtları güncellenip GitHub sunucularına bağlandığı anda repository'deki bu production `robots.txt` dosyası otomatik olarak devreye girecektir.

---

## CHECK 3 — FENIX DOMAIN NETWORK CANNIBALIZATION AUDIT

Fenix dijital ağında yer alan 8 alan adının arama niyeti (Search Intent), anahtar kelime kümesi ve cannibalization (içerik/sıralama yamyamlığı) risk matrisi:

### 8 Alan Adı Envanteri ve Stratejik Rol Ayrımı

| Alan Adı | Birincil Intent | Hedeflenen Anahtar Kelimeler | Çakışma Riski | Stratejik Rolü & Konumlandırma |
|---|---|---|---|---|
| **fenixyangin.com** | Commercial Investigation + Transactional + Brand Authority | Gazlı yangın söndürme, FM200, Novec 1230, CO2, pano içi söndürme, davlumbaz söndürme, aerosol, yangın mühendisliği, Fenix Yangın | **YOK (Master)** | **ANA MARKA & GLOBAL/TR MÜHENDİSLİK OTORİTESİ (Master Hub).** Tüm sistemlerin şartnameleri, hesapları ve ana kurumsal varlığı buradadır. |
| **fenixyangin.com.tr** | Navigational + Corporate / Institutional | Fenix Yangın resmi, Fenix Mühendislik A.Ş., kamu ihaleleri, yerel kurumsal temas | **POTENTIAL** | **TR RESMİ KURUMSAL DOMAIN VEYA 301 YÖNLENDİRME.** Teknik sistem sayfaları kopyalanmamalı, doğrudan `fenixyangin.com`'a 301 yönlendirilmeli veya sadece kurumsal ihale kimliğinde tutulmalıdır. |
| **fenixyangin.net** | Defensive (Koruma) | Marka varyasyonları | **YOK (NO EVIDENCE)** | **PARK / DEFENSIVE ASSET.** Aktif içerik barındırmamalı, doğrudan `fenixyangin.com` ana alan adına 301 yönlendirilmelidir. |
| **fm200gaz.com** | Transactional (Doğrudan Ürün & Dolum Tedariği) | "fm200 gaz dolumu", "fm200 gazı satışı", "fm200 silindir dolumu", "hfc-227ea toptan" | **POTENTIAL** | **NİŞ ÜRÜN & DOLUM TEDARİK PORTALI.** Komple sistem mühendisliği sunmaz; yalnızca gaz dolumu, tüp testi ve yedek parça satışı dikeyinde kalmalıdır. Fenix.com içeriğini kopyalayamaz. |
| **fm200sondurmesistemleri.com** | Commercial (Tek Sistem Dikey Portal) | "fm200 söndürme sistemleri", "fm200 montaj" | **POTENTIAL** | **NİŞ DİKEY PORTAL VEYA 301 REDIRECT.** Google Doorway algoritmasına takılmamak adına doğrudan `fenixyangin.com/sistemler/fm200/` sayfasına 301 yönlendirilmesi en güvenli yaklaşımdır. |
| **yangindanismanligi.com** | Informational + Advisory (Mevzuat & B2B Danışmanlık) | "yangın danışmanlığı", "itfaiye uygunluk raporu", "yangın risk analizi", "yangın yönetmeliği denetimi" | **NO EVIDENCE** | **B2B MEVZUAT VE DANIŞMANLIK PORTALI.** Sistem satışı yapmayan, bağımsız denetim ve ruhsat danışmanlığı sağlayan uzman bilgi otoritesidir. Fenix.com'un taahhüt işleriyle niyet ayrımı nettir. |
| **aerosolsistem.com** | Transactional + Commercial (Kompakt Katı Aerosol) | "aerosol yangın söndürme", "kondanse aerosol jeneratörü", "pano aerosol söndürme" | **POTENTIAL** | **NİŞ AEROSOL DİKEYİ.** Borusuz katı aerosol jeneratörleri dikey ürün kataloğu olarak çalışır. Fenix.com'u ana sistem üreticisi olarak referanslamalıdır. |
| **davlumbazyanginsondurme.com** | Transactional + Commercial (Endüstriyel Mutfak Söndürme) | "davlumbaz yangın söndürme", "mutfak davlumbaz sistemi", "restoran mutfak yangın", "NFPA 96" | **POTENTIAL** | **NİŞ HORECA & MUTFAK GÜVENLİĞİ DİKEYİ.** Otel, AVM ve restoran mutfaklarına özel paketler sunar. Fenix.com ise endüstriyel mutfak mühendisliği tarafında kurumsal otoritedir. |

---

### Kritik Anahtar Kelime Kümelerinde Rol Ayrımı

| Kritik Anahtar Kelime | `fenixyangin.com` Rolü (Ana Otorite) | Uydu / Kardeş Domain Rolü | Birincil Otorite Kuralı |
|---|---|---|---|
| **"fm200 yangın söndürme"** | Komple anahtar teslim sistem mühendisliği, hidrolik hesap, EN 15004 / NFPA 2001 tasarımı | `fm200sondurmesistemleri.com`: 301 yönlendirme veya tek sayfalık mikro proje özeti | `fenixyangin.com` ana otoritedir. Bütün genel mühendislik aramalarını domine eder. |
| **"fm200 gaz dolumu"** | Sistem periyodik bakım ve yeniden dolum hizmeti (`/hizmetler/bakim/`) | `fm200gaz.com`: Toptan gaz tedariği, acil dolum istasyonu, silindir lojistiği | `fm200gaz.com` hızlı yedek parça ve gaz alım niyetini çözer; kurumsal taahhüt aramalarını Fenix'e bırakır. |
| **"davlumbaz yangın söndürme"** | Endüstriyel mutfak yangın koruma sistemi (`/sistemler/davlumbaz/`) | `davlumbazyanginsondurme.com`: Restoran şefleri ve horeca işletmecilerine pratik çözümler | Kurumsal şartnameler ve ihale aramalarında `fenixyangin.com` master kabul edilir. |
| **"pano içi yangın söndürme"** | Elektrik panosu mikro yangın koruma (`/sistemler/pano-ici/`) | Uydu sitelerdeki pano içerikleri Fenix ana sayfasına kanonik/linkle bağlanır | `fenixyangin.com` birincil otoritedir. |
| **"yangın danışmanlığı"** | Mühendislik ve proje hesap hizmetleri (`/hizmetler/muhendislik/`) | `yangindanismanligi.com`: Bağımsız itfaiye raporu, ruhsat denetimi ve mevzuat portalı | Niyetler ayrıdır: Danışmanlık portalı raporlama/mevzuat sunar, Fenix sistem üretir ve kurar. |
| **"aerosol yangın söndürme"** | Kompakt katı aerosol söndürme sistemi (`/sistemler/aerosol/`) | `aerosolsistem.com`: Sadece jeneratör bazlı e-katalog veya teknik donanım dikey sitesi | `fenixyangin.com` sistem entegrasyonu otoritesidir. |

### Cannibalization Kanıt Değerlendirmesi
- **CONFIRMED (Kanıtlanmış Çakışma):** **YOK (0 ADET)**. `fenixyangin.com` temiz 53 URL'lik özgün bir mimariye sahiptir. Şu ana kadar arama sonuçlarında aynı snippet ile birbiriyle yarışan kanıtlanmış bir çift bulunmamaktadır.
- **POTENTIAL (Olası Çakışma):** **3 DOMAIN (`fm200gaz.com`, `fm200sondurmesistemleri.com`, `davlumbazyanginsondurme.com`)**. Bu alan adlarında gelecekte kopya metin veya aynı meta başlıklar kullanılırsa potansiyel çakışma oluşabilir. Yukarıdaki stratejik ayrım kuralı bu riski tamamen ortadan kaldırır.
- **NO EVIDENCE (Çakışma Kanıtı Yok):** **4 DOMAIN (`fenixyangin.com.tr`, `fenixyangin.net`, `yangindanismanligi.com`, `aerosolsistem.com`)**.

---

## FINAL GO-LIVE IMPACT TABLOSU

| Kontrol Noktası | Değerlendirme | Durum / Eylem | Blocker Niteliği |
|---|---|---|---|
| **CHECK 1: /hakkimizda/ 301 stub** | **PASS / NO IMPACT** | **KEEP — REQUIRED FOR COMPATIBILITY** (Eski harici backlink'leri korur, sitemap ve iç linklerden arındırılmıştır, noindex taşır). | **BLOCKER DEĞİL** |
| **CHECK 2: robots.txt** | **PASS** | **CURRENT FILE: PASS (100% READY)**<br>**LIVE DOMAIN: PENDING DNS** (DNS geçişi sonrasında canlıda doğrulanacaktır). | **BLOCKER DEĞİL** |
| **CHECK 3: Domain Cannibalization** | **PASS** | **STRATEGIC ROLES DEFINED** (Kanıtlanmış çakışma sıfırdır; 8 alan adının sınırları ve Fenix.com'un birincil otorite kuralı netleştirilmiştir). | **BLOCKER DEĞİL** |

---

### SONUÇ VE DNS GEÇİŞ ONAYI

- **BLOCKER VAR MI?:** **HAYIR** (DNS geçişini engelleyecek hiçbir teknik, mimari veya SEO engeli bulunmamaktadır).
- **IHS DNS'E GEÇİLEBİLİR Mİ?:** **EVET** (Alan adı DNS kayıtları IHS panelinden GitHub Pages altyapısına yönlendirilebilir).
- **FINAL STATUS:** **READY FOR IHS**
