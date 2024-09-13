export const removeTrailingSlash = (url: string = ''): string => {
  return url.replace(/\/+$/, '');
};
