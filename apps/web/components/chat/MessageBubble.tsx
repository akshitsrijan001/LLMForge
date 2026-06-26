"use client";

type Props = {
  role: "user" | "assistant";
  content: string;
};

export default function MessageBubble({
  role,
  content,
}: Props) {
  const isUser = role === "user";

  return (
    <div
      className={`flex ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`max-w-3xl rounded-2xl px-6 py-4 shadow-lg ${
          isUser
            ? "bg-orange-600 text-white"
            : "bg-[#221c18] border border-[#2A211B] text-gray-200"
        }`}
      >
        <p className="leading-7 whitespace-pre-wrap">
          {content}
        </p>
      </div>
    </div>
  );
}