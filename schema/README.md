# SCHEMA

Her sayfa kendi `@graph` bloğunu `<script type="application/ld+json">` olarak taşır. Üreteç `build/_lib.js` içindeki `gr()` fonksiyonu tarafından üretilir.

## Grafik yapısı

```
@graph
 ├─ Organization    @id: /#organization        ← site genelinde TEK
 ├─ WebSite         @id: /#website             publisher → organization
 ├─ WebPage         @id: <url>#webpage         isPartOf → website · about → organization
 └─ BreadcrumbList  @id: <url>#breadcrumb      (ana sayfa hariç)
```

## Sayfa tipi eşlemesi

| Sayfa | @type |
|---|---|
| Ana sayfa | WebPage |
| Teknik hub (H0) | **CollectionPage** |
| 15 teknik sayfa | WebPage |
| 404 | WebPage (noindex) |

## Breadcrumb kuralı

Görünür breadcrumb ile `BreadcrumbList` **birebir aynı sıra ve adları** taşır. Son öğeye `item` verilmez.

## YASAKLAR

```
✗ review · rating · aggregateRating
✗ award · offer · price
✗ person (gerçek yazar yoksa)
✗ product (Service kullanılır)
✗ Görünmeyen içeriğin şeması
✗ FAQPage — sayfada görünür soru-cevap yoksa
```

`organization.json` referans kopyadır; üretimde her sayfa kendi inline grafiğini taşır.
