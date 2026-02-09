import React, { type FormEvent, type SetStateAction } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

interface SendOtpFormProps {
  email: string;
  handleSendOtp: (e: FormEvent) => Promise<void>;
  setEmail: React.Dispatch<SetStateAction<string>>;
  loadingMail: boolean;
}

const SendOtpForm = ({
  email,
  handleSendOtp,
  setEmail,
  loadingMail,
}: SendOtpFormProps) => {
  return (
    <form className="space-y-4 rounded-md border p-4" onSubmit={handleSendOtp}>
      <div className="flex flex-col gap-2">
        <Label>Email đã dùng đăng ký tài khoản để nhận mã xác nhận</Label>
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <Button className="w-full" type="submit" disabled={loadingMail}>
        {loadingMail ? "Đang gửi mã..." : "Tiếp tục"}
      </Button>
    </form>
  );
};

export default SendOtpForm;
