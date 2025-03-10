import React, { Suspense } from "react";
import Link from "next/link";
import SidebarSearchField from "./SidebarSearchField";
import SidebarNoteList from "./SidebarNoteList";
import EditButton from "./EditButton";
import NoteListSkeleton from "./NoteListSkeleton";
import { useTranslation } from "app/i18n";
import SidebarImport from "./SidebarImport";

export default async function Sidebar({ lng }: { lng: string }) {
  const { t } = await useTranslation(lng, "basic");
  return (
    <>
      <section className="col sidebar">
        <Link href={"/"} className="link--unstyled">
          <section className="sidebar-header">
            <img
              className="logo"
              src="/logo.svg"
              width="22px"
              height="20px"
              alt=""
              role="presentation"
            />
            <strong>React Notes</strong>
          </section>
        </Link>
        <section className="sidebar-menu" role="menubar">
          <SidebarSearchField />
          <EditButton noteId={null}>{t("new")}</EditButton>
        </section>
        <nav>
          <Suspense fallback={<NoteListSkeleton />}>
            <SidebarNoteList />
          </Suspense>
        </nav>
        <SidebarImport />
      </section>
    </>
  );
}
