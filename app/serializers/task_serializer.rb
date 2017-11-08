class TaskSerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :due_date, :grouped, :complete
  has_many :categories
  belongs_to :user
end