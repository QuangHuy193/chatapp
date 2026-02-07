import { Eye, EyeOff } from "lucide-react";

interface EyeButtonProps {
  show: boolean;
  setShow: (flag: boolean) => void;
}

const EyeButton = ({ show, setShow }: EyeButtonProps) => {
  if (show) {
    return (
      <EyeOff
        className="size-5 absolute top-1/2 -translate-y-1/2 right-1.5"
        onClick={() => setShow(false)}
      />
    );
  } else {
    return (
      <Eye
        className="size-5 absolute top-1/2 -translate-y-1/2 right-1.5"
        onClick={() => setShow(true)}
      />
    );
  }
};

export default EyeButton;
