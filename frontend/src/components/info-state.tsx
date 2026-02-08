import { ArrowUpRightIcon, Utensils } from "lucide-react";

import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Button } from "./ui/button";

interface InfoStatePrope {
  title?: string;
  description?: string;
  showButton?: boolean;
  Icon?: React.ComponentType<{ className?: string }>;
}

const InfoState = ({
  title = "No recipes found",
  description = "No results match your current filters. Try changing your filters or search term.",
  showButton = true,
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

        {showButton && (
          <Button
            variant="link"
            asChild
            size="sm"
            className="text-muted-foreground"
          >
            <a href="#">
              Learn more
              <ArrowUpRightIcon className="ml-1 h-4 w-4" />
            </a>
          </Button>
        )}
      </Empty>
    </div>
  );
};

export default InfoState;
