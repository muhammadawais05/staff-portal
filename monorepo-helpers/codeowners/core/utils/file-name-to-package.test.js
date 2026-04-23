/* eslint-disable no-undef */
const fileNameToPackage = require('./file-name-to-package');

describe('fileNameToPackage', () => {
  it.each([
    { fileName: 'config/babel-preprocessor.js', expected: 'misc' },
    {
      fileName: 'monorepo-helpers/dependency-collector/index.js',
      expected: 'misc',
    },
  ])('returns "misc" for miscellaneous files', ({ fileName, expected }) => {
    expect(fileNameToPackage(fileName)).toBe(expected);
  });
  it.each([
    {
      fileName: 'hosts/staff-portal/src/hosts/main/hooks/use-dependencies.ts',
      expected: 'hosts/staff-portal',
    },
    {
      fileName: 'hosts/staff-portal/cypress/mocks/fragments/activity-mock.ts',
      expected: 'hosts/staff-portal/cypress',
    },
  ])('returns correct package name for hosts', ({ fileName, expected }) => {
    expect(fileNameToPackage(fileName)).toBe(expected);
  });

  it.each([
    {
      fileName:
        'libs/clipboard/src/services/use-copy-to-clipboard/use-copy-to-clipboard.test.tsx',
      expected: 'root/libs/clipboard',
    },
    {
      fileName:
        'libs/current-user/src/data/use-user-date-formatter/use-user-date-formatter.ts',
      expected: 'root/libs/current-user',
    },
  ])('return expected package name for root libs', ({ fileName, expected }) => {
    expect(fileNameToPackage(fileName)).toBe(expected);
  });

  it.each([
    {
      fileName:
        'namespaces/clients/libs/client-representatives/src/containers/RepresentativeForm/components/RepresentativeFormFields/RepresentativeFormFields.tsx',
      expected: 'clients/libs/client-representatives',
    },
    {
      fileName:
        'namespaces/facilities/apps/communication-tracking/src/components/EmailMessageListContentWrapper/EmailMessageListContentWrapper.tsx',
      expected: 'facilities/apps/communication-tracking',
    },
  ])(
    'return expected package name namespaced libs and apps',
    ({ fileName, expected }) => {
      expect(fileNameToPackage(fileName)).toBe(expected);
    }
  );
});
