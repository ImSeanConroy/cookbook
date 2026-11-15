"use client"

import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import z from "zod"
import {
  Field,
  FieldContent,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import { authClient } from "@/lib/auth/auth-client"
import { toFrontendUrl } from "@/lib/auth/auth-urls"
// import { toast } from "sonner"
import { PROTECTED_ROUTES } from "@/routes/common/route-paths"

const loginFormSchema = z.object({
  email: z
    .string()
    .min(8, { message: "An email address is required" })
    .email({ message: "Please enter a valid email address" }),
  password: z.string().min(1, { message: "A password is required" }),
})

type ValidationSchemaType = z.infer<typeof loginFormSchema>

const LoginForm = () => {
  const form = useForm<ValidationSchemaType>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const { isSubmitting } = form.formState

  async function onSubmit(data: ValidationSchemaType) {
    await authClient.signIn.email(
      { ...data, callbackURL: toFrontendUrl(PROTECTED_ROUTES.DASHBOARD) },
      {
        onError: (error) => {
          // toast.error(error.error.message || "Failed to login")
        },
      }
    )
  }

  return (
    <form
      id="form-login"
      className="space-y-5"
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <FieldGroup className="gap-5">
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}  className="gap-2">
              <FieldLabel htmlFor="form-login-email">Email</FieldLabel>
              <FieldContent className="gap-2">
                <Input
                  {...field}
                  type="email"
                  id="form-login-email"
                  aria-invalid={fieldState.invalid}
                  autoComplete="email"
                  disabled={isSubmitting}
                  placeholder="Enter your email address"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </FieldContent>
            </Field>
          )}
        />
        <Controller
          name="password"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}  className="gap-2">
              {/* <div className="flex items-center justify-between gap-2">
                <FieldLabel htmlFor="form-login-password">Password</FieldLabel>
                <Link
                  to={AUTH_ROUTES.FORGOT_PASSWORD}
                  className="text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
                >
                  Forgot your password?
                </Link>
              </div> */}
              <FieldContent className="gap-2">
                <Input
                  {...field}
                  type="password"
                  id="form-login-password"
                  aria-invalid={fieldState.invalid}
                  autoComplete="current-password"
                  disabled={isSubmitting}
                  placeholder="Enter your email password"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </FieldContent>
            </Field>
          )}
        />
      </FieldGroup>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full"
      >
        {isSubmitting && <Spinner />} Log in
      </Button>
    </form>
  )
}

export default LoginForm
