from pydantic import BaseModel

class NoteCreate(BaseModel):
    address: str
    title: str
    content: str

class NoteUpdate(BaseModel):
    address: str
    title: str
    content: str

class TaskActionRequest(BaseModel):
    address: str