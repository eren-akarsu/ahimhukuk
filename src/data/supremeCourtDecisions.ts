export interface SupremeCourtDecision {
  id: string;
  title: string;
  titleEn: string;
  summary: string;
  summaryEn: string;
  citation: string;
}

export const supremeCourtDecisions: SupremeCourtDecision[] = [
  {
    id: 'babalik-davasinin-ihbari',
    title: 'Babalık Davasının İhbarı',
    titleEn: 'Notification of Paternity Lawsuit',
    summary: 'Babalık davasının Cumhuriyet savcısına ve Hazineye ihbarı zorunlu bulunduğu hâlde Cumhuriyet Başsavcılığı ve Hazineye dava ihbar olunmadan, işin esasına girilerek yazılı şekilde hüküm kurulması kanuna aykırıdır.',
    summaryEn: 'Although it is mandatory to notify the public prosecutor and the Treasury of a paternity lawsuit, rendering a written judgment on the merits without notifying them is contrary to the law.',
    citation: 'Yargıtay 2. HD, E. 2021/7492, K. 2022/9677',
  },
  {
    id: 'bosanma-davasinda-af-degerlendirmesi',
    title: 'Boşanma Davasında Af Değerlendirmesi',
    titleEn: 'Condonation in Divorce Cases',
    summary: 'Boşanma davası açısından barıştırmak üzere gelen aracıya "Sen nasıl istersen öyle olsun" demek af olarak nitelendirilemez.',
    summaryEn: 'In a divorce case, telling a mediator who came to reconcile the spouses "Let it be as you wish" cannot be characterized as condonation (forgiveness).',
    citation: 'Yargıtay 2. HD, E. 2021/3624, K. 2021/4748',
  },
  {
    id: 'hakaret-sucunda-sozcugun-kullanim-amaci',
    title: 'Hakaret Suçunda Sözcüğün Kullanım Amacı',
    titleEn: 'Intended Use of Words in Insult Crimes',
    summary: 'Halk arasında "yavşak" sözünün hakaret amacıyla kullanıldığı açıktır. Bu bağlamda ilk derece mahkemesinin "yavşak" sözcüğünün salt sözlük anlamına dayanılarak hakaret olmadığı şeklindeki değerlendirmesi hatalıdır.',
    summaryEn: 'It is clear that the word "yavşak" is used among the public for insulting purposes. Thus, the court of first instance\'s evaluation that it does not constitute an insult based solely on dictionary meaning is erroneous.',
    citation: 'Yargıtay 9. HD, E. 2020/1848, K. 2020/7866',
  },
  {
    id: 'zinaya-delalet-eden-davranislar',
    title: 'Zinaya Delalet Eden Davranışlar',
    titleEn: 'Behaviors Indicating Adultery',
    summary: 'Evli bir kadının, teyzesinin oğlu da olsa 30 yaşında bir erkekle tatile gidip aynı otelde kalması ve bu kişiyi kocası evde yokken geceleyin müşterek konuta alması zinaya delalet eder.',
    summaryEn: 'A married woman going on vacation and staying in the same hotel with a 30-year-old man, even if he is her cousin, and hosting him in the marital residence at night when her husband is not home indicates adultery.',
    citation: 'Yargıtay 2. HD, E. 2014/20635, K. 2015/9686',
  },
  {
    id: 'evcil-hayvanin-varligi',
    title: 'Evcil Hayvanın Varlığı',
    titleEn: 'Presence of Household Pets',
    summary: 'Köpeğin bizatihi varlığı, rahatsız edici unsur olarak kabul edilmemelidir; zira köpek evcil bir hayvan olup günümüzde birçok ailenin beslediği hayvanlardandır.',
    summaryEn: 'The mere presence of a dog should not be considered an annoying factor; since a dog is a domestic animal and is one of the pets kept by many families today.',
    citation: 'Yargıtay 18. HD, E. 1992/13261, K. 1993/1653',
  },
  {
    id: 'etkin-pismanlikta-sure-verilmesi',
    title: 'Etkin Pişmanlıkta Süre Verilmesi',
    titleEn: 'Time Allowance in Effective Repentance',
    summary: 'Mağdurun zararını kısmen gideren ve kalan kısmı da ödeme iradesi gösteren sanığa uygun süre verilmeden hüküm kurulması, etkin pişmanlık hükümlerinin uygulanmaması bakımından bozma sebebidir.',
    summaryEn: 'Rendering a judgment without giving a reasonable period to a defendant who partially compensated the victim and showed a willingness to pay the rest is a ground for reversal regarding effective repentance.',
    citation: 'Yargıtay CGK, E. 2013/735, K. 2016/55',
  },
  {
    id: 'supheden-sanik-yararlanir-ilkesi',
    title: 'Şüpheden Sanık Yararlanır İlkesi',
    titleEn: 'Benefit of Doubt for the Accused',
    summary: 'Gerçekleşme şekli şüpheli veya tam olarak aydınlatılamamış olay ve iddialar, sanığın aleyhine yorumlanarak mahkûmiyet hükmü kurulamaz.',
    summaryEn: 'Events and allegations whose realization is doubtful or not fully clarified cannot be interpreted against the accused to establish a conviction.',
    citation: 'Yargıtay CGK, E. 2022/229, K. 2025/290',
  },
  {
    id: 'eski-esle-kiyas-yapilmasi',
    title: 'Eski Eşle Kıyas Yapılması',
    titleEn: 'Comparison with Ex-Spouse',
    summary: 'Ölen eski eşinin fotoğraflarını sürekli görünür yerde tutmak ve sürekli eski eşle kıyas yapmak boşanma sebebidir.',
    summaryEn: 'Keeping photographs of a deceased ex-spouse constantly in visible places and constantly comparing the current spouse with the ex-spouse constitutes grounds for divorce.',
    citation: 'Yargıtay 2. HD, E. 2019/7388, K. 2019/11613',
  },
  {
    id: 'aracin-silah-sayilmasi',
    title: 'Aracin Silah Sayilmasi',
    titleEn: 'Counting Vehicles as Weapons',
    summary: 'Bir aracın TCK anlamında silah sayılabilmesi için aynı zamanda taşınabilir olması da gerekir. Bu nedenle mağdurun kafasını duvara veya sert zemine vurma durumunda suç silahla işlenmiş sayılmaz.',
    summaryEn: 'In order for a vehicle to be considered a weapon under the Turkish Penal Code (TCK), it must also be portable. Thus, hitting the victim\'s head against a wall or hard ground is not deemed committed with a weapon.',
    citation: 'Yargıtay CGK, E. 2017/377, K. 2019/606',
  },
  {
    id: 'haksiz-icra-takibi-ve-manevi-tazminat',
    title: 'Haksız İcra Takibi ve Manevi Tazminat',
    titleEn: 'Unjust Execution & Non-Pecuniary Damages',
    summary: 'Alacağı olmadığı hâlde başkasına karşı icra takibi başlatan kişi aleyhine manevi tazminat davası açılabilir.',
    summaryEn: 'A lawsuit for non-pecuniary damages can be filed against a person who initiates enforcement proceedings against another despite having no claim.',
    citation: 'Yargıtay 4. HD, E. 2017/468, K. 2019/3486',
  },
  {
    id: 'ozel-gunlerin-unutulmasi',
    title: 'Özel Günlerin Unutulması',
    titleEn: 'Forgetting Special Days',
    summary: 'Özel günlerin unutulması, eşin özel günlerde ve sosyal ortamlarda sürekli yalnız bırakılması boşanma sebebidir.',
    summaryEn: 'Forgetting special days and constantly leaving the spouse alone on special days and in social environments constitutes grounds for divorce.',
    citation: 'Yargıtay 2. HD, E. 2015/20218, K. 2016/1351',
  },
  {
    id: 'doktorun-hastayi-gormeden-recete-duzenlemesi',
    title: 'Doktorun Hastayı Görmeden Reçete Düzenlemesi',
    titleEn: 'Prescribing Without Seeing the Patient',
    summary: 'Doktorun hastayı görmeden hatıra binaen yaptığı muayene ve reçete düzenleme eylemleri sahtecilik suçunu değil, TCK’nın 257. maddesinde düzenlenen görevi kötüye kullanma suçunu oluşturur.',
    summaryEn: 'A doctor\'s act of prescribing medicine as a favor without seeing the patient does not constitute forgery, but the crime of abuse of office regulated under Article 257 of the TCK.',
    citation: 'Yargıtay 11. CD, E. 2016/6461, K. 2019/4350',
  },
  {
    id: 'hakaret-sucu-degerlendirmesi',
    title: 'Hakaret Suçu Değerlendirmesi',
    titleEn: 'Insult Offense Evaluation',
    summary: 'Sanığın, uzman doktor olan mağdura hitaben söylediği "Eşşek gibi bakacaksın." şeklindeki sözleri hakaret suçunu oluşturmaz.',
    summaryEn: 'The words "Eşşek gibi bakacaksın" spoken by the defendant to the victim, who is a specialist doctor, do not constitute the crime of insult.',
    citation: 'Yargıtay 4. CD, E. 2025/3574, K. 2025/9079',
  },
  {
    id: 'wifi-sifresi-ve-manevi-tazminat-sorumlulugu',
    title: 'Wi-Fi Şifresi ve Manevi Tazminat Sorumluluğu',
    titleEn: 'Wi-Fi Password & Liability for Moral Damages',
    summary: 'Sosyal medya üzerinden küfürlü mesajlar gönderen kişi ile birlikte, kişiye Wi-Fi şifresini veren hat sahibi de manevi tazminattan sorumludur.',
    summaryEn: 'Along with the person who sends abusive messages over social media, the internet line owner who shares the Wi-Fi password is also liable for non-pecuniary damages.',
    citation: 'Yargıtay 4. HD, E. 2016/16612, K. 2019/1233',
  },
  {
    id: 'yurt-disi-alisveris-urunlerinin-satisi',
    title: 'Yurt Dışı Alışveriş Ürünlerinin Satışı',
    titleEn: 'Selling Imported Online Purchase Goods',
    summary: 'Yurt dışı alışveriş sitelerinden temin edilen ürünlerin, yurt içinde başka bir internet sitesi üzerinden satılması kaçakçılık suçunu oluşturur.',
    summaryEn: 'Selling products obtained from international shopping websites domestically via another website constitutes the crime of smuggling.',
    citation: 'Yargıtay 7. CD, E. 2017/15035, K. 2019/12083',
  },
];
