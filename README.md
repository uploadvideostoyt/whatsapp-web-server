**How To Build and Deploy to HEROKU**

* Clone this repo
* Rename `.env.example` file to `.env`
* git init
* git add .
* git commit -m "Deploy to Heroku"
* heroku login
* heroku create -a [APP_NAME]
* Add `puppeteer-heroku-buildpack` to app
* heroku git:remote -a example-app
* git push heroku master


Add this buildpack to heroku app
https://github.com/jontewks/puppeteer-heroku-buildpack

This buildpack is in `puppeteer-heroku-buildpack.zip` file in this repo.

**[See `puppeteer-heroku-buildpack.zip` file](https://github.com/MyProjectManager/whatsapp-notifier-server/commit/25f27593e96cd92025940af3a42c7eed72dd481b)**
