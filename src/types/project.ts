export interface Project {
  id: string | number;
  title: string;
  description: string;
  tech: string[];
  live: string;
  repo: string;
  image?: string;
}
