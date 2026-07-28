"use client";

import { Copy, Download, ExternalLink } from "lucide-react";

type Props = {
  image: string;
};

export default function ImageToolbar({
  image,
}: Props) {
  return (
    <div className="mt-3 flex gap-2">
      <button
        onClick={() => window.open(image, "_blank")}
        className="rounded-lg bg-[#2A211B] px-3 py-2 text-xs hover:bg-[#3A2D23]"
      >
        <ExternalLink size={14} className="inline mr-1" />
        Open
      </button>

      <button
        onClick={() => {
          const a = document.createElement("a");
          a.href = image;
          a.download = "image.png";
          a.click();
        }}
        className="rounded-lg bg-[#2A211B] px-3 py-2 text-xs hover:bg-[#3A2D23]"
      >
        <Download size={14} className="inline mr-1" />
        Download
      </button>

      <button
        onClick={() => navigator.clipboard.writeText(image)}
        className="rounded-lg bg-[#2A211B] px-3 py-2 text-xs hover:bg-[#3A2D23]"
      >
        <Copy size={14} className="inline mr-1" />
        Copy URL
      </button>
    </div>
  );
}