"use server";
import supabase from "@/supabaseClient";

export const deleteKit= async (resultado: any) => {
  const { data, error } = await supabase
    .from("kits")
    .delete()
    .eq("id_kits", resultado);

  if (error) {
    console.error("Error fetching smoothies:", error);
    return null;
  }
  return data;
};
