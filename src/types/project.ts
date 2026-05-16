export interface Project {
  id: string | number;
  title: string;
  description: string;
  tech: string[];
  live: string;
  repo: string;
  image?: string;
  icon?: string;
  category: 'client' | 'practice';
  featured: boolean;
  readmeUrl?: string;
}
