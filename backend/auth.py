from passlib.context import CryptContext
import jwt
from datetime import datetime, timedelta

# 🔹 1. Setup Password Hashing Engine
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# 🔹 2. Secret Key Configuration (Keep this safe!)
SECRET_KEY = "SUPER_SECRET_FORTRESS_KEY_CHANGE_THIS_LATER"
ALGORITHM = "HS256"

def hash_password(password: str) -> str:
    """Turns a plain text password into an unreadable random hash string."""
    return pwd_context.hash(password)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Compares typed password with the stored hash to see if they match."""
    return pwd_context.verify(plain_password, hashed_password)

def create_access_token(data: dict, expires_delta: timedelta = None) -> str:
    """Generates a secure JWT token that acts as a timed VIP access pass."""
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(hours=2) # Token lasts 2 hours
        
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt