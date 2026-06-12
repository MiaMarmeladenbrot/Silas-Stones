import { useState } from "react";
import { IoMdClose } from "react-icons/io";

export default function ContactPopUp({
  onCloseContact,
}: {
  onCloseContact: () => void;
}) {
  const [result, setResult] = useState("");

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const name = (
      form.elements.namedItem("name") as HTMLInputElement
    )?.value.trim();
    const email = (
      form.elements.namedItem("email") as HTMLInputElement
    )?.value.trim();
    const message = (
      form.elements.namedItem("message") as HTMLTextAreaElement
    )?.value.trim();

    if (!name || !email || !message) {
      setResult("Please fill out all required (*) fields.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setResult("Please enter a valid email address.");
      return;
    }

    setResult("Sending....");

    const formData = new FormData(form);
    const apiKey = import.meta.env.VITE_WEB3FORMS_KEY;
    if (!apiKey) {
      setResult("Contact form is not configured. Please try again later.");
      return;
    }
    formData.append("access_key", apiKey);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        setResult("Failed to send message. Please try again later.");
        return;
      }

      const data = await response.json();

      if (data.success) {
        setResult("Your message was sent, thanks for getting in touch.");
        form.reset();
      } else {
        setResult(data.message || "Failed to send message. Please try again.");
      }
    } catch {
      setResult("Network error. Please check your connection and try again.");
    }
  };

  return (
    <>
      <div
        className="fixed inset-0 bg-ink/40 backdrop-blur-sm z-40"
        onClick={onCloseContact}
      ></div>

      <div
        className="flex justify-center items-start fixed inset-0 z-50 p-5 sm:py-16 overflow-y-auto"
        onClick={onCloseContact}
      >
        <div
          className="bg-paperRaised text-ink rounded-2xl shadow-xl relative border border-line p-8 sm:p-10 w-full max-w-md"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onCloseContact}
            aria-label="Close contact form"
            className="absolute top-5 right-5 cursor-pointer text-inkSoft hover:text-ink transition-colors"
          >
            <IoMdClose className="text-2xl" />
          </button>

          <h2 className="text-ink">Get in touch</h2>
          <p className="text-sm text-inkSoft mt-2 mb-6">
            Questions, corrections or a source to contribute? Send a note.
          </p>

          <form onSubmit={onSubmit} className="flex flex-col gap-3" noValidate>
            <label htmlFor="contact-name" className="sr-only">
              Name
            </label>
            <input
              id="contact-name"
              type="text"
              name="name"
              placeholder="Name*"
              className="outline-none text-ink placeholder:text-inkSoft/60 border border-line rounded-xl px-4 py-3 bg-paper focus:border-sandDeep transition-colors"
            />
            <label htmlFor="contact-email" className="sr-only">
              Email
            </label>
            <input
              id="contact-email"
              type="email"
              name="email"
              placeholder="Email*"
              className="outline-none text-ink placeholder:text-inkSoft/60 border border-line rounded-xl px-4 py-3 bg-paper focus:border-sandDeep transition-colors"
            />
            <label htmlFor="contact-message" className="sr-only">
              Message
            </label>
            <textarea
              id="contact-message"
              name="message"
              placeholder="Your message*"
              rows={4}
              className="outline-none text-ink placeholder:text-inkSoft/60 border border-line rounded-xl px-4 py-3 bg-paper focus:border-sandDeep transition-colors resize-y"
            />

            <input
              type="checkbox"
              name="botcheck"
              className="hidden"
              tabIndex={-1}
              autoComplete="off"
            />

            <button
              type="submit"
              className="rounded-full px-6 py-3 cursor-pointer bg-ink text-paper text-sm transition-opacity hover:opacity-85 mt-2"
            >
              Send
            </button>
            {result && (
              <p className="mt-2 text-sm text-inkSoft text-center">{result}</p>
            )}
          </form>
        </div>
      </div>
    </>
  );
}
