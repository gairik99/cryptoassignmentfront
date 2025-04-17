import { NavLink } from "react-router-dom";

const MobileNavBar = () => {
    const navItems = [
        { id: 1, text: "Crypto", path: "/" },
        { id: 2, text: "GainLose", path: "/gainlose" },
    ];

    return (
        <div className="position-fixed bottom-0 start-50 translate-middle-x mb-4 px-3" style={{ width: "90vw" }}>
            <nav className="bg-primary rounded-3 shadow d-flex justify-content-around py-2">
                {navItems.map((item) => (
                    <NavLink
                        key={item.id}
                        to={item.path}
                        className={({ isActive }) =>
                            `text-decoration-none ${isActive ? "fw-bold text-light" : "text-light"}`
                        }
                    >
                        {item.text}
                    </NavLink>
                ))}
            </nav>
        </div>
    );
};

export default MobileNavBar;
