import { DashboardClass } from './../common/dashboard.class';

export class TransactionsClass extends DashboardClass {

  constructor() {
    super();
  }

  protected settLessThanOneWeek(specifiedPeriod: number, startDate: Date, period: number): boolean {
    // Days left
    const daysLeft =  period - super.getDaysPast(startDate);

    // Highlight row when days left is less or one wk
    if (daysLeft <= specifiedPeriod) {
      return true;
    } else {
      return false;
    }
  }

  protected settLessThanOneMonth(specifiedPeriod: number, startDate: Date, period: number): boolean {
    // Days left
    const daysLeft =  period - super.getDaysPast(startDate);

    // Highlight row when days left is less or 30 days
    if (daysLeft > 7 && daysLeft <= specifiedPeriod) {
      return true;
    } else {
      return false;
    }
  }

}
