import { useEffect, useCallback, useState } from "react";
import { supabase } from "@/utils/supabase";
import { PostgrestResponse } from "@supabase/supabase-js";

const useTryouts = () => {
  const [tryouts, setTryouts] = useState<any[]>([]);
  const [isLoadingTryouts, setIsLoadingTryouts] = useState<boolean>(true);

  const fetchTryout = useCallback(async () => {
    try {
      const response: PostgrestResponse<any> = await supabase
        .from("TryOut")
        .select("*")
        .order("created_at", { ascending: false });

      if (response.error) {
        throw response.error;
      }

      const tryouts = response.data || [];
      setTryouts(tryouts);
      setIsLoadingTryouts(false);
    } catch (err) {
      if (err instanceof Error) {
        console.error("Error fetching tryouts:", err.message);
      } else {
        console.error("An unknown error occurred while fetching tryouts");
      }
    } finally {
      setIsLoadingTryouts(false);
    }
  }, []);

  const subscribeToChanges = useCallback(() => {
    const channel = supabase
      .channel("tryouts_realtime") // Changed from "tryout_realtime"
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "TryOut",
        },
        (payload) => {
          fetchTryout();
        }
      )
      .subscribe((status: any) => {
        if (status !== "SUBSCRIBED") {
          //   console.error("Error subscribing to channel:", status);
        }
      });

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchTryout]);

  useEffect(() => {
    fetchTryout();

    const unsubscribe = subscribeToChanges();

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [fetchTryout, subscribeToChanges]);

  return { tryouts, isLoadingTryouts, fetchTryout };
};

export default useTryouts;
