export interface TimeElapsed {
  years: number;
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  totalDays: number;
}

export interface CountdownTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isToday: boolean;
}

export function calculateTimeElapsed(startDateStr: string): TimeElapsed {
  const start = new Date(startDateStr);
  const now = new Date();
  
  if (isNaN(start.getTime())) {
    return { years: 0, months: 0, days: 0, hours: 0, minutes: 0, seconds: 0, totalDays: 0 };
  }

  const diffMs = Math.max(0, now.getTime() - start.getTime());
  const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  let years = now.getFullYear() - start.getFullYear();
  let months = now.getMonth() - start.getMonth();
  let days = now.getDate() - start.getDate();

  if (days < 0) {
    months -= 1;
    const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
    days += prevMonth.getDate();
  }
  if (months < 0) {
    years -= 1;
    months += 12;
  }

  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();

  return {
    years: Math.max(0, years),
    months: Math.max(0, months),
    days: Math.max(0, days),
    hours,
    minutes,
    seconds,
    totalDays,
  };
}

export function calculateCountdownToAnniversary(targetDateStr: string): CountdownTime {
  const now = new Date();
  let target = new Date(targetDateStr);

  if (isNaN(target.getTime())) {
    target = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 30);
  }

  // If anniversary date in the past this year, calculate for the next recurrence
  const thisYearAnniversary = new Date(now.getFullYear(), target.getMonth(), target.getDate(), target.getHours(), target.getMinutes());
  if (thisYearAnniversary.getTime() < now.getTime()) {
    target = new Date(now.getFullYear() + 1, target.getMonth(), target.getDate(), target.getHours(), target.getMinutes());
  } else {
    target = thisYearAnniversary;
  }

  const diffMs = target.getTime() - now.getTime();
  
  if (diffMs <= 0 && Math.abs(diffMs) < 86400000) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isToday: true };
  }

  const totalSecs = Math.max(0, Math.floor(diffMs / 1000));
  const days = Math.floor(totalSecs / (3600 * 24));
  const hours = Math.floor((totalSecs % (3600 * 24)) / 3600);
  const minutes = Math.floor((totalSecs % 3600) / 60);
  const seconds = Math.floor(totalSecs % 60);

  return {
    days,
    hours,
    minutes,
    seconds,
    isToday: days === 0 && hours === 0 && minutes === 0 && seconds === 0,
  };
}

export function formatDateSpanish(dateStr: string): string {
  try {
    const [year, month, day] = dateStr.split('-');
    if (!year || !month || !day) return dateStr;
    const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
    return date.toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  } catch {
    return dateStr;
  }
}

export function formatShortDate(dateStr: string): string {
  try {
    const [year, month, day] = dateStr.split('-');
    if (!year || !month || !day) return dateStr;
    const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
    return date.toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  } catch {
    return dateStr;
  }
}
