import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MessageService } from 'primeng/api';

// PrimeNG Modules
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';
import { TagModule } from 'primeng/tag';

// Service
import { ReleveService, Releve, CompteurType } from '../../services/releve.service';

type TagSeverity = 'success' | 'secondary' | 'info' | 'warn' | 'danger' | 'contrast';

@Component({
  selector: 'app-releve',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    TableModule,
    ButtonModule,
    ToastModule,
    TooltipModule,
    TagModule
  ],
  providers: [MessageService, ReleveService],
  templateUrl: './releve.html',
  styleUrls: ['./releve.css']
})
export class ReleveComponent implements OnInit {
  releves: Releve[] = [];
  relevesFiltres: Releve[] = [];
  loading: boolean = false;
  totalRecords: number = 0;
  rows: number = 10;
  selectedCompteurType: string = 'TOUS';
  compteurTypes = [
    { label: 'Tous', value: 'TOUS' },
    { label: 'Eau', value: CompteurType.EAU },
    { label: 'Électricité', value: CompteurType.ELECTRICITE },
  ];

  constructor(
    private releveService: ReleveService,
    private messageService: MessageService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    console.log('🚀 Initialisation du composant Relevés');
    
    const token = localStorage.getItem('auth_token');
    console.log('📋 Token dans localStorage:', token ? '✅ Présent' : '❌ ABSENT');
    
    this.loadReleves();
  }

  loadReleves(event?: any): void {
    console.log('📥 Chargement des relevés');
    this.loading = true;
    
    const page = event?.first ? event.first / event.rows : 0;
    const size = event?.rows || 10;
    
    this.releveService.getReleves(page, size).subscribe({
      next: (response) => {
        console.log('✅ Relevés reçus:', response);
        this.releves = response.content || [];
        this.applyFilter();
        this.totalRecords = response.totalElements;
        this.loading = false;
        console.log('📊 Nombre relevés:', this.releves.length);
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('❌ Erreur relevés:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Erreur',
          detail: 'Impossible de charger les relevés'
        });
        this.loading = false;
      }
    });
  }

  onFilterChange(): void {
    console.log('🔍 Filtre appliqué:', this.selectedCompteurType);
    this.applyFilter();
  }

  private applyFilter(): void {
    if (this.selectedCompteurType === 'TOUS') {
      this.relevesFiltres = this.releves;
    } else {
      this.relevesFiltres = this.releves.filter(
        releve => releve.typeCompteur === this.selectedCompteurType
      );
    }
    console.log('📊 Relevés filtrés:', this.relevesFiltres.length);
    this.cdr.detectChanges();
  }

  
  getCompteurBadgeSeverity(type: CompteurType): TagSeverity {
    switch (type) {
      case CompteurType.EAU:
        return 'info';
      case CompteurType.ELECTRICITE:
        return 'warn';
      case CompteurType.GAZ:
        return 'danger';
      default:
        return 'secondary';
    }
  }

  
  formatDate(date: string): string {
    return new Date(date).toLocaleDateString('fr-FR');
  }

 
  getReleves(): Releve[] {
    return this.relevesFiltres;
  }

 
  getTotalFiltered(): number {
    return this.relevesFiltres.length;
  }
}