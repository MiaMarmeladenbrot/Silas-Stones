import { NavLink } from "react-router-dom";

export function Nav({ onOpenContact }: { onOpenContact: () => void }) {
  return (
    <nav className="flex justify-between px-10 py-5 text-white">
      <NavLink to="/">
        <img
          src="../../public/img/masonry-logo-svg-vector.svg"
          alt="masonry logo"
          className="h-10 invert"
        />
      </NavLink>

      <div className="flex gap-6 items-center">
        <NavLink
          to="/about"
          className="border text-darkSand rounded-lg px-6 py-3 cursor-pointer bg-white"
        >
          About
        </NavLink>
        <button
          className="rounded-lg px-4 py-3 cursor-pointer bg-darkSand text-white"
          onClick={onOpenContact}
        >
          Get in touch
        </button>
      </div>
    </nav>
  );
}
