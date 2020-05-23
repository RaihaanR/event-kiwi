FROM node:12.16.3
COPY package.json package.json
RUN npm install
CMD npm run start