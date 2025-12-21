import React from "react";

function TechTag({ name }) {
  return <span className="text-xs px-2 py-1 bg-slate-100 rounded">{name}</span>;
}

export default function ProjectCard({ project }) {
  return (
    <article className="border rounded-lg p-4 hover:shadow-md transition">
      <header className="flex items-start justify-between">
        <h3 className="text-lg font-medium">{project.title}</h3>
        <a href={project.live} className="text-sm text-accent">Live</a>
      </header>
      <p className="text-slate-600 mt-2">{project.description}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {project.tech.map((t) => <TechTag key={t} name={t} />)}
      </div>
      <div className="mt-4">
        <a href={project.repo} className="text-sm text-slate-500">Source</a>
      </div>
    </article>
  );
}