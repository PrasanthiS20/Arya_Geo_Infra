import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-ceo-message',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ceo-message.component.html',
  styleUrl: './ceo-message.component.css'
})
export class CeoMessageComponent {
  modalService = inject(ModalService);

  openQuote(): void {
    this.modalService.openQuoteModal('General Infrastructure Consultation');
  }

  scrollTo(sectionId: string): void {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
