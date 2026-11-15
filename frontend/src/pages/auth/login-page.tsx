"use client"

import LoginForm from "../../components/auth/login-form"
import CardWrapper from "@/components/auth/card-wrapper"
import { AUTH_ROUTES } from "@/routes/common/route-paths"

const LoginPage = () => {
  return (
    <CardWrapper
      headerTitle="Welcome back"
      headerLabel="Sign in with your email and password to continue."
      backButtonLabel="Don't have an account?"
      backButtonLinkLabel="Sign up"
      backButtonHref={AUTH_ROUTES.REGISTER}
    >
      <LoginForm />
    </CardWrapper>
  )
}

export default LoginPage
