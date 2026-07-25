import React, { useState, useEffect } from 'react';
import { Mail, MapPin, Phone, AlertCircle } from 'lucide-react';
import { SectionTitle } from '../ui/SectionTitle';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { useToast } from '../ui/Toast';
import { useApp } from '../../context/AppContext';
import { turkeyLocations } from '../../data/turkeyLocations';
import { practiceAreas } from '../../data/practiceAreas';

interface FormState {
  name: string;
  surname: string;
  email: string;
  city: string;
  district: string;
  topic: string;
  message: string;
  kvkk: boolean;
}

const initialFormState: FormState = {
  name: '',
  surname: '',
  email: '',
  city: '',
  district: '',
  topic: '',
  message: '',
  kvkk: false,
};

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState<FormState>(initialFormState);
  const [districts, setDistricts] = useState<string[]>([]);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const { addToast } = useToast();
  const { theme, language, t } = useApp();

  const isTr = language === 'tr';

  // Get cities list from locations data
  const cities = Object.keys(turkeyLocations).sort((a, b) => a.localeCompare(b, 'tr'));

  // Load districts when selected city changes
  useEffect(() => {
    if (formData.city) {
      setDistricts(turkeyLocations[formData.city] || []);
      setFormData((prev) => ({ ...prev, district: '' })); // Reset district on city change
    } else {
      setDistricts([]);
    }
  }, [formData.city]);

  const validate = (): boolean => {
    const tempErrors: Partial<Record<keyof FormState, string>> = {};
    
    if (!formData.name.trim()) tempErrors.name = isTr ? 'İsim alanı zorunludur.' : 'Name is required.';
    if (!formData.surname.trim()) tempErrors.surname = isTr ? 'Soyisim alanı zorunludur.' : 'Surname is required.';
    
    if (!formData.email.trim()) {
      tempErrors.email = isTr ? 'E-posta alanı zorunludur.' : 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = isTr ? 'Geçersiz e-posta adresi formatı.' : 'Invalid email format.';
    }
    
    if (!formData.city) tempErrors.city = isTr ? 'Lütfen il seçiniz.' : 'Please select a city.';
    if (!formData.district) tempErrors.district = isTr ? 'Lütfen ilçe seçiniz.' : 'Please select a district.';
    if (!formData.topic) tempErrors.topic = isTr ? 'Lütfen hukuki konu başlığı seçiniz.' : 'Please select a legal topic.';
    if (!formData.message.trim()) tempErrors.message = isTr ? 'Lütfen hukuki talebinizi açıklayınız.' : 'Please describe your request.';
    if (!formData.kvkk) tempErrors.kvkk = isTr ? 'KVKK metnini onaylamanız zorunludur.' : 'You must accept the KVKK notice.';

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error immediately on change
    if (errors[name as keyof FormState]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: checked }));
    if (errors[name as keyof FormState]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const isNameEmpty = !formData.name.trim();
    const isSurnameEmpty = !formData.surname.trim();
    const isCityEmpty = !formData.city;
    const isDistrictEmpty = !formData.district;
    const isTopicEmpty = !formData.topic;
    const isMessageEmpty = !formData.message.trim();
    const isEmailEmpty = !formData.email.trim();
    
    const isAnyFieldEmpty = isNameEmpty || isSurnameEmpty || isCityEmpty || isDistrictEmpty || isTopicEmpty || isMessageEmpty || isEmailEmpty;

    if (isAnyFieldEmpty) {
      addToast(t('validationRequiredFields'), 'error');
      validate();
      return;
    }

    const isValidEmail = /\S+@\S+\.\S+/.test(formData.email);
    if (!isValidEmail) {
      addToast(t('validationEmailWarning'), 'warning');
      validate();
      return;
    }

    if (!formData.kvkk) {
      addToast(t('validationKvkkWarning'), 'warning');
      validate();
      return;
    }

    if (validate()) {
      addToast(t('validationSuccess'), 'success');
      setFormData(initialFormState); // Reset form values
      setErrors({});
    }
  };

  // Section theme classes
  const sectionBgClass = theme === 'dark' ? 'bg-[#0b2e3b] text-white' : 'bg-gray-50 text-gray-900';
  const dividerClass = theme === 'dark' ? 'bg-white/5' : 'bg-gray-200';
  const bottomDividerClass = theme === 'dark' ? 'bg-white/5' : 'bg-gray-250';
  const cardTitleClass = theme === 'dark' ? 'text-white' : 'text-darker-bg';
  const cardLabelClass = theme === 'dark' ? 'text-gray-300' : 'text-gray-750';
  const labelColorClass = theme === 'dark' ? 'text-gray-400' : 'text-gray-500';
  const valueColorClass = theme === 'dark' ? 'text-gray-200' : 'text-gray-700';

  const inputBaseClass = theme === 'dark'
    ? 'bg-darker-bg/60 border text-sm text-white focus:outline-none focus:border-gold transition-colors'
    : 'bg-white border text-sm text-[#07222c] focus:outline-none focus:border-gold transition-colors';

  const mapContainerClass = theme === 'dark'
    ? 'border border-white/10 p-1 bg-dark-bg/60 shadow-2xl'
    : 'border border-gray-200 p-1 bg-white/60 shadow-lg';

  return (
    <section id="contact" className={`py-20 relative transition-colors duration-500 ${sectionBgClass}`}>
      {/* Subtle border dividing sections */}
      <div className={`absolute top-0 left-0 right-0 h-[1px] ${dividerClass}`} />
      <div className={`absolute bottom-0 left-0 right-0 h-[1px] ${bottomDividerClass}`} />

      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <SectionTitle
          title={t('contactTitle')}
          subtitle={t('contactSubtitle')}
          theme={theme === 'dark' ? 'dark' : 'light'}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Form */}
          <div className="lg:col-span-7">
            <Card className="text-left relative overflow-hidden" theme={theme === 'dark' ? 'dark' : 'light'} hoverGlow={false}>
              <h3 className={`text-xl font-serif font-bold mb-6 ${cardTitleClass}`}>
                {t('contactFormTitle')}
              </h3>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name / Surname Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="flex flex-col">
                    <label htmlFor="name" className={`text-xs font-semibold uppercase mb-2 tracking-wider ${cardLabelClass}`}>
                      {t('contactLabelName')}
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`px-4 py-3 rounded-lg ${inputBaseClass} ${
                        errors.name ? 'border-rose-500/50 bg-rose-500/5' : (theme === 'dark' ? 'border-white/10' : 'border-gray-250')
                      }`}
                    />
                    {errors.name && <span className="text-xs text-rose-500 mt-1 flex items-center"><AlertCircle size={12} className="mr-1" />{errors.name}</span>}
                  </div>

                  <div className="flex flex-col">
                    <label htmlFor="surname" className={`text-xs font-semibold uppercase mb-2 tracking-wider ${cardLabelClass}`}>
                      {t('contactLabelSurname')}
                    </label>
                    <input
                      type="text"
                      id="surname"
                      name="surname"
                      value={formData.surname}
                      onChange={handleInputChange}
                      className={`px-4 py-3 rounded-lg ${inputBaseClass} ${
                        errors.surname ? 'border-rose-500/50 bg-rose-500/5' : (theme === 'dark' ? 'border-white/10' : 'border-gray-250')
                      }`}
                    />
                    {errors.surname && <span className="text-xs text-rose-500 mt-1 flex items-center"><AlertCircle size={12} className="mr-1" />{errors.surname}</span>}
                  </div>
                </div>

                {/* Email / Topic Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="flex flex-col">
                    <label htmlFor="email" className={`text-xs font-semibold uppercase mb-2 tracking-wider ${cardLabelClass}`}>
                      {t('contactLabelEmail')}
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`px-4 py-3 rounded-lg ${inputBaseClass} ${
                        errors.email ? 'border-rose-500/50 bg-rose-500/5' : (theme === 'dark' ? 'border-white/10' : 'border-gray-250')
                      }`}
                    />
                    {errors.email && <span className="text-xs text-rose-500 mt-1 flex items-center"><AlertCircle size={12} className="mr-1" />{errors.email}</span>}
                  </div>

                  <div className="flex flex-col">
                    <label htmlFor="topic" className={`text-xs font-semibold uppercase mb-2 tracking-wider ${cardLabelClass}`}>
                      {t('contactLabelTopic')}
                    </label>
                    <select
                      id="topic"
                      name="topic"
                      value={formData.topic}
                      onChange={handleInputChange}
                      className={`px-4 py-3 rounded-lg ${inputBaseClass} ${
                        errors.topic ? 'border-rose-500/50 bg-rose-500/5' : (theme === 'dark' ? 'border-white/10' : 'border-gray-250')
                      }`}
                    >
                      <option value="">{t('contactLabelTopicPlaceholder')}</option>
                      {practiceAreas.map((area) => (
                        <option key={area.id} value={isTr ? area.title : area.titleEn}>
                          {isTr ? area.title : area.titleEn}
                        </option>
                      ))}
                      <option value="Diğer">{t('contactLabelTopicOther')}</option>
                    </select>
                    {errors.topic && <span className="text-xs text-rose-500 mt-1 flex items-center"><AlertCircle size={12} className="mr-1" />{errors.topic}</span>}
                  </div>
                </div>

                {/* City / District Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="flex flex-col">
                    <label htmlFor="city" className={`text-xs font-semibold uppercase mb-2 tracking-wider ${cardLabelClass}`}>
                      {t('contactLabelCity')}
                    </label>
                    <select
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className={`px-4 py-3 rounded-lg ${inputBaseClass} ${
                        errors.city ? 'border-rose-500/50 bg-rose-500/5' : (theme === 'dark' ? 'border-white/10' : 'border-gray-250')
                      }`}
                    >
                      <option value="">{t('contactLabelCityPlaceholder')}</option>
                      {cities.map((city) => (
                        <option key={city} value={city}>{city}</option>
                      ))}
                    </select>
                    {errors.city && <span className="text-xs text-rose-500 mt-1 flex items-center"><AlertCircle size={12} className="mr-1" />{errors.city}</span>}
                  </div>

                  <div className="flex flex-col">
                    <label htmlFor="district" className={`text-xs font-semibold uppercase mb-2 tracking-wider ${cardLabelClass}`}>
                      {t('contactLabelDistrict')}
                    </label>
                    <select
                      id="district"
                      name="district"
                      value={formData.district}
                      onChange={handleInputChange}
                      disabled={!formData.city}
                      className={`px-4 py-3 rounded-lg ${inputBaseClass} disabled:opacity-50 disabled:cursor-not-allowed ${
                        errors.district ? 'border-rose-500/50 bg-rose-500/5' : (theme === 'dark' ? 'border-white/10' : 'border-gray-250')
                      }`}
                    >
                      <option value="">{t('contactLabelDistrictPlaceholder')}</option>
                      {districts.map((dist) => (
                        <option key={dist} value={dist}>{dist}</option>
                      ))}
                    </select>
                    {errors.district && <span className="text-xs text-rose-500 mt-1 flex items-center"><AlertCircle size={12} className="mr-1" />{errors.district}</span>}
                  </div>
                </div>

                {/* Message Field */}
                <div className="flex flex-col">
                  <label htmlFor="message" className={`text-xs font-semibold uppercase mb-2 tracking-wider ${cardLabelClass}`}>
                    {t('contactLabelMessage')}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleInputChange}
                    className={`px-4 py-3 rounded-lg ${inputBaseClass} ${
                      errors.message ? 'border-rose-500/50 bg-rose-500/5' : (theme === 'dark' ? 'border-white/10' : 'border-gray-250')
                    }`}
                    placeholder={t('contactLabelMessagePlaceholder')}
                  />
                  {errors.message && <span className="text-xs text-rose-500 mt-1 flex items-center"><AlertCircle size={12} className="mr-1" />{errors.message}</span>}
                </div>

                {/* KVKK Acceptance */}
                <div className="flex flex-col">
                  <div className="flex items-start space-x-3 mt-2">
                    <input
                      type="checkbox"
                      id="kvkk"
                      name="kvkk"
                      checked={formData.kvkk}
                      onChange={handleCheckboxChange}
                      className="mt-1 h-4 w-4 rounded border-gray-300 text-gold focus:ring-gold focus:ring-offset-0 cursor-pointer"
                    />
                    <label htmlFor="kvkk" className={`text-xs leading-relaxed cursor-pointer select-none ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                      {t('contactLabelKvkk')}
                    </label>
                  </div>
                  {errors.kvkk && <span className="text-xs text-rose-500 mt-1 flex items-center"><AlertCircle size={12} className="mr-1" />{errors.kvkk}</span>}
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  variant="secondary"
                  className="w-full py-4 uppercase font-bold tracking-widest text-sm"
                >
                  {t('contactButtonSend')}
                </Button>
              </form>
            </Card>
          </div>

          {/* Right Column: Address & Map */}
          <div className="lg:col-span-5 space-y-6">
            {/* Info Box */}
            <Card className="text-left space-y-6" theme={theme === 'dark' ? 'dark' : 'light'} hoverGlow={false}>
              <h3 className={`text-xl font-serif font-bold mb-2 ${cardTitleClass}`}>
                {t('contactInfoTitle')}
              </h3>

              <div className="space-y-4 text-sm">
                <div className="flex items-start space-x-3.5">
                  <div className="p-2.5 bg-primary/5 text-gold rounded-xl border border-primary-light/10 mt-0.5 flex-shrink-0">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <span className={`text-xs block font-semibold mb-0.5 ${labelColorClass}`}>
                      {t('contactInfoAddress')}
                    </span>
                    <span className={`leading-relaxed ${valueColorClass}`}>
                      Rasimpaşa Mahallesi, Bayramyeri Sokak, Aliye Hanım Apartmanı, Bina No: 1, Ofis No: 12, Kadıköy / İstanbul
                    </span>
                  </div>
                </div>

                <div className="flex items-start space-x-3.5">
                  <div className="p-2.5 bg-primary/5 text-gold rounded-xl border border-primary-light/10 mt-0.5 flex-shrink-0">
                    <Phone size={18} />
                  </div>
                  <div>
                    <span className={`text-xs block font-semibold mb-0.5 ${labelColorClass}`}>
                      {t('contactInfoPhone')}
                    </span>
                    <a href="tel:02167556334" className={`${valueColorClass} hover:text-gold transition-colors font-medium`}>
                      0216 755 63 34
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-3.5">
                  <div className="p-2.5 bg-primary/5 text-gold rounded-xl border border-primary-light/10 mt-0.5 flex-shrink-0">
                    <Mail size={18} />
                  </div>
                  <div>
                    <span className={`text-xs block font-semibold mb-0.5 ${labelColorClass}`}>
                      {t('contactInfoEmail')}
                    </span>
                    <a href="mailto:ahimhukuk@gmail.com" className={`${valueColorClass} hover:text-gold transition-colors font-medium`}>
                      ahimhukuk@gmail.com
                    </a>
                  </div>
                </div>
              </div>
            </Card>

            {/* Google Map Box */}
            <div className={`w-full rounded-2xl overflow-hidden backdrop-blur-md ${mapContainerClass}`}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d48184.05935957566!2d29.029569000000002!3d40.992347!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cac7eb7db922f3%3A0xf668cecf0df04bdf!2zQUjEsE0gSHVrdWsgQsO8cm9zdQ!5e0!3m2!1str!2sus!4v1783279755029!5m2!1str!2sus"
                width="100%"
                height="300"
                style={{ border: 0, borderRadius: '16px' }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                title="AHİM Hukuk Bürosu Harita Konumu"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
