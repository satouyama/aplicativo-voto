import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { Router } from '@angular/router';
import * as $ from 'jquery'


@Component({
  selector: 'app-slide',
  templateUrl: './slide.page.html',
  styleUrls: ['./slide.page.scss'],
})
export class SlidePage implements OnInit {

  @ViewChild('slides',null) slides: IonSlides;
  
  slideOpts = {
    initialSlide: 0,
    speed: 400
  };

  constructor(public router: Router) { }

  ngOnInit() {
    localStorage.setItem("primeiroacesso","true");
    setTimeout(() => {
      $('video').trigger('play');
    },500);
  }


  login () {
    this.router.navigate(['/login']);
  }
  page (event) {
    if (event) {
      this.slides.slideNext();
      return;
    }
    this.slides.slidePrev();
  }
}
