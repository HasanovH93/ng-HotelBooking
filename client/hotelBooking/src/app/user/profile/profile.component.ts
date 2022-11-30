import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IUser } from 'src/app/modals/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit, OnDestroy {
  currentUser!: IUser;
  defaultImg: string = '../../../assets/icons/user-profile.png';
  private userDataSubscription: Subscription;
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userDataSubscription = this.userService
      .getUser()
      .subscribe((userData) => {
        this.currentUser = userData;
        console.log(this.currentUser)
      });
  }

  ngOnDestroy(): void {
    this.userDataSubscription.unsubscribe()
  }
}
