
# import keras
# from sklearn import metrics
# from sklearn.metrics import accuracy_score

import json
from collections import defaultdict

import pandas as pd
import numpy as np
import xgboost as xgb
from sklearn import model_selection
from sklearn.ensemble import RandomForestClassifier,RandomForestRegressor


# 機械学習を行う大元の関数
def machine_learning(df,target,model,model_param,dele_columns):

    # dfからカラムを取得
    columns = df.columns

    # dfのそれぞれのカラムを数値に変換
    for colum in columns:
        df[colum] = factorize_df(df[colum])

    # 削除するカラムを削除
    for colum in dele_columns:

        # 削除対象が目的変数でなければ削除
        if colum != target:

            # 欠損値の処理などで既に削除されている場合は削除しない
            try:
                df.drop(colum,axis=1,inplace=True)

            except:
                continue

    # 学習データ用意
    df = df.sample(frac=1,random_state=88) # データをシャッフル
    target_data = df[target]
    train_data = df.drop(columns=target)
    # train_data,x_test,target_data,y_test = model_selection.train_test_split(train_data,target_data,test_size = 0.01,shuffle=False)

    # モデルに応じて学習結果を返す
    # result = choose_model(train_data,x_test,target_data,y_test,model,model_param)
    result = choose_model(train_data,target_data,model,model_param)

    return result


def choose_model(train_data,target_data,model,param):
        
        # モデルに応じて学習
        if model == 'RandomForestClassifier':
                return RFC(train_data,target_data,param)

        elif model == 'RandomForestRegressor':
                return RFR(train_data,target_data,param)

        elif model == 'XGBoost':
                return XGB(train_data,target_data,param)


def param_none(param):
    # パラメーターが変換できない場合はNoneとして処理する(主にmaxDepthなど)
    try:
        return int(param)

    except:
        return None


def RFC(train_data,target_data,param):

        # モデルを学習
        try:
            # モデルにパラメーターをセット
            model = RandomForestClassifier(
                    n_estimators=int(param[0]),criterion=param[1],max_depth=param_none(param[2]),
                    min_samples_split=int(param[3]),max_leaf_nodes=param_none(param[4])
                    )

            # 学習ステータスを設定し学習
            train_size = np.linspace(0.1, 1.0, 5)
            train_sizes, train_scores, test_scores = model_selection.learning_curve(estimator = model, X = train_data, y = target_data ,cv = 10,train_sizes=train_size)
            train_scores_mean = np.mean(train_scores, axis=1)
            test_scores_mean = np.mean(test_scores, axis=1)

            return train_sizes,train_scores_mean,test_scores_mean
        
        # ValueErrorの場合はモデルの選択を間違えている場合が濃厚
        except ValueError:
            raise Exception('モデルの選択を間違えています！')

        # それ以外の場合はcsvが学習に適していない,,,など無限に可能性がある
        except Exception as e:
            raise Exception('学習段階でエラーが出ました！')


def RFR(train_data,target_data,param):

        try:
                model = RandomForestRegressor(
                        n_estimators=int(param[0]),criterion=param[1],max_depth=param_none(param[2]),
                        min_samples_split=int(param[3]),max_leaf_nodes=param_none(param[4])
                        )

                train_size = np.linspace(0.1, 1.0, 5)
                train_sizes, train_scores, test_scores = model_selection.learning_curve(estimator = model, X = train_data, y = target_data ,cv = 10,train_sizes=train_size ,random_state=88)
                train_scores_mean = np.mean(train_scores, axis=1)
                test_scores_mean = np.mean(test_scores, axis=1)

                return train_sizes,train_scores_mean,test_scores_mean

        except ValueError:
                raise Exception('モデルの選択を間違えています！')

        except Exception as e:
            raise Exception('学習段階でエラーが出ました！')


def XGB(train_data,target_data,radio_param):

        train = xgb.DMatrix(train_data, label=target_data)

        try:
                # xgbはobjectiveによってモデルを選択
                if(radio_param[2] == 'Regressor'):

                        model = xgb.XGBRegressor(
                            max_depth = int(radio_param[0]),learning_rate = float(radio_param[1]),subsample = float(radio_param[4]),eval_metric='mlogloss'
                            )
                        
                        train_size = np.linspace(0.1, 1.0, 5)
                        train_sizes, train_scores, test_scores = model_selection.learning_curve(estimator = model, X = train_data, y = target_data ,cv = 10,train_sizes=train_size)
                        train_scores_mean = np.mean(train_scores, axis=1)
                        test_scores_mean = np.mean(test_scores, axis=1)

                        return train_sizes,train_scores_mean,test_scores_mean

                elif(radio_param[2] == 'Classifier'):

                        model = xgb.XGBClassifier(
                            max_depth = int(radio_param[0]),learning_rate = float(radio_param[1]),subsample = float(radio_param[4]),eval_metric='mlogloss',use_label_encoder =False
                            )
                        
                        train_size = np.linspace(0.1, 1.0, 5)
                        train_sizes, train_scores, test_scores = model_selection.learning_curve(estimator = model, X = train_data, y = target_data ,cv = 10,train_sizes=train_size)
                        train_scores_mean = np.mean(train_scores, axis=1)
                        test_scores_mean = np.mean(test_scores, axis=1)
                        return train_sizes,train_scores_mean,test_scores_mean
        except ValueError:
                raise Exception('XGBoostのobjectiveの選択に間違いがあります')

        except Exception as e:
            raise Exception('学習段階でエラーが出ました！')


# 与えられたdfがobjectTypeだった場合に数値に変換
def factorize_df(df):

    if df.dtype == 'object':
        df, uniques = pd.factorize(df)

    return df


# カラムを取得 戻り値(辞書型:{カラム名[型]...})
def get_columns(df):

    type_columns = defaultdict(list)
    columns = list(df.columns)

    for colum in columns:
        type_columns[colum].append(str(df[colum].dtype))
        
    return type_columns


# 欠損値があるカラムのリスト 戻り値(辞書型:{カラム名[カラム名[欠損数,型,パーセント]...})
def get_nullcolumns(df,columns):

    having_null_columns = defaultdict(list)

    for colum in columns.keys():

        # 欠損数が1以上の場合欠損数などを取得
        if df[colum].isnull().sum() > 0:
            null_size = int(df[colum].isnull().sum())
            having_null_columns[colum].append(null_size)
            having_null_columns[colum].append(str(df[colum].dtype))
            having_null_columns[colum].append(round((null_size / len(df)) * 100,2))

    return having_null_columns


# 欠損値を処理する
def fill_null_columns(df,null_columns_covert_type):

    # それぞれの欠損値の置き換え方法によって分岐
    for key in null_columns_covert_type.keys():

        if null_columns_covert_type[key] == 'ave':
            df[key] = fill_ave(df[key])
        elif null_columns_covert_type[key] == 'mode':
            df[key] = fill_mode(df[key])
        elif null_columns_covert_type[key] == 'med':
            df[key] = fill_med(df[key])
        elif null_columns_covert_type[key] == 'standard':
            df[key] = fill_standard(df[key])
        elif null_columns_covert_type[key] == 'dele':
            df.drop(key,axis=1,inplace=True)

    return df


# 以下fill_関数は欠損値をそれぞれの置き換え方法で置き換え
def fill_ave(df):
    return df.fillna(df.mean())


def fill_med(df):
  return df.fillna(df.median())


def fill_mode(df):
  return df.fillna(max(df.mode()))


def fill_standard(df):

  df_ave = int(df.mean())
  df_std = int(df.std())
  low = df_ave - df_std
  high = df_ave + df_std

  # 標準偏差は値によってはlowなどの値が入れ替わるためValueErrorの場合は入れ替えて処理
  try:
    if low == high:
        return df

    return df.fillna(np.random.randint(low,high))

  except ValueError:
    return df.fillna(np.random.randint(high,low))


# オブジェクト型の変換
def convert_object(data):
        try:
                conv_data,original_data = pd.factorize(data, sort=True)
                return conv_data
        except Exception as e:
                raise Exception('Objectを変換できませんでした')


# float型の変換
def convert_float(data):
        conv_data = data.astype('int')
        return conv_data


# Jsonのエンコードでnumpyがはじかれるので処理
class MyEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, np.integer):
            return int(obj)
        elif isinstance(obj, np.floating):
            return float(obj)
        elif isinstance(obj, np.ndarray):
            return obj.tolist()
        elif isinstance(obj, np.dtype):
            return str(obj)
        else:
            return super(MyEncoder, self).default(obj)

