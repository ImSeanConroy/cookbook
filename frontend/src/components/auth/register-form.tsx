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

const registerFormSchema = z.object({
  name: z.string().min(3, { message: "A name is required" }),
  email: z
    .string()
    .min(8, { message: "An email address is required" })
    .email({ message: "Please enter a valid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .regex(/[0-9]/, { message: "Password must contain at least one number" })
    .regex(/[!@#$%^&*(),.?":{}|<>]/, {
      message: "Password must contain at least one special character",
    }),
})
type ValidationSchemaType = z.infer<typeof registerFormSchema>

const RegisterForm = () => {
  const form = useForm<ValidationSchemaType>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  })

  async function handleRegister(data: ValidationSchemaType) {
    const res = await authClient.signUp.email(
      { ...data, onboarded: false, callbackURL: toFrontendUrl(PROTECTED_ROUTES.DASHBOARD) },
      {
        onError: (error) => {
          // toast.error(error.error.message || "Failed to sign up")
        },
      }
    )
  }

  return (
    <form className="space-y-5" onSubmit={form.handleSubmit(handleRegister)}>
      <FieldGroup className="gap-5">
        <Controller
          name="name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="gap-2">
              <FieldLabel htmlFor="form-register-name">Name</FieldLabel>
              <FieldContent className="gap-2">
                <Input
                  {...field}
                  id="form-register-name"
                  aria-invalid={fieldState.invalid}
                  autoComplete="name"
                  placeholder="Enter your full name"
                  disabled={form.formState.isSubmitting}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </FieldContent>
            </Field>
          )}
        />

        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="gap-2">
              <FieldLabel htmlFor="form-register-email">Email</FieldLabel>
              <FieldContent className="gap-2">
                <Input
                  {...field}
                  id="form-register-email"
                  type="email"
                  aria-invalid={fieldState.invalid}
                  autoComplete="email"
                  placeholder="Enter your email address"
                  disabled={form.formState.isSubmitting}
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
            <Field data-invalid={fieldState.invalid} className="gap-2">
              <FieldLabel htmlFor="form-register-password">Password</FieldLabel>
              <FieldContent className="gap-2">
                <Input
                  {...field}
                  id="form-register-password"
                  type="password"
                  aria-invalid={fieldState.invalid}
                  autoComplete="new-password"
                  placeholder="Create a secure password"
                  disabled={form.formState.isSubmitting}
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
        disabled={form.formState.isSubmitting}
        className="w-full"
      >
        {form.formState.isSubmitting && <Spinner />} Create account
      </Button>
    </form>
  )
}

export default RegisterForm
