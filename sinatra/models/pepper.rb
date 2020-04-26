require 'sequel'

class Pepper < Sequel::Model
  set_primary_key :id
  many_to_one :users
end
