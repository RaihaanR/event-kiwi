FROM node:latest
COPY package.json package.json
COPY package-lock.json package-lock.json
COPY dist/ dist/
COPY .npm/ .npm/
RUN npm ci --cache .npm --production
RUN rm -rf .npm
CMD node .