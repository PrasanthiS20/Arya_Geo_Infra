import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-why-us',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './why-us.component.html',
  styleUrl: './why-us.component.css'
})
export class WhyUsComponent {
  features = [
    {
      id: 'experienced-pros',
      title: 'Experienced Professionals',
      desc: 'A team supported by experienced engineering professionals with practical industry knowledge.',
      icon: 'users'
    },
    {
      id: 'technology-driven',
      title: 'Technology Driven',
      desc: 'We utilize modern engineering and design platforms to improve accuracy and productivity.',
      icon: 'cpu'
    },
    {
      id: 'project-focused',
      title: 'Project Focused',
      desc: 'Our services are structured around the specific technical requirements and objectives of each project.',
      icon: 'target'
    },
    {
      id: 'quality-accuracy',
      title: 'Quality & Accuracy',
      desc: 'We emphasize precision in drawings, designs, documentation, and engineering deliverables.',
      icon: 'shield-check'
    },
    {
      id: 'timely-delivery',
      title: 'Timely Delivery',
      desc: 'We understand project schedules and work toward delivering agreed outputs within the required timelines.',
      icon: 'clock'
    }
  ];
}
