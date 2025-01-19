import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    standalone: false
})
export class LoginComponent {
    
    constructor(
    ) {}

    loginWithDiscord(): void {
        //replace with appsettings
        const discordAuthUrl = `https://discord.com/oauth2/authorize?client_id=1330431556313026580&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A4200%2Fauth%2Fcallback&scope=identify+email`;
        window.location.href = discordAuthUrl;
    }
}
