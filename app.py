from flask import Flask, render_template, jsonify, request
from datetime import datetime

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
    return {
        "years": years,
        "days": days,
        "hours": hours,
        "minutes": minutes,
        "seconds": seconds
    }
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
