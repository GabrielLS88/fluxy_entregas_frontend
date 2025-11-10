FROM node:20-alpine 

RUN ["mkdir", "/app"]

RUN ["npm", "install",  "-g", "pnpm"]

WORKDIR /app

COPY package.json /app

RUN ["pnpm", "install"]

COPY . .

CMD ["pnpm", "dev", "--host"]