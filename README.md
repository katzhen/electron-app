## Project Setup

### Backend

```bash
# app.py entry point
# app-service app name
python -m PyInstaller --onefile app.py --name=app-service
```

### Install

```bash
$ yarn
```

### Development

```bash
$ yarn dev
```

### Build

```bash
# For windows
$ yarn build:win

# For macOS
$ yarn build:mac

# For Linux
$ yarn build:linux
```

- 接口

  - 修改`backend\calc.py`
    - 增加别的文件也可以，但均需要返回结构话的结果
  - 修改`backend\app.py`
    - 增加py文件引用
    - `result = calc.cal(path, seq)` 修改为对应的方法
    - 也可以增加路由
  - 命令

  ```bash
  # 运行
  cd backend
  python app.py
  # 打包
  # 安装PyInstaller（已安装，无需执行）
  pip install PyInstaller
  python -m PyInstaller --onefile app.py --name=app-service
  ```

- 前端

  - 命令

  ```bash
  # 调试
  yarn dev
  ```
