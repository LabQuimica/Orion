"use server";
import supabase from "@/supabaseClient";

export const updateManuales = async (resultado: any) => {
  const { data, error } = await supabase
    .from("manuales")
    .update({
      codigo: resultado.codigo,
      manual: resultado.manual,
      topico: resultado.topico,
      cantidad: resultado.cantidad,
      referencia: resultado.referencia,
      presentacion: resultado.presentacion,
      idioma: resultado.idioma,
      observaciones: resultado.observaciones,
    })
    .eq("id_manual", resultado.id_manual);

  if (error) {
    console.error("Error fetching materiales:", error);
    return null;
  }
  return data;
};
