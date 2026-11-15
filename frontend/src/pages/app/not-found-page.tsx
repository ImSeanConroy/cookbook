import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  EmptyContent,
} from "@/components/ui/empty"
import { FileQuestion } from "lucide-react"
import { PROTECTED_ROUTES } from "@/routes/common/route-paths"

const NotFoundPage = () => {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-3 sm:p-4 md:p-6">
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <FileQuestion />
          </EmptyMedia>
          <EmptyTitle>Page not found</EmptyTitle>
          <EmptyDescription>
            The page you're looking for doesn't exist or has been moved.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button asChild>
            <Link to={PROTECTED_ROUTES.DASHBOARD}>Back to Dashboard</Link>
          </Button>
        </EmptyContent>
      </Empty>
    </div>
  )
}

export default NotFoundPage
