import supabase from "./supabase";

export async function getCabins() {
  let { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.log(error);
    throw new Error("Cabins could not be loaded.");
  }

  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.log(error);
    throw new Error(`Cabin with id: ${id} could not be deleted.`);
  }

  return data;
}

export async function createEditCabin(newCabin, id) {
  const supabasePath = import.meta.env.VITE_SUPABASE_URL;

  console.log(newCabin);

  // check to see if we recieved a path to the db or a new file
  const hasImagePath = newCabin.image?.startsWith?.(supabasePath);

  // if we got a new file then we add a "hash" prefix to it before storing it
  // otherwise we can just keep it the same
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    "",
  );

  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabasePath}/storage/v1/object/public/cabin-images/${imageName}`;

  // 1a. Create cabin
  let query = supabase.from("cabins");
  if (!id) {
    query = query.insert([{ ...newCabin, image: imagePath }]);
  }

  // 1b. Edit cabin
  if (id) {
    query = query.update({ ...newCabin, image: imagePath }).eq("id", id);
  }

  // Get the result back
  const { data, error } = await query.select().single();

  if (error) {
    console.log(error);
    throw new Error(`Cabin could not be created.`);
  }

  if (hasImagePath) {
    return data;
  }

  // 2 Upload the image
  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  // 2a. if we weren't able to upload the image, delete the original entry to be safe
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    console.error(storageError);
    throw new Error(
      "Cabin image could not be uploaded. Cabin was not created.",
    );
  }
}
