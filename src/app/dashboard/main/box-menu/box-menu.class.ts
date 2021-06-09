import { DashboardClass } from './../../common/dashboard.class';
import { TransactionsInterface, WithdrawalInterface } from './../../transactions/transactions.service';

export class BoxMenuClass extends DashboardClass {

  constructor() {
    super();
  }

  // Get sum of objects time property
  getObjectTimePropertySum(investment: TransactionsInterface[]) {
    // get sum of time prop across all objects in array
    const total = investment.reduce((prev: any, cur: any) => {
      return prev + cur.period;
    }, 0);
    // return average of time
    return total / investment.length;
  }

  protected getPrincipal(principal: number, investment: TransactionsInterface[]) {
    return principal / investment.length;
  }

  // Get sum of amount property for withdrawal object
  getTotalPendingWithdrawal(withdrawals: WithdrawalInterface[]): number{
    let sum = 0;

    withdrawals.forEach((withdrawal: WithdrawalInterface) => {
      if (withdrawal.status === 'Pending') {
        sum += +withdrawal.amount;
      }
    })
    return sum;
  }

}
