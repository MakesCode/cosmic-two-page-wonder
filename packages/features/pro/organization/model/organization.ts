
export interface OrganizationBase {
  id: string;
  name: string;
  code: string;
  internalNote: string;
  address: AddressInformation;
  phone: Phone;
  type: OrganizationType;
  createDate: Date;
  updateDate?: Date;
  ownerUserId: string;
  salesLinked?: Array<UserDateRange>;
  organizationOption?: OrganizationOptionType;
  branded: OrganizationBranded;
  organizationDetailType?: OrganizationDetailType;
  organizationDetailArea?: OrganizationDetailArea;
  notificationEmailsExclude: NotificationEmailType[];
  subsidiaries?: Array<OrganizationTiny>;
  frameworkContractId?: string;
  contacts?: ContactBase[];
  website?: string;
  siret?: string;
}
export interface Phone {
  phoneOrigin: string;
  phoneContryCode: string;
  phoneFormated: string;
}
export interface Address {
  fullAddress: string;
  country: string;
  address: string;
  zipCode: string;
  city: string;
  isManual: boolean;
}
export interface AddressInformation {
  country?: string;
  codeCommuneINSEE?: string;
  address?: string;
  fullAddress?: string;
  zipCode?: string;
  city?: string;
  additionalAddress?: string;
  isManual?: boolean;
}

export enum OrganizationType {
  Owner,
  Agency,
  Partner,
}
export interface UserDateRange {
  user: UserTiny;
  startDate: Date;
  endDate: Date;
}
export interface UserTiny {
  id: string;
  userName: string;
}
export interface OrganizationOptionType {
  rewardType?: AffiliationType;
  rewardAmount?: number;
  allowProjectCreation?: boolean;
  allowApiUser?: boolean;
  allowControlService?: boolean;
  rewardStartMonth?: number;
  rewardStartYear?: number;
  allowStudentResidenceOffer?: boolean;
  allowStudentResidencePricing?: boolean;
  sendCertificateOnMyHomeWaiting?: boolean;
}
export enum AffiliationType {
  None = 0,
  Once = 1,
  Repeating = 2,
}
export interface OrganizationBranded {
  organizationId: string;
  name: string;
  route: string;
  imageName?: string;
  offerMessage: string;
  allowStudentResidenceOffer: boolean;
  subsidiaries: Subsidiaries[];
}

export interface Subsidiaries {
  id: string;
  name: string;
  type: number;
}
export enum OrganizationDetailType {
  RealEstateAgency = 'RealEstateType',
  RentalAgency = 'RentalTypeDetail',
  ProptechAgency = 'ProptechType',
  NonManagingAgency = 'NonManagingAgency',
  CRM = 'CRMType',
  Startup = 'StartupType',
  School = 'SchoolType',
  StudentResidence = 'StudentResidenceType',
  StudentAssociation = 'StudentAssociationType',
  SME = 'SMEType',
  Association = 'AssociationType',
  Notary = 'NotaryType',
  Concierge = 'ConciergeType',
  Fintech = 'FintechType',
  Other = 'OtherPrecise',
}

export enum OrganizationDetailArea {
  RealEstate = 'RealEstateArea',
  HR = 'HRArea',
  Freelance = 'FreelanceArea',
  Messenger = 'MessengerArea',
  Legal = 'LegalArea',
  Education = 'EducationArea',
  Insurance = 'InsuranceArea',
  Finance = 'FinanceArea',
  Social = 'SocialArea',
  Other = 'OtherPrecise',
}
export enum NotificationEmailType {
  DocumentValidatingEmail = 1,
  MyHomeValidatingEmail = 3,
  PaymentWaitingEmail = 4,
  ActiveProjectEmail = 7,
}
export interface OrganizationTiny {
  id: string;
  name: string;
  type: OrganizationType;
}
export interface ContactBase {
  id?: string;
  type: ContactType;
  address: AddressInformation;
  gender: number;
  firstName: string;
  lastName: string;
  organizationName: string;
  email: string;
  dateOfBirth: Date;
  phone: Phone;
}

export enum ContactType {
  None,
  Lessor,
  Claim,
  EndOfContract,
}

export enum Gender {
  men = 1,
  women = 2,
}

export interface ProfileApi {
  gender: Gender;
  firstName: string;
  lastName: string;
  email?: string;
  dateOfBirth: Date;
  phone?: Phone;
  id?: string;
  uniqueId?: string;
  pictureFileName?: string;
}
