from typing import List

numbers: List[int] = []

def get_evens(list: List[int]) -> List[int]:
    evens = [x for x in list if x % 2 == 0]
    return evens

def to_string(input) -> str:
    return input.

print(get_evens(range(0,10)))