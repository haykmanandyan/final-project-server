import {Subject, takeUntil} from "rxjs";
import {ToastrService} from "ngx-toastr";
import {User} from "../../../../../common/interfaces";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../../../../common/services";
import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit, OnDestroy {

  private destroy$ = new Subject<void>();

  public addMode = this.activatedRoute.snapshot.url[0]["path"] === 'add-new-user';

  public userForm: FormGroup = new FormGroup({
    'id': new FormControl(null),
    'name': new FormControl(null, Validators.required),
    'username': new FormControl(null, Validators.required),
    'email': new FormControl(null, [Validators.required, Validators.email]),
    'address': new FormGroup({
      'city': new FormControl(null),
      'geo': new FormGroup({
        'lat': new FormControl(null),
        'lng': new FormControl(null),
      }),
      'street': new FormControl(null),
      'suite': new FormControl(null),
      'zipcode': new FormControl(null),
    }),
    'phone': new FormControl(null),
    'website': new FormControl(null),
    'company': new FormGroup({
      'name': new FormControl(null),
      'catchPhrase': new FormControl(null),
      'bs': new FormControl(null),
    })
  });

  constructor(
    public activatedRoute: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private toastr: ToastrService,
  ) {
  }

  public ngOnInit(): void {
    if (!this.addMode) {
      this.getUser();
    }
  }

  private canDeactivatePage(): boolean {
    return !this.userForm.dirty;
  }

  private getUser(): void {
    this.userService.getUser(+(this.activatedRoute.snapshot.params['id']))
      .pipe(
        takeUntil(this.destroy$),
      )
      .subscribe((response: User) => {
          this.userForm.patchValue(response);
        }
      )
  }

  public onSubmit(): void {
    if (!this.userForm.valid) {
      this.toastr.error('The form is invalid!');
      return;
    }

    if (!this.addMode) {
      this.userService.editCurrentUser(this.userForm.value);
    } else {
      this.userService.addUser(this.userForm.value);
    }
    this.userForm.markAsPristine();
    this.router.navigate(['dashboard/users']);
  }

  public onReset(): void {
    if (this.userForm.dirty && confirm('You have some changes. Are you sure you want reset form?')) {
      this.getUser();
      this.userForm.markAsPristine();
    }
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }

}
