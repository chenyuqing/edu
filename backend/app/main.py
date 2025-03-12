from datetime import timedelta
from typing import Optional
from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordRequestForm
from pydantic import BaseModel
from . import auth
from fastapi import Depends

class WalletLoginRequest(BaseModel):
    address: str
    signature: Optional[str] = None

app = FastAPI()

# Create admin user on startup
@app.on_event("startup")
async def create_admin_user():
    admin_username = "admin"
    admin_email = "123@open.com"
    admin_password = "open"
    
    if admin_username not in auth.fake_users_db:
        hashed_password = auth.get_password_hash(admin_password)
        admin_dict = {
            "username": admin_username,
            "email": admin_email,
            "hashed_password": hashed_password,
            "disabled": False
        }
        auth.fake_users_db[admin_username] = admin_dict

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/health")
async def health_check():
    return {"status": "healthy"}

@app.post("/api/wallet/login")
async def wallet_login(wallet_data: WalletLoginRequest):
    try:
        user = auth.authenticate_user(auth.fake_users_db, wallet_address=wallet_data.address)
        if not user:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Failed to authenticate with wallet",
                headers={"WWW-Authenticate": "Bearer"},
            )
        access_token_expires = timedelta(minutes=auth.ACCESS_TOKEN_EXPIRE_MINUTES)
        access_token = auth.create_access_token(
            data={
                "sub": user.username,
                "wallet_address": wallet_data.address
            },
            expires_delta=access_token_expires
        )
        return {"access_token": access_token, "token_type": "bearer"}
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e)
        )

@app.post("/api/token")
async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends()):
    user = auth.authenticate_user(auth.fake_users_db, username=form_data.username, password=form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=auth.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = auth.create_access_token(
        data={"sub": user.username}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}

@app.post("/api/register")
async def register(username: str, email: str, password: str):
    try:
        user = auth.register_new_user(username, email, password)
        return {"message": "User registered successfully", "username": user.username}
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e)
        )

# Protected Learning endpoints
@app.get("/api/learning")
async def get_learning_topics(current_user: auth.User = Depends(auth.get_current_active_user)):
    # Mock data - replace with database in production
    return [
        {
            "id": 1,
            "title": "Python Programming",
            "description": "Learn Python programming language",
            "progress": 50
        },
        {
            "id": 2,
            "title": "Web Development",
            "description": "Learn web development with HTML, CSS, and JavaScript",
            "progress": 30
        }
    ]

# Protected Tools endpoints
@app.get("/api/tools")
async def get_tools(current_user: auth.User = Depends(auth.get_current_active_user)):
    # Mock data - replace with database in production
    return [
        {
            "id": 1,
            "name": "Code Formatter",
            "description": "Format your code in various programming languages",
            "status": "active"
        },
        {
            "id": 2,
            "name": "JSON Validator",
            "description": "Validate and format JSON data",
            "status": "active"
        }
    ]

# User profile endpoint
@app.get("/api/users/me")
async def read_users_me(current_user: auth.User = Depends(auth.get_current_active_user)):
    return current_user

# Update user profile
@app.put("/api/users/me")
async def update_user_profile(
    email: Optional[str] = None,
    current_user: auth.User = Depends(auth.get_current_active_user)
):
    if email:
        user_dict = auth.fake_users_db[current_user.username]
        user_dict["email"] = email
        return {"message": "Profile updated successfully"}
    return {"message": "No changes made"}
