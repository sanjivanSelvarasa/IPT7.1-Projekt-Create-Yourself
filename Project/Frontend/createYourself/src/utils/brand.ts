const brands = [
  {
    name: 'youtube',
    icon: 'fa-brands fa-youtube',
  },
  {
    name: 'email',
    icon: 'fa-regular fa-envelope',
  },
  {
    name: 'github',
    icon: 'fa-brands fa-github',
  },
  {
    name: 'linkedin',
    icon: 'fa-brands fa-linkedin',
  },
  {
    name: 'twitter',
    icon: 'fa-brands fa-x-twitter',
  },
  {
    name: 'instagram',
    icon: 'fa-brands fa-instagram',
  },
  {
    name: 'tiktok',
    icon: 'fa-brands fa-tiktok',
  },
]
export function getBrandSvg(text: string) {
  for (const brand of brands) {
    if(text.trim().toLowerCase().includes(brand.name.toLowerCase()))
      return brand.icon;
  }

  return 'fa-solid fa-globe'
}
