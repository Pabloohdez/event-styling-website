import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';

@Component({
  selector: 'app-root',
  imports: [LayoutComponent, RouterOutlet],
  template: `
    <app-layout>
      <router-outlet />
    </app-layout>
  `,
  styles: [],
})
export class AppComponent {}
