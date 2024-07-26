import CryptoJS from 'crypto-js';
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
const passphrase = `赠汪伦
   唐·李白
   lǐ bái chéng zhōu jiāng yù xíng   hū wén àn shàng tà gē shēng   
   李  白  乘  舟  将  欲  行  ，  忽  闻  岸  上  踏  歌  声  。
  táo huā tán shuǐ shēn qiān chǐ   bù jí wāng lún sòng wǒ qíng   
   桃  花  潭  水  深  千  尺  ，  不  及  汪  伦  送  我  情  。  `
// 加密函数
export function encrypt(data) {
  var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), passphrase);
  return ciphertext.toString();
}

