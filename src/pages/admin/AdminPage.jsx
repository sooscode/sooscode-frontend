import { useState } from 'react';
import styles from './AdminPage.module.css';
import DashboardView from "@/features/admin/components/DashboardView.jsx";
import UsersView from "@/features/admin/components/UsersView.jsx";
import ClassroomView from "@/features/admin/components/ClassroomsView.jsx";
import AdminSidebar from "@/features/admin/components/AdminSidebar.jsx";
import ClassesView from "@/features/admin/components/ClassesView.jsx";

const AdminPage = () => {
    const [activeMenu, setActiveMenu] = useState('dashboard');
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

    const renderView = () => {
        switch (activeMenu) {
            case 'dashboard':
                return <DashboardView />;
            case 'users':
                return <UsersView />;
            case 'classes':
                return <ClassesView />;
            case 'classes2':
                return <ClassroomView />;
            default:
                return <DashboardView />;
        }
    };

    return (
        <div className={styles.adminPage}>
            <AdminSidebar
                activeMenu={activeMenu}
                onMenuChange={setActiveMenu}
                collapsed={sidebarCollapsed}
                onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
            />
            <main className={`${styles.mainContent} ${sidebarCollapsed ? styles.expanded : ''}`}>
                {renderView()}
            </main>
        </div>
    );
};

export default AdminPage;