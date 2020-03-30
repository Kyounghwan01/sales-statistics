import moment from "moment";

export default {
  comma(value) {
    if (!value) return 0;
    value = String(value).replace(/,/g, "");
    return value.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, "$1,");
  },
  date(value) {
    return value ? moment(String(value)).format("YYYY. M. D.") : null;
  }
};
