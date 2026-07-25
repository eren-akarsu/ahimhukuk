export interface Principle {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export const principles: Principle[] = [
  {
    id: 'guvenilir-hizmet',
    title: 'Güvenilir Hizmet',
    description: 'Her dosya, müvekkilin hukuki menfaatleri gözetilerek dikkatle değerlendirilir.',
    icon: 'ShieldCheck',
  },
  {
    id: 'seffaf-iletisim',
    title: 'Şeffaf İletişim',
    description: 'Süreçler hakkında açık, anlaşılır ve düzenli bilgilendirme yapılması esas alınır.',
    icon: 'MessageSquareText',
  },
  {
    id: 'gizlilik-ilkesi',
    title: 'Gizlilik İlkesi',
    description: 'Müvekkil bilgileri ve dosya içerikleri gizlilik ilkesi çerçevesinde korunur.',
    icon: 'Lock',
  },
  {
    id: 'titiz-dosya-takibi',
    title: 'Titiz Dosya Takibi',
    description: 'Dava ve danışmanlık süreçleri usul kuralları ve süreler dikkate alınarak takip edilir.',
    icon: 'FileSpreadsheet',
  },
  {
    id: 'cozum-odakli-yaklasim',
    title: 'Çözüm Odaklı Yaklaşım',
    description: 'Uyuşmazlıkların niteliğine göre etkili ve uygulanabilir hukuki yollar değerlendirilir.',
    icon: 'Lightbulb',
  },
  {
    id: 'profesyonel-temsil',
    title: 'Profesyonel Temsil',
    description: 'Yargılama ve danışmanlık süreçlerinde mesleki özen ve sorumlulukla hareket edilir.',
    icon: 'Briefcase',
  },
];
