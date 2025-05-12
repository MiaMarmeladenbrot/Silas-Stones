import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="flex justify-center mt-10 bottom-10 right-1/2">
      <Link to="/impressum" className="text-white underline">
        Impressum
      </Link>
    </footer>
  );
}
