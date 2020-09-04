import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LocationService } from '../../api/location.service';
import { City, LocationDetails } from '../../api/types';
import { NotifierService } from 'angular-notifier';
// tslint:disable: no-string-literal

@Component({
  selector: 'app-filter-dialog',
  templateUrl: './add-location.component.html',
  styleUrls: ['./add-location.component.scss']
})
export class AddLocationComponent implements OnInit {
  public addLocationForm: FormGroup;
  public submitted = false;
  public cities: City[];
  public location: LocationDetails;


  constructor(@Inject(MAT_DIALOG_DATA) public data: { cities: City[], location: LocationDetails },
              public dialogRef: MatDialogRef<AddLocationComponent>,
              private formBuilder: FormBuilder,
              private locationService: LocationService,
              private notifierService: NotifierService) { }

  ngOnInit(): void {
    this.cities = this.data.cities;
    this.location = this.data.location;
    this.addLocationForm = this.formBuilder.group({
      name: [this.location ? this.location.name : '', [Validators.minLength(3), Validators.required]],
      address: [this.location ? this.location.address : '', [Validators.minLength(3)]],
      city: [this.location ? this.location.cityName : null, Validators.required],
      longitude: [this.location ? this.location.longitude : null, [Validators.required, Validators.min(-180), Validators.max(180)]],
      latitude: [this.location ? this.location.latitude : null, [Validators.required, Validators.min(-90), Validators.max(90)]]
    });
    console.log(this.cities, this.location);
  }

  // convenience getter for easy access to form fields
  get f(): any { return this.addLocationForm.controls; }

  onSubmit(): void {
    this.submitted = true;
    // stop here if form is invalid
    if (this.addLocationForm.invalid) {
      return;
    }
    if (this.location) {
      const newValue = this.addLocationForm.value;
      Object.assign(newValue, { id: this.location.id });
      this.locationService.updateLocation(newValue).toPromise().then((res) => {
        console.log(res);
        this.notifierService.notify('success', 'Successfully updated');
        this.dialogRef.close(res);
      }).catch((err) => {
        console.error(err.message);
        this.notifierService.notify('error', err.message);
      });
    } else {
      this.locationService.addNewLocation(this.addLocationForm.value).toPromise().then((res) => {
        console.log(res);
        this.notifierService.notify('success', 'Successfully saved');
        this.dialogRef.close(res);
      }).catch((err) => {
        console.error(err.message);
        this.notifierService.notify('error', err.message);
      });
    }
  }

  setToCurrentCoordinates(): void {
    window.navigator.geolocation.getCurrentPosition(async (res) => {
      this.addLocationForm.controls['longitude'].setValue(res.coords.longitude);
      this.addLocationForm.controls['latitude'].setValue(res.coords.latitude);
      const address = await this.locationService.getAddress(res.coords);
      this.addLocationForm.controls['address'].setValue(address);
    });
  }

}
