import filters from '@/filters';
import XLSX from 'xlsx';

export default {
  formatJSON(data) {
    const { comma, date } = filters;

    return data.map(el => {
      return {
        회사명: el.userName,
        물품명: el.goods,
        거래일: date(el.date),
        단가: `${comma(el.unitPrice)}원`,
        갯수: `${comma(el.count)}개`,
        가격: `${comma(el.price)}원`,
        종류: el.type ? '매입' : '매출',
        메모: el.memo ? el.memo : '-',
        위수금: `${comma(el.outstanding)}원`,
      };
    });
  },

  excelDownload(data, title) {
    const sheet = XLSX.utils.json_to_sheet(data);
    const workbook = new XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, sheet);

    /** 다운로드 */
    XLSX.writeFile(workbook, title);
  },
};
