import React, { useState, useEffect } from "react";
import { Card, CardBody, CardFooter, Link } from "@heroui/react";
import { useMemes } from "../hooks/useMemes";
import { LIKED_MEMES_KEY } from "../components/randomUtils";
const CardView = () => {
  const { memes, updateMeme } = useMemes();
  const [likedMemes, setLikedMemes] = useState({});

  useEffect(() => {
    try {
      const savedLikedMemes = localStorage.getItem(LIKED_MEMES_KEY);
      if (savedLikedMemes) {
        setLikedMemes(JSON.parse(savedLikedMemes));
      }
    } catch (error) {
      console.error("Error parsing liked memes from localStorage", error);
      setLikedMemes({});
    }
  }, []);

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
    localStorage.setItem(LIKED_MEMES_KEY, JSON.stringify(newLikedMemes));
  };

  return (
    <div className="w-full min-h-screen bg-gray-950 text-white px-2 md:px-4 py-8 pt-24">
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6 max-w-full md:max-w-[98%] mx-auto">
        {memes.map((meme) => (
          <Card
            key={meme.id}
            className="bg-gray-900 text-white border border-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-blue-900/20 transition-all duration-300"
          >
            <CardBody className="p-0">
              <div className="w-full aspect-square relative overflow-hidden">
                <img
                  alt={meme.name}
                  className="absolute inset-0 w-full h-full object-cover"
                  src={meme.image}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src =
                      "https://via.placeholder.com/500x500?text=Image+Error";
                  }}
                />
              </div>
            </CardBody>
            <CardFooter className="flex flex-col items-start gap-2 md:gap-3 pt-3 md:pt-4 pb-3 md:pb-4 px-3 md:px-5">
              <div className="flex justify-between items-center w-full">
                <h3 className="font-bold text-lg md:text-2xl text-white truncate max-w-[70%]">
                  {meme.name}
                </h3>
                <div className="flex items-center">
                  <span className="text-lg md:text-xl font-semibold mr-1 md:mr-2">
                    {meme.likes}
                  </span>
                  <button
                    onClick={() => toggleLike(meme)}
                    className="focus:outline-none transition-transform hover:scale-110"
                  >
                    {likedMemes[meme.id] ? (
                      <svg
                        className="w-5 h-5 md:w-6 md:h-6 text-white"
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
                        className="w-5 h-5 md:w-6 md:h-6 text-white"
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
              </div>
              <Link
                isExternal
                href={meme.image}
                target="_blank"
                className="text-blue-400 hover:text-blue-300 transition-all duration-300 text-base md:text-xl hover:scale-110"
              >
                View
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CardView;
