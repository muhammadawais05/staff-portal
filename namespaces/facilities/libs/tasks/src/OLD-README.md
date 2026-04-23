# Tasks module

This module contains tasks related pages and components

## Module structure

`module` + `sub-module` grouping structure is used as below, then each
`sub-module` should have the same structure as documented
[here](https://toptal-core.atlassian.net/wiki/spaces/ENG/pages/1210548601/Folder+Structure):

```bash
tasks/
├── core/
│   └── components/
│   └── pages/
│   └── index.ts
├── task-cards/
│   └── components/
│   └── pages/
│   └── index.ts
├── index.ts
└── index.externals.ts
```

`index.ts` file contains all exports for staff-portal usage `index.externals.ts`
file contains all exports for external usage e.g. from `billing-frontend`

## Module usage

### TaskCards

`TaskCards` is a `sub-module` on its own. It contains UI building blocks for a
task card. One example usage is as below:

```tsx
import { TaskCardLayout } from '@staff-portal/tasks'

...

<TaskCardLayout>
  <TaskCardLayout.Header>
    <TaskCardLayout.Title>
      {...}
    </TaskCardLayout.Title>

    <TaskCardLayout.Actions>
      <Button>{...}</Button>

      <TaskCardLayout.MoreButton>
        <Menu.Item>{...}</Menu.Item> // Menu component is from picasso
        {...}
      </TaskCardLayout.MoreButton>
    </TaskCardLayout.Actions>
  </TaskCardLayout.Header>

  <TaskCardLayout.Summary>
    <TaskCardLayout.SummaryItem />
    {...}
  </TaskCardLayout.Summary>

  <TaskCardLayout.Content items={...} />

  <TaskCardLayout.Description>
    <TaskCardLayout.DescriptionFormatter />
  </TaskCardLayout.Description>
</TaskCardLayout>
```

## TaskCards architecture

How Task cards work, including activation of the cards, data fetching, etc is
documented
[here](https://toptal-core.atlassian.net/wiki/spaces/FR/pages/814514280/Tasks)

Currently, most of the task cards are built inside `tasks` module except
`InvoiceTaskCard` which is built in `@toptal/billing-frontend` and reused in
`Tasks`. So once we have all of the respected modules e.g. companies, talents,
etc. Should we still have the cards built here in `tasks` module or in their
respected module like `InvoiceTaskCard`???

## Billing integration

This part will be updated once integration process is confirmed and updated

Related tickets: <https://toptal-core.atlassian.net/browse/SPB-824>
<https://toptal-core.atlassian.net/browse/SPB-826>
<https://toptal-core.atlassian.net/browse/SPB-825>
<https://toptal-core.atlassian.net/browse/SPB-827>
