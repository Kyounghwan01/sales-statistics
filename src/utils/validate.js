export default {
  checkAlertMessage: (data, checkArray) => {
    for (let i = 0; i < checkArray.length; i++) {
      if (!data[checkArray[i].value]) {
        return `${checkArray[i].text} 입력해 주세요`;
      }
    }
  }
};
