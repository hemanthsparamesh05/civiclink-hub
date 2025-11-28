import { Progress } from "@/components/ui/progress";

interface ProjectCardProps {
  title: string;
  category: string;
  progress: number;
  progressLabel?: string;
}

const ProjectCard = ({ title, category, progress, progressLabel }: ProjectCardProps) => {
  return (
    <div className="py-4 border-b border-border last:border-0">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="font-semibold text-foreground text-lg mb-1">{title}</h3>
          <p className="text-muted-foreground text-sm">{category}</p>
        </div>
        <div className="flex items-center gap-3">
          {progressLabel && (
            <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
              {progressLabel}
            </span>
          )}
          <span className="font-semibold text-foreground text-lg">{progress}%</span>
        </div>
      </div>
      <Progress value={progress} className="h-2" />
    </div>
  );
};

export default ProjectCard;
