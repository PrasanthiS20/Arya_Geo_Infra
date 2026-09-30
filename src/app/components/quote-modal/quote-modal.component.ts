import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-quote-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './quote-modal.component.html',
  styleUrl: './quote-modal.component.css'
})
export class QuoteModalComponent {
  modalService = inject(ModalService);

  formData = {
    fullName: '',
    organization: '',
    email: '',
    phone: '',
    serviceType: '',
    projectLocation: '',
    timeline: 'Immediate (1-2 weeks)',
    scopeDetails: ''
  };

  isSubmitting = signal<boolean>(false);
  isSubmitted = signal<boolean>(false);

  close(): void {
    this.modalService.closeQuoteModal();
    setTimeout(() => {
      this.isSubmitted.set(false);
    }, 300);
  }

  onSubmit(): void {
    if (!this.formData.fullName || !this.formData.email) {
      return;
    }

    this.isSubmitting.set(true);

    // Simulate submission
    setTimeout(() => {
      this.isSubmitting.set(false);
      this.isSubmitted.set(true);
    }, 800);
  }
}
