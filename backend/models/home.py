from enum import Enum
from pydantic import BaseModel
from datetime import date
from typing import Optional
class VisitState(Enum):
    PLANNED = "planned"
    UNPLANNED = "unplanned"
    ACTIVE = "active"

class Visit(BaseModel):
    id: int
    start: date
    end: date
    description: str

class HomeResponse(BaseModel):
    state: VisitState
    visit: Visit | None # None if visit is not planned
    days_till: int | None # None if visit is active or not planned
    today_schedule: list[int] | None # None if visit is planned or not planned