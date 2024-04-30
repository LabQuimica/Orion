"use server";
import supabase from "@/supabaseClient";

export const updateMateriales = async (resultado: any) => {
  const { data, error } = await supabase
    .from("materiales")
    .update({
      nombre: resultado.nombre,
      num_serie: resultado.num_serie,
      marca: resultado.marca,
    })
    .eq("id_material", resultado.id_material);

  if (error) {
    console.error("Error fetching materiales:", error);
    return null;
  }
  return data;
};
