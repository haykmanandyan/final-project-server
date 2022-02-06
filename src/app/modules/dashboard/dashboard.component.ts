import {NavItem} from "../../common/interfaces";
import {Component, OnInit} from '@angular/core';
import {NAVBAR_ITEMS} from "../../common/constants";
import {AuthService, LoaderService} from "../../common/services";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public navbarItems: NavItem[] = []

  constructor(
    private authService: AuthService,
    public loaderService: LoaderService,
  ) {
  }

  public ngOnInit(): void {
    this.navbarItems = NAVBAR_ITEMS;
  }

  public onLogOut(): void {
    this.authService.logOut();
  }

}
