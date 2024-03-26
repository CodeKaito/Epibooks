export const myNavLinks = [
  { id: 1, title: "Home", href: "/", className: "active" },
  { id: 2, title: "About", href: "#" },
  {
    id: 3,
    title: "Browse",
    href: "#",
    dropdown: true,
    dropdownItems: [
      { id: 5, title: "Horror", href: "#"},
      { id: 4, title: "Sci-Fi", href: "#"},
      { id: 6, title: "Fantasy", href: "#" },
      { id: 7, title: "History", href: "#"},
      { id: 8, title: "Romance", href: "#"},
    ],
  },
];