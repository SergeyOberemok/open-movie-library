import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div class="h-full w-full flex content-center justify-center items-center">
      <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded h-10">
        Button
      </button>
    </div>
    <router-outlet></router-outlet>
  `,
  styles: [],
})
export class AppComponent {
  title = 'open-library';
}
