import supabase from "@/supabaseClient";

export const fetchManuales = async () => {
  const { data, error } = await supabase
    .from("manuales")
    .select("*");
  if (error) {
    console.error("Error fetching materiales:", error);
    return null;
  }

  return data;
};
