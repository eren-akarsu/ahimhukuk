// Legal Parameters Configuration File
// Modüler ve güncellenebilir mevzuat verileri

export interface OfficialHoliday {
  date: string; // YYYY-MM-DD
  name: string;
}

export interface LegalParameters {
  kidemTazminatiTavani: number; // 2026/2025 Dönemi Tavanı (TL)
  damgaVergisiOrani: number; // Kıdem ve ihbar tazminatı damga vergisi
  gelirVergisiOrani: number; // İhbar tazminatı ortalama gelir vergisi stopajı (isteğe bağlı)
  
  harclar: {
    basvuruHarciMaktu: number; // Dava açılış maktu başvuru harcı (TL)
    kararVeiLamHarciNispiOran: number; // binde 68.31
    pesinHarcOrani: number; // Karar ve ilam harcının 1/4'ü
    giderAvansiTahmini: number; // Tahmini ortalama gider avansı
    vekaletHarci: number; // Vekalet harcı
  };

  faizOranlari: {
    yasalFaiz: number; // %
    avansFaizi: number; // %
    ticariFaiz: number; // %
    temerrutFaizi: number; // %
  };

  officialHolidays: OfficialHoliday[];
  
  zamanasimi: {
    category: string;
    items: {
      title: string;
      duration: string;
      description: string;
      basis: string;
    }[];
  }[];
}

export const legalParameters: LegalParameters = {
  // Kıdem Tazminatı Tavanı (Güncellenebilir)
  kidemTazminatiTavani: 46637.43,
  damgaVergisiOrani: 0.00759,
  gelirVergisiOrani: 0.15,

  // Harç Tarifeleri (Güncellenebilir)
  harclar: {
    basvuruHarciMaktu: 627.50,
    kararVeiLamHarciNispiOran: 0.06831,
    pesinHarcOrani: 0.25,
    giderAvansiTahmini: 1800.00,
    vekaletHarci: 75.00
  },

  // Faiz Oranları (%)
  faizOranlari: {
    yasalFaiz: 24.0,
    avansFaizi: 48.0,
    ticariFaiz: 48.0,
    temerrutFaizi: 24.0
  },

  // Resmi Tatil Listesi (Sabit ve Dini Bayram Günleri)
  officialHolidays: [
    // 2025 - 2026 Resmi Tatiller
    { date: '2025-01-01', name: 'Yılbaşı' },
    { date: '2025-03-30', name: 'Ramazan Bayramı 1. Gün' },
    { date: '2025-03-31', name: 'Ramazan Bayramı 2. Gün' },
    { date: '2025-04-01', name: 'Ramazan Bayramı 3. Gün' },
    { date: '2025-04-23', name: 'Ulusal Egemenlik ve Çocuk Bayramı' },
    { date: '2025-05-01', name: 'Emek ve Dayanışma Günü' },
    { date: '2025-05-19', name: 'Atatürk\'ü Anma, Gençlik ve Spor Bayramı' },
    { date: '2025-06-06', name: 'Kurban Bayramı 1. Gün' },
    { date: '2025-06-07', name: 'Kurban Bayramı 2. Gün' },
    { date: '2025-06-08', name: 'Kurban Bayramı 3. Gün' },
    { date: '2025-06-09', name: 'Kurban Bayramı 4. Gün' },
    { date: '2025-07-15', name: '15 Temmuz Demokrasi ve Milli Birlik Günü' },
    { date: '2025-08-30', name: 'Zafer Bayramı' },
    { date: '2025-10-29', name: 'Cumhuriyet Bayramı' },
    
    // 2026
    { date: '2026-01-01', name: 'Yılbaşı' },
    { date: '2026-03-20', name: 'Ramazan Bayramı 1. Gün' },
    { date: '2026-03-21', name: 'Ramazan Bayramı 2. Gün' },
    { date: '2026-03-22', name: 'Ramazan Bayramı 3. Gün' },
    { date: '2026-04-23', name: 'Ulusal Egemenlik ve Çocuk Bayramı' },
    { date: '2026-05-01', name: 'Emek ve Dayanışma Günü' },
    { date: '2026-05-19', name: 'Atatürk\'ü Anma, Gençlik ve Spor Bayramı' },
    { date: '2026-05-27', name: 'Kurban Bayramı 1. Gün' },
    { date: '2026-05-28', name: 'Kurban Bayramı 2. Gün' },
    { date: '2026-05-29', name: 'Kurban Bayramı 3. Gün' },
    { date: '2026-05-30', name: 'Kurban Bayramı 4. Gün' },
    { date: '2026-07-15', name: '15 Temmuz Demokrasi ve Milli Birlik Günü' },
    { date: '2026-08-30', name: 'Zafer Bayramı' },
    { date: '2026-10-29', name: 'Cumhuriyet Bayramı' },
  ],

  // Zamanaşımı Bilgi Kütüphanesi
  zamanasimi: [
    {
      category: 'İş Hukuku',
      items: [
        {
          title: 'Kıdem ve İhbar Tazminatı',
          duration: '5 Yıl',
          description: 'İş sözleşmesinin sona erdiği tarihten itibaren 5 yıllık zamanaşımı süresine tabidir.',
          basis: '7036 sayılı İş Mahkemeleri Kanunu m.15 / Ek Madde 3'
        },
        {
          title: 'Ücret, Fazla Mesai ve Yıllık İzin Alacakları',
          duration: '5 Yıl',
          description: 'Muaccel olduğu (hak edildiği) tarihten itibaren 5 yıl içinde talep edilmelidir.',
          basis: '4857 sayılı İş Kanunu m.32 / TBK m.147'
        },
        {
          title: 'İş Kazası ve Meslek Hastalığı Tazminatı',
          duration: '10 Yıl',
          description: 'Haksız fiil ve sözleşmeye aykırılık kapsamında olayın meydana geldiği tarihten itibaren 10 yıldır.',
          basis: '6098 sayılı TBK m.146'
        },
        {
          title: 'İşe İade Davası Açma Süresi',
          duration: '1 Ay (Son Tutanaktan 2 Hafta)',
          description: 'Fesih bildiriminden itibaren 1 ay içinde arabulucuya başvurulmalı, son tutanaktan itibaren 2 hafta içinde dava açılmalıdır.',
          basis: '4857 s. İş Kanunu m.20'
        }
      ]
    },
    {
      category: 'Ticaret Hukuku',
      items: [
        {
          title: 'Kambiyo Senetleri (Çek, Poliçe, Bono) Takibi',
          duration: '3 Yıl',
          description: 'Poliçe ve bono hamili için vadeden itibaren 3 yıl; çek için ibraz süresinin bitiminden itibaren 3 yıldır.',
          basis: '6102 sayılı TTK m.749 / m.814'
        },
        {
          title: 'Haksız Rekabet Davaları',
          duration: '1 Yıl / 3 Yıl',
          description: 'Dava hakkının öğrenildiği tarihten itibaren 1 yıl ve her halde fiilin doğumundan itibaren 3 yıl.',
          basis: '6102 sayılı TTK m.60'
        },
        {
          title: 'Şirket Ortaklarının Sorumluluğu',
          duration: '5 Yıl',
          description: 'Ortakların veya yöneticilerin kanundan veya esas sözleşmeden doğan yükümlülüklerini ihlali durumunda 5 yıl.',
          basis: '6102 sayılı TTK m.560'
        }
      ]
    },
    {
      category: 'Borçlar Hukuku',
      items: [
        {
          title: 'Genel Zamanaşımı Süresi',
          duration: '10 Yıl',
          description: 'Kanunda aksine bir hüküm bulunmadıkça her alacak 10 yıllık zamanaşımına tabidir.',
          basis: '6098 sayılı TBK m.146'
        },
        {
          title: 'Kira Alacakları ve Dönemsel Edimler',
          duration: '5 Yıl',
          description: 'Kira bedelleri, dönemsel edimler ve alacaklar 5 yıllık zamanaşımına tabidir.',
          basis: '6098 sayılı TBK m.147'
        },
        {
          title: 'Haksız Fiil Tazminatı',
          duration: '2 Yıl / 10 Yıl',
          description: 'Zararın ve tazminat yükümlüsünün öğrenildiği tarihten itibaren 2 yıl, her halde fiilin işlendiği tarihten itibaren 10 yıl.',
          basis: '6098 sayılı TBK m.72'
        },
        {
          title: 'Sebepsiz Zenginleşme',
          duration: '2 Yıl / 10 Yıl',
          description: 'Hak sahibinin geri isteme hakkını öğrendiği tarihten itibaren 2 yıl, her halde zenginleşmenin gerçekleştiği tarihten itibaren 10 yıl.',
          basis: '6098 sayılı TBK m.82'
        }
      ]
    },
    {
      category: 'Tüketici Hukuku',
      items: [
        {
          title: 'Ayıplı Mal ve Hizmet Davaları',
          duration: '2 Yıl (Konutta 5 Yıl)',
          description: 'Ayıplı malın tesliminden itibaren 2 yıl; konut ve taşınmaz mallarda teslimden itibaren 5 yıldır.',
          basis: '6502 sayılı TKHK m.12'
        },
        {
          title: 'Tüketici Hakem Heyetine Başvuru',
          duration: 'Genel Zamanaşımı',
          description: 'Uyuşmazlığın türüne göre genel borçlar hukuku zamanaşımı süreleri uygulanır.',
          basis: '6502 sayılı TKHK m.68'
        }
      ]
    },
    {
      category: 'Gayrimenkul & Kira Hukuku',
      items: [
        {
          title: 'Ecrimisil (Haksız İşgal Tazminatı)',
          duration: '5 Yıl',
          description: 'Geriye dönük en fazla 5 yıllık haksız işgal tazminatı talep edilebilir.',
          basis: 'Yargıtay İçtihatları Birleştirme Kararları'
        },
        {
          title: 'Kira Uyarlama Davası',
          duration: '5 Yıl Kuralı',
          description: 'Sözleşme başlangıcından itibaren 5 yıl geçtikten sonra hakkaniyete uygun yeni kira bedeli tespiti istenebilir.',
          basis: '6098 sayılı TBK m.344/3'
        },
        {
          title: 'Tapu İptal ve Tescil (Ayni Haklar)',
          duration: 'Zamanaşımına Tabi Değildir',
          description: 'Mülkiyet hakkı ayni hak olduğundan, mutlak muvazaa veya haklı mülkiyet iddialarında zamanaşımı işlemez.',
          basis: '4721 sayılı TMK m.705 ve devamı'
        }
      ]
    }
  ]
};
