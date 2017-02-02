class Record < ApplicationRecord
  validates_datetime :start_time
  validates_datetime :end_time, after: :start_time
end
