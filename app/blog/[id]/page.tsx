// import { redirect } from "next/navigation";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  /// 此时访问 /blog/vancats,会重定向到 /blog/vancats_slug
  /// redirect("/blog/vancats_slug");
  const { id } = await params;
  return <div>My Post: {id}</div>;
}
