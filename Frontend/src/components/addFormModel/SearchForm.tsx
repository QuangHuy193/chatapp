import type { FieldErrors, UseFormRegister } from "react-hook-form";
import type { IFormValues } from "../chat/AddFriendModal";
import type React from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { DialogFooter } from "../ui/dialog";
import { DialogClose } from "@radix-ui/react-dialog";
import { Button } from "../ui/button";
import { Search } from "lucide-react";

export interface SearchFormProps {
  register: UseFormRegister<IFormValues>;
  errors: FieldErrors<IFormValues>;
  loading: boolean;
  userNameValue: string;
  isFound: boolean | null;
  searchedUserName: string;
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
  onCancel: () => void;
}

const SearchForm = ({
  register,
  errors,
  loading,
  userNameValue, // userName đang được nhập
  isFound,
  searchedUserName, // userName đang tìm
  onSubmit,
  onCancel,
}: SearchFormProps) => {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="userName" className="text-sm font-semibold">
          Tìm bằng tên người dùng
        </Label>

        <Input
          id="userName"
          placeholder="Nhập username"
          className="glass border-border/50 focus:border-primary/50 transition-smooth"
          {...register("userName", {
            required: "userName không được để trống",
          })}
        ></Input>
        {errors.userName && (
          <p className="error-message">{errors.userName.message}</p>
        )}

        {isFound === false && (
          <span className="error-message">
            Không tìm thấy người dùng{" "}
            <span className="font-semibold">@{searchedUserName}</span>
          </span>
        )}
      </div>

      <DialogFooter>
        <DialogClose asChild>
          <Button
            type="button"
            variant="outline"
            className="flex-1 glass hover:text-destructive"
            onClick={onCancel}
          >
            Hủy
          </Button>
        </DialogClose>

        <Button
          type="submit"
          disabled={loading || !userNameValue?.trim()}
          className="flex-1 bg-gradient-chat text-white hover:opacity-90 transition-smooth"
        >
          {loading ? (
            <span>"Đang tìm..." </span>
          ) : (
            <>
              <Search className="size-4 mr-2" />
              Tìm
            </>
          )}
        </Button>
      </DialogFooter>
    </form>
  );
};

export default SearchForm;
