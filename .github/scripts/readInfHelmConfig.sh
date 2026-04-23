if [[ ! -f configuration.yml ]]; then
  echo "configuration.yml file not found, exiting!"
  exit 1
fi

configurationName="staff-portal-staging-deployment"

HELM_RELEASE=$(yq e .${configurationName}.release configuration.yml)
HELM_CHART=$(yq e .${configurationName}.chart configuration.yml)
KUBERNETES_PROJECT=$(yq e .${configurationName}.project configuration.yml)
KUBERNETES_CLUSTER=$(yq e .${configurationName}.cluster configuration.yml)
KUBERNETES_ZONE=$(yq e .${configurationName}.zone configuration.yml)

echo "HELM_RELEASE=${HELM_RELEASE//\"/}" >> $GITHUB_ENV
echo "HELM_CHART=${HELM_CHART//\"/}" >> $GITHUB_ENV
echo "KUBERNETES_PROJECT=${KUBERNETES_PROJECT//\"/}" >> $GITHUB_ENV
echo "KUBERNETES_CLUSTER=${KUBERNETES_CLUSTER//\"/}" >> $GITHUB_ENV
echo "KUBERNETES_ZONE=${KUBERNETES_ZONE//\"/}" >> $GITHUB_ENV
