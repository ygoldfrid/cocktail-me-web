import Cookies from "universal-cookie";
import moment from "moment";

const cookies = new Cookies();
const cookieKey = "bar";

function getBar() {
  return cookies.get(cookieKey);
}

function setBar(bar) {
  return cookies.set(cookieKey, bar, {
    expires: moment().add(30, "days").toDate(),
  });
}

function removeBar() {
  return cookies.remove(cookieKey);
}

export default { getBar, setBar, removeBar };
