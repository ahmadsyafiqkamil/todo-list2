import os
import json
from web3 import Web3
from app.config import RPC_URL, PRIVATE_KEY, CONTRACT_ADDRESS

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
ABI_PATH = os.path.join(BASE_DIR, '..', 'abi', 'Note.json')

with open(ABI_PATH) as f:
    abi = json.load(f)

w3 = Web3(Web3.HTTPProvider(RPC_URL))
if not w3.is_connected():
    raise Exception("Failed to connect to Ethereum node")

contract = w3.eth.contract(address=CONTRACT_ADDRESS, abi=abi)
account = w3.eth.account.from_key(PRIVATE_KEY)


def add_task(title: str, content: str):
    tx = contract.functions.addTask(content, title).build_transaction({
        'from': account.address,
        'nonce': w3.eth.get_transaction_count(account.address),
        'gas': 300000,
        'gasPrice': w3.to_wei('20', 'gwei')
    })
    signed_tx = account.sign_transaction(tx)
    tx_hash = w3.eth.send_raw_transaction(signed_tx.raw_transaction)
    return tx_hash.hex()


def complete_task(task_id: int):
    tx = contract.functions.completeTask(task_id).build_transaction({
        'from': account.address,
        'nonce': w3.eth.get_transaction_count(account.address),
        'gas': 200000,
        'gasPrice': w3.to_wei('20', 'gwei')
    })
    signed_tx = account.sign_transaction(tx)
    tx_hash = w3.eth.send_raw_transaction(signed_tx.raw_transaction)
    return tx_hash.hex()


def delete_task(task_id: int):
    tx = contract.functions.deleteTask(task_id).build_transaction({
        'from': account.address,
        'nonce': w3.eth.get_transaction_count(account.address),
        'gas': 200000,
        'gasPrice': w3.to_wei('20', 'gwei')
    })
    signed_tx = account.sign_transaction(tx)
    tx_hash = w3.eth.send_raw_transaction(signed_tx.raw_transaction)
    return tx_hash.hex()


def get_tasks():
    return contract.functions.getTasks().call()


def update_task(task_id: int, title: str, content: str):
    tx = contract.functions.updateTask(task_id, content, title).build_transaction({
        'from': account.address,
        'nonce': w3.eth.get_transaction_count(account.address),
        'gas': 300000,
        'gasPrice': w3.to_wei('20', 'gwei')
    })
    signed_tx = account.sign_transaction(tx)
    tx_hash = w3.eth.send_raw_transaction(signed_tx.raw_transaction)
    return tx_hash.hex()
