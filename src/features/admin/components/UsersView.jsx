import { useState } from 'react';
import styles from './UsersView.module.css';
import {
    Search,
    Plus,
    Download,
    Upload,
    Filter,
    Edit,
    Trash2,
    Eye,
    Mail,
    MoreVertical,
    X,
    Clock,
    MapPin
} from 'lucide-react';

const UsersView = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedRole, setSelectedRole] = useState('all');
    const [selectedStatus, setSelectedStatus] = useState('all');
    const [selectedPeriod, setSelectedPeriod] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    const itemsPerPage = 10;

    const users = [
        { id: 1, name: '김철수', email: 'kim@example.com', role: 'student', status: 'active', createdAt: '2024-01-15', lastLogin: '2024-01-20 14:30' },
        { id: 2, name: '이영희', email: 'lee@example.com', role: 'instructor', status: 'active', createdAt: '2024-01-14', lastLogin: '2024-01-20 09:15' },
        { id: 3, name: '박민수', email: 'park@example.com', role: 'student', status: 'inactive', createdAt: '2024-01-13', lastLogin: '2024-01-10 18:45' },
        { id: 4, name: '정수진', email: 'jung@example.com', role: 'student', status: 'active', createdAt: '2024-01-12', lastLogin: '2024-01-19 11:20' },
        { id: 5, name: '최동현', email: 'choi@example.com', role: 'instructor', status: 'active', createdAt: '2024-01-11', lastLogin: '2024-01-20 08:00' },
        { id: 6, name: '강미영', email: 'kang@example.com', role: 'student', status: 'inactive', createdAt: '2024-01-10', lastLogin: '2024-01-05 16:30' },
        { id: 7, name: '윤재호', email: 'yoon@example.com', role: 'student', status: 'active', createdAt: '2024-01-09', lastLogin: '2024-01-20 13:45' },
        { id: 8, name: '임서연', email: 'lim@example.com', role: 'instructor', status: 'active', createdAt: '2024-01-08', lastLogin: '2024-01-19 17:00' },
        { id: 9, name: '한지민', email: 'han@example.com', role: 'student', status: 'active', createdAt: '2024-01-07', lastLogin: '2024-01-18 10:30' },
        { id: 10, name: '송민호', email: 'song@example.com', role: 'student', status: 'active', createdAt: '2024-01-06', lastLogin: '2024-01-20 12:00' },
        { id: 11, name: '오세훈', email: 'oh@example.com', role: 'admin', status: 'active', createdAt: '2024-01-01', lastLogin: '2024-01-20 15:00' },
    ];

    const loginHistory = [
        { date: '2024-01-20 14:30', ip: '192.168.1.100' },
        { date: '2024-01-19 09:15', ip: '192.168.1.100' },
        { date: '2024-01-18 11:20', ip: '192.168.1.105' },
        { date: '2024-01-17 16:45', ip: '192.168.1.100' },
        { date: '2024-01-16 08:30', ip: '192.168.1.110' },
    ];

    const totalPages = Math.ceil(users.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const displayedUsers = users.slice(startIndex, startIndex + itemsPerPage);

    const getRoleLabel = (role) => {
        const labels = { student: '학생', instructor: '강사', admin: '관리자' };
        return labels[role] || role;
    };

    const getStatusLabel = (status) => {
        const labels = { active: '활성', inactive: '비활성' };
        return labels[status] || status;
    };

    const handleViewDetail = (user) => {
        setSelectedUser(user);
        setShowDetailModal(true);
    };

    return (
        <div className={styles.usersView}>
            <header className={styles.header}>
                <div className={styles.headerLeft}>
                    <h1 className={styles.title}>사용자 관리</h1>
                    <p className={styles.subtitle}>총 {users.length}명의 사용자</p>
                </div>
                <div className={styles.headerActions}>
                    <button className={styles.secondaryBtn}>
                        <Upload />
                        <span>CSV 업로드</span>
                    </button>
                    <button className={styles.secondaryBtn}>
                        <Download />
                        <span>엑셀 다운로드</span>
                    </button>
                    <button className={styles.primaryBtn} onClick={() => setShowCreateModal(true)}>
                        <Plus />
                        <span>강사 계정 생성</span>
                    </button>
                </div>
            </header>

            <div className={styles.toolbar}>
                <div className={styles.searchBox}>
                    <Search className={styles.searchIcon} />
                    <input
                        type="text"
                        placeholder="이메일, 이름으로 검색..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className={styles.searchInput}
                    />
                </div>

                <div className={styles.filters}>
                    <select
                        value={selectedRole}
                        onChange={(e) => setSelectedRole(e.target.value)}
                        className={styles.filterSelect}
                    >
                        <option value="all">모든 역할</option>
                        <option value="student">학생</option>
                        <option value="instructor">강사</option>
                        <option value="admin">관리자</option>
                    </select>

                    <select
                        value={selectedStatus}
                        onChange={(e) => setSelectedStatus(e.target.value)}
                        className={styles.filterSelect}
                    >
                        <option value="all">모든 상태</option>
                        <option value="active">활성</option>
                        <option value="inactive">비활성</option>
                    </select>

                    <select
                        value={selectedPeriod}
                        onChange={(e) => setSelectedPeriod(e.target.value)}
                        className={styles.filterSelect}
                    >
                        <option value="all">전체 기간</option>
                        <option value="week">최근 1주일</option>
                        <option value="month">최근 1개월</option>
                    </select>
                </div>
            </div>

            <div className={styles.tableCard}>
                <table className={styles.table}>
                    <thead>
                    <tr>
                        <th>
                            <input type="checkbox" className={styles.checkbox} />
                        </th>
                        <th>사용자</th>
                        <th>역할</th>
                        <th>상태</th>
                        <th>가입일</th>
                        <th>마지막 로그인</th>
                        <th>작업</th>
                    </tr>
                    </thead>
                    <tbody>
                    {displayedUsers.map((user) => (
                        <tr key={user.id}>
                            <td>
                                <input type="checkbox" className={styles.checkbox} />
                            </td>
                            <td>
                                <div className={styles.userCell}>
                                    <div className={`${styles.avatar} ${styles[user.role]}`}>
                                        {user.name.charAt(0)}
                                    </div>
                                    <div className={styles.userInfo}>
                                        <span className={styles.userName}>{user.name}</span>
                                        <span className={styles.userEmail}>{user.email}</span>
                                    </div>
                                </div>
                            </td>
                            <td>
                  <span className={`${styles.roleBadge} ${styles[user.role]}`}>
                    {getRoleLabel(user.role)}
                  </span>
                            </td>
                            <td>
                  <span className={`${styles.statusBadge} ${styles[user.status]}`}>
                    {getStatusLabel(user.status)}
                  </span>
                            </td>
                            <td className={styles.dateCell}>{user.createdAt}</td>
                            <td className={styles.dateCell}>{user.lastLogin}</td>
                            <td>
                                <div className={styles.actions}>
                                    <button
                                        className={styles.actionBtn}
                                        title="상세보기"
                                        onClick={() => handleViewDetail(user)}
                                    >
                                        <Eye />
                                    </button>
                                    <button className={styles.actionBtn} title="수정">
                                        <Edit />
                                    </button>
                                    <button className={`${styles.actionBtn} ${styles.danger}`} title="삭제">
                                        <Trash2 />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            <div className={styles.pagination}>
        <span className={styles.paginationInfo}>
          {startIndex + 1}-{Math.min(startIndex + itemsPerPage, users.length)} / 전체 {users.length}명
        </span>
                <div className={styles.paginationBtns}>
                    <button
                        className={styles.pageBtn}
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(prev => prev - 1)}
                    >
                        이전
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <button
                            key={page}
                            className={`${styles.pageBtn} ${currentPage === page ? styles.active : ''}`}
                            onClick={() => setCurrentPage(page)}
                        >
                            {page}
                        </button>
                    ))}
                    <button
                        className={styles.pageBtn}
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage(prev => prev + 1)}
                    >
                        다음
                    </button>
                </div>
            </div>

            {/* 강사 계정 생성 모달 */}
            {showCreateModal && (
                <div className={styles.modalOverlay} onClick={() => setShowCreateModal(false)}>
                    <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                        <div className={styles.modalHeader}>
                            <h2 className={styles.modalTitle}>강사 계정 생성</h2>
                            <button className={styles.modalClose} onClick={() => setShowCreateModal(false)}>
                                <X />
                            </button>
                        </div>
                        <div className={styles.modalBody}>
                            <div className={styles.formGroup}>
                                <label className={styles.formLabel}>이름 *</label>
                                <input type="text" className={styles.formInput} placeholder="이름을 입력하세요" />
                            </div>
                            <div className={styles.formGroup}>
                                <label className={styles.formLabel}>이메일 *</label>
                                <input type="email" className={styles.formInput} placeholder="이메일을 입력하세요" />
                            </div>
                            <div className={styles.formNotice}>
                                <Mail className={styles.noticeIcon} />
                                <span>생성된 계정 정보와 임시 비밀번호가 입력한 이메일로 발송됩니다.</span>
                            </div>
                        </div>
                        <div className={styles.modalFooter}>
                            <button className={styles.cancelBtn} onClick={() => setShowCreateModal(false)}>
                                취소
                            </button>
                            <button className={styles.submitBtn}>
                                계정 생성 및 이메일 발송
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* 사용자 상세 정보 모달 */}
            {showDetailModal && selectedUser && (
                <div className={styles.modalOverlay} onClick={() => setShowDetailModal(false)}>
                    <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                        <div className={styles.modalHeader}>
                            <h2 className={styles.modalTitle}>사용자 상세 정보</h2>
                            <button className={styles.modalClose} onClick={() => setShowDetailModal(false)}>
                                <X />
                            </button>
                        </div>
                        <div className={styles.modalBody}>
                            <div className={styles.detailProfile}>
                                <div className={`${styles.detailAvatar} ${styles[selectedUser.role]}`}>
                                    {selectedUser.name.charAt(0)}
                                </div>
                                <div className={styles.detailInfo}>
                                    <h3 className={styles.detailName}>{selectedUser.name}</h3>
                                    <p className={styles.detailEmail}>{selectedUser.email}</p>
                                    <div className={styles.detailBadges}>
                    <span className={`${styles.roleBadge} ${styles[selectedUser.role]}`}>
                      {getRoleLabel(selectedUser.role)}
                    </span>
                                        <span className={`${styles.statusBadge} ${styles[selectedUser.status]}`}>
                      {getStatusLabel(selectedUser.status)}
                    </span>
                                    </div>
                                </div>
                            </div>

                            <div className={styles.detailSection}>
                                <h4 className={styles.sectionTitle}>계정 정보</h4>
                                <div className={styles.detailGrid}>
                                    <div className={styles.detailItem}>
                                        <span className={styles.detailLabel}>가입일</span>
                                        <span className={styles.detailValue}>{selectedUser.createdAt}</span>
                                    </div>
                                    <div className={styles.detailItem}>
                                        <span className={styles.detailLabel}>마지막 로그인</span>
                                        <span className={styles.detailValue}>{selectedUser.lastLogin}</span>
                                    </div>
                                </div>
                            </div>

                            <div className={styles.detailSection}>
                                <h4 className={styles.sectionTitle}>최근 로그인 기록 (최근 5회)</h4>
                                <div className={styles.loginHistoryList}>
                                    {loginHistory.map((log, index) => (
                                        <div key={index} className={styles.loginHistoryItem}>
                                            <div className={styles.historyInfo}>
                                                <Clock className={styles.historyIcon} />
                                                <span>{log.date}</span>
                                            </div>
                                            <div className={styles.historyInfo}>
                                                <MapPin className={styles.historyIcon} />
                                                <span>{log.ip}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className={styles.modalFooter}>
                            <button className={styles.cancelBtn} onClick={() => setShowDetailModal(false)}>
                                닫기
                            </button>
                            <button className={styles.dangerBtn}>
                                <Trash2 />
                                계정 삭제
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UsersView;