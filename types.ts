
export enum Platform {
  INSTAGRAM = 'Instagram',
  TIKTOK = 'TikTok/Reels',
  FACEBOOK = 'Facebook',
  LINKEDIN = 'LinkedIn',
  HASHTAGS = 'Hashtags'
}

export interface BrandMemory {
  tone: string;
  cta: string;
  destination: string;
  audience: string;
}

export interface GeneratedContent {
  id: string;
  platform: Platform;
  content: string;
  date: string;
  destination: string;
}

export interface GeneratedImage {
  id: string;
  url: string;
  prompt: string;
  timestamp: string;
}
