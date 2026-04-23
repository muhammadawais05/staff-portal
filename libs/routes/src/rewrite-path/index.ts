import rewriteCallRequestClaimPath from './rewrite-call-request-claim-path'
import rewriteRootPath from './rewrite-root-path'
import rewriteJobBillingTabPath from './rewrite-job-billing-tab-path'
import rewriteTalentUpdatePath from './rewrite-talent-update-path'
import rewriteCompanyRepresentativeUpdatePath from './rewrite-company-representative-update-path'
import rewriteEmailTemplatePage from './rewrite-email-template-page'

const PATH_REWRITE_RULES = [
  rewriteRootPath,
  rewriteCallRequestClaimPath,
  rewriteJobBillingTabPath,
  rewriteTalentUpdatePath,
  rewriteCompanyRepresentativeUpdatePath,
  rewriteEmailTemplatePage
]

export default PATH_REWRITE_RULES
