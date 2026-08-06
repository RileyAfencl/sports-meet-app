module Postings
  class Search
    def initialize(filters:, current_profile:)
      @filters = filters
      @current_profile = current_profile
    end

    def call
      scope = Posting.all
      scope = filter_by_activities(scope)
      scope = filter_by_date_range(scope)
      scope = filter_by_age_eligibility(scope)
      scope = filter_by_visibility(scope)
      scope = filter_by_capacity(scope)
      scope
        .includes(:activity, { creator_profile: :activities }, { participants: :activities })
        .order(:starts_at)
    end

    private

    attr_reader :filters, :current_profile

    def filter_by_activities(scope)
      scope.joins(:activity).where(activities: { name: filters[:activities] })
    end

    def filter_by_date_range(scope)
      scope.where(starts_at: search_start_time..search_end_time)
    end

    def filter_by_age_eligibility(scope)
      return scope if current_profile.blank?

      viewer_age = current_profile.age
      return scope if viewer_age.nil?

      scope.where("participant_age_min IS NULL OR participant_age_min <= ?", viewer_age)
           .where("participant_age_max IS NULL OR participant_age_max >= ?", viewer_age)
    end

    def filter_by_visibility(scope)
      return scope if current_profile.blank?

      scope.where(participant_visibility: visibility_options_for(current_profile.sex))
    end

    def filter_by_capacity(scope)
      scope.where(
        <<~SQL.squish
          postings.participant_limit IS NULL OR (
            SELECT COUNT(*)
            FROM posting_participants
            WHERE posting_participants.posting_id = postings.id
          ) < postings.participant_limit
        SQL
      )
    end

    def visibility_options_for(sex)
      case sex
      when "male"
        [:anyone, :male, :male_female, :male_other]
      when "female"
        [:anyone, :female, :male_female, :female_other]
      when "other"
        [:anyone, :other, :male_other, :female_other]
      else
        [:anyone]
      end
    end

    def search_start_time
      @search_start_time ||= parse_time(filters.dig(:date_range, :start))
    end

    def search_end_time
      @search_end_time ||= parse_time(filters.dig(:date_range, :end))
    end

    def parse_time(value)
      Time.iso8601(value.to_s)
    end
  end
end
