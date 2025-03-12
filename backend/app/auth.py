from datetime import datetime, timedelta
from typing import Optional
from jose import JWTError, jwt
from passlib.context import CryptContext
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from pydantic import BaseModel

# This should be stored securely in environment variables
SECRET_KEY = "your-secret-key"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    username: Optional[str] = None
    wallet_address: Optional[str] = None

class User(BaseModel):
    username: str
    email: Optional[str] = None
    disabled: Optional[bool] = None
    wallet_address: Optional[str] = None

class UserInDB(User):
    hashed_password: Optional[str] = None

# Mock user database - replace with real database in production
fake_users_db = {}

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password):
    return pwd_context.hash(password)

def get_user(db, username: str = None, wallet_address: str = None):
    if username and username in db:
        user_dict = db[username]
        return UserInDB(**user_dict)
    
    if wallet_address:
        for user_dict in db.values():
            if user_dict.get('wallet_address') == wallet_address:
                return UserInDB(**user_dict)
    return None

def authenticate_user(fake_db, username: str = None, password: str = None, wallet_address: str = None):
    if wallet_address:
        user = get_user(fake_db, wallet_address=wallet_address)
        if user:
            return user
        # Auto-register new wallet users
        username = f"user_{wallet_address[:8]}"
        while username in fake_db:
            username = f"{username}_{datetime.utcnow().timestamp()}"
        register_new_user(username=username, email=None, wallet_address=wallet_address)
        return get_user(fake_db, wallet_address=wallet_address)
    
    if username and password:
        user = get_user(fake_db, username=username)
        if not user or not user.hashed_password:
            return False
        if not verify_password(password, user.hashed_password):
            return False
        return user
    
    return False

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

async def get_current_user(token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username = payload.get("sub")
        wallet_address = payload.get("wallet_address")
        if not username and not wallet_address:
            raise credentials_exception
        token_data = TokenData(username=username, wallet_address=wallet_address)
    except JWTError:
        raise credentials_exception
    
    user = None
    if token_data.username:
        user = get_user(fake_users_db, username=token_data.username)
    elif token_data.wallet_address:
        user = get_user(fake_users_db, wallet_address=token_data.wallet_address)
    
    if user is None:
        raise credentials_exception
    return user

async def get_current_active_user(current_user: User = Depends(get_current_user)):
    if current_user.disabled:
        raise HTTPException(status_code=400, detail="Inactive user")
    return current_user

def register_new_user(username: str, email: Optional[str] = None, password: Optional[str] = None, wallet_address: Optional[str] = None):
    if username in fake_users_db:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Username already registered"
        )
    
    user_dict = {
        "username": username,
        "email": email,
        "disabled": False,
        "wallet_address": wallet_address
    }

    if password:
        user_dict["hashed_password"] = get_password_hash(password)
    
    fake_users_db[username] = user_dict
    return User(**user_dict)

# Create admin user
admin_username = "admin"
admin_email = "123@open.com"
admin_password = "open"

if admin_username not in fake_users_db:
    hashed_password = get_password_hash(admin_password)
    admin_dict = {
        "username": admin_username,
        "email": admin_email,
        "hashed_password": hashed_password,
        "disabled": False
    }
    fake_users_db[admin_username] = admin_dict
