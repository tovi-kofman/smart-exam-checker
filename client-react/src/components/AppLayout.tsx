import { Outlet } from "react-router";
import NavBar from "./NavBar";

const AppLayout = () => {
    return (
        <>
            <NavBar />
            <div style={{ marginTop: "80px", padding: "20px" }}>
                <Outlet />
            </div>
            {/* <Footer /> */}
        </>
    );
};

export default AppLayout;
