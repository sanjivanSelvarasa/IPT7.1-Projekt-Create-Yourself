const initSqlJs = require('sql.js');
const fs = require('fs');
const path = require('path');

let SQL = null;

const dbDir = path.join(__dirname);
const userDbPath = path.join(dbDir, 'user.db');
const userDataDbPath = path.join(dbDir, 'userdata.db');

const state = {
  userDb: null,
  userDataDb: null
};

async function initializeSql() {
  if (!SQL) {
    SQL = await initSqlJs();
  }
}

function loadDb(dbPath) {
  if (fs.existsSync(dbPath)) {
    const fileBuffer = fs.readFileSync(dbPath);
    return new SQL.Database(fileBuffer);
  } else {
    return new SQL.Database();
  }
}

function saveDb(db, dbPath) {
  const data = db.export();
  const buffer = Buffer.from(data);
  fs.writeFileSync(dbPath, buffer);
}