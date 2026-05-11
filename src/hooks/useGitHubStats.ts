import { useState, useEffect } from 'react';

import {
  GitHubStats,
  GitHubRepo,
  GitHubEvent,
  LanguageStat,
  ActivityEvent,
} from '../types/github';

export const useGitHubStats = (username: string) => {
  const [stats, setStats] = useState<GitHubStats>({
    publicRepos: 0,
    totalStars: 0,
    topLanguages: [],
    recentActivity: [],
    loading: true,
    error: null,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Fetch basic user info
        const userRes = await fetch(`https://api.github.com/users/${username}`);
        if (!userRes.ok) throw new Error('Failed to fetch user data');
        const userData = await userRes.json();

        // Fetch repos (up to 100 per page to get all stats)
        const reposRes = await fetch(
          `https://api.github.com/users/${username}/repos?per_page=100&sort=updated`
        );
        if (!reposRes.ok) throw new Error('Failed to fetch repos');
        const reposData: GitHubRepo[] = await reposRes.json();

        // Calculate total stars
        const totalStars = reposData.reduce((acc, repo) => acc + repo.stargazers_count, 0);

        // Calculate language breakdown
        const languages: Record<string, number> = {};
        reposData.forEach((repo) => {
          if (repo.language) {
            languages[repo.language] = (languages[repo.language] || 0) + 1;
          }
        });

        const totalLanguageRepos = Object.values(languages).reduce((a, b) => a + b, 0);
        const topLanguages: LanguageStat[] = Object.entries(languages)
          .map(([name, count]) => ({
            name,
            percentage: Math.round((count / totalLanguageRepos) * 100),
          }))
          .sort((a, b) => b.percentage - a.percentage)
          .slice(0, 4);

        // Fetch recent activity (Events API)
        const eventsRes = await fetch(
          `https://api.github.com/users/${username}/events/public?per_page=5`
        );
        let recentActivity: ActivityEvent[] = [];
        if (eventsRes.ok) {
          const eventsData: GitHubEvent[] = await eventsRes.json();
          recentActivity = eventsData.map((event) => ({
            id: event.id,
            type: event.type,
            repo: event.repo.name,
            date: new Date(event.created_at).toLocaleDateString(),
          }));
        }

        setStats({
          publicRepos: userData.public_repos,
          totalStars,
          topLanguages,
          recentActivity,
          loading: false,
          error: null,
        });
      } catch (error) {
        setStats((prev) => ({ ...prev, loading: false, error: (error as Error).message }));
      }
    };

    fetchStats();
  }, [username]);

  return stats;
};
