export function generateSlug(titulo: string): string {
  return titulo
    .toLowerCase() // Converte todos os caracteres para minúsculas
    .replace(/[^a-z0-9]+/g, "-") // Substitui uma ou mais sequências de caracteres que não são letras ou números por um único hífen
    .replace(/(^-|-$)/g, ""); // Remove hífens no início ou no final da string
}
