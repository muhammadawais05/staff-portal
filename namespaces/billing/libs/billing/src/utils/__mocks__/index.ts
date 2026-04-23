export * from '../index'

jest.mock('../index', () => ({
  ...jest.requireActual('../index'),
  useBillingBaseProps: () => ({
    currentUser: 'mockedCurrentUser',
    endpoints: {
      Gateway: 'examplePlatformUrl',
      Kipper: 'exampleKipperUrl',
      Platform: 'examplePlatformUrl'
    },
    isPicassoRendered: false,
    shouldInitSentry: false,
    throwBoundaryErrorsToHostApp: true,
    weekStartsOn: 0
  })
}))
