# frozen_string_literal: true

Sequel.migration do
  change do
    create_table :peppers do
      primary_key :id
      String :text, text: true
      Fixnum :x
      Fixnum :y
      foreign_key :user_id, :users, type: 'varchar(7)'
    end
  end
end
