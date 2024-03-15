import { Component, OnInit } from '@angular/core';
import { LunchPlanService } from '../../shared/service/lunch-plan.service';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { formatDate } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-create-lunch-plan',
  templateUrl: './create-lunch-plan.component.html',
  styleUrl: './create-lunch-plan.component.css',
})
export class CreateLunchPlanComponent implements OnInit {
  createForm: FormGroup;
  currentDate: string;

  constructor(
    private lunchPlanService: LunchPlanService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.currentDate = formatDate(Date.now(), 'yyyy-MM-dd', 'en-US');

    this.createForm = new FormGroup({
      date: new FormControl(this.currentDate, [
        Validators.required,
        this.dateShouldBeTodayOrGreator.bind(this),
      ]),
      description: new FormControl('', Validators.required),
    });
  }
  createLunchPlan() {
    this.lunchPlanService
      .createLunchPlan(
        this.createForm.value.date,
        this.createForm.value.description
      )
      .subscribe((data) => {
        this.router.navigate(['/session/create-success']);
      });
  }

  dateShouldBeTodayOrGreator(control: FormControl): { [s: string]: boolean } {
    const date = new Date(control.value);
    date.setTime(0);
    const cur = new Date();
    cur.setTime(0);
    if (date < cur) {
      return { dateIsPast: true };
    }
  }
}
