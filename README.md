![gif demo](/demo.gif)

# FlaskReact

A To Do app made in React (JavaScript) and Flask (Python)\

- https://flaskreact.herokuapp.com/
- https://flaskreact-server.herokuapp.com/hello

## Commands

### App

Inside `app` folder:

```
yarn
yarn start
```

Make sure to change api's url to localhost when developing

### Server

Inside `server/src` folder:

```
pipenv install
export FLASK_APP=server/src
export FLASK_ENV=development
export FLASK_DEBUG=1`
flask init-db
flask run
```

### To deploy

```
heroku login
heroku create
git init
git remote add heroku <git>
git add .
git commit -m "updating deploy"
git push heroku master
```

## References

- [Building a Todo App with Flask in Python](https://stackabuse.com/building-a-todo-app-with-flask-in-python/)
- [Flask's Tutorial](https://flask.palletsprojects.com/en/1.0.x/tutorial/)

## v1 gif

![v1 gif](v1.gif)
