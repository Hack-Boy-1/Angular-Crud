import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../model/user.model';


@Injectable({
  providedIn: 'root'
})
export class PostService {

  private baseUrl: string = 'http://localhost:3000/'
  constructor(private http: HttpClient) { }

  postuserLeave(data: User) {
    return this.http.post<User>(`${this.baseUrl + 'leaveList'}`, data)
  }

  getUserLeaveList() {
    return this.http.get<User[]>(`${this.baseUrl + 'leaveList'}`)
  }
  
  getUserLogin(){
    return this.http.get<User[]>(`${this.baseUrl + 'userLogin'}`)
  }

  updateUserLeave(data: User, id: number) {
    return this.http.put<User>(`${this.baseUrl + 'leaveList'}/${id}`, data)
  }

  deleteUserLeave(id: number) {
    return this.http.delete<User>(`${this.baseUrl + 'leaveList'}/${id}`)
  }

  getleaveByID(id: number) {
    return this.http.get<User>(`${this.baseUrl + 'leaveList'}/${id}`)
  }

  getLeaveType() {
    return this.http.get<User[]>(`${this.baseUrl + 'leaveType'}`)
  }
}
