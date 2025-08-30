import {
    LuLayoutDashboard,
    LuHandCoins,
    LuWalletMinimal,
    LuLogOut,
    LuMenu,
} from "react-icons/lu";

export const SIDE_MENU_DATA = [{
    id: "01",
    label: "Dashboard",
    icon: LuLayoutDashboard,
    path: "/dashboard",
},
{
    id: "02",
    label: "Menu",
    icon: LuMenu,
    path: "/menu",
},
{
    id: "03",
    label: "Income",
    icon: LuWalletMinimal,
    path: "/income",
},
{
    id: "04",
    label: "Expense",
    icon: LuHandCoins,
    path: "/expense",
},
{
    id: "05",
    label: "Logout",
    icon: LuLogOut,
    path: "logout",
}
];
