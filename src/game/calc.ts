import { /*N,*/ P, A, C } from './base'
interface Params {
  nsl: number[];
  ns?: any[];
  repeatCount?: number;
}

export default {
  '1250:1'({nsl}: Params) {
    return A(nsl)
  },
  '1251:1'({nsl}: Params) {
    return A(nsl)
  },
  '1252:1'({nsl}: Params) {
    return A(nsl)
  },
  '1253:1'({nsl}: Params) {
    return A(nsl)
  },
  '1254:1'({nsl}: Params) {
    return A(nsl)
  },
  '1256:1'({nsl}: Params) {
    return A(nsl)
  },
  '1257:1'({nsl}: Params) {
    return A(nsl)
  },
  '1258:1'({nsl}: Params) {
    return A(nsl)
  },
  '1259:1'({nsl}: Params) {
    return A(nsl)
  },
  '1273:1'({nsl}: Params) {
    return A(nsl)
  },
  '1274:1'({nsl}: Params) {
    return A(nsl)
  },
  '1275:1'({nsl}: Params) {
    return A(nsl)
  },
  '1276:1'({nsl}: Params) {
    return A(nsl)
  },
  
  // 11x5
  '2050:1'({nsl}: Params) {
    return A(nsl)
  },
  '2050:2'({nsl}: Params) {
    return A(nsl)
  },
  '2051:1'({nsl}: Params) {
    return A(nsl)
  },
  '2052:1'({nsl}: Params) {
    return A(nsl)
  },
  '2053:1'({nsl}: Params) {
    return A(nsl)
  },
  '2053:2'({nsl}: Params) {
    return A(nsl)
  },
  '2054:1'({nsl}: Params) {
    return C(nsl && nsl[0], 1)
  },
  '2077:1'({nsl}: Params) {
    return C(nsl && nsl[0], 2)
  },
  '2078:1'({nsl}: Params) {
    return C(nsl && nsl[0], 3)
  },
  '2079:1'({nsl}: Params) {
    return C(nsl && nsl[0], 4)
  },
  '2080:1'({nsl}: Params) {
    return C(nsl && nsl[0], 5)
  },
  '2081:1'({nsl}: Params) {
    return C(nsl && nsl[0], 6)
  },
  '2082:1'({nsl}: Params) {
    return C(nsl && nsl[0], 7)
  },
  '2083:1'({nsl}: Params) {
    return C(nsl && nsl[0], 8)
  },
  '2055:1'({nsl}: Params) {
    return C(nsl && nsl[0], 2)
  },
  '2056:1'({nsl}: Params) {
    return C(nsl && nsl[0], 3)
  },
  '2057:1'({nsl, repeatCount}: Params) {
    return P(nsl) - (repeatCount || 0);
  },
  '2058:1'({ns}: Params) {
    let n = 0;
    if (ns) {
      ns[0] && ns[0][0] && ns[0].forEach((f: number) => {
        ns[1] && ns[1][0] && ns[1].forEach((s: number) => {
          ns[2] && ns[2][0] && ns[2].forEach((t: number) => {
            if (f !== s && f !== t && s !== t) n++;
          })
        })
      });
    }
    return n;
  },

  // PK10
  '4050:1'({nsl}: Params) {
    return A(nsl)
  },
  '4050:2'({nsl}: Params) {
    return A(nsl)
  },
  '4051:1'({nsl}: Params) {
    return A(nsl)
  },
  '4052:1'({nsl}: Params) {
    return A(nsl)
  },
  '4053:1'({nsl}: Params) {
    return A(nsl)
  },
  '4053:2'({nsl}: Params) {
    return A(nsl)
  },
  '4054:1'({nsl}: Params) {
    return A(nsl)
  },
  '4055:1:1'({nsl}: Params) {
    return A(nsl)
  },
  '4055:1:2'({nsl}: Params) {
    return A(nsl)
  },
  '4055:1:3'({nsl}: Params) {
    return A(nsl)
  },
  '4055:1:4'({nsl}: Params) {
    return A(nsl)
  },
  '4055:1:5'({nsl}: Params) {
    return A(nsl)
  },

  // K3
  '5050:1'({nsl}: Params) {
    return A(nsl)
  },
  '5051:1'({nsl}: Params) {
    return A(nsl)
  },
  '5052:1'({nsl}: Params) {
    return A(nsl)
  },
  '5053:1'({nsl}: Params) {
    return A(nsl)
  },
  '5054:1'({nsl}: Params) {
    return A(nsl)
  },
  '5055:1'({nsl}: Params) {
    return A(nsl)
  },
  '5056:1'({nsl}: Params) {
    return A(nsl)
  },
  '5057:1'({nsl}: Params) {
    return A(nsl)
  },

  // 六合彩
  // 特码
  '7001:1' ({nsl}: Params) {
    return C(nsl[0], 1)
  },
  // 正码
  '7006:1' ({nsl}: Params) {
    return C(nsl[0], 1)
  },
  // 特肖
  '7007:1' ({nsl}: Params) {
    return A(nsl)
  },
  // 波色
  '7005:1' ({nsl}: Params) {
    return A(nsl)
  },
  // 一肖
  '7008:1' ({nsl}: Params) {
    return C(A(nsl), 1)
  },
  // 2连肖
  '7002:1' ({nsl}: Params) {
    return C(A(nsl), 2)
  },
  // 3连肖
  '7003:1' ({nsl}: Params) {
    return C(A(nsl), 3)
  },
  // 4连肖
  '7004:1' ({nsl}: Params) {
    return C(A(nsl), 4)
  },
  // '正一码'
  '7009:1' ({nsl}: Params) {
    return C(nsl && nsl[0], 1)
  },
  // '正二码'
  '7010:1' ({nsl}: Params) {
    return C(nsl && nsl[0], 1)
  },
  // '正三码'
  '7011:1' ({nsl}: Params) {
    return C(nsl && nsl[0], 1)
  },
  // '正四码'
  '7012:1' ({nsl}: Params) {
    return C(nsl && nsl[0], 1)
  },
  // '正五码'
  '7013:1' ({nsl}: Params) {
    return C(nsl && nsl[0], 1)
  },
  // '正六码'
  '7014:1' ({nsl}: Params) {
    return C(nsl && nsl[0], 1)
  },
  // '特码'
  '7015:1' ({nsl}: Params) {
    return C(nsl && nsl[0], 1)
  },
  // '正特和值'
  '7016:1' ({nsl}: Params) {
    return C(nsl && nsl[0], 1)
  },
  // '尾数'
  '7017:1' ({nsl}: Params) {
    return C(nsl && nsl[0], 1)
  }
}