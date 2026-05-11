export interface GitHubRepo {
  id: number;
  name: string;
  stargazers_count: number;
  language: string | null;
  updated_at: string;
}

export interface GitHubEvent {
  id: string;
  type: string;
  repo: {
    name: string;
  };
  created_at: string;
}

export interface LanguageStat {
  name: string;
  percentage: number;
}

export interface ActivityEvent {
  id: string;
  type: string;
  repo: string;
  date: string;
}

export interface GitHubStats {
  publicRepos: number;
  totalStars: number;
  topLanguages: LanguageStat[];
  recentActivity: ActivityEvent[];
  loading: boolean;
  error: string | null;
}
