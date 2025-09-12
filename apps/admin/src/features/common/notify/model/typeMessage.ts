export enum TypeNotifyMessage {
  errorApi = 'ERROR_API',
}
export const messageNotify = {
  [TypeNotifyMessage.errorApi]: 'Une erreur est survenu.',
  ['E0265']: "Le code de l'attestation n'est pas valide.",
  ['E0275']: 'Vous ne pouvez plus postuler, les candidatures sont terminées.',
  ['E0267']: "L'analyse est toujours en cours. Veuillez réessayer ultérieurement.",
  ['E0251']: 'Code incorrect, veuillez réessayer.',
};
