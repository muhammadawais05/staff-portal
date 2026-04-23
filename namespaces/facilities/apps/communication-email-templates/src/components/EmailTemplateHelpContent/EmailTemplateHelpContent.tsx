/* eslint-disable max-lines */
/* eslint-disable max-lines-per-function */

import React from 'react'
import { Container, Section, Typography } from '@toptal/picasso'

import * as S from './styles'

const EmailTemplateHelpContent = () => (
  <Container>
    <Container top='medium'>
      <Section
        variant='withHeaderBar'
        css={S.variablesSection}
        title='Users available in the email'
      >
        <Typography size='medium'>
          <ul>
            <li>sender</li>
            <li>receiver</li>
            <li>
              if receiver is a talent, step claimers:
              <ul>
                <li>receiver.steps.english.claimer</li>
                <li>receiver.steps.codility.claimer</li>
                <li>receiver.steps.portfolio.claimer</li>
                <li>receiver.steps.technical_one.claimer</li>
                <li>receiver.steps.technical_two.claimer</li>
                <li>receiver.steps.project.claimer</li>
                <li>receiver.steps.payment.claimer</li>
                <li>receiver.steps.work_hours.claimer</li>
                <li>receiver.steps.legal.claimer</li>
                <li>receiver.steps.profile_creation.claimer</li>
                <li>receiver.steps.profile_editing.claimer</li>
                <li>receiver.steps.toptal_email.claimer</li>
              </ul>
            </li>
            <li>
              if receiver is a talent, current step tips:
              <ul>
                <li>receiver.next_screening_step_tips</li>
              </ul>
            </li>
          </ul>
        </Typography>
      </Section>
    </Container>
    <Container top='medium'>
      <Section
        variant='withHeaderBar'
        css={S.variablesSection}
        title='Methods available for all users'
      >
        <Typography size='medium'>
          <ul>
            <li>{`{{ receiver.name }}`}</li>
            <li>{`{{ receiver.first_name }}`}</li>
            <li>{`{{ receiver.email }}`}</li>
            <li>{`{{ receiver.phone_number }}`}</li>
            <li>{`{{ receiver.skype }}`}</li>
            <li>{`{{ receiver.profile_url_for_staff }}`}</li>
            <li>{`{{ receiver.referral_url }}`}</li>
          </ul>
        </Typography>
      </Section>
    </Container>
    <Container top='medium'>
      <Section
        variant='withHeaderBar'
        css={S.variablesSection}
        title='Method available for staff (sender and claimers)'
      >
        <Typography size='medium'>
          <ul>
            <li>{`{{ sender.signature }}`}</li>
            <li>{`{{ sender.topscreen.signature }}`}</li>
            <li>{`{{ sender.meeting_schedulers.any? }}`}</li>
            <li>{`{{ sender.meeting_schedulers.company_job_details }}`}</li>
            <li>{`{{ sender.meeting_schedulers.sales_call }}`}</li>
            <li>{`{{ sender.meeting_schedulers.bad_lead_sales_call }}`}</li>
            <li>{`{{ sender.meeting_schedulers.talent_english_interview }}`}</li>
            <li>{`{{ sender.meeting_schedulers.talent_tech_interview }}`}</li>
            <li>{`{{ sender.meeting_schedulers.ia_or_seamless_matching_call }}`}</li>
          </ul>
        </Typography>
      </Section>
    </Container>
    <Container top='medium'>
      <Section
        variant='withHeaderBar'
        css={S.variablesSection}
        title='Methods available for talent receiver'
      >
        <Typography size='medium'>
          <ul>
            <li>{`{{ receiver.resume_url }}`}</li>
            <li>{`{{ receiver.has_multiple_working_engagements? }}`}</li>
            <li>{`{{ receiver.primary_interest }}`}</li>
            <li>{`{{ receiver.applicant_skills }}`}</li>
            <li>{`{{ receiver.reapplication_date }}`}</li>
            <li>{`{{ receiver.inactive_rejection_date_for_acknowledge_confidentiality }}`}</li>
            <li>{`{{ receiver.inactive_rejection_date_for_confirm_email }}`}</li>
            <li>{`{{ receiver.inactive_rejection_date_for_book_english_step_meeting }}`}</li>
            <li>{`{{ receiver.inactive_rejection_date_for_book_technical_one_step_meeting }}`}</li>
            <li>{`{{ receiver.inactive_rejection_date_for_book_technical_two_step_meeting }}`}</li>
            <li>{`{{ receiver.inactive_rejection_date_for_online_test }}`}</li>
            <li>{`{{ receiver.inactive_rejection_date_for_submit_application_details }}`}</li>
            <li>{`{{ receiver.inactive_rejection_date_for_upload_portfolio }}`}</li>
            <li>{`{{ receiver.inactive_rejection_date_for_check_online_test_attitude_email }}`}</li>
            <li>{`{{ receiver.low_priority? }}`}</li>
            <li>{`{{ receiver.pending_specialization }}`}</li>
            <li>{`{{ receiver.next_screening_step_title }}`}</li>
            <li>{`{{ receiver.emails }}`}</li>
            <li>{`{{ receiver.has_codility? }}`}</li>
            <li>{`{{ receiver.codility_uri }}`}</li>
            <li>{`{{ receiver.codility_score }}`}</li>
            <li>{`{{ receiver.codility_task_duration }}`}</li>
            <li>{`{{ receiver.codility_result_uri }}`}</li>
            <li>{`{{ receiver.has_hacker_rank? }}`}</li>
            <li>{`{{ receiver.hacker_rank_exercise_url }}`}</li>
            <li>{`{{ receiver.hacker_rank_exercise_duration }}`}</li>
            <li>{`{{ receiver.hacker_rank_report_url }}`}</li>
            <li>{`{{ receiver.hacker_rank_score }}`}</li>
            <li>{`{{ receiver.quote }}`}</li>
            <li>{`{{ receiver.resume_url }}`}</li>
            <li>{`{{ receiver.portfolio_upload_url }}`}</li>
            <li>{`{{ receiver.screening_wizard_url }}`}</li>
            <li>{`{{ receiver.applied_login_token }}`}</li>
            <li>
              If the receiver is a TopScreen:
              <ul>
                <li>{`{{ receiver.topscreen_client_name }}`}</li>
                <li>{`{{ receiver.topscreen_position_description }}`}</li>
                <li>{`{{ receiver.topscreen_position_title }}`}</li>
                <li>{`{{ receiver.topscreen_position_url }}`}</li>
                <li>{`{{ receiver.topscreen_application_url }}`}</li>
              </ul>
            </li>
          </ul>
        </Typography>
      </Section>
    </Container>
    <Container top='medium'>
      <Section
        variant='withHeaderBar'
        css={S.variablesSection}
        title='Methods available for company receiver'
      >
        <Typography size='medium'>
          <ul>
            <li>{`{{ receiver.contact_name }}`}</li>
            <li>{`{{ receiver.contact_first_name }}`}</li>
            <li>{`{{ receiver.black_flag_comment }}`}</li>
            <li>{`{{ receiver.ach_primary? }}`}</li>
            <li>{`{{ receiver.card_primary? }}`}</li>
            <li>{`{{ receiver.card_present? }}`}</li>
            <li>{`{{ receiver.billing_info_or_login }}`}</li>
            <li>{`{{ receiver.card_last4 }}`}</li>
            <li>{`{{ receiver.applied_login_token }}`}</li>
          </ul>
        </Typography>
      </Section>
    </Container>
    <Container top='medium'>
      <Section
        variant='withHeaderBar'
        css={S.variablesSection}
        title='Methods available for job'
      >
        <Typography size='medium'>
          <ul>
            <li>{`{{ job.title }}`}</li>
            <li>{`{{ job.url }}`}</li>
            <li>{`{{ job.company }}`}</li>
            <li>{`{{ job.start_date }}`}</li>
            <li>{`{{ job.estimated_length }}`}</li>
            <li>{`{{ job.commitment }}`}</li>
            <li>{`{{ job.main_skills }}`}</li>
            <li>{`{{ job.description }}`}</li>
          </ul>
        </Typography>
      </Section>
    </Container>
    <Container top='medium'>
      <Section
        variant='withHeaderBar'
        css={S.variablesSection}
        title='Methods available for engagement'
      >
        <Typography size='medium'>
          <ul>
            <li>{`{{ engagement.trial_length }}`}</li>
            <li>{`{{ engagement.start_date }}`}</li>
            <li>{`{{ engagement.end_date }}`}</li>
            <li>{`{{ engagement.time_zone }}`}</li>
            <li>{`{{ engagement.start_date_with_time_zone }}`}</li>
            <li>{`{{ engagement.interview_url }}`}</li>
            <li>{`{{ engagement.rate }}`}</li>
            <li>{`{{ engagement.rate_with_discount }}`}</li>
            <li>{`{{ engagement.rate_without_discount }}`}</li>
            <li>{`{{ engagement.hourly_rate }}`}</li>
            <li>{`{{ engagement.hourly_rate_with_discount }}`}</li>
            <li>{`{{ engagement.hourly_rate_without_discount }}`}</li>
            <li>{`{{ engagement.part_time_rate }}`}</li>
            <li>{`{{ engagement.part_time_rate_with_discount }}`}</li>
            <li>{`{{ engagement.part_time_rate_without_discount }}`}</li>
            <li>{`{{ engagement.full_time_rate }}`}</li>
            <li>{`{{ engagement.full_time_rate_with_discount }}`}</li>
            <li>{`{{ engagement.full_time_rate_without_discount }}`}</li>
            <li>{`{{ engagement.hourly? }}`}</li>
            <li>{`{{ engagement.part_time? }}`}</li>
            <li>{`{{ engagement.full_time? }}`}</li>
            <li>{`{{ engagement.commitment }}`}</li>
            <li>{`{{ engagement.talent }}`}</li>
          </ul>
        </Typography>
      </Section>
    </Container>
    <Container top='medium'>
      <Section
        variant='withHeaderBar'
        css={S.variablesSection}
        title='Methods available for job application'
      >
        <Typography size='medium'>
          <ul>
            <li>{`{{ job_application.application_date }}`}</li>
          </ul>
        </Typography>
      </Section>
    </Container>
    <Container top='medium'>
      <Section
        variant='withHeaderBar'
        css={S.variablesSection}
        title='Methods available for meeting'
      >
        <Typography size='medium'>
          <ul>
            <li>{`{{ meeting.scheduler_link }}`}</li>
            <li>{`{{ meeting.scheduled_date }}`}</li>
            <li>{`{{ meeting.scheduled_time_and_date }}`}</li>
          </ul>
        </Typography>
      </Section>
    </Container>

    <Container top='medium'>
      <Section
        variant='withHeaderBar'
        css={S.variablesSection}
        title='Methods available for when a meeting from a master booking page is scheduled'
      >
        <Typography size='medium'>
          <ul>
            <li>{`{{ change_booking_url }}`}</li>
            <li>{`{{ time_slot }}`}</li>
            <li>{`{{ guest_time_zone }}`}</li>
            <li>{`{{ preferred_meeting_method }}`}</li>
            <li>{`{{ conference_url }}`}</li>
            <li>{`{{ conference_type }}`}</li>
          </ul>
        </Typography>
      </Section>
    </Container>
    <Container top='medium'>
      <Section
        variant='withHeaderBar'
        css={S.variablesSection}
        title='Methods for linking master booking pages'
      >
        <Typography size='medium'>
          <ul>
            <li>{`{{ sender.meeting_schedulers.finance_live_project_presentation_mbp_url }}`}</li>
            <li>{`{{ sender.meeting_schedulers.it_security_tech_1_interview_mbp_url }}`}</li>
            <li>{`{{ sender.meeting_schedulers.magento_tech_2_screening_mbp_url }}`}</li>
            <li>{`{{ sender.meeting_schedulers.vc_partner_referral_intro_mbp_url }}`}</li>
            <li>{`{{ sender.meeting_schedulers.product_manager_technical_2_interview_mbp_url }}`}</li>
            <li>{`{{ sender.meeting_schedulers.finance_expert_initial_interview_mbp_url }}`}</li>
            <li>{`{{ sender.meeting_schedulers.product_manager_matching_mbp_url }}`}</li>
            <li>{`{{ sender.meeting_schedulers.project_manager_technical_2_interview_mbp_url }}`}</li>
            <li>{`{{ sender.meeting_schedulers.talent_experience_research_mbp_url }}`}</li>
            <li>{`{{ sender.meeting_schedulers.designer_screening_tech_2_mbp_url }}`}</li>
            <li>{`{{ sender.meeting_schedulers.it_security_tech_2_interview_mbp_url }}`}</li>
            <li>{`{{ sender.meeting_schedulers.embedded_tech_1_mbp_url }}`}</li>
            <li>{`{{ sender.meeting_schedulers.talent_user_research_mbp_url }}`}</li>
            <li>{`{{ sender.meeting_schedulers.marketing_expert_initial_toptal_interview_mbp_url }}`}</li>
            <li>{`{{ sender.meeting_schedulers.agile_coach_technical_1_interview_mbp_url }}`}</li>
            <li>{`{{ sender.meeting_schedulers.marketing_expert_technical_1_interview_mbp_url }}`}</li>
            <li>{`{{ sender.meeting_schedulers.designer_talent_feedback_call_mbp_url }}`}</li>
            <li>{`{{ sender.meeting_schedulers.product_owner_technical_2_interview_mbp_url }}`}</li>
            <li>{`{{ sender.meeting_schedulers.product_owner_technical_1_interview_mbp_url }}`}</li>
            <li>{`{{ sender.meeting_schedulers.agile_coach_technical_2_interview_mbp_url }}`}</li>
            <li>{`{{ sender.meeting_schedulers.designer_matching_mbp_url }}`}</li>
            <li>{`{{ sender.meeting_schedulers.product_manager_technical_1_interview_mbp_url }}`}</li>
            <li>{`{{ sender.meeting_schedulers.project_manager_matching_mbp_url }}`}</li>
            <li>{`{{ sender.meeting_schedulers.developer_matching_mbp_url }}`}</li>
            <li>{`{{ sender.meeting_schedulers.topscreen_english_at_apple_review_testing_mbp_url }}`}</li>
            <li>{`{{ sender.meeting_schedulers.marketing_expert_matching_mbp_url }}`}</li>
            <li>{`{{ sender.meeting_schedulers.topscreen_technical_2_topscreen_tester_at_apple_review_testing_mbp_url }}`}</li>
            <li>{`{{ sender.meeting_schedulers.designer_profile_creation_call_mbp_url }}`}</li>
            <li>{`{{ sender.meeting_schedulers.initial_interview_mbp_url }}`}</li>
            <li>{`{{ sender.meeting_schedulers.drupal_tech_1_screening_mbp_url }}`}</li>
            <li>{`{{ sender.meeting_schedulers.toptal_core_academy_mbp_url }}`}</li>
            <li>{`{{ sender.meeting_schedulers.tech_2_devops_azure_mbp_url }}`}</li>
            <li>{`{{ sender.meeting_schedulers.topscreen_technical_1_topscreen_tester_at_apple_review_testing_mbp_url }}`}</li>
            <li>{`{{ sender.meeting_schedulers.relationship_managers_mbp_url }}`}</li>
            <li>{`{{ sender.meeting_schedulers.core_team_recruiting_mbp_url }}`}</li>
            <li>{`{{ sender.meeting_schedulers.no_show_test_mbp_mbp_url }}`}</li>
            <li>{`{{ sender.meeting_schedulers.user_research_mid_client_funnel_mbp_url }}`}</li>
            <li>{`{{ sender.meeting_schedulers.client_user_research_mbp_url }}`}</li>
            <li>{`{{ sender.meeting_schedulers.finance_expert_matching_mbp_url }}`}</li>
            <li>{`{{ sender.meeting_schedulers.toptal_user_research_mbp_url }}`}</li>
            <li>{`{{ sender.meeting_schedulers.topscreen_communication_skills_interview_at_bildit_main_mbp_url }}`}</li>
            <li>{`{{ sender.meeting_schedulers.initial_toptal_interview_mbp_url }}`}</li>
            <li>{`{{ sender.meeting_schedulers.matchers_playbook_initiative_mbp_url }}`}</li>
            <li>{`{{ sender.meeting_schedulers.initial_toptal_interview_dev_high_priority_mbp_url }}`}</li>
            <li>{`{{ sender.meeting_schedulers.finance_expert_technical_1_interview_mbp_url }}`}</li>
            <li>{`{{ sender.meeting_schedulers.tech_1_devops_azure_mbp_url }}`}</li>
            <li>{`{{ sender.meeting_schedulers.marketing_expert_technical_2_interview_mbp_url }}`}</li>
            <li>{`{{ sender.meeting_schedulers.technical_1_interview_mbp_url }}`}</li>
            <li>{`{{ sender.meeting_schedulers.project_manager_short_initial_interview_mbp_url }}`}</li>
            <li>{`{{ sender.meeting_schedulers.mobile_app_user_research_mbp_url }}`}</li>
            <li>{`{{ sender.meeting_schedulers.product_manager_short_initial_interview_mbp_url }}`}</li>
            <li>{`{{ sender.meeting_schedulers.short_initial_interview_mbp_url }}`}</li>
            <li>{`{{ sender.meeting_schedulers.toptal_client_interview_mbp_url }}`}</li>
            <li>{`{{ sender.meeting_schedulers.account_management_mbp_url }}`}</li>
            <li>{`{{ sender.meeting_schedulers.talent_feedback_call_mbp_url }}`}</li>
            <li>{`{{ sender.meeting_schedulers.project_manager_initial_toptal_interview_mbp_url }}`}</li>
            <li>{`{{ sender.meeting_schedulers.technical_2_interview_mbp_url }}`}</li>
            <li>{`{{ sender.meeting_schedulers.toptracker_user_research_mbp_url }}`}</li>
            <li>{`{{ sender.meeting_schedulers.yara_tech_1_mbp_url }}`}</li>
            <li>{`{{ sender.meeting_schedulers.design_screening_1_mbp_url }}`}</li>
            <li>{`{{ sender.meeting_schedulers.meet_with_an_isr_apac_mbp_url }}`}</li>
            <li>{`{{ sender.meeting_schedulers.rm_developer_matching_mbp_url }}`}</li>
            <li>{`{{ sender.meeting_schedulers.profile_editors_mbp_mbp_url }}`}</li>
            <li>{`{{ sender.meeting_schedulers.usability_testing_onboarding_plan_mbp_url }}`}</li>
            <li>{`{{ sender.meeting_schedulers.product_manager_initial_toptal_interview_mbp_url }}`}</li>
            <li>{`{{ sender.meeting_schedulers.yara_tech_2_mbp_url }}`}</li>
            <li>{`{{ sender.meeting_schedulers.smb_project_consultants_mbp_url }}`}</li>
            <li>{`{{ sender.meeting_schedulers.enterprise_research_mbp_url }}`}</li>
            <li>{`{{ sender.meeting_schedulers.matcher_user_research_mbp_url }}`}</li>
            <li>{`{{ sender.meeting_schedulers.toptal_devops_academy_mbp_url }}`}</li>
            <li>{`{{ sender.meeting_schedulers.client_portal_usability_study_mbp_url }}`}</li>
            <li>{`{{ sender.meeting_schedulers.client_research_mbp_url }}`}</li>
            <li>{`{{ sender.meeting_schedulers.meeting_with_an_inbound_sales_representative_mbp_url }}`}</li>
            <li>{`{{ sender.meeting_schedulers.meet_with_an_isr_emea_mbp_url }}`}</li>
            <li>{`{{ sender.meeting_schedulers.meet_with_an_isr_na_mbp_url }}`}</li>
            <li>{`{{ sender.meeting_schedulers.topshield_conversation_mbp_url }}`}</li>
            <li>{`{{ sender.meeting_schedulers.scrum_master_technical_2_interview_mbp_url }}`}</li>
            <li>{`{{ sender.meeting_schedulers.technical_project_manager_technical_1_interview_mbp_url }}`}</li>
            <li>{`{{ sender.meeting_schedulers.data_etl_booking_page_tech_2_mbp_url }}`}</li>
            <li>{`{{ sender.meeting_schedulers.technical_step_2_for_ui_specialization_mbp_url }}`}</li>
            <li>{`{{ sender.meeting_schedulers.ai_tech_1_screening_mbp_url }}`}</li>
            <li>{`{{ sender.meeting_schedulers.tech_1_servicenow_interview_mbp_url }}`}</li>
            <li>{`{{ sender.meeting_schedulers.talent_partners_expedited_tech_screening_mbp_url }}`}</li>
            <li>{`{{ sender.meeting_schedulers.embedded_tech_2_mbp_url }}`}</li>
            <li>{`{{ sender.meeting_schedulers.dev_senior_screener_tech_1_interview_mbp_url }}`}</li>
            <li>{`{{ sender.meeting_schedulers.data_etl_booking_page_tech_1_mbp_url }}`}</li>
            <li>{`{{ sender.meeting_schedulers.drupal_tech_2_screening_mbp_url }}`}</li>
            <li>{`{{ sender.meeting_schedulers.rpa_tech2_screening_mbp_url }}`}</li>
            <li>{`{{ sender.meeting_schedulers.management_consulting_tech_2_interview_mbp_url }}`}</li>
            <li>{`{{ sender.meeting_schedulers.ar_vr_tech_2_screening_mbp_url }}`}</li>
            <li>{`{{ sender.meeting_schedulers.ds_tech_2_screening_mbp_url }}`}</li>
            <li>{`{{ sender.meeting_schedulers.qa_tech_2_screening_mbp_url }}`}</li>
            <li>{`{{ sender.meeting_schedulers.blockchain_tech_2_screening_mbp_url }}`}</li>
            <li>{`{{ sender.meeting_schedulers.wordpress_tech_2_screening_mbp_url }}`}</li>
            <li>{`{{ sender.meeting_schedulers.salesforce_tech_1_screening_mbp_url }}`}</li>
            <li>{`{{ sender.meeting_schedulers.management_consulting_tech_1_interview_mbp_url }}`}</li>
            <li>{`{{ sender.meeting_schedulers.system_security_engineer_architect_mbp_url }}`}</li>
            <li>{`{{ sender.meeting_schedulers.technical_project_manager_technical_2_interview_mbp_url }}`}</li>
            <li>{`{{ sender.meeting_schedulers.project_manager_technical_1_interview_mbp_url }}`}</li>
            <li>{`{{ sender.meeting_schedulers.qa_expedited_tech_2_mbp_url }}`}</li>
            <li>{`{{ sender.meeting_schedulers.expedited_qa_screening_mbp_url }}`}</li>
            <li>{`{{ sender.meeting_schedulers.designer_screening_tech_1_mbp_url }}`}</li>
            <li>{`{{ sender.meeting_schedulers.lee_tech_interview_mbp_url }}`}</li>
            <li>{`{{ sender.meeting_schedulers.salesforce_tech_2_screening_mbp_url }}`}</li>
            <li>{`{{ sender.meeting_schedulers.dynamics_crm_tech_1_interview_mbp_url }}`}</li>
            <li>{`{{ sender.meeting_schedulers.technical_1_solution_architect_mbp_url }}`}</li>
            <li>{`{{ sender.meeting_schedulers.dev_senior_screener_tech_2_interview_mbp_url }}`}</li>
            <li>{`{{ sender.meeting_schedulers.powerbi_tech_2_mbp_url }}`}</li>
            <li>{`{{ sender.meeting_schedulers.rpa_tech1_screening_mbp_url }}`}</li>
            <li>{`{{ sender.meeting_schedulers.devops_tech_2_screening_mbp_url }}`}</li>
            <li>{`{{ sender.meeting_schedulers.qa_tech_1_screening_mbp_url }}`}</li>
            <li>{`{{ sender.meeting_schedulers.db_tech_2_screening_mbp_url }}`}</li>
            <li>{`{{ sender.meeting_schedulers.react_native_screening_mbp_url }}`}</li>
            <li>{`{{ sender.meeting_schedulers.ds_tech_1_screening_mbp_url }}`}</li>
            <li>{`{{ sender.meeting_schedulers.technical_step_1_for_ui_specialization_mbp_url }}`}</li>
            <li>{`{{ sender.meeting_schedulers.magento_tech_1_screening_mbp_url }}`}</li>
            <li>{`{{ sender.meeting_schedulers.ar_vr_tech_1_screening_mbp_url }}`}</li>
            <li>{`{{ sender.meeting_schedulers.blockchain_tech_1_screening_mbp_url }}`}</li>
            <li>{`{{ sender.meeting_schedulers.db_tech_1_screening_mbp_url }}`}</li>
            <li>{`{{ sender.meeting_schedulers.devops_tech_1_screening_mbp_url }}`}</li>
            <li>{`{{ sender.meeting_schedulers.ai_tech_2_screening_mbp_url }}`}</li>
            <li>{`{{ sender.meeting_schedulers.wordpress_tech_1_screening_mbp_url }}`}</li>
            <li>{`{{ sender.meeting_schedulers.expedited_technical_2_interview_mbp_url }}`}</li>
            <li>{`{{ sender.meeting_schedulers.tech_2_engineering_manager_mbp_url }}`}</li>
            <li>{`{{ sender.meeting_schedulers.powerbi_tech_1_mbp_url }}`}</li>
            <li>{`{{ sender.meeting_schedulers.tech_1_engineering_manager_mbp_url }}`}</li>
            <li>{`{{ sender.meeting_schedulers.topscreen_live_coding_interview_for_please_delete_me_at_grimes_morar_rh_mbp_url }}`}</li>
            <li>{`{{ sender.meeting_schedulers.topscreen_take_home_project_for_please_delete_me_at_grimes_morar_rh_mbp_url }}`}</li>
            <li>{`{{ sender.meeting_schedulers.topscreen_communication_skills_interview_at_grimes_morar_rh_mbp_url }}`}</li>
          </ul>
        </Typography>
      </Section>
    </Container>
  </Container>
)

export default EmailTemplateHelpContent
