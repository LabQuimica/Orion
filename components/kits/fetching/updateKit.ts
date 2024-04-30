"use server";
import supabase from "@/supabaseClient";

export const updateKit = async (resultado: any) => {
  const { data, error } = await supabase
    .from("kits")
    .update({
      nombre: resultado.nombre,
      num_serie: resultado.num_serie,
      marca: resultado.marca,
      observaciones: resultado.observaciones,
      link: resultado.link,
      caja: resultado.caja,
      cantidad_kits: resultado.cantidad_kits,
      contenido: resultado.contenido,
      cantidad: resultado.cantidad,
    })
    .eq("id_kits", resultado.id_kits);

  if (error) {
    console.error("Error fetching materiales:", error);
    return null;
  }
  return data;
};
