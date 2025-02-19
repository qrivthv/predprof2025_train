from functions import *
from flask import *
from math import *
import matplotlib.pyplot as plt
import numpy as np
app = Flask(__name__)
cnt = 0


@app.route('/')
@app.route('/results', methods=['POST', 'GET'])
def results():
    if request.method == 'GET':
        dt = [["Болванка1", 100, 0, 50, 100, 20, 60, 0, 0, 330],
              ["Болванка2", 100, 100, 50, 100, 20, 60, 0, 0, 430]
              ]
        tour = 2
        grade = 0
        region = 0
        time = 0
        school = 0
        param = 0
        sorted(dt, key=lambda dt: dt[0])
        sorted(dt, key=lambda dt: dt[-1])
        return render_template('res.html', dt=dt, time=time, tour=tour, grade=grade, region=region, school=school)
    elif request.method == 'POST':
        tour = request.form['tour']
        grade = request.form['grade']
        region = request.form['region']
        time = request.form['time']
        school = request.form['school']
        param = request.form['param']
        if time == "":
            time = 0
        if param == "":
            param = 0
        if grade == "":
            grade = 0
        if region == "":
            region = 0
        if tour == "":
            tour = 0
        if time%5 != 0:
            round(time/5)*5
        if time > 300:
            time =300
        dt = get_data("result", tour, time, grade, region)
        sorted(dparamt, key=lambda dt: dt[0])
        sorted(dt, key=lambda dt: dt[-1])
        return render_template('res.html', dt=dt, time=time, tour=tour, grade=grade, region=region, school=school)


@app.route('/schools')
def by_school(id = -1):
    #dt = get_data("schools", id)
    dt = [['school1', 'Санкт-Петербург', 100, 45, 5], ['school2', 'Санкт-Петербург', 90, 35, 2]]
    sorted(dt, key=lambda dt: dt[-3])
    sorted(dt, key=lambda dt: dt[-2])
    sorted(dt, key=lambda dt: dt[-1])
    #table=get_school_table()
    table = ""
    return render_template('results.html', table=table)


@app.route('/student/<name>')
def student(name=1):
    # table = get_student_info(name)
    stud = {
        "fio": "Иванов Иван Иванович",
        "region": "Санкт-Петербург",
        "grade": 10,
        "school": "ГБОУ XXXX"
    }
    return render_template('student.html', **stud)


cnt += 1


if __name__ == "__main__":
    app.run(port=8080, host="127.0.0.1")