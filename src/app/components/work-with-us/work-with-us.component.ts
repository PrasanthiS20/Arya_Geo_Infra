import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-work-with-us',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './work-with-us.component.html',
  styleUrl: './work-with-us.component.css'
})
export class WorkWithUsComponent {
  modalService = inject(ModalService);

  openQuote(): void {
    this.modalService.openQuoteModal();
  }
}
