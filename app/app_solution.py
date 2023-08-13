# Imports dependencies.
from flask import Flask, jsonify
import json
import requests


# Creates the flask application.
app = Flask(__name__)


# Main app route which defines the server output and, the user output which contains the available routes to explore:
@app.route("/")
def home():
    print("Server received request for 'Home' page...")
    return (
        f"Welcome to the homepage! Here you will be able to find the available routes to the data sources used.<br/><br/>"
        f"Available Routes:<br/><br/>"
        f"/api/v1.0/school_geojson<br/>"
        f"/api/v1.0/NYC_demographics_json<br/>"
        f"/api/v1.0/median_income_nyc_boroughs_json"
    )

# Route to output the school neighborhood poverty geojson to the user.
@app.route("/school_geojson")
def school_geojson():
    with open("schoolNeighborhoodPoverty.geojson") as school_geojson:
        school_geojson_data = json.load(school_geojson)
    
    return school_geojson_data

# Route to output the NYC demographic json to the user.
@app.route("/NYC_demographics_json")
def NYC_json():
    def get_json(url):
        response = requests.get(url).json()
        return response

    json_url = "https://data.cityofnewyork.us/api/views/kku6-nxdu/rows.json"
    json_response = jsonify(get_json(json_url))
    
    return json_response

@app.route("/median_income_nyc_boroughs_json")  
def median_income_json():
    with open("median_income_nyc_boroughs.json") as median_income_json_file:
        median_income_data = json.load(median_income_json_file)
    return jsonify(median_income_data)

if __name__ == "__main__":
    app.run(debug=True)