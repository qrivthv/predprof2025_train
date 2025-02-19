import matplotlib.pyplot as plt
import numpy as np
from flask import *

cnt = 0


# def plot_graph(x, y, filename):
#     plt.style.use('_mpl-gallery')
#     fig, ax = plt.subplots()
#
#     ax.stairs(y, linewidth=2.5)
#
#     ax.set(xlim=(0, 8), xticks=np.arange(1, 8),
#            ylim=(0, 8), yticks=np.arange(1, 8))
#
#     plt.show()
#     global cnt
#     path = url_for('static')
#     plt.savefig(fname=s, format='png')
#     cnt += 1
#     return s[8:]