const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');

const port = process.env.PORT || 4000;

// 노트 객체 배열 -> 나중에 데이터베이스로 대체
let notes = [
  { id: '1', content: 'This is a note', author: 'Adam Scott' },
  { id: '2', content: 'This is another note', author: 'Harlow Everly' },
  { id: '3', content: 'oh hey look, another note!', author: 'Riley Harrison' }
];

// 스키마: 그래프QL의 데이터 표현 및 상호작용 방식
// 필수적으로 요구하는 필드 값은 !사용
const typeDefs = gql`
  type Note {
    id: ID!
    content: String!
    author: String!
  }

  type Query {
    hello: String!
    notes: [Note!]
    note(id: ID!): Note!
  }

  type Mutation {
    newNote(content: String!): Note!
  }
`;

// 리졸버:API 사용자가 요청한 데이터를 해결
// API에는 쿼리와 뮤테이션이라는 두가지 자료형의 리졸버가 포함
// - 쿼리: API에 특정 데이터를 원하는 형식으로 요청
// - 뮤테이션: API에서 데이터를 수정할때 사용
const resolvers = {
  Query: {
    hello: () => 'Hello World!',
    notes: () => notes,
    note: (parent, args) => {
      return notes.find(note => note.id === args.id);
    }
  },

  // 노트 객체를 notes 배열의 메모리에 추가하는 뮤테이션 리졸버 작성
  Mutation: {
    newNote: (parent, args) => {
      let noteValue = {
        id: String(notes.length + 1),
        content: args.content,
        author: 'Adam Scott'
      };

      notes.push(noteValue);
      // 객체를 반환하면 그래프QL 뮤테이션이 원하는 형식으로 응답 받을 수 있음
      return noteValue;
    }
  }
};

const app = express();

const server = new ApolloServer({ typeDefs, resolvers });

server.applyMiddleware({ app, path: '/api' });

app.listen({ port }, () =>
  console.log(
    `GraphQL Server running at http://localhost:${port}${server.graphqlPath}`
  )
);

// http://localhost:4000/api 방문하면 그래프QL 플레이그라운드 표시됨 -> 그래프QL 쿼리 및 뮤테이션 실행하고 결과 확인 가능
// 스키마 탭 클릭하면 API에 대해 자동으로 작성한 문서에 접근 가능

// 그래프QL API에 대해 쿼리 작성 가능 -> query{ hello } 입력 -> 재생 버튼 클릭하면 반환
