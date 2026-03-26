import { Utensils } from "lucide-react";

import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { cn } from "@/lib/utils";

interface InfoStatePrope {
  title?: string;
  description?: string;
  Icon?: React.ComponentType<{ className?: string }>;
  spinner?: boolean;
}

const InfoState = ({
  title = "No recipes found",
  description = "No results match your current filters. Try changing your filters or search term.",
  Icon = Utensils,
  spinner = false,
}: InfoStatePrope) => {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <Icon className={cn("h-12 w-12 text-muted-foreground", spinner && "animate-spin")} />
          </EmptyMedia>
          <EmptyTitle>{title}</EmptyTitle>
          <EmptyDescription>{description}</EmptyDescription>
        </EmptyHeader>
      </Empty>
    </div>
  );
};

export default InfoState;
