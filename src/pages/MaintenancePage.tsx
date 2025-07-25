import { PiFileMagnifyingGlassLight } from "react-icons/pi";

export function MaintenancePage() {
  return (
    <div className="flex-col flex justify-center items-center text-center pt-20 pb-10 mx-5">
      <PiFileMagnifyingGlassLight className="text-white size-16 mb-6" />
      <h2 className="text-white max-w-xl mb-10">
        Currently busy searching for recipes ...
      </h2>
      <p className="text-white">
        We'll be back as soon as we've found them all - stay tuned!
      </p>
    </div>
  );
}
