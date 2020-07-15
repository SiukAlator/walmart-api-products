FROM node:8.11.4-alpine
ENV PORT 4000
ENV DATABASE_URL mongodb://productListUser:productListPassword@192.168.1.82:27017/
USER root
LABEL author="César Delgado" maintainer="cesar.delgado.arcos@gmail.com"

COPY ./ .
RUN npm install

CMD ["node", "index.js"]