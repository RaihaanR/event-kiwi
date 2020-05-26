FROM node:latest
COPY package-lock.json package-lock.json
COPY dist/ dist/
RUN npm ci --production
CMD node .