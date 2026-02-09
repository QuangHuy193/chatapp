import ForgotPassForm from "@/components/auth/ForgotPassForm";

export default function ForgotPassPage() {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 
    md:p-10 bg-gradient-purple">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <div className="flex items-center gap-2 self-center font-bold text-4xl">
          MyChat
        </div>
        <ForgotPassForm />
      </div>
    </div>
  );
}
