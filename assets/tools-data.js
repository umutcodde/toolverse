// ToolVerse - Tüm Araçlar Veritabanı
// 50+ araç her kategoriye dağıtılmış

const TOOLS_DATA = [
  // ===== METIN ARAÇLARI (15) =====
  {
    id: 'word-counter',
    name: 'Word Counter',
    description: 'Kelime, karakter ve satır sayısını anında hesapla.',
    category: 'metin',
    icon: '✎',
    link: '/tools/word-counter.html',
    keywords: 'kelime karakter sayaç'
  },
  {
    id: 'text-case-converter',
    name: 'Text Case Converter',
    description: 'Metni büyük/küçük harf, title case vb. dönüştür.',
    category: 'metin',
    icon: 'Aa',
    link: '/tools/text-case-converter.html',
    keywords: 'büyük küçük harf dönüştür'
  },
  {
    id: 'reverse-text',
    name: 'Reverse Text',
    description: 'Metni tersten yazılışını göster.',
    category: 'metin',
    icon: '↶',
    link: '/tools/reverse-text.html',
    keywords: 'ters yazı tersine'
  },
  {
    id: 'remove-duplicates',
    name: 'Remove Duplicates',
    description: 'Metin içindeki tekrar eden kelimeleri kaldır.',
    category: 'metin',
    icon: '∅',
    link: '/tools/remove-duplicates.html',
    keywords: 'tekrar eden kelime sil'
  },
  {
    id: 'text-to-slug',
    name: 'Text to Slug',
    description: 'URL-uyumlu slug metni oluştur.',
    category: 'metin',
    icon: '//',
    link: '/tools/text-to-slug.html',
    keywords: 'slug url seo'
  },
  {
    id: 'word-frequency',
    name: 'Word Frequency',
    description: 'Metindeki en sık kullanılan kelimeleri analiz et.',
    category: 'metin',
    icon: '📊',
    link: '/tools/word-frequency.html',
    keywords: 'frekans analiz istatistik'
  },
  {
    id: 'whitespace-remover',
    name: 'Whitespace Remover',
    description: 'Gereksiz boşlukları temizle.',
    category: 'metin',
    icon: '⎵',
    link: '/tools/whitespace-remover.html',
    keywords: 'boşluk temizle'
  },
  {
    id: 'comma-separator',
    name: 'Comma Separator',
    description: 'Satırları virgülle ayrılmış yazıya çevir.',
    category: 'metin',
    icon: ',',
    link: '/tools/comma-separator.html',
    keywords: 'virgül ayraç csv'
  },
  {
    id: 'text-statistics',
    name: 'Text Statistics',
    description: 'Metin hakkında detaylı istatistikler göster.',
    category: 'metin',
    icon: '📈',
    link: '/tools/text-statistics.html',
    keywords: 'istatistik analiz'
  },
  {
    id: 'markdown-to-html',
    name: 'Markdown to HTML',
    description: 'Markdown metni HTML koda çevir.',
    category: 'metin',
    icon: '⌨',
    link: '/tools/markdown-to-html.html',
    keywords: 'markdown html çevir'
  },
  {
    id: 'plagiarism-checker',
    name: 'Plagiarism Checker',
    description: 'Metin içindeki tekrar oranını kontrol et.',
    category: 'metin',
    icon: '🔍',
    link: '/tools/plagiarism-checker.html',
    keywords: 'tekrar aynılık kontrol'
  },
  {
    id: 'lorem-ipsum',
    name: 'Lorem Ipsum Generator',
    description: 'Geçici metin ve paragraf oluştur.',
    category: 'metin',
    icon: '📝',
    link: '/tools/lorem-ipsum.html',
    keywords: 'dummy metin'
  },
  {
    id: 'text-minifier',
    name: 'Text Minifier',
    description: 'Metni sıkıştır ve boyutunu küçült.',
    category: 'metin',
    icon: '💾',
    link: '/tools/text-minifier.html',
    keywords: 'sıkıştır boyut'
  },
  {
    id: 'text-diff',
    name: 'Text Diff Checker',
    description: 'İki metin arasındaki farkları göster.',
    category: 'metin',
    icon: '≠',
    link: '/tools/text-diff.html',
    keywords: 'fark karşılaştır'
  },
  {
    id: 'json-to-text',
    name: 'JSON to Text',
    description: 'JSON formatını okunabilir metne çevir.',
    category: 'metin',
    icon: '{}',
    link: '/tools/json-to-text.html',
    keywords: 'json dönüştür'
  },

  // ===== GELİŞTİRİCİ ARAÇLARI (15) =====
  {
    id: 'json-formatter',
    name: 'JSON Formatter',
    description: 'JSON verini düzenle, doğrula ve okunabilir hale getir.',
    category: 'geliştirici',
    icon: '{ }',
    link: '/tools/json-formatter.html',
    keywords: 'json formatter düzenle'
  },
  {
    id: 'base64-encoder',
    name: 'Base64 Encode/Decode',
    description: 'Metni Base64 formatına çevir veya çöz.',
    category: 'geliştirici',
    icon: '64',
    link: '/tools/base64-encoder.html',
    keywords: 'base64 encode decode'
  },
  {
    id: 'uuid-generator',
    name: 'UUID Generator',
    description: 'Benzersiz UUID/GUID değerleri oluştur.',
    category: 'geliştirici',
    icon: '#',
    link: '/tools/uuid-generator.html',
    keywords: 'uuid guid kimlik'
  },
  {
    id: 'url-encoder',
    name: 'URL Encoder/Decoder',
    description: 'URL'i encode/decode et.',
    category: 'geliştirici',
    icon: '🔗',
    link: '/tools/url-encoder.html',
    keywords: 'url encode decode'
  },
  {
    id: 'html-minifier',
    name: 'HTML Minifier',
    description: 'HTML kodunu sıkıştır.',
    category: 'geliştirici',
    icon: '<>',
    link: '/tools/html-minifier.html',
    keywords: 'html sıkıştır minify'
  },
  {
    id: 'css-minifier',
    name: 'CSS Minifier',
    description: 'CSS kodunu sıkıştır.',
    category: 'geliştirici',
    icon: '🎨',
    link: '/tools/css-minifier.html',
    keywords: 'css sıkıştır minify'
  },
  {
    id: 'javascript-minifier',
    name: 'JavaScript Minifier',
    description: 'JavaScript kodunu sıkıştır.',
    category: 'geliştirici',
    icon: 'JS',
    link: '/tools/javascript-minifier.html',
    keywords: 'javascript sıkıştır minify'
  },
  {
    id: 'hex-to-rgb',
    name: 'Hex to RGB Converter',
    description: 'HEX renk kodunu RGB'ye çevir.',
    category: 'geliştirici',
    icon: '🎨',
    link: '/tools/hex-to-rgb.html',
    keywords: 'hex rgb renk çevir'
  },
  {
    id: 'regex-tester',
    name: 'Regex Tester',
    description: 'Regex desenlerini test et ve kontrol et.',
    category: 'geliştirici',
    icon: '//',
    link: '/tools/regex-tester.html',
    keywords: 'regex pattern test'
  },
  {
    id: 'unix-timestamp',
    name: 'Unix Timestamp Converter',
    description: 'Tarih ve Unix timestamp arasında dönüştür.',
    category: 'geliştirici',
    icon: '⏱',
    link: '/tools/unix-timestamp.html',
    keywords: 'timestamp zaman dönüştür'
  },
  {
    id: 'hash-generator',
    name: 'Hash Generator',
    description: 'MD5, SHA1, SHA256 hash değerleri oluştur.',
    category: 'geliştirici',
    icon: '🔐',
    link: '/tools/hash-generator.html',
    keywords: 'hash md5 sha256'
  },
  {
    id: 'sql-formatter',
    name: 'SQL Formatter',
    description: 'SQL sorgularını düzenle ve okunabilir hale getir.',
    category: 'geliştirici',
    icon: '🗄',
    link: '/tools/sql-formatter.html',
    keywords: 'sql query formatter'
  },
  {
    id: 'xml-formatter',
    name: 'XML Formatter',
    description: 'XML kodunu düzenle ve doğrula.',
    category: 'geliştirici',
    icon: '</>',
    link: '/tools/xml-formatter.html',
    keywords: 'xml formatter doğrula'
  },
  {
    id: 'yaml-to-json',
    name: 'YAML to JSON',
    description: 'YAML formatını JSON'a çevir.',
    category: 'geliştirici',
    icon: '⟷',
    link: '/tools/yaml-to-json.html',
    keywords: 'yaml json çevir'
  },
  {
    id: 'cron-parser',
    name: 'Cron Expression Parser',
    description: 'Cron ifadelerini parse et ve açıkla.',
    category: 'geliştirici',
    icon: '⏰',
    link: '/tools/cron-parser.html',
    keywords: 'cron schedule parse'
  },

  // ===== RESİM ARAÇLARI (10) =====
  {
    id: 'qr-code-generator',
    name: 'QR Code Generator',
    description: 'Link, metin veya kartvizit için QR kod oluştur.',
    category: 'resim',
    icon: '▦',
    link: '/tools/qr-code-generator.html',
    keywords: 'qr kod oluştur'
  },
  {
    id: 'image-resizer',
    name: 'Image Resizer',
    description: 'Resim boyutunu değiştir.',
    category: 'resim',
    icon: '📐',
    link: '/tools/image-resizer.html',
    keywords: 'resim boyut değiştir'
  },
  {
    id: 'image-compressor',
    name: 'Image Compressor',
    description: 'Resimi sıkıştır ve boyutunu küçült.',
    category: 'resim',
    icon: '📦',
    link: '/tools/image-compressor.html',
    keywords: 'resim sıkıştır'
  },
  {
    id: 'favicon-generator',
    name: 'Favicon Generator',
    description: 'Web sitesi ikonu (favicon) oluştur.',
    category: 'resim',
    icon: '🔶',
    link: '/tools/favicon-generator.html',
    keywords: 'favicon icon oluştur'
  },
  {
    id: 'color-palette',
    name: 'Color Palette Generator',
    description: 'Uyumlu renk paleti oluştur.',
    category: 'resim',
    icon: '🎨',
    link: '/tools/color-palette.html',
    keywords: 'renk palet uyumlu'
  },
  {
    id: 'barcode-generator',
    name: 'Barcode Generator',
    description: 'Çeşitli formatlarda barkod oluştur.',
    category: 'resim',
    icon: '|||||',
    link: '/tools/barcode-generator.html',
    keywords: 'barkod code128'
  },
  {
    id: 'ascii-art',
    name: 'ASCII Art Generator',
    description: 'Metinden ASCII sanatı oluştur.',
    category: 'resim',
    icon: '▀▄',
    link: '/tools/ascii-art.html',
    keywords: 'ascii art sanat'
  },
  {
    id: 'gradient-generator',
    name: 'Gradient Generator',
    description: 'CSS gradyan kodu oluştur.',
    category: 'resim',
    icon: '◀▶',
    link: '/tools/gradient-generator.html',
    keywords: 'gradient css renk'
  },
  {
    id: 'image-to-base64',
    name: 'Image to Base64',
    description: 'Resimi Base64 koda çevir.',
    category: 'resim',
    icon: '🖼',
    link: '/tools/image-to-base64.html',
    keywords: 'resim base64 embed'
  },
  {
    id: 'svg-optimizer',
    name: 'SVG Optimizer',
    description: 'SVG dosyasını optimize et.',
    category: 'resim',
    icon: '◇',
    link: '/tools/svg-optimizer.html',
    keywords: 'svg optimize sıkıştır'
  },

  // ===== PDF ARAÇLARI (8) =====
  {
    id: 'pdf-merge',
    name: 'PDF Merge',
    description: 'Birden fazla PDF dosyasını tek dosyada birleştir.',
    category: 'pdf',
    icon: '▤',
    link: '/tools/pdf-merge.html',
    keywords: 'pdf merge birleştir'
  },
  {
    id: 'pdf-splitter',
    name: 'PDF Splitter',
    description: 'PDF dosyasını ayrı sayfalara böl.',
    category: 'pdf',
    icon: '✂',
    link: '/tools/pdf-splitter.html',
    keywords: 'pdf split böl'
  },
  {
    id: 'pdf-compressor',
    name: 'PDF Compressor',
    description: 'PDF dosyasını sıkıştır.',
    category: 'pdf',
    icon: '📦',
    link: '/tools/pdf-compressor.html',
    keywords: 'pdf sıkıştır boyut'
  },
  {
    id: 'word-to-pdf',
    name: 'Word to PDF',
    description: 'Word ve Excel dosyalarını PDF'e çevir.',
    category: 'pdf',
    icon: '📄',
    link: '/tools/word-to-pdf.html',
    keywords: 'word excel pdf çevir'
  },
  {
    id: 'pdf-watermark',
    name: 'PDF Watermark',
    description: 'PDF'e filigran ekle.',
    category: 'pdf',
    icon: '💧',
    link: '/tools/pdf-watermark.html',
    keywords: 'pdf filigran watermark'
  },
  {
    id: 'pdf-page-remover',
    name: 'PDF Page Remover',
    description: 'PDF'ten istediğin sayfaları sil.',
    category: 'pdf',
    icon: '🗑',
    link: '/tools/pdf-page-remover.html',
    keywords: 'pdf sayfa sil'
  },
  {
    id: 'pdf-rotator',
    name: 'PDF Rotator',
    description: 'PDF sayfalarını döndür.',
    category: 'pdf',
    icon: '🔄',
    link: '/tools/pdf-rotator.html',
    keywords: 'pdf döndür rotate'
  },
  {
    id: 'pdf-to-image',
    name: 'PDF to Image',
    description: 'PDF'i resim dosyasına çevir.',
    category: 'pdf',
    icon: '🖼',
    link: '/tools/pdf-to-image.html',
    keywords: 'pdf resim jpg png'
  },

  // ===== HESAPLAYICILAR (10) =====
  {
    id: 'bmi-calculator',
    name: 'BMI Calculator',
    description: 'Vücut kitle indeksini boy ve kilona göre hesapla.',
    category: 'hesap',
    icon: '⚖',
    link: '/tools/bmi-calculator.html',
    keywords: 'bmi vücut kitle'
  },
  {
    id: 'mortgage-calculator',
    name: 'Mortgage Calculator',
    description: 'Ev kredisi ödemesi hesapla.',
    category: 'hesap',
    icon: '🏠',
    link: '/tools/mortgage-calculator.html',
    keywords: 'ipotek kredi hesap'
  },
  {
    id: 'loan-calculator',
    name: 'Loan Calculator',
    description: 'Kredi ödemelerini ve faizleri hesapla.',
    category: 'hesap',
    icon: '💰',
    link: '/tools/loan-calculator.html',
    keywords: 'kredi faiz hesap'
  },
  {
    id: 'compound-interest',
    name: 'Compound Interest Calculator',
    description: 'Bileşik faizleri hesapla.',
    category: 'hesap',
    icon: '📈',
    link: '/tools/compound-interest.html',
    keywords: 'faiz bileşik'
  },
  {
    id: 'age-calculator',
    name: 'Age Calculator',
    description: 'Yaşını ve gün sayısını hesapla.',
    category: 'hesap',
    icon: '🎂',
    link: '/tools/age-calculator.html',
    keywords: 'yaş doğum tarihi'
  },
  {
    id: 'percentage-calculator',
    name: 'Percentage Calculator',
    description: 'Yüzde hesaplamalarını yap.',
    category: 'hesap',
    icon: '%',
    link: '/tools/percentage-calculator.html',
    keywords: 'yüzde oran hesap'
  },
  {
    id: 'tip-calculator',
    name: 'Tip Calculator',
    description: 'Restoranda bahşiş miktarını hesapla.',
    category: 'hesap',
    icon: '🎁',
    link: '/tools/tip-calculator.html',
    keywords: 'bahşiş tip hesap'
  },
  {
    id: 'gpa-calculator',
    name: 'GPA Calculator',
    description: 'Akademik not ortalaması hesapla.',
    category: 'hesap',
    icon: '🎓',
    link: '/tools/gpa-calculator.html',
    keywords: 'gpa not ortalama'
  },
  {
    id: 'calorie-calculator',
    name: 'Calorie Calculator',
    description: 'Günlük kalori ihtiyacını hesapla.',
    category: 'hesap',
    icon: '🔥',
    link: '/tools/calorie-calculator.html',
    keywords: 'kalori beslenme'
  },
  {
    id: 'time-zone-converter',
    name: 'Time Zone Converter',
    description: 'Farklı saat dilimlerine göre saati dönüştür.',
    category: 'hesap',
    icon: '🌍',
    link: '/tools/time-zone-converter.html',
    keywords: 'saat dilimi zaman'
  },

  // ===== SEO ARAÇLARI (7) =====
  {
    id: 'meta-tag-generator',
    name: 'Meta Tag Generator',
    description: 'SEO meta tagları oluştur.',
    category: 'seo',
    icon: '📝',
    link: '/tools/meta-tag-generator.html',
    keywords: 'meta tag seo'
  },
  {
    id: 'keyword-density',
    name: 'Keyword Density Checker',
    description: 'Anahtar kelime yoğunluğunu analiz et.',
    category: 'seo',
    icon: '📊',
    link: '/tools/keyword-density.html',
    keywords: 'keyword density anahtar'
  },
  {
    id: 'sitemap-generator',
    name: 'Sitemap Generator',
    description: 'XML sitemap dosyası oluştur.',
    category: 'seo',
    icon: '🗺',
    link: '/tools/sitemap-generator.html',
    keywords: 'sitemap xml seo'
  },
  {
    id: 'robots-txt-generator',
    name: 'Robots.txt Generator',
    description: 'Robots.txt dosyası oluştur.',
    category: 'seo',
    icon: '🤖',
    link: '/tools/robots-txt-generator.html',
    keywords: 'robots txt crawler'
  },
  {
    id: 'og-meta-generator',
    name: 'Open Graph Meta Generator',
    description: 'Open Graph meta tagları oluştur.',
    category: 'seo',
    icon: '🔗',
    link: '/tools/og-meta-generator.html',
    keywords: 'open graph og meta'
  },
  {
    id: 'page-speed-analyzer',
    name: 'Page Speed Analyzer',
    description: 'Web sayfası hızını analiz et.',
    category: 'seo',
    icon: '⚡',
    link: '/tools/page-speed-analyzer.html',
    keywords: 'hız performance speed'
  },
  {
    id: 'backlink-checker',
    name: 'Backlink Checker',
    description: 'Web sitesine gelen linkleri kontrol et.',
    category: 'seo',
    icon: '🔗',
    link: '/tools/backlink-checker.html',
    keywords: 'backlink link checker'
  },

  // ===== DÖNÜŞTÜRÜCÜ ARAÇLARI (8) =====
  {
    id: 'temperature-converter',
    name: 'Temperature Converter',
    description: 'Sıcaklık birimlerini çevir.',
    category: 'dönüştürücü',
    icon: '🌡',
    link: '/tools/temperature-converter.html',
    keywords: 'sıcaklık celsius fahrenheit'
  },
  {
    id: 'length-converter',
    name: 'Length Converter',
    description: 'Uzunluk birimlerini çevir.',
    category: 'dönüştürücü',
    icon: '📏',
    link: '/tools/length-converter.html',
    keywords: 'meter foot inch'
  },
  {
    id: 'weight-converter',
    name: 'Weight Converter',
    description: 'Ağırlık birimlerini çevir.',
    category: 'dönüştürücü',
    icon: '⚖',
    link: '/tools/weight-converter.html',
    keywords: 'kg pound ounce'
  },
  {
    id: 'volume-converter',
    name: 'Volume Converter',
    description: 'Hacim birimlerini çevir.',
    category: 'dönüştürücü',
    icon: '📦',
    link: '/tools/volume-converter.html',
    keywords: 'litre gallon ml'
  },
  {
    id: 'currency-converter',
    name: 'Currency Converter',
    description: 'Para birimlerini çevir (canlı oranlar).',
    category: 'dönüştürücü',
    icon: '💵',
    link: '/tools/currency-converter.html',
    keywords: 'para döviz kurlar'
  },
  {
    id: 'speed-converter',
    name: 'Speed Converter',
    description: 'Hız birimlerini çevir.',
    category: 'dönüştürücü',
    icon: '🚀',
    link: '/tools/speed-converter.html',
    keywords: 'hız km/h mph'
  },
  {
    id: 'storage-converter',
    name: 'Storage Converter',
    description: 'Depolama birimlerini çevir.',
    category: 'dönüştürücü',
    icon: '💾',
    link: '/tools/storage-converter.html',
    keywords: 'byte kb mb gb'
  },
  {
    id: 'energy-converter',
    name: 'Energy Converter',
    description: 'Enerji birimlerini çevir.',
    category: 'dönüştürücü',
    icon: '⚡',
    link: '/tools/energy-converter.html',
    keywords: 'joule calorie kwh'
  },

  // ===== RENK ARAÇLARI (5) =====
  {
    id: 'color-picker',
    name: 'Color Picker',
    description: 'Renk seç ve kodlarını al.',
    category: 'renk',
    icon: '🎨',
    link: '/tools/color-picker.html',
    keywords: 'renk seç picker hex'
  },
  {
    id: 'color-name-finder',
    name: 'Color Name Finder',
    description: 'Renk kodundan adını bulunuz.',
    category: 'renk',
    icon: '🎨',
    link: '/tools/color-name-finder.html',
    keywords: 'renk ad isim finder'
  },
  {
    id: 'contrast-checker',
    name: 'Contrast Checker',
    description: 'Renk kontrastını kontrol et (A11y).',
    category: 'renk',
    icon: '⚫⚪',
    link: '/tools/contrast-checker.html',
    keywords: 'contrast accessibility'
  },
  {
    id: 'color-blind-simulator',
    name: 'Color Blind Simulator',
    description: 'Resmi renk körü gözüyle göster.',
    category: 'renk',
    icon: '👁',
    link: '/tools/color-blind-simulator.html',
    keywords: 'color blind daltonism'
  },
  {
    id: 'cmyk-converter',
    name: 'CMYK Converter',
    description: 'RGB ve CMYK renk kodlarını çevir.',
    category: 'renk',
    icon: '🖨',
    link: '/tools/cmyk-converter.html',
    keywords: 'cmyk rgb print'
  },

  // ===== RASTGELE ÜRETICILER (5) =====
  {
    id: 'password-generator',
    name: 'Password Generator',
    description: 'Güçlü, rastgele ve güvenli şifreler oluştur.',
    category: 'rastgele',
    icon: '🔐',
    link: '/tools/password-generator.html',
    keywords: 'şifre password generator'
  },
  {
    id: 'random-name-generator',
    name: 'Random Name Generator',
    description: 'Rastgele isimler oluştur.',
    category: 'rastgele',
    icon: '👤',
    link: '/tools/random-name-generator.html',
    keywords: 'isim ad rastgele'
  },
  {
    id: 'random-email-generator',
    name: 'Random Email Generator',
    description: 'Geçici email adresleri oluştur.',
    category: 'rastgele',
    icon: '✉',
    link: '/tools/random-email-generator.html',
    keywords: 'email temporary'
  },
  {
    id: 'random-number-generator',
    name: 'Random Number Generator',
    description: 'Rastgele sayılar oluştur.',
    category: 'rastgele',
    icon: '🎲',
    link: '/tools/random-number-generator.html',
    keywords: 'rastgele sayı number'
  },
  {
    id: 'dice-roller',
    name: 'Dice Roller',
    description: 'Zar at ve sonuç gör.',
    category: 'rastgele',
    icon: '🎲',
    link: '/tools/dice-roller.html',
    keywords: 'zar at oyna'
  },

  // ===== GÜVENLİK ARAÇLARI (3) =====
  {
    id: 'password-strength-checker',
    name: 'Password Strength Checker',
    description: 'Şifrenin gücünü analiz et.',
    category: 'güvenlik',
    icon: '🔐',
    link: '/tools/password-strength-checker.html',
    keywords: 'şifre güç analiz'
  },
  {
    id: 'password-cracker-tester',
    name: 'Password Cracker Tester',
    description: 'Şifre kırılma süresini test et.',
    category: 'güvenlik',
    icon: '⚔',
    link: '/tools/password-cracker-tester.html',
    keywords: 'şifre kırma güvenlik'
  },
  {
    id: 'ssl-checker',
    name: 'SSL Certificate Checker',
    description: 'SSL sertifikasını kontrol et.',
    category: 'güvenlik',
    icon: '🔒',
    link: '/tools/ssl-checker.html',
    keywords: 'ssl certificate https'
  },
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = TOOLS_DATA;
}
