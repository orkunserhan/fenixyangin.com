# Security Policy — FENIX.COM

Fenix Yangın Sistemleri (`fenixyangin.com`) olarak web platformumuzun ve kullanıcılarımızın güvenliğini en üst düzeyde tutmayı taahhüt ediyoruz.

---

## 1. Desteklenen Sürümler

Aşağıdaki tabloda güvenlik güncellemeleri ve yamaları alan aktif sürümler belirtilmiştir:

| Sürüm | Destek Durumu |
| :--- | :--- |
| 2026 Production (`fenix-com`) | :white_check_mark: Destekleniyor |
| Legacy WordPress (`< 2026`) | :x: Kullanım Dışı / EOL |

---

## 2. Güvenlik Açığı Bildirimi (Reporting a Vulnerability)

Web sitemizde veya altyapımızda herhangi bir güvenlik zafiyeti (XSS, hassas veri ifşası, yapılandırma hatası vb.) tespit etmeniz durumunda, lütfen **sorumlu bildirim (responsible disclosure)** ilkeleri doğrultusunda hareket ediniz.

### İletişim Kanalları:
- **Güvenlik E-Posta**: [guvenlik@fenixyangin.com](mailto:guvenlik@fenixyangin.com) / [info@fenixyangin.com](mailto:info@fenixyangin.com)
- **Kurumsal Telefon**: +90 (212) 618 07 01
- **Acil İletişim**: WhatsApp [+90 532 740 90 97](https://wa.me/905327409097)

### Bildirimde Bulunurken:
1. Zafiyetin türünü ve etkilenen URL/bileşeni belirtiniz.
2. Zafiyeti yeniden oluşturmak için adım adım adımları (PoC) paylaşınız.
3. Herhangi bir kullanıcı verisine veya sistem bütünlüğüne zarar verebilecek testlerden kaçınınız.
4. Zafiyeti kamuya açık platformlarda paylaşmadan önce ekibimize çözüm için makul bir süre tanıyınız.

Bildiriminiz alındıktan sonra teknik ekibimiz en geç **48 saat** içerisinde inceleme başlatacak ve süreç hakkında tarafınızı bilgilendirecektir.

---

## 3. Güvenlik Standartları ve İlkeleri

- **Statik Mimari**: Sitemiz dinamik sunucu taraflı kod yürütmeyen, sıfır veritabanı bağımlılığı olan statik HTML/CSS/JS ile çalışır.
- **Sıfır Secret İlkesi**: Kod tabanında hiçbir özel API anahtarı, veritabanı şifresi veya erişim jetonu saklanmaz.
- **HTTPS & Güvenli İletim**: Tüm iletişim TLS 1.3 / HTTPS zorunlu protokolü altında gerçekleştirilir.

---

## 4. Telif ve Mülkiyet Hakkı

Bu yazılım ve içeriğin tüm hakları saklıdır.  
© 2026 Fenix Sistem Yangın Mühendislik Sanayi ve Ticaret A.Ş. — Tüm Hakları Saklıdır.
