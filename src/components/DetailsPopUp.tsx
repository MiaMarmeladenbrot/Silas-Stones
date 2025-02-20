import { IoMdClose } from "react-icons/io";
import { Recipes } from "../types";

type DetailsProps = {
  setOpenDetails: React.Dispatch<React.SetStateAction<boolean>>;
  selectedRecipe: Recipes | null;
};

export function DetailsPopUp({ setOpenDetails, selectedRecipe }: DetailsProps) {
  return (
    <>
      <div className="fixed inset-0 bg-slate-300 opacity-20 z-10 h-full"></div>

      <div className="flex justify-center items-center fixed inset-0 z-20 ">
        <div className="bg-white p-6 rounded-lg shadow-lg relative">
          <IoMdClose
            onClick={() => setOpenDetails(false)}
            className="cursor-pointer text-2xl absolute top-4 right-4"
          />
          <div className="max-w-[600px] break-words">
            <h2>{selectedRecipe?.name}</h2>
            <p>
              by {selectedRecipe?.authorFirstName}{" "}
              {selectedRecipe?.authorLastName}
            </p>
            <p>from the manual: {selectedRecipe?.manual}</p>
            <p className="mb-3">dated: {selectedRecipe?.date}</p>

            <p>description:</p>
            <p className="mb-3"> {selectedRecipe?.description}</p>

            <p>ingredients:</p>
            <ul className="list-disc ml-4 mb-3">
              {selectedRecipe?.ingredients.map((ing) => (
                <li key={ing.ingredient}>
                  {ing.amount}
                  {ing.unit} {ing.ingredient}
                </li>
              ))}
            </ul>

            <p>page: {selectedRecipe?.page}</p>
            <p>in: {selectedRecipe?.source}</p>
          </div>
        </div>
      </div>
    </>
  );
}
