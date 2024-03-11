import { Component, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-join-lunch-plan',
  templateUrl: './join-lunch-plan.component.html',
  styleUrl: './join-lunch-plan.component.css',
})
export class JoinLunchPlanComponent {
  constructor(private route: ActivatedRoute, private router: Router) {}
  goToSession(linkElement) {
    const link = linkElement.value;
    const httpIndex = link.indexOf('http://');
    const httpsIndex = link.indexOf('https://');

    let startIndex = 0;
    if (httpIndex !== -1 || httpsIndex !== -1) {
      startIndex = link.lastIndexOf('/');
    }

    const uuid = link.substring();

    this.router.navigate(['../', uuid], { relativeTo: this.route });
  }
}
