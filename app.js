const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

app.set('view engine', 'pug');
app.set("views", path.join(__dirname, "views"));
app.use(express.static('public'));

// CALL BACK
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


app.listen(3000, () => console.log('App listening on port localhost:3000'));