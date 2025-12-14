import React, { useState } from 'react';
import './AdminPages.css';

// 더미 데이터
const mockUsers = [
    { id: 1, name: '김철수', email: 'kim@example.com', role: 'student', status: 'active', classes: ['React 기초반', 'Spring Boot 입문'], createdAt: '2024-01-15', lastLogin: '2024-12-13 14:30' },
    { id: 2, name: '이영희', email: 'lee@example.com', role: 'student', status: 'active', classes: ['Python 중급'], createdAt: '2024-02-20', lastLogin: '2024-12-12 09:15' },
    { id: 3, name: '박지민', email: 'park@example.com', role: 'instructor', status: 'active', classes: ['React 기초반'], createdAt: '2024-01-10', lastLogin: '2024-12-13 16:45' },
    { id: 4, name: '최수진', email: 'choi@example.com', role: 'student', status: 'inactive', classes: [], createdAt: '2024-03-05', lastLogin: '2024-11-28 11:20' },
    { id: 5, name: '정민호', email: 'jung@example.com', role: 'student', status: 'active', classes: ['Spring Boot 입문', 'Python 중급'], createdAt: '2024-02-28', lastLogin: '2024-12-13 10:00' },
];

const mockLoginLogs = [
    { id: 1, userId: 1, action: 'login', timestamp: '2024-12-13 14:30:00', ip: '192.168.1.100' },
    { id: 2, userId: 1, action: 'logout', timestamp: '2024-12-13 12:00:00', ip: '192.168.1.100' },
    { id: 3, userId: 1, action: 'login', timestamp: '2024-12-13 09:00:00', ip: '192.168.1.100' },
    { id: 4, userId: 1, action: 'logout', timestamp: '2024-12-12 18:30:00', ip: '192.168.1.105' },
    { id: 5, userId: 1, action: 'login', timestamp: '2024-12-12 14:00:00', ip: '192.168.1.105' },
];

const AdminUserPage = () => {
    const [users, setUsers] = useState(mockUsers);
    const [selectedUser, setSelectedUser] = useState(null);
    const [viewMode, setViewMode] = useState('list'); // 'list' | 'detail' | 'form'
    const [formMode, setFormMode] = useState('create'); // 'create' | 'edit'
    const [searchTerm, setSearchTerm] = useState('');
    const [filterRole, setFilterRole] = useState('all');
    const [filterStatus, setFilterStatus] = useState('all');
    const [formData, setFormData] = useState({ name: '', email: '', role: 'student', status: 'active' });
    const [showBulkUpload, setShowBulkUpload] = useState(false);

    // 필터링된 사용자 목록
    const filteredUsers = users.filter(user => {
        const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesRole = filterRole === 'all' || user.role === filterRole;
        const matchesStatus = filterStatus === 'all' || user.status === filterStatus;
        return matchesSearch && matchesRole && matchesStatus;
    });

    // 사용자 상세 보기
    const handleUserClick = (user) => {
        setSelectedUser(user);
        setViewMode('detail');
    };

    // 신규 사용자 등록 폼 열기
    const handleAddUser = () => {
        setFormMode('create');
        setFormData({ name: '', email: '', role: 'student', status: 'active' });
        setViewMode('form');
    };

    // 사용자 수정 폼 열기
    const handleEditUser = (user) => {
        setFormMode('edit');
        setFormData({ ...user });
        setViewMode('form');
    };

    // 폼 제출
    const handleSubmitForm = (e) => {
        e.preventDefault();
        if (formMode === 'create') {
            const newUser = {
                ...formData,
                id: Math.max(...users.map(u => u.id)) + 1,
                classes: [],
                createdAt: new Date().toISOString().split('T')[0],
                lastLogin: '-'
            };
            setUsers([...users, newUser]);
        } else {
            setUsers(users.map(u => u.id === formData.id ? { ...u, ...formData } : u));
        }
        setViewMode('list');
    };

    // 목록으로 돌아가기
    const handleBack = () => {
        setViewMode('list');
        setSelectedUser(null);
    };

    // 엑셀 다운로드 (시뮬레이션)
    const handleExcelDownload = () => {
        alert('사용자 목록을 엑셀 파일로 다운로드합니다.');
    };

    // 클래스 상세로 이동 (시뮬레이션)
    const handleClassClick = (className) => {
        alert(`"${className}" 클래스 상세 페이지로 이동합니다.`);
    };

    return (
        <div className="admin-page">
            {/* 헤더 */}
            <div className="page-header">
                <div className="header-left">
                    {viewMode !== 'list' && (
                        <button className="btn-back" onClick={handleBack}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M19 12H5M12 19l-7-7 7-7"/>
                            </svg>
                        </button>
                    )}
                    <h1 className="page-title">
                        {viewMode === 'list' && '사용자 관리'}
                        {viewMode === 'detail' && '사용자 상세'}
                        {viewMode === 'form' && (formMode === 'create' ? '신규 사용자 등록' : '사용자 정보 수정')}
                    </h1>
                </div>
                {viewMode === 'list' && (
                    <div className="header-actions">
                        <button className="btn-secondary" onClick={() => setShowBulkUpload(true)}>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12"/>
                            </svg>
                            엑셀 일괄 등록
                        </button>
                        <button className="btn-secondary" onClick={handleExcelDownload}>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>
                            </svg>
                            엑셀 다운로드
                        </button>
                        <button className="btn-primary" onClick={handleAddUser}>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M12 5v14M5 12h14"/>
                            </svg>
                            신규 등록
                        </button>
                    </div>
                )}
            </div>

            {/* 사용자 목록 뷰 */}
            {viewMode === 'list' && (
                <>
                    {/* 검색 및 필터 */}
                    <div className="filter-section">
                        <div className="search-box">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="11" cy="11" r="8"/>
                                <path d="M21 21l-4.35-4.35"/>
                            </svg>
                            <input
                                type="text"
                                placeholder="이름 또는 이메일로 검색..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div className="filter-group">
                            <select value={filterRole} onChange={(e) => setFilterRole(e.target.value)}>
                                <option value="all">모든 역할</option>
                                <option value="student">학생</option>
                                <option value="instructor">강사</option>
                                <option value="admin">관리자</option>
                            </select>
                            <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
                                <option value="all">모든 상태</option>
                                <option value="active">활성</option>
                                <option value="inactive">비활성</option>
                            </select>
                        </div>
                    </div>

                    {/* 사용자 테이블 */}
                    <div className="table-container">
                        <table className="data-table">
                            <thead>
                            <tr>
                                <th>이름</th>
                                <th>이메일</th>
                                <th>역할</th>
                                <th>상태</th>
                                <th>수강 클래스</th>
                                <th>가입일</th>
                                <th>최근 로그인</th>
                                <th>관리</th>
                            </tr>
                            </thead>
                            <tbody>
                            {filteredUsers.map(user => (
                                <tr key={user.id} onClick={() => handleUserClick(user)} className="clickable-row">
                                    <td className="user-name">{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>
                      <span className={`badge badge-${user.role}`}>
                        {user.role === 'student' ? '학생' : user.role === 'instructor' ? '강사' : '관리자'}
                      </span>
                                    </td>
                                    <td>
                                        <span className={`status-dot ${user.status}`}></span>
                                        {user.status === 'active' ? '활성' : '비활성'}
                                    </td>
                                    <td>{user.classes.length}개</td>
                                    <td>{user.createdAt}</td>
                                    <td>{user.lastLogin}</td>
                                    <td>
                                        <button
                                            className="btn-icon"
                                            onClick={(e) => { e.stopPropagation(); handleEditUser(user); }}
                                            title="수정"
                                        >
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                                                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                                            </svg>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                        {filteredUsers.length === 0 && (
                            <div className="empty-state">
                                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                                    <circle cx="9" cy="7" r="4"/>
                                    <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
                                </svg>
                                <p>검색 결과가 없습니다</p>
                            </div>
                        )}
                    </div>

                    {/* 페이지네이션 */}
                    <div className="pagination">
                        <span className="page-info">총 {filteredUsers.length}명</span>
                        <div className="page-buttons">
                            <button className="btn-page" disabled>이전</button>
                            <button className="btn-page active">1</button>
                            <button className="btn-page">2</button>
                            <button className="btn-page">3</button>
                            <button className="btn-page">다음</button>
                        </div>
                    </div>
                </>
            )}

            {/* 사용자 상세 뷰 */}
            {viewMode === 'detail' && selectedUser && (
                <div className="detail-view">
                    <div className="detail-grid">
                        {/* 기본 정보 카드 */}
                        <div className="detail-card">
                            <div className="card-header">
                                <h2>기본 정보</h2>
                                <button className="btn-secondary btn-sm" onClick={() => handleEditUser(selectedUser)}>
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                                    </svg>
                                    수정
                                </button>
                            </div>
                            <div className="info-grid">
                                <div className="info-item">
                                    <label>이름</label>
                                    <span>{selectedUser.name}</span>
                                </div>
                                <div className="info-item">
                                    <label>이메일</label>
                                    <span>{selectedUser.email}</span>
                                </div>
                                <div className="info-item">
                                    <label>역할</label>
                                    <span className={`badge badge-${selectedUser.role}`}>
                    {selectedUser.role === 'student' ? '학생' : selectedUser.role === 'instructor' ? '강사' : '관리자'}
                  </span>
                                </div>
                                <div className="info-item">
                                    <label>상태</label>
                                    <span className={`status-badge ${selectedUser.status}`}>
                    {selectedUser.status === 'active' ? '활성' : '비활성'}
                  </span>
                                </div>
                                <div className="info-item">
                                    <label>가입일</label>
                                    <span>{selectedUser.createdAt}</span>
                                </div>
                                <div className="info-item">
                                    <label>최근 로그인</label>
                                    <span>{selectedUser.lastLogin}</span>
                                </div>
                            </div>
                        </div>

                        {/* 수강 클래스 카드 */}
                        <div className="detail-card">
                            <div className="card-header">
                                <h2>수강 클래스</h2>
                                <span className="badge-count">{selectedUser.classes.length}개</span>
                            </div>
                            {selectedUser.classes.length > 0 ? (
                                <ul className="class-list">
                                    {selectedUser.classes.map((className, idx) => (
                                        <li key={idx} className="class-item" onClick={() => handleClassClick(className)}>
                                            <div className="class-info">
                                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
                                                    <path d="M6 12v5c3 3 9 3 12 0v-5"/>
                                                </svg>
                                                <span>{className}</span>
                                            </div>
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M9 18l6-6-6-6"/>
                                            </svg>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <div className="empty-state small">
                                    <p>수강 중인 클래스가 없습니다</p>
                                </div>
                            )}
                        </div>

                        {/* 로그인 기록 카드 */}
                        <div className="detail-card full-width">
                            <div className="card-header">
                                <h2>로그인 기록</h2>
                            </div>
                            <div className="log-table-wrapper">
                                <table className="data-table compact">
                                    <thead>
                                    <tr>
                                        <th>일시</th>
                                        <th>활동</th>
                                        <th>IP 주소</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {mockLoginLogs.filter(log => log.userId === selectedUser.id).map(log => (
                                        <tr key={log.id}>
                                            <td>{log.timestamp}</td>
                                            <td>
                          <span className={`log-action ${log.action}`}>
                            {log.action === 'login' ? '로그인' : '로그아웃'}
                          </span>
                                            </td>
                                            <td className="ip-address">{log.ip}</td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* 사용자 등록/수정 폼 */}
            {viewMode === 'form' && (
                <div className="form-view">
                    <form className="admin-form" onSubmit={handleSubmitForm}>
                        <div className="form-group">
                            <label htmlFor="name">이름 <span className="required">*</span></label>
                            <input
                                type="text"
                                id="name"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                placeholder="사용자 이름을 입력하세요"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">이메일 <span className="required">*</span></label>
                            <input
                                type="email"
                                id="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                placeholder="이메일 주소를 입력하세요"
                                required
                            />
                        </div>
                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="role">역할 <span className="required">*</span></label>
                                <select
                                    id="role"
                                    value={formData.role}
                                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                >
                                    <option value="student">학생</option>
                                    <option value="instructor">강사</option>
                                    <option value="admin">관리자</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="status">상태 <span className="required">*</span></label>
                                <select
                                    id="status"
                                    value={formData.status}
                                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                >
                                    <option value="active">활성</option>
                                    <option value="inactive">비활성</option>
                                </select>
                            </div>
                        </div>
                        <div className="form-actions">
                            <button type="button" className="btn-secondary" onClick={handleBack}>취소</button>
                            <button type="submit" className="btn-primary">
                                {formMode === 'create' ? '등록하기' : '저장하기'}
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* 엑셀 일괄 업로드 모달 */}
            {showBulkUpload && (
                <div className="modal-overlay" onClick={() => setShowBulkUpload(false)}>
                    <div className="modal" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>엑셀 일괄 등록</h2>
                            <button className="btn-close" onClick={() => setShowBulkUpload(false)}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M18 6L6 18M6 6l12 12"/>
                                </svg>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="upload-zone">
                                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12"/>
                                </svg>
                                <p>엑셀 파일을 드래그하거나 클릭하여 업로드</p>
                                <span className="upload-hint">.xlsx, .xls 파일만 지원</span>
                                <input type="file" accept=".xlsx,.xls" />
                            </div>
                            <div className="template-download">
                                <button className="btn-link">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>
                                    </svg>
                                    샘플 양식 다운로드
                                </button>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button className="btn-secondary" onClick={() => setShowBulkUpload(false)}>취소</button>
                            <button className="btn-primary">업로드</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminUserPage;