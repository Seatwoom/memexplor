import React, { useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Link,
  useDisclosure,
} from "@heroui/react";
import EditModal from "../components/EditModal";
import { useMemes } from "../hooks/useMemes";

const TableView = () => {
  const { memes, updateMeme } = useMemes();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedMeme, setSelectedMeme] = useState(null);

  const [likedMemes, setLikedMemes] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("likedMemes")) || {};
    } catch (error) {
      console.error("Error parsing liked memes from localStorage", error);
      return {};
    }
  });

  const handleEdit = (meme) => {
    setSelectedMeme(meme);
    onOpen();
  };

  const handleSave = (updatedMeme) => {
    if (updatedMeme.clearLiked || updatedMeme.likes === 0) {
      const newLikedMemes = { ...likedMemes };
      delete newLikedMemes[updatedMeme.id];
      setLikedMemes(newLikedMemes);
      localStorage.setItem("likedMemes", JSON.stringify(newLikedMemes));

      if (updatedMeme.clearLiked) {
        delete updatedMeme.clearLiked;
      }
    }

    updateMeme(updatedMeme.id, updatedMeme);
    onOpenChange();
  };

  const toggleLike = (meme) => {
    const newLikedMemes = { ...likedMemes };

    if (newLikedMemes[meme.id]) {
      delete newLikedMemes[meme.id];
      updateMeme(meme.id, { likes: Math.max(0, meme.likes - 1) });
    } else {
      newLikedMemes[meme.id] = true;
      updateMeme(meme.id, { likes: meme.likes + 1 });
    }

    setLikedMemes(newLikedMemes);
    localStorage.setItem("likedMemes", JSON.stringify(newLikedMemes));
  };

  return (
    <div className="w-full min-h-screen bg-gray-950 text-white p-4 md:p-6">
      <div className="w-full mx-auto bg-gray-900 rounded-xl shadow-xl border border-gray-800">
        <Table
          aria-label="Meme directory table"
          className="w-full table-fixed"
          layout={"fixed"}
        >
          <TableHeader>
            <TableColumn
              className="bg-gray-900 text-white font-medium text-xs sm:text-sm md:text-base px-2 py-4"
              style={{ width: "5%" }}
            >
              ID
            </TableColumn>
            <TableColumn
              className="bg-gray-900 text-white font-medium text-xs sm:text-sm md:text-base px-2 py-4"
              style={{ width: "25%" }}
            >
              NAME
            </TableColumn>
            <TableColumn
              className="bg-gray-900 text-white font-medium text-xs sm:text-sm md:text-base px-2 py-4"
              style={{ width: "40%" }}
            >
              IMAGE URL
            </TableColumn>
            <TableColumn
              className="bg-gray-900 text-white font-medium text-xs sm:text-sm md:text-base px-2 py-4"
              style={{ width: "15%" }}
            >
              LIKES
            </TableColumn>
            <TableColumn
              className="bg-gray-900 text-white font-medium text-xs sm:text-sm md:text-base px-2 py-4"
              style={{ width: "10%" }}
            >
              ACT
            </TableColumn>
          </TableHeader>
          <TableBody className="text-white">
            {memes.map((meme) => (
              <TableRow
                key={meme.id}
                className="hover:bg-gray-800/50 border-b border-gray-800"
              >
                <TableCell className="px-2 py-4 text-xs sm:text-sm md:text-base text-center whitespace-nowrap">
                  {meme.id}
                </TableCell>

                <TableCell className="font-medium px-2 py-4 text-xs sm:text-sm md:text-base">
                  <div className="truncate max-w-full">{meme.name}</div>
                </TableCell>

                <TableCell className="px-2 py-4 text-xs sm:text-sm md:text-base">
                  <Link
                    className="text-gray-400 hover:text-blue-300 transition-colors"
                    href={meme.image}
                    target="_blank"
                    isExternal
                  >
                    <span className="truncate block max-w-full">
                      {meme.image}
                    </span>
                  </Link>
                </TableCell>

                <TableCell className="px-2 py-4 text-xs sm:text-sm md:text-base text-center">
                  <div className="flex items-center justify-center">
                    <span className="mr-2">{meme.likes}</span>
                    <button
                      onClick={() => toggleLike(meme)}
                      className="focus:outline-none transition-transform hover:scale-110"
                    >
                      {likedMemes[meme.id] ? (
                        <svg
                          className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                      ) : (
                        <svg
                          className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                          ></path>
                        </svg>
                      )}
                    </button>
                  </div>
                </TableCell>

                <TableCell className="px-2 py-4 text-center">
                  <button
                    onClick={() => handleEdit(meme)}
                    className="text-blue-400 text-xs sm:text-sm md:text-base transition-all duration-300 hover:scale-110 hover:text-blue-300"
                  >
                    Edit
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {selectedMeme && (
        <EditModal
          meme={selectedMeme}
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default TableView;
