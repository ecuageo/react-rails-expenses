# Disable react-rails sprockets strategy to prevent react compilation
Rails.application.config.react.sprockets_strategy = false

# Convert props object from ruby-style snake_case to js-style camelCase
Rails.application.config.react.camelize_props = true
