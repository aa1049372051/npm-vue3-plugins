declare namespace API {
  export enum Channel {
    "PC" = "PC",
    "WEB" = "WEB",
    "WX" = "WX"
  }

  export interface Request<T> {
    pageno?: number;
    pagesize?: number;
    param?: T;
  }

  export interface Response<T> {
    retCode: number;
    retMsg: string;
    result: T;
    errMsg: string;
    reqSeq: string;
    total?: number;
  }
}


declare namespace ApiData {
  interface Session {
    organ: Organ;
    user: User;
    organEmployee: OrganEmployee;
    openId: string;
    unionId: string;
    userId: number;
    organId: number;
    accessToken: string;
    channel: string | API.Channel;
  }

  interface Organ {
    id: number;
    organName?: string;
    organAbbr?: string;
    bossName?: string;
    province?: number;
    city?: number;
    district?: number;
    provinceName?: string;
    cityName?: string;
    districtName?: string;
    organType?: number;
    isPerfect?: number;//信息是否完善（0-否、1-是）
    mmbNo?: string;
  }

  interface User {
    id: number;
    isTest?: number;
		menu?: any;
		phone?: string;
		recvPhone?: string;
		role?: string;
		staffName?: string;
  }

  interface OrganEmployee {
    id: number;
  }

  interface OssConfig {
    endpoint?: string;
    bucketName?: string;
    imgServer?: string;
    accessKeyId?: string;
    accessKeySecret?: string;
  }
  interface IMConfig {
    imDomain: string;
    imIp: string;
    imMobilePort: string;
    imPcPort: string;
    imWebPort: string;
    mucDomain: string;
  }

  interface LoginRespType {
    token: string;
    authorities?:string;
  }
}
