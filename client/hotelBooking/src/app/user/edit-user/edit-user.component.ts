import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
  

  editForm: FormGroup = this.formBuilder.group ({
    username: new FormControl(null),
    email: new FormControl(null),
    image: new FormControl(null)
  })

  constructor(private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
  }
 


  onImageUpload(event: Event){

  }


  onCancel(){
   this.router.navigate(['/auth/profile'])
  }
}
