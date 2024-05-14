export default function Home() {
  return (
    <div className="bg-indigo-400 min-h-screen min-w-screen">
      <h1 className="text-white font-red-">home page</h1>
      <div className="p-4 flex flex-col gap-y-4 items-center sm:gap-x-4 sm:flex sm:flex-row sm:item-center sm:justify-between">
        <div className="w-full h-full bg-red-500">first</div>
        <div className="w-full h-full bg-blue-500">second</div>
        <div className="w-full h-full bg-green-500">third</div>
      </div>
    </div>
  );
}
