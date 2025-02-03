import { MainActionsComponent } from "./main-actions/main-actions.component";
import { HomeComponent } from "./home/home.component";
import { SlotMachineComponent } from "./slot-machine/slot-machine.component";
import { TitleBarComponent } from "./title-bar/title-bar.component";
import { LoginComponent } from "./login/login.component";

export * from "./title-bar/title-bar.component"
export * from "./home/home.component";
export * from "./main-actions/main-actions.component";
export * from "./slot-machine/slot-machine.component";
export * from "./login/login.component";

export const CORE_COMPONENTS = [
    TitleBarComponent,
    HomeComponent,
    MainActionsComponent,
    SlotMachineComponent,
    LoginComponent
]