import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthStore } from "@/stores/useAuthStore";
import { useNavigate } from "react-router";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

// điều kiện form đăng ký
const signUpSchema = z
  .object({
    firstName: z.string().min(1, "Tên bắt buộc phải có"),
    lastName: z.string().min(1, "Họ bắt buộc phải có"),
    userName: z
      .string()
      .min(5, "Tên đăng nhập phải có ít nhất 5 kí tự")
      .regex(/^\S+$/, "Tên đăng nhập không được chứa dấu cách"),
    email: z.string().email("Email không hợp lệ"),
    password: z
      .string()
      .min(8, "Mật khẩu phải có ít nhất 8 kí tự")
      .regex(/[a-z]/, "Mật khẩu phải có chữ thường")
      .regex(/[A-Z]/, "Mật khẩu phải có chữ hoa")
      .regex(/[0-9]/, "Mật khẩu phải có số"),
    confirmPassword: z.string().min(8, "Mật khẩu nhập lại không khớp"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Mật khẩu nhập lại không khớp",
    path: ["confirmPassword"], // lỗi sẽ gắn vào field confirmPassword
  });

// suy ra kiểu dữ liệu cho form từ schema
type SignUpFormValues = z.infer<typeof signUpSchema>;

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
  });
  const { signUp } = useAuthStore();
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState({
    pass: false,
    confirmPass: false,
  });

  const passwordValue = watch("password");
  const confirmPasswordValue = watch("confirmPassword");

  const onSubmit = async (data: SignUpFormValues) => {
    const { userName, firstName, lastName, password, email } = data;

    const isSuccess = await signUp(
      userName,
      firstName,
      lastName,
      email,
      password,
    );
    if (isSuccess) {
      navigate("/signin");
    }
  };
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0 border-border">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8" onSubmit={handleSubmit(onSubmit)}>
            <FieldGroup>
              <div className="flex flex-col items-center gap-2 text-center">
                <div className="flex justify-center">
                  <img src="/logo.svg" alt="Image" className="" />
                </div>
                <h1 className="text-2xl font-bold">Tạo tài khoản MyChat</h1>
                <p className="text-muted-foreground text-sm text-balance">
                  Chào mừng bạn! Hãy đăng ký để bắt đầu!
                </p>
              </div>
              <Field>
                <Field className="grid grid-cols-2 gap-4">
                  <Field>
                    <FieldLabel>Họ</FieldLabel>
                    <Input
                      id="lastName"
                      type="text"
                      {...register("lastName")}
                    />
                    {errors.lastName && (
                      <p className="error-message">{errors.lastName.message}</p>
                    )}
                  </Field>
                  <Field>
                    <FieldLabel>Tên</FieldLabel>
                    <Input
                      id="firstName"
                      type="text"
                      {...register("firstName")}
                    />
                    {errors.firstName && (
                      <p className="error-message">
                        {errors.firstName.message}
                      </p>
                    )}
                  </Field>
                </Field>
              </Field>
              <Field>
                <FieldLabel htmlFor="userName">Tên đăng nhập</FieldLabel>
                <Input
                  id="userName"
                  type="text"
                  placeholder="mychat"
                  {...register("userName")}
                />
                {errors.userName && (
                  <p className="error-message">{errors.userName.message}</p>
                )}
              </Field>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="email@example.com"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="error-message">{errors.email.message}</p>
                )}
              </Field>
              <Field>
                <FieldLabel htmlFor="password">Mật khẩu</FieldLabel>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPass.pass ? "text" : "password"}
                    {...register("password")}
                  />
                  {passwordValue ? (
                    showPass.pass ? (
                      <EyeOff
                        className="absolute right-2 top-1/2 -translate-y-1/2 size-5"
                        onClick={() =>
                          setShowPass((prev) => ({ ...prev, pass: false }))
                        }
                      />
                    ) : (
                      <Eye
                        className="absolute right-2 top-1/2 -translate-y-1/2 size-5"
                        onClick={() => {
                          setShowPass((prev) => ({ ...prev, pass: true }));
                        }}
                      />
                    )
                  ) : (
                    ""
                  )}
                </div>
                {errors.password && (
                  <p className="error-message">{errors.password.message}</p>
                )}
              </Field>
              <Field>
                <FieldLabel htmlFor="confirmPassword">
                  Xác nhận mật khẩu
                </FieldLabel>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showPass.confirmPass ? "text" : "password"}
                    {...register("confirmPassword")}
                  />
                  {confirmPasswordValue ? (
                    showPass.confirmPass ? (
                      <EyeOff
                        className="absolute right-2 top-1/2 -translate-y-1/2 size-5"
                        onClick={() =>
                          setShowPass((prev) => ({
                            ...prev,
                            confirmPass: false,
                          }))
                        }
                      />
                    ) : (
                      <Eye
                        className="absolute right-2 top-1/2 -translate-y-1/2 size-5"
                        onClick={() => {
                          setShowPass((prev) => ({
                            ...prev,
                            confirmPass: true,
                          }));
                        }}
                      />
                    )
                  ) : (
                    ""
                  )}
                </div>
                {errors.confirmPassword && (
                  <p className="error-message">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </Field>

              <Field>
                <Button
                  type="submit"
                  className="md:cursor-pointer"
                  disabled={isSubmitting}
                >
                  Tạo tài khoản
                </Button>
              </Field>

              <FieldDescription className="text-center">
                Bạn đã có tài khoản? <a href="/signin">Đăng nhập</a>
              </FieldDescription>
            </FieldGroup>
          </form>
          <div className="bg-muted relative hidden md:block">
            <img
              src="/placeholderSignUp.png"
              alt="Image"
              className="absolute top-1/2 -translate-y-1/2 object-cover"
            />
          </div>
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center">
        Bằng cách tiếp tục, bạn đồng ý với <a href="#">Điều khoản dịch vụ</a> và{" "}
        <a href="#">Chính sách bảo mật</a> của chúng tôi.
      </FieldDescription>
    </div>
  );
}
