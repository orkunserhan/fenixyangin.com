# BUILD

## Mimari

**Statik site. Derleme adımı zorunlu değil** — HTML dosyaları doğrudan sunulabilir.

Üreteç (`build/generate.js`) içerik verisinden sayfaları yeniden üretmek için vardır; sayfalar zaten üretilmiş hâlde repoda durur.

## Komutlar

```bash
npm run dev       # http://localhost:3000 (npx serve)
npm run build     # content/ → HTML yeniden üretim
npm run preview   # http://localhost:4000
npm run qa:links  # iç bağlantı taraması
```

Node olmadan: `python3 -m http.server 3000`

## Bağımlılık

```
runtime dependency     0
build dependency       0  (npx serve yalnızca yerel sunucu için)
UI kütüphanesi         0
CSS framework          0
karusel kütüphanesi    0
animasyon kütüphanesi  0
analytics              0
```

## JS bütçesi

| Modül | Amaç |
|---|---|
| `main.js` | Giriş — action bar sınıfı |
| `nav.js` | Mobil çekmece · odak tuzağı · Esc · kaydırma kilidi |
| `toc.js` | Sticky TOC — `IntersectionObserver` |
| `rail.js` | Karusel — yerel `scrollLeft` + `scroll-snap` |
| `hero.js` | Hero timer — **izole**, yalnızca kendi düğümlerine dokunur |

Tümü `defer`. Hedef: **< 50 KB sıkıştırılmış**. Ölçüm yapılmadı → **NOT MEASURED**.

## Progressive enhancement

JS olmadan çalışanlar:

```
✓ Tüm navigasyon — gerçek <a href>
✓ Karusel rail — yerel overflow-x kaydırma
✓ Tüm içerik ve iç bağlantılar
✓ Breadcrumb · TOC bağlantıları (anchor)
✗ Mobil çekmece açılmaz (menü yine footer'dan erişilebilir)
✗ Karusel okları çalışmaz (kaydırma çalışır)
```

## Üretim öncesi yapılacaklar

```
[ ] Asset'leri assets/ altına kopyala (şu an .com.tr'den referanslı)
[ ] AVIF/WebP üret + srcset/sizes ekle
[ ] Font self-host + Türkçe subset + 4 ağırlık
[ ] Hero görseline <link rel="preload">
[ ] CSS/JS minify + brotli
[ ] robots.txt üretim bloğunu etkinleştir
[ ] Tüm sayfalarda noindex kaldır
[ ] Cache-Control: hash'li asset + immutable + 1 yıl
[ ] Güvenlik başlıkları (CSP · HSTS · X-Content-Type-Options · Referrer-Policy)
```

## Dağıtım

**Bu aşamada dağıtım YOK.** GitHub push · DNS · hosting · Search Console · GA4 yapılmadı.

⚠ GitHub Pages'in sunucu tarafı 301 desteklediği **varsayılmadı**. Korunan 4 legacy URL için yönlendirme gerekmiyor.
