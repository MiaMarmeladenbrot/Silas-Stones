export function AboutPage() {
  return (
    <article className="mx-auto w-full max-w-2xl px-5 pb-16 pt-10 sm:pt-16">
      <p className="mb-2 text-xs uppercase tracking-widest text-inkSoft">
        About
      </p>
      <h1 className="mb-8 text-3xl text-ink sm:text-4xl">About this project</h1>

      <div className="space-y-5 text-base leading-relaxed text-ink">
        <p>
          People have always needed to make stone hold together. Long before
          modern epoxies, the builders and repairers of medieval churches
          reached for what they had at hand, and one of their answers was wood
          tar. The recent discovery of hundreds of these tar based repairs on
          Stavanger Cathedral in Norway revealed a craft tradition that had been
          almost entirely forgotten.
        </p>
        <p>
          This database began with that discovery. It is a growing collection of
          historical recipes, texts and references relating to stone adhesives,
          gathered from the written record that survives. The sources range from
          ancient binding techniques to early modern mixtures, and include
          artist manuals, the fabric rolls of medieval cathedrals, invoices, and
          the instruction booklets of historic restoration workshops. Each entry
          stays close to its source, so you can see where a recipe comes from and
          read it in context.
        </p>
        <p>
          The collection is part of{" "}
          <a
            href="https://www.uis.no/en/museum-of-archaeology/research/sticking-stones-rediscovering-medieval-wood-tar-adhesives-for-stone"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sandDeep underline underline-offset-2 transition-colors hover:text-ink"
          >
            Sticking Stones
          </a>
          , a research project led by the Museum of Archaeology at the University
          of Stavanger and funded by the Research Council of Norway. Running from
          2024 to 2028, it brings together conservators, archaeologists, art
          historians, materials scientists and geologists from Norway, the
          Netherlands and the United States. Their aim is to understand how
          medieval craftspeople used wood tar to build and repair in stone, and
          to test whether these old recipes can offer more sustainable
          alternatives to the synthetic adhesives used in conservation today.
        </p>
        <p>
          Whether you work in conservation, study the history of building and
          craft, or are simply curious about how people in the past made stones
          stick, you will find the sources and the context to explore this
          tradition for yourself.
        </p>
        <p>
          The collection is a work in progress, and new sources are added as they
          come to light.
        </p>
      </div>
    </article>
  );
}
