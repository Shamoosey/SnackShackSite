import { createAction, props } from "@ngrx/store";

export const LoginUser = createAction(
  '[Shack] Login User'
)

export const LoginUserRedirect = createAction(
  '[Shack] Login User Redirect'
)

export const LogoutUser = createAction(
  '[Shack] Logout User'
)

export const AutenticateUser = createAction(
  '[Shack] Authenticate User',
  props<{ code: string }>()
);

export const AutenticateUserSuccess = createAction(
  '[Shack] Authenticate User Success',
  props<{ token: string}>()
);

export const AutenticateUserFailure = createAction(
  '[Shack] Authenticate User Failure',
  props<{ error: string}>()
);

export const RefreshToken = createAction(
  '[Shack] Refresh Token'
);

export const RefreshTokenSuccess = createAction(
  '[Shack] Refresh Token Success',
  props<{ token: string }>()
);

export const RefreshTokenFailure = createAction(
  '[Shack] Refresh Token Failure',
  props<{ error: any }>()
);

export const NoOperation = createAction(
  '[Shack] No Operation'
)