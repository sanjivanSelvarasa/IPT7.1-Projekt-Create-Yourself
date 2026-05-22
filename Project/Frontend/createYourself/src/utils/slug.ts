export function toSlug(slug: string){
  return slug.toLowerCase().trim().split(' ').join('-').replace(/[^a-zA-Z0-9 -]/g, '');
}
