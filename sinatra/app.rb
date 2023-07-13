# frozen_string_literal: true

require 'sinatra'
require 'sequel'
require 'mysql2'
require 'yaml'
require 'json'

if development?
  require 'sinatra/reloader'
  require 'pry'
  require 'better_errors'
end

class WhitePepper < Sinatra::Base
  enable :sessions
  set :session_secret, 'secret'

  set :environment, ENV['RACK_ENV'].to_sym
  set :method_override, true

  configure :development do
    register Sinatra::Reloader
    use BetterErrors::Middleware
    BetterErrors.application_root = __dir__
  end

  configure do
    env = ENV['RACK_ENV']
    DB = Sequel.connect(YAML.safe_load(File.open('database.yml'))[env])
  end

  require './models/pepper'
  require './models/user'

  before do
    headers(
      { 'Access-Control-Allow-Origin' => 'http://localhost',
        'Access-Control-Allow-Credentials' => 'true',
        'Access-Control-Allow-Methods' => 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers' => 'Content-Type,
                                           Access-Control-Allow-Headers,
                                           Authorization, X-Requested-With' }
    )

    halt 200 if request.request_method == 'OPTIONS'

    user_id = env['rack.session']['session_id'].to_s[0..6]
    @user = User[user_id]

    unless @user
      @user = User.new
      @user.set_fields({ id: user_id, created_at: Time.now }, %i[id created_at])
      @user.save(raise_on_failure: false)
    end
  end

  get '/' do
    peppers = Pepper.where(user_id: @user.id).all
    peppers_cleaned = clean_up_peppers(peppers)
    return JSON.generate(peppers: serialize_peppers(peppers_cleaned))
  end

  post '/pepper' do
    pepper = Pepper.new(x: params[:x].to_i, y: params[:y].to_i, user_id: @user.id)
    JSON.generate(pepper.save(raise_on_failure: false).to_hash)
  end

  put '/pepper' do
    pepper = Pepper.where(id: params[:id].to_i).first
    pepper.text = params[:text]
    JSON.generate(pepper.save(raise_on_failure: false).to_hash)
  end

  delete '/pepper' do
    Pepper.where(id: params[:id].to_i).delete
    JSON.generate(pepper: 'deleted')
  end

  helpers do
    def serialize_peppers(peppers = [])
      peppers.map do |pepper|
        {
          id: pepper.id,
          text: pepper.text,
          x: pepper.x,
          y: pepper.y
        }
      end
    end

    def clean_up_peppers(peppers)
      peppers.each { |pepper| pepper.text.nil? ? pepper.delete : nil }
      peppers.reject { |pepper| pepper.text.nil? }
    end
  end
end
