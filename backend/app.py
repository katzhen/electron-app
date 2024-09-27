from flask import Flask, request
from flask_cors import CORS
from R import R
import calc

app = Flask(__name__)
CORS(app)

# 设置文件上传的最大限制(16MB)
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024

@app.route('/', methods=['POST'])
def index():
    data = request.get_json()
    path = data.get('path', None)

    # 如果用户没有选择文件
    if path == '':
        return R.failed(400,"No selected file")
    
    # 判断文件类型
    if not path.endswith(".csv"):
        return R.failed(400,"Wrong file type")
    
    seq = data.get('seq', ';')
    result = calc.calc(path,seq)
    return R.success(result)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=29833)