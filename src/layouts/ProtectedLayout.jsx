import { Outlet } from "react-router-dom";
import { useState } from "react";
import SideBarReduced from "../components/SideBarReduced";
import SideBarExpanded from "../components/SideBarExpanded";

const ProtectedLayout = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    const toggleSidebar = () => {
        setIsExpanded(!isExpanded);
    };
    return (
        <div className="flex">
            <div
                className={`transition-all duration-300 ease-in-out ${isExpanded ? "w-80" : "w-20"
                    }`}
            >
                {isExpanded ? (
                    <SideBarExpanded onLogoClick={toggleSidebar} />
                ) : (
                    <SideBarReduced onLogoClick={toggleSidebar} />
                )}
            </div>

            <div className="flex-1 p-4">
                <Outlet />
            </div>
        </div>
    );
};

export default ProtectedLayout;