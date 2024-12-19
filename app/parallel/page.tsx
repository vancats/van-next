import Link from "next/link";
import { photos } from "./data";
import Image from "next/image";

export default function Home() {
  return (
    <main className="container">
      {photos.map(({ id, src }) => (
        <Link key={id} href={`/parallel/photo/${id}`}>
          <Image width="200" src={src} alt="" />
        </Link>
      ))}
    </main>
  );
}
