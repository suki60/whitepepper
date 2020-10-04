FROM ruby:2.6.2

WORKDIR /app

COPY Gemfile Gemfile.lock ./
RUN bundle install

COPY . .

CMD bundle exec rackup
