"use client"

// import { toast } from "sonner"
import { useEffect } from "react"
import {
  ChevronsUpDown,
  Lock,
  LogOut,
  User,
} from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { authClient } from "@/lib/auth/auth-client"
import { useModal } from "@/context/modal-context"

const NavUser = () => {
  const { data: session } = authClient.useSession()
  const { onOpen } = useModal()

  const userId = session?.user?.id

  useEffect(() => {
    if (!userId) return
  }, [userId])

  const user = session?.user

  const initials = user?.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "?"

  const handleSignOut = async () => {
    await authClient.signOut()
    // const res = await authClient.signOut()
    // if (res.error) {
    //   toast.error(res.error.message || "Failed to sign out")
    // } else {
    //   toast.success("Signed out successfully")
    //   navigate(AUTH_ROUTES.LOGIN)
    // }
  }
  
    return (
      <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex gap-3 items-center">
                <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-sidebar-accent text-sidebar-accent-foreground">
                      {initials}
                    </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{user?.name}</span>
                  <span className="truncate text-xs text-sidebar-foreground/70">
                    {user?.email}
                  </span>
                </div>
                <ChevronsUpDown className="ml-auto size-4 text-sidebar-foreground/70" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-(--radix-dropdown-menu-trigger-width) min-w-64 rounded-lg"
              side="bottom"
              align="end"
              sideOffset={4}
            >
              <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                  <Avatar className="h-8 w-8 rounded-lg">
                      <AvatarFallback className="bg-accent text-sidebar-accent-foreground">
                        {initials}
                      </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium text-sidebar-accent-foreground">{user?.name}</span>
                    <span className="truncate text-xs text-sidebar-foreground/70">
                      {user?.email}
                    </span>
                  </div>
                </div>
              </DropdownMenuLabel>

              <DropdownMenuSeparator className="bg-muted-foreground/40" />

              <DropdownMenuGroup>
                <DropdownMenuItem
                  // onClick={() => onOpen("settings", { settingPage: "account" })}
                  aria-label="My Profile"
                >
                  <User className="size-4" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem
                  // onClick={() => onOpen("settings", { settingPage: "security" })}
                  aria-label="Security Settings"
                >
                  <Lock className="size-4" />
                  Security
                </DropdownMenuItem>
                {/* <DropdownMenuItem
                  onClick={() => onOpen("settings", { settingPage: "appearance" })}
                  aria-label="Appearance Settings"
                >
                  <Palette className="size-4" />
                  Appearance
                </DropdownMenuItem> */}
              </DropdownMenuGroup>

              <DropdownMenuSeparator className="bg-muted-foreground/40" />

              <DropdownMenuItem
                onClick={handleSignOut}
                className="text-destructive focus:text-destructive"
                aria-label="Log out"
              >
                <LogOut className="size-4" />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          </>
    )
}

export default NavUser;
