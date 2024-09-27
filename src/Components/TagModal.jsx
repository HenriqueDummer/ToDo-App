import { useContext, useRef } from "react";

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog";
  import { Button } from "@/components/ui/button";
  import { Input } from "./ui/input";
  import { Label } from "./ui/label";
import { TodosContext } from "@/Context/todosContext";

const TagModal = ({children}) => {
  const tagNameRef = useRef()
  const {addNewTag} = useContext(TodosContext)

  const handleAddTag = async () => {
    const tagName = tagNameRef.current.value

    if(tagName.trim() === ""){
        return
    }

    await addNewTag(tagName)
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>New collection</DialogTitle>
        </DialogHeader>
        <DialogDescription>
            Let's give the new collection a name
        </DialogDescription>
        <div className="py-5">
          <p>
            <Label htmlFor="tagName">Name</Label>
            <Input className="bg-zinc-300" ref={tagNameRef} type="text" id="tagName" />
          </p>
        </div>
        <DialogFooter>
          <div className="w-full flex justify-end gap-3 p-2">
            <DialogClose asChild>
              <Button variant="destructive">Cancel</Button>
            </DialogClose>

            <Button onClick={handleAddTag}>Save</Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TagModal;
