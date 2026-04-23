const noRestrictedImportsPaths = [
  {
    name: '@topkit/router',
    message: 'Please use "@staff-portal/navigation" instead'
  },
  {
    name: '@topkit/react-router',
    message: 'Please use "@staff-portal/navigation" instead'
  },
  {
    name: 'react-router',
    message: 'Please use "@staff-portal/navigation" instead'
  },
  {
    name: 'react-router-dom',
    message: 'Please use "@staff-portal/navigation" instead'
  },
  {
    name: '@apollo/client',
    message: "Please use '@staff-portal/data-layer-service' instead."
  },
  {
    name: '@graphql-typed-document-node/core',
    message: "Please use '@staff-portal/data-layer-service' instead."
  },
  {
    name: '@toptal/picasso',
    importNames: ['Link'],
    message: "Please import 'Link' from '@staff-portal/navigation' instead."
  },
  {
    name: '@toptal/picasso',
    importNames: ['Autocomplete'],
    message: "Please import 'Autocomplete' from '@staff-portal/ui' instead."
  },
  {
    name: '@toptal/picasso/test-utils',
    importNames: ['TestingPicasso'],
    message: "Use 'TestWrapper' from '@staff-portal/test-utils' instead."
  },
  {
    name: 'i18next',
    message: "Please use '@staff-portal/translation' instead."
  },
  {
    name: 'react-i18next',
    message: "Please use '@staff-portal/translation' instead."
  },
  {
    name: '@toptal/picasso/utils',
    importNames: ['useModal'],
    message: "Please use '@staff-portal/modals-service' instead."
  },
  {
    name: '@topkit/analytics-charts',
    message: "Please use '@staff-portal/charts' instead."
  },
  {
    name: '@toptal/picasso-charts',
    message: "Please use '@staff-portal/charts' instead."
  },
  {
    name: 'date-fns',
    message: "Please use '@staff-portal/date-time-utils' instead."
  },
  {
    name: 'date-fns/locale',
    message: "Please use '@staff-portal/date-time-utils' instead."
  },
  {
    name: 'date-fns-tz',
    message: "Please use '@staff-portal/date-time-utils' instead."
  },
  {
    name: 'react',
    importNames: ['lazy'],
    message: 'Please use @staff-portal/utils instead'
  },
  {
    name: '@staff-portal/operations',
    importNames: ['LazyOperation', 'useRenderLazyOperation'],
    message:
      "Please use the new Modal Api from '@staff-portal/modals-service' instead"
  }
]

const getFilteredNoRestrictedImportsPaths = name =>
  noRestrictedImportsPaths.filter(item => {
    if (Array.isArray(name)) {
      return !name.includes(item.name)
    }

    return name !== item.name
  })

const deprecatedProps = [
  {
    componentName: 'DetailedList',
    deprecatedProps: [
      {
        name: 'items',
        message:
          'Property `items` from `DetailedList` component is deprecated, please use JSX method instead.'
      }
    ]
  }
]

module.exports = {
  getFilteredNoRestrictedImportsPaths,
  deprecatedProps
}
