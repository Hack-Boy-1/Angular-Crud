import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { PostService } from 'src/app/service/post.service';
import { Location } from '@angular/common'

@Component({
  selector: 'app-leave-detail',
  templateUrl: './leave-detail.component.html',
  styleUrls: ['./leave-detail.component.css']
})
export class LeaveDetailComponent {

  viewData: any = [];
  userName: any;
  updateUserId: any;
  constructor(private api: PostService, private router:Router,private activeRoute: ActivatedRoute,private location:Location) {

  }
  ngOnInit(): void {
    this.activeRoute.params.subscribe(val => {
      this.updateUserId = val['id']
      this.api.getleaveByID(this.updateUserId).subscribe(res => {
        this.viewData = res
      })
    })
  }
  back(){
    this.location.back()
  }
  
}
