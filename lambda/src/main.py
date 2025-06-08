from fastapi import FastAPI
from mangum import Mangum
from config import build_config
from routes.routes import router

build_config()

app = FastAPI()
app.include_router(router, prefix="/api/slide_generator")

handler = Mangum(app)