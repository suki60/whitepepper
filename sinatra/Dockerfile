FROM ruby:2.6.2

WORKDIR /app

# install wait-for-it
RUN wget -q https://raw.githubusercontent.com/getapp/wait-for-it/master/wait-for-it.sh \
    && mv wait-for-it.sh /usr/local/bin/wait-for-it \
    && chmod +x /usr/local/bin/wait-for-it

COPY Gemfile Gemfile.lock ./
RUN bundle install

COPY . .

EXPOSE 9292

CMD ["wait-for-it", "mysql:3306", "-t", "600", "--", "bundle", "exec", "rackup", "--host", "0.0.0.0", "-p", "9292"]
