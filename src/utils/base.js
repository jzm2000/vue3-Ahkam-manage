export function isJson(val) {
  if (typeof val == 'string') {
    try {
      let obj = JSON.parse(val);
      if (typeof obj == 'object' && obj) {
        return true;
      }
      return false
    } catch (e) {
      return false
    }
  } else {
    return false
  }
}
