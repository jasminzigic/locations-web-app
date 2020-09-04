import { Component, OnInit, ViewChildren, QueryList, OnDestroy } from '@angular/core';
import { AgmInfoWindow } from '@agm/core';
import { LocationDetails, City } from '../../api/types';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AddLocationComponent } from '../../dialogs/add-location/add-location.component';
import { TitleService } from 'src/app/services/title.service';

@Component({
  selector: 'app-location-details',
  templateUrl: './location-details.component.html',
  styleUrls: ['./location-details.component.scss']
})
export class LocationDetailsComponent implements OnInit, OnDestroy {
  @ViewChildren('markerInfo') public markersInfo: QueryList<AgmInfoWindow>;
  public editing = false;
  public location: LocationDetails;
  public cities: City[];

  constructor(private route: ActivatedRoute, private dialog: MatDialog, private titleService: TitleService) { }

  ngOnInit(): void {
    this.location = this.route.snapshot.data.location;
    this.cities = this.route.snapshot.data.cities;
    this.titleService.title = this.location.name;
    this.titleService.appComponentRef.cd.detectChanges();
  }

  ngOnDestroy(): void {
    this.titleService.title = null;
  }

  hideInfo(): void {
    this.markersInfo.forEach((m) => { m.close(); });
  }

  editLocation(): void {
    this.editing = true;
    this.dialog.open(AddLocationComponent, {
      data: { cities: this.cities, location: this.location },
      disableClose: true, hasBackdrop: true
    })
      .afterClosed().subscribe(res => {
        console.log(res);
        this.location = res;
        this.editing = false;
      });
  }

}
