import { useEffect, useCallback, useState } from "react";
import { supabase } from "@/utils/supabase";
import { PostgrestResponse } from "@supabase/supabase-js";

const useAppointments = () => {
  const [appointments, setAppointments] = useState<any[]>([]);
  const [isLoadingAppointments, setIsLoadingAppointments] =
    useState<boolean>(true);

  const fetchAppointments = useCallback(async () => {
    try {
      const response: PostgrestResponse<any> = await supabase
        .from("Appointment")
        .select("*")
        .order("created_at", { ascending: false });

      if (response.error) {
        throw response.error;
      }

      const appointments = response.data || [];
      setAppointments(appointments);
      setIsLoadingAppointments(false);
    } catch (err) {
      if (err instanceof Error) {
        console.error("Error fetching appointments:", err.message);
      } else {
        console.error("An unknown error occurred while fetching appointments");
      }
    } finally {
      setIsLoadingAppointments(false);
    }
  }, []);

  const subscribeToChanges = useCallback(() => {
    const channel = supabase
      .channel("appointment_realtime")
      .on(
        "postgres_changes",
        {
          event: "*",  // This ensures we catch all events (insert, update, delete)
          schema: "public",
          table: "Appointment",
        },
        (payload) => {
          fetchAppointments(); // This will refresh the data
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
  }, [fetchAppointments]);

  useEffect(() => {
    fetchAppointments();

    const unsubscribe = subscribeToChanges();

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [fetchAppointments, subscribeToChanges]);

  return { appointments, isLoadingAppointments, fetchAppointments };
};

export default useAppointments;
