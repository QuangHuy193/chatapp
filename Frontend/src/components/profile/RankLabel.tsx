import { Crown } from "lucide-react";

interface RankLabelProps {
  label: string;
  rankCss: string;
}

const RankLabel = ({ label, rankCss }: RankLabelProps) => {
  return (
    <div className={`rank-wrap ${rankCss}`}>
      {/* cánh trái */}
      <div className="rank-wing rank-wing-left" />

      {/* label chính */}
      <div className="rank-core">
        {label}
        {rankCss === "rank-10" && (
          <span className="rank-crown">
            <Crown className="size-4" />
          </span>
        )}
      </div>

      {/* cánh phải */}
      <div className="rank-wing rank-wing-right" />

      {/* gạch chân */}
      <div className="rank-underline" />
    </div>
  );
};

export default RankLabel;
