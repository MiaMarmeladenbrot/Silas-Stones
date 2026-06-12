export function Hero() {
  return (
    <header className="mx-auto w-full max-w-6xl px-5 pt-8 sm:pt-12">
      {/* slim stone-photo band with the title overlaid */}
      <div className="relative overflow-hidden rounded-2xl">
        <img
          src="/img/BG.jpg"
          alt=""
          aria-hidden="true"
          className="h-56 sm:h-72 w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/45 to-ink/20" />
        <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-10">
          <p className="mb-2 text-xs uppercase tracking-widest text-paper/80">
            A scholarly archive
          </p>
          <h1 className="max-w-2xl text-paper text-3xl sm:text-6xl">
            The Database of Historic Stone Adhesives
          </h1>
        </div>
      </div>

      {/* trimmed intro — the full text lives on the About page */}
      <p className="mx-auto mt-6 max-w-2xl text-center text-base leading-relaxed text-inkSoft">
        A growing collection of historical recipes, texts and references for
        stone adhesives — from ancient binding techniques to early-modern
        formulations, drawn from artist manuals, cathedral fabric rolls and
        restoration workshops.
      </p>
    </header>
  );
}
