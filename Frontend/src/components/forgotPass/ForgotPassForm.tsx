import { useEffect, useState, type FormEvent } from "react";
import { maskEmail } from "@/lib/utils";
import { toast } from "sonner";
import { useAuthStore } from "@/stores/useAuthStore";
import SendOtpForm from "./SendOtpForm";
import ConfirmOtpForm from "./ConfirmOtpForm";
import CreateNewPass from "./CreateNewPass";

const ForgotPassForm = () => {
  const [email, setEmail] = useState("");
  const [formType, setFormType] = useState("email");
  const [timeLeft, setTimeLeft] = useState(0);
  const [otp, setOtp] = useState("");

  const { loadingMail, sendEmailOtp, confirmOtpForgotPass } = useAuthStore();

  const maskedEmail = maskEmail(email);

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleBack = () => {
    setFormType("email");
    setOtp("");
  };

  const handleSendOtp = async (e: FormEvent) => {
    e.preventDefault();

    if (email === "") {
      toast.error("Vui lòng nhập email!");
      return;
    }

    const isSender = await sendEmailOtp(email);

    if (isSender) {
      setFormType("otp");
      setTimeLeft(60);
    }
  };

  const handleConfirmOtp = async (e: FormEvent) => {
    e.preventDefault();

    if (otp === "") {
      toast.error("Vui lòng nhập otp!");
      return;
    }

    const isConfirm = await confirmOtpForgotPass(email, otp);

    if (isConfirm) {
      setFormType("password");
    }
  };

  if (formType === "otp") {
    return (
      <ConfirmOtpForm
        maskedEmail={maskedEmail}
        handleBack={handleBack}
        handleConfirmOtp={handleConfirmOtp}
        handleSendOtp={handleSendOtp}
        loadingMail={loadingMail}
        otp={otp}
        setOtp={setOtp}
        timeLeft={timeLeft}
      />
    );
  } else if (formType === "email") {
   return <SendOtpForm
      email={email}
      handleSendOtp={handleSendOtp}
      loadingMail={loadingMail}
      setEmail={setEmail}
    />;
  } else {
    return <CreateNewPass email={email}/>;
  }
};

export default ForgotPassForm;
