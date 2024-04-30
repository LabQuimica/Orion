"use server";
import supabase from "@/supabaseClient";

export const updateRS = async (resultado: any) => {
  const { data, error } = await supabase
    .from("reactivos_solidos")
    .update({
      nombre: resultado.nombre,
      num_cas: resultado.num_cas,
      formula: resultado.formula,
      marca: resultado.marca,
      cantidad: resultado.cantidad,
      contenedor: resultado.contenedor,
      observaciones: resultado.observaciones,
    })
    .eq("id_reactivos", resultado.id_reactivos);

  if (error) {
    console.error("Error fetching smoothies:", error);
    return null;
  }
  return data;
};
