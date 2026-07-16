export function Hero() {
  return (
    <header className="mx-auto w-full max-w-8xl px-5 pt-8 sm:pt-12">
      <div className="relative overflow-hidden rounded-2xl">
        <img
          src="/img/BG.jpg"
          alt=""
          aria-hidden="true"
          className="h-64 sm:h-80 w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/45 to-ink/20" />
        <div className="absolute inset-0 flex flex-col justify-between p-6 sm:p-10">
          <p className="ml-auto max-w-sm text-right text-xs sm:text-sm leading-relaxed text-paper/85 [text-shadow:0_1px_8px_rgba(0,0,0,0.45)]">
            A collection of historical recipes and texts relating to stone
            adhesives. From ancient binding techniques to early modern mixtures.
            For anyone curious about how people in the past made stones stick.
          </p>
          <div>
            <p className="mb-2 text-xs uppercase tracking-widest text-paper/80">
              A scholarly archive
            </p>
            <h1 className="max-w-2xl text-paper text-3xl sm:text-6xl">
              The Database of Historic Stone Adhesives
            </h1>
          </div>
        </div>
      </div>
    </header>
  );
}
