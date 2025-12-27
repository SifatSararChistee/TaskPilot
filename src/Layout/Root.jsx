import { Outlet } from "react-router";


const Root = () => {
    return (
        <div className="min-h-screen">
            {/* Optional: Add a header/navbar that appears on all pages */}
            {/* <Header /> */}
            
            <main>
                <Outlet /> {/* This renders the child routes */}
            </main>
            
            {/* Optional: Add a footer */}
            {/* <Footer /> */}
        </div>
    );
};

export default Root;