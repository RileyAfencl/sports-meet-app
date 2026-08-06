class Api::PostingsController < ApplicationController
  def search
    filters = search_params
    errors = presence_errors +
      radius_miles_value_errors(filters) +
      activities_value_errors(filters) +
      date_range_value_errors(filters)

    if errors.any?
      return render json: { errors: errors }, status: :unprocessable_entity
    end

    postings = Postings::Search.new(
      filters: filters,
      current_profile: current_profile
    ).call

    render json: {
      postings: ::PostingSerializer.collection(postings),
      filters: filters
    }
  end

  private

  def current_profile
    # Dev stand-in until auth — matches mock-current-user.ts (profile id 6)
    Profile.find_by(id: 6)
  end

  def search_params
    params.permit(
      :radius_miles,
      activities: [],
      date_range: [:start, :end]
    )
  end

  def presence_errors
    errors = []

    unless params.key?(:activities) || params.key?("activities")
      errors << "activities is required"
    end

    unless params.key?(:radius_miles) || params.key?("radius_miles")
      errors << "radius_miles is required"
    end

    unless params.key?(:date_range) || params.key?("date_range")
      errors << "date_range is required"
    end

    errors
  end

  def radius_miles_value_errors(filters)
    errors = []
    radius_miles = filters[:radius_miles]

    if radius_miles.nil?
      errors << "radius_miles cannot be null"
      return errors
    end

    begin
      radius = Float(radius_miles)
    rescue ArgumentError, TypeError
      errors << "radius_miles must be a number"
      return errors
    end

    if radius < 1 || radius > 50
      errors << "radius_miles must be between 1 and 50"
    end

    errors
  end

  def activities_value_errors(filters)
    errors = []
    activities = filters[:activities]

    if activities.nil?
      errors << "activities cannot be null"
      return errors
    end

    unless activities.is_a?(Array)
      errors << "activities must be an array"
      return errors
    end

    if activities.empty?
      errors << "activities cannot be empty"
      return errors
    end

    if activities.any? { |activity| !activity.is_a?(String) }
      errors << "activities must contain only strings"
    end

    errors
  end

  def date_range_value_errors(filters)
    errors = []
    date_range = filters[:date_range]

    if date_range.nil?
      errors << "date_range cannot be null"
      return errors
    end

    unless date_range.is_a?(ActionController::Parameters) || date_range.is_a?(Hash)
      errors << "date_range must be an object"
      return errors
    end

    unless date_range.key?(:start) || date_range.key?("start")
      errors << "date_range.start is required"
    end

    unless date_range.key?(:end) || date_range.key?("end")
      errors << "date_range.end is required"
    end

    return errors if errors.any?

    start_time = parse_datetime(date_range[:start])
    end_time = parse_datetime(date_range[:end])

    errors << "date_range.start must be a valid date" if start_time.nil?
    errors << "date_range.end must be a valid date" if end_time.nil?

    if start_time.is_a?(Time) && start_time < Time.current.beginning_of_day
      errors << "date_range.start cannot be before today"
    end

    if start_time.is_a?(Time) && end_time.is_a?(Time)
      if start_time > end_time
        errors << "date_range.start cannot be after date_range.end"
      elsif end_time > start_time + 14.days
        errors << "date_range.end cannot be more than 14 days after date_range.start"
      end
    end

    errors
  end

  def parse_datetime(value)
    return nil if value.nil?

    Time.iso8601(value.to_s)
  rescue ArgumentError
    nil
  end
end
