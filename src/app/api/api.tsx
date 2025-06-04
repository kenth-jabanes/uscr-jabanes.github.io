import { supabase } from "@/utils/supabase";

export const insertTryout = async ({ newTryout }: { newTryout: any }) => {
  try {
    const { data, error } = await supabase
      .from("TryOut")
      .insert([newTryout])
      .select();

    if (error) {
      console.error("Supabase error:", error);
      throw error;
    }

    return data;
  } catch (error: any) {
    console.error("Error inserting tryout:", error.message);
    throw error;
  }
};

export const insertAppointment = async ({
  newAppointment,
}: {
  newAppointment: any;
}) => {
  try {
    const { data, error } = await supabase
      .from("Appointment")
      .insert([newAppointment])
      .select();

    if (error) {
      console.error("Supabase error:", error);
      throw error;
    }

    return data;
  } catch (error: any) {
    console.error("Error inserting appointment:", error.message);
    throw error;
  }
};

export const insertInventory = async ({
  newInventory,
}: {
  newInventory: any;
}) => {
  try {
    const { data, error } = await supabase
      .from("Inventory")
      .insert([newInventory])
      .select();

    if (error) {
      console.error("Supabase error:", error);
      throw error;
    }

    return data;
  } catch (error: any) {
    console.error("Error inserting inventory:", error.message);
    throw error;
  }
};

export const updateInventory = async ({
  inventoryId,
  updatedInventory,
}: {
  inventoryId: string;
  updatedInventory: any;
}) => {
  try {
    const { data, error } = await supabase
      .from("Inventory")
      .update(updatedInventory)
      .match({ id: inventoryId });

    if (error) {
      console.error("Supabase error:", error);
      throw error;
    }

    return data;
  } catch (error: any) {
    console.error("Error updating inventory:", error.message);
    throw error;
  }
};

export const deleteTryout = async ({ tryoutId }: { tryoutId: number }) => {
  try {
    const { data, error } = await supabase
      .from("TryOut")
      .delete()
      .match({ id: tryoutId });

    if (error) {
      console.error("Supabase error:", error);
      throw error;
    }

    return data;
  } catch (error: any) {
    console.error("Error deleting tryout:", error.message);
    throw error;
  }
};

export const deleteAppointment = async ({
  appointmentId,
}: {
  appointmentId: number;
}) => {
  try {
    const { data, error } = await supabase
      .from("Appointment")
      .delete()
      .match({ id: appointmentId });

    if (error) {
      console.error("Supabase error:", error);
      throw error;
    }

    return data;
  } catch (error: any) {
    console.error("Error deleting appointment:", error.message);
    throw error;
  }
};

export const deleteInventory = async ({
  inventoryId,
}: {
  inventoryId: number;
}) => {
  try {
    const { data, error } = await supabase
      .from("Inventory")
      .delete()
      .match({ id: inventoryId });

    if (error) {
      console.error("Supabase error:", error);
      throw error;
    }

    return data;
  } catch (error: any) {
    console.error("Error deleting inventory:", error.message);
    throw error;
  }
};
