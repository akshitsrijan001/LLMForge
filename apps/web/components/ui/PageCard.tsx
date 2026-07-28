type Props = {
  children: React.ReactNode;
  className?: string;
};

export default function PageCard({
  children,
  className = "",
}: Props) {
  return (
    <div
      className={`rounded-3xl border border-[#35291F] bg-[#221C18] p-6 shadow-xl shadow-black/20 ${className}`}
    >
      {children}
    </div>
  );
}