from functions import *
from flask import *
from sql_func import *

app = Flask(__name__)


@app.route('/')
@app.route('/results', m)
def results():
    return render_template()



if __name__ == "__main__":
    app.run(port=8080, host="127.0.0.1")