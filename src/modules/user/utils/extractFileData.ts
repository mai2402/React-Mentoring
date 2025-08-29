

export function extractFileData(file: File) {

  const extractedFileName  = file.name.split(".").pop()?.toLowerCase() || "";

     if (extractedFileName) return extractedFileName;
     if (file.type.includes("png")) return "png";
     if (file.type.includes("webp")) return "webp";

  return "jpg";


}