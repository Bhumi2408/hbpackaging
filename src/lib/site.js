export const SITE_URL = "https://www.hbpackaging.in";
export const SITE_NAME = "HB Packaging";

export const CONTACT = {
  phones: [
    { label: "+91 798-375-3155", tel: "917983753155" },
    { label: "+91 969-055-4684", tel: "919690554684" },
    { label: "+91 783-088-5284", tel: "917830885284" },
  ],
  email: "info@hbpackaging.in",
  address: "Plot No. E-31, Sector - 2, Industrial Area, Bawana, Delhi - 110039",
  whatsapp: "919690554684",
  mapEmbed:
    "https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3496.3298922981076!2d77.04687887550699!3d28.79924147557409!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjjCsDQ3JzU3LjMiTiA3N8KwMDInNTguMCJF!5e0!3m2!1sen!2sin!4v1741851296327!5m2!1sen!2sin",
};

export const WHATSAPP_URL = `https://wa.me/${CONTACT.whatsapp}`;

// Header dropdown under "Products" (same order as the original menu)
export const PRODUCT_MENU = [
  { label: "Biscuit Packaging Tray", href: "/biscuit-packaging-tray-manufacturer/" },
  { label: "Biscuit Blister Tray", href: "/biscuit-packaging-blister/" },
  { label: "Chips Packaging Blister Tray", href: "/chips-packaging-tray/" },
  { label: "Cake Packaging Tray", href: "/cake-packaging-tray/" },
  { label: "Cookies Packaging Tray Manufacturer", href: "/cookies-packaging-tray-manufacturerr/" },
  { label: "Cosmetic Packaging Blister Tray", href: "/cosmetic-packaging-blister-tray/" },
  { label: "Food Packaging Blister Box", href: "/food-packaging-box/" },
  { label: "Rusk Packaging Blister Tray", href: "/rusk-packaging-tray/" },
  { label: "Muffin Packaging Blister Tray", href: "/muffin-plastic-tray/" },
  { label: "Sweet Packaging Blister Tray", href: "/sweet-blister-packaging-tray/" },
  { label: "Toy Packaging Blister Tray", href: "/toy-packaging-tray/" },
  { label: "Muffin Cake Packaging Blister Tray", href: "/muffin-cake-packaging-tray/" },
];

export const NAV = [
  { label: "Home", href: "/" },
  { label: "About us", href: "/about-us/" },
  { label: "Products", href: "/products/", children: PRODUCT_MENU },
  { label: "Blog", href: "/blog/" },
  { label: "Contact Us", href: "/contact-us/" },
];

// "Popular Product" grid on Home and Products pages
export const PRODUCT_GRID = [
  { title: "Biscuit Packaging Blister Tray", image: "/products/biscuit-packaging.jpg", href: "/biscuit-packaging-tray-manufacturer/" },
  { title: "Food Packaging Blister Box", image: "/products/food-packaging.jpg", href: "/food-packaging-box/" },
  { title: "Toy Packaging Blister Tray", image: "/products/toy-packaging-tray.jpg", href: "/toy-packaging-tray/" },
  { title: "Sweet Packaging Blister Tray", image: "/products/sweet-packaging.jpg", href: "/sweet-blister-packaging-tray/" },
  { title: "Chips Packaging Blister Tray", image: "/products/chips-packaging.jpg", href: "/chips-packaging-tray/" },
  { title: "Rusk Packaging Blister Tray", image: "/products/rusk-packaging.jpg", href: "/rusk-packaging-tray/" },
  { title: "Muffin Packaging Blister Tray", image: "/products/muffin-packaging.jpg", href: "/muffin-plastic-tray/" },
  { title: "Biscuit Blister Tray", image: "/products/biscuit-blister.jpg", href: "/biscuit-packaging-blister/" },
  { title: "Cake Packaging Blister Tray", image: "/products/cake-packaging.webp", href: "/cake-packaging-tray/" },
  { title: "Cookies Packaging Blister Tray", image: "/products/cookies-packaging.webp", href: "/cookies-packaging-tray-manufacturerr/" },
  { title: "Cosmetic Packaging Blister Tray", image: "/products/cosmetic-packaging.webp", href: "/cosmetic-packaging-blister-tray/" },
  { title: "Muffin Cake Packaging Blister Tray", image: "/products/muffin-cake-packaging.webp", href: "/muffin-cake-packaging-tray/" },
];

export const FOOTER_PRODUCTS = [
  { label: "Biscuit Packaging Tray", href: "/biscuit-packaging-tray-manufacturer/" },
  { label: "Biscuit Tray", href: "/biscuit-packaging-blister/" },
  { label: "Food Packaging Box", href: "/food-packaging-box/" },
  { label: "Toy Packaging Tray", href: "/toy-packaging-tray/" },
  { label: "Chips Packaging Tray", href: "/chips-packaging-tray/" },
];

export const FOOTER_LINKS = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about-us/" },
  { label: "Products", href: "/products/" },
  { label: "Contact Us", href: "/contact-us/" },
];


