import { ActionComponent } from "./actions/actions.component";
import { AuthCallbackComponent } from "./auth-callback/auth-callback.component";
import { DialogComponent } from "./dialog/dialog.component";
import { LoginComponent } from "./login/login.component";
import { MainComponent } from "./main/main.component";
import { SlotMachineComponent } from "./slot-machine/slot-machine.component";
import { TitleBarComponent } from "./title-bar/title-bar.component";

export * from "./title-bar/title-bar.component"
export * from "./main/main.component";
export * from "./actions/actions.component";
export * from "./slot-machine/slot-machine.component";
export * from "./dialog/dialog.component";
export * from "./auth-callback/auth-callback.component";
export * from "./login/login.component";

export const COMPONENTS = [
    TitleBarComponent,
    MainComponent,
    ActionComponent,
    SlotMachineComponent,
    DialogComponent,
    AuthCallbackComponent,
    LoginComponent
]