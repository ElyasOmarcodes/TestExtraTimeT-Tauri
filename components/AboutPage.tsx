import React, { useContext } from 'react';
import { AppContext } from '../App';
import { motion } from 'framer-motion';
import { Mail, MessageCircle, Send, MapPin, ExternalLink, Code2, GraduationCap, User, Briefcase, Award, Sparkles, Globe, Heart, CheckCircle2, Languages } from 'lucide-react';

const AboutPage: React.FC = () => {
  const { t } = useContext(AppContext);
  
  const socialLinks = [
    { 
      label: t('menu_about') + ' - Email', 
      value: 'ElyasOmar100@gmail.com', 
      icon: <Mail size={22} />, 
      link: 'mailto:ElyasOmar100@gmail.com',
      color: 'from-rose-500 to-red-600',
      shadow: 'shadow-red-500/30'
    },
    { 
      label: t('menu_about') + ' - WhatsApp', 
      value: '+93782965085', 
      icon: <MessageCircle size={22} />, 
      link: 'https://wa.me/93782965085',
      color: 'from-emerald-500 to-green-600',
      shadow: 'shadow-green-500/30'
    },
    { 
      label: t('menu_about') + ' - Telegram', 
      value: '@G_Zwan', 
      icon: <Send size={22} />, 
      link: 'https://t.me/G_Zwan',
      color: 'from-sky-500 to-blue-600',
      shadow: 'shadow-blue-500/30'
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 60, damping: 14 } }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="max-w-7xl mx-auto pb-24 px-4 overflow-hidden"
    >
      {/* Dynamic Luxury Hero Section */}
      <motion.div 
        variants={itemVariants} 
        className="relative mb-20 rounded-[4.5rem] overflow-hidden bg-slate-900 shadow-[0_20px_50px_rgba(0,0,0,0.3)] group border border-white/10"
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-primary-950 via-slate-900 to-indigo-950 opacity-95 transition-all duration-1000" />
        
        {/* Animated Background Layers */}
        <div className="absolute top-0 right-0 w-full h-full opacity-50 pointer-events-none">
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              x: [0, 50, 0],
              y: [0, -30, 0]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[-20%] right-[-10%] w-[60%] h-[60%] bg-primary-500 rounded-full blur-[120px]" 
          />
          <motion.div 
            animate={{ 
              scale: [1, 1.3, 1],
              x: [0, -40, 0],
              y: [0, 20, 0]
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-600 rounded-full blur-[100px]" 
          />
        </div>
        
        <div className="relative z-10 p-12 md:p-24 flex flex-col md:flex-row items-center gap-16">
          <div className="relative group">
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="absolute -inset-8 border-2 border-dashed border-primary-400/20 rounded-full group-hover:border-primary-400/40 transition-colors"
            />
            <motion.div 
               whileHover={{ scale: 1.05, rotate: 1 }}
               className="w-52 h-52 md:w-64 md:h-64 rounded-[4rem] bg-white dark:bg-slate-800 p-2 shadow-2xl relative z-10 transition-all cursor-pointer overflow-hidden"
            >
              <div className="w-full h-full rounded-[3.5rem] bg-gradient-to-br from-primary-600 to-indigo-700 flex items-center justify-center text-white text-8xl font-black shadow-inner">
                EO
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1, type: "spring" }}
              className="absolute -bottom-4 -right-4 w-20 h-20 bg-amber-400 border-[8px] border-slate-950 rounded-3xl flex items-center justify-center text-slate-900 shadow-2xl z-20"
            >
              <Sparkles size={32} />
            </motion.div>
          </div>

          <div className="text-center md:text-right flex-1">
            <motion.div 
              initial={{ x: -20, opacity: 0 }} 
              animate={{ x: 0, opacity: 1 }} 
              transition={{ delay: 0.4 }}
            >
              <h1 className="text-6xl md:text-8xl font-black text-white mb-6 tracking-tighter drop-shadow-lg">الیاس عمر</h1>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mb-10">
                <span className="bg-white/10 border border-white/20 text-primary-100 px-6 py-2.5 rounded-2xl text-base font-black backdrop-blur-3xl flex items-center gap-3 hover:bg-white/20 transition-all cursor-default shadow-lg">
                  <Code2 size={20} className="text-primary-400" /> {t('about_skills_title')}
                </span>
                <span className="bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 px-6 py-2.5 rounded-2xl text-base font-black backdrop-blur-3xl flex items-center gap-3 hover:bg-emerald-500/30 transition-all cursor-default shadow-lg">
                  <Briefcase size={20} className="text-emerald-400" /> {t('about_edu_title')}
                </span>
              </div>
              <p className="text-slate-200 text-2xl md:text-3xl max-w-4xl leading-relaxed font-black opacity-90 drop-shadow-md">
                {t('about_intro_text')}
              </p>
            </motion.div>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Side: Contact & Location */}
        <div className="lg:col-span-4 space-y-10">
          <motion.div variants={itemVariants} className="bg-white dark:bg-slate-800 rounded-[3.5rem] p-10 shadow-2xl border border-slate-100 dark:border-slate-700 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary-500/5 rounded-bl-[4rem] group-hover:scale-125 transition-transform duration-700" />
            <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-10 flex items-center gap-4">
              <User size={26} className="text-primary-500" /> {t('menu_about')}
            </h3>
            <div className="space-y-6">
              {socialLinks.map((item, idx) => (
                <motion.a 
                  key={idx} 
                  href={item.link} 
                  target="_blank" 
                  rel="noreferrer" 
                  whileHover={{ x: -12 }}
                  className={`flex items-center gap-6 p-5 rounded-[2.2rem] border border-transparent transition-all bg-slate-50 dark:bg-slate-900/40 hover:bg-white dark:hover:bg-slate-900 shadow-sm ${item.shadow}`}
                >
                  <div className={`shrink-0 w-16 h-16 rounded-[1.2rem] bg-gradient-to-br ${item.color} text-white flex items-center justify-center shadow-xl`}>
                    {item.icon}
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <div className="text-[10px] text-slate-400 dark:text-slate-500 font-black uppercase tracking-[0.2em] mb-1.5">{item.label}</div>
                    <div className="text-lg font-black text-slate-800 dark:text-slate-100 truncate">{item.value}</div>
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="bg-white dark:bg-slate-800 rounded-[3.5rem] p-10 shadow-2xl border border-slate-100 dark:border-slate-700">
            <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-10 flex items-center gap-4">
              <MapPin size={26} className="text-red-500" /> {t('about_location_title')}
            </h3>
            <div className="space-y-8">
              <div className="p-7 bg-slate-50 dark:bg-slate-900/80 rounded-[2.5rem] border dark:border-slate-700 shadow-inner">
                <div className="font-black text-2xl text-slate-900 dark:text-white mb-3">لوګر، مرکز</div>
                <div className="text-base text-slate-500 dark:text-slate-400 font-black leading-relaxed opacity-80">{t('about_location_text')}</div>
              </div>
              
              <div className="w-full h-56 bg-slate-100 dark:bg-slate-900 rounded-[3rem] overflow-hidden relative group border dark:border-slate-700 shadow-lg">
                 <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?q=80&w=2033&auto=format&fit=crop')] bg-center bg-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000" />
                 <div className="absolute inset-0 flex items-center justify-center">
                   <motion.div animate={{ y: [0, -15, 0] }} transition={{ repeat: Infinity, duration: 2.5 }} className="w-14 h-14 bg-red-500 rounded-full flex items-center justify-center text-white border-[6px] border-white dark:border-slate-800 shadow-2xl z-10">
                    <MapPin size={28} />
                  </motion.div>
                </div>
              </div>

              <motion.a 
                href="https://maps.google.com" 
                target="_blank" rel="noreferrer"
                whileTap={{ scale: 0.96 }}
                className="flex items-center justify-center gap-4 w-full py-5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-[2.2rem] font-black hover:bg-black dark:hover:bg-slate-100 transition-all shadow-2xl shadow-slate-900/20"
              >
                <span>{t('about_map_btn')}</span>
                <ExternalLink size={22} />
              </motion.a>
            </div>
          </motion.div>
        </div>

        {/* Right Side: Main Content */}
        <div className="lg:col-span-8 space-y-10">
          <motion.div variants={itemVariants} className="bg-white dark:bg-slate-800 rounded-[4.5rem] p-12 md:p-16 shadow-2xl border border-slate-100 dark:border-slate-700 relative transition-colors duration-300">
            <div className="flex items-center gap-5 mb-14">
               <div className="w-4 h-14 bg-primary-500 rounded-full shadow-lg shadow-primary-500/30" />
               <h3 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">{t('about_intro_title')}</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <motion.div 
                whileHover={{ y: -12 }}
                className="p-10 bg-gradient-to-br from-primary-50 to-white dark:from-slate-900 dark:to-slate-950 rounded-[3.5rem] border border-primary-100/50 dark:border-slate-700 shadow-sm relative group transition-all"
              >
                <div className="w-18 h-18 rounded-[1.5rem] bg-white dark:bg-slate-800 text-primary-500 flex items-center justify-center shadow-lg mb-8 group-hover:bg-primary-500 group-hover:text-white transition-all duration-500">
                  <GraduationCap size={38} />
                </div>
                <h4 className="text-2xl font-black text-slate-900 dark:text-white mb-5">{t('about_edu_title')}</h4>
                <p className="text-slate-600 dark:text-slate-400 font-black leading-relaxed text-xl opacity-90">{t('about_edu_text')}</p>
                <div className="mt-6 flex items-center gap-2 text-primary-500 font-bold">
                   <CheckCircle2 size={20} />
                   <span className="text-xs uppercase tracking-widest">{t('help_security_title')}</span>
                </div>
              </motion.div>

              <motion.div 
                whileHover={{ y: -12 }}
                className="p-10 bg-gradient-to-br from-indigo-50 to-white dark:from-slate-900 dark:to-slate-950 rounded-[3.5rem] border border-indigo-100/50 dark:border-slate-700 shadow-sm relative group transition-all"
              >
                <div className="w-18 h-18 rounded-[1.5rem] bg-white dark:bg-slate-800 text-indigo-500 flex items-center justify-center shadow-lg mb-8 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-500">
                  <Code2 size={38} />
                </div>
                <h4 className="text-2xl font-black text-slate-900 dark:text-white mb-5">{t('about_skills_title')}</h4>
                <p className="text-slate-600 dark:text-slate-400 font-black leading-relaxed text-xl opacity-90">{t('about_skills_text')}</p>
                <div className="mt-6 flex items-center gap-2 text-indigo-500 font-bold">
                   <Languages size={20} />
                   <span className="text-xs uppercase tracking-widest">{t('about_skills_title')}</span>
                </div>
              </motion.div>
            </div>

            <motion.div 
              variants={itemVariants}
              className="mt-12 p-12 bg-slate-50 dark:bg-slate-900/80 rounded-[3.5rem] border dark:border-slate-700 group transition-all relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="flex items-center gap-4 mb-6 relative z-10">
                <div className="w-2 h-10 bg-emerald-500 rounded-full" />
                <h4 className="font-black text-3xl text-slate-900 dark:text-white flex items-center gap-3">
                  <Globe className="text-emerald-500" size={28} /> زمونږ اهداف
                </h4>
              </div>
              <p className="text-slate-700 dark:text-slate-400 font-black leading-relaxed text-2xl opacity-90 relative z-10">
                زمونږ هدف د معاصرو تکنالوژیو په واسطه د هیواد تعلیمي سیسټم ته خدمت کول او د داسې وسیلو رامنځته کول دي چې د مدیرانو، استادانو او زده کونکو لپاره اسانتیاوې برابرې کړي. مونږ غواړو تعلیم هوښیار او ډیجیټلي کړو ترڅو د راتلونکي نسل لپاره لاره هواره شي.
              </p>
            </motion.div>
          </motion.div>

          {/* Luxury Stats Bar */}
          <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: t('about_skills_title'), val: '۳+', icon: <Award size={20} />, bg: 'from-blue-500/10 to-transparent' },
              { label: t('dashboard_stats_classes'), val: '۱۲+', icon: <Code2 size={20} />, bg: 'from-primary-500/10 to-transparent' },
              { label: t('dashboard_stats_teachers'), val: '۱۰۰+', icon: <Globe size={20} />, bg: 'from-emerald-500/10 to-transparent' },
              { label: t('about_edu_title'), val: '۱۰۰٪', icon: <Heart size={20} />, bg: 'from-rose-500/10 to-transparent' },
            ].map((stat, i) => (
              <motion.div 
                key={i} 
                whileHover={{ y: -8, scale: 1.05 }}
                className="bg-white dark:bg-slate-800 p-10 rounded-[3rem] border border-slate-100 dark:border-slate-700 text-center shadow-xl transition-all duration-500 overflow-hidden relative"
              >
                <div className={`absolute inset-0 bg-gradient-to-t ${stat.bg} opacity-50`} />
                <div className="text-4xl font-black text-primary-500 mb-3 flex items-center justify-center gap-2 relative z-10">
                   {stat.val}
                </div>
                <div className="text-[11px] text-slate-400 dark:text-slate-500 font-black uppercase tracking-[0.2em] flex items-center justify-center gap-1.5 relative z-10">
                   {stat.icon} {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
      
      {/* Refined Branding Footer */}
      <motion.div variants={itemVariants} className="mt-28 text-center">
        <div className="inline-flex items-center gap-5 px-10 py-4 bg-white dark:bg-slate-900 rounded-full border border-slate-100 dark:border-slate-800 shadow-2xl transition-all group hover:scale-105 duration-500">
          <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-sm font-black text-slate-500 dark:text-slate-500 uppercase tracking-[0.4em] group-hover:text-primary-500 transition-colors">
            ELYAS OMAR STUDIO • {new Date().getFullYear()}
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AboutPage;