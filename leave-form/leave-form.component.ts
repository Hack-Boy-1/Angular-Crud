import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { PostService } from 'src/app/service/post.service';
import { Location } from '@angular/common'

@Component({
  selector: 'app-leave-form',
  templateUrl: './leave-form.component.html',
  styleUrls: ['./leave-form.component.css']
})
export class LeaveFormComponent {
  leaveForm: FormGroup | any;
  submitted = false;
  updateUserId: any;
  isUpdateActive: boolean = false;
  data: any = [];
  employeeName: any;

  constructor(private formBuilder: FormBuilder, private api: PostService, private tostService: NgToastService, private activeRoute: ActivatedRoute,
    private router: Router,private location:Location) { }

  ngOnInit() {
    this.leaveForm = this.formBuilder.group({
      leaveType: ['', Validators.required],
      employeeName: ['', Validators.required],
      startDate: ['', [Validators.required, Validators.pattern(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/)]],
      endDate: ['', [Validators.required, Validators.pattern(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/)]],
      email: ['', [Validators.required, Validators.email]],
      mobileNumber: ['', Validators.required],
    });

    this.activeRoute.params.subscribe(val => {
      this.updateUserId = val['id']
      this.employeeName = val['name']
    })
    this.editUserLeaveById();
    this.getLeaveTypeData();
    this.leaveForm.controls['employeeName'].setValue(this.employeeName);
  }

  // convenience getter for easy access to form fields
  get f() { return this.leaveForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.leaveForm.invalid) {
      return;
    }
    else if(this.leaveForm.value.endDate < this.leaveForm.value.startDate){
      this.tostService.error({ detail: "Error", summary: "End date cannot be earlier than start date", duration: 3000 })
    }
    else {
      // console.log(this.leaveForm.value)
      this.api.postuserLeave(this.leaveForm.value)
        .subscribe(res => {
          this.tostService.success({ detail: "Success", summary: "Leave Added Successfully", duration: 3000 })
          if(this.employeeName == this.leaveForm.value.employeeName){
            // alert(this.employeeName)
            // this.leaveForm.reset()
            // this.api.
          }
          this.router.navigate(['leaveList',this.employeeName])
        })
    }
  }

  onReset() {
    this.submitted = false;
    this.leaveForm.reset();
  }

  editUserLeaveById() {
    this.api.getleaveByID(this.updateUserId).subscribe(res => {
      this.isUpdateActive = true
      this.leaveForm.controls['employeeName'].setValue(res.employeeName);
      this.leaveForm.controls['leaveType'].setValue(res.leaveType);
      this.leaveForm.controls['startDate'].setValue(res.startDate);
      this.leaveForm.controls['endDate'].setValue(res.endDate);
      this.leaveForm.controls['email'].setValue(res.email);
      this.leaveForm.controls['mobileNumber'].setValue(res.mobileNumber);
    })

  }
  onUpdate() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.leaveForm.invalid) {
      return;
    }
    else {
      // console.log(this.leaveForm.value)
      this.api.updateUserLeave(this.leaveForm.value, this.updateUserId)
        .subscribe(res => {
          this.tostService.success({ detail: "Success", summary: "Leave Update Successfully", duration: 3000 })
          this.router.navigate(['leaveList', this.employeeName])
          this.leaveForm.reset()
        })
    }
  }

  getLeaveTypeData() {
    this.api.getLeaveType()
      .subscribe(res => {
        console.log(res)
        this.data = res
        // alert(res)
      })
  }

  back(){
    this.location.back()
  }
  viewLeaveList(){
    this.router.navigate(['leaveList', this.employeeName])
  }
}
