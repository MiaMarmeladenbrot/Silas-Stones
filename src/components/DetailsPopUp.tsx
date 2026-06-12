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
      <div className="fixed inset-0 bg-ink/40 backdrop-blur-sm z-40"></div>

      <div
        className="flex justify-center py-10 px-5 fixed inset-0 z-50"
        onClick={() => setOpenDetails(false)}
      >
        <div
          className="bg-paperRaised text-ink pt-8 px-8 pb-8 rounded-2xl shadow-xl relative overflow-y-auto border border-line max-w-3xl w-full"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={() => setOpenDetails(false)}
            aria-label="Close recipe details"
            className="absolute top-5 right-5 cursor-pointer text-inkSoft hover:text-ink transition-colors"
          >
            <IoMdClose className="text-2xl" />
          </button>
          <div className="break-words">
            <h2 className="mb-1 text-ink pr-8">{selectedRecipe?.name}</h2>
            {selectedRecipe?.originalTitle &&
              selectedRecipe.originalTitle !== selectedRecipe.name && (
                <p className="italic text-inkSoft mb-3">
                  {selectedRecipe.originalTitle}
                </p>
              )}

            {/* meta line */}
            <p className="text-sm text-inkSoft mb-6">
              {selectedRecipe?.authorFirstName} {selectedRecipe?.authorLastName}
              {" · "}
              {selectedRecipe?.dateDisplay ??
                selectedRecipe?.date ??
                "Date unknown"}
              {selectedRecipe?.manual ? ` · ${selectedRecipe.manual}` : ""}
              {selectedRecipe?.site ? ` · ${selectedRecipe.site}` : ""}
              {selectedRecipe?.country ? ` · ${selectedRecipe.country}` : ""}
            </p>

            <div className="h-px bg-line mb-6" />

            <div className="mb-6">
              <h5 className="mb-2">Description</h5>
              <p className="whitespace-pre-line leading-relaxed">
                {selectedRecipe?.description}
              </p>
            </div>

            {selectedRecipe?.originalText && (
              <div className="mb-6">
                <h5 className="mb-2">Original text</h5>
                <p className="whitespace-pre-line italic text-inkSoft leading-relaxed">
                  {selectedRecipe.originalText}
                </p>
              </div>
            )}

            <div className="mb-6">
              <h5 className="mb-2">Ingredients</h5>
              <ul className="list-disc ml-4 space-y-1">
                {selectedRecipe?.ingredients.map((ing) => (
                  <li key={ing.ingredient} className="diagonal-fractions">
                    {ing.amount} {ing.unit} {ing.ingredient}
                  </li>
                ))}
              </ul>
            </div>

            {selectedRecipe?.notes && (
              <div className="mb-6">
                <h5 className="mb-2">Notes</h5>
                <p className="text-sm whitespace-pre-line text-inkSoft leading-relaxed">
                  {selectedRecipe.notes}
                </p>
              </div>
            )}

            <div>
              <h5 className="mb-2">Source</h5>
              {selectedRecipe?.page && (
                <p className="text-sm mb-1 text-inkSoft">p.{selectedRecipe.page}</p>
              )}
              <p className="text-sm mb-1 text-inkSoft">
                in: {selectedRecipe?.source}
              </p>
              {selectedRecipe?.furtherBibliography && (
                <p className="text-sm mb-1 text-inkSoft">
                  further: {selectedRecipe.furtherBibliography}
                </p>
              )}
              {selectedRecipe?.url && (
                <a
                  className="text-sandDeep cursor-pointer inline-flex items-center gap-1 underline mt-1"
                  target="_blank"
                  rel="noopener noreferrer"
                  href={selectedRecipe.url}
                >
                  Open source in new tab
                </a>
              )}
            </div>

            <div className="flex flex-col gap-4 items-center mt-6">
              {selectedRecipe?.images?.map((img) => (
                !failedImages.has(img) && (
                  <img
                    key={img}
                    src={img}
                    alt={`Recipe image from ${selectedRecipe.name}`}
                    className="rounded-lg max-w-full"
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
