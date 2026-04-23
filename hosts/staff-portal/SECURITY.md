# Staff Portal's security

This document describes the measures we implement to develop and keep Staff
Portal app adequately secure.

Scope covered (as of October 5, 2020):

- Call Requests list
- Communication Tracking (incl. Send Email)
- Company Applicants list
- Invoices list
- My Operational Issues list
- Operational Issues tree view
- Status messages
- Tasks list

## Security in Implementation

### OWASP Top Ten (2017)

To reduce the risk of security vulnerabilities in implementation we use the
[OWASP Top 10 (2017)](https://www.owasp.org/index.php/Top_10-2017_Top_10).

- [**A1-Injection**](https://www.owasp.org/index.php/Top_10-2017_A1-Injection)

  - **SQL injection**

    - Staff Portal is a frontend React app. Database communication is done at
      Platform's backend side which is implemented in Ruby on Rails.

  - **Shell Command injection**

    - Not applicable. Shell commands are not executed by the application's code.

- [**A2-Broken Authentication**](https://www.owasp.org/index.php/Top_10-2017_A2-Broken_Authentication)

  - Staff Portal relies on authorization measures implemented in the Platform
    and LENS.

  - **TODO ([SPC-565](https://toptal-core.atlassian.net/browse/SPC-565))**:
    Staff Portal should use a cookie with the `httponly` flag for LENS
    authentication. Currently JWT token is used and is stored at browser's
    LocalStorage. There's a threat that such token can be gathered with
    JavaScript in case of a XSS attack.

- [**A3-Sensitive Data Exposure**](https://www.owasp.org/index.php/Top_10-2017_A3-Sensitive_Data_Exposure)

  - Data in transit:

    - All data in-transit is encrypted with TLS 1.3.

    - **TODO ([INF-2023](https://toptal-core.atlassian.net/browse/INF-2023))**:
      `Strict-Transport-Security` header should be enabled for staff.toptal.com
      and staff-portal.toptal.net. Such header notifies user agents to only
      connect to a given site over HTTPS.

  - Data at rest:

    - The Platform's database is used to store all the data. Related protection
      measures are described in
      [the Platform's Security.md file](https://github.com/toptal/platform/blob/master/SECURITY.md).

- [**A4-XML External Entities (XXE)**](<https://www.owasp.org/index.php/Top_10-2017_A4-XML_External_Entities_(XXE)>)

  - Not applicable. The application doesn't accept XML directly and XML uploads
    (including SAML and SOAP messages).

- [**A5-Broken Access Control**](https://www.owasp.org/index.php/Top_10-2017_A5-Broken_Access_Control)

  - With the exception of public pages, deny by default (authorization is
    required).

  - Web server directory listing is disabled.

  - File metadata (e.g. `.git`) and backup files are not present within web
    roots.

  - Cross-origin Resource Sharing is not applicable to frontend applications.

- [**A6-Security Misconfiguration**](https://www.owasp.org/index.php/Top_10-2017_A6-Security_Misconfiguration)

  - Node is not running in development mode.

  - Node is not running with sudo privileges. Staff Portal runs in
    `gcr.io/toptal-hub/helm:${helmVersion}` Docker container on behalf of a
    regular user.

- [**A7-Cross-Site Scripting (XSS)**](<https://www.owasp.org/index.php/Top_10-2017_A7-Cross-Site_Scripting_(XSS)>)

  - We use ReactJS' built-in XSS countermeasures.

  - All 4 occurences of `dangerouslySetInnerHTML`
    ([1](https://github.com/toptal/staff-portal/blob/63e0bd4ef33bc3de2cf4d8b31fc9023f38136dcb/src/modules/communication/send-email-modal/components/EmailPreview/EmailPreview.tsx#L30),
    [2](https://github.com/toptal/staff-portal/blob/ab5035adb9a8d2f1098bdd0549186c51ee35a173/src/topkit/autocomplete-highlight/components/AutocompleteHighlightOptionLabel/AutocompleteHighlightOptionLabel.tsx#L26),
    [3](https://github.com/toptal/staff-portal/blob/528e4b3126403f1f4ca6872ce4f7b8bc34a0adea/src/modules/status-messages/components/GeneralStatusMessageDefault/GeneralStatusMessageDefault.tsx#L26),
    [4](https://github.com/toptal/staff-portal/blob/bfd5dea209f30ccf145949fefe041e534fee3750/src/modules/summary-sidebar/components/OperationalIssuesList/OperationalIssuesList.tsx#L118))
    are not affected by XSS. Previously, there have been fixes implemented in
    [SPC-604](https://toptal-core.atlassian.net/browse/SPC-604).

  - `createElement` methods is used
    [once](https://github.com/toptal/staff-portal/blob/c8aeb8520b8674b4c6b525c2c1f89c55d38e4729/public/index.html#L73)
    and not affected by XSS because:
    - `children` argument is not used;
    - `type` argument is a constant string and can't be easily
      changed/controlled;
    - arbitary props can't be supplied by a user, environment variable is used.

- [**A8-Insecure Deserialization**](https://www.owasp.org/index.php/Top_10-2017_A8-Insecure_Deserialization)

  - No luck in exploiting both 2 implementations
    ([serializer.ts](https://github.com/toptal/staff-portal/blob/6af29c4f50a03c9e202f6fa257d781361f9c1b1f/src/topkit/query-params-state/services/serializer.ts#L13),
    [url-serialization.ts](https://github.com/toptal/staff-portal/blob/f7fdad9ec2bba6c25fa8af82127aa51119e6bfad/src/topkit/core/utils/url-serialization.ts#L11))
    of `deserialize` method.

- [**A9-Using Components with Known Vulnerabilities**](https://www.owasp.org/index.php/Top_10-2017_A9-Using_Components_with_Known_Vulnerabilities)

  - Yarn is used to manage `npm` packages. In order to monitor dependency
    vulnerabilities there are 2 checks in-place:

    - pre-commit hooks that run on Github. They're a part of GitHub's Dependabot
      Alerts feature;
    - weekly security scans that run on Jenkins
      ([staff-portal-master-security-audit](https://jenkins-build.toptal.net/job/SecOps/job/staff-portal-master-security-audit/)
      job) and report results to
      [#staff-portal-bullhorn](https://toptal-core.slack.com/archives/CVCBLV5QD)
      Slack channel. Snyk tool is used to detect vulnerable NPM dependencies.

  - Also, we automatically create PRs to update dependencies with `dependabot`
    tool.

- [**A10-Insufficient Logging & Monitoring**](https://www.owasp.org/index.php/Top_10-2017_A10-Insufficient_Logging%26Monitoring)

  - Sentry is used as monitoring solution. Alerts are automatically reported to
    [#staff-portal-bullhorn](https://toptal-core.slack.com/archives/CVCBLV5QD)
    Slack channel which is audited on daily basis.
