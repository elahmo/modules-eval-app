# Node+Express API
API is accecible via https://modules-eval-app.herokuapp.com/api

## Deployment
Register on heroku and let me know of your registration email so that I can add you as collaborator
[Heroku Sing Up](https://signup.heroku.com/)
Install heroku CLI
[Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli)
Add a new origin in .git/configure
>[remote "heroku"]
>   url = https://git.heroku.com/modules-eval-app.git
>   fetch = +refs/heads/*:refs/remotes/heroku/*
Login into heroku
> heroku login
Push the backedAPI subtree of backend branch
> git subtree push --prefix backendAPI heroku backend

## Database
Database instance is accessible via
> mongodb://admin:admin@ds145220.mlab.com:45220/modules-eval-app
Database can be accessed via admin GUI via /mongo_admin path

JSON Import collection
> mongoimport -h ds145220.mlab.com:45220 -d modules-eval-app -c modules -u <user> -p <password> --file <input file>

JSON Export collection
> mongoexport -h ds145220.mlab.com:45220 -d modules-eval-app -c modules -u <user> -p <password> -o modules.json

CSV Import collection
> mongoimport -h ds145220.mlab.com:45220 -d modules-eval-app -c modules -u <user> -p <password> --file <input .csv file> --type csv --headerline

CSV Export collection
> mongoexport -h ds145220.mlab.com:45220 -d modules-eval-app -c modules -u <user> -p <password> -o modules.csv --csv -f <comma-separated list of field names>
