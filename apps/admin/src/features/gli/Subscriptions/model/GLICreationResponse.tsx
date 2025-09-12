export interface GLICreationResponse {
  status: number;
  organization: Organization;
  gliIntegration: GLIIntegration;
  adbInformations: ADBInformations;
  documentIds: string[];
  applicationCount: number;
  activatedGLICount: number;
  openClaimsCount: number;
  totalRent: number;
  sequence: number;
  createDate: string;
  updateDate: string;
  id: string;
  idString: string;
}

export interface Organization {
  id: string;
  name: string;
  type: number;
}

export interface GLIIntegration {
  adbCode: string;
  premiumRate: number;
  addedAt: string;
}

export interface ADBInformations {
  companyName: string;
  address: Address;
  phone: Phone;
  email: string;
  creationDate: string;
  directorName: string;
  professionalCardNumber: string;
  guaranteeOrganization: string;
  guaranteeAmount: number;
  siren: string;
  isSyndic: boolean;
  isPropertyManagement: boolean;
  isTransaction: boolean;
  portfolioManagement: PortfolioManagement;
  hasPreviousInsurance: boolean;
  previousInsuranceInformation: PreviousInsuranceInformation;
  options: ADBOptions;
}

export interface Address {
  country: string;
  address: string;
  zipCode: string;
  city: string;
  isManual: boolean;
}

export interface Phone {
  phoneOrigin: string;
  phoneContryCode: string;
  phoneFormated: string;
}

export interface PortfolioManagement {
  housing: PortfolioDetails;
  commercial: PortfolioDetails;
  other: PortfolioDetails;
}

export interface PortfolioDetails {
  managedLotsCount: number;
  insuredLotsCount: number;
  averageRentAmount: number;
  highestRentAmount: number;
}

export interface PreviousInsuranceInformation {
  currentInsurerName: string;
  currentRate: number;
  monthlyPremiumAmount: number;
  anniversaryDate: string;
  isContractTerminated: boolean;
  terminationBy: number;
  terminationReason: string;
  currentSolvencyCriterion: number;
  plansMailingToOwners: boolean;
}

export interface ADBOptions {
  rentGuarantee: boolean;
  legalProtection: boolean;
  commercialLeases: boolean;
  vacancyCoverage: boolean;
  nonOccupantOwnerCoverage: boolean;
}
