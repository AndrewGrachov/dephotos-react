FROM ubuntu:14.04
RUN apt-get update --fix-missing
RUN apt-get install -y curl
RUN apt-get install -y build-essential
RUN apt-get install -y software-properties-common python-software-properties
RUN add-apt-repository ppa:fkrull/deadsnakes
RUN curl --silent --location https://deb.nodesource.com/setup_4.x | sudo bash -
RUN apt-get install --yes nodejs
ENV NODE_ENV sandbox
WORKDIR /src
ADD . /src
EXPOSE 4000
CMD ['node', 'app.js']