const user = {
  id: 1,
  name: 'Andrea Castro',
  date: '2024-10-10 21:09:07',
  roleId: 1,
  role: 'administrator'
};

const error = {
  error: 'Authorization error',
  message: 'Invalid credentials'
}

exports.login = (credentials) => {

  // app.get('/db', async (req, res) => {
  //   db.query('SELECT * FROM users', (err, results) => {
  //     if (err) {
  //       console.error('Error executing query: ' + err.stack);
  //       res.status(500).send('Error fetching users');
  //       return;
  //     }
  //     console.log("results", results);
  //     res.json(results);
  //   });
  // });

  if (credentials.user !== 'user' || credentials.pass !== 'pass')
    return { success: false, response: error };
  return { success: true, response: user };
};

