const express = require('express');
// apollo-server-express 패키지 포함
const { ApolloServer, gql } = require('apollo-server-express');

// .env 파일에 명시된 포트 또는 포트 4000에서 서버 실행
const port = process.env.PORT || 4000;

// 그래프QL 스키마 언어로 스키마를 구성
const typeDefs = gql`
  type Query {
    hello: String
  }
`;

// 스키마 필드를 위한 리졸버 함수 제공
// 사용자에게 값을 반환하는 리졸버 추가
const resolvers = {
  Query: {
    hello: () => 'Hello World!'
  }
};

const app = express();

// 아폴로 서버 설정
const server = new ApolloServer({ typeDefs, resolvers });

// 아폴로 그래프QL 미들웨어 적용하고 경로를 /api로 설정
server.applyMiddleware({ app, path: '/api' });

app.listen({ port }, () =>
  console.log(
    `GraphQL Server running at http://localhost:${port}${server.graphqlPath}`
  )
);

// http://localhost:4000/api 방문하면 그래프QL 플레이그라운드 표시됨 -> 그래프QL 쿼리 및 뮤테이션 실행하고 결과 확인 가능
// 스키마 탭 클릭하면 API에 대해 자동으로 작성한 문서에 접근 가능

// 그래프QL API에 대해 쿼리 작성 가능 -> query{ hello } 입력 -> 재생 버튼 클릭하면 반환
