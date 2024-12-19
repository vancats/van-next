import Image from "next/image";
import { photos } from "../../../data";

export default async function PhotoModal({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const photo = photos.find((p) => p.id === id)!;
  return (
    <div className="modal">
      <Image
        style={{ width: "200", position: "fixed", top: "120px" }}
        src={photo.src}
        alt=""
      />
    </div>
  );
}
