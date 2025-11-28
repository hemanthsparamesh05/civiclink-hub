import { Badge } from "@/components/ui/badge";

interface ComplaintCardProps {
  category: string;
  description: string;
  timeAgo: string;
  categoryColor?: string;
}

const ComplaintCard = ({ category, description, timeAgo, categoryColor = "bg-primary" }: ComplaintCardProps) => {
  return (
    <div className="flex items-start justify-between py-3 border-b border-border last:border-0">
      <div className="flex items-start gap-3 flex-1">
        <Badge className={`${categoryColor} text-white font-medium px-3 py-1 shrink-0`}>
          {category}
        </Badge>
        <p className="text-foreground text-sm flex-1">{description}</p>
      </div>
      <span className="text-muted-foreground text-sm ml-4 shrink-0">{timeAgo}</span>
    </div>
  );
};

export default ComplaintCard;
