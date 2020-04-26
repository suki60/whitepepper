require 'sequel'

class User < Sequel::Model
  set_primary_key :id
  one_to_many :peppers
end
