import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import * as Avatar from '@radix-ui/react-avatar';
import Logo from "./Logo";
import PropTypes from "prop-types";
import { useAuth } from '../context/AuthContext';
import { Link } from "react-router-dom";

const Sidebar = ({ onLogoClick }) => {
    const { user, logout } = useAuth();
    console.log(user);
    const navigation = [
        {
            href: "/add-case",
            name: "Agregar casos",
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 6.878V6a2.25 2.25 0 012.25-2.25h7.5A2.25 2.25 0 0118 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 004.5 9v.878m13.5-3A2.25 2.25 0 0119.5 9v.878m0 0a2.246 2.246 0 00-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0121 12v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6c0-.98.626-1.813 1.5-2.122"
                    />
                </svg>
            ),
        },
        {
            href: "/cases",
            name: "Casos",
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"
                    />
                </svg>
            ),
        },
    ];

    const navsFooter = [
        {
            href: user.fiscal_id ? `/profile/${user.fiscal_id}`: user.user?.fiscal?.id ? `/profile/${user.user.fiscal.id}` : '/profile',
            name: "Perfil",
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"
                    />
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                </svg>
            ),
        },
    ];

    return (
        <>
            <nav className="fixed top-0 left-0 w-20 h-full border-r bg-white space-y-8">
                <div className="flex flex-col h-full">
                    <button onClick={onLogoClick} className="px-2 mt-4 mb-4">
                        <Logo size="small" />
                    </button>
                    <div className="flex-1 flex flex-col h-full">
                        <ul className="px-4 text-sm font-medium flex-1">
                            {navigation.map((item, idx) => (
                                <li key={idx}>
                                    <a
                                        href={item.href}
                                        className="relative flex items-center justify-center gap-x-2 text-gray-600 p-2 rounded-lg  hover:bg-gray-50 active:bg-gray-100 duration-150 group"
                                    >
                                        <div className="text-gray-500">{item.icon}</div>
                                        <span className="absolute left-14 p-1 px-1.5 rounded-md whitespace-nowrap text-xs text-white bg-gray-800 hidden group-hover:inline-block group-focus:hidden duration-150">
                                            {item.name}
                                        </span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                        <div>
                            <ul className="px-4 pb-4 text-sm font-medium">
                                {navsFooter.map((item, idx) => (
                                    <li key={idx}>
                                        <a
                                            href={item.href}
                                            className="relative flex items-center justify-center gap-x-2 text-gray-600 p-2 rounded-lg  hover:bg-gray-50 active:bg-gray-100 duration-150 group"
                                        >
                                            <div className="text-gray-500">{item.icon}</div>
                                            <span className="absolute left-14 p-1 px-1.5 rounded-md whitespace-nowrap text-xs text-white bg-gray-800 hidden group-hover:inline-block group-focus:hidden duration-150">
                                                {item.name}
                                            </span>
                                        </a>
                                    </li>
                                ))}
                            </ul>
                            <div className="relative py-4 px-4 border-t">
                                <DropdownMenu.Root>
                                    <DropdownMenu.Trigger className="outline-none">
                                        <Avatar.Root>
                                            <Avatar.Image
                                                className="w-12 h-12 flex items-center gap-x-4 cursor-pointer rounded-full ring-offset-2 ring-gray-800 focus:ring-2 duration-150"
                                                src="https://xsgames.co/randomusers/assets/avatars/pixel/10.jpg"
                                                alt="vienna"
                                            />
                                            <Avatar.Fallback
                                                className="flex w-12 h-12 rounded-full items-center justify-center text-white text-sm font-medium bg-gradient-to-r from-teal-400 to-blue-500"
                                                delayMs={600}
                                            >
                                                VI
                                            </Avatar.Fallback>
                                        </Avatar.Root>
                                    </DropdownMenu.Trigger>

                                    <DropdownMenu.Portal>
                                        <DropdownMenu.Content className="absolute bottom-4 left-10 w-64 rounded-lg bg-white shadow-md border text-sm text-gray-600 p-2">
                                            <span className="block text-gray-500/80 p-2">
                                                {user.email}
                                            </span>
                                            <span className="block text-gray-500/80 p-2">
                                                {user.role}
                                            </span>
                                            <DropdownMenu.Item asChild className="outline-none">
                                                <Link to="/" onClick={() => logout()} className="block w-full p-2 text-left rounded-md hover:bg-gray-50 active:bg-gray-100 duration-150">
                                                    Salir
                                                </Link>
                                            </DropdownMenu.Item>
                                        </DropdownMenu.Content>
                                    </DropdownMenu.Portal>
                                </DropdownMenu.Root>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
};

Sidebar.propTypes = {
    onLogoClick: PropTypes.func.isRequired, // Requiere que onLogoClick sea una función
};

export default Sidebar;