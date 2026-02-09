import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  ChevronDownCircle,
  ChevronRightCircle,
  Lock,
  TriangleAlert,
} from "lucide-react";
import { Label } from "../ui/label";
import FormChangePass from "../auth/FormChangePass";
import { useState } from "react";
import { Button } from "../ui/button";
import ConfirmDialog from "../alert/ConfirmDialog";
import { toast } from "sonner";
import { useUserStore } from "@/stores/useUserStore";
import { useNavigate } from "react-router";

export const ProfileSecurityCard = () => {
  const [showFormChangePass, setShowFormChangePass] = useState(false);
  const { deleteAccount } = useUserStore();
  const navigate = useNavigate();

  const handleDeleteAccount = async () => {
    try {
      const isSuccess = await deleteAccount();

      if (isSuccess) {
        navigate("/signin");
      }
    } catch (error) {
      console.error(error);
    }
  };

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
        <ConfirmDialog
          icon={<TriangleAlert className="size-10 text-destructive" />}
          tittle="Xóa tài khoản"
          triggerButton={
            <Button className="w-full" variant="destructive">
              Xóa tài khoản
            </Button>
          }
          onConfirm={handleDeleteAccount}
          cancelText="Hủy"
          confirmText="Xác nhận"
          description="Bạn chắc chắn muốn xóa tài khoản, hành động này không thể hoàn tác!"
        />
      </CardFooter>
    </Card>
  );
};
