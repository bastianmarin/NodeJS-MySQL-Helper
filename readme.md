# NodeJS-MySQL-Helper

## Overview

NodeJS-MySQL-Helper is a simple and efficient library to help you manage MySQL connections and execute queries using Node.js and MySQL2.

## Features

- Connection pooling
- Automatic retry mechanism for failed queries
- Easy-to-use API

## Installation

To install the library, use npm:

```bash
npm install mysql2
```

## Usage

Here's an example of how to use the NodeJS-MySQL-Helper library:

```javascript
const { MySQL } = require('./MySQL');

// Create a new MySQL instance
const db = new MySQL('localhost', 3306, 'user', 'password', 'database');

// Execute a query
async function executeQuery() {
    const result = await db.createQuery('SELECT * FROM users WHERE id = ?', [1]);
    if (result.status) {
        console.log('Query successful:', result.data);
    } else {
        console.error('Query failed:', result.error);
    }
}

executeQuery();
```

## API

### MySQL Class

#### Constructor

```javascript
new MySQL(host, port, user, password, database, tryConnection = 3)
```

- `host` (string): The MySQL server host.
- `port` (number): The MySQL server port.
- `user` (string): The MySQL user.
- `password` (string): The MySQL user's password.
- `database` (string): The MySQL database name.
- `tryConnection` (number, optional): The number of retry attempts for failed queries (default is 3).

#### Methods

##### `getConnection()`

Retrieves a connection from the connection pool.

Returns: `Promise<Connection>`

##### `createQuery(stringQuery, arrayQuery, tryQuery = 0)`

Executes a given SQL query using a connection from the pool.

- `stringQuery` (string): The SQL query string to be executed.
- `arrayQuery` (Array): An array of values to be used in the SQL query.
- `tryQuery` (number, optional): The current attempt number for executing the query (default is 0).

Returns: `Promise<Object>`

## License

See [LICENSE](./LICENSE) in the top-level directory.