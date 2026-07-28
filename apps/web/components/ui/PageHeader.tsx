type Props = {
  title: string;
  description: string;
};

export default function PageHeader({
  title,
  description,
}: Props) {
  return (
    <div className="mb-10">
      <h1 className="text-4xl font-bold text-white">
        {title}
      </h1>

      <p className="mt-2 max-w-3xl text-gray-400">
        {description}
      </p>
    </div>
  );
}