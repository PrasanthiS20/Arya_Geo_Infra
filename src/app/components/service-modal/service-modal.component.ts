import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-service-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './service-modal.component.html',
  styleUrl: './service-modal.component.css'
})
export class ServiceModalComponent {
  modalService = inject(ModalService);

  close(): void {
    this.modalService.closeServiceModal();
  }

  requestQuote(): void {
    const service = this.modalService.selectedService();
    this.modalService.closeServiceModal();
    if (service) {
      this.modalService.openQuoteModal(service.title);
    } else {
      this.modalService.openQuoteModal();
    }
  }
}
