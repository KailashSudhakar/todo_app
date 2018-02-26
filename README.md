# todo_app
A simple todo app built with react, nodeJS and MYSQL. As any common todo app, it has the following features:
..* Add items to the todo list
..* Delete the items
..* Mark the item as complete
..* Filter the items based on completed or all or active

###The Tech Stack

Though a simple todo app can be built with storing the items in the browser localStorage, I wanted to leverage on my comfort with writing basic nodeJS APIs (with very good ORM) as well.

####FrontEnd:
Bootstrap: 4.0.0
React: 16.2.0
sass: 3.4

####BackEnd:
Node: 7.9.0
MYSQL: 5.6.35

###Installation

The project has two folders, server and ui to serve their respective job, go to each of those folder and run $ npm install

####Server
..* To run the server, create a database and import the todo_app.sql.
..* Configure the database credentials in db/knex.js
..* On the server root directory, run the command $ node bin/www

####FrontEnd
..* Go to the ui folder and run $ http-server -p 8989  (the port no can be anything)
..* On the ui root, run the $ gulp or $ gulp build commands to rebuild the react components after making any changes.
..* Any styling changes has to be made in the assets/scss/style.scss and has to be compiled to assets/css/style.css.
