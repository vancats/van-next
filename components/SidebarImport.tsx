"use client";

import React, { Suspense, useRef } from "react";
import { useRouter } from "next/navigation";
import { importNote } from "@/actions";
import { useFormStatus } from "react-dom";

function Submit() {
  const { pending } = useFormStatus();
  return (
    <button disabled={pending}>{pending ? "Submitting" : "Submit"}</button>
  );
}

export default function SidebarImport() {
  const router = useRouter();
  const formRef = useRef(null);

  async function upload(formData: FormData) {
    const file = formData.get("file");
    if (!file) {
      console.warn("files list is empty");
      return;
    }

    try {
      const data = await importNote(formData);
      router.push(`/note/${data.uid}`);
    } catch (error) {
      console.error("something went wrong");
    }

    // 重置 file input
    formRef.current?.reset();
  }

  const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileInput = e.target;

    if (!fileInput.files || fileInput.files.length === 0) {
      console.warn("files list is empty");
      return;
    }

    const file = fileInput.files[0];

    const formData = new FormData();
    formData.append("file", file);

    /// Server Action
    try {
      const data = await importNote(formData);
      router.push(`/note/${data.uid}`);
    } catch (error) {
      console.error("something went wrong");
    }

    /// API 接口
    // try {
    //   const response = await fetch("/api/upload", {
    //     method: "POST",
    //     body: formData,
    //   });

    //   if (!response.ok) {
    //     console.error("something went wrong");
    //     return;
    //   }

    //   const data = await response.json();
    //   router.push(`/note/${data.uid}`);
    //   router.refresh();
    // } catch (error) {
    //   console.error("something went wrong");
    // }

    // 重置 file input
    e.target.type = "text";
    e.target.type = "file";
  };

  return (
    <form style={{ textAlign: "center" }} action={upload} ref={formRef}>
      <label htmlFor="file" style={{ cursor: "pointer" }}>
        Import .md File
      </label>
      <input
        type="file"
        id="file"
        name="file"
        style={{ position: "absolute", clip: "rect(0 0 0 0)" }}
        // onChange={onChange}
        accept=".md"
      />
      <div>
        <Submit />
      </div>
    </form>
  );
}
