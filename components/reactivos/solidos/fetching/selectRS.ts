import supabase from "../../../../supabaseClient";

export const fetchReactivosSolidos = async () => {
  const { data, error } = await supabase
    .from("reactivos_solidos")
    .select("*, ubicacion(*)");
  if (error) {
    console.error("Error fetching smoothies:", error);
    return null;
  }

  return data;
};
