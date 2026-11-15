import { authClient } from "@/lib/auth/auth-client"
import { Navigate, Outlet } from "react-router-dom"
import { AUTH_ROUTES } from "./common/route-paths"
import { Spinner } from "@/components/ui/spinner"
import { ModalProvider } from "@/context/modal-context"

const ProtectedRoute = () => {
  const { data: session, isPending: isLoading } = authClient.useSession()

  const isAuthenticated = session != null
  if (isLoading) {
    return <Spinner />
  }

  if (!isAuthenticated) {
    return <Navigate to={AUTH_ROUTES.LOGIN} replace />
  }

  return (
      <ModalProvider>
        <Outlet />
      </ModalProvider>
  )
}

export default ProtectedRoute
