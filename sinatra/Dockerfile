FROM ruby:2.6.2

WORKDIR /app

# install wait-for-it
RUN wget -q https://raw.githubusercontent.com/vishnubob/wait-for-it/81b1373f17855a4dc21156cfe1694c31d7d1792e/wait-for-it.sh \
 && mv wait-for-it.sh /usr/local/bin/wait-for-it \
 && chmod +x /usr/local/bin/wait-for-it

COPY Gemfile Gemfile.lock ./
RUN bundle install

COPY . .

EXPOSE 9292

CMD ["wait-for-it", "mysql:3306", "-t", "600", "--", "bundle", "exec", "rackup", "--host", "0.0.0.0", "-p", "9292"]
