import { IoMdClose } from "react-icons/io";
import { Recipes } from "../types";
import { FaArrowRight } from "react-icons/fa";

type DetailsProps = {
  setOpenDetails: React.Dispatch<React.SetStateAction<boolean>>;
  selectedRecipe: Recipes | null;
};

export function DetailsPopUp({ setOpenDetails, selectedRecipe }: DetailsProps) {
  return (
    <>
      <div className="fixed inset-0 bg-slate-300 opacity-20 z-10 h-full"></div>

      <div
        className="flex justify-center my-10 fixed inset-0 z-20"
        onClick={() => setOpenDetails(false)}
      >
        <div className="bg-white p-6 rounded-lg shadow-lg relative overflow-y-auto">
          <IoMdClose
            onClick={() => setOpenDetails(false)}
            className="cursor-pointer text-2xl absolute top-4 right-4"
          />
          <div className="max-w-[600px] break-words">
            <h2 className="mb-3">{selectedRecipe?.name}</h2>
            <div className="mb-3">
              <p>
                by {selectedRecipe?.authorFirstName}{" "}
                {selectedRecipe?.authorLastName}
              </p>
              <p>from the manual: {selectedRecipe?.manual}</p>
              <p>dated: {selectedRecipe?.date}</p>
            </div>

            <div className="mb-3">
              <p>description:</p>
              <p> {selectedRecipe?.description}</p>
            </div>

            <div className="mb-3">
              <p>ingredients:</p>
              <ul className="list-disc ml-4">
                {selectedRecipe?.ingredients.map((ing) => (
                  <li key={ing.ingredient}>
                    {ing.amount}
                    {ing.unit} {ing.ingredient}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-sm mb-1">page {selectedRecipe?.page}</p>
              <p className="text-sm mb-1">in: {selectedRecipe?.source}</p>
              {selectedRecipe?.url && (
                <a
                  className="text-[#dca87a] cursor-pointer flex items-center gap-1"
                  target="_blank"
                  href={selectedRecipe?.url}
                >
                  <p>Go to source</p>
                  <FaArrowRight />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
