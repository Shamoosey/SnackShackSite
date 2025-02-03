import { DialogComponent } from "./dialog/dialog.component"
import { TransferFundsDialog } from "./transfer-funds-dialog.component/transfer-funds-dialog.component" 

export * from "./dialog/dialog.component"
export * from "./transfer-funds-dialog.component/transfer-funds-dialog.component"

export const SHARED_COMPONENTS = [
    DialogComponent,
    TransferFundsDialog 
]