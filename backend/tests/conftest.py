import pytest
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
import os
import sys

# Fail-safe: Ensure the 'backend' directory is in Python's search path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

# Force SQLite for all tests
TEST_DB_URL = "sqlite:///./test_all.db"

# Create a test-specific engine and session factory
test_engine = create_engine(
    TEST_DB_URL, 
    connect_args={"check_same_thread": False}
)
TestSession = sessionmaker(autocommit=False, autoflush=False, bind=test_engine)

# Import all models so Base can find the tables to create them
from db.db import Base
from schemas.user import User, Couple
from schemas.codes import invite_code
from schemas.activities import Activity, ActivitySnapshot
from schemas.memories import Memory, MemoryMedia
from schemas.visits import Visit
from schemas.wishes import Wish

@pytest.fixture(scope="session", autouse=True)
def setup_database():
    """Sets up the SQLite database once per test session."""
    Base.metadata.drop_all(bind=test_engine)
    Base.metadata.create_all(bind=test_engine)
    yield
    
    # --- CLEANUP ---
    test_engine.dispose() # IMPORTANT for Windows to release the file
    if os.path.exists("./test_all.db"):
        os.remove("./test_all.db")
        print("\n🗑️  Test database deleted.")


@pytest.fixture
def db():
    """Provides a fresh SQLite session for each test."""
    session = TestSession()
    try:
        yield session
    finally:
        session.close()