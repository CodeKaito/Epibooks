export const myNavLinks = [
    { id: 1, title: "Home", href: "/", className: "active" },
    { id: 2, title: "About", href: "#", className: "" },
    {
      id: 3,
      title: "Browse",
      href: "#",
      dropdown: true,
      dropdownItems: [
        { id: 5, title: "Horror", href: "#", className: "active" },
        { id: 4, title: "Sci-Fi", href: "#", className: "" },
        { id: 6, title: "Fantasy", href: "#", className: "" },
        { id: 7, title: "History", href: "#", className: "" },
        { id: 8, title: "Romance", href: "#", className: "" },
      ],
    },
  ];