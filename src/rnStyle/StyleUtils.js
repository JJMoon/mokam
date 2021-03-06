import { Dimensions, StyleSheet } from "react-native";

// H / W : 640 X 360
export const { width, height } = Dimensions.get("window");
const ratio = 16 * (width / height);
export const sr = (ratio < 9 ? width / 9 : height / 16) / (360 / 9);
// <View style={{ ...getWHFullPer(85, 80), ...centering }} >
export const getWHFullPer = (w, h) => ({
  width: srInt((width * w) / 100),
  height: srInt((height * h) / 100)
});

/** style abstractions  */
// <View style={{ ...full, ...centering, backgroundColor: '#BBB9' }}>
export const centering = { justifyContent: "center", alignItems: "center" };
export const textCenter = { textAlign: "center" };
export const flexRow = { flexDirection: 'row' };
// <View style={{ flexDirection: 'row', ...bottomLine('#DDD4') }}>
export const bottomLine = col => ({ borderBottomWidth: 1, borderColor: col });
export const border = col => ({ borderWidth: 1, borderColor: col });

/** Drop to Integer */
export const srInt = dim => parseInt(dim * sr);
// apply screen ratio :: getSrInt(30), getSrInt(20, 10, 15, 25)
export function getSrInt(...args) {
  if (args.length > 1) return args.map(ival => srInt(ival));
  return srInt(args[0]);
}

// Utils

// Bottom Radius with 2 column..
export const botRad = (isBottom, leftR, rightR) => {
  // borderBottomRightRadius, borderTopRightRadius
  const ky = isBottom ? 'borderBottom' : 'borderTop';
  return { [`${ky}LeftRadius`]: leftR, [`${ky}RightRadius`]: rightR };
};

export const botRads = (isBottom, num, rad) => {
  const rArr = (new Array(num)).map(() => null);
  rArr[0] = botRad(isBottom, rad, 0);
  rArr[num - 1] = botRad(isBottom, 0, rad);
  return rArr;
};

export const full = { flex: 1, width: "100%", height: "100%" };
// apply screen ratio :: getSr(30), getSr(20, 10, 15, 25)
export function getSr(...args) {
  if (args.length > 1) return args.map(ival => ival * sr);
  return args[0] * sr;
}
// <Image style={{ ...boxSize(30) }} >
export const boxSize = sz => ({ width: sz * sr, height: sz * sr });

// Additional top distance in Long screen. Max 20 when the ratio is 2:1.
let aspectRatio = height / width; // iPhone X : 2.1653, 16/9 : 1.78 (2 - 1.78 = 0.22)
aspectRatio = aspectRatio < 1.78 ? 1.78 : aspectRatio;
aspectRatio = aspectRatio > 2 ? 2 : aspectRatio;
export const spaceVer = srInt((20 * (aspectRatio - 1.78)) / 0.22);

console.log(` Screen ${width} X ${height}, ar : ${aspectRatio}  sr : ${sr}`);
