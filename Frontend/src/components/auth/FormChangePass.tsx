import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Button } from "../ui/button";
import { toast } from "sonner";
import EyeButton from "../form/EyeButton";

// điều kiện form đăng nhập
const changePassSchema = z
  .object({
    oldPassword: z
      .string()
      .min(8, "Mật khẩu phải có ít nhất 8 kí tự")
      .regex(/[a-z]/, "Mật khẩu phải có chữ thường")
      .regex(/[A-Z]/, "Mật khẩu phải có chữ hoa")
      .regex(/[0-9]/, "Mật khẩu phải có số"),
    newPassword: z
      .string()
      .min(8, "Mật khẩu mới phải có ít nhất 8 kí tự")
      .regex(/[a-z]/, "Mật khẩu mới phải có chữ thường")
      .regex(/[A-Z]/, "Mật khẩu mới phải có chữ hoa")
      .regex(/[0-9]/, "Mật khẩu mới phải có số"),
    confirmNewPassword: z.string().min(8, "Mật khẩu nhập lại không khớp"),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Mật khẩu nhập lại không khớp",
    path: ["confirmNewPassword"], // lỗi sẽ gắn vào field confirmPassword
  });

type ChangePassFormValues = z.infer<typeof changePassSchema>;

const FormChangePass = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ChangePassFormValues>({
    resolver: zodResolver(changePassSchema),
  });

  const [showPass, setShowPass] = useState({
    oldPass: false,
    newPass: false,
    confirmNewPass: false,
  });

  const oldPasswordValue = watch("oldPassword");
  const newPasswordValue = watch("newPassword");
  const confirmNewPasswordValue = watch("confirmNewPassword");

  const onSubmit = (data: ChangePassFormValues) => {
    toast.info(".......");
  };

  return (
    <div>
      <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-2">
          <Label>Mật khẩu hiện tại</Label>
          <div className="relative">
            <Input
              type={showPass.oldPass ? "text" : "password"}
              {...register("oldPassword")}
            />

            {oldPasswordValue && (
              <EyeButton
                show={showPass.oldPass}
                setShow={(flag) => {
                  setShowPass((prev) => ({ ...prev, oldPass: flag }));
                }}
              />
            )}
          </div>

          {errors.oldPassword && (
            <p className="error-message">{errors.oldPassword.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label>Mật khẩu mới</Label>
          <div className="relative">
            <Input
              type={showPass.newPass ? "text" : "password"}
              {...register("newPassword")}
            />

            {newPasswordValue && (
              <EyeButton
                show={showPass.newPass}
                setShow={(flag) => {
                  setShowPass((prev) => ({ ...prev, newPass: flag }));
                }}
              />
            )}
          </div>

          {errors.newPassword && (
            <p className="error-message">{errors.newPassword.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label>Xác nhận mật khẩu mới</Label>
          <div className="relative">
            <Input
              type={showPass.confirmNewPass ? "text" : "password"}
              {...register("confirmNewPassword")}
            />

            {confirmNewPasswordValue && (
              <EyeButton
                show={showPass.confirmNewPass}
                setShow={(flag) => {
                  setShowPass((prev) => ({ ...prev, confirmNewPass: flag }));
                }}
              />
            )}
          </div>
          {errors.confirmNewPassword && (
            <p className="error-message">{errors.confirmNewPassword.message}</p>
          )}
        </div>

        <Button disabled={isSubmitting} className="w-full">
          Cập nhật mật khẩu
        </Button>
      </form>
    </div>
  );
};

export default FormChangePass;
