import sqlite3
from pathlib import Path

DB_PATH = Path(__file__).parent / "llmforge.db"


def get_connection():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn


def init_database():
    conn = get_connection()
    cur = conn.cursor()

    cur.execute("""
    CREATE TABLE IF NOT EXISTS sessions(
        id TEXT PRIMARY KEY,
        title TEXT,
        created_at TEXT,
        updated_at TEXT
    )
    """)

    cur.execute("""
    CREATE TABLE IF NOT EXISTS messages(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        session_id TEXT NOT NULL,
        role TEXT NOT NULL,
        content TEXT NOT NULL,
        timestamp TEXT NOT NULL,

        FOREIGN KEY(session_id)
            REFERENCES sessions(id)
            ON DELETE CASCADE
    )
    """)

    cur.execute("""
CREATE TABLE IF NOT EXISTS shared_sessions(
    share_id TEXT PRIMARY KEY,
    session_id TEXT NOT NULL,
    created_at TEXT NOT NULL,

    FOREIGN KEY(session_id)
        REFERENCES sessions(id)
        ON DELETE CASCADE
)
""")

    conn.commit()
    conn.close()