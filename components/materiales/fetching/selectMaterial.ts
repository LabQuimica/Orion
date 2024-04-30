import supabase from "@/supabaseClient";

export const fetchMateriales = async () => {
  const { data, error } = await supabase
    .from("materiales")
    .select("*, ubicacion(*)");
  if (error) {
    console.error("Error fetching materiales:", error);
    return null;
  }

  return data;
};
