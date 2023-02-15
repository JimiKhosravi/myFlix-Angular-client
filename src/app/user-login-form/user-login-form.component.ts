import { Component, OnInit, Input } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { FetchApiDataService } from "../fetch-api-data.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from '@angular/router';

@Component({
  selector: "app-user-login-form",
  templateUrl: "./user-login-form.component.html",
  styleUrls: ["./user-login-form.component.scss"],
})
export class UserLoginFormComponent implements OnInit {
  @Input() userData = { Username: "", Password: "" };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    private router: Router
  ) { }
  ngOnInit(): void { }

  /**
  * login user
  * 
  * @remarks
  * Make API call to login the user, if success, set the localstorage and close the login dialog, if fail,
  * open snackBar to show error message
  */
  logInUser(): void {
    this.fetchApiData.userLogin(this.userData).subscribe(
      (result) => {
        localStorage.setItem("token", result.token);
        localStorage.setItem("user", result.user.Username);
        this.dialogRef.close();
        this.snackBar.open(`${result.user.Username} has logged in!`, "OK", {
          duration: 2000,
        });
        this.router.navigate(['movies']);
      },
      (result) => {
        this.snackBar.open(result, "OK", {
          duration: 2000,
        });
      }
    );
  }
}
