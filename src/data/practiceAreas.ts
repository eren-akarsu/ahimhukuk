export interface PracticeArea {
  id: string;
  title: string;
  titleEn: string;
  description: string;
  descriptionEn: string;
  icon: string;
}

export const practiceAreas: PracticeArea[] = [
  {
    id: 'aile-hukuku',
    title: 'Aile Hukuku',
    titleEn: 'Family Law',
    description: 'Anlaşmalı ve çekişmeli boşanma, mal rejiminin tasfiyesi, velayet, nafaka ve soybağı davaları gibi aile hukukundan doğan tüm uyuşmazlıklarda hukuki destek sunuyoruz.',
    descriptionEn: 'We provide legal support in all family law disputes including uncontested and contested divorce, asset liquidation, custody, alimony, and paternity claims.',
    icon: 'Users',
  },
  {
    id: 'ceza-hukuku',
    title: 'Ceza Hukuku',
    titleEn: 'Criminal Law',
    description: 'Soruşturma ve kovuşturma aşamalarında, ağır ceza ve asliye ceza mahkemelerinde sanık müdafiliği ve müşteki/katılan vekilliği süreçlerini titizlikle takip ediyoruz.',
    descriptionEn: 'We meticulously manage criminal defense and victim/complainant representation in high criminal and criminal courts of first instance during investigation and prosecution phases.',
    icon: 'Gavel',
  },
  {
    id: 'is-hukuku',
    title: 'İş Hukuku',
    titleEn: 'Labor & Employment Law',
    description: 'Kıdem ve ihbar tazminatı, fazla mesai, işe iade davaları ile iş sözleşmelerinin hazırlanması ve işçi-işveren ilişkilerinin hukuki zemin üzerine inşası alanlarında çalışmaktayız.',
    descriptionEn: 'We focus on severance and notice pay disputes, overtime claims, reemployment lawsuits, drafting employment contracts, and structuring employee-employer relations legally.',
    icon: 'Briefcase',
  },
  {
    id: 'miras-hukuku',
    title: 'Miras Hukuku',
    titleEn: 'Inheritance Law',
    description: 'Vasiyetname düzenlenmesi, miras sözleşmeleri, veraset ilamı alınması, ortaklığın giderilmesi (izale-i şüyu) ve tenkis davaları gibi miras süreçlerinin takibini yapmaktayız.',
    descriptionEn: 'We follow inheritance processes including drafting wills and inheritance contracts, obtaining certificates of inheritance, dissolution of partnership, and abatement actions.',
    icon: 'Scale',
  },
  {
    id: 'gayrimenkul-hukuku',
    title: 'Gayrimenkul Hukuku',
    titleEn: 'Real Estate & Property Law',
    description: 'Tapu iptal ve tescil davaları, müdahalenin men-i, ecrimisil, kira tespit ve tahliye uyuşmazlıkları ile gayrimenkul alım-satım ve kiralama süreçlerinin danışmanlığını yürütüyoruz.',
    descriptionEn: 'We handle title deed cancellation and registration, prevention of confiscation, occupation compensation, rent determination, eviction disputes, and advise on real estate purchase, sale, and leasing.',
    icon: 'Home',
  },
  {
    id: 'icra-iflas-hukuku',
    title: 'İcra ve İflas Hukuku',
    titleEn: 'Enforcement and Bankruptcy Law',
    description: 'Alacakların tahsili amacıyla icra ve iflas takiplerinin başlatılması, borca itiraz süreçleri, istihkak ve menfi tespit davaları ile alacak-borç yapılandırma işlemlerini yürütüyoruz.',
    descriptionEn: 'We conduct enforcement and bankruptcy proceedings for debt recovery, debt objections, recovery of property, negative clearance actions, and handle debt restructuring transactions.',
    icon: 'FileText',
  },
  {
    id: 'ticaret-hukuku',
    title: 'Ticaret Hukuku',
    titleEn: 'Commercial & Corporate Law',
    description: 'Şirketler hukuku, ticari sözleşmeler, kıymetli evrak hukuku, haksız rekabet ve ticari uyuşmazlıklardan doğan dava ve tahkim süreçlerinde hukuki temsil sağlıyoruz.',
    descriptionEn: 'We provide legal representation in litigation and arbitration processes involving corporate governance, commercial contracts, negotiable instruments, and unfair competition.',
    icon: 'Building2',
  },
  {
    id: 'sozlesmeler-hukuku',
    title: 'Sözleşmeler Hukuku',
    titleEn: 'Contracts Law',
    description: 'Ticari ve bireysel her türlü sözleşmenin hazırlanması, incelenmesi, risk analizlerinin yapılması ve sözleşmeden doğan uyuşmazlıkların çözüm süreçlerini yönetiyoruz.',
    descriptionEn: 'We execute drafting and examination of commercial and private contracts, conduct risk assessments, and manage dispute resolutions arising from contract violations.',
    icon: 'FileSignature',
  },
  {
    id: 'tuketici-hukuku',
    title: 'Tüketici Hukuku',
    titleEn: 'Consumer Protection Law',
    description: 'Tüketici Hakem Heyetleri ve Tüketici Mahkemeleri nezdinde ayıplı mal ve hizmetler, mesafeli satış sözleşmeleri ve bankacılık uyuşmazlıklarında hak arama süreçlerini takip ediyoruz.',
    descriptionEn: 'We represent clients before Consumer Arbitration Committees and Consumer Courts in disputes concerning defective goods and services, distance sales agreements, and banking claims.',
    icon: 'ShoppingCart',
  },
];
