# Filters

This module provides a set of components for building complex search forms. It
allows to:

- build forms with various filter types
- specify various sorting options
- integrate search form with multiple autocomplete APIs for smart "tags" search
- render search form in a compact way where you only see filter values

It also provides a set of helper utilities for converting search form state to
various formats. Particularly there are utils for encoding and decoding the form
state into a query string. You can use them to reflect form state in address bar
or to reproduce form state from provided URL.

In addition to that there are utilities for converting form state to GraphQL
variables. You can use them to integrate the search form with the GraphQL API.

## Components

This module exposes few top-level components.

1. `Filters` - this is the most important component. It accepts following props:

   - `config` - special configuration object which specifies whole form
     structure. You can specify various filters and their settings with this
     configuration.
   - `onChange` - allows handling search form changes with the callback, passes
     filter values as an argument
   - `values` - values for the form filters
   - `sortOptions` - sorting options that can be used for specifying search
     results sorting (both sorting type and the order)
   - `children` - you can optionally pass children. One thing to notice is that
     it should be a function that returns children nodes rather than children
     nodes themselves. This function allows to embed sorting UI into children
     components.

2. `FiltersHeader` and `FiltersContent` Those two components allow to use two
   basic parts of the search form independently. This way you don't need a
   `Filters` component, but you'll have to control some of the form state
   manually. Please refer to components themselves for the details.

3. `SearchBar` - this component allows to render a search textbox input with
   various autocomplete capabilities like:

   - ability to query multiple number of API endpoints
   - ability to convert autocomplete items to search form filters
   - ability to specify search logic (AND or OR)
   - and many more, please refer tests and prop typings for more details.

   Important thing here is that `SearchBar` should be rendered inside `Filters`
   component to have access to the search form context.

4. `Pagination` - a wrapper around Picasso pagination, renders pagination and
   allows to handle page changes with callback.

## Supported Filter Types

You can always explore actual filters by inspecting `Filters` component `config`
prop typings. But here is a basic overview of available options:

- `checkboxes` filter - allows picking a list of values from some predefined
  options list
- `select` and `radio buttons` filters - allow picking a single value from the
  list
- `autocomplete` filter - allows picking filter value from autocomplete API
- `date range`, `amount range` and `slider range` filters - allow specifying a
  "range" filter which usually consists of `from` and `till` values

## Utilities

As mentioned before, there are various utilities for dealing with search form
state. There are utils for converting search form state to GraphQL API variables
format. And there are utils for serializing and deserializing form state to (or
from) a query string.

## What's Next?

This document serves as a very basic introduction to `Filters`. There are a too
many options and configuration possibilities to cover them all here. Please
refer to tests and to component typings to gather more info on all available
options.
