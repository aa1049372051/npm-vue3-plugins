import { useOssStore } from "../stores/oss";
//当前是否为开发环境
export const isDev = () => {
  return process.env.NODE_ENV === "development";
};

//是否为中文
export const isChinese = (str: string) => {
  if (escape(str).indexOf("%u") < 0) return false;
  return true;
};

//用户名裁剪
export const handleName = (str:string) => {
  let res = emoj2str(str);
  if (isChinese(res)) {
    res = res.length > 4 ? res.slice(0, 4) + "..." : res;
  } else {
    res = res.length > 7 ? res.slice(0, 7) + "..." : res;
  }
  return res;
};
//emoj转str
export const emoj2str = (str: string) => {
  return unescape(escape(str).replace(/\%uD.{3}/g, ""));
};

//日期格式化
export const formatTime = (
  time: number | string,
  fmt: string = "yyyy-MM-dd hh:mm"
): string => {
  if (!time) {
    return "";
  }
  if (typeof time === "number") {
    time = Math.floor(Number(time));
  } else {
    let date = new Date(String(time).replace(/-/g, "/"));
    if (Number.isNaN(date)) return "";
    time = date.getTime();
  }
  if (time.toString().length <= 10) {
    time = time * 1000;
  }
  let date = new Date(time);
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (date.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  }
  let o:{[key: string]: number};
  o= {
    "M+": date.getMonth() + 1,
    "d+": date.getDate(),
    "h+": date.getHours(),
    "m+": date.getMinutes(),
    "s+": date.getSeconds(),
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str:string = String(o[k]);
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? str : formatNumber(str)
      );
    }
  }
  return fmt;
};
//数字前加0
export const formatNumber = (n: string | any[]) => {
  n = n.toString();
  return n[1] ? n : "0" + n;
};

export function formateSecond(timespan: number) {
  if (timespan.toString().length <= 10) {
    timespan = timespan * 1000;
  }
  let dateTime = new Date(timespan);

  // let year = dateTime.getFullYear();
  // let month = dateTime.getMonth() + 1;
  let day = dateTime.getDate();
  // let hour = dateTime.getHours();
  // let minute = dateTime.getMinutes();
  // let second = dateTime.getSeconds();
  let now = new Date();
  let now_new: number = Date.now();
  let offset = Math.abs(now.getDate() - day);

  let milliseconds = 0;
  let timeSpanStr;

  milliseconds = now_new - timespan;
  if (milliseconds <= 1000 * 60 * 1) {
    timeSpanStr = "刚刚";
  } else if (1000 * 60 * 1 < milliseconds && milliseconds <= 1000 * 60 * 60) {
    timeSpanStr = Math.round(milliseconds / (1000 * 60)) + "分钟前";
    // timeSpanStr = formatTime(timespan, "hh:mm");
  } else if (
    1000 * 60 * 60 * 1 < milliseconds &&
    milliseconds <= 1000 * 60 * 60 * 24 &&
    offset == 0
  ) {
    // timeSpanStr = Math.round(milliseconds / (1000 * 60 * 60)) + "小时前";
    timeSpanStr = formatTime(timespan, "hh:mm");
  } else if (offset == 1) {
    // timeSpanStr = Math.round(milliseconds / (1000 * 60 * 60 * 24)) + '天前';
    timeSpanStr = "昨天" + formatTime(timespan, "hh:mm");
  }
  //大于2天
  else if (milliseconds > 1000 * 3600 * 24 * 2) {
    timeSpanStr = formatTime(timespan, "yyyy-MM-dd");
  }
  return timeSpanStr;
}

export function transDate(timestamp: number) {
  let tt = new Date(timestamp);
  let days = (new Date().getTime() - timestamp) / 86400000;
  let today = new Date().getDate();
  let year = tt.getFullYear();
  let mouth = tt.getMonth() + 1;
  let day = tt.getDate();
  let time = tt.getHours() < 10 ? "0" + tt.getHours() : tt.getHours();
  let min = tt.getMinutes() < 10 ? "0" + tt.getMinutes() : tt.getMinutes();
  let result;
  let offset;
  offset = Math.abs(today - day);

  if (days < 4 && offset < 4) {
    if (offset === 0) {
      result = "今天" + time + ":" + min;
    } else if (offset === 1) {
      result = "昨天" + time + ":" + min;
    } else if (offset === 2) {
      result = "前天" + time + ":" + min;
    }
  } else {
    result = year + "-" + mouth + "-" + day + " " + time + ":" + min;
  }
  return result;
}

/**
 * 通过oss key 获取url
 * @param fileKey
 */
export const getOssFileUrl = (fileKey: string, refresh: boolean = true) => {
  let ossData: ApiData.OssConfig = useOssStore().ossConfig;
  if (!ossData || !fileKey) {
    return "";
  }
  let host = `https://${ossData.bucketName}.${ossData.endpoint}`;
  return refresh ? `${host}/${fileKey}?r=${Date.now()}` : `${host}/${fileKey}`;
};

/**
 * 根据机构id获取图像
 * @param organId
 */
export const getOrganLogo = (organId: any, refresh: boolean = true) => {
  let fileKey = `logo/organ/${organId}_logo`;
  return getOssFileUrl(fileKey, refresh);
};

// /**
//  * 根据机构id获取图像
//  * @param organId
//  */
//  export const getOrganLogo = organId => {
//   let ossData: ApiData.OssConfig = getGlobalOssConfig();
//   if (!ossData) {
//     return '';
//   }
//   let host = `https://${ossData.bucketName}.${ossData.endpoint}`;
//   return `${host}/logo/organ/${organId}_logo?r=${Date.now()}`;
// };

/**
 * 根据用户id获取图像
 * @param organId
 */
export const getUserLogo = (userId: any) => {
  let ossData: ApiData.OssConfig = useOssStore().ossConfig;
  if (!ossData) {
    return "";
  }
  let host = `https://${ossData.bucketName}.${ossData.endpoint}`;
  return `${host}/logo/user/${userId}_logo?r=${Date.now()}`;
};

/**
 * 根据用户id获取微信二维码
 * @param userId
 */
export const getWechatLogo = (userId: any) => {
  let ossData: ApiData.OssConfig = useOssStore().ossConfig;
  if (!ossData) {
    return "";
  }
  let host = `https://${ossData.bucketName}.${ossData.endpoint}`;
  return `${host}/logo/wechat/${userId}_logo?r=${Date.now()}`;
};

/**
 * 截取字符串
 */
export function cutWord(str: string, len: number) {
  if (str && str.length > len) {
    return str.slice(0, len) + "...";
  } else {
    return str;
  }
}

/**
 * 获得url参数
 */
export function getQueryVariable(variable: string) {
  var query = "";
  var vars = query.split("&");
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split("=");
    if (pair[0] == variable) {
      return pair[1];
    }
  }
  return false;
}

export const priceFmt = (val: number) => {
  return val.toString().indexOf(".") > 0 ? val.toFixed(2) : val + ".00";
};

///判断是否为空
export const isNotEmpty = (str: any): boolean => {
  if (typeof str === "string") {
    if (
      str == undefined ||
      str == null ||
      str == "" ||
      str == "undefined" ||
      str == "null"
    ) {
      return false;
    }
  } else {
    if (str == undefined || str == null) {
      return false;
    }
  }

  return true;
};
export const getImageFromMake = (str: string | number): string => {
  return getOssFileUrl("logo/carlogo/" + str + ".png");
};

/**
 * @description: 隐藏号码加*
 * @param {head：开头显示几位，end：结尾显示几位}
 * @return:
 */
export function formateNumber(value: string | undefined, head: any, end: any) {
  if (!value || value == undefined) return "";
  let reg = new RegExp(`(.{${head}}).*(.{${end}})`);
  return value.replace(reg, "$1****$2");
}

export function getSendProfile(userProfile: { profileCustomField: never[]; }) {
  let profileCustomField = userProfile.profileCustomField || [];
  let key = "Tag_Profile_Custom_Organ";
  let data = null;
  if (profileCustomField.length > 0) {
    profileCustomField.forEach((val: { key: string; value: string; }) => {
      if (val.key == key) {
        data = JSON.parse(val.value);
      }
    });
  }
  return data;
}

export function getCloudCustomData(lastMessage: { cloudCustomData: any; }) {
  let cloudCustomData = lastMessage.cloudCustomData;
  let organ = null;
  if (cloudCustomData) {
    cloudCustomData = JSON.parse(cloudCustomData);
    organ = cloudCustomData.organ;
  }
  return organ;
}
/**
 * 加法运算，避免数据相加小数点后产生多位数和计算精度损失。
 *
 * @param num1加数1 | num2加数2
 */
export function numAdd(num1: number, num2: number) {
  let baseNum, baseNum1, baseNum2;
  try {
    baseNum1 = num1.toString().split(".")[1].length;
  } catch (e) {
    baseNum1 = 0;
  }
  try {
    baseNum2 = num2.toString().split(".")[1].length;
  } catch (e) {
    baseNum2 = 0;
  }
  baseNum = Math.pow(10, Math.max(baseNum1, baseNum2));
  return (num1 * baseNum + num2 * baseNum) / baseNum;
}
/**
 * 减法运算，避免数据相减小数点后产生多位数和计算精度损失。
 *
 * @param num1被减数 | num2减数
 */
export function numSub(num1: number, num2: number) {
  console.log(num1, num2);
  let baseNum, baseNum1, baseNum2;
  let precision; // 精度
  try {
    baseNum1 = num1.toString().split(".")[1].length;
  } catch (e) {
    baseNum1 = 0;
  }
  try {
    baseNum2 = num2.toString().split(".")[1].length;
  } catch (e) {
    baseNum2 = 0;
  }
  baseNum = Math.pow(10, Math.max(baseNum1, baseNum2));
  precision = baseNum1 >= baseNum2 ? baseNum1 : baseNum2;
  return ((num1 * baseNum - num2 * baseNum) / baseNum).toFixed(precision);
}
/**
 * 乘法运算，避免数据相乘小数点后产生多位数和计算精度损失。
 *
 * @param num1被乘数 | num2乘数
 */
export function numMulti(num1: { toString: () => string; }, num2: { toString: () => string; }) {
  let baseNum = 0;
  try {
    baseNum += num1.toString().split(".")[1].length;
  } catch (e) {}
  try {
    baseNum += num2.toString().split(".")[1].length;
  } catch (e) {}
  return (
    (Number(num1.toString().replace(".", "")) *
      Number(num2.toString().replace(".", ""))) /
    Math.pow(10, baseNum)
  );
}
/**
 * 除法运算，避免数据相除小数点后产生多位数和计算精度损失。
 *
 * @param num1被除数 | num2除数
 */
export function numDiv(num1: { toString: () => string; }, num2: { toString: () => string; }) {
  let baseNum1 = 0,
    baseNum2 = 0;
  let baseNum3, baseNum4;
  try {
    baseNum1 = num1.toString().split(".")[1].length;
  } catch (e) {
    baseNum1 = 0;
  }
  try {
    baseNum2 = num2.toString().split(".")[1].length;
  } catch (e) {
    baseNum2 = 0;
  }
  baseNum3 = Number(num1.toString().replace(".", ""));
  baseNum4 = Number(num2.toString().replace(".", ""));
  return (baseNum3 / baseNum4) * Math.pow(10, baseNum2 - baseNum1);
}
/**
 *
 * @param timer
 * @param format
 */
export const formatTimeSplit = (
  timer: number,
  isOnlyDay: boolean = false
): any => {
  // diffTime此为时间戳相减的时间差
  let now = new Date().getTime() / 1000;
  let second = timer - now;
  let minute = 0;
  let hour = 0;
  let day = 0;
  let result = ``;
  // 将秒数转换成整数
  if (second < 1) {
    return -1;
  } else if (isOnlyDay) {
    let oneDay = 24 * 60 * 60;
    let day = Math.floor(second / oneDay);
    let hour = Math.floor(second % oneDay);
    if (hour > 0) {
      day++;
    }
    return day;
  } else {
    //  获取分钟
    minute = Math.floor(second / 60);
    //  获取秒数
    second = Math.floor(second % 60);
    //  如果分钟大于60，将分钟转换成小时
    if (minute > 60) {
      //  获取小时，获取分钟除以60，
      hour = Math.floor(minute / 60);
      // 获取分钟除以60取佘的分
      minute = Math.floor(minute % 60);
      //  如果小时大于24，将小时转换成天
      if (hour > 23) {
        day = Math.floor(hour / 24);
        hour = Math.floor(hour % 24);
      }
    }
    if (minute > 0) {
      result = `${minute}分${result}`;
    }
    if (hour > 0) {
      result = `${hour}小时${result}`;
    }
    if (day > 0) {
      result = "" + Math.floor(day) + "天" + result;
    }
    return result;
  }
};

//比较版本号
//compareVersion('1.11.0', '1.9.9') // 1
export function compareVersion(v1: string, v2: string) {
  let v11 = v1.split(".");
  let v22 = v2.split(".");
  const len = Math.max(v1.length, v2.length);

  while (v11.length < len) {
    v11.push("0");
  }
  while (v22.length < len) {
    v22.push("0");
  }

  for (let i = 0; i < len; i++) {
    const num1 = parseInt(v11[i]);
    const num2 = parseInt(v22[i]);

    if (num1 > num2) {
      return 1;
    } else if (num1 < num2) {
      return -1;
    }
  }

  return 0;
}

/**
 * 空闲控制 返回函数连续调用时，空闲时间必须大于或等于 wait，func 才会执行
 *
 * @param  {function} func        传入函数
 * @param  {number}   wait        表示时间窗口的间隔
 * @param  {boolean}  immediate   设置为ture时，调用触发于开始边界而不是结束边界
 * @return {function}             返回客户调用函数
 */
export function debounce(func: { (): void; apply?: any; }, wait: number | undefined, immediate: undefined) {
  var timeout: NodeJS.Timeout | null, args: IArguments | null, context: any, timestamp: number, result: any;

  var later = function () {
    var last = Date.now() - timestamp;

    if (wait&&last < wait && last >= 0) {
      timeout = setTimeout(later, wait - last);
    } else {
      timeout = null;
      if (!immediate) {
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      }
    }
  };

  return  () => {
    args = arguments;
    timestamp = Date.now();
    var callNow = immediate && !timeout;
    if (!timeout) timeout = setTimeout(later, wait);
    if (callNow) {
      result = func.apply(context, args);
      context = args = null;
    }

    return result;
  };
}

//计算当月起止日期,endtime不传默认为当天,否则为最后一天
export function getMonthStartEnd(endtime = false) {
  let date = new Date();
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let firstDay = new Date(year, month - 1, 1);
  let lastDay = endtime ? new Date(year, month, 0) : date;
  //计算当天23:59:59
  lastDay.setHours(23, 59, 59, 999);
  // let firstDayStr = firstDay.getFullYear() + '-' + (firstDay.getMonth() + 1) + '-' + firstDay.getDate();
  // let lastDayStr = lastDay.getFullYear() + '-' + (lastDay.getMonth() + 1) + '-' + lastDay.getDate();
  //返回时间戳
  return [
    parseInt(String(firstDay.getTime() / 1000)),
    parseInt(String(lastDay.getTime() / 1000)),
  ];
}

//计算指定日期前多少天
export function getBeforeTimeStartEnd(endtime: Date, day = 7) {
  if (!endtime) {
    let date = new Date();
    date.setHours(23, 59, 59, 999);
    endtime = date;
    console.log(endtime);
  }
  let daysAgo = new Date(endtime.getTime() - day * 24 * 60 * 60 * 1000);
  daysAgo.setHours(0, 0, 0, 999);
  //返回时间戳
  return [
    parseInt(String(daysAgo.getTime() / 1000)),
    parseInt(String(endtime.getTime() / 1000)),
  ];
}
