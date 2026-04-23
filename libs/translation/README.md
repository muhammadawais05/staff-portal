# Translation library

The translation library allows to add internationalization to an app.

## Setup

### Main application

Wrap the main application in the I18nProvider. Pass a translation object that
should be available globally.

```tsx
const App = () => {
  return (
    <I18nProvider translations={translations}>
      {/* application content */}
    </I18nProvider>
  )
}
```

### For every sub application

1. Create /translations folder with all namespaces

   ```text
   /translations
     /en
       common.json // example
       ... // other namespaces
       index.ts // export all namespaces { common: ..., ... }
     /de
       ... // same structure as for en
     index.ts // export all namespaces { en: ..., de: ... }
   ```

2. Add a resource bundle for every sub application that you would like to load,
   using addResourceBundle function (pass sub application name) or
   I18nNsProvider. In case you decide to pass translations with I18nNsProvider,
   step 3 is not needed

   ```ts
   import { lazy } from 'react'

   import { addResourceBundle } from '@staff-portal/translation'

   export default lazy(async () => {
     await import('./translations').then(({ default: translations }) =>
       addResourceBundle({ ns: 'invoices', translations })
     )

     return import('./Invoices')
   })
   ```

   ```ts
   import { addResourceBundle } from '@staff-portal/translation'
   import translations from './translations'

   addResourceBundle({ ns: 'invoices', translations })
   ```

   ```tsx
   const InternalData: FC = () => {
     return (
       <I18nNsProvider ns='invoices' translations={translations}>
         <SubComponent />
       </I18nNsProvider>
     )
   }
   ```

3. Wrap the sub application in I18nNsProvider. Pass the sub application name
   that you specified in addResourceBundle

   ```tsx
   const InternalData: FC = () => {
     return (
       <I18nNsProvider ns='invoices'>
         <SubComponent />
       </I18nNsProvider>
     )
   }
   ```

## Usage

### Single namespace, specific for the sub application

```tsx
const { translate } = useTranslation('payment')
// ...
return <Typography>{translate('actions.savePayment')}</Typography>
```

### Single namespace, available for all sub applications

When a module is shared between sub applications, prefix it with 'shared/'

```tsx
const { translate } = useTranslation('shared/common')
// ...
return <Typography>{translate('actions.save')}</Typography>
```

### Multiple namespaces, all specific for the sub application

```tsx
const { translate } = useTranslation(['payment', 'invoice'])
// ...
return (
  <>
    <Typography>{translate('payment:accountDetails.name')}</Typography>
    <Typography>{translate('invoice:invoiceDetails.name')}</Typography>
  </>
)
```

### Multiple namespaces, available for all sub applications

```tsx
const { translate } = useTranslation(['shared/common', 'shared/errors'])
// ...
return (
  <>
    <Typography>{translate('shared/common:actions.save')}</Typography>
    <Typography>{translate('shared/errors:notFound')}</Typography>
  </>
)
```

### Multiple namespaces, mixed

Some namespaces shared between sub applications, and some specific for the sub
application

```tsx
const { translate } = useTranslation(['payment', 'shared/errors'])
// ...
return (
  <>
    <Typography>{translate('payment:accountDetails.name')}</Typography>
    <Typography>{translate('shared/errors:notFound')}</Typography>
  </>
)
```
