const mysql = require('mysql');

const users = [
  {
    id: 1,
    name: 'Andrea Castro',
    date: '2024-10-10 21:09:07',
    roleId: 1,
    role: 'administrator'
  },
  {
    id: 2,
    name: 'Luis Miranda',
    date: '2024-10-11 22:10:08',
    roleId: 1,
    role: 'administrator'
  }
];

const error = {
  error: 'Authorization error',
  message: 'Invalid credentials'
}

exports.getAll = () => {
  return users;
}

exports.create = (user) => {
  users.push(user);
  return users;
}

exports.createUser = async (user) => {
  const query = `INSERT INTO USERS (
    name,
    surname,
    rut,
    email,
    age
  ) VALUES (
    '${user.name}',
    '${user.surname}',
    '${user.rut}',
    '${user.email}',
    ${user.age}
  )`;
  // Ejecuta query
  const result = await mysql.query(query);
  return result;
}