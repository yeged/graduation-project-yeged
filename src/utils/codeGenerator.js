import _ from "lodash";
// Application No
export default function generateAppNo() {
  return _.toUpper(Math.random().toString(36).substr(2, 5));
}
