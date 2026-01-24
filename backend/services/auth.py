from schemas.user import User
from db.db import get_db
from sqlalchemy.orm import Session
from fastapi import Depends
from sqlalchemy import select, or_
from models.auth import MeResponse, CoupleResponse, PartnerResponse
from schemas.user import Couple


def me(uid: str, db: Session = Depends(get_db)):
  """
  Returns the user's information and their couple's information if they have one.
  If the user is not found, it initializes the user and returns the user's information.
  """
  user = db.execute(select(User).where(User.id == uid)).scalar_one_or_none()

  if user is None:
    return init_user(uid, db)

  couple = db.execute(select(Couple).where(or_(Couple.partner1_uid == user.id, Couple.partner2_uid == user.id))).scalar_one_or_none()

  if couple is None:
    return MeResponse(uid=user.id, name=user.name)

  partner_id = couple.partner2_uid if couple.partner2_uid != user.id else couple.partner1_uid
  partner = db.execute(select(User).where(User.id == partner_id)).scalar_one_or_none()

  partner_response = PartnerResponse(uid=partner_id, name=partner.name) if partner is not None else None
  couple_response = CoupleResponse(id=couple.id, partner=partner_response)
  
  return MeResponse(uid=user.id, 
                    name=user.name, 
                    couple=couple_response)

"""
HELPER FUNCTIONS
"""
def init_user(uid: str, db: Session = Depends(get_db)):
  user = User(id=uid, name="")
  db.add(user)
  db.commit()
  return MeResponse(uid=user.id, name=user.name)