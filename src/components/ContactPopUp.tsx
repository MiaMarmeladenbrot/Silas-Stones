import React, { useState } from "react";
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

    setResult("Sending....");

    const formData = new FormData(form);
    formData.append("access_key", "81355c0e-bbf7-468b-a641-00dd7624f420");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (data.success) {
      setResult("Your message was sent, thanks for getting in touch.");
      form.reset();
    } else {
      console.log("Error", data);
      setResult(data.message);
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-slate-300 opacity-20 z-10 h-full"></div>

      <div className="flex justify-center fixed inset-0 h-fit z-20 m-10">
        <div className="bg-darkSand text-white pt-6 px-12 m-5 rounded-lg shadow-lg relative overflow-y-auto p-10">
          <IoMdClose
            onClick={onCloseContact}
            className="cursor-pointer text-2xl absolute top-4 right-4"
          />

          <h2 className="pt-10">Get in touch</h2>

          <form
            onSubmit={onSubmit}
            className="flex flex-col gap-2 items-center pt-10"
          >
            <input
              type="text"
              name="name"
              placeholder="Name*"
              className="outline-none text-darkSand border rounded-lg px-2 py-3 sm:w-md bg-white"
            />
            <input
              type="email"
              name="email"
              placeholder="Email*"
              className="outline-none text-darkSand border rounded-lg px-2 py-3 sm:w-md bg-white"
            />
            <textarea
              name="message"
              placeholder="Your message*"
              className="outline-none text-darkSand border rounded-lg px-2 py-3 sm:w-md bg-white"
            />

            <button
              type="submit"
              className="border text-darkSand rounded-lg px-6 py-3 cursor-pointer bg-white hover:bg-gray-50 mt-6"
            >
              Send
            </button>
            <p className="mt-6">{result}</p>
          </form>
        </div>
      </div>
    </>
  );
}
