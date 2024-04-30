"use server";
import supabase from "@/supabaseClient";

export const deleteManual= async (resultado: any) => {
  const { data, error } = await supabase
    .from("manuales")
    .delete()
    .eq("id_manual", resultado);

  if (error) {
    console.error("Error fetching smoothies:", error);
    return null;
  }
  return data;
};
