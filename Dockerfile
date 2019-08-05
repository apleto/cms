FROM node:lts

WORKDIR /usr/src/apleto/cms

# RUN apt update

# RUN  apt-get update &&  apt-get install -y apt-transport-https
# RUN curl -s https://packages.cloud.google.com/apt/doc/apt-key.gpg |  apt-key add -
# RUN echo "deb http://apt.kubernetes.io/ kubernetes-xenial main" |  tee -a /etc/apt/sources.list.d/kubernetes.list
# RUN  apt-get update
# RUN  apt-get install -y kubectl

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3030
EXPOSE 443
EXPOSE 80

CMD ["npm", "start"]
