# ReactRailsExpenses

A primer in `ReactJS` following [this tutorial](https://www.airpair.com/reactjs/posts/reactjs-a-guide-for-rails-developers), done using ruby on rails as a backend.

I used this app to experiment on how to use `ReactJS` and `RoR`, I feel it is quite close to a nice solution.

## Running the app locally

- Install dependencies: `bundle && yarn`
- Initialize the DB: `rails db:create && rails db:migrate && rails db:seed`
- Run the front-end build: `bin/webpack-watcher`
- Run the server: `rails server`
- Visit `localhost:3000`

## Initial objectives

My objectives were the following:
- Use `rails` for routing and data management
- Render `react` components with preloaded data instead of views
- Leverage both (`react`/`js` and `RoR`) ecosystems as best as possible
- Minimal configuration (following rails philosophy)
- Rely on existing libraries as much as possible

## Where I've gotten so far
It is based on two gems: `webpacker` and `react-rails`, `webpacker` exposes the `npm` ecosystem quite well without much setup, `react-rails` provides server-side rendering and unobtrusive client-side mounting of the components.

I can then write the components in `app/javascripts/`, export them from `app/javascripts/packs/components.js`, an use them from views with `react-rails`'s `react_component` helper:

```erb
  # views/records/index.html.erb
  <%= react_component 'App.Records', { records: @records }, { prerender: true } %>
```

Then simply run the app with `rails s` and `bin/webpack-watcher`, and you get server-side rendered `react` with rails (there are still of course some [caveats](#caveats)).

## How I got here

- Added `webpacker` and `react-rails` to your `Gemfile`
- Ran `rails react:install`, `rails webpacker:install` and `rails webpacker:install:react`
- In `config/webpack/shared.js`, added `library: App` to the `output` options object, to expose the components globally so the prerenderer and client-side mounter can access them.
- In `config/webpack/shared.js`, added `externals: { react: 'React' }` to `module.exports` to use the globally declared instance of `ReactJS` created by `react-rails`
- In `config/init/assets.rb`, added `config.assets.paths << 'public/packs'` so the prerenderer can load it (it uses sprockets)
- In `config/init/react_rails.rb`, added `config.react.sprockets_strategy = false` because the compilation is done by `webpacker`, so we don't need `react-rails`'s
- In `config/init/react_rails.rb`, added `config.react.server_renderer_options = { files: ['react-server.js', 'components.js']}`, this provides everything needed for server-side rendering
- Added `app/javascripts/packs/components.js` which bundles all the javascript and exposes the top level components globally
- Added `<%= javascript_pack_tag 'components' %>` to `app/views/layouts/application.html.erb` to include the bundle with the app.

## Caveats

The main issue right now has to do with how `react-rails` loads the javascripts needed for server-side rendering. Since it uses sprockets, it doesn't realize when the bundle changes, so the if you don't restart the server, the server-side renderer uses an outdated version of the bundle. This is the main drawback right now, plus this is probably going to be problematic in production (because `webpack` adds hashes). Maybe it makes sense for `webpacker` to add an interface for exposing bundles to sprockets to make this simpler, if that's the case, it should be possible to automate all this setup with a gem and provide a nice, full-featured `react on rails` experience. Having said this, there are a few other things to take care of:
- Check out if it makes sense to always prerender, or just for SEO and preview crawlers (so running a JS process doesn't hamper performance too badly)
- Tinker with `reat-rails` so it doesn't need to use globals.
- Tinker with the `react-rails` generator to generate proper components (with module import and export) and expose them in the `components.js` globals.
- Configure webpack components so each view can load only the required bundle.
