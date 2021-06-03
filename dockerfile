FROM node

WORKDIR /user/app

COPY . .

RUN ["npm","install"]

EXPOSE 8080

CMD ["npm","run","dev"]