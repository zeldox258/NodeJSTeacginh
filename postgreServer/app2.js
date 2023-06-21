const { Pool } = require('pg');

// PostgreSQL connection URL
const connectionString = 'postgres://lxsgynnf:qavuBKsGCqyUJo56TmQTL98Vk3rmsT3A@chunee.db.elephantsql.com/lxsgynnf?sslmode=require';

// Create a connection pool
const pool = new Pool({ connectionString });

// Function to execute a query
const executeQuery = async () => {
  try {
    // Get a client connection from the pool
    const client = await pool.connect();

    // Execute the query
    const result = await client.query('SELECT * FROM users');

    // Print the query result
    console.log('Query result:', result.rows);

    // Release the client connection back to the pool
    client.release();
  } catch (error) {
    console.error('Error executing query:', error);
  } finally {
    // End the pool connection
    pool.end();
  }
};

// Call the executeQuery function
executeQuery();
