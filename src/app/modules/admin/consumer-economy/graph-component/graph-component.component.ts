import { Component, OnInit } from '@angular/core';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PlotlyService } from 'angular-plotly.js';
import { NavigationService } from 'app/core/navigation/navigation.service';
import { CookieService } from 'ngx-cookie-service';
import { ReportUtils } from '../common-report-util';
import { REGIONS, REPORT_VAR } from '../constant';
import { FirstTimePopupComponent } from '../first-time-popup/first-time-popup.component';
import { DashboardService } from '../services/analytics.service';
import { VariableNotesDialogComponent } from '../variable-notes-dialog/variable-notes-dialog.component';

export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY'
  },
};

@Component({
  selector: 'app-graph-component',
  templateUrl: '../report-template.html',
  styleUrls: ['../report-template.scss'],
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }
  ]
})
export class GraphComponentComponent extends ReportUtils implements OnInit {
  defaultRegion = 'national';
  regions = REGIONS;
  pageTitle = 'Component';
  isDataAvailable = true;
  variableNotes: any;
  variableDetails: any;

  constructor(
    private _dashboardService: DashboardService,
    private _navigationService: NavigationService,
    public plotlyService: PlotlyService,
    public matDialog: MatDialog,
    public _snackBar: MatSnackBar,
    private cookieService: CookieService) {
      super(plotlyService, matDialog, _snackBar);
      if(!this.userCookie) {
        //show first time pop up.
        this.showFirstTimePopup();
      }
    }

  ngOnInit(): void {
    this._navigationService.currentActiveRoute.subscribe((routeDetails) => {
      this.varId = routeDetails.var_id;
      this.pageTitle = routeDetails.title;
      if(this.varId) {
        this.isDataAvailable = true;
        this.getReportData();
        this.getVariableNotes();
        this.getVariableDetails();
      }
    })
  }

  getReportData() {
    this.loading = true;
    this._dashboardService.getData(this.varId).subscribe(res => {
      if (res.type === 'success' && res.data.x) {
        this.graphData = res.data;
        this._prepareChartData({}, this.graphData?.unit, 'Date', this.pageTitle);
        const { x, y } = res.data;
        this.chartConfig.name = this.graphData.unit;
        this.graph.data.push({x,y, ...this.chartConfig});
        this.availableFilters = [];
        this.selectedFilters = {};
        this._prepareFilters(res.data);
      }
      else {
        this.graphData = {};
        this.graph.data = [];
        this.isDataAvailable = false;
        this.loading = false;
      }
    });
  }

  getVariableNotes() {
    this.variableNotes = null;
    this._dashboardService.getVariableNotes(this.varId).subscribe(res=> {
      if (res.type === 'success' && res.message !== "No data exist") {
        this.variableNotes = res.data;
      }
    })
  }

  getVariableDetails() {
    this.variableDetails = null;
    this._dashboardService.getVariableDetails(this.varId).subscribe((res: any) => {
      if (res.type === 'success' && res.message !== "No data exist") {
        this.variableDetails = res.data;
      }
    })
  }

  showVariableNotes(): any {
    this.matDialog.open(VariableNotesDialogComponent, {
        width: '70%',
        data: {pageTitle: this.pageTitle, variableNotes: this.variableNotes},
    });
  }

  showFirstTimePopup(): any {
    this.matDialog.open(FirstTimePopupComponent, {
      width: '70%',
      disableClose: true
    })
  }

  _prepareFilters(data) {
    const dates = (data.x || []).map((x) => new Date(x));
    this.filters.maxDate = new Date(Math.max.apply(null, dates));
    this.filters.selectedMaxDate = new Date(Math.max.apply(null, dates));
    this.filters.minDate = new Date(Math.min.apply(null, dates));
    this.filters.selectedMinDate = new Date(Math.min.apply(null, dates));
    if(JSON.stringify(this.graphData?.type[0]) === '{}') {
        delete this.graphData.type;
        this.loading = false;
    }
    else {
      for (let index = 0; index < this.graphData.type.length; index++) {
        if(typeof this.graphData.type[index] == 'string'){
         let str =  this.graphData.type[index].replace(/'/g, '"');
         this.graphData.type[index] = JSON.parse(str);
        }        
      }
      const objKeys = Object.keys(this.graphData.type[0])
      for (let i = 0; i < objKeys.length; i++) {
        this.selectedFilters[objKeys[i]] = this.graphData.type[0][objKeys[i]];
      }
      let keys = Object.keys(this.selectedFilters);
      let parsedFilters = {};
      keys.forEach((key) => {
        parsedFilters[key] = [this.selectedFilters[key]]
      })
      this._dashboardService.getFilteredData(parsedFilters, this.varId).subscribe((res) => {
        if (res.type === 'success' && res.data) {
          this.graph.data = [];
          this.graphData.x = res.data.x;
          this.graphData.y = res.data.y;
          let hovertemplate = `%{y}`;
          const { x, y } = res.data;
          let name = '';
          const keys = Object.keys(this.selectedFilters);
          keys.forEach((key) => {
            if (name != '') {
              name += ', '
            }
            name += `${this.selectedFilters[key]} : ${key} `
          })
          if (name.length > 80) {
            name = name.substring(0, 80) + '<br>' + name.substring(80, name.length);
          }
          this.graph.data.push({ x, y, name, hovertemplate });
          this.loading = false;
        }
      })
        this.graphData.type.forEach(x => {
            if(!this.availableFilters.some(y => JSON.stringify(y) === JSON.stringify(x))){
              this.availableFilters.push(x)
            }
          })
    }
  }

  get userCookie() {
    return this.cookieService.get('cena')
  }
}
