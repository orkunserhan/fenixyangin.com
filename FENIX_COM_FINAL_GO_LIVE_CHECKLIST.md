# FENIX.COM — FINAL GO-LIVE CHECKLIST & PROTOCOL (2026)
## IHS DNS KESİMİ, GİTHUB PAGES CANLI GEÇİŞİ VE İÇERİK YÖNETİŞİMİ KILAVUZU
**Belge Sürümü**: 2.0.0-PROD | **Tarih**: 26 Eylül 2026 | **Durum**: Pre-DNS Tamamlandı / DNS Kesimine Hazır

---

## 1. PRE-DNS CHECKLIST (KOD TABANI DOĞRULAMASI — TAMAMLANDI)
Aşağıdaki tüm kontroller 26 Eylül 2026 tarihinde yerel kod tabanı üzerinde doğrulanmış ve onaylanmıştır:

- [x] **55 HTML Dosyası Bütünlüğü**: 53 indekslenebilir rota, 1 yönlendirme stub'ı (`/hakkimizda/`), 1 adet 404 sayfası eksiksiz.
- [x] **Sitemap Eşleşmesi**: `sitemap.xml` içerisindeki 53 URL, sitedeki 53 canonical rota ile %100 birebir eşleşmektedir.
- [x] **Robots.txt Kuralları**: Google Ads botlarına sınırsız erişim açık, `sitemap.xml` yolu doğru tanımlanmış.
- [x] **Canonical Bütünlüğü**: 53 sayfanın tamamında `https://www.fenixyangin.com/.../` mutlak formatta tanımlı.
- [x] **Başlık & Açıklama Benzersizliği**: 53 sayfanın 53'ünde de Title ve Meta Description %100 benzersizdir.
- [x] **H1 Standardı**: Her sayfada tam 1 adet H1 başlığı mevcuttur.
- [x] **İç Bağlantı Sağlığı**: 0 kırık link, 0 yetim sayfa; tüm sayfalar ana sayfadan <= 3 tık mesafede.
- [x] **Görsel Bütünlüğü**: 0 kırık görsel, 0 eksik alt etiketi, modern WebP formatı.
- [x] **Kardeş Domain İzolasyonu**: `fenixyangin.com.tr` görsel sızıntıları temizlendi, tüm görsel URL'leri canonical domaine bağlandı.
- [x] **Siber Güvenlik**: Kod tabanında 0 secret, 0 token, 0 DOM XSS açığı.
- [x] **Duyarlı Tasarım (Responsive)**: 320px - 1920px arası 11 viewport testinde 0px yatay taşma (overflow).
- [x] **İletişim & Form Doğrulaması**: İstemci taraflı KVKK onaylı WhatsApp ve doğrudan e-posta iletimi aktif.
- [x] **Eski 1.334 URL Migration Kuralları**: NGINX / Apache konfigürasyonları hazır, sıfır döngü/zincir.

## 2. IHS TELEKOM DNS KESİM ADIMLARI (DNS CUTOVER PROCEDURE)
> [!IMPORTANT]
> DNS kayıtlarına dokunmadan önce mevcut DNS yedeğini (Zone File) mutlaka dışa aktarın.

### Adım 1: IHS Yönetim Paneline Giriş
1. IHS Telekom müşteri paneline (`ihs.com.tr`) giriş yapın.
2. **Alan Adı Yönetimi** > **`fenixyangin.com`** > **Gelişmiş DNS Yönetimi** sekmesini açın.

### Adım 2: www Subdomain CNAME Kaydını Tanımlayın
- **Kayıt Türü**: `CNAME`
- **Host / Alt Alan Adı**: `www`
- **Hedef Değer (Value)**: `orkunserhan.github.io.` (Noktaya dikkat edin)
- **TTL**: `300` (Hızlı yayılma için ilk aşamada 300 veya 600 saniye seçin)

### Adım 3: Apex Domain (`fenixyangin.com`) İçin GitHub A Kayıtlarını Girin
Root / Apex domain'in GitHub Pages'e yönlenmesi için mevcut tüm `@` A kayıtlarını aşağıdaki 4 resmi GitHub IP'si ile güncelleyin:
- `185.199.108.153`
- `185.199.109.153`
- `185.199.110.153`
- `185.199.111.153`

*(Opsiyonel IPv6 AAAA Kayıtları: `2606:50c0:8000::153`, `2606:50c0:8001::153`, `2606:50c0:8002::153`, `2606:50c0:8003::153`)*

### Adım 4: E-posta (MX) ve SPF Kayıtlarını Koruyun
> [!WARNING]
> Şirket kurumsal e-postalarının (`info@fenixyangin.com.tr` / `fenixyangin.com`) kesintiye uğramaması için MX, TXT (SPF, DKIM, DMARC) kayıtlarını **KESİNLİKLE DEĞİŞTİRMEYİN VEYA SİLMEYİN**.

## 3. GITHUB PAGES CANLI ALAN ADI AKTİVASYONU
DNS yönlendirmesi yapıldıktan hemen sonra GitHub repository ayarlarında şu adımları uygulayın:
1. **Repository Settings** > **Pages** sekmesine gidin.
2. **Custom domain** kutusuna: `www.fenixyangin.com` yazın ve **Save** butonuna tıklayın.
3. Repository kökünde otomatik olarak `CNAME` dosyası oluşturulacak veya `www.fenixyangin.com` olarak commit edilecektir.
4. **DNS Check**: GitHub'ın DNS yayılmasını kontrol etmesini bekleyin (Genellikle 5-15 dakika).
5. **Enforce HTTPS**: 'DNS check successful' uyarısından sonra **Enforce HTTPS** kutusunu işaretleyin (Let's Encrypt SSL sertifikası otomatik üretilecektir).

## 4. POST-DNS VERIFICATION CHECKLIST (DNS SONRASI İLK 24 SAAT)
- [ ] **Terminal DNS Sorgusu**: `nslookup www.fenixyangin.com` komutuyla `orkunserhan.github.io` CNAME yanıtını doğrulayın.
- [ ] **Apex -> WWW 301 Testi**: `http://fenixyangin.com` ve `https://fenixyangin.com` adreslerinin `https://www.fenixyangin.com/` adresine HTTP 301 ile yönlendiğini doğrulayın.
- [ ] **Canlı SSL Kontrolü**: `https://www.fenixyangin.com/` adresine tarayıcıdan girip SSL kilit simgesinin yeşil/geçerli olduğunu kontrol edin.
- [ ] **Google Search Console Doğrulaması**: GSC paneline giderek `fenixyangin.com` Domain mülkünü DNS TXT kaydı ile doğrulayın.
- [ ] **Sitemap Teslimi**: GSC > Sitemaps sekmesine `https://www.fenixyangin.com/sitemap.xml` adresini gönderin ve 'Başarılı' durumunu teyit edin.
- [ ] **Robots.txt Canlı Test**: `https://www.fenixyangin.com/robots.txt` adresinin canlıda 200 OK ile doğru içeriği sunduğunu test edin.
- [ ] **Canlı URL Denetimi (Live URL Inspection)**: GSC URL Denetimi aracıyla Ana Sayfa ve `/sistemler/fm200/` sayfasını test edin; 'URL Google tarafından kullanılabilir' yanıtını görünce 'Dizine Eklenmesini İste' butonuna basın.
- [ ] **Google Analytics 4 Aktivasyonu**: `js/config.js` dosyasını açıp gerçek GA4 ölçüm kodunu (`ga4Id: "G-XXXXXXXXXX"`) girin ve commit edin.

## 5. FUTURE CONTENT GOVERNANCE — 20 MADDELİK YENİ SAYFA EKLEME STANDARDI
Sitede ileride açılacak her yeni sayfa için uygulanması zorunlu minimum kalite ve kanibalizasyon protokolü:

| No | Aşama | Standart & Kriter | Onay Kuralı |
|---|---|---|---|
| 1 | **Search Intent** | Bilgi, Ticari Keşif veya İşlemsel niyet net olarak tanımlanmalıdır. | Niyeti belirsiz sayfa açılamaz. |
| 2 | **Primary Keyword** | Sayfanın odaklandığı tek bir ana arama terimi belirlenmelidir. | Hedefsiz sayfa açılamaz. |
| 3 | **Existing Collision** | Mevcut 53 sayfadan herhangi birinin bu kelimeye odaklanmadığı teyit edilmelidir. | Çakışma varsa mevcut sayfa zenginleştirilir. |
| 4 | **Cannibalization Check**| Yeni sayfa kardeş Fenix domainleri veya mevcut sayfaların trafiğini bölmemelidir. | Kanibalizasyon riski varsa birleştirilir. |
| 5 | **URL Mimarisi** | Küçük harf, Türkçe karaktersiz, tireli (`kebab-case`) ve sonu `/` ile bitmelidir. | Parametreli veya uzantılı URL yasaktır. |
| 6 | **Canonical Tag** | `<link rel="canonical" href="https://www.fenixyangin.com/.../">` tam mutlak URL olmalıdır. | Relative veya farklı domain canonical yasaktır. |
| 7 | **Title Tag** | 40-60 karakter arası, birincil anahtar kelime önde ve sonu `| Fenix Yangın` olmalıdır. | 65 karakteri aşamaz, duplikasyon yasaktır. |
| 8 | **Meta Description** | 120-160 karakter arası, tık çekici, teknik ve harekete geçirici olmalıdır. | Boş veya 160 karakterden uzun olamaz. |
| 9 | **H1 Bütünlüğü** | Sayfada tam olarak 1 adet H1 başlığı bulunmalıdır. | 0 veya 2+ H1 kesinlikle yasaktır. |
| 10 | **H2-H3 Hiyerarşisi** | Başlıklar mantıksal sırayla inmelidir (H1 -> H2 -> H3). | Başlık seviyesi atlanamaz. |
| 11 | **Schema.org** | Sayfa tipine uygun JSON-LD (WebPage, BreadcrumbList, Article) girilmelidir. | Sahte yıldız/fiyat eklenemez. |
| 12 | **Internal Linking** | Ebeveyn kategoriden ve en az 2 ilgili kardeş sayfadan iç link verilmelidir. | Yetim (orphan) sayfa bırakılamaz. |
| 13 | **Sitemap.xml** | Yeni sayfanın URL'si `sitemap.xml` dosyasına güncel `<lastmod>` ile eklenmelidir. | Sitemap'e eklenmeyen sayfa yayına çıkamaz. |
| 14 | **Image SEO** | Görseller WebP formatında, genişlik/yükseklik tanımlı ve özgün teknik alt metinli olmalıdır. | Ham PNG/JPG veya alt'sız görsel yasaktır. |
| 15 | **Mobile Viewport** | 320px genişlikte test edilmeli, yatay taşma (overflow) 0px olmalıdır. | Yatay kaydırma çubuğu çıkamaz. |
| 16 | **Performance Budget** | HTML < 60KB, CSS < 50KB, JS < 50KB bütçesine sadık kalınmalıdır. | Ağır kütüphane/framework eklenemez. |
| 17 | **Mevzuat & Standart** | NFPA, EN veya Türk Yangın Yönetmeliği teknik referansları doğru kullanılmalıdır. | Yanıltıcı teknik bilgi verilemez. |
| 18 | **Duplicate Content** | Başka siteden veya Fenix alan adından kopyalama kesinlikle yasaktır. | %100 özgün mühendislik dili şarttır. |
| 19 | **Domain Rolü** | Konu uzman dikey sitenin (örn. sadece mutfak davlumbaz) alanına giriyorsa FENIX.COM'da açılmamalıdır. | Doğru domain rolü korunmalıdır. |
| 20 | **İndekslenebilirlik** | `robots: index, follow` etiketi doğrulanmalı, test aşamasından noindex kalmadığı teyit edilmelidir. | Yayında noindex unutulamaz. |

## 6. ACİL DURUM GERİ ALMA PLANI (ROLLBACK PROTOCOL)
IHS DNS geçişi sonrasında beklenmeyen bir ağ veya hosting sorunu oluşması durumunda:
1. IHS DNS panelinde `@` ve `www` kayıtlarını önceki sunucu IP'lerine geri döndürün.
2. TTL 300 saniye olduğu için eski site en geç 5-10 dakika içinde tekrar yayına girecektir.
3. Sorun çözüldükten sonra DNS kesim adımlarını tekrar başlatın.