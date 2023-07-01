import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { PostService } from 'src/app/service/post.service';
import { Location } from '@angular/common'
import { NgConfirmService } from 'ng-confirm-box';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  buttonValue: any;
  loginForm: FormGroup | any;
  submitted = false;
  user: any;
  constructor(private api: PostService, private router: Router, private activeRoute: ActivatedRoute, private confirm: NgConfirmService,
    private tostService: NgToastService,private formBuilder: FormBuilder) {

  }
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      employeeName: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  get f() { return this.loginForm.controls; }
  onReset() {
    this.submitted = false;
    this.loginForm.reset();
  }
  onSubmit() {
    this.submitted = true;
    // console.log(this.loginForm.value)

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }
    else{
      // console.log(this.loginForm.value)
      this.api.getUserLogin()
        .subscribe(res => {
          for (let i = 0; i < res.length; i++) {
            this.user = res[i]
            if(this.loginForm.value.employeeName == this.user.employeeName && this.loginForm.value.password == this.user.password){
              this.tostService.success({ detail: "Success", summary: "Login Successfully", duration: 3000 })
              if(this.user.role == "Admin"){
                this.router.navigate(['leaveList', this.user.employeeName])
              }
              else{
                this.router.navigate(['leaveForm', this.user.employeeName])
              }
              break;
            }
            else{
              this.tostService.error({ detail: "Error", summary: "Employee Name and Password is not Proper", duration: 3000 })
            }
          }
          // this.role = res
          // this.router.navigate(['leaveForm', button.textContent])
        })
    }
  }
}
