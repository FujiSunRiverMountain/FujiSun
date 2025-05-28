from fastapi import FastAPI
from routes.routes import router
from mangum import Mangum

app = FastAPI()

app.include_router(router, prefix="/api/slide_generator")

handler = Mangum(app)
