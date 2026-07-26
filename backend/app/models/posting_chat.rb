class PostingChat < ApplicationRecord
  belongs_to :posting

  has_many :posting_chat_participants, dependent: :destroy
  has_many :participants, through: :posting_chat_participants, source: :profile
  has_many :posting_chat_messages, dependent: :destroy

  validates :posting_id, presence: true, uniqueness: true
end
