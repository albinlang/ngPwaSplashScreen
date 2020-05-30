import {
  Component,
  OnInit,
  ChangeDetectorRef,
  ApplicationRef,
  ChangeDetectionStrategy,
} from '@angular/core';
import { PwaService } from '../pwa.service';
import {
  trigger,
  transition,
  query,
  animateChild,
  animate,
  style,
} from '@angular/animations';

@Component({
  selector: 'app-splash-screen',
  templateUrl: './splash-screen.component.html',
  styleUrls: ['./splash-screen.component.scss'],
  animations: [
    trigger('fadeOut', [
      transition(':leave', [
        query(':leave', animateChild(), { optional: true }),
        animate(300, style({ opacity: 0 })),
      ]),
    ]),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SplashScreenComponent implements OnInit {
  show = true;

  constructor(
    private pwaService: PwaService,
    private cdr: ChangeDetectorRef,
    private appRef: ApplicationRef
  ) {}

  ngOnInit(): void {
    this.pwaService.checkForUpdate().subscribe((result) => {
      this.show = result;
      this.cdr.detectChanges();
    });
  }
}
