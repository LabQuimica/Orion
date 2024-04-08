import supabase from "../../../supabaseClient";

export const fetchReactivosLiquidos = async () => {
  const { data, error } = await supabase
    .from("reactivos_liquidos")
    .select("*, ubicacion(*)");
  if (error) {
    console.error("Error fetching smoothies:", error);
    return null;
  }

  return data;
};
