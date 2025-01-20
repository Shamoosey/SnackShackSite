import { AccountService } from "./accounts.service"
import { AuthService } from "./auth.service"
import { UserService } from "./user.service"

export * from "./user.service"
export * from "./auth.service"
export * from "./accounts.service"

export const CORE_SERVICES = [
  UserService,
  AuthService,
  AccountService
]