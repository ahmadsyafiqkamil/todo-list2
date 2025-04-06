from pydantic import BaseModel

class NoteCreate(BaseModel):
    address: str
    title: str
    content: str

class NoteUpdate(BaseModel):
    title: str
    content: str