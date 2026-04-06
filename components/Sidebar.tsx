import React, { useContext } from 'react';
import { AppContext } from '../App';
import { LayoutDashboard, Users, GraduationCap, Settings, Palette, ChevronLeft, ChevronRight, HelpCircle, Info, Settings2, DownloadCloud } from 'lucide-react';

interface SidebarProps {
  activePage: string;
  setPage: (page: string) => void;
  isCollapsed: boolean;
  toggleCollapse: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activePage, setPage, isCollapsed, toggleCollapse }) => {
  const { t } = useContext(AppContext);
  
  const items = [
    { id: 'dashboard', label: t('menu_dashboard'), icon: <LayoutDashboard size={22} /> },
    { id: 'teachers', label: t('menu_teachers'), icon: <Users size={22} /> },
    { id: 'classes', label: t('menu_classes'), icon: <GraduationCap size={22} /> },
    { id: 'settings', label: t('menu_settings'), icon: <Settings size={22} /> },
    { id: 'design', label: t('menu_design'), icon: <Palette size={22} /> },
    { id: 'data', label: t('menu_appearance'), icon: <Settings2 size={22} /> },
    { id: 'export', label: t('menu_export'), icon: <DownloadCloud size={22} /> },
    { id: 'help', label: t('menu_help'), icon: <HelpCircle size={22} /> },
    { id: 'about', label: t('menu_about'), icon: <Info size={22} /> },
  ];

  return (
    <div className="h-full flex flex-col bg-slate-900 text-slate-300 transition-all duration-300 overflow-hidden">
      <div className={`flex items-center h-16 border-b border-slate-800 transition-all duration-300 ${isCollapsed ? 'justify-center px-0' : 'px-5 gap-3'}`}>
        <div className="bg-gradient-to-tr from-primary-600 to-primary-400 w-8 h-8 rounded-lg shrink-0 flex items-center justify-center shadow-lg shadow-primary-900/40">
            <span className="font-bold text-white text-lg">T</span>
        </div>
        <div className={`overflow-hidden transition-all duration-300 ${isCollapsed ? 'w-0 opacity-0' : 'w-auto opacity-100'}`}>
           <h1 className="text-lg font-bold tracking-wide text-white whitespace-nowrap">{t('app_name')}</h1>
        </div>
      </div>
      
      <nav className="flex-1 py-4 overflow-y-auto overflow-x-hidden px-2 space-y-1 scrollbar-hide">
        {items.map((item) => {
          const isActive = activePage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setPage(item.id)}
              className={`
                w-full flex items-center rounded-xl transition-all duration-200 min-h-[42px] group relative
                ${isCollapsed ? 'justify-center px-0' : 'justify-start px-3 gap-3'}
                ${isActive 
                  ? 'bg-primary-600/10 text-primary-400 border border-primary-600/20' 
                  : 'hover:bg-slate-800 hover:text-white border border-transparent'}
              `}
            >
              {isActive && (
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-primary-500 rounded-l-full"></div>
              )}

              <div className={`flex-shrink-0 transition-transform duration-200 ${isActive ? 'scale-110 text-primary-400' : 'text-slate-400 group-hover:text-white'}`}>
                  {item.icon}
              </div>

              <span className={`font-medium text-sm whitespace-nowrap transition-all duration-300 overflow-hidden ${isCollapsed ? 'w-0 opacity-0 hidden' : 'w-auto opacity-100 block'}`}>
                  {item.label}
              </span>

              {isCollapsed && (
                <div className="absolute right-full top-1/2 -translate-y-1/2 mr-2 px-2 py-1 bg-slate-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50 shadow-xl transition-opacity">
                    {item.label}
                </div>
              )}
            </button>
          );
        })}
      </nav>

      <div className="p-3 border-t border-slate-800 bg-slate-900">
        <button 
            onClick={toggleCollapse}
            className="hidden lg:flex w-full items-center justify-center p-2 hover:bg-slate-800 text-slate-500 hover:text-white rounded-lg transition-colors"
            title={isCollapsed ? "منو خلاصول" : "منو تړل"}
        >
            {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;