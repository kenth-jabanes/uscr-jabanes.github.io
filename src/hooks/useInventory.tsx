import { useEffect, useCallback, useState } from "react";
import { supabase } from "@/utils/supabase";
import { PostgrestResponse } from "@supabase/supabase-js";

const useInventory = () => {
  const [inventory, setInventory] = useState<any[]>([]);
  const [isLoadingInvetory, setIsLoadingInvetory] = useState<boolean>(true);

  const fetchInventory = useCallback(async () => {
    try {
      const response: PostgrestResponse<any> = await supabase
        .from("Inventory")
        .select("*")
        .order("item_name", { ascending: false });

      if (response.error) {
        throw response.error;
      }

      const inventory = response.data || [];
      setInventory(inventory);
      setIsLoadingInvetory(false);
    } catch (err) {
      if (err instanceof Error) {
        console.error("Error fetching inventory:", err.message);
      } else {
        console.error("An unknown error occurred while fetching inventory");
      }
    } finally {
      setIsLoadingInvetory(false);
    }
  }, []);

  const subscribeToChanges = useCallback(() => {
    const channel = supabase
      .channel("inventory_realtime") // Changed from "tryout_realtime"
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "Inventory",
        },
        (payload) => {
          fetchInventory();
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
  }, [fetchInventory]);

  useEffect(() => {
    fetchInventory();

    const unsubscribe = subscribeToChanges();

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [fetchInventory, subscribeToChanges]);

  return { inventory, isLoadingInvetory, fetchInventory };
};

export default useInventory;
