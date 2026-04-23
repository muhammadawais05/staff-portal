import { ColorType } from '@toptal/picasso'
import { LeadProbabilityBucket } from '@staff-portal/graphql/staff'

export const LEAD_BUCKET_COLORS: Record<
  LeadProbabilityBucket,
  ColorType | undefined
> = {
  // this inherits parent color, 'inherit' does not :/
  [LeadProbabilityBucket.LOW]: undefined,
  [LeadProbabilityBucket.MEDIUM]: 'yellow',
  [LeadProbabilityBucket.HIGH]: 'red'
}

export const NO_YES: Record<number, string> = { 0: 'No', 1: 'Yes' }

export const DAYS_OF_WEEK: Record<number, string> = {
  0: 'Mon',
  1: 'Tue',
  2: 'Wed',
  3: 'Thu',
  4: 'Fri',
  5: 'Sat',
  6: 'Sun'
}

export const FEATURE_NAMES: Record<string, string> = {
  open_for_remote: 'Open For Remote',
  multiple_hires: 'Multiple Hires',
  email_type: 'Email Type',
  company_size: 'Company Size',
  skills_count: 'Requested Skills Count',
  interested_in: 'Interested In',
  project_length: 'Project Length',
  commitment: 'Commitment',
  situation: 'Situation',
  ready_to_start: 'Ready To Start',
  budget_estimation: 'Budget Estimation',
  budget: 'Budget',
  product_specs: 'Product Specs',
  roles_cr_hour: 'Application Hour',
  roles_cr_dow: 'Application Day of Week',
  tt_finish: 'Time to Complete Quiz',
  company_name_len: 'Characters in Company Name',
  contact_name_len: 'Characters in Contact Name',
  contact_name_title: 'Contact Name is in Title Case',
  contact_name_num: 'Contact Name has numbers',
  contact_name_whitespaces: 'Number of Whitespaces in Contact Name',
  ai_country_code: 'Country Code',
  ai_continent_code: 'Continent Code',
  ai_language: 'Language',
  ai_operating_system: 'Operating System',
  ai_browser: 'Browser',
  ai_applied_after_s: 'Time from CTA Click to Completion',
  ai_city: 'City',
  ai_english: 'Is English Language',
  skill_adobe_photoshop: 'Has Skill "Adobe Photoshop"',
  skill_android: 'Has Skill "Android"',
  skill_angular: 'Has Skill "Angular"',
  skill_app_design: 'Has Skill "App Design"',
  skill_apps: 'Has Skill "Apps"',
  skill_asp_net_web_api: 'Has Skill "ASP.NET Web API"',
  skill_branding: 'Has Skill "Branding"',
  'skill_c#': 'Has Skill "C#"',
  skill_css: 'Has Skill "CSS"',
  skill_filemaker_pro: 'Has Skill "Filemaker Pro"',
  skill_financial_modeling: 'Has Skill "Financial Modeling"',
  skill_freelance: 'Has Skill "Freelance"',
  skill_freelance_design: 'Has Skill "Freelance Design"',
  skill_full_stack: 'Has Skill "Full Stack"',
  skill_fundraising: 'Has Skill "Fundraising"',
  skill_gang_of_four_gof_design_patterns:
    'Has Skill "Gang Of Four (GOF) Design Patterns"',
  skill_html: 'Has Skill "HTML"',
  skill_html5: 'Has Skill "HTML5"',
  skill_ios: 'Has Skill "iOS"',
  skill_java: 'Has Skill "Java"',
  skill_javascript: 'Has Skill "JavaScript"',
  skill_mobile_app_design: 'Has Skill "Mobile App Design"',
  skill_mobile_design: 'Has Skill "Mobile Design"',
  skill_mobile_ui: 'Has Skill "Mobile UI"',
  skill_mysql: 'Has Skill "MySQL"',
  skill_node_js: 'Has Skill "Node.js"',
  skill_other: 'Has Skill "Other"',
  skill_php: 'Has Skill "PHP"',
  skill_project_management: 'Has Skill "Project Management"',
  skill_python: 'Has Skill "Python"',
  skill_react: 'Has Skill "React"',
  skill_react_native: 'Has Skill "React Native"',
  skill_responsive_web_design_rwd: 'Has Skill "Responsive Web Design (RWD)"',
  skill_revenue___expense_projections:
    'Has Skill "Revenue (Expense Projections)"',
  skill_shopify: 'Has Skill "Shopify"',
  skill_software: 'Has Skill "Software"',
  skill_ui: 'Has Skill "UI"',
  skill_ui_design: 'Has Skill "UI Design"',
  skill_unknown: 'No skill selection',
  skill_user_experience_ux: 'Has Skill "User Experience (UX)"',
  skill_user_interface_ui: 'Has Skill "User Interface (UI)"',
  skill_ux: 'Has Skill "UX"',
  skill_ux_design: 'Has Skill "UX Design"',
  skill_web: 'Has Skill "Web"',
  skill_web_app_ux: 'Has Skill "Web App UX"',
  skill_web_design: 'Has Skill "Web Design"',
  skill_web_development: 'Has Skill "Web Development"',
  skill_web_ux: 'Has Skill "Web UX"',
  skill_wordpress: 'Has Skill "WordPress"',
  skill_wordpress_design: 'Has Skill "WordPress Design"',
  skill_wordpress_themes: 'Has Skill "WordPress Themes"'
}
