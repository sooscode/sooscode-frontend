import React, { useState, useMemo } from 'react';
import Pagination from './Pagination';
import './AdminPages.css';

// 더미 데이터
const mockClasses = [
    {
        id: 1,
        name: 'React 기초반',
        instructor: '박지민',
        description: 'React의 기본 개념부터 Hooks까지 배우는 입문 과정입니다.',
        schedule: '월/수 19:00-21:00',
        startDate: '2024-01-15',
        endDate: '2024-03-15',
        status: 'active',
        maxStudents: 30,
        currentStudents: 25,
        category: 'frontend'
    },
    {
        id: 2,
        name: 'Spring Boot 입문',
        instructor: '이강사',
        description: 'Spring Boot를 활용한 백엔드 개발 입문 과정입니다.',
        schedule: '화/목 19:00-21:00',
        startDate: '2024-02-01',
        endDate: '2024-04-01',
        status: 'active',
        maxStudents: 25,
        currentStudents: 20,
        category: 'backend'
    },
    {
        id: 3,
        name: 'Python 중급',
        instructor: '김강사',
        description: 'Python 심화 학습과 실무 프로젝트를 진행하는 중급 과정입니다.',
        schedule: '토 10:00-13:00',
        startDate: '2024-03-01',
        endDate: '2024-05-01',
        status: 'active',
        maxStudents: 20,
        currentStudents: 18,
        category: 'backend'
    },
    {
        id: 4,
        name: 'JavaScript ES6+',
        instructor: '정강사',
        description: 'ES6 이후의 모던 자바스크립트 문법을 학습합니다.',
        schedule: '금 19:00-22:00',
        startDate: '2024-01-10',
        endDate: '2024-02-28',
        status: 'completed',
        maxStudents: 30,
        currentStudents: 28,
        category: 'frontend'
    },
    {
        id: 5,
        name: 'Vue.js 실전',
        instructor: '최강사',
        description: 'Vue.js를 활용한 실전 프로젝트 개발 과정입니다.',
        schedule: '월/금 14:00-16:00',
        startDate: '2024-04-01',
        endDate: '2024-06-01',
        status: 'upcoming',
        maxStudents: 25,
        currentStudents: 12,
        category: 'frontend'
    },
    {
        id: 6,
        name: 'Node.js 백엔드',
        instructor: '한강사',
        description: 'Node.js와 Express를 활용한 백엔드 개발 과정입니다.',
        schedule: '화/목 10:00-12:00',
        startDate: '2024-03-15',
        endDate: '2024-05-15',
        status: 'active',
        maxStudents: 20,
        currentStudents: 15,
        category: 'backend'
    },
];

const mockClassStudents = [
    { id: 1, name: '김철수', email: 'kim@example.com', enrolledAt: '2024-01-15', progress: 75, lastAccess: '2024-12-13' },
    { id: 2, name: '정민호', email: 'jung@example.com', enrolledAt: '2024-01-16', progress: 82, lastAccess: '2024-12-13' },
    { id: 3, name: '홍길동', email: 'hong@example.com', enrolledAt: '2024-01-17', progress: 60, lastAccess: '2024-12-12' },
    { id: 4, name: '이민수', email: 'leemin@example.com', enrolledAt: '2024-01-18', progress: 90, lastAccess: '2024-12-13' },
    { id: 5, name: '강예진', email: 'kang@example.com', enrolledAt: '2024-01-20', progress: 45, lastAccess: '2024-12-10' },
    { id: 6, name: '박서연', email: 'parksy@example.com', enrolledAt: '2024-01-21', progress: 55, lastAccess: '2024-12-11' },
    { id: 7, name: '최현우', email: 'choihw@example.com', enrolledAt: '2024-01-22', progress: 70, lastAccess: '2024-12-13' },
    { id: 8, name: '임지은', email: 'limje@example.com', enrolledAt: '2024-01-23', progress: 88, lastAccess: '2024-12-12' },
];

const mockAllStudents = [
    { id: 9, name: '윤도현', email: 'yoondh@example.com' },
    { id: 10, name: '정현영', email: 'jungh@example.com' },
    { id: 11, name: '정지영', email: 'jungj@example.com' },
    { id: 12, name: '고상주', email: 'kosj@example.com' },
    { id: 13, name: '박보현', email: 'parkbh@example.com' },
    { id: 14, name: '박보영', email: 'parkby@example.com' },
    { id: 15, name: '윤석우', email: 'yoonsw@example.com' },
    { id: 16, name: '김조당', email: 'kimjd@example.com' },
];

// 페이지당 아이템 수 설정
const CLASSES_PER_PAGE = 4;
const STUDENTS_PER_PAGE = 5;

const ClassManagement = () => {
    const [classes, setClasses] = useState(mockClasses);
    const [selectedClass, setSelectedClass] = useState(null);
    const [classStudents, setClassStudents] = useState(mockClassStudents);
    const [viewMode, setViewMode] = useState('list'); // 'list' | 'detail' | 'form'
    const [formMode, setFormMode] = useState('create'); // 'create' | 'edit'
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [filterCategory, setFilterCategory] = useState('all');
    const [formData, setFormData] = useState({
        name: '', instructor: '', description: '', schedule: '',
        startDate: '', endDate: '', status: 'active', maxStudents: 30, category: 'frontend'
    });
    const [showAddStudent, setShowAddStudent] = useState(false);
    const [studentSearchTerm, setStudentSearchTerm] = useState('');
    const [selectedStudentsToAdd, setSelectedStudentsToAdd] = useState([]);

    // 페이지네이션 상태
    const [classPage, setClassPage] = useState(0);
    const [studentPage, setStudentPage] = useState(0);

    // 필터링된 클래스 목록
    const filteredClasses = useMemo(() => {
        return classes.filter(cls => {
            const matchesSearch = cls.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                cls.instructor.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesStatus = filterStatus === 'all' || cls.status === filterStatus;
            const matchesCategory = filterCategory === 'all' || cls.category === filterCategory;
            return matchesSearch && matchesStatus && matchesCategory;
        });
    }, [classes, searchTerm, filterStatus, filterCategory]);

    // 페이지네이션 적용된 클래스 목록
    const paginatedClasses = useMemo(() => {
        const startIndex = classPage * CLASSES_PER_PAGE;
        return filteredClasses.slice(startIndex, startIndex + CLASSES_PER_PAGE);
    }, [filteredClasses, classPage]);

    const totalClassPages = Math.ceil(filteredClasses.length / CLASSES_PER_PAGE);

    // 페이지네이션 적용된 수강생 목록
    const paginatedStudents = useMemo(() => {
        const startIndex = studentPage * STUDENTS_PER_PAGE;
        return classStudents.slice(startIndex, startIndex + STUDENTS_PER_PAGE);
    }, [classStudents, studentPage]);

    const totalStudentPages = Math.ceil(classStudents.length / STUDENTS_PER_PAGE);

    // 필터 변경 시 페이지 초기화
    const handleSearchChange = (value) => {
        setSearchTerm(value);
        setClassPage(0);
    };

    const handleFilterStatusChange = (value) => {
        setFilterStatus(value);
        setClassPage(0);
    };

    const handleFilterCategoryChange = (value) => {
        setFilterCategory(value);
        setClassPage(0);
    };

    // 클래스 상세 보기
    const handleClassClick = (cls) => {
        setSelectedClass(cls);
        setStudentPage(0); // 수강생 페이지 초기화
        setViewMode('detail');
    };

    // 신규 클래스 등록 폼 열기
    const handleAddClass = () => {
        setFormMode('create');
        setFormData({
            name: '', instructor: '', description: '', schedule: '',
            startDate: '', endDate: '', status: 'active', maxStudents: 30, category: 'frontend'
        });
        setViewMode('form');
    };

    // 클래스 수정 폼 열기
    const handleEditClass = (cls) => {
        setFormMode('edit');
        setFormData({ ...cls });
        setViewMode('form');
    };

    // 폼 제출
    const handleSubmitForm = (e) => {
        e.preventDefault();
        if (formMode === 'create') {
            const newClass = {
                ...formData,
                id: Math.max(...classes.map(c => c.id)) + 1,
                currentStudents: 0
            };
            setClasses([...classes, newClass]);
        } else {
            setClasses(classes.map(c => c.id === formData.id ? { ...c, ...formData } : c));
            if (selectedClass && selectedClass.id === formData.id) {
                setSelectedClass({ ...selectedClass, ...formData });
            }
        }
        setViewMode('list');
    };

    // 목록으로 돌아가기
    const handleBack = () => {
        setViewMode('list');
        setSelectedClass(null);
    };

    // 엑셀 다운로드 (시뮬레이션)
    const handleExcelDownload = () => {
        alert('클래스 목록을 엑셀 파일로 다운로드합니다.');
    };

    // 학생 추가 모달 열기
    const handleOpenAddStudent = () => {
        setShowAddStudent(true);
        setStudentSearchTerm('');
        setSelectedStudentsToAdd([]);
    };

    // 학생 선택 토글
    const toggleStudentSelection = (studentId) => {
        setSelectedStudentsToAdd(prev =>
            prev.includes(studentId)
                ? prev.filter(id => id !== studentId)
                : [...prev, studentId]
        );
    };

    // 학생 추가 확정
    const handleConfirmAddStudents = () => {
        const newStudents = mockAllStudents
            .filter(s => selectedStudentsToAdd.includes(s.id))
            .map(s => ({
                ...s,
                enrolledAt: new Date().toISOString().split('T')[0],
                progress: 0,
                lastAccess: '-'
            }));
        setClassStudents([...classStudents, ...newStudents]);
        setShowAddStudent(false);
        // 마지막 페이지로 이동 (새 학생 확인 가능하도록)
        const newTotalPages = Math.ceil((classStudents.length + newStudents.length) / STUDENTS_PER_PAGE);
        setStudentPage(newTotalPages - 1);
    };

    // 학생 삭제
    const handleRemoveStudent = (studentId) => {
        if (window.confirm('정말 이 학생을 클래스에서 제외하시겠습니까?')) {
            const newStudents = classStudents.filter(s => s.id !== studentId);
            setClassStudents(newStudents);
            // 현재 페이지가 유효한지 확인
            const newTotalPages = Math.ceil(newStudents.length / STUDENTS_PER_PAGE);
            if (studentPage >= newTotalPages && newTotalPages > 0) {
                setStudentPage(newTotalPages - 1);
            }
        }
    };

    // 사용자 상세로 이동 (시뮬레이션)
    const handleStudentClick = (student) => {
        alert(`"${student.name}" 사용자 상세 페이지로 이동합니다.`);
    };

    // 추가 가능한 학생 필터링
    const availableStudents = mockAllStudents.filter(s =>
        !classStudents.find(cs => cs.id === s.id) &&
        (s.name.toLowerCase().includes(studentSearchTerm.toLowerCase()) ||
            s.email.toLowerCase().includes(studentSearchTerm.toLowerCase()))
    );

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
                        {viewMode === 'list' && '클래스 관리'}
                        {viewMode === 'detail' && '클래스 상세'}
                        {viewMode === 'form' && (formMode === 'create' ? '신규 클래스 등록' : '클래스 정보 수정')}
                    </h1>
                </div>
                {viewMode === 'list' && (
                    <div className="header-actions">
                        <button className="btn-secondary" onClick={handleExcelDownload}>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>
                            </svg>
                            엑셀 다운로드
                        </button>
                        <button className="btn-primary" onClick={handleAddClass}>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M12 5v14M5 12h14"/>
                            </svg>
                            신규 등록
                        </button>
                    </div>
                )}
                {viewMode === 'detail' && (
                    <div className="header-actions">
                        <button className="btn-secondary" onClick={() => handleEditClass(selectedClass)}>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                            </svg>
                            클래스 수정
                        </button>
                    </div>
                )}
            </div>

            {/* 클래스 목록 뷰 */}
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
                                placeholder="클래스명 또는 강사명으로 검색..."
                                value={searchTerm}
                                onChange={(e) => handleSearchChange(e.target.value)}
                            />
                        </div>
                        <div className="filter-group">
                            <select value={filterCategory} onChange={(e) => handleFilterCategoryChange(e.target.value)}>
                                <option value="all">모든 카테고리</option>
                                <option value="frontend">프론트엔드</option>
                                <option value="backend">백엔드</option>
                                <option value="fullstack">풀스택</option>
                                <option value="devops">DevOps</option>
                            </select>
                            <select value={filterStatus} onChange={(e) => handleFilterStatusChange(e.target.value)}>
                                <option value="all">모든 상태</option>
                                <option value="active">진행중</option>
                                <option value="upcoming">예정</option>
                                <option value="completed">완료</option>
                            </select>
                        </div>
                    </div>

                    {/* 결과 요약 */}
                    <div className="result-summary">
                        <span className="total-count">총 {filteredClasses.length}개 클래스</span>
                    </div>

                    {/* 클래스 카드 그리드 */}
                    <div className="class-grid">
                        {paginatedClasses.map(cls => (
                            <div key={cls.id} className="class-card" onClick={() => handleClassClick(cls)}>
                                <div className="class-card-header">
                                    <span className={`category-badge ${cls.category}`}>
                                        {cls.category === 'frontend' ? '프론트엔드' :
                                            cls.category === 'backend' ? '백엔드' :
                                                cls.category === 'fullstack' ? '풀스택' : 'DevOps'}
                                    </span>
                                    <span className={`status-badge ${cls.status}`}>
                                        {cls.status === 'active' ? '진행중' :
                                            cls.status === 'upcoming' ? '예정' : '완료'}
                                    </span>
                                </div>
                                <h3 className="class-card-title">{cls.name}</h3>
                                <p className="class-card-instructor">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                                        <circle cx="12" cy="7" r="4"/>
                                    </svg>
                                    {cls.instructor}
                                </p>
                                <p className="class-card-schedule">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                                        <line x1="16" y1="2" x2="16" y2="6"/>
                                        <line x1="8" y1="2" x2="8" y2="6"/>
                                        <line x1="3" y1="10" x2="21" y2="10"/>
                                    </svg>
                                    {cls.schedule}
                                </p>
                                <div className="class-card-footer">
                                    <div className="student-count">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                                            <circle cx="9" cy="7" r="4"/>
                                            <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
                                        </svg>
                                        <span>{cls.currentStudents}/{cls.maxStudents}명</span>
                                    </div>
                                    <div className="capacity-bar">
                                        <div
                                            className="capacity-fill"
                                            style={{ width: `${(cls.currentStudents / cls.maxStudents) * 100}%` }}
                                        ></div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {filteredClasses.length === 0 && (
                        <div className="empty-state">
                            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
                                <path d="M6 12v5c3 3 9 3 12 0v-5"/>
                            </svg>
                            <p>검색 결과가 없습니다</p>
                        </div>
                    )}

                    {/* 클래스 목록 페이지네이션 */}
                    <Pagination
                        currentPage={classPage}
                        totalPages={totalClassPages}
                        onPageChange={setClassPage}
                    />
                </>
            )}

            {/* 클래스 상세 뷰 */}
            {viewMode === 'detail' && selectedClass && (
                <div className="detail-view">
                    <div className="detail-grid class-detail">
                        {/* 클래스 정보 카드 */}
                        <div className="detail-card">
                            <div className="card-header">
                                <h2>클래스 정보</h2>
                                <span className={`status-badge ${selectedClass.status}`}>
                                    {selectedClass.status === 'active' ? '진행중' :
                                        selectedClass.status === 'upcoming' ? '예정' : '완료'}
                                </span>
                            </div>
                            <div className="class-info-content">
                                <h3 className="class-detail-title">{selectedClass.name}</h3>
                                <p className="class-description">{selectedClass.description}</p>
                                <div className="info-grid">
                                    <div className="info-item">
                                        <label>담당 강사</label>
                                        <span>{selectedClass.instructor}</span>
                                    </div>
                                    <div className="info-item">
                                        <label>카테고리</label>
                                        <span className={`category-badge ${selectedClass.category}`}>
                                            {selectedClass.category === 'frontend' ? '프론트엔드' :
                                                selectedClass.category === 'backend' ? '백엔드' :
                                                    selectedClass.category === 'fullstack' ? '풀스택' : 'DevOps'}
                                        </span>
                                    </div>
                                    <div className="info-item">
                                        <label>수업 일정</label>
                                        <span>{selectedClass.schedule}</span>
                                    </div>
                                    <div className="info-item">
                                        <label>수업 기간</label>
                                        <span>{selectedClass.startDate} ~ {selectedClass.endDate}</span>
                                    </div>
                                    <div className="info-item">
                                        <label>정원</label>
                                        <span>{selectedClass.currentStudents} / {selectedClass.maxStudents}명</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 수강생 목록 카드 */}
                        <div className="detail-card full-width">
                            <div className="card-header">
                                <h2>수강생 목록</h2>
                                <div className="card-header-actions">
                                    <span className="badge-count">{classStudents.length}명</span>
                                    <button className="btn-primary btn-sm" onClick={handleOpenAddStudent}>
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M12 5v14M5 12h14"/>
                                        </svg>
                                        학생 추가
                                    </button>
                                </div>
                            </div>
                            <div className="table-container">
                                <table className="data-table">
                                    <thead>
                                    <tr>
                                        <th>이름</th>
                                        <th>이메일</th>
                                        <th>등록일</th>
                                        <th>진도율</th>
                                        <th>최근 접속</th>
                                        <th>관리</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {paginatedStudents.map(student => (
                                        <tr key={student.id}>
                                            <td
                                                className="user-name clickable"
                                                onClick={() => handleStudentClick(student)}
                                            >
                                                {student.name}
                                            </td>
                                            <td>{student.email}</td>
                                            <td>{student.enrolledAt}</td>
                                            <td>
                                                <div className="progress-cell">
                                                    <div className="progress-bar">
                                                        <div
                                                            className="progress-fill"
                                                            style={{ width: `${student.progress}%` }}
                                                        ></div>
                                                    </div>
                                                    <span className="progress-text">{student.progress}%</span>
                                                </div>
                                            </td>
                                            <td>{student.lastAccess}</td>
                                            <td>
                                                <button
                                                    className="btn-icon danger"
                                                    onClick={() => handleRemoveStudent(student.id)}
                                                    title="제외"
                                                >
                                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                        <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                                                    </svg>
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                                {classStudents.length === 0 && (
                                    <div className="empty-state small">
                                        <p>등록된 수강생이 없습니다</p>
                                    </div>
                                )}
                            </div>

                            {/* 수강생 목록 페이지네이션 */}
                            <div className="card-pagination">
                                <Pagination
                                    currentPage={studentPage}
                                    totalPages={totalStudentPages}
                                    onPageChange={setStudentPage}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* 클래스 등록/수정 폼 */}
            {viewMode === 'form' && (
                <div className="form-view">
                    <form className="admin-form" onSubmit={handleSubmitForm}>
                        <div className="form-group">
                            <label htmlFor="name">클래스명 <span className="required">*</span></label>
                            <input
                                type="text"
                                id="name"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                placeholder="클래스명을 입력하세요"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="description">설명</label>
                            <textarea
                                id="description"
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                placeholder="클래스에 대한 설명을 입력하세요"
                                rows={3}
                            />
                        </div>
                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="instructor">담당 강사 <span className="required">*</span></label>
                                <input
                                    type="text"
                                    id="instructor"
                                    value={formData.instructor}
                                    onChange={(e) => setFormData({ ...formData, instructor: e.target.value })}
                                    placeholder="강사명을 입력하세요"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="category">카테고리 <span className="required">*</span></label>
                                <select
                                    id="category"
                                    value={formData.category}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                >
                                    <option value="frontend">프론트엔드</option>
                                    <option value="backend">백엔드</option>
                                    <option value="fullstack">풀스택</option>
                                    <option value="devops">DevOps</option>
                                </select>
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="schedule">수업 일정 <span className="required">*</span></label>
                            <input
                                type="text"
                                id="schedule"
                                value={formData.schedule}
                                onChange={(e) => setFormData({ ...formData, schedule: e.target.value })}
                                placeholder="예: 월/수 19:00-21:00"
                                required
                            />
                        </div>
                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="startDate">시작일 <span className="required">*</span></label>
                                <input
                                    type="date"
                                    id="startDate"
                                    value={formData.startDate}
                                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="endDate">종료일 <span className="required">*</span></label>
                                <input
                                    type="date"
                                    id="endDate"
                                    value={formData.endDate}
                                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                                    required
                                />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="maxStudents">최대 정원 <span className="required">*</span></label>
                                <input
                                    type="number"
                                    id="maxStudents"
                                    value={formData.maxStudents}
                                    onChange={(e) => setFormData({ ...formData, maxStudents: parseInt(e.target.value) })}
                                    min={1}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="status">상태 <span className="required">*</span></label>
                                <select
                                    id="status"
                                    value={formData.status}
                                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                >
                                    <option value="upcoming">예정</option>
                                    <option value="active">진행중</option>
                                    <option value="completed">완료</option>
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

            {/* 학생 추가 모달 */}
            {showAddStudent && (
                <div className="modal-overlay" onClick={() => setShowAddStudent(false)}>
                    <div className="modal modal-lg" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>학생 추가</h2>
                            <button className="btn-close" onClick={() => setShowAddStudent(false)}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M18 6L6 18M6 6l12 12"/>
                                </svg>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="search-box modal-search">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <circle cx="11" cy="11" r="8"/>
                                    <path d="M21 21l-4.35-4.35"/>
                                </svg>
                                <input
                                    type="text"
                                    placeholder="이름 또는 이메일로 검색..."
                                    value={studentSearchTerm}
                                    onChange={(e) => setStudentSearchTerm(e.target.value)}
                                />
                            </div>
                            <div className="student-select-list">
                                {availableStudents.length > 0 ? (
                                    availableStudents.map(student => (
                                        <label key={student.id} className="student-select-item">
                                            <input
                                                type="checkbox"
                                                checked={selectedStudentsToAdd.includes(student.id)}
                                                onChange={() => toggleStudentSelection(student.id)}
                                            />
                                            <div className="student-select-info">
                                                <span className="student-name">{student.name}</span>
                                                <span className="student-email">{student.email}</span>
                                            </div>
                                        </label>
                                    ))
                                ) : (
                                    <div className="empty-state small">
                                        <p>추가 가능한 학생이 없습니다</p>
                                    </div>
                                )}
                            </div>
                            {selectedStudentsToAdd.length > 0 && (
                                <div className="selected-count">
                                    {selectedStudentsToAdd.length}명 선택됨
                                </div>
                            )}
                        </div>
                        <div className="modal-footer">
                            <button className="btn-secondary" onClick={() => setShowAddStudent(false)}>취소</button>
                            <button
                                className="btn-primary"
                                onClick={handleConfirmAddStudents}
                                disabled={selectedStudentsToAdd.length === 0}
                            >
                                추가하기
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ClassManagement;