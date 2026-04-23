# 📦 Developing components for inclusion on `platform`

## Overview

The strategy taken consists of producing a standalone
[npm frontend package](https://docs.npmjs.com/packages-and-modules/), containing
all available, injectable components, published to the registry, which can then
be included as a dependency on the host (i.e. the `platform` web app.)

Once installed on `platform`, the developer can inject any of the package
components,on any location of the application, following the instructions on
next section.

> 📚 Based on gral. instructions posted
> [here](https://github.com/toptal/platform/blob/bil-273-poc-version-of-billing-frontend-linking-to-platform/docs/frontend/react_architecture.md#-creating-react-components).

## React packs in Platform

In order to follow our previous architecture agreement about separated bundles
on the platform, we've introduced new `convention` called React-Packs which are
isolated and lazy loaded parts (bundles) of components loaded to the platform.
They consist of all vendor packages related to them, styles and minified
javascript. They are completely isolated and independent from our old Backbone
framework so they could be shipped with cutting-edge versions of ES6, React
libraries and stuff related to the React development nowadays.

### 1. Creating a new React bundle

To create a new React bundle you have to first determine its logical name. At
the moment we are relying on one single bundle called `billing`. In order to
instruct Webpack to compile our new bundle, we first need to add its name to the
[entries.js](https://github.com/toptal/platform/blob/23b1078a231935f4edd50c2d2bf3dc79c43db1d5/front/configs/webpack/entries.js#L40),
section `REACT_PACKS`. This will generate our final asset files which in this
case means `platform_react_billing`.

Webpack is looking for its entry point at the strict location which at the
current time can't be changed to maintain consistency.

`/app/assets/features/platform/billing/index.jsx`

This entry point should `bootstrap` all mountable components so let's start with
a simple example as:

```js
import ./components/BillingCycles
```

This will instruct Webpack to export `./components/BillingCycles` as an
identifier for our special React helper to mount it.

💡 **_TIP:_** All components which are meant to be mounted to the DOM as
separate components need to be imported in this file otherwise our helper won't
find it. That means if the bundle has also e.g. an `Invoices` component, if you
wish to use `Invoices` independently on a location, you need to add
`import ./components/Invoices` to the entry point.

```js
import "./components/BillingCycles"
import "./components/Invoices"
...
```

etc.

### 2. Injecting the React component

To expose one component from our package, to be injected on `platform`, we
create an `index.jsx` file for it, on it's own directory under `components`.:

`/app/assets/features/platform/billing/components/BillingCycles/index.jsx`

```js
export { BillingCycles } from 'billing-frontend'
```

💡 **_TIP:_** All components which will be mounted to DOM must follow the
convention about path `/components/ComponentName/index.jsx` this means you can't
have `/components/Button.jsx` as name for the component which should be mounted
via helper but you are still free to follow namespacing and import such a
components from the parent components.

### 3. Mounting the Components

In order to mount our previously created `BillingCycles` component from within
`.slim` template we can easily recall helper:

```slim
= react_component('billing#BillingCycles', props: {})
```

Naming convention consists of 2 parts:

**billing**_#FancyBillingCyclesButton_

1. **billing** - Path to our previously created React Pack which we added to the
   Webpack entries.
2. \_#BillingCycles - Path to our created component.

💡 **_TIP:_** Components are located based on their path, not `ClassName` that
means you can `export default MyOwnBIllingCycles` as long as it's located on
`/components/BillingCycles/index.jsx` but you will violate our ESLint rules.

### 4. Including generated bundles to the application

As mentioned above React Packs are lazy-loaded only in places when they are
needed. That means we need to include its `JS` and `CSS` files in place. It can
be done by using the helper for React Packs:

```slim
= content_for :features_js do
  = react_pack('billing', :js)
```

This will instruct our helper automatically inject `platform_react_billing.js`
to the page load so we can dynamically invoke the components and mount them.

If you followed all steps you can try to open the console and see if your
component was successfully mounted. You should see something similar in a
`console`.

`[React-Rails] Mounting React component 'BillingCycles' from pack 'billing'`

If you don't see any errors in the console then congratulations to your first
React Pack!

### 5. Debugging

Often they are cases when you need to see if the component was loaded on the
page from which pack and so on. We've implemented for now a very primitive
debugging system which lives as a global object on the `window`. You can enable
development mode by executing `ReactRails.enableDevelopmentMode()` inside Chrome
console. Then you can re-invoke mounting of all components with
`ReactRails.init()` which should lead to the following example.

![screen shot 2018-06-26 at 01 00 21](https://user-images.githubusercontent.com/324488/41880008-5f15dd96-78dc-11e8-886b-625c39a826c8.png).

This will give you a hint on which place and which component was mounted.
