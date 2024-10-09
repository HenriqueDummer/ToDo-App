import { useContext, useState, useRef } from "react";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/Components/ui/dialog";
import { Button } from "@/Components/ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { TodosContext } from "@/Context/todosContext";
import { toast } from "react-toastify";

const TagModal = ({ children }) => {
  const tagNameRef = useRef();
  const [isOpen, setIsOpen] = useState(false);
  const { addNewTag, isLoading } = useContext(TodosContext);
  console.log(isLoading)
  const handleAddTag = async () => {
    const tagName = tagNameRef.current.value;
    console.log(isLoading)
    if (tagName.trim() === "") {
      toast.error("Please inform the name of the collection");
      return;
    }

    await addNewTag(tagName);

    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
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
            <Input
              className="bg-zinc-300"
              ref={tagNameRef}
              type="text"
              id="tagName"
            />
          </p>
        </div>
        <DialogFooter>
          <div className="w-full flex justify-end gap-3 p-2">
            <DialogClose asChild>
              <Button variant="destructive">Cancel</Button>
            </DialogClose>

            <Button disabled={isLoading} onClick={handleAddTag}>
              {isLoading ? "Saving..." : "Save"}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TagModal;
