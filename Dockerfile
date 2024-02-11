FROM node:18

WORKDIR /app

COPY package.json .
COPY pnpm-lock.yaml .

ARG AUTH_SECRET=hRsRA8krwT1Q8qj
ARG NEXT_PUBLIC_BACKEND_BASEURL=https://backend.menuma.online
ARG NEXT_PUBLIC_BACKEND_SOCKET_SERVER_HOST=backend.menuma.online
ARG NEXT_PUBLIC_BACKEND_SOCKET_SERVER_SECURE=0
ARG NEXTAUTH_URL=http://dashboard.menuma.online

ENV AUTH_SECRET=${AUTH_SECRET}
ENV NEXT_PUBLIC_BACKEND_BASEURL=${NEXT_PUBLIC_BACKEND_BASEURL}
ENV NEXT_PUBLIC_BACKEND_SOCKET_SERVER_HOST=${NEXT_PUBLIC_BACKEND_SOCKET_SERVER_HOST}
ENV NEXT_PUBLIC_BACKEND_SOCKET_SERVER_SECURE=${NEXT_PUBLIC_BACKEND_SOCKET_SERVER_SECURE}
ENV NEXTAUTH_URL=${NEXTAUTH_URL}

RUN npm i -g pnpm
RUN pnpm i

COPY . .

RUN pnpm build

EXPOSE 3000:3000

CMD ["pnpm", "start"]