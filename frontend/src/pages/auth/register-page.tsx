"use client"

import RegisterForm from "../../components/auth/register-form"
import CardWrapper from "@/components/auth/card-wrapper"
import { AUTH_ROUTES } from "@/routes/common/route-paths"

const RegisterPage = () => {
  return (
    <CardWrapper
      headerTitle="Create your account"
      headerLabel="Set up your account with a few quick details."
      backButtonLabel="Already have an account?"
      backButtonLinkLabel="Log in"
      backButtonHref={AUTH_ROUTES.LOGIN}
      // imgUrl="/example.png"
    >
      <RegisterForm />
    </CardWrapper>
  )
}

export default RegisterPage
