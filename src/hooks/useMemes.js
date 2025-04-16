import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { generateRandomLikes, MEMES_COOKIE } from "../components/randomUtils";

const defaultMemes = [
  {
    id: 1,
    name: "Tralalero tralala",
    image:
      "https://i.pinimg.com/736x/55/4e/b3/554eb3a5fd27256e7949c8221807b8f5.jpg",
  },
  {
    id: 2,
    name: "Bombardiro Crocodillo",
    image:
      "https://i.pinimg.com/736x/15/bb/c9/15bbc94e1bb1a89ba3f8088af10ecf4d.jpg",
  },
  {
    id: 3,
    name: "Bombobini Gusini",
    image: "https://i.ytimg.com/vi/BRsFDFjlb58/maxresdefault.jpg",
  },
  {
    id: 4,
    name: "Capuchino Assassino",
    image:
      "https://static.wikia.nocookie.net/brainrotnew/images/3/38/Hq720.jpg",
  },
  {
    id: 5,
    name: "Ballerina Cappuccina",
    image:
      "https://static.wikia.nocookie.net/brainrotnew/images/f/ff/Ballerina_Cappucina.jpg",
  },
  {
    id: 6,
    name: "Burbaloni Luliloli",
    image:
      "https://i1.sndcdn.com/artworks-HenGQ08orF9ryKx9-bOLwIA-t1080x1080.jpg",
  },
  {
    id: 7,
    name: "Chimpanzini Bananini",
    image:
      "https://static.wikia.nocookie.net/brainrotnew/images/5/5c/ChimpanziniBananini.jpg",
  },
  {
    id: 8,
    name: "Piccione Macchina",
    image:
      "https://static.wikia.nocookie.net/brainrotnew/images/2/29/Piccione_Macchina_1.jpg",
  },
  {
    id: 9,
    name: "Tung tung tung sahur",
    image:
      "https://i1.sndcdn.com/artworks-YDQOy2Pru5CA2rhs-x1uzgA-t500x500.jpg",
  },
  {
    id: 10,
    name: "Chef Crabracadabra",
    image:
      "https://i.ytimg.com/vi/y-WbdyZ7pTo/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLB_LpUTf9-h3IzVQSWK3PE713vvWw",
  },
];

export function useMemes() {
  const [memes, setMemes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedData = Cookies.get(MEMES_COOKIE);

    if (savedData) {
      try {
        setMemes(JSON.parse(savedData));
      } catch {
        createFreshMemes();
      }
    } else {
      createFreshMemes();
    }

    setLoading(false);
  }, []);

  const createFreshMemes = () => {
    const freshMemes = defaultMemes.map((meme) => ({
      ...meme,
      likes: generateRandomLikes(),
    }));
    setMemes(freshMemes);
    Cookies.set(MEMES_COOKIE, JSON.stringify(freshMemes), { expires: 30 });
  };

  useEffect(() => {
    if (!loading) {
      Cookies.set(MEMES_COOKIE, JSON.stringify(memes), { expires: 30 });
    }
  }, [memes, loading]);

  const updateMeme = (id, updatedData) => {
    const updatedMemes = memes.map((meme) =>
      meme.id === id ? { ...meme, ...updatedData } : meme
    );
    setMemes(updatedMemes);
  };

  const resetLikes = () => {
    const resetMemes = defaultMemes.map((meme) => ({
      ...meme,
      likes: generateRandomLikes(),
    }));

    setMemes(resetMemes);

    Cookies.set(MEMES_COOKIE, JSON.stringify(resetMemes), { expires: 30 });

    localStorage.removeItem("likedMemes");
  };

  return {
    memes,
    loading,
    updateMeme,
    resetLikes,
  };
}
