export default function About() {
  return (
    <main className="min-h-screen bg-[#f2f3f1] px-6 py-16">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-4xl font-bold tracking-tight">About</h1>

        <p className="mt-8 text-gray-700 leading-relaxed">
          I’m Suguna, a Computer Science student focused on building reliable,
          production-ready software. I’m particularly interested in backend
          engineering, security-aware systems, and clean interface design.
        </p>

        <p className="mt-4 text-gray-700 leading-relaxed">
          I enjoy working on projects that involve real-world constraints:
          performance optimization, correctness, debugging, and system
          architecture. My goal is to contribute to engineering teams where I
          can ship meaningful features and grow technically.
        </p>

        <div className="mt-10 text-sm text-gray-600">
          Interests: Software Engineering • Security • Systems • Web Development
        </div>
      </div>
    </main>
  );
}