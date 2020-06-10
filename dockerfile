FROM node:12
RUN mkdir /integra-market-api
ADD . /integra-market-api
WORKDIR /integra-market-api
RUN npm i
EXPOSE 80
CMD ["npm", "start"]