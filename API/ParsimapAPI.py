import requests

url = "https://api.parsimap.ir/direction/distance-matrix?key=p1c9f614aca0364596a8d3bfbdd24552b3cc465c5f"

payload='origins=51.33145%2C35.69171%7C51.342156%2C35.71687%7C51.34012%2C35.71230&destinations=51.33769%2C35.69971%7C51.34034%2C35.69687%7C51.33108%2C35.69630&provide_durations=false&travel_mode=driving&request_id=0123456789'
headers = {
  'Content-Type': 'application/x-www-form-urlencoded'
}

response = requests.request("POST", url, headers=headers, data=payload)

print(response.text)
