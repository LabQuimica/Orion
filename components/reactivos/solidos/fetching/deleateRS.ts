"use server";
import supabase from "@/supabaseClient";

export const deleteRS = async (resultado: any) => {
  const { data, error } = await supabase
    .from("reactivos_solidos")
    .delete()
    .eq("id_reactivos", resultado);

  if (error) {
    console.error("Error fetching smoothies:", error);
    return null;
  }
  return data;
};
