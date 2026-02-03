import React from "react";
import type { UseFormRegister } from "react-hook-form";
import type { IFormValues } from "../chat/AddFriendModal";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { DialogFooter } from "../ui/dialog";
import { UserPlus } from "lucide-react";

interface SendFriendRequestProps {
  register: UseFormRegister<IFormValues>;
  searchedUserName: string;
  loading: boolean;
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
  onBack: () => void;
}

const SendFriendRequestForm = ({
  register,
  searchedUserName,
  loading,
  onSubmit,
  onBack,
}: SendFriendRequestProps) => {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <span className="success-message">
          Đã tìm thấy <span className="font-semibold">@{searchedUserName}</span>
        </span>

        <div className="space-y-2">
          <Label htmlFor="message" className="text-sm font-semibold">
            Giới thiệu
          </Label>
          <Textarea
            id="message"
            rows={3}
            placeholder="Xin chào! Có thể kết bạn được không?"
            className="glass border-border focus:border-primary/50 transition-smooth
            resize-none mb-2"
            {...register("message")}
          />
        </div>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            className="flex-1 glass hover:text-destructive"
            onClick={onBack}
          >
            Quay lại
          </Button>

          <Button
            type="submit"
            disabled={loading}
            className="flex-1 bg-gradient-chat text-white hover:opacity-90 
            transition-smooth"
          >
            {loading ? (
              <span>"Đang gửi..." </span>
            ) : (
              <>
                <UserPlus className="size-4 mr-2" />
                kết bạn
              </>
            )}
          </Button>
        </DialogFooter>
      </div>
    </form>
  );
};

export default SendFriendRequestForm;
