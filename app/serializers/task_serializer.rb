class TaskSerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :complete, :due_date
  belongs_to :user
  has_many :categories
end
