import { Utensils } from "lucide-react";

import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

interface InfoStatePrope {
  title?: string;
  description?: string;
  Icon?: React.ComponentType<{ className?: string }>;
}

const InfoState = ({
  title = "No recipes found",
  description = "No results match your current filters. Try changing your filters or search term.",
  Icon = Utensils,
}: InfoStatePrope) => {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <Icon className="h-12 w-12 text-muted-foreground animate-pulse" />
          </EmptyMedia>
          <EmptyTitle>{title}</EmptyTitle>
          <EmptyDescription>{description}</EmptyDescription>
        </EmptyHeader>
      </Empty>
    </div>
  );
};

export default InfoState;
