interface ErrorPageProps {
  message?: string;
  status: string;
}

export default function ErrorPage({ message = "Something went wrong", status }: ErrorPageProps) {
  return (
    <div className="flex flex-col items-center justify-center h-screen p-10 text-center">
      <h1 className="text-4xl font-bold text-red-500 mb-4">Error {status}</h1>
      <p className="text-lg text-gray-300">{message}</p>
    </div>
  );
}
