interface HeaderListProps {
  title: string;
  description: string;
}

export default function UsersHeaderList({ title, description }: HeaderListProps) {
  return (
    <header className="bg-white shadow p-6 rounded-lg">
      <h1 className="text-3xl font-bold text-teal-800">{title}</h1>
      <p className="mt-2 text-gray-600 italic">{description}</p>
    </header>
  );
}
