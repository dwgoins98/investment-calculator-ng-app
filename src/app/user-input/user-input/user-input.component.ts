import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InvestmentService } from '../../investment.service';

@Component({
  selector: 'app-user-input',
  imports: [FormsModule],
  templateUrl: './user-input.component.html',
  styleUrl: './user-input.component.css',
})
export class UserInputComponent {
  userInitialInvestment = signal<string>('0');
  userAnnualInvestment = signal<string>('0');
  userExpectedReturn = signal<string>('5%');
  userDuration = signal<string>('10');

  constructor(private investmentService: InvestmentService) {}

  onSubmit() {
    this.investmentService.calculateInvestmentResults({
      initialInvestment: +this.userInitialInvestment(),
      annualInvestment: +this.userAnnualInvestment(),
      expectedReturn: +this.userExpectedReturn(),
      duration: +this.userDuration(),
    });

    this.userInitialInvestment.set('0');
    this.userAnnualInvestment.set('0');
    this.userExpectedReturn.set('5%');
    this.userDuration.set('10');
  }
}
