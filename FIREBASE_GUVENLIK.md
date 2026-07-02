# Firebase Güvenlik Notları

## Durum (2026-07-02 tespiti)

Realtime Database kuralları tamamen açıktı (`.read: true, .write: true`).
İnternetten doğrulandı: `kullanicilar`, `applications`, `referees`, `logs` dahil
**tüm veri okunabiliyordu**. 8 kullanıcı; şifreler **tuzsuz SHA-256** (bcrypt değil),
`kullaniciAdi + rolAdi + sifreHash` herkese açıktı.

Uygulama **Firebase Auth kullanmıyor** — giriş tamamen istemci tarafında
(`kullanicilar` node'undan `sifreHash` okuyup localStorage'a yazarak). Bu yüzden
kurallarda `auth != null` **kullanılamaz**; gerçek yetkilendirme ancak uygulama
Firebase Auth'a taşınırsa (kaynak kod gerekir) mümkün.

## Bu kural setinin YAPTIĞI (`database.rules.json`)

- Kök (`/`) okuma ve yazmayı **kapatır** → tüm veritabanının tek çağrıda
  silinmesi / üzerine yazılması engellenir.
- Yalnızca uygulamanın kullandığı bilinen node'lara izin verir → tanımsız
  node'lara çöp/spam yazımı engellenir.

## Bu kural setinin YAPMADIĞI (önemli)

- Şifre hash'lerinin okunmasını **engellemez** (giriş akışı `kullanicilar`
  okumak zorunda). Kalıcı çözüm = Firebase Auth entegrasyonu (kaynak kod).
- Bilinen node'lar hâlâ herkese açık okunur/yazılır (auth olmadığı için).

## ACİL yapılması gerekenler (Console'dan)

1. **8 kullanıcının şifresini değiştir** — hash'ler açığa çıktı, kırılmış kabul et.
2. **Veriyi yedekle** — Console → Realtime Database → Export JSON.

## Kuralları deploy etme

```bash
npx firebase-tools login          # Google hesabıyla (bir kez)
npx firebase-tools deploy --only database
```

## Deploy ETMEDEN önce test et

Kurallar simülatöründe (Console → Realtime Database → Rules → Playground) veya
staging'de dene. Uygulamada burada listelenmeyen bir node kullanılıyorsa o özellik
"permission denied" alır — o durumda ilgili node'u `database.rules.json`'a ekle.

Bilinen node'lar: competitions, criteria, referees, announcements, applications,
reports, logs, kullanicilar, ritmik_yarismalar, aerobik_yarismalar,
trampolin_yarismalar, parkur_yarismalar
