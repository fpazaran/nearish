from main import app
from models.auth import MeResponse
from fastapi import Depends
from auth.firebase import get_current_firebase_uid
from services import auth
from sqlalchemy.orm import Session
from db.db import get_db

@app.get("/auth/me", response_model=MeResponse)
def me(uid: str = Depends(get_current_firebase_uid), db: Session = Depends(get_db)):
  return auth.me(uid, db)