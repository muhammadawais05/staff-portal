# Multi-stage build, stage 1, enable layer caching for node_modules
FROM node:14-alpine as packages

WORKDIR /app
RUN chown -R node /app

USER node

COPY --chown=node:node package.json yarn.lock lerna.json ./

# Copy all packages
COPY --chown=node:node hosts hosts
COPY --chown=node:node namespaces namespaces
COPY --chown=node:node libs libs
COPY --chown=node:node monorepo-helpers monorepo-helpers

# Find and remove non-package.json files
RUN find hosts \! -name "package.json" -mindepth 2 -maxdepth 2 -print | xargs rm -rf
RUN find namespaces \! -name "package.json" -mindepth 4 -maxdepth 4 -print | xargs rm -rf
RUN find libs \! -name "package.json" -mindepth 2 -maxdepth 2 -print | xargs rm -rf

# Copy patches
COPY --chown=node:node patches patches

# Multi-stage build, stage 2, build an actual image
FROM node:14-alpine

ARG NPM_TOKEN
ENV NPM_TOKEN ${NPM_TOKEN}

ENV APK_BRANCH=3.10

RUN printf "http://nl.alpinelinux.org/alpine/v$APK_BRANCH/%s\n" community main > /etc/apk/repositories && \
  apk add --no-cache \
  harfbuzz \
  nss \
  git \
  curl \
  jq \
  chromium \
  openssh-client \
  bash \
  sed \
  shadow

# Change default 'node' user id to match jenkins CI user id
# so when we will be running container from CI it would have
# all necessary rights for npm/yarn publish
RUN groupmod -g 469 node && usermod -u 469 -g 469 node

WORKDIR /app
RUN chown -R node /app

USER node

# Copy files from the first build stage:
# here we copy only package.json, yarn.lock, lerna.json and patch files
# (there are no other files in `/app` at this point)
# https://docs.docker.com/develop/develop-images/multistage-build/
COPY --chown=node:node --from=packages /app .

# Add github.com to known ssh hosts
RUN mkdir ~/.ssh
RUN ssh-keyscan github.com >> ~/.ssh/known_hosts

# Needs to be updated for publishing package to npm
RUN printf '//registry.npmjs.org/:_authToken=${NPM_TOKEN}\nalways-auth=true\n' > .npmrc

RUN yarn install --frozen-lockfile --network-timeout 120000

COPY --chown=node:node tmp-graphql ./tmp-graphql/
COPY --chown=node:node . /app

RUN yarn build
