export interface Translations {
  // Navigation
  navHome: string;
  navAbout: string;
  navServices: string;
  navBlog: string;
  navContact: string;

  // Hero
  heroHeaderSubtitle: string;
  heroTitle: string;
  heroSubtitle: string;
  heroDescription: string;
  heroCtaButton: string;
  heroMoreButton: string;

  // Office Gallery (Hukuk Büromuz)
  gallerySubtitle: string;
  galleryTitle: string;

  // Hizmetlerimiz (Practice Areas)
  servicesSubtitle: string;
  servicesTitle: string;
  servicesDescription: string;
  servicesDetailsButton: string;
  servicesModalSub: string;
  servicesModalClose: string;
  servicesModalFooterText: string;

  // Hakkımızda (About)
  aboutSubtitle: string;
  aboutTitle: string;
  aboutLawyerTitle: string;
  aboutKurucu: string;
  aboutBioPara1: string;
  aboutBioPara2: string;
  aboutBioPara3: string;
  aboutBioPara4: string;
  aboutBioPara5: string;
  aboutBioPara6: string;
  aboutCard1Title: string;
  aboutCard1Desc: string;
  aboutCard2Title: string;
  aboutCard2Desc: string;
  aboutCard3Title: string;
  aboutCard3Desc: string;
  aboutCard4Title: string;
  aboutCard4Desc: string;

  // İlkelerimiz (Principles)
  principlesSubtitle: string;
  principlesTitle: string;
  principle1Title: string;
  principle1Desc: string;
  principle2Title: string;
  principle2Desc: string;
  principle3Title: string;
  principle3Desc: string;

  // Yargıtay Kararları (Court Decisions)
  courtSubtitle: string;
  courtTitle: string;
  courtDescription: string;
  courtCaseNo: string;
  courtCardClose: string;

  // Blog
  blogSubtitle: string;
  blogTitle: string;
  blogDescription: string;
  blogReadMore: string;
  blogModalClose: string;

  // Contact
  contactSubtitle: string;
  contactTitle: string;
  contactFormTitle: string;
  contactLabelName: string;
  contactLabelSurname: string;
  contactLabelEmail: string;
  contactLabelTopic: string;
  contactLabelTopicPlaceholder: string;
  contactLabelTopicOther: string;
  contactLabelCity: string;
  contactLabelCityPlaceholder: string;
  contactLabelDistrict: string;
  contactLabelDistrictPlaceholder: string;
  contactLabelMessage: string;
  contactLabelMessagePlaceholder: string;
  contactLabelKvkk: string;
  contactButtonSend: string;
  contactInfoTitle: string;
  contactInfoAddress: string;
  contactInfoPhone: string;
  contactInfoEmail: string;

  // Footer
  footerDescription: string;
  footerLinksTitle: string;
  footerRights: string;
  footerKvkkLink: string;

  // Validation & Toasts
  validationRequiredFields: string;
  validationEmailWarning: string;
  validationKvkkWarning: string;
  validationSuccess: string;
}

export const translations: Record<'tr' | 'en', Translations> = {
  tr: {
    navHome: 'Ana Sayfa',
    navAbout: 'Hakkımızda',
    navServices: 'Hizmetlerimiz',
    navBlog: 'Hukuki İçerikler',
    navContact: 'İletişim',

    heroHeaderSubtitle: 'AVUKATLIK & HUKUKİ DANIŞMANLIK',
    heroTitle: 'Bürosu',
    heroSubtitle: 'Avukatlık ve Hukuki Danışmanlık Hizmetleri',
    heroDescription: 'AHİM Hukuk Bürosu, dava takibi ve hukuki danışmanlık süreçlerinde müvekkillerine mesleki özen, gizlilik ve açık bilgilendirme ilkeleri çerçevesinde hizmet sunmaktadır.',
    heroCtaButton: 'İletişime Geç',
    heroMoreButton: 'Hakkımızda',

    gallerySubtitle: 'OFİSİMİZDEN GÖRÜNTÜLER',
    galleryTitle: 'Hukuk Büromuz',

    servicesSubtitle: 'FAALİYET ALANLARI',
    servicesTitle: 'Hizmetlerimiz',
    servicesDescription: 'AHİM Hukuk Bürosu, farklı hukuk alanlarında danışmanlık, dava takibi ve uyuşmazlık çözüm süreçlerinde müvekkillerine nitelikli ve etkin hukuki destek sunmaktadır.',
    servicesDetailsButton: 'Detaylı Bilgi',
    servicesModalSub: 'HİZMET DETAYI',
    servicesModalClose: 'Kapat',
    servicesModalFooterText: '* AHİM Hukuk Bürosu, Türkiye genelinde kurumsal ve bireysel danışmanlık kapsamında dava, uyuşmazlık çözümü ve süreç yönetimi faaliyetlerini nitelikli kadrosuyla gerçekleştirmektedir.',

    aboutSubtitle: 'KURUCU AVUKATIMIZ',
    aboutTitle: 'Hakkımızda',
    aboutLawyerTitle: 'Av. A. Celil TELLİ',
    aboutKurucu: 'AHİM Hukuk Bürosu Kurucusu',
    aboutBioPara1: 'AHİM Hukuk Bürosu’nun kurucusu Av. A. Celil TELLİ, uzun yıllara dayanan adliye tecrübesi ve uygulamaya hâkimiyetiyle hukuk mesleğine çok yönlü bir bakış açısı kazandırmış bir hukukçudur.',
    aboutBioPara2: 'Meslek hayatına adliyelerde başlayan Av. A. Celil TELLİ, kariyeri boyunca adliyelerin farklı mahkemelerinde kalem birimlerinde görev almış, ilerleyen süreçte yazı işleri müdürü olarak çalışmıştır. Bu görev süresi boyunca neredeyse tüm mahkeme türlerinin işleyişine birebir tanıklık etmiş; dava süreçlerinin mutfağında yer alarak yargı mekanizmasını en ince ayrıntısına kadar gözlemleme imkânı bulmuştur.',
    aboutBioPara3: 'Yazı işleri müdürlüğü görevinde bulunduğu süre boyunca edindiği tecrübe, kendisine yalnızca teorik değil, son derece güçlü bir pratik hukuk bilgisi kazandırmıştır. Mahkemelerin işleyişi, dosya yönetimi, usul kuralları ve yargısal refleksler konusundaki bu birikim, bugün yürüttüğü avukatlık faaliyetlerinin temelini oluşturmaktadır.',
    aboutBioPara4: 'Av. A. Celil TELLİ, İstanbul Okan Üniversitesi Hukuk Fakültesi’nden mezun olmuş, ardından aktif olarak avukatlık mesleğine başlamıştır. Hukuk eğitimi ve mesleki birikimini sahadaki tecrübesiyle birleştirerek, müvekkillerine etkin ve çözüm odaklı hukuki hizmet sunmaktadır.',
    aboutBioPara5: 'İstanbul’daki merkezi ofisinde hizmet vermekle birlikte, Türkiye genelinde ve yurtdışında kurumsal hukuki danışmanlık ve dava takibi yürütmektedir. Ayrıca hukuk alanı dışında da kendisini sürekli geliştiren Av. A. Celil TELLİ, birden çok üniversite diplomasına sahip olup disiplinler arası bir bakış açısıyla çalışmaktadır.',
    aboutBioPara6: 'AHİM Hukuk Bürosu; Av. A. Celil TELLİ’nin yönetiminde, dinamik ve nitelikli bir ekip kadrosu ile faaliyet göstermekte; her dosyayı titizlikle ele alan, güvenilir, şeffaf ve çözüm odaklı bir hizmet anlayışını benimsemektedir. Müvekkillerine yalnızca hukuki temsil değil, aynı zamanda doğru yönlendirme ve açık iletişim sunmayı temel ilke olarak kabul etmektedir.',
    aboutCard1Title: 'Mesleki Özen',
    aboutCard1Desc: 'Hukuki süreçlerde dosyanın niteliği dikkate alınarak dikkatli ve düzenli çalışma anlayışı benimsenir.',
    aboutCard2Title: 'Açık Bilgilendirme',
    aboutCard2Desc: 'Müvekkiller, hukuki süreçlerin aşamaları hakkında sade ve anlaşılır şekilde bilgilendirilir.',
    aboutCard3Title: 'Gizlilik ve Güven',
    aboutCard3Desc: 'Müvekkil bilgileri ve dosya içerikleri mesleki gizlilik ilkesi kapsamında korunur.',
    aboutCard4Title: 'Düzenli Dosya Takibi',
    aboutCard4Desc: 'Dava ve danışmanlık süreçleri, usul kuralları ve süreler gözetilerek takip edilir.',

    principlesSubtitle: 'TEMEL PRENSİPLERİMİZ',
    principlesTitle: 'Çalışma İlkelerimiz',
    principle1Title: 'Mesleki Bağımsızlık',
    principle1Desc: 'Hukuki süreçlerde, her türlü dış etkiden bağımsız olarak yalnızca hukukun üstünlüğü ve müvekkil menfaati gözetilir.',
    principle2Title: 'Süreç Şeffaflığı',
    principle2Desc: 'Dava ve danışmanlık süreçlerindeki tüm aşamalar, yapılan işlemler ve olası sonuçlar açıkça paylaşılır.',
    principle3Title: 'Çözüm Odaklılık',
    principle3Desc: 'Sorunların çözümünde teorik bilgiyi pratik saha tecrübesiyle birleştirerek en etkin ve hızlı yollar belirlenir.',

    courtSubtitle: 'YARGITAY KARARLARI',
    courtTitle: 'Emsal Kararlar',
    courtDescription: 'Hukuki süreçlerde yol gösterici nitelikte olan, yargı pratiğine ve usul kurallarına yön veren seçilmiş Yargıtay kararlarını inceleyebilirsiniz.',
    courtCaseNo: 'Karar No:',
    courtCardClose: 'Kapat',

    blogSubtitle: 'BİLGİLENDİRİCİ YAYINLAR',
    blogTitle: 'Hukuki İçerikler',
    blogDescription: 'Müvekkillerimizi ve hak sahiplerini bilgilendirme amacıyla hazırladığımız hukuki makaleleri ve güncel gelişmeleri inceleyebilirsiniz.',
    blogReadMore: 'Devamını Oku',
    blogModalClose: 'Kapat',

    contactSubtitle: 'BİZE ULAŞIN',
    contactTitle: 'İletişim',
    contactFormTitle: 'İletişim Formu',
    contactLabelName: 'İsim',
    contactLabelSurname: 'Soyisim',
    contactLabelEmail: 'E-posta Adresi',
    contactLabelTopic: 'Hukuki Konu / Dosya Türü',
    contactLabelTopicPlaceholder: 'Lütfen Seçiniz',
    contactLabelTopicOther: 'Diğer Hukuki Konular',
    contactLabelCity: 'Bulunduğu İl',
    contactLabelCityPlaceholder: 'Lütfen Seçiniz',
    contactLabelDistrict: 'İlçe',
    contactLabelDistrictPlaceholder: 'Lütfen Seçiniz',
    contactLabelMessage: 'Görüş Alınmak İstenen Hukuki Durum',
    contactLabelMessagePlaceholder: 'Lütfen detaylı olarak açıklayınız...',
    contactLabelKvkk: 'Kişisel verilerimin, tarafımla iletişime geçilmesi ve hukuki talebimin değerlendirilmesi amacıyla AHİM Hukuk Bürosu tarafından işlenmesine ilişkin aydınlatma metnini okudum ve kabul ediyorum.',
    contactButtonSend: 'Gönder',
    contactInfoTitle: 'İletişim Bilgileri',
    contactInfoAddress: 'Adres',
    contactInfoPhone: 'Telefon',
    contactInfoEmail: 'E-posta',

    footerDescription: 'AHİM Hukuk Bürosu, avukatlık ve hukuki danışmanlık alanlarında hukuki tecrübesi ve çözüm odaklı yaklaşımıyla müvekkillerine nitelikli hizmet sunmaktadır.',
    footerLinksTitle: 'Hızlı Menü',
    footerRights: 'Tüm Hakları Saklıdır.',
    footerKvkkLink: 'KVKK Aydınlatma Metni',

    validationRequiredFields: 'Lütfen zorunlu alanları eksiksiz doldurunuz.',
    validationEmailWarning: 'Lütfen geçerli bir e-posta adresi giriniz.',
    validationKvkkWarning: 'Formu gönderebilmek için KVKK onay kutusunu işaretlemeniz gerekmektedir.',
    validationSuccess: 'Mesajınız başarıyla gönderildi. En kısa sürede tarafınıza dönüş sağlanacaktır.',
  },
  en: {
    navHome: 'Home',
    navAbout: 'About Us',
    navServices: 'Practice Areas',
    navBlog: 'Publications',
    navContact: 'Contact',

    heroHeaderSubtitle: 'ADVOCACY & LEGAL CONSULTANCY',
    heroTitle: 'Law Office',
    heroSubtitle: 'Advocacy and Legal Consultancy Services',
    heroDescription: 'AHİM Law Office provides services to its clients in litigation and legal consultancy processes within the framework of professional care, confidentiality, and open information principles.',
    heroCtaButton: 'Get In Touch',
    heroMoreButton: 'About Us',

    gallerySubtitle: 'VIEWS FROM OUR OFFICE',
    galleryTitle: 'Our Office',

    servicesSubtitle: 'PRACTICE AREAS',
    servicesTitle: 'Our Services',
    servicesDescription: 'AHİM Law Office provides qualified and effective legal support to its clients in consultancy, litigation, and dispute resolution processes in various legal fields.',
    servicesDetailsButton: 'Detailed Info',
    servicesModalSub: 'PRACTICE DETAIL',
    servicesModalClose: 'Close',
    servicesModalFooterText: '* AHİM Law Office carries out litigation, dispute resolution, and process management activities within the scope of corporate and individual consultancy across Turkey with its qualified staff.',

    aboutSubtitle: 'OUR FOUNDER ATTORNEY',
    aboutTitle: 'About Us',
    aboutLawyerTitle: 'Atty. A. Celil TELLİ',
    aboutKurucu: 'Founder of AHİM Law Office',
    aboutBioPara1: 'Atty. A. Celil TELLİ, the founder of AHİM Law Office, is a jurist who has brought a multifaceted perspective to the legal profession with his long years of court experience and dominance over practice.',
    aboutBioPara2: 'Starting his professional career in courts, Atty. A. Celil TELLİ worked in clerk units in different courts and later served as a director of writing affairs. Throughout this career, he witnessed the operation of almost all court types and had the opportunity to observe the judicial mechanism closely by being at the core of case processes.',
    aboutBioPara3: 'The experience he gained as a director of writing affairs provided him with a strong practical legal knowledge, not just theoretical. This accumulation in court management, file administration, procedural rules, and judicial reflexes forms the basis of his current attorney activities.',
    aboutBioPara4: 'Atty. A. Celil TELLİ graduated from Istanbul Okan University Faculty of Law and then actively started his advocacy practice. Combining his legal education and professional experience with field practice, he offers effective and solution-oriented legal services to his clients.',
    aboutBioPara5: 'While providing services in his central office in Istanbul, he also conducts corporate legal consultancy and litigation representation across Turkey and internationally. Constantly improving himself outside the legal field, Atty. A. Celil TELLİ holds multiple university degrees and works with an interdisciplinary perspective.',
    aboutBioPara6: 'Under the management of Atty. A. Celil TELLİ, AHİM Law Office operates with a dynamic and qualified team; adopting a reliable, transparent, and solution-oriented service approach that treats every file meticulously. Our fundamental principle is to offer not just legal representation, but also correct guidance and open communication.',
    aboutCard1Title: 'Professional Care',
    aboutCard1Desc: 'In legal processes, a careful and orderly working approach is adopted, taking into account the nature of the file.',
    aboutCard2Title: 'Open Information',
    aboutCard2Desc: 'Clients are informed in a simple and understandable manner about the stages of legal processes.',
    aboutCard3Title: 'Privacy and Trust',
    aboutCard3Desc: 'Client information and file contents are protected within the scope of the professional confidentiality principle.',
    aboutCard4Title: 'Regular File Tracking',
    aboutCard4Desc: 'Litigation and consultancy processes are tracked in compliance with procedural rules and deadlines.',

    principlesSubtitle: 'OUR CORE VALUES',
    principlesTitle: 'Working Principles',
    principle1Title: 'Professional Independence',
    principle1Desc: 'In legal processes, only the rule of law and the interests of the client are observed, independent of any external influence.',
    principle2Title: 'Process Transparency',
    principle2Desc: 'All stages in the litigation and consultancy processes, the transactions carried out, and potential results are shared openly.',
    principle3Title: 'Solution Orientation',
    principle3Desc: 'In solving problems, the most effective and fastest methods are determined by combining theoretical knowledge with practical field experience.',

    courtSubtitle: 'JUDICIAL PRECEDENTS',
    courtTitle: 'Sample Decisions',
    courtDescription: 'You can review selected Supreme Court decisions that guide legal processes and direct judicial practice and procedural rules.',
    courtCaseNo: 'Decision No:',
    courtCardClose: 'Close',

    blogSubtitle: 'INFORMATIONAL POSTS',
    blogTitle: 'Legal Publications',
    blogDescription: 'You can review our legal articles and current developments prepared to inform our clients and right holders.',
    blogReadMore: 'Read More',
    blogModalClose: 'Close',

    contactSubtitle: 'CONTACT US',
    contactTitle: 'Contact',
    contactFormTitle: 'Contact Form',
    contactLabelName: 'Name',
    contactLabelSurname: 'Surname',
    contactLabelEmail: 'Email Address',
    contactLabelTopic: 'Legal Topic / Case Type',
    contactLabelTopicPlaceholder: 'Please Select',
    contactLabelTopicOther: 'Other Legal Issues',
    contactLabelCity: 'City',
    contactLabelCityPlaceholder: 'Please Select',
    contactLabelDistrict: 'District',
    contactLabelDistrictPlaceholder: 'Please Select',
    contactLabelMessage: 'Legal Situation to Consult',
    contactLabelMessagePlaceholder: 'Please explain in detail...',
    contactLabelKvkk: 'I have read and agree to the information notice regarding the processing of my personal data by AHİM Law Office for the purpose of contact and evaluating my legal request.',
    contactButtonSend: 'Send',
    contactInfoTitle: 'Contact Information',
    contactInfoAddress: 'Address',
    contactInfoPhone: 'Phone',
    contactInfoEmail: 'Email',

    footerDescription: 'AHİM Law Office provides qualified and solution-oriented legal services to its clients in advocacy and legal consultancy fields.',
    footerLinksTitle: 'Quick Links',
    footerRights: 'All Rights Reserved.',
    footerKvkkLink: 'KVKK Information Notice',

    validationRequiredFields: 'Please fill in the required fields completely.',
    validationEmailWarning: 'Please enter a valid email address.',
    validationKvkkWarning: 'You must check the KVKK consent box to submit the form.',
    validationSuccess: 'Your message has been sent successfully. You will be contacted as soon as possible.',
  },
};
