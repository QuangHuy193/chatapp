import { ArrowBigRight } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

interface GroupChatMenuProps{
  buttonTrigger:React.ReactNode
}

const GroupChatMenu = ({buttonTrigger}:GroupChatMenuProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
       {buttonTrigger}
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuItem
            className="text-red-500 focus:bg-red-200 focus:text-red-500
           dark:focus:bg-red-500 dark:focus:text-white"
          >
            <ArrowBigRight className="text-red-500 " />
            Rời nhóm
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default GroupChatMenu;
