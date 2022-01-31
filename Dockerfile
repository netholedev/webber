FROM node:16.13.2 as base

ARG PORT

COPY package*.json ./

RUN npm i

COPY src ./src
COPY tsconfig.json ./tsconfig.json
COPY views ./views
COPY public ./public

RUN npm run build

FROM gcr.io/distroless/nodejs:16

COPY --from=base ./node_modules ./node_modules
COPY --from=base /dist /dist
COPY --from=base /views ./views
COPY --from=base /public ./public

EXPOSE ${PORT}

CMD ["dist/main.js"]