export class DashboardClass { // UserDashboardClass is technically user class

  constructor() {}

  // generate transaction id
  protected generateTransactionId (): number { // Generate unique random numbers as investmntId using the passed in current time seconds
    return 1 + Math.floor(Math.random() * 999999999);
  }

  // Get sum of amount property for deposits object
  getTotalDeposit(deposits: any): number{
    let sum = 0;

    deposits.forEach((deposit: any) => {
      if (deposit.transactionStatus === 'Success') {
        sum += +deposit.amount;
      }
    })
    return sum;
  }

  // Get sum of amount property for withdrawal object
  getTotalWithdrawal(withdrawals: any): number{
    let sum = 0;

    withdrawals.forEach((withdrawal: any) => {
      if (withdrawal.status === 'Completed') {
        sum += +withdrawal.amount;
      }
    })
    return sum;
  }

  // Get x (2) percent of amount (5000)
  protected get_X_PercentageOf_Amount(percent: number, amount: number): number {
    return (percent / 100) * amount;
  }

  // Get x (1) percent value
  protected get_X_Percent(percent: number):number {
    return percent / 100;
  }

  // get the number of days past from investment date
  protected getDaysPast(startDate: Date): number {
    // The number of milliseconds in one day
    const oneDay = 1000 * 60 * 60 * 24;

    // Convert both dates to milliseconds
    const todayDate = new Date();
    const strtDate = new Date(startDate);

    // Days past since the day of registration in milliseconds
    const daysPast = (todayDate.getTime() - strtDate.getTime()) / (oneDay);

    // return days past in days
    return Math.round(Math.abs(daysPast));
  }

  // get the closed deals for each investment
  protected getUserClosedDeals(startDate: Date, period: number): boolean {
    // Days left
    const daysLeft =  period - this.getDaysPast(startDate);
    if (daysLeft <= 0) {
      return true;
    }
    return false;
  }

  protected paybleAmount(amount: number): number {
    return amount - this.get_X_PercentageOf_Amount(2, amount);
  }

  // Add suffix to day of the month
  getDayNumberSuffix(day: number) {
    if (day >= 11 && day <= 13) {
        return "th";
    }
    switch (day % 10) {
    case 1:
        return "st";
    case 2:
        return "nd";
    case 3:
        return "rd";
    default:
        return "th";
    }
  }

}