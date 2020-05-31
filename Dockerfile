FROM node:latest
COPY package.json package.json
COPY dist/ dist/
COPY sql/ sql/
COPY node_modules/ node_modules/
CMD node .
