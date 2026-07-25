import React, { useState } from 'react';
import { Mail, MapPin, Phone, X, ArrowUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import logoTransparent from '../../assets/images/logo-transparent.png';
import { Button } from '../ui/Button';
import { useApp } from '../../context/AppContext';

interface FooterProps {}

interface PolicyModalState {
  title: string;
  content: string;
  isOpen: boolean;
}

export const Footer: React.FC<FooterProps> = () => {
  const { language, t } = useApp();
  const [modalState, setModalState] = useState<PolicyModalState>({
    title: '',
    content: '',
    isOpen: false,
  });

  const isTr = language === 'tr';

  const quickLinks = [
    { labelKey: 'navHome', href: '#home' },
    { labelKey: 'navAbout', href: '#about' },
    { labelKey: 'navServices', href: '#services' },
    { labelKey: 'navBlog', href: '#blog' },
    { labelKey: 'navCalculators', href: '#hesaplama' },
    { labelKey: 'navContact', href: '#contact' },
  ];

  const policiesTr = {
    kvkk: {
      title: 'KVKK Aydınlatma Metni',
      content: `AHİM Hukuk Bürosu Kişisel Verilerin İşlenmesi Aydınlatma Metni

6698 sayılı Kişisel Verilerin Korunması Kanunu (“KVKK”) uyarınca, AHİM Hukuk Bürosu (“Büro”) olarak, veri sorumlusu sıfatıyla, kişisel verilerinizin aşağıda açıklanan çerçevede işlenebileceğini bildirmek isteriz.

1. Kişisel Verilerin Elde Edilmesi ve İşlenme Amaçları:
İletişim formunda paylaştığınız isim, soyisim, e-posta adresi, bulunduğunuz il/ilçe ve mesaj içeriğinde belirteceğiniz kişisel verileriniz;
- Tarafınızla iletişime geçilmesi,
- Hukuki talebinizin/dosyanızın değerlendirilmesi,
- İletişim süreçlerinin yürütülmesi ve takibi amaçlarıyla işlenecektir.

2. Kişisel Verilerin Aktarılması:
Kişisel verileriniz, yasal yükümlülüklerin yerine getirilmesi amacıyla yetkili kamu kurum ve kuruluşları ile mahkemeler dışında hiçbir üçüncü şahsa veya kuruma aktarılmamaktadır.

3. Hukuki Sebep ve Yöntem:
Kişisel verileriniz, internet sitemizdeki iletişim formu vasıtasıyla elektronik ortamda toplanmakta olup; KVKK’nın 5/2 maddesi uyarınca “bir sözleşmenin kurulması veya ifasıyla doğrudan doğruya ilgili olması” ve “veri sorumlusunun hukuki yükümlülüğünü yerine getirebilmesi için zorunlu olması” hukuki sebeplerine ve açık rızanıza dayanılarak işlenmektedir.

4. Veri Sahibinin Hakları:
KVKK’nın 11. maddesi uyarınca, Büromuza başvurarak kişisel verilerinizin işlenip işlenmediğini öğrenme, işlenmişse bilgi talep etme, işlenme amacını ve uygun kullanılıp kullanılmadığını öğrenme, eksik veya yanlış işlenmişse düzeltilmesini isteme haklarına sahipsiniz. Başvurularınızı ahimhukuk@gmail.com adresine gönderebilirsiniz.`,
    },
    cerez: {
      title: 'Çerez Politikası',
      content: `AHİM Hukuk Bürosu Çerez Politikası

AHİM Hukuk Bürosu internet sitesinde (Site) kullanıcı deneyimini iyileştirmek, sitenin verimli çalışmasını sağlamak ve performansı ölçmek amacıyla çerezler (cookies) kullanılmaktadır.

1. Çerez Nedir?
Çerezler, bir internet sitesini ziyaret ettiğinizde tarayıcınız aracılığıyla cihazınıza kaydedilen küçük metin dosyalarıdır.

2. Kullandığımız Çerez Türleri:
- Zorunlu Çerezler: Sitenin düzgün çalışması ve temel özelliklerin (güvenlik, form işleme) sunulması için zorunludur.
- Performans ve Analitik Çerezleri: Sitenin nasıl kullanıldığını anlamamıza (örneğin hangi sayfaların daha çok ziyaret edildiğini analiz etmeye) yardımcı olur. Google Maps gibi gömülü araçlar çerez kullanabilir.

3. Çerezleri Nasıl Kontrol Edebilirsiniz?
İnternet tarayıcınızın ayarlarını değiştirerek çerezleri engelleyebilir, sınırlandırabilir veya önceden kaydedilmiş çerezleri silebilirsiniz. Çerezlerin engellenmesi durumunda sitenin bazı özellikleri tam olarak çalışmayabilir.`,
    },
    gizlilik: {
      title: 'Gizlilik Politikası',
      content: `AHİM Hukuk Bürosu Gizlilik Politikası

AHİM Hukuk Bürosu, internet sitemizi ziyaret eden kullanıcıların gizliliğini korumayı ilke edinmiştir. Bu Gizlilik Politikası, sitemiz üzerinden toplanan bilgilerin niteliğini ve nasıl kullanıldığını açıklar.

1. Bilgi Toplama ve Kullanımı:
İnternet sitemiz üzerinden paylaştığınız kişisel bilgiler (ad, soyad, e-posta, iletişim detayları vb.) sadece sizinle doğrudan iletişim kurmak ve talep ettiğiniz hukuki danışmanlık hizmetinin çerçevesini belirlemek amacıyla kullanılır.

2. Veri Güvenliği:
Verilerinin yetkisiz erişime, kayba, ifşaya veya değiştirilmesine karşı korunması amacıyla modern ve güncel teknik ve idari güvenlik önlemleri uygulanmaktadır. İnternet sitemiz SSL sertifikası ile korunmakta ve tüm veri trafiği şifrelenmektedir.

3. Reklam Yasağı ve İlkeler:
Bu gizlilik beyanı ve site içeriği, Türkiye Barolar Birliği’nin Reklam Yasağı Yönetmeliği’ne tam uyumlu olarak tasarlanmıştır. Müvekkil gizliliği ve sır saklama yükümlülüğü avukatlık faaliyetlerimizin en temel taşıdır.`,
    },
    kullanim: {
      title: 'Kullanım Koşulları',
      content: `AHİM Hukuk Bürosu İnternet Sitesi Kullanım Koşulları

1. Bilgilendirme Amaçlı Kullanım:
Bu internet sitesinde yer alan tüm içerikler sadece genel bilgilendirme amacıyla hazırlanmıştır. Sitedeki hiçbir içerik hukuki mütalaa veya profesyonel avukatlık-danışmanlık hizmeti yerine geçmez. Sitede yer alan bilgilere dayanarak gerçekleştirilen işlemlerden kaynaklanan sorumluluk kullanıcıya aittir.

2. Reklam Yasağı Uyumluluğu:
Bu site, Avukatlık Kanunu ve Reklam Yasağı Yönetmeliği kapsamında tasarlanmıştır. Sitede yer alan hiçbir ifade reklam veya iş sağlama amacı taşımamaktadır.

3. Fikri Mülkiyet:
Sitede yer alan logo, tasarım, metinler ve kodlar da dahil olmak üzere tüm materyaller AHİM Hukuk Bürosu’na aittir ve izinsiz kopyalanamaz, çoğaltılamaz veya başka mecralarda yayınlanamaz.

4. İletişim Formu Sorumluluğu:
İletişim formu aracılığıyla gönderilen mesajlar avukat-müvekkil ilişkisi kurmaz. Büro ile resmi bir temsil ilişkisi kurulabilmesi için yazılı bir vekaletname veya sözleşme akdedilmesi gerekmektedir.`,
    },
  };

  const policiesEn = {
    kvkk: {
      title: 'KVKK Information Notice',
      content: `AHİM Law Office Personal Data Processing Information Notice

Pursuant to the Personal Data Protection Law No. 6698 ("KVKK"), as AHİM Law Office ("Office"), in the capacity of data controller, we would like to inform you that your personal data may be processed within the framework explained below.

1. Obtaining and Processing of Personal Data:
Your name, surname, email address, city/district, and personal data you share in the contact form will be processed for the purposes of:
- Contacting you,
- Evaluating your legal requests/case files,
- Conducting and tracking communication processes.

2. Transfer of Personal Data:
Your personal data is not transferred to any third party or institution, except for authorized public institutions and courts to fulfill legal obligations.

3. Legal Grounds and Method:
Your personal data is collected electronically through the contact form on our website; based on the legal grounds of "being directly related to the establishment or performance of a contract" and "being mandatory for the data controller to fulfill its legal obligation" pursuant to Article 5/2 of the KVKK.

4. Rights of the Data Subject:
Pursuant to Article 11 of the KVKK, by applying to our Office, you have the right to learn whether your personal data is processed, request information if processed, learn the purpose of processing, and request correction if it is incomplete or incorrect. You can send your requests to ahimhukuk@gmail.com.`,
    },
    cerez: {
      title: 'Cookie Policy',
      content: `AHİM Law Office Cookie Policy

Cookies are used on the AHİM Law Office website to improve user experience, ensure efficient operation, and measure performance.

1. What is a Cookie?
Cookies are small text files saved on your device through your browser when you visit a website.

2. Types of Cookies We Use:
- Essential Cookies: Mandatory for the proper operation of the site and basic features (security, form processing).
- Performance and Analytical Cookies: Help us understand how the site is used (e.g., analyzing which pages are visited more). Embedded tools like Google Maps may use cookies.

3. How Can You Control Cookies?
You can block, limit, or delete previously saved cookies by changing your browser settings. If cookies are blocked, some features of the site may not work fully.`,
    },
    gizlilik: {
      title: 'Privacy Policy',
      content: `AHİM Law Office Privacy Policy

AHİM Law Office is committed to protecting the privacy of users visiting our website. This Privacy Policy explains the nature of the information collected through our site and how it is used.

1. Information Collection and Use:
Personal information you share through our website (name, surname, email, contact details, etc.) is only used to contact you directly and to determine the framework of the legal service you request.

2. Data Security:
Modern technical and administrative security measures are implemented to protect your data against unauthorized access, loss, disclosure, or modification. Our website is protected with an SSL certificate.

3. Advertising Ban and Principles:
This privacy statement and site content are designed in full compliance with the Union of Turkish Bar Associations Advertising Ban Regulation. Client confidentiality is the cornerstone of our activities.`,
    },
    kullanim: {
      title: 'Terms of Use',
      content: `AHİM Law Office Website Terms of Use

1. Informational Use:
All contents on this website are prepared for general informational purposes only. No content on the site replaces a legal opinion or professional advocacy-consultancy service. The responsibility for transactions carried out based on the information on the site belongs to the user.

2. Compliance with the Advertising Ban:
This site is designed within the scope of the Attorneyship Law and the Advertising Ban Regulation. No statement on the site is intended for advertising or securing business.

3. Intellectual Property:
All materials on the site, including the logo, design, texts, and codes, belong to AHİM Law Office and cannot be copied, reproduced, or published in other media without permission.

4. Contact Form Responsibility:
Messages sent through the contact form do not establish an attorney-client relationship. A written power of attorney or contract must be concluded to establish a formal representation relationship with the Office.`,
    },
  };

  const currentPolicies = isTr ? policiesTr : policiesEn;

  const openPolicy = (key: keyof typeof policiesTr) => {
    const policy = currentPolicies[key];
    setModalState({
      title: policy.title,
      content: policy.content,
      isOpen: true,
    });
  };

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.substring(1);
    const element = document.getElementById(targetId);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="bg-darker-bg text-gray-400 py-16 px-4 md:px-8 border-t border-white/5 relative z-10 transition-colors duration-500">
      <div className="max-w-7xl mx-auto">
        {/* Back to Top */}
        <button
          onClick={scrollToTop}
          className="absolute right-4 md:right-8 -top-6 p-3 rounded-full bg-gold text-[#07222c] shadow-lg hover:scale-105 hover:bg-gold-light transition-all duration-300 cursor-pointer"
          aria-label="Yukarı Çık"
        >
          <ArrowUp size={18} />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 mb-12">
          <div className="lg:col-span-4 space-y-4">
            <img
              src={logoTransparent}
              alt="AHİM Hukuk Bürosu Logo"
              className="w-full max-w-[240px] h-auto mb-3"
            />
            <p className="text-sm text-gray-300 leading-relaxed mb-4">
              {t('footerDescription')}
            </p>
            {/* Social Media Icons */}
            <div className="flex items-center space-x-3 pt-1">
              <a
                href="https://www.instagram.com/ahimhukuk?igsh=MWtlYWU0YWxmN2Nwbw%3D%3D&utm_source=qr"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-primary/20 text-gold rounded-full border border-primary-light/10 hover:text-white hover:bg-gold transition-all duration-300 flex items-center justify-center"
                aria-label="Instagram"
              >
                <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/company/ahi%CC%87m-hukuk-b%C3%BCrosu/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-primary/20 text-gold rounded-full border border-primary-light/10 hover:text-white hover:bg-gold transition-all duration-300 flex items-center justify-center"
                aria-label="LinkedIn"
              >
                <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-primary/20 text-gold rounded-full border border-primary-light/10 hover:text-white hover:bg-gold transition-all duration-300 flex items-center justify-center"
                aria-label="Twitter / X"
              >
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" className="w-4 h-4">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Contact Details */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-md font-serif font-semibold text-white tracking-wider border-b border-white/5 pb-2">
              {t('contactInfoTitle')}
            </h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start space-x-2.5">
                <MapPin size={16} className="text-gold mt-1 flex-shrink-0" />
                <span className="text-gray-300 leading-relaxed">
                  Rasimpaşa Mah. Bayramyeri Sok. Aliye Hanım Apt. No: 1, Ofis: 12, Kadıköy / İst
                </span>
              </li>
              <li className="flex items-center space-x-2.5">
                <Phone size={16} className="text-gold flex-shrink-0" />
                <a href="tel:02167556334" className="text-gray-300 hover:text-gold transition-colors font-medium">
                  0216 755 63 34
                </a>
              </li>
              <li className="flex items-center space-x-2.5">
                <Mail size={16} className="text-gold flex-shrink-0" />
                <a href="mailto:ahimhukuk@gmail.com" className="text-gray-300 hover:text-gold transition-colors font-medium">
                  ahimhukuk@gmail.com
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Quick Navigation */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-md font-serif font-semibold text-white tracking-wider border-b border-white/5 pb-2">
              {t('footerLinksTitle')}
            </h4>
            <ul className="space-y-2.5 text-sm">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => handleScrollTo(e, link.href)}
                    className="text-gray-300 hover:text-gold transition-colors block py-0.5"
                  >
                    {t(link.labelKey as any)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Mini Map */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-md font-serif font-semibold text-white tracking-wider border-b border-white/5 pb-2">
              {isTr ? 'Harita Konumu' : 'Map Location'}
            </h4>
            <div className="w-full rounded-xl overflow-hidden shadow-md border border-white/5">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d48184.05935957566!2d29.029569000000002!3d40.992347!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cac7eb7db922f3%3A0xf668cecf0df04bdf!2zQUjEsE0gSHVrdWsgQsO8cm9zdQ!5e0!3m2!1str!2sus!4v1783279755029!5m2!1str!2sus"
                width="100%"
                height="120"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                title={isTr ? 'AHİM Hukuk Bürosu Mini Konum' : 'AHİM Law Office Mini Location'}
              />
            </div>
          </div>
        </div>

        {/* Separator and Bottom Meta */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row md:justify-between md:items-center gap-4 text-xs text-gray-400">
          <div>
            © {new Date().getFullYear()} AHİM Hukuk Bürosu. {t('footerRights')}
          </div>
          
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            <button onClick={() => openPolicy('kvkk')} className="hover:text-gold transition-colors cursor-pointer">
              {t('footerKvkkLink')}
            </button>
            <span>•</span>
            <button onClick={() => openPolicy('cerez')} className="hover:text-gold transition-colors cursor-pointer">
              {isTr ? 'Çerez Politikası' : 'Cookie Policy'}
            </button>
            <span>•</span>
            <button onClick={() => openPolicy('gizlilik')} className="hover:text-gold transition-colors cursor-pointer">
              {isTr ? 'Gizlilik Politikası' : 'Privacy Policy'}
            </button>
            <span>•</span>
            <button onClick={() => openPolicy('kullanim')} className="hover:text-gold transition-colors cursor-pointer">
              {isTr ? 'Kullanım Koşulları' : 'Terms of Use'}
            </button>
          </div>
        </div>
      </div>

      {/* Dynamic Policy Modal */}
      <AnimatePresence>
        {modalState.isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Background Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setModalState((prev) => ({ ...prev, isOpen: false }))}
              className="fixed inset-0 bg-black/85 backdrop-blur-sm cursor-zoom-out"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', duration: 0.5 }}
              className="relative w-full max-w-2xl glass-panel rounded-3xl p-6 md:p-8 max-h-[80vh] overflow-y-auto z-10 border border-gold/20 scrollbar-thin text-left"
            >
              {/* Top border decoration */}
              <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-primary via-gold to-primary-light" />

              {/* Close Button */}
              <button
                onClick={() => setModalState((prev) => ({ ...prev, isOpen: false }))}
                className="absolute top-5 right-5 p-1.5 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-colors duration-200 cursor-pointer"
              >
                <X size={20} />
              </button>

              <h3 className="text-xl md:text-2xl font-serif font-bold text-white mb-4 pr-8">
                {modalState.title}
              </h3>

              <div className="text-sm md:text-base text-gray-200 leading-relaxed whitespace-pre-line pr-2 font-sans font-normal">
                {modalState.content}
              </div>

              <div className="flex justify-end mt-8 border-t border-white/5 pt-4">
                <Button
                  variant="primary"
                  className="text-xs py-2 px-5"
                  onClick={() => setModalState((prev) => ({ ...prev, isOpen: false }))}
                >
                  {isTr ? 'Kapat' : 'Close'}
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </footer>
  );
};
