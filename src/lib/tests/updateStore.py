import requests

url = 'http://localhost:5173/api/updateStore'
data = {'key': 'value', 'another_key': 'another_value'}

response = requests.post(url, json=data)
print(response.text)