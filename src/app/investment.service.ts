import { Injectable, signal } from "@angular/core";
import { InvestmentInput } from "./investment-input.model";
import { AnnualData } from "./annual-data.model";

@Injectable({ providedIn: 'root' })
export class InvestmentService{
    
    resultData= signal<AnnualData[] | undefined>(undefined);

    calculateInvestmentResults(data: InvestmentInput) {
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
    
        this.resultData.set(annualData);
      }
}