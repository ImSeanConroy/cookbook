export const AUTH_ROUTES = {
  LOGIN: "/login",
  REGISTER: "/register",
} as const;

export const PROTECTED_ROUTES = {
  DASHBOARD: "/",
} as const;

export const getContactDetailPath = (contactId: string) => `/contacts/${contactId}`
