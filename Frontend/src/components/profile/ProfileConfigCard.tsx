import { useThemeStore } from "@/stores/useThemeStore";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Moon, Sun } from "lucide-react";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import { Separator } from "../ui/separator";

const ProfileConfigCard = () => {
  const { isDark, toggleTheme } = useThemeStore();
  return (
    <Card className="overflow-auto max-h-60 beautiful-scrollbar">
      <CardHeader>
        <CardTitle className="flex gap-2 items-center">
          <Sun /> <span>Tùy chỉnh ứng dụng</span>
        </CardTitle>
        <CardDescription className="border-b pb-2">
          Cá nhân hóa trải nghiệm trò chuyện
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Dark Mode */}
        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="theme-toggle" className="text-base font-medium">
              Chế độ tối
            </Label>
            <p className="text-sm text-muted-foreground">
              Chuyển đổi giữa giao diện sáng và tối
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Sun className="h-4 w-4 text-muted-foreground" />
            <Switch
              id="theme-toggle"
              checked={isDark}
              onCheckedChange={toggleTheme}
              className="data-[state=checked]:bg-primary-glow"
            />
            <Moon className="h-4 w-4 text-muted-foreground" />
          </div>
        </div>

        <Separator />

        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="theme-toggle" className="text-base font-medium">
              Trạng thái hoạt động
            </Label>
            <p className="text-sm text-muted-foreground">
              Bật/Tắt trạng thái hoạt động
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 rounded-full bg-slate-200" />
            <Switch
              id="theme-toggle"
              checked={true}
              onCheckedChange={() => {}}
              className="data-[state=checked]:bg-primary-glow"
            />
            <div className="h-4 w-4 rounded-full bg-green-500" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileConfigCard;
