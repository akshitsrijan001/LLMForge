type Props = {
  children: React.ReactNode;
};

export default function PageLayout({ children }: Props) {
  return (
    <div className="min-h-screen bg-[#171311] text-white">
      <div className="mx-auto max-w-7xl px-10 py-10">
        {children}
      </div>
    </div>
  );
}