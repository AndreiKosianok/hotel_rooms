import Link from "next/link";
// Here we can display basic routing/navigation or user account information,
// including buttons/menus for settings
// or logging out of the account

// Of course some of these items can be displayed in the side menu as well
// I'll add placeholders to make the page look more attractive

interface NavLink {
  href: string;
  title: string;
}

const linksList: NavLink[] = [
  {
    href: "/",
    title: "Home",
  },
  {
    href: "/",
    title: "Rooms",
  },
  {
    href: "/",
    title: "About",
  },
];

export default function Header() {
  return (
    <header className="bg-white py-5 text-center">
      <nav
        className="flex w-full items-center justify-center py-2 lg:flex-wrap lg:py-4"
        aria-label="page navigation"
      >
        <ul className="flex flex-col lg:flex-row">
          {linksList.map(link => (
            <li className="mb-4 lg:mb-0 lg:pe-2" key={link.title}>
              <Link
                className="block text-black/60 transition duration-200 hover:text-black/80 hover:ease-in-out focus:text-black/80"
                href={link.href}
              >
                {link.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
