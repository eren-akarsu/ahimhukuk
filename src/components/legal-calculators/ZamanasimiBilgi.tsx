import React, { useState } from 'react';
import { Hourglass, BookOpen, Scale, Search } from 'lucide-react';
import { legalParameters } from '../../data/legalParameters';
import { useApp } from '../../context/AppContext';

export const ZamanasimiBilgi: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('İş Hukuku');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const { theme } = useApp();

  const categories = legalParameters.zamanasimi.map((cat) => cat.category);
  const activeCategoryData = legalParameters.zamanasimi.find((cat) => cat.category === selectedCategory);

  const filteredItems = activeCategoryData?.items.filter(
    (item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.basis.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={`p-6 rounded-2xl transition-all duration-300 ${
      theme === 'dark' ? 'glass-panel border-white/10' : 'bg-white/90 border border-gray-200 shadow-xl'
    }`}>
      {/* Tool Header */}
      <div className="flex items-center space-x-3 mb-5 border-b border-gold/20 pb-4">
        <div className="p-2.5 rounded-xl bg-gold/10 text-gold border border-gold/30">
          <Hourglass size={22} />
        </div>
        <div>
          <h3 className="text-lg font-bold font-serif text-gold">
            Zamanaşımı Süreleri Bilgilendirme Modülü
          </h3>
          <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            Hukuk dallarına göre kanunda öngörülen genel ve özel zamanaşımı ile hak düşürücü süreleri inceleyebilirsiniz.
          </p>
        </div>
      </div>

      {/* Category Tabs & Search */}
      <div className="space-y-4 mb-6">
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                setSearchTerm('');
              }}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all duration-300 cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-gold text-[#07222c] shadow-md scale-102 font-bold'
                  : theme === 'dark'
                  ? 'bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white border border-white/10'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder={`${selectedCategory} içerisinde ara (ör: tazminat, kira, 5 yıl...)...`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`w-full pl-10 pr-4 py-2.5 rounded-xl border border-gold/30 text-xs focus:outline-none focus:border-gold transition-colors placeholder:text-gray-500 ${
              theme === 'dark' ? 'bg-darker-bg/80 text-white' : 'bg-white text-gray-900'
            }`}
          />
        </div>
      </div>

      {/* Content Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredItems && filteredItems.length > 0 ? (
          filteredItems.map((item, idx) => (
            <div
              key={idx}
              className={`p-4 rounded-xl border transition-all duration-300 hover:-translate-y-1 ${
                theme === 'dark'
                  ? 'bg-darker-bg/60 border-gold/20 hover:border-gold/50 shadow-lg'
                  : 'bg-gray-50 border-gray-200 hover:border-gold/50 shadow-md'
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <BookOpen size={16} className="text-gold flex-shrink-0" />
                  <h4 className={`font-bold text-sm font-serif ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{item.title}</h4>
                </div>
                <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-gold/15 text-gold border border-gold/30">
                  {item.duration}
                </span>
              </div>

              <p className={`text-xs leading-relaxed mb-3 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                {item.description}
              </p>

              <div className="flex items-center space-x-1.5 text-[11px] border-t border-gold/10 pt-2">
                <Scale size={13} className="text-gold/70" />
                <span className={`font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Dayanak: {item.basis}</span>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-2 p-8 text-center text-gray-400 text-xs rounded-xl border border-dashed border-gray-600">
            Arama kriterlerinize uygun zamanaşımı bilgisi bulunamadı.
          </div>
        )}
      </div>

      <div className={`mt-5 p-3 rounded-xl bg-primary/10 border border-primary-light/20 text-[11px] leading-relaxed ${
        theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
      }`}>
        * Zamanaşımı süreleri, hak düşürücü sürelerden farklı olarak mahkemece re'sen gözetilmeyebilir ve def'i olarak ileri sürülmesi gerekebilir. Hak düşürücü süreler ise hakim tarafından kendiliğinden dikkate alınır.
      </div>
    </div>
  );
};
