export function Nav({ onOpenContact }: { onOpenContact: () => void }) {
  return (
    <nav className="flex justify-end px-10 py-5 text-white">
      <button
        className="rounded-lg px-4 py-3 cursor-pointer bg-darkSand text-white"
        onClick={onOpenContact}
      >
        Get in touch
      </button>
    </nav>
  );
}
