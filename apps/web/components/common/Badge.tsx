"use client";

type Props = {
  text: string;
  color?: string;
};

export default function Badge({
  text,
  color = "bg-orange-500",
}: Props) {
  return (
    <span
      className={`${color} rounded-full px-3 py-1 text-xs font-semibold text-white`}
    >
      {text}
    </span>
  );
}