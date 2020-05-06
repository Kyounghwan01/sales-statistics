import moment from 'moment';

export default {
  comma: (value: number | string) => {
    if (!value) return 0;
    value = String(value).replace(/,/g, '');
    return value.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
  },
  date: (value: number | string) => {
    return value ? moment(String(value)).format('YYYY. M. D.') : null;
  },
  mobile: (value: string) => {
    if (!value) return;
    return value.replace(/(^02.{0}|^01.{1}|[0-9]{3})([0-9]+)([0-9]{4})/, '$1-$2-$3');
  },
};
