import { Component, OnInit, OnDestroy } from '@angular/core';
import { first, Subscription } from 'rxjs';
import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  userSubscription: Subscription;

  constructor(
    private dataStorageService: DataStorageService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.userSubscription = this.authService.user.subscribe((user) => {
      console.log(user);
      console.log(user?.token);
      this.isAuthenticated = !!user && user.token ? true : false;
      console.log(this.isAuthenticated);
    });
  }

  onSaveData() {
    this.dataStorageService.storeRecipes();
  }

  onFetchRecipes() {
    this.dataStorageService.fetchRecipes().pipe(first()).subscribe();
  }

  onSignOut() {
    this.isAuthenticated = false;
    this.authService.signOut();
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }
}

// Add a canactivate guard to the recipes and shopping-list route. Only allow if the user is authenticated; user is logged in token is not expired
