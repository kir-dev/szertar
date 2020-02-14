FROM node:12.13.1
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json /usr/src/app/
COPY package-lock.json /usr/scr/app/
RUN npm install --ignore-scripts --verbose --unsafe-perm
COPY . /usr/src/app
EXPOSE 8000
CMD [ "npm", "start" ]
