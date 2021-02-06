import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { AuthService } from '../core/auth/auth.service';
import { HospitalUser, User } from '../User';
import { BrowserStorageFields, RoleEnum } from '../utils';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public showHospList = true;
  public role = '';
  public hospitalId = 0;
  public username = '';
  public pwd = '';
  public error: any;

  constructor(private authService: AuthService,
              private router: Router,
              private readonly modal: NgbModal
  ) { }

  ngOnInit(): void {
  }

  public resetFields(): void {
    this.role = '';
    this.hospitalId = 0;
    this.username = '';
    this.pwd = '';
    this.error = null;
  }

  public roleChanged(): void {
    this.showHospList = this.role !== RoleEnum.PATIENT;
  }

  public loginUser(): void {
    console.log(this.role + this.username + this.pwd + this.hospitalId);
    switch (this.role) {
      case RoleEnum.ADMIN:
        this.authService.loginAdminUser(new HospitalUser(this.role, this.hospitalId, this.username, this.pwd))
          .subscribe(
            (res: any) => this.afterSuccessfulLogin(res),
            (err: any) => this.error = err
          );
        break;
      case RoleEnum.DOCTOR:
        this.authService.loginDoctorUser(new HospitalUser(this.role, this.hospitalId, this.username, this.pwd))
          .subscribe(
            (res: any) => this.afterSuccessfulLogin(res),
            (err: any) => this.error = err
          );
        break;
      case RoleEnum.PATIENT:
        this.authService.loginPatientUser(new User(this.role, this.username, this.pwd))
          .subscribe(
            (res: any) => this.afterSuccessfulLogin(res),
            (err: any) => this.error = err
          );
        break;
    }
  }

  public loginPatient(patientPassword: TemplateRef<any>): void {
    this.modal.open(patientPassword).result.then(() => {
      this.loginUser();
    });
  }

  private afterSuccessfulLogin(res: any): void {
    console.log(res);
    localStorage.setItem(BrowserStorageFields.TOKEN, res.accessToken);
    const role = this.role;
    localStorage.setItem(BrowserStorageFields.USER_ROLE, this.role);
    const userId = this.username;
    localStorage.setItem(BrowserStorageFields.USERNAME, this.username);

    this.resetFields();

    this.router.navigate([ '/', role, userId]);
  }
}
