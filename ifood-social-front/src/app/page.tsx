import Link from "next/link";

export default function Home() {
  return (
    <main>
      <h1>IFood Social</h1>
      <p>Um sistema para amantes de comida</p>

      <div className="container mt-5 flex flex-col gap-3">
        <Link className="text-blue-700" href="/empreendedor/1">Empreendedor 1</Link>
        <Link className="text-blue-700" href="/empreendedor/2">Empreendedor 2</Link>
      </div>

    </main>
  );
}
