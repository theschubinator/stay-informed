class Admin < ApplicationRecord
	validates :name, :description, :categories, presence: true
	
end