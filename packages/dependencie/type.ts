export interface TypeDI {
  useStats: () => {
    averageRent: number;
    guaranteedTenants: number;
    openClaims: number;
    totalCandidates: number;
    validatedFiles: number;
  };
}