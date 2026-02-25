export default function Resume() {
  return (
    <main className="min-h-screen bg-[#f2f3f1] px-6 py-16">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-4xl font-bold tracking-tight">Resume</h1>

        <p className="mt-6 text-gray-700">
          You can view or download my resume below.
        </p>

        <a
          href="/resume.pdf"
          target="_blank"
          rel="noreferrer"
          className="mt-8 inline-flex items-center justify-center rounded-full bg-black px-6 py-3 text-sm font-semibold text-white hover:bg-black/80 transition"
        >
          Open Resume
        </a>

        <p className="mt-4 text-sm text-gray-600">
          File location: <span className="font-mono">public/resume.pdf</span>
        </p>
      </div>
    </main>
  );
}