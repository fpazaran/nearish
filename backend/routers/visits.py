from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from db.db import get_db
from auth.firebase import get_current_firebase_uid
from fastapi import HTTPException
from services import visits as visits_service
from models.visits import CreateVisitRequest, Visit

router = APIRouter()

@router.get("/visits", response_model=list[Visit])
async def get_visits(uid: str = Depends(get_current_firebase_uid), db: Session = Depends(get_db)):
    try:
        visits = visits_service.get_visits(uid, db)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    if not visits:
        raise HTTPException(status_code=404, detail="No visits found")
    return visits

@router.post("/visits", response_model=Visit)
async def create_visit(body: CreateVisitRequest, uid: str = Depends(get_current_firebase_uid), db: Session = Depends(get_db)):
    try:
        visit = visits_service.create_visit(body.visit, body.schedule, uid, db)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    return visit