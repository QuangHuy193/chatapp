import type { RankType } from "@/types/rank";
import { useState, type Dispatch, type SetStateAction } from "react";
import { Card, CardContent, CardDescription } from "../ui/card";
import { Checkbox } from "../ui/checkbox";
import {
  ArrowRight,
  ChevronDownCircle,
  ChevronRightCircle,
  
} from "lucide-react";
import RankLabel from "./RankLabel";

interface RankTypeCardProps {
  rankType: RankType;
  selectedRankTypeId: string;
  onSelect: Dispatch<SetStateAction<string>>;
}

const RankTypeCard = ({
  rankType,
  selectedRankTypeId,
  onSelect,
}: RankTypeCardProps) => {
  const [isOpenDetail, setIsOpenDetail] = useState(false);
  return (
    <Card className="py-4">
      <CardContent>
        <div className="flex gap-4 items-center">
          <Checkbox
            onClick={() => onSelect(rankType._id)}
            className="border-red-300"
            checked={selectedRankTypeId.toString() === rankType._id.toString()}
          />
          <div className="flex-1">
            <div className="flex justify-between">
              {rankType.name}

              {isOpenDetail ? (
                <ChevronDownCircle
                  className="size-5 text-sm text-muted-foreground"
                  onClick={() => setIsOpenDetail(false)}
                />
              ) : (
                <ChevronRightCircle
                  className="size-5 text-sm text-muted-foreground"
                  onClick={() => setIsOpenDetail(true)}
                />
              )}
            </div>
            <CardDescription>{rankType.description}</CardDescription>
          </div>
        </div>
        {isOpenDetail && (
          <div className="border-t mt-2 pt-2 flex gap-5 flex-wrap">
            {rankType.levels.map((lv, i) => {
              return (
                <span key={lv._id} className="flex gap-5 items-center">
                  <RankLabel label={lv.label} rankCss={lv.uiCss}/>
                  {i !== rankType.levels.length - 1 && (
                    <ArrowRight className="size-4 text-muted-foreground" />
                  )}
                </span>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RankTypeCard;
