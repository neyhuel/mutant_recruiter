FROM node:alpine
COPY /controllers /usr/bin/app/controllers
COPY /routes /usr/bin/app/routes
COPY app.js package.json /usr/bin/app/
WORKDIR /usr/bin/app
RUN npm install
CMD ["node","app.js"]
