FROM ruby:2.6.2

WORKDIR /app

COPY Gemfile Gemfile.lock ./
RUN bundle install

COPY . .

# Running app
RUN bundle exec rackup
