import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface ClientProject {
  id: string;
  clientName: string;
  clientCategory: 'highways' | 'urban' | 'industrial' | 'commercial' | 'water';
  categoryLabel: string;
  logoInitial: string;
  location: string;
  projectTitle: string;
  scopeOfWork: string;
  impactMetrics: { label: string; value: string }[];
  deliverables: string[];
  toolsUsed: string[];
  status: 'Completed' | 'Ongoing' | 'Delivered';
}

@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.css'
})
export class ClientsComponent {
  selectedCategory = signal<string>('all');
  isAddModalOpen = signal<boolean>(false);
  successMessage = signal<string>('');

  // Form State
  newClientName = signal<string>('');
  newCategory = signal<'highways' | 'urban' | 'industrial' | 'commercial' | 'water'>('highways');
  newLocation = signal<string>('');
  newProjectTitle = signal<string>('');
  newScopeOfWork = signal<string>('');
  newMetric1 = signal<string>('');
  newDeliverables = signal<string>('');
  newTools = signal<string>('OpenRoads Designer, Civil 3D');

  categories = [
    { id: 'all', label: 'All Clients & Projects' },
    { id: 'highways', label: 'Highways & Expressways' },
    { id: 'urban', label: 'Urban & Smart Infrastructure' },
    { id: 'industrial', label: 'Industrial & Land Dev' },
    { id: 'commercial', label: 'Commercial & Townships' },
    { id: 'water', label: 'Water & Geospatial' }
  ];

  stats = [
    { value: '50+', label: 'Infrastructure Projects' },
    { value: '250+ km', label: 'Corridors & Roads Designed' },
    { value: '100%', label: 'Standard & MoRTH Compliance' },
    { value: '18+', label: 'Enterprise Clients Supported' }
  ];

  clientsList = signal<ClientProject[]>([
    {
      id: 'apex-infra',
      clientName: 'Apex Infra Concessionaires Pvt Ltd',
      clientCategory: 'highways',
      categoryLabel: 'Highways & Expressways',
      logoInitial: 'AI',
      location: 'Telangana & Andhra Pradesh Corridor',
      projectTitle: '4-Lane to 6-Lane Regional Greenfield Highway Corridor',
      scopeOfWork: 'Complete geometric alignment design, Bentley OpenRoads corridor modeling, subterranean utility conflict resolution, dynamic superelevation calculations, and tender-ready construction drawing sets.',
      impactMetrics: [
        { label: 'Corridor Length', value: '48.5 km' },
        { label: 'Earthwork Savings', value: '14.2%' },
        { label: 'Standards', value: 'IRC / MoRTH' }
      ],
      deliverables: [
        'Horizontal & Vertical Alignments',
        'Dynamic OpenRoads Cross-Sections & Templates',
        'Culvert & Cross-Drainage Hydraulic Profiling',
        'Quantity Take-Offs & Volumetric Earthwork BOQ'
      ],
      toolsUsed: ['OpenRoads Designer', 'Civil 3D', 'AutoCAD', 'AutoTURN'],
      status: 'Completed'
    },
    {
      id: 'metro-urban',
      clientName: 'Metro Urban Infrastructure & Development Corp',
      clientCategory: 'urban',
      categoryLabel: 'Urban & Smart Infrastructure',
      logoInitial: 'MU',
      location: 'Hyderabad Metropolitan Region',
      projectTitle: 'Smart Multi-Modal Transit Hub & Integrated Utilities',
      scopeOfWork: 'Comprehensive urban infrastructure engineering including master site grading, utility network mapping, stormwater drainage modeling, and road circulation design for rapid transit integration.',
      impactMetrics: [
        { label: 'Site Footprint', value: '320 Acres' },
        { label: 'Utility Clashes', value: 'Zero Clashes' },
        { label: 'Drainage Model', value: '1-in-50 Yr Flood' }
      ],
      deliverables: [
        'Subsurface Utility Engineering (SUE) 3D Model',
        'Stormwater Gravity Network Analysis',
        'Roundabout & Grade-Separated Intersection Layouts',
        'Digital As-Built CAD Handover Dossiers'
      ],
      toolsUsed: ['AutoCAD Civil 3D', 'StormCAD', 'Navisworks', 'QGIS'],
      status: 'Delivered'
    },
    {
      id: 'vantage-logistics',
      clientName: 'Vantage Logistics & Industrial Parks Ltd',
      clientCategory: 'industrial',
      categoryLabel: 'Industrial & Land Dev',
      logoInitial: 'VL',
      location: 'Shamshabad Industrial Zone, Hyderabad',
      projectTitle: 'Mega Multi-Tenant Logistics & Warehouse Master Development',
      scopeOfWork: 'Topographical drone LiDAR data processing, precision cut & fill earthwork balancing, internal heavy-duty pavement design, and site stormwater detention pond engineering.',
      impactMetrics: [
        { label: 'Master Layout', value: '110 Acres' },
        { label: 'Earthwork Balance', value: '98.5% Balanced' },
        { label: 'Pavement Type', value: 'Heavy Rigid Pavement' }
      ],
      deliverables: [
        'LiDAR DTM Mesh & Contour Processing',
        'Cut/Fill Heatmaps & Grading Optimization',
        'Truck Turning Swept Path Simulation',
        'Site Demarcation & Perimeter Security Drawings'
      ],
      toolsUsed: ['Civil 3D', 'Global Mapper', 'AutoTURN', 'AutoCAD'],
      status: 'Completed'
    },
    {
      id: 'horizon-realty',
      clientName: 'Horizon Realty & Township Builders',
      clientCategory: 'commercial',
      categoryLabel: 'Commercial & Townships',
      logoInitial: 'HR',
      location: 'Financial District & Gachibowli, Hyderabad',
      projectTitle: 'Integrated Mixed-Use Commercial Campus & High-Rise Towers',
      scopeOfWork: 'External arterial road junction improvements, multi-level basement grading support, municipal statutory drawing sets, and multi-disciplinary CAD federation.',
      impactMetrics: [
        { label: 'Built Area Support', value: '3.8M Sq.Ft' },
        { label: 'Statutory Approval', value: '100% First-Pass' },
        { label: 'Junction Capacity', value: '+35% Flow Rate' }
      ],
      deliverables: [
        'Arterial Access & Deceleration Lane Engineering',
        'Master Site Utility Coordination Plans',
        'Municipal Authority Submission Packages',
        '3D Visualizations & Flythrough Support'
      ],
      toolsUsed: ['AutoCAD Architecture', 'Civil 3D', 'InfraWorks', 'Bentley LumenRT'],
      status: 'Delivered'
    },
    {
      id: 'geohydel-corp',
      clientName: 'Geo-Hydel Water Resources & Irrigation Board',
      clientCategory: 'water',
      categoryLabel: 'Water & Geospatial',
      logoInitial: 'GH',
      location: 'Godavari Basin Command Area',
      projectTitle: 'Geospatial River Embankment & Watershed Delineation Study',
      scopeOfWork: 'Enterprise GIS geodatabase creation, multi-spectral satellite imagery classification, canal alignment digital terrain modeling, and hydraulic flood risk assessment.',
      impactMetrics: [
        { label: 'Basin Area', value: '620 Sq.Km' },
        { label: 'Canal Alignment', value: '64 km Network' },
        { label: 'Spatial Resolution', value: '0.5m DTM' }
      ],
      deliverables: [
        'Geodatabase & Thematic Cartography Maps',
        'Hydraulic Canal Profile & Cross-Sections',
        'Watershed Boundary Catchment Delineation',
        'Interactive Web GIS Map Portal Data'
      ],
      toolsUsed: ['ArcGIS Pro', 'QGIS', 'HEC-RAS', 'Leica Geo Office'],
      status: 'Completed'
    },
    {
      id: 'shrestha-civil',
      clientName: 'Shrestha Civil Infrastructure Contractors',
      clientCategory: 'highways',
      categoryLabel: 'Construction & Site Management',
      logoInitial: 'SC',
      location: 'Outer Ring Road (ORR) Connectivity Hub',
      projectTitle: 'Turnkey Civil Highway Execution & PMC Site Supervision',
      scopeOfWork: 'Turnkey site engineering supervision, QA/QC material testing verification (concrete cubes, bituminous mixes), subgrade density verification, and weekly progress milestone tracking.',
      impactMetrics: [
        { label: 'Project Scope', value: '18.4 km Roadway' },
        { label: 'QA/QC Audits', value: '120+ Test Dossiers' },
        { label: 'Milestone Adherence', value: 'On-Time Delivery' }
      ],
      deliverables: [
        'Daily Site Inspection & Quality Log Dossiers',
        'Total Station RTK Grade Control Verification',
        'Contractor Milestone Audits & Billing BOQ Verification',
        'As-Built Redline Conformance Certification'
      ],
      toolsUsed: ['Total Station GNSS', 'OpenRoads', 'Primavera P6', 'MS Project'],
      status: 'Ongoing'
    }
  ]);

  filteredClients = computed(() => {
    const cat = this.selectedCategory();
    const list = this.clientsList();
    if (cat === 'all') {
      return list;
    }
    return list.filter(c => c.clientCategory === cat);
  });

  setCategory(category: string): void {
    this.selectedCategory.set(category);
  }

  openAddModal(): void {
    this.isAddModalOpen.set(true);
    this.successMessage.set('');
  }

  closeAddModal(): void {
    this.isAddModalOpen.set(false);
  }

  addNewClient(): void {
    const name = this.newClientName().trim();
    if (!name) return;

    const words = name.split(' ').filter(w => w.length > 0);
    const initials = words.length > 1 ? (words[0][0] + words[1][0]).toUpperCase() : words[0].slice(0, 2).toUpperCase();

    const categoryMap: Record<string, string> = {
      highways: 'Highways & Expressways',
      urban: 'Urban & Smart Infrastructure',
      industrial: 'Industrial & Land Dev',
      commercial: 'Commercial & Townships',
      water: 'Water & Geospatial'
    };

    const newEntry: ClientProject = {
      id: 'client-' + Date.now(),
      clientName: name,
      clientCategory: this.newCategory(),
      categoryLabel: categoryMap[this.newCategory()] || 'Engineering Infrastructure',
      logoInitial: initials,
      location: this.newLocation().trim() || 'Hyderabad, Telangana',
      projectTitle: this.newProjectTitle().trim() || 'Infrastructure Design & Engineering Support',
      scopeOfWork: this.newScopeOfWork().trim() || 'ORD designs, highway design or land development can be done using any of those tools with full engineering precision.',
      impactMetrics: [
        { label: 'Status', value: 'Active' },
        { label: 'Scope', value: this.newMetric1().trim() || 'Standard Delivery' },
        { label: 'Quality', value: '100% Conformance' }
      ],
      deliverables: this.newDeliverables().trim()
        ? this.newDeliverables().split(',').map(d => d.trim()).filter(d => d.length > 0)
        : ['Engineering CAD/BIM Deliverables', 'Geometric Alignment & Grading Models', 'QA/QC Documentation'],
      toolsUsed: this.newTools().trim()
        ? this.newTools().split(',').map(t => t.trim()).filter(t => t.length > 0)
        : ['OpenRoads Designer', 'Civil 3D', 'AutoCAD'],
      status: 'Ongoing'
    };

    this.clientsList.update(list => [newEntry, ...list]);
    this.successMessage.set(`Client "${name}" added successfully!`);

    // Reset fields
    this.newClientName.set('');
    this.newLocation.set('');
    this.newProjectTitle.set('');
    this.newScopeOfWork.set('');
    this.newMetric1.set('');
    this.newDeliverables.set('');

    setTimeout(() => {
      this.closeAddModal();
    }, 1200);
  }
}
