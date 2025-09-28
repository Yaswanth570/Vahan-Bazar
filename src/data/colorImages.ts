export type ColorImageMap = Record<string, Record<string, string[]>>;

// Distinct color variants per bike id.
// IMPORTANT: Run the generator to create these files first:
//   npm i sharp
//   node scripts/generate-color-variants.mjs
// The files are written into public/images/* and mapped below.
export const colorImages: ColorImageMap = {
  // 1) Yamaha MT-15
  '1': {
    'Cyan Blue': ['/images/yamaha-mt15-blue.jpg'],
    'Racing Black': ['/images/yamaha-mt15-black.jpg'],
    'Ice Fluo-Vermillion': ['/images/yamaha-mt15-red.jpg'],
    'Pearl White': ['/images/yamaha-mt15-white.jpg'],
  },

  // 2) Ather 450X
  '2': {
    'Space Grey': ['/images/ather-450x-grey.jpg'],
    'Mint Green': ['/images/ather-450x-green.jpg'],
    'White': ['/images/ather-450x-white.jpg'],
    'Jet Black': ['/images/ather-450x-black.jpg'],
  },

  // 3) Honda Activa 6G
  '3': {
    'Matte Axis Grey Metallic': ['/images/honda-activa-grey.jpg'],
    'Pearl Precious White': ['/images/honda-activa-white.jpg'],
    'Decent Blue Metallic': ['/images/honda-activa-blue.jpg'],
    'Jet Black': ['/images/honda-activa-black.jpg'],
  },

  // 4) Royal Enfield Classic 350
  '4': {
    'Redditch Red': ['/images/royal-enfield-classic-red.jpg'],
    'Halcyon Black': ['/images/royal-enfield-classic-black.jpg'],
    'Gunmetal Grey': ['/images/royal-enfield-classic-grey.jpg'],
    'Cosmic Blue': ['/images/royal-enfield-classic-blue.jpg'],
  },

  // 5) TVS iQube
  '5': {
    'Titanium Grey': ['/images/tvs-iqube-grey.jpg'],
    'Pearl White': ['/images/tvs-iqube-white.jpg'],
    'Mint Blue': ['/images/tvs-iqube-blue.jpg'],
    'Jet Black': ['/images/tvs-iqube-black.jpg'],
  },

  // 6) Bajaj Pulsar NS200
  '6': {
    'Burnt Red': ['/images/bajaj-pulsar-red.jpg'],
    'Satin Blue': ['/images/bajaj-pulsar-blue.jpg'],
    'Pewter Grey': ['/images/bajaj-pulsar-grey.jpg'],
    'Jet Black': ['/images/bajaj-pulsar-black.jpg'],
  },

  // 7) Ola S1 Pro
  '7': {
    'Jet Black': ['/images/ola-s1-pro-black.jpg'],
    'Porcelain White': ['/images/ola-s1-pro-white.jpg'],
    'Liquid Silver': ['/images/ola-s1-pro-silver.jpg'],
    'Cosmic Blue': ['/images/ola-s1-pro-blue.jpg'],
  },

  // 8) Hero Splendor Plus
  '8': {
    'Black with Silver': ['/images/hero-splendor-black-silver.jpg'],
    'Heavy Grey with Green': ['/images/hero-splendor-grey-green.jpg'],
    'Black with Purple': ['/images/hero-splendor-black-purple.jpg'],
    'Pearl Mirage White': ['/images/hero-splendor-white.jpg'],
  },

  // 9) Suzuki Access 125
  '9': {
    'Metallic Matte Platinum Silver': ['/images/suzuki-access-silver.jpg'],
    'Pearl Mirage White': ['/images/suzuki-access-white.jpg'],
    'Glossy Grey': ['/images/suzuki-access-grey.jpg'],
    'Jet Black': ['/images/suzuki-access-black.jpg'],
  },

  // 10) Future Electric Pro
  '10': {
    'Galaxy Black': ['/images/future-electric-pro-black.jpg'],
    'Cosmic Blue': ['/images/future-electric-pro-blue.jpg'],
    'Stardust Silver': ['/images/future-electric-pro-silver.jpg'],
    'Redditch Red': ['/images/future-electric-pro-red.jpg'],
  },
};
