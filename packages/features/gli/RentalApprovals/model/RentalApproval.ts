import { ProfessionalStatus } from '@features/common/model/ProfessionalStatus';
import { OwnerType } from '@features/gli/RentalApprovals/model/request';

export interface Subscription {
  id: string;
  organization: {
    id: string;
    name: string;
    type: number; // TODO enum
  };
}

export interface RentalApproval {
  externalId: number;
  isArchived: boolean;
  subscription: Subscription;
  status: GliRentalApprovalStatus;
  businessData: BusinessData;
  realEstateLot: RealEstateLot;
  owners: Owner[];
  tenants: Tenant[];
  policy: Policy;
  sequence: number;
  createDate: string;
  updateDate: string;
  id: string;
  idString: string;
  effectiveDate: string;
  guaranteeDeadline: string;
  references: {
    rentalApprovalRef: string;
    policyRef: string;
  };
}
interface Policy {
  externalFleetElementId: string;
  externalPolicyId: string;
  entryDate: string;
  leaseEffectiveDate: string;
  exitDate: string;
}
export interface BusinessData {
  realEstateUsage: number;
  hasFurnished: boolean;
  sittingTenant: boolean;
  rentAmount: number;
  chargesAmount: number;
  rentAmountWithCharges: number;
  depositAmount: number;
  isBalanceUpToDate: boolean;
  hadConflict: boolean;
  hasDepartureNotice: boolean;
  hasVisaleCoverage: boolean;
  startLeaseDate: string;
}
export type Guarantor = {
  id: string;
  professionalStatus: number;
  incomes?: number;
  hasAdditionalIncomes: boolean;
  incomesChangeAtLease: boolean;
  guarantor: {
    naturalEntity: NaturalEntity;
  };
  documentIds: DocumentId[];
  link: GuarantorLink;
};

export type Tenant = {
  id: string;
  professionalStatus: ProfessionalStatus;
  incomes?: number;
  hasAdditionalIncomes: boolean;
  incomesChangeAtLease: boolean;
  tenant: {
    naturalEntity: NaturalEntity;
  };
  guarantors: Guarantor[];
  documentIds: DocumentId[];
};
export const convertLabelProfessionalStatusMila = (status?: ProfessionalStatus) => {
  if (status == null) return 'Inconnue';

  switch (status) {
    case ProfessionalStatus.PrivateCDI:
      return 'Salarié en CDI, fonctionnaire ou militaire';
    case ProfessionalStatus.PrivateCDD:
      return 'Salarié en CDD, intérimaire ou intermittent';
    case ProfessionalStatus.IndepAuto:
      return 'Profession indépendante, profession libérale, artisan, auto-entrepreneur ou commerçant';
    case ProfessionalStatus.OtherEtudiant:
    case ProfessionalStatus.OtherResidenceEtudiant:
      return 'Etudiant ou apprenti avec caution';
    case ProfessionalStatus.OtherRetaite:
      return 'Retraité';
    case ProfessionalStatus.OtherRecherche:
      return "Demandeur d'emploi";
    case ProfessionalStatus.OtherAllowance:
      return 'Autre situation (AAH, rentes, allocations)';
    default:
      return 'Inconnue';
  }
};
export const convertLabelProfessionalStatus = (status?: ProfessionalStatus) => {
  if (status == null) return 'Inconnue';

  switch (status) {
    case ProfessionalStatus.PublicTitulaire:
      return 'Titulaire du public';
    case ProfessionalStatus.PublicCDI:
      return 'CDI';
    case ProfessionalStatus.PublicCDD:
      return 'CDD';
    case ProfessionalStatus.PublicMilitaire:
      return 'Militaire';
    case ProfessionalStatus.PrivateCDI:
      return 'CDI';
    case ProfessionalStatus.PrivateCDD:
      return 'CDD';
    case ProfessionalStatus.PrivateInterim:
      return 'Intérimaire';
    case ProfessionalStatus.PrivateIntermittent:
      return 'Intermittent';
    case ProfessionalStatus.IndepArtisant:
      return 'Artisan / Commerçant';
    case ProfessionalStatus.IndepAuto:
      return 'Auto-entrepreneur';
    case ProfessionalStatus.IndepLiberal:
      return 'Profession libéral';
    case ProfessionalStatus.IndepChef:
      return "Chef d'entreprise";
    case ProfessionalStatus.OtherEtudiant:
    case ProfessionalStatus.OtherResidenceEtudiant:
      return 'Etudiant';
    case ProfessionalStatus.OtherEtudiantAlternant:
    case ProfessionalStatus.OtherResidenceAlternant:
      return 'Etudiant Alternant';
    case ProfessionalStatus.OtherRetaite:
      return 'Retraité';
    case ProfessionalStatus.OtherRecherche:
      return "Recherche d'emploi";
    default:
      return 'Inconnue';
  }
};
interface DocumentId {
  id: string;
  externalId: string;
}
export interface Owner {
  documentIds: string[];
  role: number;
  type: number;
  externalId: string;
  naturalEntity: NaturalEntity;
  legalEntity: LegalEntity;
  subscription: Subscription;
  searchField: string;
  sequence: number;
  createDate: string;
  id: string;
  idString: string;
}
export interface Subscription {
  id: string;
  organization: {
    id: string;
    name: string;
    type: number;
  };
}

export interface NaturalEntity {
  externalId: string;
  title: number;
  firstName: string;
  lastName: string;
  birthDate: string;
  phone: Phone;
  email: string;
}
export interface Phone {
  phoneOrigin: string;
  phoneContryCode: string;
  phoneFormated: string;
}
export enum GliRentalApprovalStatus {
  Initialized = 10,
  Draft = 20,
  PendingDocument = 30,
  Pending = 40,
  Approved = 50,
  Rejected = 60,
  Cancelled = 70,
  Active = 80,
  FinishedScheduled = 90,
  Finished = 100,
}
export interface Address {
  fullAddress: string;
  country: string;
  address: string;
  zipCode: string;
  city: string;
  isManual: boolean;
}

export interface RealEstateLot {
  documentIds: string[];
  subscription: Subscription;
  externalId: string;
  address: Address;
  type: RealEstateLotType;
  surface: number;
  roomsNumber: number;
  floor: number;
  sequence: number;
  createDate: string;
  id: string;
  idString: string;
}
export enum RealEstateLotType {
  HOUSE = 1,
  APARTMENT = 2,
  REAL_ESTATE_PROPERTY = 3,
  PARKING = 4,
  ISOLATED_GARAGE = 5,
  BOX = 6,
  REAL_ESTATE_COMMERCIAL = 7,
  OTHER = 8,
}

export const labelRealEstateLotType = (status: RealEstateLotType) => {
  return {
    [RealEstateLotType.APARTMENT]: 'Appartement',
    [RealEstateLotType.HOUSE]: 'Maison',
  }[status];
};
export enum GuarantorLink {
  Parent = 1,
  FamilyMember = 2,
  Other = 3,
}
export const convertLabelGuarantorLinkStatus = (status?: GuarantorLink) => {
  if (status == null) return 'Inconnue';

  switch (status) {
    case GuarantorLink.FamilyMember:
      return 'Autre membre de votre famille';
    case GuarantorLink.Parent:
      return 'Parent/Tuteur légal';
    case GuarantorLink.Other:
      return 'Proche en dehors de votre famille';
    default:
      return 'Inconnue';
  }
};
export interface Entity {
  role: number;
  type: OwnerType;
  externalId: string;
  naturalEntity: NaturalEntity;
  legalEntity: LegalEntity;
  subscription: Subscription;
  searchField: string;
  sequence: number;
  createDate: string; // ISO date
  updateDate: string; // ISO date
  id: string;
  idString: string;
}
export interface LegalEntity {
  externalId: string;
  name: string;
  phone: Phone;
  email: string;
}
