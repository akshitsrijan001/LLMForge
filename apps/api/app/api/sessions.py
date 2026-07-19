from fastapi import APIRouter

router = APIRouter(
    prefix="/sessions",
    tags=["Sessions"],
)


@router.get("/")
def get_sessions():
    return {
        "message": "Sessions API is working"
    }