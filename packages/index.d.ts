declare module '@my-plugins/vue-web' {
  import { DefineComponent } from 'vue';
  import { AxiosInstance } from 'axios';

  const WOssUpload: DefineComponent<{
    // 定义 props  
    myFile?: {};
    showFileList?: Boolean;
    showTips?: Boolean;
    showFileName?: Boolean
  }, {
    // 定义组件的 data、computed、methods 等  
    // 例如:  
    //   myMethod(): void;  
    fileList: Array<any>;
    clean(): any;
  }, unknown, {}>;

  const WGridView: DefineComponent<{
    // 定义 props  
    showPage?: Boolean;
    javaApi: (params: any) => void;
    tableOptions?: {};
    initSearch?: Boolean;
    responseCb: (resp: any) => Array<any>;
    columns: Array<any>;
    rowClick?: (data: Array<any>) => void;
    checkboxColumn?: {};
    selectionChange?: (data: Array<any>) => void;
  }, {
      // 定义组件的 data、computed、methods 等  
      // 例如:  
      //   myMethod(): void;  
    }, unknown, {}>;
  const StatusTips: DefineComponent<{
    // 定义 props  
  }, {
      // 定义组件的 data、computed、methods 等  
      // 例如:  
      //   myMethod(): void;  
    }, unknown, {}>;
  const WArea: DefineComponent<{
    // 定义 props  
    provinceId?: number | string;
    cityId?: number | string;
    areaId?: number | string;
    clearable?: boolean;
    isEmpty?: boolean; //要设置初始默认值，isEmpty必须true
    isCheck?: boolean;
    isProvinceAll?: boolean;
    rank?: number;
    areaClass?: {};
  }, {
    // 定义组件的 data、computed、methods 等  
    // 例如:  
    //   myMethod(): void;  
    validate(): any;
    reset(): any;
    clear(): any;
  }, unknown, {}>;
  const Editor: DefineComponent<{
    // 定义 props  
    modelValue: any;
  }, {
    // 定义组件的 data、computed、methods 等  
    // 例如:  
    //   myMethod(): void;  
    getHtml(): any;
  }, unknown, {}>;
  const FileList: DefineComponent<{
    file: Array<any>,
    isViewImg?: Boolean
    // 定义 props  
  }, {
      // 定义组件的 data、computed、methods 等  
      // 例如:  
      //   myMethod(): void;  
    }, unknown, {}>;

  const utils: {
    //提示
    Toast: {
      error: (msg: string, options?: any) => void,
      success: (msg: string, options?: any) => void,
      warn: (msg: string, options?: any) => void,
      showLoading: (title: string, options?: any) => void,
      hideLoading: () => void
    },
    httpV3: AxiosInstance,
    httpV2: AxiosInstance,
    httpYyt: AxiosInstance
    formatTime: (time: number | string, fmt: string) => string,
    getWechatLogo: (userId: any) => string,
    priceFmt: (val: number) => string,
    formatNumber: (n: string | any[]) => string,
    getOssFileUrl: (fileKey: string, refresh: boolean) => string,
    compareVersion: (v1: string, v2: string) => number,
    transDate: (timestamp: number) => string,
    formatTimeSplit: (
      timer: number,
      isOnlyDay: boolean
    ) => { day: number; hour: number; minute: number; second: number },
    getOrganLogo: (organId: any, refresh: boolean) => string,
    getUserLogo: (userId: any) => string,
    getImageFromMake: (str: string | number) => string,
    isChinese: (str: string) => boolean,
    cutWord: (str: string, len: number) => string,
    getBeforeTimeStartEnd: (endtime: Date, day: number) => {
      startTime: number;
      endTime: number;
    },
    isDev: () => boolean,
    numSub: (num1: number, num2: number) => number,
    numAdd: (num1: number, num2: number) => number,
    numMulti: (num1: { toString: () => string; }, num2: { toString: () => string; }) => number,
    numDiv: (num1: { toString: () => string; }, num2: { toString: () => string; }) => number,
    getSendProfile: (userProfile: { profileCustomField: never[]; }) => string,
  }
  const plugins: {}

  export {
    WGridView,
    StatusTips,
    WArea,
    WOssUpload,
    Editor,
    utils,
    plugins,
    FileList
  };
}
