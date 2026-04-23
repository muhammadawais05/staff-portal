export enum RouteAvailability {
  // page is fully disabled and filtered out from production
  IN_DEVELOPMENT = 'IN_DEVELOPMENT',
  // page is enabled in beta, and it will further check chameleon experiments
  BETA = 'BETA',
  // page is always enabled
  RELEASED = 'RELEASED'
}
