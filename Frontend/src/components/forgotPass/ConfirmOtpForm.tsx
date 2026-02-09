import type React from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import type { FormEvent, SetStateAction } from "react";

interface ConfirmOtpFormProps {
  handleConfirmOtp: (e: FormEvent) => Promise<void>;
  maskedEmail: string;
  otp: string;
  loadingMail: boolean;
  handleBack: () => void;
  setOtp: React.Dispatch<SetStateAction<string>>;
  timeLeft: number;
  handleSendOtp: (e: FormEvent) => Promise<void>;
}

const ConfirmOtpForm = ({
  handleConfirmOtp,
  maskedEmail,
  otp,
  loadingMail,
  handleBack,
  setOtp,
  timeLeft,
  handleSendOtp,
}: ConfirmOtpFormProps) => {
  return (
    <form
      className="space-y-4 rounded-md border p-4"
      onSubmit={handleConfirmOtp}
    >
      <p className="text-sm text-muted-foreground">
        Chúng tôi đã gửi mã xác nhận gồm 6 chữ số đến email{" "}
        <span className="font-medium text-foreground">{maskedEmail}</span>
      </p>

      <Input
        value={otp}
        type="text"
        placeholder="XXXXXX"
        maxLength={6}
        onChange={(e) => setOtp(e.target.value)}
      />

      <Button className="w-full" type="submit" disabled={loadingMail}>
        {loadingMail ? "Đang xác thực..." : "Xác nhận mã"}
      </Button>

      <div className="flex gap-2">
        <Button
          className="flex-1"
          type="button"
          variant="outline"
          onClick={handleBack}
        >
          Quay lại
        </Button>

        <Button
          className="flex-1"
          type="button"
          disabled={timeLeft > 0}
          onClick={handleSendOtp}
        >
          {timeLeft > 0 ? `Gửi lại mã (${timeLeft}s)` : "Gửi lại mã"}
        </Button>
      </div>
    </form>
  );
};

export default ConfirmOtpForm;
