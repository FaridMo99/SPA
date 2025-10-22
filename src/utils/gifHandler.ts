import { backendUrl } from "../stores/authStore";

export type Gif = {
  url: string;
  width: number;
  height: number;
  blur_preview?: string;
};

export type GifResponse = {
  gifs: Gif[];
  current_page: number;
  per_page: number;
  has_next: boolean;
};

export async function getTrendingGifs(page: number): Promise<GifResponse> {
  const res = await fetch(`${backendUrl}/gifs/trending?page=${page}`, {
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Something went wrong");
  }
  return await res.json();
}

export async function searchGifs(search: string): Promise<Gif[]> {
  const res = await fetch(`${backendUrl}/gifs?search=${search}`, {
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Something went wrong");
  }
  return await res.json();
}
