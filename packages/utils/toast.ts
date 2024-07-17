import { ElMessage,ElLoading  } from 'element-plus'
const Toast = {
  //错误提示
  error(title: string, options?: any) {
    return ElMessage({
      message: title,
      type: 'warning',
      ...options
    })
  },
  //成功提示
  success(title: string, options?: any) {
    return ElMessage({
      message: title,
      type: 'success',
      ...options
    })
  },
  //普通消息提示
  message(title: string, options?: any) {
    return ElMessage({
      message: title,
      ...options
    })
  },
  //警告提示
  warn(title: string, options?: any) {
    return ElMessage({
      message: title,
      type: 'warning',
      ...options
    })
  },
  loading:{} as any,
  //显示loading
  showLoading(title?: string, options?: any) {
    this.loading=ElLoading.service({
      lock: true,
      text: title,
      background: 'rgba(0, 0, 0, 0.7)',
      ...options
    })
  },
  //取消loading
  hideLoading() {
    this.loading&&this.loading.close()
  }
};

export default Toast;
