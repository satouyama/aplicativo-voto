import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-projeto-component',
  templateUrl: './projeto.component.html',
  styleUrls: ['./projeto.component.scss'],
})
export class ProjetoComponent implements OnInit {

  @Input('projeto') projeto:any;
  constructor() { }

  ngOnInit() {
    console.log(this.projeto);
  }

}
