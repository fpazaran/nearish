from sqlalchemy import Column, String, DateTime, Integer
from datetime import datetime
from db.db import Base

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, nullable=False, unique=True, primary_key=True)
    name = Column(String, nullable=False)
    couple_id = Column(Integer, nullable=False, unique=True, foreign_key="couples.id")
    created_at = Column(DateTime, nullable=False, default=datetime.now())

class Couple(Base):
    __tablename__ = "couples"
    id = Column(Integer, nullable=False, unique=True, primary_key=True)
    partner1_uid = Column(Integer, nullable=False, foreign_key="users.id")
    partner2_uid = Column(Integer, nullable=True, foreign_key="users.id")
    created_at = Column(DateTime, nullable=False, default=datetime.now())