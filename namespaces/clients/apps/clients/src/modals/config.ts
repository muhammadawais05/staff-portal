export const SEND_TO_COMPANY_REPRESENTATIVE_REGEX =
  /#modal=\/platform\/roles\/(?<nodeId>\d+)\/email\/send_to_company_representative(?:(?=\?)(?:[?&]email_template_id=(?<preselectedEmailTemplateId>\d+)*):?)*/
export const SEND_INITIAL_CLAIM_EMAIL_MODAL_REGEX =
  /#modal=\/platform\/staff\/applicants\/clients\/(?<nodeId>\d+)\/send_claim_email(?:(?=\?)(?:[?&]email_template_id=(?<preselectedEmailTemplateId>\d+)*):?)*/
export const CLAIM_CLIENT_ENTERPRISE_MODAL_REGEX =
  /#modal=\/platform\/staff\/applicants\/clients\/(?<clientId>\d+)\/claim_enterprise\/?/
