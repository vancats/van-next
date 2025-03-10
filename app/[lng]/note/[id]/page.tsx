import Note from "components/Note";
import { getNote } from "lib/redis";
import { sleep } from "lib/utils";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // 动态路由 获取笔记 id
  const { id } = await params;
  const note = await getNote(id);

  await sleep(300);

  if (note == null) {
    return (
      <div className="note--empty-state">
        <span className="note-text--empty-state">
          Click a note on the left to view something! 🥺
        </span>
      </div>
    );
  }

  return <Note noteId={id} note={note} />;
}
