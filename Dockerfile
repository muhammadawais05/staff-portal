FROM node:14

ARG NPM_TOKEN
ENV NPM_TOKEN ${NPM_TOKEN}

# Change default 'node' user id to match jenkins CI user id
# so when we will be running container from CI it would have
# all necessary rights for npm/yarn publish
RUN groupmod -g 469 node && usermod -u 469 -g 469 node

WORKDIR /app
RUN chown -R node /app

USER node

# Add github.com to known ssh hosts
RUN mkdir ~/.ssh
RUN ssh-keyscan github.com >> ~/.ssh/known_hosts

# Needs to be updated for publishing package to npm
RUN printf '//registry.npmjs.org/:_authToken=${NPM_TOKEN}\nalways-auth=true\n' > .npmrc

# Enables layer caching
COPY --chown=node:node package.json yarn.lock ./
COPY --chown=node:node patches/ ./patches
RUN yarn install --frozen-lockfile --network-timeout 120000

COPY --chown=node:node . /app

RUN yarn build
