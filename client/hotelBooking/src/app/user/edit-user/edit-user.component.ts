import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IUser } from 'src/app/modals/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss'],
})
export class EditUserComponent implements OnInit, OnDestroy {
  defaultImg: string = '../../../assets/icons/user-profile.png';
  currentUser: IUser;
  imagePreview!: string;
  private userDataSubscription: Subscription;

  editForm: FormGroup = this.formBuilder.group({
    username: new FormControl(''),
    email: new FormControl(''),
    image: new FormControl('null'),
  });

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.userDataSubscription = this.userService
      .getUser()
      .subscribe((userData) => {
        this.currentUser = userData;
        this.editForm.patchValue({
          username: this.currentUser.userData.username,
        });
        this.editForm.patchValue({ email: this.currentUser.userData.email });
      });
  }

  onImageUpload(event: Event) {
    let file: any = (event.target as HTMLInputElement).files;
    if (file[0]) {
      this.editForm.patchValue({ image: file[0] });

      this.editForm.get('image')?.updateValueAndValidity();
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };
      const blob = file[0];
      reader.readAsDataURL(blob);
    }
  }

  onSubmit() {
    const formData = new FormData();
    formData.set('email', this.editForm.value.email),
      formData.set('username', this.editForm.value.username);

    if (this.editForm.value.image != 'null') {
      formData.append('img', this.editForm.value.image);
    } else if (
      this.currentUser.userData.imageUrl &&
      this.editForm.value.image == 'null'
    ) {
      formData.append('img', this.currentUser.userData.imageUrl);
    }

    this.userService.editUser(formData).subscribe({
      complete: () => {
        this.router.navigate(['/auth/profile']);
      },
    });
  }

  onCancel() {
    this.router.navigate(['/auth/profile']);
  }

  ngOnDestroy(): void {
    this.userDataSubscription.unsubscribe();
  }
}
