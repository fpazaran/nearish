from sqlalchemy import Column, DateTime, Boolean, Integer
from datetime import datetime, timedelta
from db.db import Base

class invite_code(Base):
    __tablename__ = "invite_codes"
    code = Column(Integer, nullable=False, primary_key=True)
    used = Column(Boolean, nullable=False, default=False)
    couple_id = Column(Integer, nullable=False, unique=True, foreign_key="couples.id")
    created_at = Column(DateTime, nullable=False, default=datetime.now)
    expires_at = Column(DateTime, nullable=False, default=(datetime.now + timedelta(days=1)))