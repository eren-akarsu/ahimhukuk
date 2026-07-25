import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Calendar, Clock, X } from 'lucide-react';
import { SectionTitle } from '../ui/SectionTitle';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { blogPosts, type BlogPost } from '../../data/blogPosts';
import { useApp } from '../../context/AppContext';

export const Blog: React.FC = () => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const { theme, language, t } = useApp();

  const isTr = language === 'tr';

  const sectionBgClass = theme === 'dark' ? 'bg-[#07222c] text-white' : 'bg-white text-gray-900';
  const dividerClass = theme === 'dark' ? 'bg-white/5' : 'bg-gray-100';
  const cardTitleClass = theme === 'dark' ? 'text-white' : 'text-darker-bg';
  const cardDescClass = theme === 'dark' ? 'text-gray-300' : 'text-gray-600';
  const cardMetaClass = theme === 'dark' ? 'border-white/5' : 'border-gray-100';

  return (
    <section id="blog" className={`py-20 relative transition-colors duration-500 ${sectionBgClass}`}>
      {/* Subtle border dividing sections */}
      <div className={`absolute top-0 left-0 right-0 h-[1px] ${dividerClass}`} />

      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <SectionTitle
          title={t('blogTitle')}
          subtitle={t('blogSubtitle')}
          theme={theme === 'dark' ? 'dark' : 'light'}
        />

        <p className={`text-center max-w-3xl mx-auto mb-16 text-base leading-relaxed ${cardDescClass}`}>
          {t('blogDescription')}
        </p>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, idx) => (
            <Card
              key={post.id}
              delay={idx * 0.05}
              theme={theme === 'dark' ? 'dark' : 'light'}
              className="flex flex-col justify-between items-start text-left h-full min-h-[320px]"
            >
              <div className="w-full">
                {/* Meta details */}
                <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                  <span className="bg-primary/5 border border-primary-light/10 text-gold font-semibold px-2.5 py-1 rounded-md uppercase tracking-wider">
                    {isTr ? post.category : post.categoryEn}
                  </span>
                  <div className="flex items-center space-x-1">
                    <Calendar size={12} />
                    <span>{isTr ? post.date : post.dateEn}</span>
                  </div>
                </div>

                <h3 className={`text-xl font-serif font-semibold mb-3 hover:text-gold transition-colors duration-300 line-clamp-2 ${cardTitleClass}`}>
                  {isTr ? post.title : post.titleEn}
                </h3>
                
                <p className={`text-sm leading-relaxed line-clamp-4 mb-6 ${cardDescClass}`}>
                  {isTr ? post.summary : post.summaryEn}
                </p>
              </div>

              <div className={`w-full flex items-center justify-between border-t pt-4 mt-auto ${cardMetaClass}`}>
                <span className="text-xs text-primary-light flex items-center space-x-1">
                  <Clock size={12} />
                  <span>{isTr ? post.readTime : post.readTimeEn}</span>
                </span>
                
                <Button
                  variant="outline"
                  className="text-xs py-1.5 px-3 rounded-md"
                  onClick={() => setSelectedPost(post)}
                >
                  {t('blogReadMore')}
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Blog Article Reader Modal */}
      <AnimatePresence>
        {selectedPost && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPost(null)}
              className="fixed inset-0 bg-darker-bg/85 backdrop-blur-sm"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', duration: 0.5 }}
              className="relative w-full max-w-2xl glass-panel rounded-3xl p-6 md:p-8 max-h-[85vh] overflow-y-auto z-10 border border-gold/20 scrollbar-thin"
            >
              {/* Header decor */}
              <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-primary via-gold to-primary-light" />
              
              {/* Close Button */}
              <button
                onClick={() => setSelectedPost(null)}
                className="absolute top-5 right-5 p-1.5 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-200 cursor-pointer"
              >
                <X size={20} />
              </button>

              <div className="flex items-center space-x-3 text-gold mb-3 mt-2">
                <BookOpen size={24} />
                <span className="text-xs md:text-sm font-semibold tracking-widest uppercase">
                  {isTr ? selectedPost.category : selectedPost.categoryEn}
                </span>
              </div>

              <h3 className="text-xl md:text-2xl font-serif font-bold text-white mb-4 pr-8">
                {isTr ? selectedPost.title : selectedPost.titleEn}
              </h3>

              {/* Meta metrics */}
              <div className="flex items-center space-x-4 text-xs text-gray-400 mb-6 border-b border-white/5 pb-4">
                <span className="flex items-center space-x-1">
                  <Calendar size={13} />
                  <span>{isTr ? selectedPost.date : selectedPost.dateEn}</span>
                </span>
                <span className="flex items-center space-x-1">
                  <Clock size={13} />
                  <span>{isTr ? selectedPost.readTime : selectedPost.readTimeEn}</span>
                </span>
              </div>

              {/* Content */}
              <div className="text-sm md:text-base text-gray-200 leading-relaxed font-normal space-y-4">
                <p className="font-semibold text-white bg-primary/10 border-l-4 border-gold p-4 rounded-r-xl">
                  {isTr ? selectedPost.summary : selectedPost.summaryEn}
                </p>
                <div className="pt-2 whitespace-pre-line text-gray-100 font-sans">
                  {isTr ? selectedPost.content : selectedPost.contentEn}
                </div>
                <p className="text-xs text-gray-400 mt-6 pt-4 border-t border-white/5 leading-relaxed italic">
                  {isTr 
                    ? '* Bu makaledeki bilgiler genel bilgilendirme amacıyla paylaşılmış olup, reklam yasağı ve Türkiye Barolar Birliği meslek kuralları çerçevesinde herhangi bir dava veya hukuki işlem yönlendirmesi içermemektedir. Hukuki sorunlarınız için profesyonel bir avukatlık hizmeti almanız önerilir.'
                    : '* The information in this article is shared for general informational purposes only, and does not contain any direct referrals to litigation or legal transactions within the framework of advertising regulations and the professional rules of the Union of Turkish Bar Associations. Seeking professional legal support for your legal matters is recommended.'
                  }
                </p>
              </div>

              <div className="flex justify-end gap-3 mt-8">
                <Button
                  variant="primary"
                  className="text-xs py-2 px-5"
                  onClick={() => setSelectedPost(null)}
                >
                  {t('blogModalClose')}
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
