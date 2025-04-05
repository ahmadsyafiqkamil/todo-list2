from fastapi import APIRouter, HTTPException
from app.models.note import NoteCreate, NoteUpdate
from app.contracts import note_services

router = APIRouter()

@router.get("/notes")
def get_all_notes():
    try:
        tasks = note_services.get_tasks()
        return tasks
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/notes")
def create_note(note: NoteCreate):
    try:
        tx_hash = note_services.add_task(note.title, note.content)
        return {"tx_hash": tx_hash}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.put("/notes/{task_id}")
def update_note(task_id: int, note: NoteUpdate):
    try:
        tx_hash = note_services.update_task(task_id, note.title, note.content)
        return {"tx_hash": tx_hash}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.delete("/notes/{task_id}")
def delete_note(task_id: int):
    try:
        tx_hash = note_services.delete_task(task_id)
        return {"tx_hash": tx_hash}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.patch("/notes/{task_id}/complete")
def complete_note(task_id: int):
    try:
        tx_hash = note_services.complete_task(task_id)
        return {"tx_hash": tx_hash}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))