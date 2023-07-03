# face-recognition-auth-reactjs

Ứng dụng quản lý khu du lịch bằng nhận diện trong quản lý khu du lịch (đếm số lượng khách du lịch và chấm công nhân viên)

## Demo

- [https://demo-mmsa2022.albertovalerio.com/](https://demo-mmsa2022.albertovalerio.com/)

## Features

- **Nhận diện khuôn mặt và xác thực (Login/Register)**
- **Dashboard thống kê khách du lịch và thu nhập**
- **Quản lý danh sách nhân viên**
- **Đếm só lượng khách du lịch ra vào**
- **Chấm công nhân viên bằng nhận diện khuôn mặt**

## System Requirements

- **NODE.JS**
- **NPM**
- **MongoDB**

## Installation

```python
git clone git@github.com:albertovalerio/face-recognition-auth-reactjs.git
```

Install frontend dependencies

```python
cd ~/path/to/your/face-recognition-auth-reactjs/frontend_app
```

```python
npm install
```

```python
npm start
```

Install backend dependencies

```python
cd ~/path/to/your/face-recognition-auth-reactjs/backend_app
```

```python
npm install
```

```python
npm run dev
```

Configure `.env` file

```python
cp .env.example .env
```

```python
API_PORT=3001
FRONTEND_URL='http://localhost:3000'
MONGO_URI='mongodb+srv://<USERNAME>:<PASSWORD>@cluster0.bckok.mongodb.net/<DATABASE_NAME>?retryWrites=true&w=majority'
TOKEN_KEY='...' (used by JWT, recommended 50/60 chars)
PRIVATE_KEY='...' (used by Bcrypt, must be of 32 chars)
```

## Acknowledgments

- **[@reactjs](https://reactjs.org/)**
- **[@redux_toolkit](https://redux-toolkit.js.org/)**
- **[@mongodb](https://www.mongodb.com/)**
- **[@faceapi.js](https://github.com/justadudewhohacks/face-api.js/)**
