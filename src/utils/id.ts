import * as Crypto from "expo-crypto";

export async function generateId() {
  const random = await Crypto.getRandomBytesAsync(16);
  return Array.from(random)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}
