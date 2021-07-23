import { DataModel } from './../../models/data.model';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-datas-list',
  templateUrl: './datas-list.component.html',
  styleUrls: ['./datas-list.component.css']
})
export class DatasListComponent implements OnInit {
  @Input() datas: DataModel[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
