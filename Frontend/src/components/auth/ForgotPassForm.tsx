import { useEffect, useState, type FormEvent } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { maskEmail } from "@/lib/utils";

const ForgotPassForm = () => {
  const [email, setEmail] = useState("");
  const [formType, setFormType] = useState("email");
  const [timeLeft, setTimeLeft] = useState(0);
  const [otp, setOtp] = useState("");

  const maskedEmail = maskEmail(email);

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleSendOtp = async (e: FormEvent) => {
    e.preventDefault();
    setFormType("otp");
    setTimeLeft(60);
  };

  const handleConfirmOtp = async (e: FormEvent) => {
    e.preventDefault();
  };

  return formType === "otp" ? (
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

      <Button className="w-full" type="submit">
        Xác nhận mã
      </Button>

      <div className="flex gap-2">
        <Button
          className="flex-1"
          type="button"
          variant="outline"
          onClick={() => setFormType("email")}
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
  ) : (
    <form className="space-y-4 rounded-md border p-4" onSubmit={handleSendOtp}>
      <div className="flex flex-col gap-2">
        <Label>Email đã dùng đăng ký tài khoản để nhận mã xác nhận</Label>
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <Button className="w-full" type="submit">
        Tiếp tục
      </Button>
    </form>
  );
};

export default ForgotPassForm;
