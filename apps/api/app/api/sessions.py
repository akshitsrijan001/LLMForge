from fastapi import APIRouter, HTTPException
from app.database import get_connection

from uuid import uuid4
from datetime import datetime

router = APIRouter(
    prefix="/sessions",
    tags=["Sessions"],
)


# ----------------------------
# Create Session
# ----------------------------

@router.post("/")
def create_session():

    session_id = str(uuid4())
    now = datetime.utcnow().isoformat()

    conn = get_connection()
    cur = conn.cursor()

    cur.execute(
        """
        INSERT INTO sessions
        (id,title,created_at,updated_at)
        VALUES(?,?,?,?)
        """,
        (
            session_id,
            "New Chat",
            now,
            now,
        ),
    )

    conn.commit()
    conn.close()

    return {"id": session_id}


# ----------------------------
# Get All Sessions
# ----------------------------

@router.get("/")
def get_sessions():

    conn = get_connection()
    cur = conn.cursor()

    cur.execute(
        """
        SELECT *
        FROM sessions
        ORDER BY updated_at DESC
        """
    )

    rows = cur.fetchall()

    conn.close()

    return [dict(r) for r in rows]


# ----------------------------
# Get One Session
# ----------------------------

@router.get("/{session_id}")
def get_session(session_id: str):

    conn = get_connection()
    cur = conn.cursor()

    cur.execute(
        """
        SELECT *
        FROM sessions
        WHERE id=?
        """,
        (session_id,),
    )

    session = cur.fetchone()

    if not session:
        conn.close()
        raise HTTPException(404, "Session not found")

    cur.execute(
        """
        SELECT role,content,timestamp
        FROM messages
        WHERE session_id=?
        ORDER BY id ASC
        """,
        (session_id,),
    )

    messages = cur.fetchall()

    conn.close()

    return {
        "session": dict(session),
        "messages": [dict(m) for m in messages],
    }


# ----------------------------
# Save Message
# ----------------------------

@router.post("/{session_id}/messages")
def save_message(
    session_id: str,
    message: dict,
):

    conn = get_connection()
    cur = conn.cursor()

    cur.execute(
        """
        INSERT INTO messages
        (session_id,role,content,timestamp)
        VALUES(?,?,?,?)
        """,
        (
            session_id,
            message["role"],
            message["content"],
            datetime.utcnow().isoformat(),
        ),
    )

    # Get current title
    cur.execute(
        """
        SELECT title
        FROM sessions
        WHERE id=?
        """,
        (session_id,),
    )

    row = cur.fetchone()

    if (
        row
        and row["title"] == "New Chat"
        and message["role"] == "user"
    ):
        cur.execute(
            """
            UPDATE sessions
            SET title=?
            WHERE id=?
            """,
            (
                message["content"][:35],
                session_id,
            ),
        )

    cur.execute(
        """
        UPDATE sessions
        SET updated_at=?
        WHERE id=?
        """,
        (
            datetime.utcnow().isoformat(),
            session_id,
        ),
    )

    conn.commit()
    conn.close()

    return {"success": True}

@router.post("/{session_id}/share")
def share_session(session_id: str):

    conn = get_connection()
    cur = conn.cursor()

    share_id = str(uuid4())

    cur.execute(
        """
        INSERT INTO shared_sessions
        (share_id,session_id,created_at)
        VALUES(?,?,?)
        """,
        (
            share_id,
            session_id,
            datetime.utcnow().isoformat(),
        ),
    )

    conn.commit()
    conn.close()

    return {
        "share_id": share_id,
        "url": f"http://localhost:3000/share/{share_id}",
    }


@router.get("/share/{share_id}")
def get_shared_chat(share_id: str):

    conn = get_connection()
    cur = conn.cursor()

    cur.execute(
        """
        SELECT session_id
        FROM shared_sessions
        WHERE share_id=?
        """,
        (share_id,),
    )

    row = cur.fetchone()

    if not row:
        raise HTTPException(404, "Share not found")

    session_id = row["session_id"]

    cur.execute(
        """
        SELECT role,content,timestamp
        FROM messages
        WHERE session_id=?
        ORDER BY id
        """,
        (session_id,),
    )

    messages = [dict(m) for m in cur.fetchall()]

    conn.close()

    return {
        "messages": messages
    }


# ----------------------------
# Delete Session
# ----------------------------

@router.delete("/{session_id}")
def delete_session(session_id: str):

    conn = get_connection()
    cur = conn.cursor()

    cur.execute(
        """
        DELETE FROM sessions
        WHERE id=?
        """,
        (session_id,),
    )

    conn.commit()
    conn.close()

    return {"success": True}