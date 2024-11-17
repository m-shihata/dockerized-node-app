FROM node:lts AS base


FROM base AS development

WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
EXPOSE 4000
CMD ["npm", "run", "dev"]


FROM base AS production

WORKDIR /app
COPY package.json .
RUN npm install --only=production
COPY . .
EXPOSE 80
CMD ["npm", "start"]