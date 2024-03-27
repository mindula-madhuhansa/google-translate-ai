"use client";

import { Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { deleteTranslation } from "@/actions/deleteTranslation";

export const DeleteTranslationButton = ({ id }: { id: string }) => {
  const deleteTranslationAction = deleteTranslation.bind(null, id);

  return (
    <form action={deleteTranslationAction}>
      <Button
        type="submit"
        variant="outline"
        size="icon"
        className="border-red-500 text-red-500 hover:bg-red-400 hover:text-white"
      >
        <Trash2 size={16} />
      </Button>
    </form>
  );
};
