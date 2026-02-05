import type { User } from "@/types/user";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { UserPen } from "lucide-react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { useState } from "react";

interface FormProfileInfoProps {
  user: User | null;
}

const FormProfileInfo = ({ user }: FormProfileInfoProps) => {
  const [formData, setFormData] = useState<User | null>(user);

  if (!user) return;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <Card className="overflow-y-auto max-h-70 beautiful-scrollbar">
      <CardHeader>
        <CardTitle className="flex items-center gap-1 borber border-b pb-2">
          <UserPen /> <span>Thông tin cá nhân</span>
        </CardTitle>
      </CardHeader>

      <CardContent>
        <form className="space-y-2" onSubmit={handleSubmit}>
          <div className="flex gap-2 space-y-1">
            <div className="flex-1 space-y-1">
              <Label>Tên đăng nhập</Label>
              <Input value={formData?.userName} />
            </div>
            <div className="flex-1 space-y-1">
              <Label>Tên hiển thị</Label>
              <Input value={formData?.displayName} />
            </div>
          </div>

          <div className="flex gap-2 space-y-1">
            <div className="flex-1 space-y-1">
              <Label>Email</Label>
              <Input value={formData?.email} />
            </div>

            <div className="flex-1 space-y-1">
              <Label>Số điện thoại</Label>
              <Input value={formData?.phone ?? ""} />
            </div>
          </div>

          <div>
            <div className="flex-1 space-y-1">
              <Label>Giới thiệu</Label>
              <Textarea
                value={formData?.bio ?? ""}
                placeholder="Bạn chưa viết gì cả."
              />
            </div>
          </div>
        </form>
      </CardContent>

      <CardFooter className="flex justify-end cursor-pointer">
        <Button type="submit">Lưu thay đổi</Button>
      </CardFooter>
    </Card>
  );
};

export default FormProfileInfo;
