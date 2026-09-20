/* FENIX.COM — ROUTE REGISTRY (KİLİTLİ)
   Hybrid Route Model: 4 legacy canonical kök yolunda korunur.
   Yeni URL üretilmez. Slug değiştirilmez. */

export const routes = {
  "H0": {
    "u": "/teknik-icerikler/",
    "f": "teknik-icerikler/index.html"
  },
  "T01": {
    "u": "/novec-1230-ve-fm200-farki/",
    "f": "novec-1230-ve-fm200-farki/index.html",
    "legacy": "AI 605"
  },
  "T02": {
    "u": "/teknik-icerikler/fm200-f-gaz-mevzuati/",
    "f": "teknik-icerikler/fm200-f-gaz-mevzuati/index.html"
  },
  "T03": {
    "u": "/teknik-icerikler/gazli-sondurme-ajan-miktari-hesabi/",
    "f": "teknik-icerikler/gazli-sondurme-ajan-miktari-hesabi/index.html"
  },
  "T04": {
    "u": "/teknik-icerikler/gazli-sondurme-standartlari-ve-onaylar/",
    "f": "teknik-icerikler/gazli-sondurme-standartlari-ve-onaylar/index.html"
  },
  "T05": {
    "u": "/teknik-icerikler/mahal-bazli-sondurme-sistemi-secimi/",
    "f": "teknik-icerikler/mahal-bazli-sondurme-sistemi-secimi/index.html"
  },
  "T09": {
    "u": "/teknik-icerikler/oda-sizdirmazlik-testi-yontemi/",
    "f": "teknik-icerikler/oda-sizdirmazlik-testi-yontemi/index.html"
  },
  "T10": {
    "u": "/teknik-icerikler/devreye-alma-ve-kabul-testleri/",
    "f": "teknik-icerikler/devreye-alma-ve-kabul-testleri/index.html"
  },
  "T11": {
    "u": "/teknik-icerikler/periyodik-kontrol-programi/",
    "f": "teknik-icerikler/periyodik-kontrol-programi/index.html"
  },
  "T12": {
    "u": "/teknik-icerikler/gazli-sondurme-ariza-rehberi/",
    "f": "teknik-icerikler/gazli-sondurme-ariza-rehberi/index.html"
  },
  "T13": {
    "u": "/teknik-icerikler/veri-merkezi-yangin-koruma-tasarimi/",
    "f": "teknik-icerikler/veri-merkezi-yangin-koruma-tasarimi/index.html"
  },
  "T22": {
    "u": "/teknik-icerikler/yangin-sondurme-sistemi-zorunlulugu/",
    "f": "teknik-icerikler/yangin-sondurme-sistemi-zorunlulugu/index.html"
  },
  "T24": {
    "u": "/elektrik-panosu-otomatik-yangin-sondurme-sistemi/",
    "f": "elektrik-panosu-otomatik-yangin-sondurme-sistemi/index.html",
    "legacy": "AI 2.174"
  },
  "T30": {
    "u": "/fm-200-gazli-sondurme-sistemleri-teknik-sartnamesi/",
    "f": "fm-200-gazli-sondurme-sistemleri-teknik-sartnamesi/index.html",
    "legacy": "AI (adıyla)"
  },
  "T31": {
    "u": "/teknik-icerikler/gazli-sondurme-ajanlari-insanlara-zararli-mi/",
    "f": "teknik-icerikler/gazli-sondurme-ajanlari-insanlara-zararli-mi/index.html"
  },
  "T32": {
    "u": "/yangin-sondurucu-siniflari-nelerdir/",
    "f": "yangin-sondurucu-siniflari-nelerdir/index.html",
    "legacy": "AI 642"
  }
};

export const titles = {
  "H0": [
    "Teknik İçerikler",
    "Bölüm girişi"
  ],
  "T01": [
    "FM200 ve FK-5-1-12 Farkı",
    "Ajan karşılaştırması"
  ],
  "T02": [
    "FM200 F-Gaz Mevzuatı",
    "Düzenleyici durum"
  ],
  "T03": [
    "Ajan Miktarı Hesabı",
    "Hesap metodolojisi"
  ],
  "T04": [
    "Standartlar ve Onaylar",
    "Katman bazında referanslar"
  ],
  "T05": [
    "Mahal Bazlı Sistem Seçimi",
    "Karar zinciri"
  ],
  "T09": [
    "Oda Sızdırmazlık Testi",
    "Door fan yöntemi"
  ],
  "T10": [
    "Devreye Alma ve Kabul",
    "Kabul test süreci"
  ],
  "T11": [
    "Periyodik Kontrol Programı",
    "Bakım periyotları"
  ],
  "T12": [
    "Arıza Rehberi",
    "Teşhis ve güvenli kontrol"
  ],
  "T13": [
    "Veri Merkezi Tasarımı",
    "Katmanlı koruma"
  ],
  "T22": [
    "Söndürme Sistemi Zorunluluğu",
    "Mevzuat gerekliliği"
  ],
  "T24": [
    "Elektrik Panosu ve Pano İçi",
    "Pano koruma mühendisliği"
  ],
  "T30": [
    "Teknik Şartname",
    "Şartname denetimi"
  ],
  "T31": [
    "Ajan Güvenliği",
    "İnsan güvenliği"
  ],
  "T32": [
    "Yangın Sınıfları",
    "Sınıflandırma ve yaklaşım"
  ]
};

/* İçerik kapısı kapalı — kaynak gelmeden yazılamaz */
export const blocked = ["T02","T09","T10","T11","T12","T13","T22","T30","T31"];

/* Hub grupları — IA yapısı */
export const hubGroups = [
  { id: 'karsilastirma', t: 'Karşılaştırma', d: 'Ajanlar arasındaki mühendislik farkı ve seçim gerekçesi.', ids: ['T01'] },
  { id: 'metodoloji',    t: 'Metodoloji',    d: 'Hesap yöntemi ve mahal bazlı karar zinciri.', ids: ['T03','T05'] },
  { id: 'mevzuat',       t: 'Mevzuat',       d: 'Düzenleyici çerçeve, standartlar ve zorunluluk.', ids: ['T02','T04','T22'] },
  { id: 'yasam',         t: 'Test ve devreye alma', d: 'Sızdırmazlık, kabul, periyodik kontrol ve arıza — tek mühendislik döngüsü.', ids: ['T09','T10','T11','T12'] },
  { id: 'uygulama',      t: 'Uygulama',      d: 'Mahal özelinde tasarım: veri merkezi ve elektrik panosu.', ids: ['T13','T24'] },
  { id: 'guvenlik',      t: 'Güvenlik',      d: 'İnsan güvenliği ve yangın sınıflandırması.', ids: ['T31','T32'] },
  { id: 'sartname',      t: 'Şartname',      d: 'Teknik şartnamenin yazımı ve madde madde denetimi.', ids: ['T30'] }
];
