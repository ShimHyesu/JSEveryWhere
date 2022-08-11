// Express.js 모듈 임포트
const express = require('express');
// app 객체 생성
const app = express();

// 애플리케이션 배포시 다른 포트번호 지정할 수 있도록
const port = process.env.PORT || 4000;

// package.json의 script객체 내의 dev 명령어 nodemon이 index.js파일 변경사항 모니터링
// npm run dev를 통해 페이지 새로고침시 서버 자동으로 변경
app.get('/', (req, res) => res.send('Hello Web Server!!!!'));

// 포트번호 지정
app.listen(port, () =>
  console.log(`Server running at http://localhost:${port}`)
);
