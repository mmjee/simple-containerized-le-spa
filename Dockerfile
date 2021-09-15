FROM node:lts AS compiled

WORKDIR /app
COPY your-app-here/ .

# Add your ENV stuff here

RUN yarn install
RUN yarn build


FROM node:lts

ENV NODE_ENV=production
WORKDIR /app

COPY package.json ./
COPY yarn.lock ./
COPY index.js ./
COPY scls ./scls

COPY .greenlockrc ./
COPY greenlock.d ./greenlock.d

RUN yarn install

# You may opt to init greenlock here.

COPY --from=compiled /app/dist /app/frontend
ENV NODE_PATH=.
EXPOSE 80
EXPOSE 443
CMD ["node", "index.js"]
