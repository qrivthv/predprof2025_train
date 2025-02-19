from functions import *
from flask import *
from math import *

app = Flask(__name__)


@app.route('/')
@app.route('/results', methods=['POST', 'GET'])
def results():
    if request.method == 'GET':
        dt = [["Болванка1", 100, 0, 50, 100, 20, 60, 0, 0, 0, 330],
              ["Болванка2", 100, 100, 50, 100, 20, 60, 0, 0, 0, 430]
              ]
        tour = 2
        grade = 0
        region = 0
        time = 0
        sorted(dt, key=lambda dt: dt[1])
        sorted(dt, key=lambda dt: dt[10])
        return render_template('res.html', dt=dt, time=time, tour=tour, grade=grade, region=region)
    elif request.method == 'POST':
        tour = request.form['tour']
        grade = request.form['grade']
        region = request.form['region']
        time = request.form['time']
        if time%5 != 0:
            round(time)
        dt = get_data("result", tour, time, grade, region)
        sorted(dt, key=lambda dt: dt[1])
        sorted(dt, key=lambda dt: dt[10])
        return render_template('res.html', dt=dt, time=time, tour=tour, grade=grade, region=region)





if __name__ == "__main__":
    app.run(port=8080, host="127.0.0.1")