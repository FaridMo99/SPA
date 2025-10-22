import React, { useEffect, useState } from "react";
import ModalWrapper from "../profile/ModalWrapper";
import CustomLoader from "../ui/CustomLoader";
import ErrorText from "../ui/ErrorText";
import NotFound from "../ui/NotFound";
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { getTrendingGifs, searchGifs, type Gif } from "../../utils/gifHandler";
import { useLocation, useParams } from "react-router-dom";
import { createComment } from "../../utils/interactWithPost";
import toast from "react-hot-toast";
import useSocket from "../../stores/socketStore";
import useDebounce from "../../hooks/useDebounce";

type GifModalProps = {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

//searchbar and message gif functionality
function GifModal({ setOpen }: GifModalProps) {
  const { ref: loadMoreRef, inView } = useInView();
  const location = useLocation();
  const { id, chatId } = useParams();

  const [search, setSearch] = useState<string>("");
  const queryClient = useQueryClient();
  const { sendMessage, messageSentSuccessful } = useSocket((state) => state);
  const debouncedSearch = useDebounce(search, 500);

  const { mutate } = useMutation({
    mutationKey: ["send gif"],
    mutationFn: (urlString: string) => {
      if (id)
        return createComment(id, { content: urlString, contentType: "GIF" });
      throw new Error("No Post to comment on");
    },
    onError: (err) => {
      toast.error(err.message);
    },
    onSuccess: () => {
      setOpen(false);
      queryClient.invalidateQueries({ queryKey: ["get comments", id] });
    },
  });

  const {
    data: searchGifsResults,
    isLoading: searchIsLoading,
    isError: searchIsError,
  } = useQuery({
    queryKey: ["search gifs", debouncedSearch],
    queryFn: () => searchGifs(debouncedSearch),
    enabled: debouncedSearch.length > 0,
  });

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
  } = useInfiniteQuery({
    queryKey: ["get gifs", search],
    queryFn: ({ pageParam = 1 }) => getTrendingGifs(pageParam),
    getNextPageParam: (lastPage) =>
      lastPage.has_next ? lastPage.current_page + 1 : undefined,
    initialPageParam: 1,
    enabled: !debouncedSearch,
  });

  function submitGifHandler(urlString: string) {
    //http mutation
    if (location.pathname.includes("comments")) {
      mutate(urlString);
    }

    //websocket send message
    if (location.pathname.includes("messages")) {
      if (!chatId) return;
      sendMessage({ message: urlString, chatId, type: "GIF" });
    }
  }

  useEffect(() => {
    if (messageSentSuccessful) {
      setOpen(false);
    }
  }, [messageSentSuccessful, setOpen]);

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  const gifs: Gif[] = debouncedSearch
    ? searchGifsResults || []
    : data?.pages.flatMap((page) => page.gifs) || [];

  return (
    <ModalWrapper setIsOpen={setOpen}>
      <section className="w-1/2 relative h-[80vh] md:w-[30vw] dark:bg-dark-gray bg-white rounded-2xl outline-1 outline-gray-200 shadow-md shadow-black/20 z-51 overflow-auto flex flex-col items-center px-2">
        <div className="w-full min-h-15 flex justify-center items-center sticky top-0 dark:bg-dark-gray bg-white">
          <input
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            className="dark:bg-neutral-900 focus:outline-green-400 dark:focus:outline-dark-green bg-neutral-500 rounded-lg placeholder:pl-2 w-2/3 md:w-1/2 md:h-8"
            placeholder="search..."
          />
        </div>
        {(isLoading || searchIsLoading) && (
          <CustomLoader styles="mt-20" size={80} />
        )}
        {(isError || searchIsError) && (
          <ErrorText text={error?.message || "Something went wrong"} />
        )}
        {!isError &&
          !searchIsError &&
          gifs.length === 0 &&
          !(isLoading || searchIsLoading) && (
            <NotFound text="No GIFs found..." />
          )}
        <div className="p-2 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
          {gifs.map((gif, index) => (
            <img
              onClick={() => submitGifHandler(gif.url)}
              key={index}
              src={gif.url}
              width={gif.width}
              height={gif.height}
              alt="gif"
              className="mb-4"
            />
          ))}
        </div>
        {isFetchingNextPage && <CustomLoader styles="my-8" />}
        <div ref={loadMoreRef} className="h-10" />
        {isError && <ErrorText text={error.message} />}
      </section>
    </ModalWrapper>
  );
}

export default GifModal;
