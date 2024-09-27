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
