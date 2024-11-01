from flask import Flask, render_template, jsonify, request
from datetime import datetime, timedelta

app = Flask(__name__)

def calculate_age(birthdate):
    current_time = datetime.now()
    age_timedelta = current_time - birthdate

    # Calculate years, days, hours, minutes, and seconds
    years = age_timedelta.days // 365
    days = age_timedelta.days % 365
    hours = (age_timedelta.seconds // 3600) % 24
    minutes = (age_timedelta.seconds % 3600) // 60
    seconds = age_timedelta.seconds % 60

    # Additional calculations
    months = years * 12 + days // 30
    weeks = age_timedelta.days // 7

    # Next birthday countdown
    next_birthday = datetime(current_time.year, birthdate.month, birthdate.day)
    if next_birthday < current_time:
        next_birthday = datetime(current_time.year + 1, birthdate.month, birthdate.day)
    days_until_birthday = (next_birthday - current_time).days

    return {
        "years": years,
        "months": months,
        "weeks": weeks,
        "days": days,
        "hours": hours,
        "minutes": minutes,
        "seconds": seconds,
        "days_until_birthday": days_until_birthday,
        "zodiac": get_zodiac_sign(birthdate),
        "birthstone": get_birthstone(birthdate)
    }

def get_zodiac_sign(birthdate):
    # Simplified zodiac calculation
    zodiacs = [
        ("Capricorn", (1, 1), (1, 19)), ("Aquarius", (1, 20), (2, 18)),
        ("Pisces", (2, 19), (3, 20)), ("Aries", (3, 21), (4, 19)),
        ("Taurus", (4, 20), (5, 20)), ("Gemini", (5, 21), (6, 20)),
        ("Cancer", (6, 21), (7, 22)), ("Leo", (7, 23), (8, 22)),
        ("Virgo", (8, 23), (9, 22)), ("Libra", (9, 23), (10, 22)),
        ("Scorpio", (10, 23), (11, 21)), ("Sagittarius", (11, 22), (12, 21)),
        ("Capricorn", (12, 22), (12, 31))
    ]
    for zodiac, start, end in zodiacs:
        if start <= (birthdate.month, birthdate.day) <= end:
            return zodiac
    return "Unknown"

def get_birthstone(birthdate):
    birthstones = [
        "Garnet", "Amethyst", "Aquamarine", "Diamond", "Emerald", "Alexandrite",
        "Ruby", "Peridot", "Sapphire", "Opal", "Topaz", "Turquoise"
    ]
    return birthstones[birthdate.month - 1]

@app.route('/')
def index():
    return render_template("index.html")

@app.route('/calculate_age', methods=['POST'])
def calculate_age_endpoint():
    data = request.json
    birthdate_str = data.get("birthdate")
    
    try:
        birthdate = datetime.strptime(birthdate_str, "%d/%m/%Y")
    except ValueError:
        return jsonify({"error": "Invalid date format. Use DD/MM/YYYY."}), 400

    age_data = calculate_age(birthdate)
    return jsonify(age_data)

if __name__ == '__main__':
    app.run(debug=True)
