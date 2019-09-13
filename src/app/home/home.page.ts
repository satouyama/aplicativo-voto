import { Component } from '@angular/core';
import { AuthenticationService } from '../providers/auth/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
    private auth : AuthenticationService,
    private router : Router
  ) {}

  async logout(){
     await this.auth.logout();
    this.router.navigate(["/login"]);
  }
}
