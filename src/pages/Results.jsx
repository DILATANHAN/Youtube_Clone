import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../utils/api";
import Sidebar from "../components/Sidebar";
import VideoCard from "../components/VideoCard";

const Results = () => {
  const [searchParams] = useSearchParams();
  const [page, setPage] = useState(1);
  const [token, setToken] = useState();
  const [data, setData] = useState([]);

  //* URL'den aratilan kelimeyi al
  const query = searchParams.get("search_query");

  useEffect(() => {
    const params = {
      query: query,
      /*
      Eger ki sayfa degeri 1' den buyukse yeni yapilacak istekte once ki istegin token'ini ekleyerek bir sonra ki sayfanin verilerini alabiliyoruz.

      */
      token: page > 1 ? token : undefined,
    };

    api.get(`/search`, { params }).then((res) => {
      setToken(res.data.continuation);
      setData((prev) => prev.concat(res.data.data));
    });
  }, [query, page]);
  useEffect(() => {
    setData([]);
    setPage(1);
    setToken(undefined);
  }, [query]);
  return (
    <div className="flex gap-3">
      <div>
        <Sidebar />
      </div>
      <div className="mx-auto overflow-auto p-4 h-[90vh]">
        <h2 className="text-xl mb-5">
          <span className="font-bold">{query} </span>icin sonuclar
        </h2>

        <div className="flex flex-col gap-5 justify-center">
          {data?.map(
            (item, index) =>
              item.type === "video" && (
                <VideoCard video={item} isRow={true} key={index} />
              )
          )}

          <button
            onClick={() => setPage(page + 1)}
            className="bg-zinc-600 py-2 px-5 rounded-md my-10 hover:bg-zinc-800 transition"
          >
            Daha Fazla
          </button>
        </div>
      </div>
    </div>
  );
};

export default Results;
