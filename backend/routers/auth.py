from fastapi import APIRouter, Depends, HTTPException, Body
from models.auth import MeResponse
from auth.firebase import get_current_firebase_uid
from services import auth
from sqlalchemy.orm import Session
from db.db import get_db

router = APIRouter(prefix="/auth", tags=["auth"])

@router.get("/me", response_model=MeResponse)
def me(uid: str = Depends(get_current_firebase_uid), db: Session = Depends(get_db)):
  try:
    return auth.me(uid, db)
  except Exception as e:
    raise HTTPException(status_code=500, detail=str(e))

@router.patch("/update-name", status_code=204)
def update_name(name: str = Body(..., embed=True), uid: str = Depends(get_current_firebase_uid), db: Session = Depends(get_db)):
  # Parse and normalize the name
  name = name.strip()  # Remove leading/trailing whitespace
  name = " ".join(name.split())  # Normalize multiple spaces to single space
  
  # Validate the parsed name
  if (len(name) < 1):
    raise HTTPException(status_code=400, detail="Name cannot be empty")
  if (len(name) > 32):
    raise HTTPException(status_code=400, detail="Name must be less than 32 characters")
  try:
    if (auth.update_name(name, uid, db)):
      return None
    else:
      raise HTTPException(status_code=500, detail="Failed to update name")
  except Exception as e:
    raise HTTPException(status_code=500, detail=str(e))