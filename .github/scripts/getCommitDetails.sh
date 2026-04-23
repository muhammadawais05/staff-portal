buildUrl="${GITHUB_SERVER_URL}/${GITHUB_REPOSITORY}/actions/runs/${GITHUB_RUN_ID}"
gitCommitLink="${GITHUB_SERVER_URL}/${GITHUB_REPOSITORY}/commit/${COMMIT_SHA}"

if [[ -n "$PULL_REQUEST_ID" ]]
then
  message="Build <${buildUrl}|#${GITHUB_RUN_ID}> with <${gitCommitLink}|${COMMIT_SHA:0:12}> (PR <${{ github.event.pull_request.html_url }}|#${PULL_REQUEST_ID}> by <${GITHUB_SERVER_URL}/${{ github.event.pull_request.user.login }}|${{ github.event.pull_request.user.login }}>)."
else
  message="Build <${buildUrl}|#${GITHUB_RUN_ID}> with <${gitCommitLink}|${COMMIT_SHA:0:12}> (by ${GIT_COMMIT_AUTHOR})."
fi

if [[ -n "$NEW_PACKAGE_VERSION" ]]
then
  message="$message\n\nNew package: \`${NEW_PACKAGE_VERSION}\`\nSee <${GITHUB_SERVER_URL}/${GITHUB_REPOSITORY}/releases/tag/v${NEW_PACKAGE_VERSION}|release notes>"
fi

# Newlines must be encoded, otherwise they will be displayed as-is
message="${message//\\n/%0A}"
message="${message//\\r/%0D}"

echo "::set-output name=message::$message"
