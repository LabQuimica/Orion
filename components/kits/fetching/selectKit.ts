import supabase from "@/supabaseClient";

export const fetchKits = async () => {
  const { data, error } = await supabase
    .from("kits")
    .select("*, ubicacion(*)");
  if (error) {
    console.error("Error fetching kits:", error);
    return null;
  }

  return data;
};
