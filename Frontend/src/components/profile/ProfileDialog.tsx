import { type Dispatch, type SetStateAction } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import ProfileCard from "./ProfileCard";
import { useAuthStore } from "@/stores/useAuthStore";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import FormProfileInfo from "./FormProfileInfo";
import ProfileConfigCard from "./ProfileConfigCard";
import { ProfileSecurityCard } from "./ProfileSecurityCard";

interface ProfileDialogProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const ProfileDialog = ({ open, setOpen }: ProfileDialogProps) => {
  const { user } = useAuthStore();
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        onInteractOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
        className="overflow-y-auto p-0 bg-transparent border-0 shadow-2xl"
      >
        <div className="bg-gradient-glass">
          <div className="max-w-4xl mx-auto p-4">
            {/* heading */}
            <DialogHeader className="mb-6">
              <DialogTitle className="text-2xl font-black text-foreground">
                Thông tin & Cài đặt
              </DialogTitle>
            </DialogHeader>

            {/* info */}
            <ProfileCard user={user} />

            {/* tabs */}
            <Tabs className="my-2" defaultValue="account">
              <TabsList className="w-full grid grid-cols-3 glass-light">
                <TabsTrigger
                  value="account"
                  className="data-[state=active]:glass-strong"
                >
                  Tài Khoản
                </TabsTrigger>
                <TabsTrigger
                  value="config"
                  className="data-[state=active]:glass-strong"
                >
                  Cấu hình
                </TabsTrigger>
                <TabsTrigger
                  value="security"
                  className="data-[state=active]:glass-strong"
                >
                  Bảo mật
                </TabsTrigger>
              </TabsList>

              <TabsContent value="account">
                <FormProfileInfo user={user} />
              </TabsContent>
              <TabsContent value="config">
                <ProfileConfigCard />
              </TabsContent>
              <TabsContent value="security">
                <ProfileSecurityCard/>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileDialog;
