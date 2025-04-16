import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Input,
} from "@heroui/react";

const EditModal = ({ meme, isOpen, onOpenChange, onSave }) => {
  const [name, setName] = useState(meme?.name || "");
  const [image, setImage] = useState(meme?.image || "");
  const [likes, setLikes] = useState(meme?.likes || 0);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (meme) {
      setName(meme.name || "");
      setImage(meme.image || "");
      setLikes(meme.likes || 0);
      setErrors({});
    }
  }, [meme]);

  const validateForm = () => {
    const newErrors = {};

    if (!name || name.length < 3 || name.length > 100) {
      newErrors.name = "Name must be between 3 and 100 characters";
    }

    const urlPattern = /^(https?:\/\/.+\.(?:jpg|jpeg))$/i;
    if (!image || !urlPattern.test(image)) {
      newErrors.image = "Must be a valid URL ending with .jpg or .jpeg";
    }

    const likesNum = parseInt(likes);
    if (isNaN(likesNum) || likesNum < 0 || likesNum > 99) {
      newErrors.likes = "Number of likes must be between 0 and 99";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validateForm()) {
      const updatedMeme = {
        ...meme,
        name,
        image,
        likes: parseInt(likes),
      };

      if (parseInt(likes) === 0) {
        updatedMeme.clearLiked = true;
      }

      onSave(updatedMeme);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      placement="center"
      backdrop="blur"
      hideCloseButton
      size="lg"
      classNames={{
        backdrop: "bg-black/80 backdrop-blur-sm",
        base: "max-w-lg mx-auto",
        wrapper: "py-4",
      }}
    >
      <ModalContent className="bg-gray-900 text-white border border-gray-800 rounded-2xl shadow-xl overflow-hidden">
        <ModalHeader className="flex flex-col gap-1 border-b border-gray-800 pb-4 bg-gray-800 px-6">
          <h3 className="text-2xl font-bold text-white">Edit Meme</h3>
        </ModalHeader>
        <ModalBody className="py-6 px-6">
          <div className="flex flex-col gap-8">
            <div className="space-y-2">
              <div className="flex items-center">
                <label className="block text-white text-base font-medium">
                  ID:
                </label>
                <span className="ml-2 text-lg text-gray-300">
                  {meme?.id || ""}
                </span>
              </div>
              <p className="text-sm text-gray-400">
                Meme identifier (read-only)
              </p>
            </div>

            <div className="space-y-2">
              <label className="block text-white text-base font-medium mb-2">
                Name
              </label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                isInvalid={!!errors.name}
                size="md"
                variant="bordered"
                classNames={{
                  inputWrapper: "bg-gray-800 rounded-xl px-3",
                  input: "text-lg bg-gray-800",
                }}
              />
              {errors.name ? (
                <p className="text-sm text-red-400 mt-2">{errors.name}</p>
              ) : (
                <p className="text-sm text-gray-400 mt-2">
                  Between 3 and 100 characters, required
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label className="block text-white text-base font-medium mb-2">
                Image URL
              </label>
              <Input
                value={image}
                onChange={(e) => setImage(e.target.value)}
                isInvalid={!!errors.image}
                size="md"
                variant="bordered"
                classNames={{
                  inputWrapper: "bg-gray-800 rounded-xl px-3",
                  input: "text-lg bg-gray-800",
                }}
              />
              {errors.image ? (
                <p className="text-sm text-red-400 mt-2">{errors.image}</p>
              ) : (
                <p className="text-sm text-gray-400 mt-2">
                  Link to an image in JPG format, required
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label className="block text-white text-base font-medium mb-2">
                Number of likes
              </label>
              <Input
                type="number"
                value={likes}
                onChange={(e) => setLikes(e.target.value)}
                isInvalid={!!errors.likes}
                size="md"
                variant="bordered"
                classNames={{
                  inputWrapper: "bg-gray-800 rounded-xl px-3",
                  input: "text-lg bg-gray-800",
                }}
              />
              {errors.likes ? (
                <p className="text-sm text-red-400 mt-2">{errors.likes}</p>
              ) : (
                <p className="text-sm text-gray-400 mt-2">
                  Between 0 and 99, required
                </p>
              )}
            </div>

            <div className="flex justify-end gap-4 pt-4">
              <button
                onClick={onOpenChange}
                className="text-white hover:text-gray-300 transition-colors focus:outline-none"
              >
                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                  <span>Cancel</span>
                </div>
              </button>
              <button
                onClick={handleSave}
                className="text-blue-400 hover:text-blue-300 transition-colors focus:outline-none"
              >
                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>Save changes</span>
                </div>
              </button>
            </div>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default EditModal;
