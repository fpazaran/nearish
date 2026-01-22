from sqlalchemy import Column, Integer, String, DateTime, Date
from datetime import datetime
from db.db import Base

class Activity(Base):
    __tablename__ = "activities"

    id = Column(Integer, nullable=False, unique=True, primary_key=True)
    couple_id = Column(Integer, nullable=False, foreign_key="couples.id")
    name = Column(String, nullable=False)
    category = Column(String, nullable=False)
    created_at = Column(DateTime, nullable=False, default=datetime.now)

class ActivitySnapshot(Base):
    __tablename__ = "activity_snapshots"
    
    id = Column(Integer, nullable=False, unique=True, primary_key=True)
    visit_id = Column(Integer, nullable=False, foreign_key="visits.id")
    activity_id = Column(Integer, nullable=True, foreign_key="activities.id")
    date = Column(Date, nullable=False)
    name = Column(String, nullable=False)
    category = Column(String, nullable=False)
    order_index = Column(Integer, nullable=False)
