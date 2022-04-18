import { MatDatepicker, MatDatepickerInputEvent } from "@angular/material/datepicker";
import { DataFiltersDialogComponent } from './data-filters-dialog/data-filters-dialog.component';
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { PlotlyService } from "angular-plotly.js";
import { Moment } from "moment";

export class ReportUtils {
    public graph;
    filters = {
        minDate: null,
        maxDate: null,
        selectedMinDate: null,
        selectedMaxDate: null,
    };
    graphData;
    dollarData;
    rupeesData;
    loading = false;
    chartConfig = {
        type: 'scatter',
        mode: 'lines',
        name: 'Rupees (Crore)',
        line: { color: '#17BECF' },
    };
    selectedFilters: any = {};
    availableFilters: any = [];
    selectedGraphType = null;
    varId: any = 0;

    constructor(
        public plotlyService: PlotlyService,
        public matDialog: MatDialog,
        public _snackBar: MatSnackBar
    ) {}

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
            this.graphData.type.forEach(x => {
                if(!this.availableFilters.some(y => JSON.stringify(y) === JSON.stringify(x))){
                  this.availableFilters.push(x)
                }
              })
        }
      }


    updateMinDate(date: any, datepicker: MatDatepicker<Moment>) {
        datepicker.close();
        const dateVal = new Date(date);
        if (dateVal > this.filters.selectedMaxDate) {
            this._snackBar.open('From Date can not be more then To Date');
            this.filters.selectedMinDate = this.filters.minDate;
            return;
        }
        this.filters.selectedMinDate = dateVal;
        if (this.graphData?.x?.length) {
            const { x, y } = this.sortFromData(this.graphData, dateVal);
            this.graph.data = [];
            this.graph.data.push({ x, y, ...this.chartConfig });
        } else if (this.rupeesData?.x?.length) {
            const { x, y } = this.sortFromData(this.rupeesData, dateVal);
            this.graph.data = [];
            this.graph.data.push({
                x,
                y,
                ...{
                    type: 'scatter',
                    mode: 'lines',
                    name: 'Rupees (Crore)',
                    line: { color: '#17BECF' },
                },
            });
            const dollarData = this.sortFromData(this.dollarData, dateVal);
            this.graph.data.push({
                x: dollarData.x,
                y: dollarData.y,
                ...{
                    type: 'scatter',
                    mode: 'lines',
                    name: 'Dollar (Million)',
                    line: { color: '#f43f5e' },
                },
            });
        }
    }

    updateMaxDate(date: any, datepicker: MatDatepicker<Moment>) {
        datepicker.close();
        const dateVal = new Date(date);
        if (dateVal < this.filters.selectedMinDate) {
            this._snackBar.open('To Date can not be less then From Date');
            this.filters.selectedMaxDate = this.filters.maxDate;
            return;
        }
        this.filters.selectedMaxDate = dateVal;
        if (this.graphData?.x?.length) {
            const { x, y } = this.sortToData(this.graphData, dateVal);
            this.graph.data = [];
            this.graph.data.push({ x, y, ...this.chartConfig });
        } else if (this.rupeesData?.x?.length) {
            const { x, y } = this.sortToData(this.rupeesData, dateVal);
            this.graph.data = [];
            this.graph.data.push({
                x,
                y,
                ...{
                    type: 'scatter',
                    mode: 'lines',
                    name: 'Rupees (Crore)',
                    line: { color: '#17BECF' },
                },
            });
            const dollarData = this.sortToData(this.dollarData, dateVal);
            this.graph.data.push({
                x: dollarData.x,
                y: dollarData.y,
                ...{
                    type: 'scatter',
                    mode: 'lines',
                    name: 'Dollar (Million)',
                    line: { color: '#f43f5e' },
                },
            });
        }
    }

    exportGraph() {
        const graphDiv = this.plotlyService.getInstanceByDivId('plotly-graph');
        this.plotlyService.getPlotly().then((x) => {
            x.downloadImage(graphDiv, { filename: 'chart-data.png' });
        });
    }

    convertChartDataToCSV(args) {
        var result, ctr, keys, columnDelimiter, lineDelimiter, data;
        data = args || null;

        columnDelimiter = args.columnDelimiter || ',';
        lineDelimiter = args.lineDelimiter || '\n';

        keys = Object.keys(data);
        result = this.graph.layout.title.text;
        result += lineDelimiter;
        result += `Date,${this.graphData.unit}`;
        result += lineDelimiter;

        ctr = 0;
        for (var i = 0; i < data['x'].length; i++) {
            result += `${data['x'][i]},${data['y'][i]}`;
            result += lineDelimiter;
        }
        result += lineDelimiter;
        return result;
    }

    exportGraphasCSV() {
        var csv = '';
        for (var i = 0; i < this.graph.data.length; i++) {
            csv += this.convertChartDataToCSV(this.graph.data[i]);
        }
        if (csv == null) return;
        let filename = 'chart-data.csv';
        if (!csv.match(/^data:text\/csv/i)) {
            csv = 'data:text/csv;charset=utf-8,' + csv;
        }
        let data = encodeURI(csv);
        let link = document.createElement('a');
        link.setAttribute('href', data);
        link.setAttribute('download', filename);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    sortToData(data, date) {
        const x = [];
        const y = [];
        const yData = data.y;
        data.x.forEach((arrayDate, i) => {
            if (
                date > new Date(arrayDate) &&
                this.filters.selectedMinDate < new Date(arrayDate)
            ) {
                x.push(arrayDate);
                y.push(yData[i]);
            }
        });
        return { x, y };
    }

    sortFromData(data, date) {
        const x = [];
        const y = [];
        const yData = data.y;
        data.x.forEach((arrayDate, i) => {
            if (
                date < new Date(arrayDate) &&
                this.filters.selectedMaxDate > new Date(arrayDate)
            ) {
                x.push(arrayDate);
                y.push(yData[i]);
            }
        });
        return { x, y };
    }

    _prepareChartData(
        legendOptions = {},
        yAxisTitle = 'y Axis',
        xAxisTitle = 'x Axis',
        graphTitle = 'Graph'
    ): void {
        this.graph = {
            data: [],
            layout: {
                hovermode: 'x unified',
                title: {
                    text: graphTitle,
                    font: {
                        size: 24,
                        color: 'white',
                    },
                },
                margin: {
                    l: 60,
                    r: 20,
                    b: 75,
                    t: 50,
                    pad: 4,
                },
                autosize: true,
                paper_bgcolor: 'rgb(30,41,59)',
                plot_bgcolor: 'rgb(30,41,59)',
                showlegend: true,
                yaxis: {
                    color: '#fff',
                    title: {
                        text: yAxisTitle,
                        font: {
                            color: '#fff',
                        },
                    },
                    fixedrange: true
                },
                xaxis: {
                    color: '#fff',
                    title: {
                        text: xAxisTitle,
                        font: {
                            color: '#fff',
                        },
                    },
                },
                legend: {
                    xanchor: 'center',
                    yanchor: 'top',
                    x: 0.2,
                    y: -0.5,
                    font: {
                        color: '#fff',
                    },
                    margin: {
                        t: 20,
                        b: 20
                    },
                    ...legendOptions,
                },
                images: [
                    {
                        x: 1,
                        y: -0.4,
                        sizex: 0.1,
                        sizey: 0.1,
                        source: "assets/images/logo/logo-for-dark.svg",
                        xanchor: "right",
                        xref: "paper",
                        yanchor: "top",
                        yref: "paper"
                      },
                ],
            },
            config: {
                displayModeBar: false,
                responsive: true,
            },
        };
    }

    openFiltersDialog(): any {
        const dialogRef = this.matDialog.open(DataFiltersDialogComponent, {
            width: '70%',
            data: {filters: this.availableFilters, selected: this.selectedFilters, varId: this.varId},
        });
        dialogRef.afterClosed().subscribe((res: any) => {
            this.selectedFilters = res.data;
            if (res.response) {
                this.plotFilterCombinations(res.response, res.clearCall);
            }
        });
    }

    showVariableNotes(): any {
    }

    plotFilterCombinations(retrievedFilteredData, isClearCall = false) {
        const type = this.graphData.type;
        let { x, y } = retrievedFilteredData;
        if (isClearCall) {
            this.graph.data = [];
            this.graphData = retrievedFilteredData;
            x = [];
            y = [];
            this.graph.data.push({ x, y, ...this.chartConfig });
            this.graphData.type = type;
            return;
        }
        this.graphData = retrievedFilteredData;
        let uniqueCombinations = {};
        if (retrievedFilteredData.type) {
            const types = retrievedFilteredData.type;
            let obj = {};
            uniqueCombinations[JSON.stringify(types[0])] = {x: [x[0]], y: [y[0]]};
            for (let i = 1; i < types.length; i++) {
                const stringifiedType = JSON.stringify(types[i]);
                if (uniqueCombinations[stringifiedType]) {
                    uniqueCombinations[stringifiedType].x.push(x[i]);
                    uniqueCombinations[stringifiedType].y.push(y[i]);
                }
                else {
                    obj[JSON.stringify(types[0])] = {x: [x[0],...x], y: [y[0],...y]};
                    uniqueCombinations[stringifiedType] =  {x: [x[0]], y: [y[0]]}
                }
            }
        }
        this.graphData.type = type;
        const keys = Object.keys(uniqueCombinations)
        keys.forEach((combination) => {
            const jsonObj = JSON.parse(combination);
            const objKeys = Object.keys(jsonObj);
            let name = '';
            objKeys.forEach((key) => {
               if(name != '') {
                   name += ', '
               }
               name += ` ${jsonObj[key]} : ${key}`
            })
            if(name.length>80) {
                name = name.substring(0, 70)+'<br>'+ name.substring(70, name.length);
            }
            const {x, y} = uniqueCombinations[combination];
            this.graph.data.push({x, y, name})
        })
    }

    checkState(event, el) {
        event.preventDefault();
        if (this.selectedGraphType == el.value) {
            el.checked = false;
            this.selectedGraphType = null;
            this.graphFilterChanged(true);
        } else {
            el.checked = true;
            this.selectedGraphType = el.value;
            this.graphFilterChanged();
        }
    }

    graphFilterChanged(setDefault = false) {
        let graphObj = { x: [], y: [] };
        if (this.selectedGraphType == 1) {
            graphObj = this.transformDataForYoY();
        } else if (this.selectedGraphType == 2) {
            graphObj = this.transformDataForMoM();
        } else if(this.selectedGraphType == 3){
            graphObj = this.transformDataForQoQ();
        } else if (this.selectedGraphType == 4) {
            graphObj = this.transformDataForWoW();
        } else if(setDefault) {
            graphObj = this.transformDataForDoD();
        }
        this.graph.data = [];
        const { x, y } = graphObj;
        let text = [];
        let hovertemplate = '%{y}';
        if(!setDefault) {
            hovertemplate = '<i>%{text:.2f}%<i>'
            y.forEach((val: any, index: number) => {
            if (y[index - 1]) {
                let growthPerc = y[index] - y[index - 1];
                growthPerc = (growthPerc / y[index - 1]) * 100;
                text.push(growthPerc);
            } else {
                text.push(0);
            }
        })};
        this.graph.data.push({
            x,
            y,
            hovertemplate,
            text,
            ...{
                type: 'scatter',
                mode: 'lines',
                name: this.graphData.unit,
                line: { color: '#17BECF' },
            },
        });
    }

    transformDataForYoY() {
        const graphData = this.graphData;
        let uniqueYears = [];
        graphData.x.forEach((date: Date, index: number) => {
            const currDateYear = new Date(date).getFullYear();
            if (graphData.x[index + 1]) {
                const nextDateYear = new Date(
                    graphData.x[index + 1]
                ).getFullYear();
                if (currDateYear !== nextDateYear) {
                    uniqueYears.push(index);
                }
            } else {
                uniqueYears.push(index);
            }
        });
        let x = [];
        let y = [];
        uniqueYears.forEach((uniqueYear: any) => {
            x.push(graphData.x[uniqueYear]);
            y.push(graphData.y[uniqueYear]);
        });
        return { x, y };
    }

    transformDataForMoM() {
        const graphData = this.graphData;
        let uniqueMonthIndexes = [];
        graphData.x.forEach((date: Date, index: number) => {
            const currDateMonth = new Date(date).getMonth();
            if (graphData.x[index + 1]) {
                const nextDateMonth = new Date(
                    graphData.x[index + 1]
                ).getMonth();
                if (currDateMonth !== nextDateMonth) {
                    uniqueMonthIndexes.push(index);
                }
            } else {
                uniqueMonthIndexes.push(index);
            }
        });
        let x = [];
        let y = [];
        uniqueMonthIndexes.forEach((uniqueYear: any) => {
            x.push(graphData.x[uniqueYear]);
            y.push(graphData.y[uniqueYear]);
        });
        return { x, y };
    }

    transformDataForWoW() {
        const graphData = this.graphData;
        let uniqueMonthIndexes = [0];
        let currDateMonth = new Date(graphData.x[0]).getDay();
        graphData.x.forEach((date: Date, index: number) => {
            if (graphData.x[index + 1]) {
                const nextDateMonth = new Date(
                    graphData.x[index + 1]
                ).getDay();
                if (currDateMonth>nextDateMonth || nextDateMonth - currDateMonth >= 6) {
                    uniqueMonthIndexes.push(index);
                    currDateMonth = nextDateMonth;
                    
                }
            } else {
                uniqueMonthIndexes.push(index);
            }
        });
        let x = [];
        let y = [];
        uniqueMonthIndexes.forEach((uniqueYear: any) => {
            x.push(graphData.x[uniqueYear]);
            y.push(graphData.y[uniqueYear]);
        });
        return { x, y };
    }

    transformDataForDoD() {
        this.graph.data = [];
        const x = this.graphData.x;
        const y = this.graphData.y;
        return { x, y };
    }

    transformDataForQoQ() {
        const graphData = this.graphData;
        let uniqueMonthIndexes = [];
        let currentDateQuarter = 1;
        graphData.x.forEach((date: Date, index: number) => {
            const currDateMonth = new Date(date).getMonth();
            currentDateQuarter = currDateMonth <=3? 1 : currDateMonth <=7? 2 : 3;
            if(graphData.x[index+1]) {
                const nextDateMonth = new Date(
                    graphData.x[index + 1]
                ).getMonth();
                if(currentDateQuarter === 1) {
                    if(nextDateMonth > 3) {
                       uniqueMonthIndexes.push(index);
                    }
                } else if(currentDateQuarter === 2) {
                    if(nextDateMonth > 7 || nextDateMonth < 4) {
                        uniqueMonthIndexes.push(index);
                     }
                } else {
                    if(nextDateMonth < 8) {
                        uniqueMonthIndexes.push(index);
                    }
                }
            }
            else {
                uniqueMonthIndexes.push(index);
            }
        });
        let x = [];
        let y = [];
        uniqueMonthIndexes.forEach((uniqueYear: any) => {
            x.push(graphData.x[uniqueYear]);
            y.push(graphData.y[uniqueYear]);
        });
        return { x, y };
    }
}