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

// PROMISES METHOD

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


app.listen(3000, () => console.log('App listening on port localhost:3000'));