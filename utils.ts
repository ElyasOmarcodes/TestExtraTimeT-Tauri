
import { AppState, Schedule, TimeSettings, TimeSlot, Teacher, ClassGroup } from './types';

export const generateId = () => Math.random().toString(36).substr(2, 9);

export const addMinutes = (time: string, minutes: number): string => {
  const [h, m] = time.split(':').map(Number);
  const date = new Date();
  date.setHours(h, m, 0, 0);
  date.setMinutes(date.getMinutes() + minutes);
  return `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
};

export const calculateTimeSlots = (settings: TimeSettings): TimeSlot[] => {
  const slots: TimeSlot[] = [];
  let currentTime = settings.startTime;
  let lessonCount = 0;
  let absoluteIndex = 0;

  for (let i = 0; i < settings.totalLessons; i++) {
    // Lesson Slot
    const start = currentTime;
    const end = addMinutes(currentTime, settings.lessonDuration);
    
    slots.push({
      id: `slot-${i}`,
      type: 'lesson',
      start,
      end,
      label: `${i + 1} ګړۍ`,
      index: absoluteIndex++
    });

    currentTime = end;
    lessonCount++;

    // Break Slot logic
    if (
      settings.lessonsBeforeBreak > 0 &&
      lessonCount % settings.lessonsBeforeBreak === 0 &&
      i < settings.totalLessons - 1
    ) {
      const breakStart = currentTime;
      const breakEnd = addMinutes(currentTime, settings.breakDuration);
      
      slots.push({
        id: `break-${i}`,
        type: 'break',
        start: breakStart,
        end: breakEnd,
        label: 'دمه',
        index: absoluteIndex++
      });
      
      currentTime = breakEnd;
    }
  }
  return slots;
};

export const getContrastColor = (hex: string) => {
  const r = parseInt(hex.substr(1, 2), 16);
  const g = parseInt(hex.substr(3, 2), 16);
  const b = parseInt(hex.substr(5, 2), 16);
  const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
  return yiq >= 128 ? '#0f172a' : '#ffffff';
};

export const detectConflicts = (schedule: Schedule, teachers: Teacher[], classes: ClassGroup[], slots: TimeSlot[]) => {
  const conflicts: { [key: string]: boolean } = {};
  
  // Map: SlotID -> { TeacherID -> [ClassID] }
  const slotTeacherMap: Record<string, Record<string, string[]>> = {};

  slots.forEach(slot => {
    if (slot.type === 'break') return;
    
    classes.forEach(cls => {
      const key = `${cls.id}_${slot.id}`;
      const lesson = schedule[key];
      if (lesson && lesson.teacherId) {
        if (!slotTeacherMap[slot.id]) slotTeacherMap[slot.id] = {};
        if (!slotTeacherMap[slot.id][lesson.teacherId]) slotTeacherMap[slot.id][lesson.teacherId] = [];
        
        slotTeacherMap[slot.id][lesson.teacherId].push(cls.id);
      }
    });
  });

  // Check for multiple classes per teacher per slot
  Object.entries(slotTeacherMap).forEach(([slotId, teachersMap]) => {
    Object.entries(teachersMap).forEach(([teacherId, classIds]) => {
      if (classIds.length > 1) {
        // Mark all involved schedule keys as conflicted
        classIds.forEach(classId => {
          conflicts[`${classId}_${slotId}`] = true;
        });
      }
    });
  });

  return conflicts;
};

// Deep Merge Utility to prevent crashes on backup restore
export const deepMerge = (target: any, source: any): any => {
  if (typeof target !== 'object' || target === null) {
    return source !== undefined ? source : target;
  }
  
  if (Array.isArray(target)) {
    // For arrays (like teachers/classes), if source exists use it, otherwise keep default/target
    // We generally prefer source data for arrays, but if source is undefined, keep target
    return Array.isArray(source) ? source : target;
  }

  const output = { ...target };
  
  if (typeof source === 'object' && source !== null) {
    Object.keys(source).forEach(key => {
      if (typeof source[key] === 'object' && source[key] !== null && key in target) {
        output[key] = deepMerge(target[key], source[key]);
      } else {
        output[key] = source[key];
      }
    });
  }
  
  return output;
};

// Hill Climbing Optimization
export const runOptimization = (
  currentSchedule: Schedule, 
  classes: ClassGroup[], 
  slots: TimeSlot[]
): Schedule => {
  const lessonSlots = slots.filter(s => s.type === 'lesson');
  let bestSchedule = { ...currentSchedule };
  
  const evaluateSchedule = (sched: Schedule): number => {
    let score = 0;
    
    // 1. Conflicts Penalty (High priority)
    const conflicts = detectConflicts(sched, [], classes, slots);
    score += Object.keys(conflicts).length * 1000;
    
    // 2. Difficulty Penalty (Lower priority)
    const N = lessonSlots.length;
    Object.entries(sched).forEach(([key, lesson]) => {
      if (!lesson) return;
      const slotId = key.split('_')[1];
      const slotIndex = lessonSlots.findIndex(s => s.id === slotId);
      if (slotIndex === -1) return;
      
      if (lesson.difficulty === 'hard') {
        score += slotIndex * 10; // Penalty increases as slotIndex increases (later periods)
      } else if (lesson.difficulty === 'easy') {
        score += (N - 1 - slotIndex) * 10; // Penalty increases as slotIndex decreases (earlier periods)
      }
    });
    
    return score;
  };

  let currentScore = evaluateSchedule(bestSchedule);
  
  if (currentScore === 0) return bestSchedule;

  const ITERATIONS = 2000; // Slightly reduced per run for multi-proposal performance

  for (let i = 0; i < ITERATIONS; i++) {
    if (currentScore === 0) break;

    // Clone
    const nextSchedule = { ...bestSchedule };
    
    // Random Move: Swap two slots within a random class
    const randomClass = classes[Math.floor(Math.random() * classes.length)];
    if (!randomClass) continue;

    const slotA = lessonSlots[Math.floor(Math.random() * lessonSlots.length)];
    const slotB = lessonSlots[Math.floor(Math.random() * lessonSlots.length)];

    if (slotA.id === slotB.id) continue;

    const keyA = `${randomClass.id}_${slotA.id}`;
    const keyB = `${randomClass.id}_${slotB.id}`;

    const lessonA = nextSchedule[keyA];
    const lessonB = nextSchedule[keyB];

    // Swap
    if (lessonA) nextSchedule[keyB] = lessonA;
    else delete nextSchedule[keyB];

    if (lessonB) nextSchedule[keyA] = lessonB;
    else delete nextSchedule[keyA];

    // Evaluate
    const nextScore = evaluateSchedule(nextSchedule);

    // Accept if better or equal
    if (nextScore <= currentScore) {
      bestSchedule = nextSchedule;
      currentScore = nextScore;
    }
  }

  return bestSchedule;
};

export interface Proposal {
    id: string;
    schedule: Schedule;
    conflictCount: number;
}

export const generateOptimizationProposals = (
    currentSchedule: Schedule, 
    classes: ClassGroup[], 
    slots: TimeSlot[]
): Proposal[] => {
    const proposals: Proposal[] = [];
    const seenHashes = new Set<string>();
    
    // Always try to generate at least 5-10 distinct variations
    // We run the optimization algorithm multiple times with different random paths
    const ATTEMPTS = 10;

    const lessonSlots = slots.filter(s => s.type === 'lesson');
    const evaluateSchedule = (sched: Schedule): number => {
      let score = 0;
      const conflicts = detectConflicts(sched, [], classes, slots);
      score += Object.keys(conflicts).length * 1000;
      const N = lessonSlots.length;
      Object.entries(sched).forEach(([key, lesson]) => {
        if (!lesson) return;
        const slotId = key.split('_')[1];
        const slotIndex = lessonSlots.findIndex(s => s.id === slotId);
        if (slotIndex === -1) return;
        if (lesson.difficulty === 'hard') {
          score += slotIndex * 10;
        } else if (lesson.difficulty === 'easy') {
          score += (N - 1 - slotIndex) * 10;
        }
      });
      return score;
    };

    for (let i = 0; i < ATTEMPTS; i++) {
        const optimized = runOptimization(currentSchedule, classes, slots);
        const hash = JSON.stringify(optimized); // Simple hash to detect duplicates
        
        if (!seenHashes.has(hash)) {
            seenHashes.add(hash);
            
            // Count conflicts for this proposal
            const conflicts = detectConflicts(optimized, [], classes, slots);
            const conflictCount = Object.keys(conflicts).length;
            const score = evaluateSchedule(optimized);

            proposals.push({
                id: `opt_${i}_${Date.now()}`,
                schedule: optimized,
                conflictCount,
                score
            } as any); // cast to any to allow adding score without changing interface
        }
    }

    // Sort by score first
    return proposals.sort((a: any, b: any) => a.score - b.score).slice(0, 10);
};
