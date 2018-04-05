import { Component, OnDestroy, ViewChild } from '@angular/core';
import { HeroServiceService } from '../hero-service.service';
import { Hero } from '../hero';
import { Subscription } from 'rxjs/Subscription';
import { GridOptions, GridApi } from 'ag-grid';
import { DatePipe } from '@angular/common';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import 'rxjs/add/operator/finally';
import { VisitedCellComponent } from '../visited-cell/visited-cell.component';
import { NameCellComponent } from '../name-cell/name-cell.component';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnDestroy {

    @ViewChild('agGrid')
    private gridApi;

    @BlockUI('patient-grid')
    private blockUIList: NgBlockUI;

    private heroes: Array<Hero>;
    private heroesSubscription: Subscription;
    private tableDataSubscription: Subscription;
    private gridOptions: GridOptions;
    private fromDateControl: FormControl;
    private toDateControl: FormControl;
    private selectedRows;
    private filterForm: FormGroup;

    constructor(private service: HeroServiceService, private dateFilter: DatePipe, private fb: FormBuilder) { }

    ngOnInit() {
        this.initGrid();
        this.initFilters();
    }

    initGrid() {
        this.gridOptions = <GridOptions>{};
        this.gridOptions.rowHeight = 40;
        this.gridOptions.columnDefs = [
            {
                headerName: 'HOSID',
                field: 'hospitalPatientId',
                width: 150,
                checkboxSelection: true,
                pinned: 'left',
                enableCellChangeFlash: true,
                cellStyle: function (params) {
                    return { display: 'flex', alignItems: 'center' }
                }
            },
            {
                headerName: 'Patient Details',
                children: [
                    {
                        headerName: 'Patient Name',
                        field: 'patientName',
                        editable: true,
                        cellStyle: function (params) {
                            return { display: 'flex', alignItems: 'center' }
                        },
                        cellRendererFramework: NameCellComponent
                    },
                    {
                        headerName: 'Age',
                        field: 'patientAge',
                        valueFormatter: param => this.ageFormatter(param.value),
                        cellStyle: function (params) {
                            return { display: 'flex', alignItems: 'center' }
                        },
                        enableCellChangeFlash: true
                    },
                    {
                        headerName: 'Martial Status',
                        field: 'maritalStatus',
                        cellStyle: function (params) {
                            return { display: 'flex', alignItems: 'center' }
                        },
                        enableCellChangeFlash: true
                    },
                    {
                        headerName: 'Mobile Number',
                        field: 'mobileNumber',
                        cellStyle: function (params) {
                            return { display: 'flex', alignItems: 'center' }
                        },
                        enableCellChangeFlash: true
                    },
                    {
                        headerName: 'Gender',
                        field: 'gender',
                        cellStyle: function (params) {
                            return { display: 'flex', alignItems: 'center', textTransform: 'capitalize' }
                        }
                    }
                ]
            },
            {
                headerName: 'Miscellaneous',
                children: [
                    {
                        headerName: 'Visit Type',
                        field: 'visitType',
                        enableCellChangeFlash: true,
                        cellRendererFramework: VisitedCellComponent,
                        cellStyle: function (params) {
                            const common = { display: 'flex', alignItems: 'center', justifyContent: 'center' }
                            if (params.value == 'NEW') {
                                return { backgroundColor: '#ddffdd', ...common };
                            } else {
                                return { backgroundColor: '#fff1e8', ...common };
                            }
                        }
                    },
                    {
                        headerName: 'Reg Id',
                        field: 'regId',
                        suppressFilter: true,
                        enableCellChangeFlash: true,
                        cellStyle: function (params) {
                            return { display: 'flex', alignItems: 'center' }
                        }
                    },
                    {
                        filter: 'agDateColumnFilter',
                        cellStyle: function (params) {
                            return { display: 'flex', alignItems: 'center' }
                        },
                        headerName: 'Visit Date',
                        field: 'visitDate',
                        valueFormatter: param => this.dateFormatter(param.value),
                        enableCellChangeFlash: true
                    }
                ]
            }
        ];
        this.gridOptions.rowData = [];
    }

    onCheckboxSelection($event) {
        this.selectedRows = $event.api.getSelectedRows();
    }

    onCellValueChanged($event) {
        console.log($event);
    }

    onGridReady($event) {
        $event.api.sizeColumnsToFit();
    }

    initFilters() {
        this.filterForm = this.fb.group({
            fromDate: [null, Validators.required],
            toDate: [null, Validators.required]
        });
    }

    dateFormatter(date) {
        return this.dateFilter.transform(date, 'short');
    }

    ageFormatter(ageInDays) {
        return (ageInDays) ? `${Math.round(ageInDays / 365)} Years` : '';
    }

    ngOnDestroy() {
        this.tableDataSubscription.unsubscribe();
    }

    getHeroes(): void {
        this.heroesSubscription = this.service
            .getHeroes()
            .subscribe(heroes => this.heroes = heroes.slice(1, 5));
    }

    getData(payload): void {
        this.blockUIList.start();
        this.tableDataSubscription = this.service
            .getTableData({
                fromDate: this.filterForm.get('fromDate').value,
                toDate: this.filterForm.get('toDate').value
            })
            .finally(this.blockUIList.stop)
            .subscribe({
                next: (response) => {
                    this.gridOptions.rowData = response.data.patientVisitList;
                }
            });
    }

}
