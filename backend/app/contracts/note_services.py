import os
import json
from web3 import Web3
from app.utils import utils
from app.config import RPC_URL, PRIVATE_KEY, CONTRACT_ADDRESS

# Load ABI
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
ABI_PATH = os.path.join(BASE_DIR, "..", "abi", "Note.json")

with open(ABI_PATH) as f:
    abi = json.load(f)

# Web3 setup
w3 = Web3(Web3.HTTPProvider(RPC_URL))
if not w3.is_connected():
    raise Exception("Failed to connect to Ethereum node")

contract = w3.eth.contract(address=CONTRACT_ADDRESS, abi=abi)
account = w3.eth.account.from_key(PRIVATE_KEY)

# -------------------------------
# Transaction Functions (EIP-1559)
# -------------------------------

def add_task(user_address: str,title: str, content: str):
    tx_function = contract.functions.addTask(content, title)
    return build_transact(tx_function=tx_function, user_address=user_address)  


def update_task(user_address: str, task_id: int, title: str, content: str):
    tx_function = contract.functions.updateTask(task_id, content, title)
    return build_transact(tx_function=tx_function, user_address=user_address)  


def delete_task(user_address: str, task_id: int):
    tx_function = contract.functions.deleteTask(task_id)
    return build_transact(tx_function=tx_function, user_address=user_address)


def complete_task(user_address: str, task_id: int):
    tx_function = contract.functions.completeTask(task_id)
    return build_transact(tx_function=tx_function, user_address=user_address)

def get_tasks_for(address: str):
    raw_tasks = contract.functions.getTasks().call({"from": address})
    return [
        {"id": t[0], "title": t[1], "content": t[2], "completed": t[3]}
        for t in raw_tasks
    ]



def build_transact(tx_function, user_address):
    # Estimasi gas dan parameter EIP-1559 untuk user
    gas_limit, gas_params = utils.get_gas_parameters(tx_function, user_address)
    nonce = w3.eth.get_transaction_count(user_address)

    tx = tx_function.build_transaction({
        "from": user_address,
        "nonce": nonce,
        "gas": gas_limit,
        **gas_params
    })

    return tx