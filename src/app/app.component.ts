import { Component } from '@angular/core';
import { HeaderComponent } from './header/header/header.component';
import { UserInputComponent } from './user-input/user-input/user-input.component';

import type { InvestmentInput } from './investment-input.model';
import type { AnnualData } from './annual-data.model';
import { InvestmentResultsComponent } from "./investment-results/investment-results/investment-results.component";

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, UserInputComponent, InvestmentResultsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {

  resultsData?: AnnualData[] | undefined;

  onCalculateInvestmentResults(data: InvestmentInput) {
    const { initialInvestment, annualInvestment, expectedReturn, duration } =
      data;
    const annualData: AnnualData[] = [];
    let investmentValue = initialInvestment;

    let year = new Date().getFullYear();

    for (let i = 0; i < duration; i++) {
      year++
      const interestEarnedInYear = investmentValue * (expectedReturn / 100);
      investmentValue += interestEarnedInYear + annualInvestment;
      const totalInterest = investmentValue - annualInvestment * (i + 1) - initialInvestment;
      annualData.push({
        year: year,
        interest: interestEarnedInYear,
        valueEndOfYear: investmentValue,
        annualInvestment: annualInvestment,
        totalInterest: totalInterest,
        totalAmountInvested: initialInvestment + annualInvestment * (i + 1),
      });
    }

    this.resultsData = annualData;

  }
}
