from flask import jsonify
class R:

  # 构造函数
  def __init__(self, code = 0, data = None, total = None, message = "ok"):
    self.code = code
    self.data = data
    self.message = message
    self.total = total

  def to_json(self):
    res = {
      "code": self.code,
      "data": self.data,
      "message": self.message,
      "total":self.total
    }
    return jsonify(res)

  @staticmethod
  def result(code = 0, data = None, total = None, message = "ok"):
    return R(code, data, total, message).to_json()

  # 成功，无返回
  @staticmethod
  def success():
    return R.result()
  
  # 成功，返回对应的数据  
  @staticmethod
  def success(data,total = None):
    return R.result(0,data,total)
  
  # 失败
  @staticmethod
  def failed():
    return R.result(1,message="failed")
  
  
  # 失败
  @staticmethod
  def failed(code,message="failed"):
    return R.result(code,message)
  