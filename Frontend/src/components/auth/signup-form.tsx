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

// điều kiện form đăng ký
const signUpSchema = z
  .object({
    firstName: z.string().min(1, "Tên bắt buộc phải có"),
    lastName: z.string().min(1, "Họ bắt buộc phải có"),
    userName: z.string().min(5, "Tên đăng nhập phải có ít nhất 5 kí tự"),
    email: z.string().email("Email không hợp lệ"),
    password: z.string().min(8, "Mật khẩu phải có ít nhất 8 kí tự"),
    confirmPassword: z.string().min(8, "Vui lòng nhập lại mật khẩu"),
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
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
  });
  const { signUp } = useAuthStore();
  const navigate = useNavigate();

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
                      <p className="error-message">
                        {errors.lastName.message}
                      </p>
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
                  <p className="error-message">
                    {errors.userName.message}
                  </p>
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
                  <p className="error-message">
                    {errors.email.message}
                  </p>
                )}
              </Field>
              <Field>
                <FieldLabel htmlFor="password">Mật khẩu</FieldLabel>
                <Input
                  id="password"
                  type="password"
                  {...register("password")}
                />
                {errors.password && (
                  <p className="error-message">
                    {errors.password.message}
                  </p>
                )}
              </Field>
              <Field>
                <FieldLabel htmlFor="confirmPassword">
                  Xác nhận mật khẩu
                </FieldLabel>
                <Input
                  id="confirmPassword"
                  type="password"
                  {...register("confirmPassword")}
                />
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
