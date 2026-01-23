from sqlalchemy import Column, String, DateTime, Integer, ForeignKey
from datetime import datetime
from db.db import Base

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, nullable=False, unique=True, primary_key=True)
    name = Column(String, nullable=False)
    couple_id = Column(Integer, ForeignKey("couples.id"), nullable=False, unique=True)
    created_at = Column(DateTime, nullable=False, default=datetime.now)

class Couple(Base):
    __tablename__ = "couples"
    id = Column(Integer, nullable=False, unique=True, primary_key=True)
    partner1_uid = Column(Integer, ForeignKey("users.id"), nullable=False)
    partner2_uid = Column(Integer, ForeignKey("users.id"), nullable=True)
    created_at = Column(DateTime, nullable=False, default=datetime.now)
