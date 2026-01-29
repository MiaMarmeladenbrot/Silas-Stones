import { FaArrowUp } from "react-icons/fa";

export function ScrollToTop() {
  return (
    <button
      className="fixed bottom-5 right-11 bg-darkSand text-white p-3 rounded-full cursor-pointer"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Scroll to top"
    >
      <FaArrowUp />
    </button>
  );
}
