import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../../utils/api";

const VideoDetail = () => {
    //* 1. adim : Arama parametresine erisim icin kurulum 
    const [searchParams] = useSearchParams();
    //* 2.Adim : URL'den "v" isimli parametreye eris.
    const id = searchParams.get("v");
    useEffect(()=>{
    api.get(`/video/info?id=${id}`);
    }, []);

  return <div>VideoDetail</div>;
};

export default VideoDetail;
