require 'html-proofer'

task :test do
  options = {
    assume_extension: true,
    http_status_ignore: [
      999
    ]
  }

  sh 'bundle exec jekyll build'
  HTMLProofer.check_directory("./_site", options).run
end
