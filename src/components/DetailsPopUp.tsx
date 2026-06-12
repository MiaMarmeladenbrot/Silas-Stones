import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { Recipes } from "../types";

type DetailsProps = {
  setOpenDetails: React.Dispatch<React.SetStateAction<boolean>>;
  selectedRecipe: Recipes | null;
};

export function DetailsPopUp({ setOpenDetails, selectedRecipe }: DetailsProps) {
  const [failedImages, setFailedImages] = useState<Set<string>>(new Set());

  return (
    <>
      <div className="fixed inset-0 bg-slate-300 opacity-20 z-10 h-full"></div>

      <div
        className="flex justify-center my-10 fixed inset-0 z-20"
        onClick={() => setOpenDetails(false)}
      >
        <div className="bg-darkSand text-white pt-6 px-8 m-5 rounded-lg shadow-lg relative overflow-y-auto">
          <button
            onClick={() => setOpenDetails(false)}
            aria-label="Close recipe details"
            className="absolute top-4 right-4 cursor-pointer"
          >
            <IoMdClose className="text-2xl" />
          </button>
          <div className="max-w-3xl break-words">
            <h2 className="mb-1">{selectedRecipe?.name}</h2>
            {selectedRecipe?.originalTitle &&
              selectedRecipe.originalTitle !== selectedRecipe.name && (
                <p className="italic text-white/80 mb-2">
                  {selectedRecipe.originalTitle}
                </p>
              )}
            <div className="mb-3">
              <p>
                by {selectedRecipe?.authorFirstName}{" "}
                {selectedRecipe?.authorLastName}
              </p>
              {selectedRecipe?.site && <p>in: {selectedRecipe.site}</p>}
              <p>from the manual: {selectedRecipe?.manual}</p>
              <p>
                dated:{" "}
                {selectedRecipe?.dateDisplay ??
                  selectedRecipe?.date ??
                  "Unknown"}
              </p>
              {selectedRecipe?.country && (
                <p>country: {selectedRecipe.country}</p>
              )}
            </div>

            <div className="mb-3">
              <h5>description:</h5>
              <p className="whitespace-pre-line"> {selectedRecipe?.description}</p>
            </div>

            {selectedRecipe?.originalText && (
              <div className="mb-3">
                <h5>original text:</h5>
                <p className="whitespace-pre-line italic text-white/80">
                  {selectedRecipe.originalText}
                </p>
              </div>
            )}

            <div className="mb-3">
              <h5>ingredients:</h5>
              <ul className="list-disc ml-4">
                {selectedRecipe?.ingredients.map((ing) => (
                  <li key={ing.ingredient} className="diagonal-fractions">
                    {ing.amount} {ing.unit} {ing.ingredient}
                  </li>
                ))}
              </ul>
            </div>

            {selectedRecipe?.notes && (
              <div className="mb-3">
                <h5>notes:</h5>
                <p className="text-sm whitespace-pre-line">
                  {selectedRecipe.notes}
                </p>
              </div>
            )}

            <div>
              <h5>source:</h5>
              {selectedRecipe?.page && (
                <p className="text-sm mb-1">p.{selectedRecipe.page}</p>
              )}
              <p className="text-sm mb-1">in: {selectedRecipe?.source}</p>
              {selectedRecipe?.furtherBibliography && (
                <p className="text-sm mb-1">
                  further: {selectedRecipe.furtherBibliography}
                </p>
              )}
              {selectedRecipe?.url && (
                <a
                  className="text-white cursor-pointer flex items-center gap-1 underline"
                  target="_blank"
                  rel="noopener noreferrer"
                  href={selectedRecipe.url}
                >
                  Open source in new tab
                </a>
              )}
            </div>

            <div className="flex flex-col gap-4 items-center mt-5">
              {selectedRecipe?.images?.map((img) => (
                !failedImages.has(img) && (
                  <img
                    key={img}
                    src={img}
                    alt={`Recipe image from ${selectedRecipe.name}`}
                    onError={() => setFailedImages((prev) => new Set(prev).add(img))}
                  />
                )
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
