import { createAction, props } from "@ngrx/store";
import { UpdateAccountInfoRequest, UpdateAccountRequest, User } from "../models";
import { Account } from "../models/Account";
import { BalanceChangeEvent } from "../models/BalanceChangeEvent";
import { TransferAccountRequest } from "../models/TransferAccountRequest";
import { ExchangeRate } from "../models/ExchangeRate";

//#region User Actions
export const LoginUser = createAction(
  '[Shack] Login User'
)

export const LoginUserRedirect = createAction(
  '[Shack] Login User Redirect'
)

export const LogoutUser = createAction(
  '[Shack] Logout User'
)

export const GetCurrentUser = createAction(
  '[Shack] Get Current User'
)

export const GetCurrentUserSuccess = createAction(
  '[Shack] Get Current User Success',
  props<{user: User}>()
)

export const GetCurrentUserFailure = createAction(
  '[Shack] Get Current User Failure',
  props<{error: string}>()
)
//#endregion
//#region Currency and Exchange Actions

export const GetExchangeRates = createAction(
  '[Shack] Get Exchange Rates'
)

export const GetExchangeRatesSuccess = createAction(
  '[Shack] Get Exchange Rates Success',
  props<{ result: ExchangeRate[] }>()
)

export const GetExchangeRatesFailure = createAction(
  '[Shack] Get Exchange Rates Failure',
  props<{ error: string }>()
)

//#region Account Actions

export const GetUserAccounts = createAction(
  '[Shack] Get User Accounts'
)

export const GetUserAccountsSuccess = createAction(
  '[Shack] Get User Accounts Success',
  props<{accounts: Account[]}>()
)

export const GetUserAccountsFailure = createAction(
  '[Shack] Get User Accounts Failure',
  props<{error: string}>()
)

export const SelectedAccountChange = createAction(
  '[Shack] - Selected Account Change',
  props<{ accountId:string }>()
)

export const UpdateAmountBalance = createAction(
  '[Shack] - Update Amount Balance',
  props<{ data: BalanceChangeEvent }>()
)

export const UpdateAmountBalanceSuccess = createAction(
  '[Shack] - Update Amount Balance Success',
)

export const UpdateAmountBalanceFailure = createAction(
  '[Shack] - Update Amount Balance Failure',
  props<{ error: string }>()
)

export const UpdateAccountInfoOpenDialog = createAction(
  '[Shack] - Update Account Info Open Dialog',
  props<{ accountId: string }>()
)

export const UpdateAccountInfoOpenDialogSuccess = createAction(
  '[Shack] - Update Account Info Open Dialog Success',
  props<{ accountId: string, data: UpdateAccountInfoRequest }>()
)

export const UpdateAccountInfoOpenDialogFailure = createAction(
  '[Shack] - Update Account Info Open Dialog Failure',
  props<{ error: string }>()
)

export const TransferAccountFunds = createAction(
  '[Shack] Transfer Account Funds',
  props<{ request: TransferAccountRequest }>()
)

export const TransferAccountFundsSuccess = createAction(
  '[Shack] Transfer Account Funds Success'
)

export const TransferAccountFundsFailure = createAction(
  '[Shack] Transfer Account Funds Failure',
  props<{ error: string }>()
)
export const OpenTransferFundsDialog = createAction(
  '[Shack] Open Transfer Funds Dialog',
)

export const OpenTransferFundsDialogSuccess = createAction(
  '[Shack] Open Transfer Funds Dialog Success',
  props<{ request: TransferAccountRequest }>()
)

export const OpenTransferFundsDialogFailure = createAction(
  '[Shack] Open Transfer Funds Dialog Failure',
  props<{ error?: string }>()
)

export const UpdateAccountInfoRequestSuccess = createAction(
  '[Shack] - Update Account Info Request Success'
)

export const UpdateAccountInfoRequestFailure = createAction(
  '[Shack] - Update Account Info Request Failure',
  props<{ error: string }>()
)
//#endregion
//#region Auth Actions
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

export const SetRefreshingToken = createAction(
  '[Shack] Set Refreshing Token',
  props<{ value: boolean}>()
)

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
//#endregion

export const NoOperation = createAction(
  '[Shack] No Operation'
)