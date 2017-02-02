# Disable react-rails sprockets strategy to prevent react compilation

Rails.application.config.react.sprockets_strategy = false
Rails.application.config.react.camelize_props = true
