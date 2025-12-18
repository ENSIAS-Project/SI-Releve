import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SidebarComponent } from '../../../shared/sidebar-component/sidebar-component';


// Interfaces améliorées
interface MenuItem {
  label: string;
  icon: string;
  route: string;
  badge?: number;
  badgeType?: 'info' | 'warning' | 'danger' | 'success';
}

interface Agent {
  id: number;
  nom: string;
  matricule: string;
  quartier: string;
  type: 'Eau' | 'Électricité' | 'Mixte';
  relevesParJour: number;
  totalReleves: number;
  performance: number; // -10 à +10
  statut: 'Actif' | 'Inactif' | 'Congé';
  derniereActivite: Date;
}

interface Quartier {
  id: number;
  nom: string;
  code: string;
  secteur: string;
  agents: number;
  releves: number;
  total: number;
  performance: number;
  tauxReleves: number;
  dernierReleve: Date;
  alertes: number;
}

interface KPI {
  label: string;
  valeur: number;
  variation: number;
  cible: number;
  statut: 'atteint' | 'en-retard' | 'en-avance' | 'critique';
  icone: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, SidebarComponent],
  templateUrl: './dashboard-component.html',
  styleUrls: ['./dashboard-component.css']
})
export class DashboardComponent implements OnInit {
  // CONFIGURATION DU SIDEBAR POUR ADMIN BACKOFFICE
  MenuItems: MenuItem[] = [
  
    {
      label: 'Tableau de Bord',
      icon: 'dashboard',
      route: '/admin-backoffice/dashboard',
  
    },
    {
      label: 'Gestion des compteurs',
      icon: 'meter',
      route: '/admin-backoffice/compteur' // Ajustez la route selon votre routing
    },
    {
      label: 'Gestion des relevés',
      icon: 'clipboard',
      route: '/admin-backoffice/releve'// Ajustez la route selon votre routing
    },
    {
      label: 'Affectation quartier',
      icon: 'map',
      route: '/admin/affectations' // Ajustez la route selon votre routing
    }
  ];
  
  userRole = 'Admin Backoffice';
  lastUpdate: Date = new Date();
  selectedMonth: string = '2025-01';
  selectedQuartier: string = 'tous';
  selectedType: string = 'tous';
  isLoading: boolean = false;
  tauxCouvertureTrend: number = 2.5; // en pourcentage

  // KPIs détaillés
  tauxCouverture: number = 78.3;
  compteurReleves: number = 8234;
  totalCompteurs: number = 10550;
  relevesParAgent: number = 42;
  totalAgents: number = 28;
  alertesAnomalies: number = 12;
  compteursEau: number = 5275;
  compteursElec: number = 5275;
  joursRestants: number = 15;
  objectifMensuel: number = 10550;
  progressionObjectif: number = 78;

  // KPIs structurés
  kpis: KPI[] = [
    {
      label: 'Taux de Couverture',
      valeur: 78.3,
      variation: 2.5,
      cible: 95,
      statut: 'en-retard',
      icone: '📊'
    },
    {
      label: 'Efficacité Agent',
      valeur: 42,
      variation: 5.2,
      cible: 40,
      statut: 'atteint',
      icone: '👥'
    },
    {
      label: 'Alertes Actives',
      valeur: 12,
      variation: -3,
      cible: 5,
      statut: 'critique',
      icone: '⚠️'
    },
    {
      label: 'Qualité Données',
      valeur: 94.2,
      variation: 1.8,
      cible: 90,
      statut: 'atteint',
      icone: '✅'
    }
  ];

  // Top agents
  topAgents: Agent[] = [
    {
      id: 1,
      nom: 'LAMRANI Ahmed',
      matricule: 'AG-001',
      quartier: 'Agdal',
      type: 'Mixte',
      relevesParJour: 52,
      totalReleves: 780,
      performance: 8.5,
      statut: 'Actif',
      derniereActivite: new Date('2025-01-15T14:30:00')
    },
    {
      id: 2,
      nom: 'BENJELLOUN Fatima',
      matricule: 'AG-002',
      quartier: 'Hassan',
      type: 'Eau',
      relevesParJour: 48,
      totalReleves: 720,
      performance: 7.2,
      statut: 'Actif',
      derniereActivite: new Date('2025-01-15T13:45:00')
    },
    {
      id: 3,
      nom: 'EL FASSI Mohamed',
      matricule: 'AG-003',
      quartier: 'Océan',
      type: 'Électricité',
      relevesParJour: 46,
      totalReleves: 690,
      performance: 6.8,
      statut: 'Actif',
      derniereActivite: new Date('2025-01-15T12:15:00')
    },
    {
      id: 4,
      nom: 'ALAOUI Sara',
      matricule: 'AG-004',
      quartier: 'Souissi',
      type: 'Mixte',
      relevesParJour: 44,
      totalReleves: 660,
      performance: 6.5,
      statut: 'Actif',
      derniereActivite: new Date('2025-01-15T11:30:00')
    },
    {
      id: 5,
      nom: 'TAZI Youssef',
      matricule: 'AG-005',
      quartier: 'Agdal',
      type: 'Électricité',
      relevesParJour: 43,
      totalReleves: 645,
      performance: 6.2,
      statut: 'Actif',
      derniereActivite: new Date('2025-01-15T10:45:00')
    }
  ];

  // Quartiers avec données enrichies
  quartiers: Quartier[] = [
    {
      id: 1,
      nom: 'Agdal',
      code: 'AQ-01',
      secteur: 'Centre-Ville',
      agents: 8,
      releves: 2450,
      total: 3100,
      performance: 8.2,
      tauxReleves: 79.0,
      dernierReleve: new Date('2025-01-15T16:00:00'),
      alertes: 3
    },
    {
      id: 2,
      nom: 'Hassan',
      code: 'HQ-02',
      secteur: 'Centre-Ville',
      agents: 7,
      releves: 2100,
      total: 2650,
      performance: 7.5,
      tauxReleves: 79.2,
      dernierReleve: new Date('2025-01-15T15:30:00'),
      alertes: 4
    },
    {
      id: 3,
      nom: 'Océan',
      code: 'OQ-03',
      secteur: 'Côtière',
      agents: 6,
      releves: 1850,
      total: 2300,
      performance: 7.8,
      tauxReleves: 80.4,
      dernierReleve: new Date('2025-01-15T14:45:00'),
      alertes: 2
    },
    {
      id: 4,
      nom: 'Souissi',
      code: 'SQ-04',
      secteur: 'Résidentiel',
      agents: 7,
      releves: 1834,
      total: 2500,
      performance: 7.2,
      tauxReleves: 73.4,
      dernierReleve: new Date('2025-01-15T13:15:00'),
      alertes: 3
    }
  ];

  // Données pour les filtres
  months = [
    { value: '2025-01', label: 'Janvier 2025' },
    { value: '2024-12', label: 'Décembre 2024' },
    { value: '2024-11', label: 'Novembre 2024' },
    { value: '2024-10', label: 'Octobre 2024' }
  ];

  quartierOptions = [
    { value: 'tous', label: 'Tous les quartiers' },
    { value: 'agdal', label: 'Agdal' },
    { value: 'hassan', label: 'Hassan' },
    { value: 'ocean', label: 'Océan' },
    { value: 'souissi', label: 'Souissi' }
  ];

  typeOptions = [
    { value: 'tous', label: 'Tous les types' },
    { value: 'eau', label: 'Eau uniquement' },
    { value: 'electricite', label: 'Électricité uniquement' }
  ];

  constructor() {}

  ngOnInit(): void {
    console.log('Dashboard initialisé');
    this.updateDashboardData();
    this.simulateRealTimeUpdates();
  }

  /**
   * Met à jour les données du dashboard
   */
  updateDashboardData(): void {
    this.isLoading = true;
    
    // Simulation de chargement de données
    setTimeout(() => {
      // Mise à jour de la dernière actualisation
      this.lastUpdate = new Date();
      
      // Simulation de variation des données
      this.tauxCouverture = this.getRandomVariation(78, 2);
      this.relevesParAgent = this.getRandomVariation(42, 3);
      this.alertesAnomalies = this.getRandomVariation(12, 5, true);
      
      this.isLoading = false;
      console.log('Données mises à jour:', this.lastUpdate);
    }, 500);
  }

  /**
   * Calcule le pourcentage de progression
   */
  calculatePourcentage(releves: number, total: number): number {
    if (total === 0) return 0;
    return Math.round((releves / total) * 100 * 10) / 10;
  }

  /**
   * Exporte le rapport mensuel
   */
  exportRapport(): void {
    console.log('Export du rapport mensuel...');
    
    const rapportData = {
      periode: this.getMonthLabel(this.selectedMonth),
      dateExport: new Date().toISOString(),
      kpis: this.kpis,
      quartiers: this.quartiers,
      topAgents: this.topAgents,
      resume: {
        tauxCouverture: this.tauxCouverture,
        totalReleves: this.compteurReleves,
        alertes: this.alertesAnomalies,
        agentsActifs: this.totalAgents
      }
    };
    
    console.log('Données du rapport:', rapportData);
    
    // Simulation d'export
    this.isLoading = true;
    setTimeout(() => {
      alert(`Rapport "${this.getMonthLabel(this.selectedMonth)}" exporté avec succès!`);
      this.isLoading = false;
      
      // Ici, vous pouvez intégrer jsPDF ou appeler votre API
      // this.generatePDF(rapportData);
    }, 1000);
  }

  /**
   * Gère le changement de filtre
   */
  onFilterChange(): void {
    console.log(`Filtres: Mois=${this.selectedMonth}, Quartier=${this.selectedQuartier}, Type=${this.selectedType}`);
    
    // Simulation de filtrage
    if (this.selectedQuartier !== 'tous') {
      const quartierFiltered = this.quartiers.find(q => 
        q.nom.toLowerCase() === this.selectedQuartier.toLowerCase()
      );
      
      if (quartierFiltered) {
        this.updateFilteredData(quartierFiltered);
      }
    }
    
    this.updateDashboardData();
  }

  /**
   * Réinitialise tous les filtres
   */
  resetFilters(): void {
    this.selectedMonth = '2025-01';
    this.selectedQuartier = 'tous';
    this.selectedType = 'tous';
    
    console.log('Filtres réinitialisés');
    this.updateDashboardData();
  }

  /**
   * Obtient le label du mois sélectionné
   */
  getMonthLabel(monthValue: string): string {
    const month = this.months.find(m => m.value === monthValue);
    return month ? month.label : 'Mois inconnu';
  }

  /**
   * Obtient le nombre de résultats filtrés
   */
  getFilteredCount(): number {
    if (this.selectedQuartier === 'tous') {
      return this.compteurReleves;
    }
    
    const quartier = this.quartiers.find(q => 
      q.nom.toLowerCase() === this.selectedQuartier.toLowerCase()
    );
    
    return quartier ? quartier.releves : this.compteurReleves;
  }

  /**
   * Détermine le niveau de performance
   */
  getPerformanceLevel(releves: number): string {
    if (releves >= 50) return 'Excellente';
    if (releves >= 40) return 'Bonne';
    if (releves >= 30) return 'Moyenne';
    return 'À améliorer';
  }

  /**
   * Détermine le niveau d'alerte
   */
  getAlertLevel(alertes: number): string {
    if (alertes >= 20) return 'Critique';
    if (alertes >= 10) return 'Élevé';
    if (alertes >= 5) return 'Moyen';
    return 'Faible';
  }

  /**
   * Calcule le pourcentage de compteurs eau
   */
  getEauPercentage(): number {
    const total = this.compteursEau + this.compteursElec;
    return total > 0 ? Math.round((this.compteursEau / total) * 100) : 0;
  }

  /**
   * Calcule le pourcentage de compteurs électricité
   */
  getElecPercentage(): number {
    const total = this.compteursEau + this.compteursElec;
    return total > 0 ? Math.round((this.compteursElec / total) * 100) : 0;
  }

  /**
   * Obtient le statut d'un quartier
   */
  getQuartierStatus(pourcentage: number): string {
    if (pourcentage >= 90) return 'success';
    if (pourcentage >= 75) return 'warning';
    return 'danger';
  }

  /**
   * Formate un nombre avec séparateur de milliers
   */
  formatNumber(value: number): string {
    return new Intl.NumberFormat('fr-FR').format(value);
  }

  /**
   * Formatte une date
   */
  formatDate(date: Date): string {
    return new Intl.DateTimeFormat('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  }

  /**
   * Méthodes d'actions (à implémenter)
   */
  viewAnomalies(): void {
    console.log('Navigation vers les anomalies...');
    // this.router.navigate(['/admin/alertes']);
  }

  viewAllAgents(): void {
    console.log('Navigation vers tous les agents...');
    // this.router.navigate(['/admin/agents']);
  }

  viewQuartierDetails(quartier: Quartier): void {
    console.log(`Détails du quartier: ${quartier.nom}`);
    // this.router.navigate(['/admin/quartiers', quartier.id]);
  }

  generateReport(): void {
    console.log('Génération de rapport personnalisé...');
    this.exportRapport();
  }

  viewAlerts(): void {
    console.log('Voir toutes les alertes...');
    // this.router.navigate(['/admin/alertes']);
  }

  manageAgents(): void {
    console.log('Gestion des agents...');
    // this.router.navigate(['/admin/agents']);
  }

  systemSettings(): void {
    console.log('Paramètres système...');
    // this.router.navigate(['/admin/parametres']);
  }

  /**
   * Méthodes privées utilitaires
   */
  private simulateRealTimeUpdates(): void {
    // Simulation de mises à jour en temps réel
    setInterval(() => {
      // Mise à jour aléatoire des KPIs
      this.tauxCouverture = this.getRandomVariation(this.tauxCouverture, 0.5);
      this.relevesParAgent = this.getRandomVariation(this.relevesParAgent, 1);
      
      // Mise à jour de la dernière activité
      this.lastUpdate = new Date();
    }, 30000); // Toutes les 30 secondes
  }

  private getRandomVariation(base: number, range: number, integer: boolean = false): number {
    const variation = (Math.random() * 2 - 1) * range;
    const newValue = base + variation;
    return integer ? Math.round(newValue) : Math.round(newValue * 10) / 10;
  }

  private updateFilteredData(quartier: Quartier): void {
    // Mise à jour des KPIs basés sur le quartier filtré
    this.tauxCouverture = quartier.tauxReleves;
    this.compteurReleves = quartier.releves;
    this.alertesAnomalies = quartier.alertes;
    
    // Filtrage des agents
    this.topAgents = this.topAgents.filter(agent => 
      agent.quartier.toLowerCase() === quartier.nom.toLowerCase()
    );
  }
}