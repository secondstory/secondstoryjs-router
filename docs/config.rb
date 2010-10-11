activate :relative_assets

gem 'ultraviolet'
require 'uv'   

gem 'rack-codehighlighter'
require 'rack/codehighlighter'

use Rack::Codehighlighter, :ultraviolet, :markdown => true, 
  :theme => "twilight", :element => "pre>code", 
  :pattern => /\A:::([-_+\w]+)\s*(\n|&#x000A;)/, :logging => false
