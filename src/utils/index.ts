/* eslint-disable */
const functions: any = {};

const requireFunction = require.context(
  '.', // 현재 폴더 검색
  false, // 하위 폴더 확인 안함
  /^((?!index).)*\.ts$/, // index.js를 제외한 모든 js 파일
);

requireFunction.keys().forEach(filename => {
  const functionDefinition = requireFunction(filename);
  const functionPath = filename
    .replace(/^\.\//, '') // 시작부분 "./" 제거
    .replace(/\.\w+$/, ''); // 확장자 제거

  if (typeof functionDefinition.default === 'function') {
    functions[functionPath] = functionDefinition.default;
  } else if (typeof functionDefinition.default === 'object') {
    functions[functionPath] = { ...functionDefinition.default };
  }
});

export default { ...functions };
