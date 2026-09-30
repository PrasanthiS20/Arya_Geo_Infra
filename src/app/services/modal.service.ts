import { Injectable, signal } from '@angular/core';

export interface ServiceItem {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc?: string;
  category: 'design' | 'modeling' | 'gis' | 'engineering' | 'surveying';
  icon: string;
  features?: string[];
  tools?: string[];
}

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  isQuoteModalOpen = signal<boolean>(false);
  selectedServiceForQuote = signal<string>('');
  
  isServiceModalOpen = signal<boolean>(false);
  selectedService = signal<ServiceItem | null>(null);

  openQuoteModal(serviceTitle: string = ''): void {
    this.selectedServiceForQuote.set(serviceTitle);
    this.isQuoteModalOpen.set(true);
    document.body.style.overflow = 'hidden';
  }

  closeQuoteModal(): void {
    this.isQuoteModalOpen.set(false);
    this.selectedServiceForQuote.set('');
    document.body.style.overflow = '';
  }

  openServiceModal(service: ServiceItem): void {
    this.selectedService.set(service);
    this.isServiceModalOpen.set(true);
    document.body.style.overflow = 'hidden';
  }

  closeServiceModal(): void {
    this.isServiceModalOpen.set(false);
    this.selectedService.set(null);
    document.body.style.overflow = '';
  }
}
