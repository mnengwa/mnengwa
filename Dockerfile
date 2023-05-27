FROM node:bullseye-slim

WORKDIR /app

COPY package*.json ./

RUN npm clean-install

COPY . .

# Svelte env
ENV PORT=2000
ENV HOST=0.0.0.0
ENV BODY_SIZE_LIMIT=512
ENV ORIGIN=https://mnengwa.com
ENV HOST_HEADER=x-forwarded-host
ENV ADDRESS_HEADER=True-Client-IP
ENV PROTOCOL_HEADER=x-forwarded-proto

RUN npm run build

CMD ["node", "build"]