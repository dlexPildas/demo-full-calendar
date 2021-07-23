import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { finalize } from 'rxjs/operators';

import { DataModel } from './models/data.model';
import { AppService } from './services/app.service';
import { ResultSearchModel } from './models/result-search.model';
import { CalendarOptions, FullCalendarComponent, ToolbarInput } from '@fullcalendar/angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  @ViewChild('calendar') calendarComponent!: FullCalendarComponent;

  result: DataModel[] = [];
  loading = false;

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth', // bind is important!

    customButtons: {
      nextMonthButton: {
        text: '>',
        click: () => this.nextMonth()
      },
      prevMonthButton: {
        text: '<',
        click: () => this.prevMonth()
      }
    },
    headerToolbar: {
      left: '',
      center: 'title',
      right:'prevMonthButton,nextMonthButton'
    }
  };

  constructor(private appService: AppService) {
  }

  ngAfterViewInit(): void {
    this.changeDate(this.calendarComponent?.getApi().currentData.currentDate);
  }

  nextMonth() {
    this.calendarComponent.getApi().next();
    this.calendarComponent.getApi().next();
    this.changeDate(this.calendarComponent?.getApi().currentData.currentDate)
    this.calendarComponent.getApi().prev();
  }

  prevMonth(): void {
    this.changeDate(this.calendarComponent?.getApi().currentData.currentDate);
    this.calendarComponent.getApi().prev();
  }

  changeDate(date: Date): void {
    const year = date.getFullYear();
    let month = date.getMonth() + 1;

    this.loadData(new Date(year, month, 0).getDate(), month, year)
  }

  loadData(limit: number, month: number, year: number): void {
    this.loading = true;
    this.appService.getDatas(limit, month, year)
      .pipe(
        finalize(() => this.loading = false)
      )
      .subscribe(
        (result: ResultSearchModel) => this.result = result.data
      );
  }
}
