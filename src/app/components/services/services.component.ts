import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalService, ServiceItem } from '../../services/modal.service';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './services.component.html',
  styleUrl: './services.component.css'
})
export class ServicesComponent {
  modalService = inject(ModalService);

  showAll = signal<boolean>(true);
  searchQuery = signal<string>('');
  selectedCategory = signal<string>('all');

  services: ServiceItem[] = [
    {
      id: 'highway-road-design',
      title: 'Highway & Road Design',
      shortDesc: 'Optimized geometric design for regional and urban road and highway networks.',
      category: 'design',
      icon: 'road',
      fullDesc: 'Comprehensive horizontal and vertical alignment design, cross-sectional modeling, junction and interchange engineering adhering to IRC, AASHTO, and DMRB international standards.',
      features: ['Horizontal & Vertical Alignments', 'Junction & Roundabout Design', 'Sight Distance Analysis', 'Pavement Thickness Design'],
      tools: ['OpenRoads Designer', 'Civil 3D', 'AutoCAD', 'AutoTURN']
    },
    {
      id: 'autocad-design-drafting',
      title: 'AutoCAD Design & Drafting',
      shortDesc: 'Precise 2D drafting and detailing that keeps engineering deliverables consistent and accurate.',
      category: 'design',
      icon: 'drafting',
      fullDesc: 'High-precision CAD drafting covering general arrangement drawings, structural details, utilities layout, and municipal standard compliance with layered CAD standards.',
      features: ['2D Geometric Detailing', 'Standard Layering & Legends', 'Utility Conflict Overlays', 'Tender-Ready Drawing Sets'],
      tools: ['AutoCAD', 'Bentley MicroStation', 'AutoCAD Map 3D']
    },
    {
      id: 'openroads-designer',
      title: 'OpenRoads Designer Services',
      shortDesc: "Expert implementation of Bentley's advanced modeling environment for corridor and roadway projects.",
      category: 'modeling',
      icon: 'corridor',
      fullDesc: 'Dynamic corridor modeling, template authoring, subterranean utility integration, dynamic earthwork balancing, and multi-disciplinary federation in Bentley OpenRoads.',
      features: ['Parametric Corridor Modeling', 'Subsurface Utility Engineering', 'Dynamic Superelevation Rules', 'Automated Cross-Sections'],
      tools: ['Bentley OpenRoads Designer CONNECT', 'ProjectWise', 'ContextCapture']
    },
    {
      id: 'infrastructure-engineering',
      title: 'Infrastructure Engineering',
      shortDesc: 'Practical engineering solutions for roads, highways, land development, and other infrastructure projects.',
      category: 'engineering',
      icon: 'bridge',
      fullDesc: 'Holistic infrastructure design services encompassing stormwater drainage systems, culvert analysis, access roads, grade separations, and municipal utility networks.',
      features: ['Stormwater & Culvert Hydraulics', 'Earthwork Balancing & Grading', 'Urban Infrastructure Systems', 'Access Management'],
      tools: ['Civil 3D', 'StormCAD', 'HEC-RAS', 'AutoCAD']
    },
    {
      id: 'land-development-planning',
      title: 'Land Development Planning & Design',
      shortDesc: 'Planning and design support for land development projects from initial concept through execution.',
      category: 'design',
      icon: 'land',
      fullDesc: 'Master site layout, site grading, cut/fill optimization, internal road circulation, utility plot mapping, and environmental sustainability alignment.',
      features: ['Master Site Planning', 'Cut & Fill Optimization', 'Access & Parking Circulation', 'Plot Demarcation Plans'],
      tools: ['Civil 3D', 'QGIS', 'AutoCAD', 'InfraWorks']
    },
    {
      id: 'surveying-engineering-support',
      title: 'Surveying & Engineering Support',
      shortDesc: 'Field-to-office surveying support and dependable engineering data handling for every project stage.',
      category: 'surveying',
      icon: 'theodolite',
      fullDesc: 'Total Station & GNSS/RTK field survey data reduction, traverse balancing, benchmark network verification, control point establishment, and CAD surface creation.',
      features: ['GNSS/RTK & DGPS Data Reduction', 'Traverse & Network Balancing', 'Digital Terrain Modeling (DTM)', 'Boundary Demarcation'],
      tools: ['Leica Geo Office', 'Trimble Business Center', 'Civil 3D']
    },
    {
      id: 'gis-geospatial-solutions',
      title: 'GIS & Geospatial Solutions',
      shortDesc: 'Spatial data analysis and map-based information systems that support better project decisions.',
      category: 'gis',
      icon: 'globe',
      fullDesc: 'Geodatabase design, spatial querying, land use classification, watershed delineation, asset management GIS mapping, and web-based interactive map viewers.',
      features: ['Spatial Multi-Criteria Analysis', 'Enterprise Geodatabases', 'Thematic Cartography', 'Web GIS & Asset Portals'],
      tools: ['ArcGIS Pro', 'QGIS', 'PostGIS', 'Google Earth Engine']
    },
    {
      id: 'topographical-data-processing',
      title: 'Topographical & Infrastructure Data Processing',
      shortDesc: 'Accurate processing of topographical and infrastructure survey data, ready for design use.',
      category: 'surveying',
      icon: 'contour',
      fullDesc: 'LiDAR point cloud filtering, contour generation, breakline definition, TIN mesh optimization, and survey-to-BIM seamless format conversion.',
      features: ['LiDAR Point Cloud Classification', 'Contour & Slope Raster Creation', 'Feature Code Processing', 'Surface Quality Verification'],
      tools: ['CloudCompare', 'Global Mapper', 'AutoCAD Civil 3D']
    },
    {
      id: 'quantity-estimation-boq',
      title: 'Quantity Estimation & BOQ Support',
      shortDesc: 'Reliable quantity take-offs and bill of quantities support for estimates and tenders.',
      category: 'engineering',
      icon: 'calculator',
      fullDesc: 'Detailed earthwork volumetric computations, material take-offs from 3D models, standard schedule of rates (SoR) mapping, and tender estimate compilation.',
      features: ['Earthwork Cut/Fill Volumetrics', 'Linear & Area Material Takeoffs', 'BOQ Preparation (CPWD / MoRTH)', 'Cost Modeling & Rate Analysis'],
      tools: ['Excel Advanced / Power Query', 'Civil 3D Takeoff', 'CostX']
    },
    {
      id: 'as-built-drawings',
      title: 'As-Built Drawings & Documentation',
      shortDesc: 'Precise record drawings and complete documentation for completed infrastructure assets.',
      category: 'design',
      icon: 'document',
      fullDesc: 'Post-construction verification drawings, redline incorporations, asset handover dossiers, and compliance documentation for client and authority sign-offs.',
      features: ['Redline Markup Integration', 'Asset Verification Drawings', 'Conformance Reporting', 'Digital Handover Dossiers'],
      tools: ['AutoCAD', 'Bentley MicroStation', 'Adobe Acrobat Pro']
    },
    {
      id: '3d-digital-infrastructure',
      title: '3D / Digital Infrastructure Solutions',
      shortDesc: '3D modeling and digital infrastructure workflows for smarter, more visual project delivery.',
      category: 'modeling',
      icon: 'cube',
      fullDesc: '3D parametric infrastructure modeling, clash detection, digital twin representation, stakeholder animation walkthroughs, and BIM Level 2 integration.',
      features: ['3D Parametric Asset Modeling', 'Multi-Discipline Clash Detection', 'Flythrough Video Animations', 'Digital Twin Data Integration'],
      tools: ['Navisworks', 'InfraWorks', 'Bentley LumenRT', 'Blender']
    },
    {
      id: 'engineering-consultancy',
      title: 'Engineering Consultancy & Project Support',
      shortDesc: 'Dependable engineering advice and project support from initial planning through execution.',
      category: 'engineering',
      icon: 'briefcase',
      fullDesc: 'Independent peer reviews, techno-commercial feasibility studies, design optimization recommendations, statutory approvals support, and technical project management.',
      features: ['Design Peer Review & Audit', 'Techno-Commercial Feasibility', 'Project Schedule Advisory', 'Vendor & Submittal Verification'],
      tools: ['MS Project', 'Primavera P6', 'Technical QA Matrices']
    },
    {
      id: 'civil-highway-construction',
      title: 'Civil & Highway Construction',
      shortDesc: 'End-to-end execution of roadway, highway, earthwork, and civil infrastructure construction projects — ORD designs, highway design or land development can be done using any of those tools.',
      category: 'construction',
      icon: 'construction',
      fullDesc: 'Turnkey civil and highway construction execution covering site clearing, subgrade stabilization, granular sub-base (GSB), wet mix macadam (WMM), asphalt and rigid concrete paving, culverts, and roadside drainage systems. ORD designs, highway design or land development can be done using any of those tools.',
      features: ['ORD, Highway & Land Development Tools Execution', 'Highway & Urban Paving (Flexible & Rigid)', 'Bulk Earthwork & Subgrade Stabilization', 'Cross-Drainage, Culverts & Minor Bridges', 'Roadside Utilities & Stormwater Infrastructure'],
      tools: ['OpenRoads Designer (ORD)', 'Civil 3D & AutoCAD', 'Heavy Fleet Telematics', 'Batching Plant Automation', 'Total Station Grade Control', 'MoRTH & IRC Specifications']
    },
    {
      id: 'construction-project-management',
      title: 'Construction Management & Site Supervision',
      shortDesc: 'Comprehensive on-site supervision, milestone tracking, work sequencing, and safety compliance — ORD designs, highway design or land development can be done using any of those tools.',
      category: 'construction',
      icon: 'hard-hat',
      fullDesc: 'Dedicated on-site construction supervision and project management consultancy (PMC). ORD designs, highway design or land development can be done using any of those tools. We ensure strict adherence to engineering drawings, contractor coordination, daily site logs, HSE safety standards, and milestone delivery.',
      features: ['Multi-Platform Tool Integration (ORD, Civil 3D, CAD)', 'Daily Site Inspection & Progress Logging', 'Contractor Coordination & Work Sequencing', 'Critical Path Method (CPM) Schedule Tracking', 'Site HSE & Safety Compliance Audits'],
      tools: ['OpenRoads Designer', 'Primavera P6', 'MS Project', 'Field Inspection Apps', 'Site Audit Logs']
    },
    {
      id: 'construction-qa-qc-testing',
      title: 'Construction QA/QC & Material Testing',
      shortDesc: 'Rigorous quality control, field inspections, and laboratory material testing ensuring standard compliance.',
      category: 'construction',
      icon: 'testing',
      fullDesc: 'Comprehensive quality assurance and quality control (QA/QC) programs covering field density testing, concrete slump and cube compression testing, bitumen extraction, aggregate grading, and standard conformance certification. ORD designs, highway design or land development can be done using any of those tools.',
      features: ['Compaction & Field Density Testing', 'Concrete & Bituminous Mix Quality Audits', 'Non-Destructive Testing (NDT) & Rebar Verification', 'Quality Inspection Test Plans (ITP) & Sign-Offs'],
      tools: ['IS / IRC / ASTM Standards', 'Calibration Matrices', 'QA/QC Test Dossiers', 'Material Testing Protocols']
    },
    {
      id: 'site-development-earthworks',
      title: 'Site Development & Earthworks Execution',
      shortDesc: 'Precision grading, bulk excavation, ground improvement, and utilities execution for large-scale sites — ORD designs, highway design or land development can be done using any of those tools.',
      category: 'construction',
      icon: 'earthwork',
      fullDesc: 'Specialized site development and earthwork contracting services including precision cut/fill grading, slope stabilization, retaining walls, underground utility trenches, and plot demarcation for industrial parks and commercial developments. ORD designs, highway design or land development can be done using any of those tools.',
      features: ['ORD, Highway & Land Development Surface Modeling', 'Precision Cut & Fill Grading', 'Retaining Walls & Soil Slope Stabilization', 'Underground Utility Trenching & Ducts', 'Industrial & Commercial Site Preparation'],
      tools: ['OpenRoads Designer', 'Civil 3D Surface Verification', '3D Machine Control Systems', 'Compaction Rollers', 'Drainage Networks']
    }
  ];

  filteredServices = computed(() => {
    let list = this.services;

    const cat = this.selectedCategory();
    if (cat !== 'all') {
      list = list.filter(s => s.category === cat);
    }

    const query = this.searchQuery().trim().toLowerCase();
    if (query) {
      list = list.filter(s => 
        s.title.toLowerCase().includes(query) || 
        s.shortDesc.toLowerCase().includes(query)
      );
    }

    if (!this.showAll() && !query && cat === 'all') {
      return list.slice(0, 6);
    }

    return list;
  });

  toggleShowAll(): void {
    this.showAll.update(v => !v);
  }

  setCategory(cat: string): void {
    this.selectedCategory.set(cat);
  }

  openServiceDetails(service: ServiceItem): void {
    this.modalService.openServiceModal(service);
  }

  requestQuoteForService(service: ServiceItem, event: Event): void {
    event.stopPropagation();
    this.modalService.openQuoteModal(service.title);
  }
}
