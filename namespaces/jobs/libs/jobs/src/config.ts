import { ColorType } from '@toptal/picasso'
import {
  CumulativeJobStatus,
  JobEstimatedLengths,
  JobCommitment,
  JobApplicationRejectReason,
  JobProbabilityToConvertScoreCategory,
  SourcingRequestEnterpriseJobStatus,
  JobWorkType,
  SourcingRequestWhoCoversTravelCosts,
  JobProjectType,
  JobProjectSpecCompleteness,
  BusinessTypes
} from '@staff-portal/graphql/staff'

import { JobMultipleHiresStatus } from './enums'

type FeaturesName = {
  [key: string]: string
}

export const JOB_PROBABILITY_TO_CONVERT_COLOR_MAPPING: Record<
  string,
  ColorType
> = {
  [JobProbabilityToConvertScoreCategory.HIGH]: 'green',
  [JobProbabilityToConvertScoreCategory.LOW]: 'red',
  [JobProbabilityToConvertScoreCategory.MEDIUM]: 'yellow',
  [JobProbabilityToConvertScoreCategory.VERY_HIGH]: 'green',
  [JobProbabilityToConvertScoreCategory.VERY_LOW]: 'red'
}

export const JOB_PROBABILITY_TO_CONVERT_FEATURE_NAMES_TEXT_MAPPING: FeaturesName =
  {
    posted_by_company: 'Job was posted by the company',
    prev_posted_jobs: 'Number of previously posted jobs',
    prev_claimed_jobs: 'Number of previously claimed jobs',
    prev_active_jobs: 'Number of previously active jobs',
    act_percent: 'Percent of previously posted jobs that activated',
    vertical: 'Vertical',
    commitment: 'Commitment',
    estimated_length: 'Estimated Length',
    location_type: 'Location Type',
    toptal_projects: 'Is Toptal Projects',
    connection_type: 'Connection Type at sign-up',
    country: 'Country at sign-up',
    continent: 'Continent at sign-up',
    language: 'Language at sign-up',
    operating_system: 'Operating system at sign-up',
    browser: 'Browser at sign-up',
    skill__net: 'Has skill .net',
    skill_agile: 'Has skill Agile',
    skill_agile_product_management: 'Has skill Agile Product Management',
    skill_agile_project_management: 'Has skill Agile Project Management',
    'skill_amazon_web_services_(aws)': 'Has skill Amazon Web Services',
    skill_android: 'Has skill Android',
    skill_angular: 'Has skill Angular',
    skill_apis: 'Has skill APIs',
    skill_aws: 'Has skill Amazon Web Services',
    skill_aws_lambda: 'Has skill Amazon Web Services Lambda',
    skill_aws_s3: 'Has skill Amazon Web Services S3',
    skill_azure: 'Has skill azure',
    skill_bootstrap: 'Has skill Bootstrap',
    skill_branding: 'Has skill Branding',
    'skill_c#': 'Has skill C#',
    'skill_c++': 'Has skill C++',
    'skill_continuous_integration_(ci)': 'Has skill Continuous Integration',
    skill_css: 'Has skill CSS',
    skill_css3: 'Has skill CSS3',
    skill_data_science: 'Has skill Data Science',
    skill_data_visualization: 'Has skill Data Visualization',
    skill_design: 'Has skill Design',
    skill_devops: 'Has skill DevOps',
    skill_django: 'Has skill Django',
    skill_docker: 'Has skill Docker',
    skill_ecommerce: 'Has skill Ecommerce',
    skill_elasticsearch: 'Has skill ElasticSearch',
    skill_figma: 'Has skill Figma',
    skill_financial_modeling: 'Has skill Financial Modelling',
    skill_firebase: 'Has skill Firebase',
    skill_flutter: 'Has skill Flutter',
    skill_forecasting: 'Has skill Forecasting',
    'skill_front-end': 'Has skill Front-End',
    'skill_full-stack': 'Has skill Full-Stack',
    skill_fundraising: 'Has skill Fundraising',
    skill_git: 'Has skill Git',
    skill_github: 'Has skill Github',
    skill_go: 'Has skill Go',
    skill_graphic_design: 'Has skill Graphic Design',
    skill_graphql: 'Has skill GraphQL',
    skill_html: 'Has skill HTML',
    skill_html5: 'Has skill HTML5',
    skill_ios: 'Has skill iOS',
    skill_java: 'Has skill Java',
    skill_javascript: 'Has skill Javascript',
    skill_jira: 'Has skill Jira',
    skill_jquery: 'Has skill jQuery',
    skill_json: 'Has skill Json',
    skill_kotlin: 'Has skill Kotlin',
    skill_kubernetes: 'Has skill Kubernetes',
    skill_laravel: 'Has skill Larvel',
    skill_linux: 'Has skill Linux',
    skill_machine_learning: 'Has skill Machine Learning',
    skill_mobile: 'Has skill Mobile',
    skill_mobile_apps: 'Has skill Mobile Apps',
    skill_mongodb: 'Has skill MongoDB',
    skill_mysql: 'Has skill MySQL',
    skill_node_js: 'Has skill Node.js',
    'skill_objective-c': 'Has skill Objective-C',
    skill_php: 'Has skill PHP',
    skill_postgresql: 'Has skill PostgreSQL',
    skill_product_design: 'Has skill Product Design',
    skill_product_management: 'Has skill Product Management',
    skill_project_management: 'Has skill Project Management',
    skill_python: 'Has skill Python',
    skill_python_3: 'Has skill Python 3',
    skill_react: 'Has skill React',
    skill_react_native: 'Has skill React Native',
    skill_redux: 'Has skill Redux',
    'skill_responsive_web_design_(rwd)': 'Has skill Responsive Web Design',
    skill_rest: 'Has skill Rest',
    skill_rest_apis: 'Has skill Rest APIs',
    'skill_revenue_&_expense_projections':
      'Has skill Revenue And Expense Projections',
    skill_ruby: 'Has skill Ruby',
    'skill_ruby_on_rails_(ror)': 'Has skill Ruby on Rails',
    skill_salesforce: 'Has skill Salesforce',
    skill_shopify: 'Has skill Shopify',
    skill_sketch: 'Has skill Sketch',
    skill_sql: 'Has skill SQL',
    skill_swift: 'Has skill Swift',
    skill_typescript: 'Has skill Typescript',
    skill_ui_design: 'Has skill UI Design',
    skill_unity: 'Has skill Unity',
    'skill_user_experience_(ux)': 'Has skill User Experience',
    'skill_user_interface_(ui)': 'Has skill User Interface',
    skill_ux_design: 'Has skill UX Design',
    skill_venture_capital: 'Has skill Venture Capital',
    skill_visual_design: 'Has skill Visual Design',
    skill_vue_js: 'Has skill Vue.js',
    skill_web_app_ux: 'Has skill Web App UX',
    skill_web_design: 'Has skill Web Design',
    skill_web_development: 'Has skill Web Development',
    skill_web_ui: 'Has skill Web UI',
    skill_web_ux: 'Has skill Web UX',
    skill_wireframing: 'Has skill Wireframing',
    skill_woocommerce: 'Has skill Woocommerce',
    skill_wordpress: 'Has skill Wordpress',
    skill_wordpress_design: 'Has skill Wordpress Design',
    skill_wordpress_plugins: 'Has skill Wordpress Plugins',
    skill_wordpress_themes: 'Has skill Wordpress Themes',
    skills_count: 'Number of skills requested'
  }

export const JOB_PROJECT_TYPE_MAPPING: Record<JobProjectType, string> = {
  [JobProjectType.EXISTING_PROJECT_THAT_NEEDS_MORE_RESOURCES]:
    'Existing project that needs more resources',
  [JobProjectType.NEW_IDEA_OR_PROJECT]: 'New idea or project',
  [JobProjectType.N_A]: 'N/A (looking to learn about Toptal)',
  [JobProjectType.ONGOING_ASSISTANCE_OR_CONSULTATIONS]:
    'Ongoing assistance or consultations'
}

export const JOB_PROJECT_SPEC_COMPLETENESS_MAPPING: Record<
  JobProjectSpecCompleteness,
  string
> = {
  [JobProjectSpecCompleteness.N_A]: 'N/A',
  [JobProjectSpecCompleteness.HAS_ROUGH_IDEA]:
    'Has rough idea (NO specs/designs)',
  [JobProjectSpecCompleteness.HAS_A_CLEAR_IDEA_NO_SPECS_NO_DESIGNS]:
    'Has a clear idea (NO specs/designs)',
  [JobProjectSpecCompleteness.HAS_A_CLEAR_IDEA_HAS_SPECS_HAS_DESIGNS]:
    'Has a clear idea (has specs/designs)'
}

export const COMMITMENT_COLORS: Record<JobCommitment, ColorType> = {
  [JobCommitment.FULL_TIME]: 'green',
  [JobCommitment.HOURLY]: 'yellow',
  [JobCommitment.PART_TIME]: 'yellow'
}

export const COMMITMENT_TITLES: Record<JobCommitment, string> = {
  [JobCommitment.FULL_TIME]: 'Full-time',
  [JobCommitment.HOURLY]: 'Hourly',
  [JobCommitment.PART_TIME]: 'Part-time'
}

export const COMMITMENT_FOR_REHIRE: Record<JobCommitment, string> = {
  [JobCommitment.FULL_TIME]: 'Full Time (40+ hours/week)',
  [JobCommitment.PART_TIME]: 'Part Time (20+ hours/week)',
  [JobCommitment.HOURLY]: 'Hourly'
}

export const DESIRED_COMMITMENT_TITLES: Record<string, string> = {
  full_time: 'Full-time',
  part_time: 'Part-time',
  hourly: 'Hourly'
}

export const DESIRED_COMMITMENT_COLORS: Record<string, ColorType> = {
  full_time: 'green',
  part_time: 'yellow',
  hourly: 'yellow'
}

export const JOB_APPLICATION_REASONS_TEXT_MAPPING: Record<
  JobApplicationRejectReason,
  string
> & { [key: string]: string } = {
  APPLIED_BY_MISTAKE: 'Talent applied by mistake',
  JOB_TYPE_CHANGED: 'Job type changed',
  LACKING_REQUESTED_SKILL: 'Lacking requested skill',
  LACKING_REQUIRED_SKILL:
    'Job requirements changed and a skill is required that talent doesn’t have',
  NOT_LONGER_AVAILABLE: 'Talent is no longer available',
  NOT_MATCH_RATE: 'Rate isn’t a match for client’s budget',
  NOT_MATCH_SOFT_SKILLS: 'Not a match for client’s soft skills requests',
  NOT_MATCH_TIME_ZONE_OR_LOCATION: 'Time zone or location are not a match',
  OTHER: 'Other',
  PROCEEDING_WITH_OTHER_TALENT: 'Client is proceeding with other talent',
  SPECIALIZATION_CHANGED: 'Specialization changed'
}

export const JOB_APPLICATION_REASONS_COMMENT_MAPPING: Record<
  JobApplicationRejectReason,
  string
> & { [key: string]: string } = {
  APPLIED_BY_MISTAKE:
    'You will no longer be considered for this position. If you have any questions, please reach out to me on Slack.',
  JOB_TYPE_CHANGED:
    'Unfortunately the requirements for this job have changed. The client is now seeking %{new_job_type} instead of %{previous_job_type}.',
  LACKING_REQUESTED_SKILL:
    'I decided not to proceed with your application, because this position doesn’t seem like the right match for your skills.',
  LACKING_REQUIRED_SKILL:
    'I decided not to proceed with you as a candidate, because the job requirements changed and no longer align with your current application.',
  NOT_LONGER_AVAILABLE:
    'Due to your availability change, you will no longer be considered for the position.',
  NOT_MATCH_RATE:
    'I decided not to proceed with your application, because your rate is above the client’s budget for this role.',
  NOT_MATCH_SOFT_SKILLS:
    'I decided not to proceed with your application, because this position doesn’t seem like the right match for your experience.',
  NOT_MATCH_TIME_ZONE_OR_LOCATION:
    'I decided not to proceed with your application, because your time zone and location are not within the client’s preferences.',
  OTHER: '',
  PROCEEDING_WITH_OTHER_TALENT:
    'After carefully reviewing your profile and the job requirements, the client has chosen to proceed with another talent.',
  SPECIALIZATION_CHANGED:
    'Unfortunately the requirements for this job have changed. The job requires the %{new_specialization} specialization and you have not yet passed the application process for this specialization.'
}

export const JOB_REQUEST_ENTERPRISE_STATUS_TITLE_MAPPING: Record<
  SourcingRequestEnterpriseJobStatus,
  string
> = {
  [SourcingRequestEnterpriseJobStatus.CURRENT_NEED]: 'Current Need',
  [SourcingRequestEnterpriseJobStatus.DOOR_OPENING]: 'Door Opening',
  [SourcingRequestEnterpriseJobStatus.EARLY_SOURCING]: 'Early Sourcing',
  [SourcingRequestEnterpriseJobStatus.NONE]: 'None'
}

export const JOB_REQUEST_ENTERPRISE_STATUS_TEXT_MAPPING: Record<
  SourcingRequestEnterpriseJobStatus,
  string
> = {
  [SourcingRequestEnterpriseJobStatus.CURRENT_NEED]:
    'Client is actively seeking talent for this job.',
  [SourcingRequestEnterpriseJobStatus.DOOR_OPENING]:
    "We're pushing to open the door with the client.",
  [SourcingRequestEnterpriseJobStatus.EARLY_SOURCING]:
    'We have clarity on future needs and are proactively sourcing for it.',
  [SourcingRequestEnterpriseJobStatus.NONE]: 'None'
}

export const JOB_WORK_TYPE_TEXT_MAPPING: Record<JobWorkType, string> = {
  [JobWorkType.REMOTE]: 'Remote',
  [JobWorkType.ONSITE]: 'Onsite',
  [JobWorkType.MIXED]: 'Mixed (Remote+Onsite)',
  [JobWorkType.RECRUITING]: 'Recruiting Only'
}

export const WHO_COVERS_TRAVEL_COSTS_TEXT_MAPPING: Record<
  SourcingRequestWhoCoversTravelCosts,
  string
> = {
  [SourcingRequestWhoCoversTravelCosts.CLIENT]: 'Client',
  [SourcingRequestWhoCoversTravelCosts.TALENT]: 'Talent',
  [SourcingRequestWhoCoversTravelCosts.TOPTAL]: 'Toptal'
}

export const DEFAULT_TEXT_LENGTH_LIMIT = 285

export const JOB_STATUS_TEXT_MAPPING: Record<
  CumulativeJobStatus | JobMultipleHiresStatus,
  string
> = {
  ...CumulativeJobStatus,
  [CumulativeJobStatus.DRAFTED_BY_SALES]: "Waiting for client's review",
  [CumulativeJobStatus.DRAFT_CONFIRMED]: 'Reviewed by client (TOS accepted)',
  [CumulativeJobStatus.DRAFT_UNCONFIRMED]: 'Reviewed by client',
  [CumulativeJobStatus.PENDING_ENGINEER]: 'Pending talent',
  [CumulativeJobStatus.REMOVED]: 'Deleted',
  [JobMultipleHiresStatus.ON_BREAK_END_SCHEDULED]: 'On Break. End Scheduled',
  [JobMultipleHiresStatus.MHJR_NONE_ACTIVE]: 'None active',
  [JobMultipleHiresStatus.MHJR_SOME_ACTIVE]: 'Some active',
  [JobMultipleHiresStatus.MHJR_ALL_ACTIVE]: 'All active',
  [CumulativeJobStatus.ACTIVE]: 'Active',
  [CumulativeJobStatus.CLOSED]: 'Closed',
  [CumulativeJobStatus.DRAFTED_BY_SALES]: 'Draft by sales',
  [CumulativeJobStatus.DRAFT_CONFIRMED]: 'Draft confirmed',
  [CumulativeJobStatus.DRAFT_PROJECTS]: 'Draft projects',
  [CumulativeJobStatus.DRAFT_UNCONFIRMED]: 'Draft unconfirmed',
  [CumulativeJobStatus.PENDING_CLAIM]: 'Pending claim',
  [CumulativeJobStatus.POSTPONED]: 'Postponed',
  [CumulativeJobStatus.REJECTED]: 'Rejected',
  [CumulativeJobStatus.SENDING_AWAY]: 'Sending away',
  [CumulativeJobStatus.ON_TRIAL]: 'On trial',
  [CumulativeJobStatus.ON_HOLD]: 'On hold',
  [CumulativeJobStatus.ON_BREAK]: 'On break',
  [CumulativeJobStatus.END_SCHEDULED]: 'End schedule',
  [CumulativeJobStatus.PENDING_LEGAL]: 'Pending Legal',
  [CumulativeJobStatus.PENDING_START]: 'Pending start'
}

export const JOB_STATUS_COLOR_MAPPING: Record<string, ColorType> = {
  [CumulativeJobStatus.ACTIVE]: 'green',
  [CumulativeJobStatus.SCHEDULED]: 'green',
  [CumulativeJobStatus.ON_BREAK]: 'green',
  [CumulativeJobStatus.ON_HOLD]: 'green',
  [CumulativeJobStatus.ON_TRIAL]: 'green',
  [CumulativeJobStatus.ON_TRIAL]: 'green',
  [CumulativeJobStatus.END_SCHEDULED]: 'green',
  [CumulativeJobStatus.PENDING_CLAIM]: 'yellow',
  [CumulativeJobStatus.PENDING_ENGINEER]: 'yellow',
  [CumulativeJobStatus.PENDING_LEGAL]: 'yellow',
  [CumulativeJobStatus.PENDING_START]: 'yellow',
  [CumulativeJobStatus.POSTPONED]: 'red',
  [CumulativeJobStatus.REJECTED]: 'red',
  [CumulativeJobStatus.CANCELLED]: 'red',
  [CumulativeJobStatus.SENDING_AWAY]: 'red',
  [JobMultipleHiresStatus.ON_BREAK_END_SCHEDULED]: 'green',
  [JobMultipleHiresStatus.MHJR_ALL_ACTIVE]: 'green',
  [JobMultipleHiresStatus.MHJR_SOME_ACTIVE]: 'yellow',
  [JobMultipleHiresStatus.MHJR_NONE_ACTIVE]: 'yellow'
}

export const ESTIMATED_LENGTH_MAPPING: Record<JobEstimatedLengths, string> = {
  [JobEstimatedLengths.LENGTH_1_2_WEEKS]: '1-2 weeks',
  [JobEstimatedLengths.LENGTH_2_4_WEEKS]: '2-4 weeks',
  [JobEstimatedLengths.LENGTH_4_8_WEEKS]: '4-8 weeks',
  [JobEstimatedLengths.LENGTH_2_3_MONTHS]: '2-3 months',
  [JobEstimatedLengths.LENGTH_3_6_MONTHS]: '3-6 months',
  [JobEstimatedLengths.LENGTH_6_12_MONTHS]: '6-12 months',
  [JobEstimatedLengths.LENGTH_12_MONTHS]: '12+ months',
  [JobEstimatedLengths.LENGTH_UNKNOWN]: 'Unknown'
}

export const BUSINESS_TYPE_MAPPING: Record<string, string> = {
  [BusinessTypes.INDIVIDUAL]: 'Individual',
  [BusinessTypes.START_UP]: 'Start-up',
  [BusinessTypes.NON_PROFIT]: 'Non profit',
  [BusinessTypes.DEV_SHOP_OR_AGENCY]: 'Dev shop or Agency',
  [BusinessTypes.SMALL_BUSINESS]: 'Small',
  [BusinessTypes.MEDIUM_BUSINESS]: 'Medium',
  [BusinessTypes.ENTERPRISE_BUSINESS]: 'Enterprise',
  [BusinessTypes.GOVERNMENT]: 'Government'
}
