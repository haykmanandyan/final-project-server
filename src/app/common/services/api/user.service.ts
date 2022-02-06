import {Observable} from "rxjs";
import {User} from "../../interfaces";
import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient,
  ) {
  }

  public getUsers(): Observable<User[]> {
    return this.http
      .get<User[]>(`users`)
  }

  public getUser(id: number): Observable<User> {
    return this.http
      .get<User>(`users/${id}`)
  }

  public addUser(newUser: User): void {
    this.http
      .post<User>(`users`, newUser)
      .subscribe((user: User) => console.log(user));
  }

  public editCurrentUser(editUser: User): void {
    this.http
      .patch(`users/${editUser.id}`, editUser)
      .subscribe((user: User) => console.log(user));
  }
}
