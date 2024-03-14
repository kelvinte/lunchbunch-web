import { Component, OnInit } from '@angular/core';
import { LunchPlanService } from '../../shared/service/lunch-plan.service';
import { LunchPlan } from '../../shared/model/lunch-plan.model';
import { PaginatedResponse } from '../../shared/model/paginated-response.model';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-lunch-plan-history',
  templateUrl: './lunch-plan-history.component.html',
  styleUrl: './lunch-plan-history.component.css',
})
export class LunchPlanHistoryComponent implements OnInit {
  lunchPlanHistory: LunchPlan[];
  currentPage = 0;
  pageSize = 5;
  totalPage;
  totalItem;
  constructor(
    private lunchPlanService: LunchPlanService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}
  ngOnInit(): void {
    this.retrieve(this.currentPage, this.pageSize);
  }

  retrieve(pageNumber: number, pageSize: number) {
    this.lunchPlanService
      .getLunchPlanHistory(this.currentPage, this.pageSize)
      .subscribe((page) => {
        this.lunchPlanHistory = page.result;
        this.totalItem = page.totalItem;
        this.totalPage = page.totalPage;
      });
  }
  getTotalPage() {
    return Array(this.totalPage)
      .fill(0)
      .map((x, i) => i);
  }

  setPage(page: number) {
    if (page != this.currentPage) {
      this.currentPage = page;
      this.retrieve(this.currentPage, this.pageSize);
    }
  }

  getPreviousPage() {
    if (this.currentPage != 0) {
      this.currentPage--;
      this.retrieve(this.currentPage, this.pageSize);
    }
  }
  getNextPage() {
    if (this.currentPage < this.totalPage - 1) {
      this.currentPage++;
      this.retrieve(this.currentPage, this.pageSize);
    }
  }

  navigateToLunchPlan(uuid: string) {
    this.router.navigate(['../', uuid], { relativeTo: this.route });
  }
}
