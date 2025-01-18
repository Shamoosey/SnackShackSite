import { ActionComponent } from "./actions/actions.component";
import { MainComponent } from "./main/main.component";
import { ShopComponent } from "./shop/shop.component";
import { TitleBarComponent } from "./title-bar/title-bar.component";

export * from "./shop/shop.component"
export * from "./title-bar/title-bar.component"
export * from "./main/main.component";
export * from "./actions/actions.component";

export const COMPONENTS = [
    ShopComponent,
    TitleBarComponent,
    MainComponent,
    ActionComponent
]