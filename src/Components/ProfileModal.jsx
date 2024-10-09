import { useContext, useState } from "react";

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

import { toast } from "react-toastify";
import { UserContext } from "@/Context/userContext";

const ProfileModal = ({ children }) => {
  const { editProfile } = useContext(UserContext);
  const { userData: originalUserData, isLoading } = useContext(UserContext);

  const [isOpen, setIsOpen] = useState(false);
  const [userData, setUserData] = useState(originalUserData);

  const handleUpdateProfile = async () => {
    if (userData.username.trim() === "" || userData.photoURL.trim() === "") {
      toast.error("Must fill all inputs");
      return;
    }

    const response = await editProfile(userData);
    setIsOpen(false);

    if (!response.success) {
      toast.error(response.error);
      return;
    }
  };

  const handleInputChange = (e) => {
    setUserData((prevState) => {
      return {
        ...prevState,
        [e.target.id]: e.target.value,
      };
    });

    console.log(userData);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Update profile</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Customize your profile details below.
        </DialogDescription>
        <div className="py-5">
          <p>
            <Label htmlFor="username">Username</Label>
            <Input
              className="bg-zinc-300"
              type="text"
              id="username"
              value={userData.username}
              onChange={handleInputChange}
            />
          </p>
          <p>
            <Label htmlFor="photoURL">Image URL</Label>
            <Input
              className="bg-zinc-300"
              type="text"
              id="photoURL"
              value={userData.photoURL}
              onChange={handleInputChange}
            />
          </p>
        </div>
        <DialogFooter>
          <div className="w-full flex justify-end gap-3 p-2">
            <DialogClose asChild>
              <Button variant="destructive">Cancel</Button>
            </DialogClose>

            <Button disabled={isLoading} onClick={handleUpdateProfile}>
              {isLoading ? "Saving..." : "Save"}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileModal;
