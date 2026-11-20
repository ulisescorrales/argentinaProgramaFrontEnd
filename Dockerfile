FROM node:20.16.0
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm install
RUN npm install -g @angular/cli
COPY . /usr/src/app
EXPOSE 4200

#RUN useradd porfolio
#USER porfolio

CMD ["ng","serve","--host","0.0.0.0"]