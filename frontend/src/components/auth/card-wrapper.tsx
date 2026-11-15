import { Link } from "react-router-dom"
import type { ReactNode } from "react"
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"

interface CardWrapperProps {
  children: ReactNode | ReactNode[]
  headerTitle: string
  headerLabel: string
  backButtonLabel?: string
  backButtonHref?: string
  backButtonLinkLabel?: string
}

const CardWrapper = ({
  children,
  headerTitle,
  headerLabel,
  backButtonLabel,
  backButtonHref,
  backButtonLinkLabel,
}: CardWrapperProps) => {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader className="pb-1">
        <CardTitle className="text-lg">{headerTitle}</CardTitle>
        <CardDescription>{headerLabel}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">{children}</CardContent>

      {backButtonLabel && backButtonHref && backButtonLinkLabel && (
        <CardFooter className="justify-center pt-0">
          <p className="text-center text-sm text-muted-foreground">
            {backButtonLabel}{" "}
            <Link
              to={backButtonHref}
              className="text-primary underline-offset-4 hover:underline"
            >
              {backButtonLinkLabel}
            </Link>
          </p>
        </CardFooter>
      )}
    </Card>
  )
}

export default CardWrapper
