import moment from "moment";

export default {
  comma(value) {
    if (!value) return 0;
    value = String(value).replace(/,/g, "");
    return value.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, "$1,");
  },
  date(value) {
    return value ? moment(String(value)).format("YYYY. M. D.") : null;
  },
  mobile(value) {
    if (!value) return;
    return value.replace(
      /(^02.{0}|^01.{1}|[0-9]{3})([0-9]+)([0-9]{4})/,
      "$1-$2-$3"
    );
  }
};
