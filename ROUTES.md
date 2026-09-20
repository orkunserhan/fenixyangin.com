# ROUTES

**16 indekslenebilir teknik route** + ana sayfa + 404.
Route modeli **KİLİTLİDİR**. Yeni URL üretilmez, slug değiştirilmez.

---

## A — KORUNAN LEGACY CANONICAL (4)

Kök yolunda kalır. `/teknik-icerikler/` altında **duplicate açılmaz**. Yönlendirme **gerekmez** — kendi canonical'ları.

| T-ID | Route | Dosya | Durum | AI kanıtı |
|---|---|---|---|---|
| **T24** | `/elektrik-panosu-otomatik-yangin-sondurme-sistemi/` | `elektrik-panosu-.../index.html` | SPEC | **2.174** |
| **T32** | `/yangin-sondurucu-siniflari-nelerdir/` | `yangin-sondurucu-.../index.html` | SPEC | **642** |
| **T01** | `/novec-1230-ve-fm200-farki/` | `novec-1230-.../index.html` | SPEC | **605** |
| **T30** | `/fm-200-gazli-sondurme-sistemleri-teknik-sartnamesi/` | `fm-200-.../index.html` | BLOCKED | adıyla |

## B — HUB (1)

| T-ID | Route | Dosya | Schema |
|---|---|---|---|
| **H0** | `/teknik-icerikler/` | `teknik-icerikler/index.html` | CollectionPage |

## C — YENİ TEKNİK SAYFALAR (11)

| T-ID | Route | Durum |
|---|---|---|
| T02 | `/teknik-icerikler/fm200-f-gaz-mevzuati/` | **BLOCKED** hukuk |
| T03 | `/teknik-icerikler/gazli-sondurme-ajan-miktari-hesabi/` | SPEC |
| T04 | `/teknik-icerikler/gazli-sondurme-standartlari-ve-onaylar/` | SPEC |
| T05 | `/teknik-icerikler/mahal-bazli-sondurme-sistemi-secimi/` | SPEC |
| T09 | `/teknik-icerikler/oda-sizdirmazlik-testi-yontemi/` | **BLOCKED** Fenix dok. |
| T10 | `/teknik-icerikler/devreye-alma-ve-kabul-testleri/` | **BLOCKED** Fenix dok. |
| T11 | `/teknik-icerikler/periyodik-kontrol-programi/` | **BLOCKED** Fenix dok. |
| T12 | `/teknik-icerikler/gazli-sondurme-ariza-rehberi/` | **BLOCKED** güvenlik |
| T13 | `/teknik-icerikler/veri-merkezi-yangin-koruma-tasarimi/` | **BLOCKED** Fenix girdi |
| T22 | `/teknik-icerikler/yangin-sondurme-sistemi-zorunlulugu/` | **BLOCKED** hukuk |
| T31 | `/teknik-icerikler/gazli-sondurme-ajanlari-insanlara-zararli-mi/` | **BLOCKED** R3 |

## D — DİĞER

| Route | Dosya | Index |
|---|---|---|
| `/` | `index.html` | üretimde index |
| `/404` | `404.html` | **noindex, follow** · sitemap dışı |

---

## URL POLİTİKASI

```
küçük harf · ASCII · tire ayrık · sonda slash · uzantısız · max 3 seviye
YASAK: /tag/ /category/ /author/ /feed/ /wp-admin/ /wp-content/ /?p= /index.php
```

## SITEMAP KURALI

Yalnızca **A ve B hedefleri** sitemap'e girer. `.com.tr` URL'si, local URL, duplicate ve 404 **girmez**.

## HENÜZ ÜRETİLMEMİŞ (referans verilen)

Ana menü ve footer şu route'lara bağlanır; sayfaları bu aşamada üretilmedi:

```
/sistemler/ + 6 detay · /hizmetler/ + 6 detay · /sektorler/ + 8 detay
/projeler/ · /referanslar/ · /kurumsal/ + 4 alt · /iletisim/
/kvkk/ · /cerez-politikasi/ · /site-haritasi/
```

Bu 38 sabit sayfa ayrı bir faz konusudur. Mevcut kod tabanı teknik platformu kapsar.
