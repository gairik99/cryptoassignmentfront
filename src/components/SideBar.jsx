import { NavLink } from "react-router-dom";

const SideBar = () => {
    const navItems = [
        { id: 1, text: "Panel1", path: "/" },
        { id: 2, text: "Panel2", path: "/gainlose" },
    ];

    return (
        <div
            className="d-flex flex-column bg-primary vh-100 "
            style={{ width: "100px" }}
        >
            <nav className="nav flex-column">
                {navItems.map((item) => (
                    <NavLink
                        key={item.id}
                        to={item.path}
                        className={({ isActive }) =>
                            `nav-link d-flex align-items-center mb-2 ${isActive ? "active text-light fw-bold" : "text-light"
                            }`
                        }
                        style={{ textDecoration: "none" }}
                    >
                        <span>{item.text}</span>
                    </NavLink>
                ))}
            </nav>
        </div>
    );
};

export default SideBar;
