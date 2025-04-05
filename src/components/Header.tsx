import { Nav } from "./Nav";

export function Header() {
  return (
    <>
      <Nav />
      <div className="flex-col flex justify-center items-center text-center pt-20 pb-10 mx-5">
        <h1 className="text-white max-w-xl mb-10">
          The Database of Historic Stone Adhesives
        </h1>
        <h4 className="text-white max-w-4xl">
          This site is a growing collection of historical recipes, texts, and
          references related to stone adhesives - from ancient binding
          techniques to early modern formulations. The sources range from artist
          manuals and fabric rolls from medieval cathedrals to invoices and
          instruction booklets from historic restoration workshops. Whether
          you're a researcher, a conservator, or simply curious about how people
          in the past made stones stick, you'll find sources and context to
          explore this fascinating craft tradition.
        </h4>
      </div>
    </>
  );
}
