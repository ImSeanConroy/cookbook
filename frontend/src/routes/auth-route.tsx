import { authClient } from "@/lib/auth/auth-client"
import { Navigate, Outlet } from "react-router-dom"
import { PROTECTED_ROUTES } from "./common/route-paths"
import { Spinner } from "@/components/ui/spinner"

const AuthRoute = () => {
  const { data: session, isPending: isLoading } = authClient.useSession()
  const isAuthenticated = session != null

  if (isLoading) {
    return <Spinner />
  }

  if (isAuthenticated) {
    return <Navigate to={PROTECTED_ROUTES.DASHBOARD} replace />
  }

  return <Outlet />
}

export default AuthRoute
