export default function Contact() {
  return (
    <main className="min-h-screen bg-[#f2f3f1] px-6 py-16">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-4xl font-bold tracking-tight">Contact</h1>

        <p className="mt-6 text-gray-700">
          Feel free to reach out through any of the platforms below.
        </p>

        <div className="mt-10 flex flex-col gap-4 text-gray-700 font-semibold">
          <a
            href="mailto:suguna.3029@gmail.com"
            className="underline hover:text-black"
          >
            Email
          </a>

          <a
            href="https://linkedin.com/in/YOUR_USERNAME"
            target="_blank"
            rel="noreferrer"
            className="underline hover:text-black"
          >
            LinkedIn
          </a>

          <a
            href="https://github.com/YOUR_USERNAME"
            target="_blank"
            rel="noreferrer"
            className="underline hover:text-black"
          >
            GitHub
          </a>
        </div>
      </div>
    </main>
  );
}