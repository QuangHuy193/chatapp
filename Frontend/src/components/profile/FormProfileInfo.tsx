import type { User } from "@/types/user";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { UserPen } from "lucide-react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUserStore } from "@/stores/useUserStore";

interface FormProfileInfoProps {
  user: User | null;
}

// điều kiện form
const infoSchema = z.object({
  userName: z.string().min(5, "Tên đăng nhập phải có ít nhất 5 kí tự"),
  email: z.string().email("Email không hợp lệ"),
  displayName: z.string().min(1, "Tên hiển thị là bắt buộc"),
  bio: z.string().max(60, "Giới thiệu tối đa 60 kí tự").optional(),
  phone: z
    .string()
    .regex(/^\d{10}$/, "Số điện thoại phải gồm đúng 10 chữ số")
    .optional(),
});

type infoFormValues = z.infer<typeof infoSchema>;

const FormProfileInfo = ({ user }: FormProfileInfoProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<infoFormValues>({
    resolver: zodResolver(infoSchema),
    defaultValues: {
      userName: user?.userName,
      displayName: user?.displayName,
      email: user?.email,
      bio: user?.bio,
      phone: user?.phone,
    },
  });

  const { updateInfo } = useUserStore();

  if (!user) return;

  const onSubmit = async (data: infoFormValues) => {
    await updateInfo(data);
  };

  return (
    <Card className="overflow-y-auto max-h-60 beautiful-scrollbar">
      <CardHeader>
        <CardTitle className="flex items-center gap-1 ">
          <UserPen /> <span>Thông tin cá nhân</span>
        </CardTitle>
        <CardDescription className="borber border-b pb-2">
          Tùy chỉnh thông tin cá nhân
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form className="space-y-2" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex gap-2 space-y-1">
            <div className="flex-1 space-y-1">
              <Label>Tên đăng nhập</Label>
              <Input type="text" {...register("userName")} />
              {errors.userName && (
                <p className="error-message">{errors.userName.message}</p>
              )}
            </div>
            <div className="flex-1 space-y-1">
              <Label>Tên hiển thị</Label>
              <Input type="text" {...register("displayName")} />
              {errors.displayName && (
                <p className="error-message">{errors.displayName.message}</p>
              )}
            </div>
          </div>

          <div className="flex gap-2 space-y-1">
            <div className="flex-1 space-y-1">
              <Label>Email</Label>
              <Input type="email" {...register("email")} />
              {errors.email && (
                <p className="error-message">{errors.email.message}</p>
              )}
            </div>

            <div className="flex-1 space-y-1">
              <Label>Số điện thoại</Label>
              <Input type="text" {...register("phone")} />
              {errors.phone && (
                <p className="error-message">{errors.phone.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-1 flex-1">
            <Label>Giới thiệu</Label>
            <Textarea
              className="max-w-103"
              placeholder="Bạn chưa viết gì cả."
              {...register("bio")}
            />
            {errors.bio && (
              <p className="error-message">{errors.bio.message}</p>
            )}
          </div>

          <div className="flex justify-end">
            <Button disabled={isSubmitting} type="submit">
              Lưu thay đổi
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default FormProfileInfo;
