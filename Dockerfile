FROM node:16

WORKDIR /
COPY . .
EXPOSE 3000
RUN npm install || exit 0
CMD ["npm", "start"]