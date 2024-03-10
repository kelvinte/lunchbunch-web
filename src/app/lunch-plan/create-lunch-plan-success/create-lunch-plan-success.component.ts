import { Component, OnInit } from '@angular/core';
import { LunchPlanService } from '../../shared/service/lunch-plan.service';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-create-lunch-plan-success',
  templateUrl: './create-lunch-plan-success.component.html',
  styleUrl: './create-lunch-plan-success.component.css',
})
export class CreateLunchPlanSuccessComponent implements OnInit {
  description: string;
  date: string;
  uuid: string;
  link: string;
  constructor(
    private lunchPlanService: LunchPlanService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.lunchPlanService.lunchPlanCreated.subscribe((plan) => {
      this.description = plan.description;
      this.date = plan.date;
      this.uuid = plan.uuid;
      this.link = 'http://localhost:4200/session/' + plan.uuid;
    });
  }

  goToSession() {
    this.router.navigate(['../', this.uuid], { relativeTo: this.route });
  }
}
