import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-partidos',
  templateUrl: './partidos.page.html',
  styleUrls: ['./partidos.page.scss'],
})
export class PartidosPage implements OnInit {

  date: string;
  type: 'string';
  constructor() { }

  ngOnInit() {
  }
  onChange($event) {
    console.log(this.date);
  }
}
