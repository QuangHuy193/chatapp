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

// điều kiện form đăng nhập
const signInSchema = z.object({
  userName: z.string().min(5, "Tên đăng nhập phải có ít nhất 5 kí tự"),
  password: z.string().min(8, "Mật khẩu phải có ít nhất 8 kí tự"),
});

// suy ra kiểu dữ liệu cho form từ schema
type SignInFormValues = z.infer<typeof signInSchema>;

export function SigninForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
  });
  const { signIn } = useAuthStore();
  const navigate = useNavigate();

  const onSubmit = async (data: SignInFormValues) => {
    const { userName, password } = data;

    const isSuccess = await signIn(userName, password);
    console.warn("signform-isSuccess", isSuccess);
    if (isSuccess) {
      navigate("/");
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
                <h1 className="text-2xl font-bold">
                  Đăng nhập tài khoản MyChat
                </h1>
                <p className="text-muted-foreground text-sm text-balance">
                  Chào mừng bạn!
                </p>
              </div>
              <Field>
                <Field className="grid grid-cols-2 gap-4"></Field>
              </Field>
              <Field>
                <FieldLabel htmlFor="userName">Tên đăng nhập</FieldLabel>
                <Input id="userName" type="text" {...register("userName")} />
                {errors.userName && (
                  <p className="text-destructive text-sm italic">
                    {errors.userName.message}
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
                  <p className="text-destructive text-sm italic">
                    {errors.password.message}
                  </p>
                )}
              </Field>

              <Field>
                <Button
                  type="submit"
                  className="md:cursor-pointer"
                  disabled={isSubmitting}
                >
                  Đăng nhập
                </Button>
              </Field>

              <FieldDescription className="text-center">
                Bạn đã chưa có tài khoản? <a href="/signup">Đăng ký</a>
              </FieldDescription>
            </FieldGroup>
          </form>
          <div className="bg-muted relative hidden md:block">
            <img
              src="/placeholder.png"
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
