import { useState, type FormEvent } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import EyeButton from "../form/EyeButton";
import { Button } from "../ui/button";
import { checkPassword } from "@/lib/utils";

interface CreateNewPassProps {
  email: string;
}

const CreateNewPass = ({ email }: CreateNewPassProps) => {
  const [showPass, setShowPass] = useState({
    pass: false,
    confirmPass: false,
  });
  const [formData, setFormData] = useState({
    pass: "",
    confirmPass: "",
  });
  const [err, setError] = useState({
    pass: "",
    confirmPass: "",
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const passError = checkPassword(formData.pass);

    if (formData.pass.length < 8) {
      setError((prev) => ({
        ...prev,
        pass: "Mật khẩu phải từ 8 kí tự trở lên!",
      }));
      return;
    }

    if (passError === 4) {
      setError((prev) => ({
        ...prev,
        pass: "Mật khẩu phải bao gồm chữ hoa, chữ thường và số!",
      }));
      return;
    } else if (passError === 1) {
      setError((prev) => ({
        ...prev,
        pass: "Mật khẩu phải bao gồm chữ hoa!",
      }));
      return;
    } else if (passError === 2) {
      setError((prev) => ({
        ...prev,
        pass: "Mật khẩu phải bao gồm chữ thường!",
      }));
      return;
    } else if (passError === 3) {
      setError((prev) => ({
        ...prev,
        pass: "Mật khẩu phải bao gồm số!",
      }));
      return;
    } else {
      setError((prev) => ({
        ...prev,
        pass: "",
      }));
    }

    if (formData.pass !== formData.confirmPass) {
      setError((prev) => ({
        ...prev,
        confirmPass: "Mật khẩu nhập lại không khớp!",
      }));
      return;
    } else {
      setError((prev) => ({
        ...prev,
        confirmPass: "",
      }));
    }

    console.log("TODO");
  };

  return (
    <form className="border p-4 rounded-md space-y-4" onSubmit={handleSubmit}>
      <h1 className="text-center font-bold text-2xl">Tạo mật khẩu mới</h1>
      <div className="space-y-2">
        <Label>Mật khẩu mới</Label>
        <div className="relative">
          <Input
            type={showPass.pass ? "text" : "password"}
            value={formData.pass}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, pass: e.target.value }))
            }
          />
          {formData.pass !== "" && (
            <EyeButton
              show={showPass.pass}
              setShow={(flag) =>
                setShowPass((prev) => ({ ...prev, pass: flag }))
              }
            />
          )}
        </div>
        {err.pass !== "" && <p className="error-message">{err.pass}</p>}
      </div>

      <div className="space-y-2">
        <Label>Nhập lại mật khẩu mới</Label>
        <div className="relative">
          <Input
            type={showPass.confirmPass ? "text" : "password"}
            value={formData.confirmPass}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, confirmPass: e.target.value }))
            }
          />
          {formData.confirmPass !== "" && (
            <EyeButton
              show={showPass.confirmPass}
              setShow={(flag) =>
                setShowPass((prev) => ({ ...prev, confirmPass: flag }))
              }
            />
          )}
        </div>
        {err.confirmPass !== "" && (
          <p className="error-message">{err.confirmPass}</p>
        )}
      </div>

      <Button type="submit" className="w-full">
        Thay đổi mật khẩu
      </Button>
    </form>
  );
};

export default CreateNewPass;
