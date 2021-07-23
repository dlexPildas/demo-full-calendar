import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { finalize } from 'rxjs/operators';

import { DataModel } from './models/data.model';
import { AppService } from './services/app.service';
import { ResultSearchModel } from './models/result-search.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  @ViewChild('calendar', { static: false }) calendar: any;

  result: DataModel[] = [];
  date: any;
  loading = false;

  constructor(private appService: AppService) {
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.changeDate(this.calendar.activeDate);
    }, 0);

    this.calendar.stateChanges.subscribe((x: any) => {
      this.changeDate(this.calendar.activeDate);
    });
  }

  changeDate(value: any): void {
    this.date = value;
    const dateSelected = new Date(value);

    const year = dateSelected.getFullYear();
    const month = dateSelected.getMonth() + 1;

    this.loadData(new Date(year, month, 0).getDate(), month, year)
  }

  loadData(limit: number, month: number, year: number): void {
    this.loading = true;
    this.appService.getDatas(limit, month, year)
      .pipe(
        finalize(() => this.loading = false)
      )
      .subscribe(
        (result: ResultSearchModel) => this.result = result.data // this.result = datas
      );
  }
}
