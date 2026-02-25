const projects = [
  {
    title: "Project Title 1",
    description:
      "One sentence describing the problem and the solution.",
    stack: "Next.js • TypeScript • Tailwind",
    impact:
      "Example: Improved load performance by 30% using optimized rendering.",
    github: "https://github.com/YOUR_USERNAME/YOUR_REPO",
  },
  {
    title: "Project Title 2",
    description:
      "Short explanation of what it does and why it matters.",
    stack: "Python • Flask • PostgreSQL",
    impact:
      "Example: Built data validation pipeline processing 10k+ records.",
    github: "https://github.com/YOUR_USERNAME/YOUR_REPO",
  },
];

export default function Projects() {
  return (
    <main className="min-h-screen bg-[#f2f3f1] px-6 py-16">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-4xl font-bold tracking-tight">Projects</h1>

        <div className="mt-12 grid gap-8">
          {projects.map((project) => (
            <article
              key={project.title}
              className="rounded-2xl border border-black/10 bg-white/50 p-6"
            >
              <h2 className="text-2xl font-semibold">
                {project.title}
              </h2>

              <p className="mt-3 text-gray-700">
                {project.description}
              </p>

              <p className="mt-3 text-sm text-gray-600">
                <span className="font-semibold text-gray-700">
                  Stack:
                </span>{" "}
                {project.stack}
              </p>

              <p className="mt-2 text-sm text-gray-600">
                <span className="font-semibold text-gray-700">
                  Impact:
                </span>{" "}
                {project.impact}
              </p>

              <div className="mt-4">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm font-semibold underline hover:text-black/70"
                >
                  GitHub →
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}