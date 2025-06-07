from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Montamos la carpeta 'static' y 'frontend' en el mismo nivel de /app
app.mount("/static", StaticFiles(directory="static"), name="static")
app.mount("/",    StaticFiles(directory="frontend", html=True), name="frontend")
