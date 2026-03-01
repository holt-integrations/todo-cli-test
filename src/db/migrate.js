#!/usr/bin/env node
/**
 * Database migration runner.
 *
 * Reads all *.sql files from src/db/migrations/ in lexicographic order,
 * skips files already recorded in the migrations table, and executes each
 * remaining file inside a single transaction. On success the filename is
 * recorded; on failure the transaction rolls back and the process exits
 * with a non-zero code.
 *
 * Usage:
 *   node src/db/migrate.js
 */

import { readdir, readFile } from 'node:fs/promises';
import { resolve, dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import pool from './pool.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const MIGRATIONS_DIR = resolve(__dirname, 'migrations');

async function run() {
  // Read all .sql files in lexicographic order.
  const entries = await readdir(MIGRATIONS_DIR);
  const files = entries.filter((f) => f.endsWith('.sql')).sort();

  if (files.length === 0) {
    console.log('No migration files found.');
    return;
  }

  // Ensure the migrations tracking table exists before querying it.
  await pool.query(`
    CREATE TABLE IF NOT EXISTS migrations (
      id          SERIAL PRIMARY KEY,
      filename    TEXT UNIQUE NOT NULL,
      applied_at  TIMESTAMPTZ DEFAULT NOW()
    )
  `);

  // Determine which migrations have already been applied.
  const { rows } = await pool.query('SELECT filename FROM migrations');
  const applied = new Set(rows.map((r) => r.filename));

  const pending = files.filter((f) => !applied.has(f));

  if (pending.length === 0) {
    console.log('All migrations are already applied.');
    return;
  }

  for (const filename of pending) {
    const filePath = join(MIGRATIONS_DIR, filename);
    const sql = await readFile(filePath, 'utf8');

    const client = await pool.connect();
    try {
      await client.query('BEGIN');
      await client.query(sql);
      await client.query(
        'INSERT INTO migrations (filename) VALUES ($1)',
        [filename],
      );
      await client.query('COMMIT');
      console.log(`Applied: ${filename}`);
    } catch (err) {
      await client.query('ROLLBACK');
      throw new Error(`Migration failed for ${filename}: ${err.message}`);
    } finally {
      client.release();
    }
  }
}

run()
  .then(() => {
    console.log('Migration complete.');
    process.exit(0);
  })
  .catch((err) => {
    console.error(err.message);
    process.exit(1);
  });
