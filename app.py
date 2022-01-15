
# from typing import Text
# from pandas.core import groupby
# from collections import defaultdict
# import csv
# from matplotlib.figure import Figure

import json
import os
import urllib
from datetime import timedelta
from io import BytesIO

import matplotlib.pyplot as plt
import numpy as np
import pandas as pd
import seaborn as sns
import wrapt_timeout_decorator
from flask import Flask,render_template,jsonify,request,session
from matplotlib.backends.backend_agg import FigureCanvasAgg

from python import ml

# flaskの設定など
app = Flask(__name__)
app.secret_key  = os.urandom(24)
app.permanent_session_lifetime = timedelta(minutes=30)

# トップページにアクセスされたらindex.htmlを表示する
@app.route('/')
def index():
    return render_template('index.html')


# ユーザーがcsvをアップロードした際に実行
@app.route('/show', methods=['POST'])
def show():

    # csv取得
    try:
        # csvデータを取得してpd変換
        data = request.files['upfile']
        df = pd.read_csv(data)

        # カラムや欠損値などを取得
        columns = ml.get_columns(df)
        null_columns = ml.get_nullcolumns(df,columns)

        # 取得した値をsessionに保存
        session['columns'] = columns
        session['null_columns'] = null_columns

        return jsonify(values=json.dumps({'columns': columns ,'null_columns':null_columns,'result': '0'}, cls=ml.MyEncoder))

    # csv取得に失敗した場合
    except Exception as e:
        return jsonify(values=json.dumps({'result': '-1'}, cls=ml.MyEncoder))


# ユーザーがサンプルデータを使用した場合
@app.route('/sample', methods=['POST'])
def sample():

    # csv取得
    try:
        # 取得するファイル名を読み込みpd変換
        file = request.data.decode()
        path = 'sampledate/' + file
        data = open(path)
        df = pd.read_csv(data)

        # カラムや欠損値などを取得
        columns = ml.get_columns(df)
        null_columns = ml.get_nullcolumns(df,columns)

        # 取得した値をsessionに保存
        session['sample_file_name'] = file
        session['columns'] = columns
        session['null_columns'] = null_columns

        return jsonify(values=json.dumps({'columns': columns ,'null_columns':null_columns,'result': '0'}, cls=ml.MyEncoder))

    # csv取得に失敗した場合
    except Exception as e:
        return jsonify(values=json.dumps({'result': '-1'}, cls=ml.MyEncoder))


    

    
# ユーザーが学習を行う場合
@app.route('/param', methods=['POST'])
def param():
    
    # 学習元のデータを読み込み
    try:
        # Webからのアップロードの場合
        data =request.files['upfile']
        df = pd.read_csv(data)
    
    except Exception as e:
        # sampleファイルを使用する場合
        # data = open('sampledate/' + request.form.get('file_name'))
        file = session.get('sample_file_name')
        session['sample_file_name'] = file
        data = open('sampledate/' + file)
        df = pd.read_csv(data)
    
    columns = {}
    null_columns = {}
    null_columns_covert_type = {}
    model_param = []

    # 必要な情報を取得
    model = request.form.get('model')
    target = request.form.get('target','')
    dele_columns = request.form.getlist('dele_param')

    # 必須の値がない場合の処理
    if not target or target == 'default':
        return jsonify(values=json.dumps({'result': '-1' , 'message': '目的変数を選択してください' }, cls=ml.MyEncoder))
    if not model or model == 'default':
        return jsonify(values=json.dumps({'result': '-1' , 'message': 'モデルを選択してください' }, cls=ml.MyEncoder))

    # sessionの値を取得
    if session.get('columns'):
        columns = session.get('columns')
        session['columns'] = columns

    if session.get('null_columns'):
        null_columns = session.get('null_columns')
        session['null_columns'] = null_columns
        # null_columns_processing = {}

        # 欠損値のカラムの数だけ繰り返す
        for key in null_columns.keys():

            # 欠損値のカラムの処理をWeb側で選択していない場合
            if not request.form.get(key):
                return jsonify(values=json.dumps({'result': '-1' , 'message': '欠損値の処理を選択してください' }, cls=ml.MyEncoder))
            
            else:
                # どの欠損値のカラムに対してどんな処理をするのかを保存
                # null_columns_processing[key] = null_columns[key][1]
                null_columns_covert_type[key] = request.form.get(key)

    # 欠損値の無いデータを作る
    df = ml.fill_null_columns(df,null_columns_covert_type)

    # ハイパーパラメータを取得 ※
    for i in range(5):
        model_param.append(request.form.get('model_param_' + str(i + 1)))
    # result = None

    # 学習させる
    try:
        # 学習
        result = ml.machine_learning(df,target,model,model_param,dele_columns)

        # 学習結果の値が不正な場合(noneなどが含まれている場合)
        for v in result[0]:
            if np.isnan(v):
                return jsonify(values=json.dumps({'result': '-1' , 'message': 'モデルが間違っている可能性があります' }, cls=ml.MyEncoder))
        for v in result[1]:
            if np.isnan(v):
                return jsonify(values=json.dumps({'result': '-1' , 'message': 'モデルが間違っている可能性があります' }, cls=ml.MyEncoder))
        
        # 学習結果をグラフに描画
        fig= plt.figure()
        ax = fig.add_subplot(111)
        ax.plot(result[0], result[1], 'r-')
        ax.plot(result[0], result[2], 'b--')
        ax.grid()
        canvas = FigureCanvasAgg(fig)

        # Web側で表示できる値に変換
        png_output = BytesIO()
        canvas.print_png(png_output)
        img_data = urllib.parse.quote(png_output.getvalue())

        return jsonify(values=json.dumps({'img_data': img_data ,'result': '0' , 'message': 'end'}, cls=ml.MyEncoder))

    except Exception as e:
        return jsonify(values=json.dumps({'result': '-1' , 'message': str(e) }, cls=ml.MyEncoder))

    # return jsonify(values=json.dumps({'result': result , 'message': 'complate' }, cls=ml.MyEncoder))

@app.route('/plot', methods=['POST'])
def plot_graph():

    # 学習グラフの表示
    # https://qiita.com/qtatsunishiura/items/c32f2bce5227146d5702
    # https://scikit-learn.org/stable/modules/generated/sklearn.model_selection.learning_curve.html
    # https://qiita.com/nomuyoshi/items/7c82df89c8c2a87e26ab
    # https://www.pep4.net/datascience/4498/

    # csvデータを読み込み
    try:
        data =request.files['upfile']
        df = pd.read_csv(data)

    except:
        file = session.get('sample_file_name')
        data = open('sampledate/' + file)
        df = pd.read_csv(data)

    # Webからの値を受け取り
    try:
        kinds = request.form.get('kinds','')
        x = request.form.get('x','')
        y = request.form.get('y','')

    except:
        return jsonify(values=json.dumps({'result': '-1' , 'img_data': None }, cls=ml.MyEncoder))
    
    if kinds == 'default' or x == '':
        return jsonify(values=json.dumps({'result': '-1' , 'img_data': None }, cls=ml.MyEncoder))

    try:
        # グラフ表示に必要な情報からグラフを生成し、Web側で表示できる値に変換
        img_data = plot(x,y,df,kinds)

        return jsonify(values=json.dumps({'result': '0' , 'img_data': img_data}, cls=ml.MyEncoder))

    except TimeoutError:
        # タイムアウト処理がされた場合
        return jsonify(values=json.dumps({'result': '-2' , 'img_data': None }, cls=ml.MyEncoder))

    except Exception as e:
        print(e)
        # それ以外のエラー
        return jsonify(values=json.dumps({'result': '-2' , 'img_data': None }, cls=ml.MyEncoder))


# グラフの生成時間を3秒とし、それ以上かかる場合はタイムアウト処理
@wrapt_timeout_decorator.timeout(dec_timeout=3)
def plot(x,y,df,kinds):

    fig= plt.figure()
    ax = fig.add_subplot(111)

    # http://myplot-for-python.com/

    # 棒グラフ
    if kinds == 'count1':
        sns.countplot(df[x], ax =ax)
    
    elif kinds == 'count2':
        sns.countplot(x=x , data=df ,hue=y, ax =ax)

    # 散布図
    elif kinds == 'reg':
        sns.regplot(df[x], df[y],scatter = True, fit_reg = True, color = 'red')

    # 分布の可視化
    elif kinds == 'swarm':
        sns.swarmplot(x, y, data = df, s = 12)

    elif kinds == 'hist':
        sns.histplot(df[x], bins = 20,
             kde = True, color='purple')

    ax.grid()
    canvas = FigureCanvasAgg(fig)
    png_output = BytesIO()
    canvas.print_png(png_output)

    return urllib.parse.quote(png_output.getvalue())


if __name__ == '__main__':
    app.run(debug=True, port=8000)