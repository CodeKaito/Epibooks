export const myNavLinks = [
    { id: 1, title: "Home", href: "#", className: "active" },
    { id: 2, title: "About", href: "#", className: "" },
    {
      id: 3,
      title: "Browse",
      href: "#",
      className: "",
      dropdown: true,
      dropdownItems: [
        { id: 5, title: "Horror", href: "#", className: "" },
        { id: 4, title: "Sci-Fi", href: "#", className: "" },
        { id: 6, title: "Fantasy", href: "#", className: "active" },
        { id: 7, title: "History", href: "#", className: "" },
        { id: 8, title: "Romance", href: "#", className: "" },
      ],
    },
  ];