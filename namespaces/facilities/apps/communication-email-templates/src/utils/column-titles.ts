import * as S from '../components/EmailTemplatesListItem/styles'

export const COLUMN_TITLES = [
  {
    title: 'Name',
    key: 'name',
    testId: 'email-template-list-name-row-title',
    props: {
      css: S.largeCell
    }
  },
  {
    title: 'Created by',
    key: 'createdBy',
    testId: 'email-template-list-created-by-row-title',
    props: {
      css: S.smallCell
    }
  },
  {
    title: 'Visibility',
    key: 'visibility',
    testId: 'email-template-list-visibility-row-title',
    props: {
      css: S.smallCell
    }
  },
  {
    title: 'Client',
    key: 'client',
    testId: 'email-template-list-client-row-title',
    props: {
      css: S.smallCell
    }
  },
  {
    title: '',
    key: 'actions',
    testId: 'email-template-list-actions-row-title',
    props: {
      css: S.largeCell
    }
  }
]
