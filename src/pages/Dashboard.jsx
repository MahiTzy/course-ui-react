import { useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Dashboard = () => {

    useEffect(() => {
        const toggleSidebar = () => {
            document.body.classList.toggle('toggle-sidebar');
        };

        const toggleButton = document.querySelector('.toggle-sidebar-btn');
        if (toggleButton) {
            toggleButton.addEventListener('click', toggleSidebar);
        }

        // Cleanup event listener on component unmount
        return () => {
            if (toggleButton) {
                toggleButton.removeEventListener('click', toggleSidebar);
            }
        };
    }, []);

    return (
        <>
            <header id="header" className="header fixed-top d-flex align-items-center">
                <div className="d-flex align-items-center justify-content-between">
                    <div className="logo d-flex align-items-center">
                        <span className="d-none d-lg-block">Course Management</span>
                    </div>
                    <i className="bi bi-list toggle-sidebar-btn"></i>
                </div>

                <nav className="header-nav ms-auto">
                    <ul className="d-flex align-items-center">
                        <li className="nav-item dropdown pe-3">
                            <a className="nav-link nav-profile d-flex align-items-center pe-0" href="#" data-bs-toggle="dropdown">
                                <img src="src/assets/img/profile.jpg" alt="Profile" className="rounded-circle" />
                                <span className="d-none d-md-block dropdown-toggle ps-2">Mohit</span>
                            </a>
                            <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
                                <li className="dropdown-header">
                                    <h6>Mohit Singh</h6>
                                    <span>Admin</span>
                                </li>
                                <li>
                                    <hr className="dropdown-divider" />
                                </li>
                                
                                <li>
                                    <a className="dropdown-item d-flex align-items-center" href="#">
                                        <i className="bi bi-box-arrow-right"></i>
                                        <span>Sign Out</span>
                                    </a>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </nav>
            </header>

            <aside id="sidebar" className="sidebar">
                <ul className="sidebar-nav" id="sidebar-nav">
                    <li className="nav-item">
                        <Link to={""} className="nav-link collapsed" href="#!">
                            <i className="bi bi-grid"></i>
                            <span>Dashboard</span>
                        </Link>
                    </li>

                    <li className="nav-heading">Pages</li>

                    <li className="nav-item">
                        <Link to={"courses"} className="nav-link collapsed" href="#">
                            <i className="bi bi-menu-button-wide"></i><span>Courses</span>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to={"add-course"} className="nav-link collapsed" href="#">
                        <i className="bi bi-database-add"></i><span>Add New Course</span>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to={"instances"} className="nav-link collapsed" href="#">
                            <i className="bi bi-boxes"></i><span>Instances</span>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to={"add-new-instances"} className="nav-link collapsed" href="#">
                        <i className="bi bi-file-earmark-plus"></i><span>Add New Instance</span>
                        </Link>
                    </li>
                </ul>
            </aside>
            <ToastContainer
                position="bottom-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss={false}
                draggable
                pauseOnHover={false}
                theme="dark"
            />

            <main id="main" className="main">

                <section className="section">
                    <div className="row">
                        <Outlet />
                    </div>
                </section>

            </main>
        </>
    )
}

export default Dashboard
