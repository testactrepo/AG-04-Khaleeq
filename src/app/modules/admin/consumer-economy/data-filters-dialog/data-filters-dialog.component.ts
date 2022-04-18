import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DashboardService } from '../services/analytics.service';

@Component({
  selector: 'app-data-filters-dialog',
  templateUrl: './data-filters-dialog.component.html',
  styleUrls: ['./data-filters-dialog.component.scss']
})
export class DataFiltersDialogComponent implements OnInit {

  filtersList = {};
  selectedFilters = {};
  loading: boolean;
  varId: number;
  showWarning: boolean;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<DataFiltersDialogComponent>,
   private _dashboardService: DashboardService) {
    this.selectedFilters = data.selected;
    this.varId = data.varId;
    this.prepareFiltersView(data.filters);
   }

  ngOnInit(): void {
  }

  prepareFiltersView(filtersList: any) {
    const keys = Object.keys(filtersList[0]);
    let filters = {};
    filtersList.forEach((filter) => {
      keys.forEach((key) => {
        if(filters[key] && filters[key].indexOf(filter[key]) < 0) {
          filters[key].push(filter[key])
        } else if(!filters[key]){
          filters[key] = [filter[key]];
        }
      })
    })
    this.filtersList = filters;
  }

  clearFilters(): void {
    this.selectedFilters = {};
    this.applyFilters(true);
  }

  applyFilters(clearFiltersCall = false): void {
    this.loading = true;
    const keys = Object.keys(this.selectedFilters);
    let parsedFilters = {};
    keys.forEach((key) => {
      parsedFilters[key] = [this.selectedFilters[key]]
    })
    this._dashboardService.getFilteredData(parsedFilters, this.varId).subscribe((res) => {
      if (res.type === 'success' && res.data) {
        this.loading = false;
        if(res.data.x?.length) {
          this.dialogRef.close({data: this.selectedFilters, response: res.data, clearCall: clearFiltersCall});
        }
        else {
          this.showWarning = true;
        }
      }
    })
  }

  get filtersListArray() {
    return Object.keys(this.filtersList)
  }

}
