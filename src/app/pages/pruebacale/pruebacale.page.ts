import { Component } from '@angular/core';

@Component({
  selector: 'app-pruebacale',
  templateUrl: './pruebacale.page.html',
  styleUrls: ['./pruebacale.page.scss'],
})
export class PruebacalePage {

  date : string;
  type : 'string'; 

  constructor() { }

  onChange($event) {
    console.log($event.format('YYYY-MM-DD'));
  }

  onSelect($event){
    console.log("Event select ", $event.format('DD-MM-YYYY'));
  }

  ngOnInit() {
  }

}
