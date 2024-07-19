import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../../utils/api";
import ReactPlayer from "react-player";
import ChannelInfo from "./ChannelInfo";
import VideoInfo from "./VideoInfo";
import Comments from "./Comments";
import VideoCard from "../../composnents/VideoCard";

const VideoDetail = () => {
  const [video, setVideo] = useState(null);
  const [comments, setComments] = useState(null);
  console.log(video);
  //* 1. adim : Arama parametresine erisim icin kurulum
  const [searchParams] = useSearchParams();
  //* 2.Adim : URL'den "v" isimli parametreye eris.
  const id = searchParams.get("v");

  useEffect(() => {
    //* 3.Adim id sini bildigimiz videonun detayini al
    api.get(`/video/info?id=${id}&extend=1`).then((res) => setVideo(res?.data));
    //* 4- Adim id sini bildigimiz videonun yorumlarini al
    api.get(`/comments?id=${id}`).then((res) => setComments(res?.data));
  }, []);
  return (
    <div className=" h-screen detail-page overflow-auto">
      <div>
        <div className="h-[50vh] lg:h-[60vh] overflow-hidden rounded-md">
          <ReactPlayer
            controls
            width={"1000"}
            height={"100%"}
            url={`https://www.youtube.com/watch?v=${id}`}
          />
        </div>

        {!video && <p>Yukleniyor...</p>}

        {video && (
          <>
            {/* baslik */}
            <h1 className="my-3 text-xl font-bold">{video?.title}</h1>

            {/* Kanal Bilgileri */}
            <ChannelInfo video={video} />

            {/*video bilgileri */}
            <VideoInfo video={video} />

            {/* Yorumlar */}
            <Comments data={comments} />
          </>
        )}
      </div>

      <div>
        {video?.relatedVideos.data.map(
          (item, index) =>
            item.type === "video" && <VideoCard video={item} key={index} />
        )}
      </div>
    </div>
  );
};

export default VideoDetail;
