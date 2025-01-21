import { DialogComponent } from "./dialog/dialog.component"
import { UpdateAccountInfoDialogComponent } from "./update-account-info-dialog/update-account-info-dialog.component"
import { TransferFundsDialog } from "./transfer-funds-dialog.component/transfer-funds-dialog.component" 

export * from "./dialog/dialog.component"
export * from "./update-account-info-dialog/update-account-info-dialog.component"
export * from "./transfer-funds-dialog.component/transfer-funds-dialog.component"

export const SHARED_COMPONENTS = [
    DialogComponent,
    UpdateAccountInfoDialogComponent,
    TransferFundsDialog 
]