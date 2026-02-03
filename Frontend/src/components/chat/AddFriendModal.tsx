import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "../ui/dialog";
import { UserPlus } from "lucide-react";
import { DialogTitle } from "@radix-ui/react-dialog";
import SearchForm from "../addFormModel/SearchForm";
import type { User } from "@/types/user";
import { useFriendStore } from "@/stores/useFriendStore";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import SendFriendRequestForm from "../addFormModel/SendFriendRequestForm";

export interface IFormValues {
  userName: string;
  message: string;
}

const AddFriendModal = () => {
  const [isFound, setIsFound] = useState<boolean | null>(null);
  const [searchUser, setSearchUser] = useState<User>();
  const [searchUserName, setSearchUserName] = useState<string>(""); //userName đã nhập trước đó
  const { loading, searchUserByUserName, sendFriendRequest } = useFriendStore();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      userName: "",
      message: "",
    },
  });

  const userNameValue = watch("userName");

  const handleSearch = handleSubmit(async (data) => {
    const userName = data.userName.trim();
    if (!userName) return;

    setIsFound(null);

    setSearchUserName(userName);

    try {
      const foundUser = await searchUserByUserName(userName);
      if (foundUser) {
        setIsFound(true);
        setSearchUser(foundUser);
      } else {
        setIsFound(false);
      }
    } catch (error) {
      console.error(error);
      setIsFound(false);
    }
  });

  const handleCancel = () => {
    reset();
    setSearchUserName("");
    setIsFound(null);
  };

  const handleSend = handleSubmit(async (data) => {
    if (!searchUser) return;

    try {
      const message = await sendFriendRequest(
        searchUser._id,
        data.message.trim(),
      );
      if (message === "") {
        toast.warning("Không thể gửi yêu cầu kết bạn!");
      } else {
        toast.success(message);
      }

      handleCancel();
    } catch (error) {
      console.error(error);
    }
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div
          className="flex justify-center items-center rounded-full sizze-5
        hover:bg-sidebar-accent cursor-pointer z-10"
        >
          <UserPlus className="size-4" />
          <span className="sr-only">Kết bạn</span>
        </div>
      </DialogTrigger>

      <DialogContent className="sm:max-w-106.25 border-none">
        <DialogHeader>
          <DialogTitle>Kết bạn</DialogTitle>
        </DialogHeader>

        {!isFound && (
          <>
            <SearchForm
              isFound={isFound}
              errors={errors}
              loading={loading}
              onCancel={handleCancel}
              register={register}
              searchedUserName={searchUserName}
              userNameValue={userNameValue}
              onSubmit={handleSearch}
            />
          </>
        )}

        {isFound && (
          <>
            <SendFriendRequestForm
              register={register}
              loading={loading}
              onBack={() => {
                setIsFound(null);
              }}
              onSubmit={handleSend}
              searchedUserName={searchUserName}
            />
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AddFriendModal;
