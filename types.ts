export interface NavItem {
  label: string;
  href: string;
}

export interface Track {
  icon: string;
  title: string;
  description: string;
  color: string;
}

export interface ScheduleItem {
  time: string;
  event: string;
  description?: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}
