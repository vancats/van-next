import NoteEditor from "@/components/NoteEditor";
import { getNote } from "@/lib/redis";
import { sleep } from "@/lib/utils";

export default async function EditPage({ params }: { params: { id: string } }) {
  const noteId = params.id;
  const note = await getNote(noteId);

  // 让效果更明显
  await sleep(300);

  if (note === null) {
    return (
      <div className="note--empty-state">
        <span className="note-text--empty-state">
          Click a note on the left to view something! 🥺
        </span>
      </div>
    );
  }

  return (
    <NoteEditor
      noteId={noteId}
      initialTitle={note.title}
      initialBody={note.content}
    />
  );
}
