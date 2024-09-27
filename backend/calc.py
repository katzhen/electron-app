import pandas as pd

def calc(path,sep=";"):
  df = pd.read_csv(path, encoding='ISO-8859-1',sep=sep) 
  df.fillna(0, inplace=True)
  # 返回对象集合
  return df.to_dict(orient='records')
