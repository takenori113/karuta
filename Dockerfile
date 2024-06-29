FROM node:20-alpine

WORKDIR /nextjs

COPY . .

RUN npm install
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]