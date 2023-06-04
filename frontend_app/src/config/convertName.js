export function convertName(name) {
    var asciiStr = name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/g, "d").replace(/Đ/g, "D");
    return asciiStr;
  }