//if문 과 for 문 사용
//1~100까지 숫자중 7의 배수를 총 더한 값을 알려주세요

function test() {
  let answer = 0;

  for (let i = 0; i < 100; i++) {
    if (i % 7 === 0) {
      answer += i;
    }
  }
  console.log(answer);
}

test();
