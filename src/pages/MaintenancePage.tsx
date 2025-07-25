import Lottie from "lottie-react";
import searchBook from "../assets/searchBook.json";

export function MaintenancePage() {
  return (
    <div className="flex-col flex justify-center items-center text-center pt-10 pb-10 mx-5">
      <div className="size-60">
        <Lottie animationData={searchBook} loop={true} />
      </div>
      <h2 className="text-white max-w-xl mb-10">
        Currently busy searching for recipes ...
      </h2>
      <p className="text-white">
        We'll be back as soon as we've found them all - stay tuned!
      </p>
    </div>
  );
}
