import { useState } from "react";

export function useImageModal(mediasLength: number) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (index: number) => {
    setActiveIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const prevImage = () => {
    if (activeIndex > 0) {
      setActiveIndex((prev) => prev - 1);
    }
  };

  const nextImage = () => {
    if (activeIndex < mediasLength - 1) {
      setActiveIndex((prev) => prev + 1);
    }
  };

  return {
    activeIndex,
    isModalOpen,
    openModal,
    closeModal,
    prevImage,
    nextImage,
  };
}
