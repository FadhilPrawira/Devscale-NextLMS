export function getYouTubeEmbedUrl(url: string): string {
  const videoIdMatch =
    /^(?:https?:\/\/|\/\/)?(?:www\.|m\.|.+\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|shorts\/|feeds\/api\/videos\/|watch\?v=|watch\?.+&v=))([\w-]{11})(?![\w-])/.exec(
      url,
    );
  const videoId = videoIdMatch ? videoIdMatch[1] : url;
  return videoId;
}
