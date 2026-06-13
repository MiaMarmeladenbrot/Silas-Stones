import { NavLink } from "react-router-dom";

export function Nav({ onOpenContact }: { onOpenContact: () => void }) {
  return (
    <nav className="sticky top-0 z-30 flex items-center justify-between px-6 sm:px-10 h-16 bg-paper/85 backdrop-blur-md border-b border-line">
      <NavLink to="/" className="flex items-center gap-3">
        <img
          src="/img/sticking-stones-project.png"
          alt="logo of the sticking stones project"
          className="h-9"
        />
      </NavLink>

      <div className="flex gap-6 items-center">
        <NavLink
          to="/about"
          className={({ isActive }) =>
            `text-sm transition-colors hover:text-sandDeep ${
              isActive ? "text-sandDeep" : "text-ink"
            }`
          }
        >
          About
        </NavLink>
        <button
          className="rounded-full border border-ink/25 px-5 py-2 text-sm cursor-pointer text-ink transition-colors hover:bg-ink hover:text-paper"
          onClick={onOpenContact}
        >
          Get in touch
        </button>
      </div>
    </nav>
  );
}
