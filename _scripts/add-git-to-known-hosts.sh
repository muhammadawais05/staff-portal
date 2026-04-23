# add github to known_hosts
mkdir -p ~/.ssh
ssh-keyscan -t ssh-rsa github.com >> ~/.ssh/known_hosts
