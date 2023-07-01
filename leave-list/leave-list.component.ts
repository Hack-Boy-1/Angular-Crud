import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { NgConfirmService } from 'ng-confirm-box';
import { PostService } from 'src/app/service/post.service';
import { Location } from '@angular/common'

@Component({
  selector: 'app-leave-list',
  templateUrl: './leave-list.component.html',
  styleUrls: ['./leave-list.component.css']
})
export class LeaveListComponent implements OnInit {

  data: any = [];
  viewData: any = [];
  userName: any;
  updateUserId: any;
  empName: any;
  constructor(private api: PostService, private router: Router, private activeRoute: ActivatedRoute, private confirm: NgConfirmService,
    private tostService: NgToastService , private location:Location) {

  }
  ngOnInit(): void {
    this.getLeave()
    this.activeRoute.params.subscribe(val =>{
      this.empName = val['name']
    })

  }
  getLeave() {
    this.api.getUserLeaveList()
      .subscribe(res => {
        if(res.length == 0){
          this.data = ("No Record")
        }
        // console.log(res)
        this.data = res
      })
  }

  editLeave(id: number) {
    this.router.navigate(['leaveEdit',this.empName, id])
  }

  leaveDetail(id: number) {
    this.router.navigate(['leaveDetail', id])
  }

  leaveDelete(id: number) {
    this.confirm.showConfirm("Are u sure?", () => {
      this.api.deleteUserLeave(id)
        .subscribe(res => {
          this.tostService.success({ detail: "Success", summary: "Delete Successfully", duration: 3000 });
          this.getLeave()
        })
    },
      () => {

      }
    )
  }

  back(){
    this.location.back()
  }
}
