from models.home import HomeResponse
from sqlalchemy.orm import Session
from sqlalchemy import or_, select
from schemas.visits import Visit
from schemas.user import Couple
from models.visits import CreateVisit, Visit as VisitModel
from models.activities import CreateActivitySnapshot
from schemas.activities import ActivitySnapshot

def get_visits(uid: str, db: Session) -> list[Visit]:
  try:
    couple = db.execute(select(Couple).where(or_(Couple.partner1_uid == uid, Couple.partner2_uid == uid))).scalar_one_or_none()
    if couple is None:
      raise Exception("Couple not found")
    visits = db.execute(select(Visit).where(Visit.couple_id == couple.id).order_by(Visit.start)).scalars().all()
    return visits
  except Exception as e:
    raise Exception(f"Database error: {str(e)}")

def create_visit(visit: CreateVisit, schedule: list[CreateActivitySnapshot], uid: str, db: Session) -> Visit:
  try:
    couple = db.execute(select(Couple).where(or_(Couple.partner1_uid == uid, Couple.partner2_uid == uid))).scalar_one_or_none()
    
    if couple is None:
      raise Exception("Couple not found")

    visit = Visit(couple_id=couple.id, start=visit.start, end=visit.end, description=visit.description)
    db.add(visit)
    db.flush()

    for activity in schedule:
      activity_snapshot = ActivitySnapshot(visit_id=visit.id, activity_id=activity.activity_id, date=activity.date, name=activity.name, category=activity.category, order_index=activity.order_index)
      db.add(activity_snapshot)
    
    db.commit()
    return VisitModel(id=visit.id, start=visit.start, end=visit.end, description=visit.description)
  except Exception as e:
    db.rollback()
    raise Exception(f"Database error: {str(e)}")