import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CookieService } from 'ngx-cookie-service';
import { OCCUPATIONS } from '../constant';
import { DashboardService } from '../services/analytics.service';

@Component({
  selector: 'app-first-time-popup',
  templateUrl: './first-time-popup.component.html',
  styleUrls: ['./first-time-popup.component.scss']
})
export class FirstTimePopupComponent implements OnInit {

  userDetails = {
    Occupation: '',
    Affiliation: '',
    emailAddress: '',
    isChecked: false,
    isSubscriptionChecked: false,
  }
  loading: boolean;
  occupations = OCCUPATIONS;

  constructor(public dialogRef: MatDialogRef<FirstTimePopupComponent>,
     private cookieService: CookieService, private dashboardService: DashboardService) { }

  ngOnInit(): void {
  }

  submitForm(): void {
    this.cookieService.set('cena', 'user-details');
    const postBody = {
      email_address: this.userDetails.emailAddress,
      status: "subscribed"
    }
    this.dashboardService.addUserEmailToMailChimp(postBody).subscribe();
    this.dialogRef.close();
  }

}
