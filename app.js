const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

app.set('view engine', 'pug');
app.set("views", path.join(__dirname, "views"));
app.use(express.static('public'));

/* CALL BACK METHOD

function getUsers(cb) {
  fs.readFile('data.json', 'utf8', (err, data) => {
    if (err) return cb(err);
    const users = JSON.parse(data);
    return cb(null, users);
  });
}

app.get('/', (req, res) => {
  getUsers((err, users) => {
    if (err) {
      res.render('error', { error: err });
    } else {
      res.render('index', { users: users.users });
    }
  });
});        

*/

/* PROMISES METHOD

// This method should return a promise
function getUsers() {
  return new Promise((resolve, reject) => {
    fs.readFile('data.json', "utf-8", (err, data) => {
      if (err) {
        reject(err);
      } else {
        const users = JSON.parse(data);
        resolve(users);
      }
    });
  });
}

app.get('/', (req, res) => {
  getUsers()
    .then((users) => {
      res.render('index', { users: users.users });
    })
    .catch((err) => {
      res.render('error', { error: err });
    })
});

*/

// ASYNC/AWAIT METHOD

// getUsers() function will be same as used in the promise method.
function getUsers() {
  return new Promise((resolve, reject) => {
    fs.readFile('data.json', "utf-8", (err, data) => {
      if (err) {
        reject(err);
      } else {
        const users = JSON.parse(data);
        resolve(users);
      }
    });
  });
}


/* async is used below to get a promise always eventhough if it is not returned
app.get('/', async (req, res) => {
  try {
    const users = await getUsers();
    res.render('index', { users: users.users });
  } catch (err) {
    res.render('error', { error: err });
  }
});

*/

// A way to avoid using try/catch block everytime in ASYNC/AWAIT METHOD

function asyncHandler(cb) {
  return async (req, res, next) => {
    try {
      await cb(req, res, next);
    } catch (err) {
      res.render('error', { error: err });
    }
  }
}

app.get('/', asyncHandler(async (req, res) => {
  const users = await getUsers();
  res.render('index', { users: users.users });
}));


app.listen(3000, () => console.log('App listening on port localhost:3000'));