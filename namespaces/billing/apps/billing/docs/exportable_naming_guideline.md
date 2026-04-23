# Exportable packages naming guideline

Always make sure that the exported package name is meaningful and
self-describing. Each package must have three attributes specified: role (type
of user who is going to see/use the package), type and main functionality.

## Example

> `StaffInvoiceDetailsPage`

`Staff` _(Used by Staff role only)_ `InvoiceDetails` _(Invoice Detail the main
functionality)_ `Page` _(It's a standalone page)_

> `StaffOverviewWidget`

`Staff` _(Used by Staff role only)_ `Overview` _(Overview the main
functionality)_ `Widget` _(It's a part of a page)_
