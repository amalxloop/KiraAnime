"use client";

import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from "react";

interface MyListItem {
  anime_id: string;
  anime_title: string;
  anime_poster: string;
  anime_type: string;
  anime_rating: string;
  anime_episodes: number;
}

interface MyListContextType {
  myList: MyListItem[];
  isInList: (animeId: string) => boolean;
  addToList: (item: MyListItem) => Promise<boolean>;
  removeFromList: (animeId: string) => Promise<boolean>;
  refreshList: () => Promise<void>;
  isLoading: boolean;
}

const MyListContext = createContext<MyListContextType | undefined>(undefined);

export function MyListProvider({ children }: { children: ReactNode }) {
  const [myList, setMyList] = useState<MyListItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchList = useCallback(async () => {
    try {
      const response = await fetch("/api/my-list");
      const result = await response.json();
      if (result.success) {
        setMyList(result.data || []);
      }
    } catch (error) {
      console.error("Error fetching my list:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchList();
  }, [fetchList]);

  const isInList = useCallback((animeId: string) => {
    return myList.some((item) => item.anime_id === animeId);
  }, [myList]);

  const addToList = useCallback(async (item: MyListItem): Promise<boolean> => {
    try {
      const response = await fetch("/api/my-list", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(item),
      });
      const result = await response.json();
      
      if (result.success) {
        setMyList((prev) => [...prev, item]);
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error adding to list:", error);
      return false;
    }
  }, []);

  const removeFromList = useCallback(async (animeId: string): Promise<boolean> => {
    try {
      const response = await fetch(`/api/my-list?anime_id=${animeId}`, {
        method: "DELETE",
      });
      const result = await response.json();
      
      if (result.success) {
        setMyList((prev) => prev.filter((item) => item.anime_id !== animeId));
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error removing from list:", error);
      return false;
    }
  }, []);

  const refreshList = useCallback(async () => {
    setIsLoading(true);
    await fetchList();
  }, [fetchList]);

  return (
    <MyListContext.Provider
      value={{
        myList,
        isInList,
        addToList,
        removeFromList,
        refreshList,
        isLoading,
      }}
    >
      {children}
    </MyListContext.Provider>
  );
}

export function useMyList() {
  const context = useContext(MyListContext);
  if (context === undefined) {
    throw new Error("useMyList must be used within a MyListProvider");
  }
  return context;
}
