import tinycolor from 'tinycolor2'
import colors from '../colors'

export const colorFromString = (str) => {
  if(!str) return colors.cardBg1
  let a = 0;
  for(let b = 0; b < str.length; b++) {
    a += str.charCodeAt(b)
  }
  const h = Math.round(Math.abs(Math.sin(a/4+4))*360)
  const s = Math.round(Math.abs(Math.sin(a))*80)
  return tinycolor({ h, s, l: 65 }).toHexString()
}