normal=$(tput sgr0)
bold=$(tput bold)
blue=$(tput setaf 4)
red=$(tput setaf 1)

documentationLink="${blue}https://toptal-core.atlassian.net/wiki/spaces/ENG/pages/2200436828/Accessing+latest+GraphQL+Gateway+schema+dump#Accessing-the-GCP-bucket-from-the-CLI"

sdkMissingError="\n${bold}${red}You need to have Google Cloud SDK installed and configured locally.\n\n${normal}Please follow the instructions from this document: ${documentationLink}\n"

authError="\n${bold}${red}You are not logged in into gcloud.\n\n${normal}Please run ${bold}\`gcloud auth application-default login\` ${normal}to log in.\n\nFull documentation: ${documentationLink}\n"

gcloudAuthOutputFile="gcloudAuthOutput.log"
gcloudNoCredentialsString="No credentialed accounts"

# check if gsutil exists
command -v gsutil > /dev/null 2>&1 || { echo >&2 ${sdkMissingError}; exit 1; }

# check if user is logged in into gcloud
gcloud auth list > $gcloudAuthOutputFile 2>&1

cat "${gcloudAuthOutputFile}" | grep -q "${gcloudNoCredentialsString}" && { echo >&2 ${authError}; exit 1;}

# remove temporary log file
rm ${gcloudAuthOutputFile}

exit 0
