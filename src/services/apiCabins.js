import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*").order("created_at", { ascending: "true" });

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }

  return data;
}

export async function createEditCabin(newCabin, id) {
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll("/", "");

  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images//${imageName}`;

  // https://jgdpwuyudoyclwxyugvr.supabase.co/storage/v1/object/public/cabin-images//cabin-001.jpg

  // 1 create/edit the cabin
  let query = supabase.from("cabins");

  // A- Create
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

  // B- Edit
  if (id)
    query = query
      .update({ ...newCabin, image: imagePath })
      .eq("id", id)
      .select();

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be created");
  }

  // 2 upload the image
  if (hasImagePath) return data;

  const { error: storageError } = await supabase.storage.from("cabin-images").upload(imageName, newCabin.image);

  // 3 delete cabin if image doesn't upload

  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    console.error(storageError);
    throw new Error("Cabins image could not be uploaded");
  }

  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }

  return data;
}
