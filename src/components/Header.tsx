import { useState } from "react";
import ContactPopUp from "./ContactPopUp";
import { Nav } from "./Nav";

export function Header() {
  const [openContact, setOpenContact] = useState(false);

  return (
    <>
      {openContact && (
        <ContactPopUp onCloseContact={() => setOpenContact(false)} />
      )}

      <Nav onOpenContact={() => setOpenContact(true)} />
    </>
  );
}
