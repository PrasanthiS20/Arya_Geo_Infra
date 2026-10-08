import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { HeroComponent } from './components/hero/hero.component';
import { ServicesComponent } from './components/services/services.component';
import { ClientsComponent } from './components/clients/clients.component';
import { ApproachComponent } from './components/approach/approach.component';
import { CeoMessageComponent } from './components/ceo-message/ceo-message.component';
import { WhyUsComponent } from './components/why-us/why-us.component';
import { WorkWithUsComponent } from './components/work-with-us/work-with-us.component';
import { QuoteModalComponent } from './components/quote-modal/quote-modal.component';
import { ServiceModalComponent } from './components/service-modal/service-modal.component';
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    HeroComponent,
    ServicesComponent,
    ClientsComponent,
    ApproachComponent,
    CeoMessageComponent,
    WhyUsComponent,
    WorkWithUsComponent,
    QuoteModalComponent,
    ServiceModalComponent,
    FooterComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  title = 'Arya Geo Infra';
}
