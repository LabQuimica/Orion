"use server";
import supabase from "@/supabaseClient";

export const deleteMaterial= async (resultado: any) => {
  const { data, error } = await supabase
    .from("materiales")
    .delete()
    .eq("id_material", resultado);

  if (error) {
    console.error("Error fetching smoothies:", error);
    return null;
  }
  return data;
};
