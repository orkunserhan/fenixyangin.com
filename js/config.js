/* FENIX.COM — Production Configuration Master
   Canlıya çıkışta sadece bu dosyadaki genel değişkenler güncellenir.
   Hassas secret, özel anahtar (private key) veya şifre KESİNLİKLE buraya girilmez. */

window.FENIX_CONFIG = {
  /* Google Analytics 4 (GA4) Ölçüm Kimliği
     Örnek format: "G-XXXXXXXXXX"
     Boş ("") bırakıldığında GA4 tracking tamamen pasiftir; sıfır ağ isteği ve sıfır çerez üretir.
     Canlıya çıkarken gerçek Measurement ID buraya girilecektir. */
  ga4Id: "",

  /* Google Maps Embed API Anahtarı (Opsiyonel)
     Boş ("") bırakıldığında standart güvenli Google Maps parametrik iframe embed'i kullanılır.
     Özel Google Cloud API anahtarı kullanılmak istenirse buraya eklenebilir. */
  mapsApiKey: ""
};
