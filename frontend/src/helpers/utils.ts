export function getYoutubeThumbnail(url: string) {
  let videoId = url.split('v=')[1];
  if (!videoId) {
    return 'https://s.ytimg.com/yts/img/yt_1200-vflhSIVnY.png';
  }
  const ampersandPosition = videoId.indexOf('&');
  if (ampersandPosition !== -1) {
    videoId = videoId.substring(0, ampersandPosition);
  }
  return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
}
