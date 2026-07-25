export interface BlogPost {
  id: string;
  title: string;
  titleEn: string;
  category: string;
  categoryEn: string;
  summary: string;
  summaryEn: string;
  content: string;
  contentEn: string;
  date: string;
  dateEn: string;
  readTime: string;
  readTimeEn: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: 'bosanma-davasinda-kusur-degerlendirmesi',
    title: 'Boşanma Davasında Kusur Değerlendirmesi',
    titleEn: 'Fault Evaluation in Divorce Lawsuits',
    category: 'Aile Hukuku',
    categoryEn: 'Family Law',
    summary: 'Türk Medeni Kanunu uyarınca boşanma davalarında kusur tespiti, tazminat, velayet ve nafaka haklarını doğrudan etkileyen en temel unsurdur. Yargı kararları ışığında kusur sayılan davranışları inceliyoruz.',
    summaryEn: 'Under the Turkish Civil Code, fault determination in divorce cases is the main factor directly impacting alimony, custody, and financial compensations. We analyze behaviors deemed as fault under judicial precedents.',
    content: 'Boşanma davalarında kusur tespiti, davanın seyrini ve mali sonuçlarını belirleyen en önemli unsurdur. Kanunumuzda yer alan genel boşanma sebebi (evlilik birliğinin temelinden sarsılması) kapsamında tarafların birbirlerine karşı gerçekleştirdikleri kusurlu davranışlar mahkemece değerlendirilir. Eşlerin sadakat yükümlülüğüne aykırı davranması, fiziksel veya psikolojik şiddet uygulaması, aile birliğinin sorumluluklarını yerine getirmemesi gibi olgular kusur araştırmasında dikkate alınır. Kusuru daha ağır olan tarafın diğer tarafa maddi ve manevi tazminat ödemesi gündeme gelebileceği gibi, nafaka ve velayet konularında da kusur derecesi yargısal takdirde önemli rol oynar.',
    contentEn: 'Fault determination in divorce cases determines the course and financial outcomes of the lawsuit. Within the scope of the general ground for divorce (irretrievable breakdown of the marriage), faulty behaviors such as infidelity, physical or psychological violence, or neglecting family duties are assessed. The party with heavier fault may be ordered to pay material and moral damages, and the degree of fault plays a key role in alimony and custody rulings.',
    date: '15 Haziran 2026',
    dateEn: 'June 15, 2026',
    readTime: '4 dk okuma',
    readTimeEn: '4 min read',
  },
  {
    id: 'iscilik-alacaklarinda-dava-sureci',
    title: 'İşçilik Alacaklarında Dava Süreci',
    titleEn: 'Litigation Process for Employee Receivables',
    category: 'İş Hukuku',
    categoryEn: 'Labor Law',
    summary: 'Kıdem tazminatı, ihbar tazminatı, fazla mesai ücreti gibi işçilik alacaklarının dava yoluyla tahsilinde zorunlu arabuluculuk aşaması ve zamanaşımı süreleri kritik önem taşımaktadır.',
    summaryEn: 'Mandatory mediation steps and statute of limitations play critical roles in collecting labor claims such as severance, notice pay, and overtime wages through litigation.',
    content: 'İşçi ve işveren arasındaki uyuşmazlıklarda kıdem tazminatı, ihbar tazminatı, fazla çalışma ücreti, yıllık ücretli izin alacakları gibi hakların talep edilebilmesi için belirli yasal usullerin takip edilmesi zorunludur. İş kanunumuz gereğince, işçilik alacakları davaları açılmadan önce arabuluculuk kurumuna başvuru yapılması yasal bir zorunluluktur. Arabuluculuk sürecinde anlaşma sağlanamaması durumunda, hazırlanan son tutanak ile birlikte İş Mahkemesinde dava açılabilmektedir. Bu süreçte dikkat edilmesi gereken en önemli hususlardan biri zamanaşımı süreleridir; kıdem ve ihbar tazminatında zamanaşımı süresi 5 yıldır. İspat yükü bakımından ise ücret bordroları, iş yeri kayıtları ve tanık beyanları büyük önem taşır.',
    contentEn: 'Specific legal procedures must be followed to claim rights such as severance, notice pay, overtime wages, and annual leaves. Under labor legislation, filing a mediation application is a prerequisite before lawsuits. If mediation fails, a case is initiated at the Labor Courts. Severance and notice pay claims are subject to a 5-year statute of limitation. Payroll records, workplace entries, and witness statements carry primary weight in proof of burden.',
    date: '28 Mayıs 2026',
    dateEn: 'May 28, 2026',
    readTime: '5 dk okuma',
    readTimeEn: '5 min read',
  },
  {
    id: 'miras-paylasiminda-dikkat-edilmesi-gerekenler',
    title: 'Miras Paylaşımında Dikkat Edilmesi Gerekenler',
    titleEn: 'Key Considerations in Estate Partition',
    category: 'Miras Hukuku',
    categoryEn: 'Inheritance Law',
    summary: 'Yasal mirasçılar, saklı pay oranları, terekenin tespiti ve miras ortaklığının giderilmesi (izale-i şüyu) davalarında hak kayıplarını önlemek adına uyulması gereken temel kurallar.',
    summaryEn: 'Essential regulations to prevent loss of rights regarding statutory heirs, reserved shares, asset inventory, and lawsuits for the dissolution of inheritance partnership.',
    content: 'Miras hukuku, bir kişinin vefatı sonrasında geride bıraktığı malvarlığının (tereke) paylaşımını düzenler. Miras paylaşımında öncelikle yasal mirasçılar ve atanmış mirasçılar belirlenir. Kanunda öngörülen saklı pay sahibi mirasçıların (çocuklar, anne-baba, eş) hakları ihlal edilemez. Vefat edenin tasarruf nisabını aşarak yaptığı devirler veya vasiyetnameler saklı pay sahipleri tarafından tenkis davasına konu edilebilir. Miras kalan gayrimenkul veya menkul kıymetlerin rızaen paylaşılamaması durumunda, mirasçılardan her biri ortaklığın giderilmesi (izale-i şüyu) davası açarak malların mahkeme kanalıyla satılarak paylaştırılmasını isteyebilir. Bu süreçlerin hak kaybı yaşanmadan yönetilmesi için usuli işlemler titizlikle takip edilmelidir.',
    contentEn: 'Inheritance law regulates the division of a deceased person\'s estate. Statutory heirs and appointed heirs must be identified first. The rights of heirs with reserved shares (children, parents, spouse) cannot be infringed. Dispositions exceeding disposable ratios or wills can be subject to an abatement action by reserved heirs. If partition is not agreed upon, any heir can file a lawsuit for the dissolution of partnership (izale-i şüyu) for judicial sale and division.',
    date: '10 Mayıs 2026',
    dateEn: 'May 10, 2026',
    readTime: '6 dk okuma',
    readTimeEn: '6 min read',
  },
  {
    id: 'kira-uyusmazliklarinda-hukuki-yollar',
    title: 'Kira Uyuşmazlıklarında Hukuki Yollar',
    titleEn: 'Legal Remedies in Rental Disputes',
    category: 'Gayrimenkul Hukuku',
    categoryEn: 'Real Estate Law',
    summary: 'Kira tespit davaları, kira uyarlama davaları ve tahliye taahhütnamesine dayalı tahliye süreçlerinde yeni yasal düzenlemeler ve arabuluculuk şartı.',
    summaryEn: 'Recent legal updates and mandatory mediation terms concerning rent determination, lease adaptations, and eviction processes based on written commitments.',
    content: 'Son dönemde artan kira uyuşmazlıkları, kira bedelinin tespiti ve tahliye davalarını ön plana çıkarmıştır. 5 yılı dolduran kira sözleşmelerinde taraflar kira tespit davası açarak kiranın emsallere göre yeniden belirlenmesini talep edebilirler. Olağanüstü durumlarda ise kira uyarlama davası gündeme gelebilir. Kiracının tahliyesi ise kanunda sınırlı olarak sayılan nedenlere (ihtiyaç nedeniyle tahliye, esaslı tadilat, tahliye taahhütnamesi vb.) dayanmalıdır. Ayrıca, kira uyuşmazlıklarında da dava şartı arabuluculuk uygulanmaktadır. Arabuluculuk süreci tamamlanmadan doğrudan dava açılması usulden reddi gerektirir. Süreçlerin takibi hem kiralayan hem kiracı açısından kritik yasal haklar barındırır.',
    contentEn: 'Recent rent increases have placed rent determination and eviction lawsuits at the forefront. After 5 years of tenancy, parties can demand rent evaluation based on market conditions. Eviction of a tenant must be based on explicit legal grounds (owner necessity, reconstruction, valid eviction commitment). Furthermore, mediation is a prerequisite before initiating a lawsuit in lease disputes.',
    date: '08 Nisan 2026',
    dateEn: 'April 08, 2026',
    readTime: '5 dk okuma',
    readTimeEn: '5 min read',
  },
];
