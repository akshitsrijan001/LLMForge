"use client";

import { X } from "lucide-react";

type Props = {
  image: string | null;
  onClose: () => void;
};

export default function ImageViewerModal({
  image,
  onClose,
}: Props) {
  if (!image) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 backdrop-blur-sm"
    >
      <button
        onClick={onClose}
        className="absolute right-6 top-6 rounded-lg bg-black/40 p-2 hover:bg-black/70"
      >
        <X className="text-white" />
      </button>

      <img
        src={image}
        alt="Generated"
        onClick={(e) => e.stopPropagation()}
        className="max-h-[90vh] max-w-[90vw] rounded-xl shadow-2xl"
      />
    </div>
  );
}