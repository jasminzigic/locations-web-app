import { Component, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { LocationDetails, City } from '../../api/types';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { AddLocationComponent } from '../../dialogs/add-location/add-location.component';
import { LocationService } from '../../api/location.service';
import { NotifierService } from 'angular-notifier';
import { ConfirmDialogComponent } from 'src/app/dialogs/confirm/confirm.component';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.scss']
})
export class LocationsComponent implements OnInit, AfterViewInit {
  private cities: City[];
  public locations: LocationDetails[];

  displayedColumns: string[] = ['name', 'address', 'cityName', 'longitude', 'latitude', 'actions'];
  dataSource: MatTableDataSource<LocationDetails>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private dialog: MatDialog,
              private route: ActivatedRoute,
              private locationService: LocationService,
              private notifierService: NotifierService,
              private router: Router,
              private cd: ChangeDetectorRef) {
                router.events.subscribe(event => {
                  if (event instanceof NavigationEnd) {
                    this.refresh();
                  }
                });
              }

  ngOnInit(): void {
    this.cities = this.route.snapshot.data.cities;
    this.locations = this.route.snapshot.data.locations;
    this.dataSource = new MatTableDataSource(this.locations);
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  addLocation(): void {
    this.dialog.open(AddLocationComponent, {
      data: {
        cities: this.cities
      }, disableClose: true
    })
      .afterClosed().subscribe(res => {
        console.log(res);
        if (res) {
          this.router.navigate(['/locations']); // To fetch new data
        }
      });
  }

  deleteLocation(id: number): void {
    this.dialog.open(ConfirmDialogComponent, { data: `Are you sure that you want to delete location?`}).afterClosed().subscribe(res => {
      if (res) {
        this.locationService.deleLocation(id).toPromise().then((res) => {
          this.notifierService.notify('success', 'Successfully deleted');
          this.router.navigate(['/locations']); // To fetch new data
        }).catch(err => {
          this.notifierService.notify('error', err.message);
        });
      }
    })
  }

  public refresh(): void {
    this.ngOnInit();
    this.ngAfterViewInit();
    this.cd.detectChanges();
  }

}
