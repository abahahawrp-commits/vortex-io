export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: 'Design' | 'Engineering' | 'Product UI/UX';
  description: string;
  year: string;
  client: string;
  impact: string;
  tags: string[];
  image: string;
  link?: string;
  aspect?: string;
}

export interface ContactMessage {
  id: string;
  sender_name: string;
  sender_email: string;
  project_category: string;
  message_body: string;
  status: 'new' | 'read' | 'replied';
  created_at: string;
}

export interface AnalyticsSummary {
  totalViews: number;
  uniqueVisitors: number;
  inquiriesReceived: number;
  averageSessionDuration: string;
  syncStatus: string;
}

export interface WeeklyStat {
  day: string;
  views: number;
  inquiries: number;
}

export interface SupabaseConfig {
  url: string;
  anonKey: string;
  isConnected: boolean;
  lastSyncedAt?: string;
}

export interface AccessibilitySettings {
  highContrast: boolean;
  largeText: boolean;
  reducedMotion: boolean;
  screenReaderOptimized: boolean;
}
