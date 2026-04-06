import React, { useContext } from 'react';
import { AppState } from '../types';
import { calculateTimeSlots, getContrastColor } from '../utils';
import { Coffee } from 'lucide-react';
import { AppContext } from '../App';

interface Props {
  state: AppState;
  previewMode?: boolean;
}

const TimetableTemplate: React.FC<Props> = ({ state, previewMode = false }) => {
  const { t } = useContext(AppContext);
  const { teachers, classes, schedule, settings, design, printDesign } = state;
  const slots = calculateTimeSlots(settings);
  const getTeacher = (id: string) => teachers.find(t_item => t_item.id === id);

  // Destructure Pro styling options
  const {
      teacherDisplayMode = 'badge',
      fontSizeTitle = 32,
      fontSizeSubtitle = 18,
      fontSizeHeader = 14,
      fontSizeSubject = 14,
      fontSizeTeacher = 11,
      cellMinHeight = 90,
      cellVerticalAlign = 'center',
      cellGap = 6,
      cellPadding = 4
  } = printDesign;

  // Theme Engine
  const getThemeStyles = () => {
    const base = {
      gridBorder: '#e2e8f0',
      oddRow: '#ffffff',
      evenRow: '#f8fafc',
      headerBg: '#1e293b',
      headerText: '#ffffff',
      font: 'Vazirmatn, sans-serif',
      breakBg: '#fff7ed',
      breakText: '#ea580c',
    };

    switch (printDesign.theme) {
      case 'modern':
        return { ...base, headerBg: printDesign.primaryColor, oddRow: '#f8fafc', evenRow: '#ffffff', breakBg: '#f1f5f9', breakText: '#64748b' };
      case 'minimal':
        return { ...base, headerBg: '#ffffff', headerText: '#1e293b', gridBorder: '#000000', evenRow: '#ffffff', oddRow: '#ffffff', breakBg: '#ffffff', breakText: '#94a3b8' };
      case 'colorful':
        return { ...base, headerBg: '#3b82f6', headerText: '#ffffff', gridBorder: '#ffffff', oddRow: '#eff6ff', evenRow: '#dbeafe', breakBg: '#fef3c7', breakText: '#d97706' };
      case 'corporate':
        return { ...base, headerBg: '#334155', headerText: '#ffffff', gridBorder: '#94a3b8', oddRow: '#f1f5f9', evenRow: '#cbd5e1', breakBg: '#e2e8f0', breakText: '#475569' };
      default: // classic
        return base;
    }
  };

  const theme = getThemeStyles();

  // Header Style Logic
  let hBg = theme.headerBg;
  let hText = theme.headerText;
  let hBorder = theme.gridBorder;

  if (printDesign.headerStyle === 'outline') {
    hBg = 'transparent';
    hText = printDesign.primaryColor;
    hBorder = printDesign.primaryColor;
  } else if (printDesign.headerStyle === 'simple') {
    hBg = 'transparent';
    hText = '#000';
  }

  const justifyContentMap = {
      start: 'flex-start',
      center: 'center',
      end: 'flex-end'
  };

  return (
    <div 
      className="w-full bg-white text-right relative overflow-hidden" 
      dir={printDesign.direction}
      style={{ 
        fontFamily: theme.font,
        padding: previewMode ? `${printDesign.paddingY}px ${printDesign.paddingX}px` : '40px',
        transform: `scale(${printDesign.scale / 100})`,
        transformOrigin: 'top center',
        minHeight: '100%'
      }}
    >
      {/* Watermark */}
      {printDesign.showWatermark && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 opacity-[0.08]">
            <h1 className="text-[150px] font-black text-slate-900 -rotate-45 whitespace-nowrap">
                {printDesign.watermarkText}
            </h1>
        </div>
      )}

      {/* Header */}
      <div className="relative z-10 flex justify-between items-end mb-8 border-b-4 pb-4" style={{ borderColor: printDesign.primaryColor }}>
        <div>
          <h1 className="text-slate-900 mb-2" style={{ 
              fontSize: `${fontSizeTitle}px`,
              fontWeight: printDesign.fontStyle === 'bold' ? 900 : 700 
          }}>
            {printDesign.title}
          </h1>
          <p className="text-slate-500" style={{ fontSize: `${fontSizeSubtitle}px` }}>{printDesign.subtitle}</p>
        </div>
        <div className="text-left opacity-75">
          <div className="text-sm text-slate-500">{t('print_date')}: {new Date().toLocaleDateString(printDesign.direction === 'rtl' ? 'fa-IR' : 'en-US')}</div>
          <div className="font-bold text-slate-800 text-lg">Smart Timetable</div>
        </div>
      </div>

      {/* Grid */}
      <div 
        className="relative z-10 rounded-lg overflow-hidden"
        style={{ 
            border: `1px solid ${theme.gridBorder}`,
            boxShadow: previewMode ? 'none' : '0 4px 6px -1px rgba(0, 0, 0, 0.1)' 
        }}
      >
        <div className="grid" style={{ gridTemplateColumns: `160px repeat(${slots.length}, 1fr)` }}>
            
            <div 
                className="p-3 font-bold flex items-center justify-center border-b border-l"
                style={{ 
                    backgroundColor: hBg, 
                    color: hText, 
                    borderColor: hBorder,
                    fontSize: `${fontSizeHeader}px`
                }}
            >
                {t('grid_class_time')}
            </div>

            {slots.map(slot => (
                <div 
                    key={slot.id} 
                    className="p-2 text-center border-b border-l flex flex-col items-center justify-center"
                    style={{ 
                        backgroundColor: slot.type === 'break' ? theme.breakBg : hBg, 
                        color: slot.type === 'break' ? theme.breakText : hText,
                        borderColor: hBorder 
                    }}
                >
                    {slot.type === 'break' ? (
                         <div className="flex flex-col items-center gap-1">
                             <Coffee size={fontSizeHeader + 4} />
                             <span className="font-bold" style={{ fontSize: `${fontSizeHeader}px` }}>{slot.label === 'دمه' ? t('grid_break') : slot.label}</span>
                         </div>
                    ) : (
                        <>
                            <span className="font-bold" style={{ fontSize: `${fontSizeHeader}px` }}>{slot.label.replace('ګړۍ', t('grid_lesson_unit')).replace('Period', t('grid_lesson_unit'))}</span>
                            {printDesign.showTimes && (
                                <span className="opacity-80 mt-1 font-mono dir-ltr" style={{ fontSize: `${Math.max(10, fontSizeHeader - 4)}px` }}>{slot.start} - {slot.end}</span>
                            )}
                        </>
                    )}
                </div>
            ))}

            {classes.map((cls, idx) => (
                <React.Fragment key={cls.id}>
                    <div 
                        className="p-3 font-bold border-b border-l flex items-center justify-center"
                        style={{ 
                            backgroundColor: idx % 2 === 0 ? theme.evenRow : theme.oddRow,
                            color: '#1e293b',
                            borderColor: theme.gridBorder,
                            fontSize: `${fontSizeHeader}px`
                        }}
                    >
                        {cls.name}
                    </div>

                    {slots.map(slot => {
                        const key = `${cls.id}_${slot.id}`;
                        const lesson = schedule[key];
                        const teacher = lesson ? getTeacher(lesson.teacherId) : null;
                        
                        if (slot.type === 'break') {
                            return (
                                <div 
                                    key={key} 
                                    className="border-b border-l flex flex-col items-center justify-center opacity-80"
                                    style={{ 
                                        backgroundColor: theme.breakBg,
                                        borderColor: theme.gridBorder,
                                        color: theme.breakText,
                                        minHeight: `${cellMinHeight}px`
                                    }}
                                >
                                    <Coffee size={24} strokeWidth={1.5} className="opacity-50" />
                                    <span className="text-[10px] font-bold opacity-50 mt-1">{t('grid_break')}</span>
                                </div>
                            );
                        }

                        return (
                            <div 
                                key={key} 
                                className="border-b border-l relative"
                                style={{ 
                                    backgroundColor: idx % 2 === 0 ? theme.evenRow : theme.oddRow,
                                    borderColor: theme.gridBorder,
                                    minHeight: `${cellMinHeight}px`,
                                    padding: `${cellPadding}px`
                                }}
                            >
                                {lesson ? (
                                    <div 
                                        className="w-full h-full rounded flex flex-col overflow-hidden"
                                        style={{
                                            backgroundColor: design.lesson.backgroundColor,
                                            border: `${design.lesson.borderWidth}px ${design.lesson.borderStyle} ${design.lesson.borderColor}`,
                                            borderRadius: `${design.lesson.borderRadius}px`,
                                            justifyContent: justifyContentMap[cellVerticalAlign],
                                            alignItems: 'center',
                                            gap: `${cellGap}px`
                                        }}
                                    >
                                        <div 
                                            className="font-bold text-slate-900 leading-tight text-center w-full break-words"
                                            style={{ fontSize: `${fontSizeSubject}px` }}
                                        >
                                            {lesson.subject}
                                        </div>
                                        
                                        {teacher && teacherDisplayMode !== 'hidden' && (
                                            <>
                                                {teacherDisplayMode === 'badge' && (
                                                    <div 
                                                        className="px-2 py-0.5 rounded-full font-bold max-w-[95%] truncate text-center"
                                                        style={{
                                                            fontSize: `${fontSizeTeacher}px`,
                                                            backgroundColor: teacher.color,
                                                            color: getContrastColor(teacher.color)
                                                        }}
                                                    >
                                                        {teacher.name}
                                                    </div>
                                                )}

                                                {teacherDisplayMode === 'text' && (
                                                    <div 
                                                        className="font-medium truncate w-full px-1 text-center"
                                                        style={{
                                                            fontSize: `${fontSizeTeacher}px`,
                                                            color: teacher.color
                                                        }}
                                                    >
                                                        {teacher.name}
                                                    </div>
                                                )}

                                                {teacherDisplayMode === 'dot' && (
                                                    <div 
                                                        className="w-3 h-3 rounded-full"
                                                        style={{ backgroundColor: teacher.color }}
                                                        title={teacher.name}
                                                    />
                                                )}
                                            </>
                                        )}
                                    </div>
                                ) : null}
                            </div>
                        );
                    })}
                </React.Fragment>
            ))}
        </div>
      </div>

      {/* Footer */}
      <div className="mt-8">
        {printDesign.showLegend && (
            <div className="flex flex-wrap gap-4 justify-center mb-6">
                {teachers.map(t_item => (
                    <div key={t_item.id} className="flex items-center gap-2 px-3 py-1.5 rounded-full border bg-white shadow-sm" style={{ borderColor: theme.gridBorder }}>
                        <div className="w-5 h-5 rounded-full shadow-inner" style={{ backgroundColor: t_item.color }}></div>
                        <span className="text-sm font-bold text-slate-700">{t_item.name}</span>
                    </div>
                ))}
            </div>
        )}
        
        {printDesign.showFooter && (
            <div className="border-t pt-4 flex justify-between items-center text-sm text-slate-500" style={{ borderColor: theme.gridBorder }}>
                <div>{printDesign.footerText}</div>
                <div>{t('print_page_x_of_y')}</div>
            </div>
        )}
      </div>

    </div>
  );
};

export default TimetableTemplate;
