# vi: ft=dockerfile
FROM mysql:5.7

ENV MYSQL_ROOT_PASSWORD 1234
ENV MYSQL_USER suki60
ENV MYSQL_PASSWORD 1234
ENV MYSQL_DATABASE white_pepper

COPY ./init.sql /docker-entrypoint-initdb.d/

CMD ["mysqld"]
