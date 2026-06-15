import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="flex justify-center gap-6 items-center mt-16 pt-8 text-sm text-inkSoft">
      <Link to="/impressum" className="hover:text-sandDeep transition-colors">
        Impressum
      </Link>
    </footer>
  );
}
