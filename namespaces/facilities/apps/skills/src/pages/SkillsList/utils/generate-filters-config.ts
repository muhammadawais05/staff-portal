import { SkillNameTalentStatus } from '@staff-portal/graphql/staff'
import {
  FiltersConfig,
  RadioFilterConfigOptions,
  FilterConfigType,
  TypeSelectOption
} from '@staff-portal/filters'
import {
  NOT_SELECTED_OPTION,
  NOT_SELECTED_PLACEHOLDER
} from '@staff-portal/config'

import {
  useGetSkillNameFilterAutocompleteLabel,
  useGetSkillNameFilterAutocompleteOptions,
  SkillNameEdgeFragment
} from '../../../data/get-skill-name-autocomplete'

const RADIO_OPTIONS: RadioFilterConfigOptions = [
  NOT_SELECTED_OPTION,
  { label: 'Yes', value: 'true' },
  { label: 'No', value: 'false' }
]

const STATUSES_OPTIONS = [
  { label: 'Active', value: SkillNameTalentStatus.ACTIVE },
  { label: 'Applied', value: SkillNameTalentStatus.APPLIED },
  { label: 'Paused', value: SkillNameTalentStatus.PAUSED },
  { label: 'Rejected', value: SkillNameTalentStatus.REJECTED },
  {
    label: 'Rejected Automatic',
    value: SkillNameTalentStatus.REJECTED_BY_PRIORITIZER
  },
  {
    label: 'Rejected Inactive',
    value: SkillNameTalentStatus.REJECTED_INACTIVE
  },
  { label: 'Removed', value: SkillNameTalentStatus.REMOVED }
]

const generateFilterConfig = (
  loadingVerticals: boolean,
  verticalsAndCategoriesOptions: TypeSelectOption[],
  showOnlyDirectChildFilter: boolean
) =>
  [
    {
      type: FilterConfigType.TYPE_SELECTOR,
      name: 'verticals',
      subCategoryName: 'category_ids',
      label: 'Verticals & Categories',
      placeholder: NOT_SELECTED_PLACEHOLDER,
      searchPlaceholder: 'Search Talent Types',
      loading: loadingVerticals,
      options: verticalsAndCategoriesOptions
    },
    {
      type: FilterConfigType.AUTOCOMPLETE,
      noOptionsText: NOT_SELECTED_PLACEHOLDER,
      name: 'ancestor_skill_name_id',
      label: 'Parent Skill',
      useGetOptions: useGetSkillNameFilterAutocompleteOptions,
      useGetFilterLabel: useGetSkillNameFilterAutocompleteLabel,
      getKey: (item: unknown) => (item as SkillNameEdgeFragment).node?.id,
      getId: (item: unknown) => (item as SkillNameEdgeFragment).node?.id,
      getLabel: (item: unknown) => (item as SkillNameEdgeFragment).label ?? ''
    },
    ...(showOnlyDirectChildFilter
      ? [
          {
            type: FilterConfigType.RADIO,
            name: 'only_direct_child',
            label: 'Only Direct Child',
            options: [
              { label: 'Yes', value: 'true' },
              { label: 'No', value: 'false' }
            ]
          }
        ]
      : []),
    {
      type: FilterConfigType.RADIO,
      name: 'is_skill_identifier',
      label: 'Is skill identifier',
      options: RADIO_OPTIONS
    },
    {
      type: FilterConfigType.RADIO,
      name: 'editor_check',
      label: 'Editor check',
      options: RADIO_OPTIONS
    },
    {
      type: FilterConfigType.RADIO,
      name: 'vertical_check',
      label: 'Vertical check',
      options: RADIO_OPTIONS
    },
    {
      type: FilterConfigType.CHECKBOX,
      name: 'talent_statuses',
      label: 'Status',
      options: STATUSES_OPTIONS
    }
  ] as FiltersConfig

export default generateFilterConfig
