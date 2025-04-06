from fastapi import APIRouter, HTTPException, Request, Query
from app.models.note import NoteCreate, NoteUpdate
from app.contracts import note_services
from web3 import Web3

router = APIRouter()

@router.get("/notes")
def get_all_notes(address: str = Query(..., description="User Ethereum address")):
    if not Web3.is_address(address):
        raise HTTPException(status_code=400, detail="Invalid Ethereum address")

    try:
        tasks = note_services.get_tasks_for(address)
        return {"notes": tasks}
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