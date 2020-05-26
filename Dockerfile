FROM node:latest
COPY package.json package.json
COPY dist/ dist/
RUN npm install --only=prod
CMD node .