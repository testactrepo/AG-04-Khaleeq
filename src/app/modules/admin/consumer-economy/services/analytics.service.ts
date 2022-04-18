import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import * as moment from 'moment';
import { environment } from 'environments/environment';

@Injectable({
    providedIn: 'root'
})
export class DashboardService {
    private _data: BehaviorSubject<any> = new BehaviorSubject(null);
    url = environment.api;
    /**
     * Constructor
     */
    constructor(private _httpClient: HttpClient) { }
    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Getter for data
     */
    get data$(): Observable<any> {
        return this._data.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get data
     */
    getData(varId: number): Observable<any> {
        return this._httpClient.get(this.url + 'reports/getAllData', { params: { varId } }).pipe(
            tap((response: any) => {
                this._data.next(response);
            })
        );
    }

    /**
     * 
     * @param varId 
     * @returns Variable Notes
     */
    getVariableNotes(varId: number): Observable<any> {
       return this._httpClient.get(this.url + 'sections/getVariableNotes', { params: { varId } });
    }

    getVariableDetails(varId: number): Observable<any> {
        return this._httpClient.get(this.url + 'sections/getVariableDetails', { params: { varId } })
    }

    getFilteredData(filterJson: Object, varId: number): Observable<any> {
        return this._httpClient.post(this.url + 'reports/getFilteredData', filterJson , { params: {varId} })
    }

    addUserEmailToMailChimp(postBody: any): Observable<any> {
        return this._httpClient.post(this.url + 'mailchimp/addMemberToList', postBody );
    }
}
