"use client";
import { Sidebar } from "lucide-react";
import { useSidebar } from "@/components/ui/sidebar";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { useNoteStore } from "@/stores/note";
import { useEditorStore } from "@/stores/editor";
import { ModeToggle } from "@/components/mode-toggle";

export const Navbar = () => {
  const { toggleSidebar } = useSidebar();
  const [editingTitle, setEditingTitle] = useState(false);
  const { currentNote } = useEditorStore();
  const [title, setTitle] = useState(currentNote?.title || "");
  const { updateNote } = useNoteStore();

  const handleEditingTitle = () => {
    setEditingTitle(false);
    const newTitle = title.trim();

    if (!newTitle || newTitle === currentNote?.title) return;

    if (currentNote?.noteId) {
      updateNote(currentNote.folderId || "", currentNote.noteId, newTitle);
    }
  };

  useEffect(() => {
    if (currentNote?.title) {
      setTitle(currentNote.title);
    }
  }, [currentNote]);

  return (
    <header className="w-full py-3 border-b border-gray-200 dark:border-neutral-800 pl-2 pr-5 flex justify-between">
      <nav className="flex gap-4 items-center">
        <button onClick={toggleSidebar} className="p-2">
          <Sidebar size={20} />
        </button>

        {currentNote && (
          <div className="flex gap-2 items-center w-full">
            {editingTitle ? (
              <Input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                onBlur={handleEditingTitle}
                onKeyDown={(e) => e.key === 'Enter' && handleEditingTitle()}
                className="border-b border-transparent focus:border-gray-400 w-[100%] md:min-w-[300px]"
                autoFocus
              />
            ) : (
              <h2
                className="text-xl font-bold cursor-pointer line-clamp-2 sm:w-[80%] lg:w-[100%] md:line-clamp-1"
                onClick={() => setEditingTitle(true)}
              >
                {title}
              </h2>
            )}
          </div>
        )}
      </nav>

      <nav>
        <ModeToggle />
      </nav>
    </header>
  );
};
