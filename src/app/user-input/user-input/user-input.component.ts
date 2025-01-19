import { Component, EventEmitter, Output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import type { InvestmentInput } from '../../investment-input.model';

@Component({
  selector: 'app-user-input',
  imports: [FormsModule],
  templateUrl: './user-input.component.html',
  styleUrl: './user-input.component.css',
})
export class UserInputComponent {
  @Output() calculate = new EventEmitter<InvestmentInput>();
  userInitialInvestment: string = '0';
  userAnnualInvestment: string = '0';
  userExpectedReturn: string = '5%';
  userDuration: string = '10';

  onSubmit() {
    this.calculate.emit({
      initialInvestment: +this.userInitialInvestment,
      annualInvestment: +this.userAnnualInvestment,
      expectedReturn: +this.userExpectedReturn,
      duration: +this.userDuration,
    });
  }
}
