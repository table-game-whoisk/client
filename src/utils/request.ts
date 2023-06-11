export const request = (() => {
  const platform = process.env.UNI_PLATFORM as string;
  console.log(platform);
  const baseURL = platform === "h5" ? "/api" : (import.meta.env.VITE_API_BASEURL as string);

  const getFullUrl = (path: string) => {
    if (baseURL.endsWith("/")) {
      if (path.startsWith("/")) {
        return baseURL + path.slice(1);
      } else {
        return baseURL + path;
      }
    } else {
      if (path.startsWith("/")) {
        return baseURL + path;
      } else if (path.startsWith("http")) {
        return path;
      } else {
        return baseURL + "/" + path;
      }
    }
  };

  return <T = any>(options: UniNamespace.RequestOptions): Promise<T> => {
    const url = getFullUrl(options.url as string);

    return new Promise((resolve, reject) => {
      uni.request({
        ...options,
        url,
        header: {
          platform
        },
        timeout: 10000,
        success: (res) => {
          if (res.statusCode === 200) {
            resolve((res.data as AnyObject).data as T);
          } else if (res.statusCode === 400) {
            try {
              uni.showToast({
                // @ts-ignore
                title: res.data.msg,
                icon: "none"
              });
            } catch (e: any) {
              uni.showToast({
                title: e.message,
                icon: "none"
              });
            }
          }
          reject(res.data);
        },
        fail: (error) => {
          uni.showToast({
            title: "服务异常",
            icon: "none"
          });
          reject(error);
        }
      });
    });
  };
})();

export const apis = {
  user: {
    create: "user/create",
    info: "user/info",
    auth: "user/auth"
  }
};
