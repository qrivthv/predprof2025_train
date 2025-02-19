import _sqlite3


def get_data(what, base):
    c = _sqlite3.connect('db.db')
    curs = c.cursor()
    curs.execute(what, base)
    line = curs.fetchall()
    c.commit()
    c.close()
    return line


def insrt(data, what):
    c = _sqlite3.connect('db.db')
    curs = c.cursor()
    curs.execute(what, data)
    line = curs.fetchall()
    c.commit()
    c.close()
    return

def get_student(id):
