import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { ChevronDownCircle, ChevronRightCircle, Lock } from "lucide-react";
import { Label } from "../ui/label";
import FormChangePass from "../auth/FormChangePass";
import { useState } from "react";
import { Button } from "../ui/button";

export const ProfileSecurityCard = () => {
  const [showFormChangePass, setShowFormChangePass] = useState(false);

  return (
    <Card className="overflow-auto max-h-60 beautiful-scrollbar">
      <CardHeader>
        <CardTitle className="flex gap-2 items-center">
          <Lock /> Bảo mật tài khoản
        </CardTitle>
        <CardDescription className="border-b pb-2">
          Các chức năng bảo mật tài khoản
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="flex flex-col">
          {/* đổi mật khẩu */}
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="theme-toggle" className="text-base font-medium">
                Đổi mật khẩu
              </Label>
              <p className="text-sm text-muted-foreground">
                Thay đổi mật khẩu của bạn
              </p>
            </div>
            <div>
              {showFormChangePass ? (
                <ChevronDownCircle
                  className="size-5 text-sm text-muted-foreground"
                  onClick={() => setShowFormChangePass(false)}
                />
              ) : (
                <ChevronRightCircle
                  className="size-5 text-sm text-muted-foreground"
                  onClick={() => setShowFormChangePass(true)}
                />
              )}
            </div>
          </div>
          {/* form đổi mật khẩu */}
          {showFormChangePass && (
            <div className="mt-2 pt-2 border-t">
              <FormChangePass />
            </div>
          )}
        </div>
      </CardContent>

      {/* xóa tài khoản */}
      <CardFooter className="border-t">
        <Button className="w-full" variant="destructive">Xóa tài khoản</Button>
      </CardFooter>
    </Card>
  );
};
