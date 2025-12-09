import { useState } from 'react';
import styles from './ClassesView.module.css';
import {
    Search,
    Plus,
    Download,
    Filter,
    Edit,
    Trash2,
    Eye,
    Users,
    Calendar,
    Clock,
    X,
    UserPlus,
    ArrowUpDown,
    Circle
} from 'lucide-react';

const ClassesView = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('all');
    const [selectedSort, setSelectedSort] = useState('recent');
    const [currentPage, setCurrentPage] = useState(1);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [selectedClass, setSelectedClass] = useState(null);

    const itemsPerPage = 10;

    const classes = [
        {
            id: 1,
            title: 'Python 기초반',
            description: '파이썬 프로그래밍의 기초를 배우는 강의입니다.',
            instructor: { id: 1, name: '이영희' },
            status: 'ongoing',
            startDate: '2024-01-15 10:00',
            endDate: '2024-01-15 12:00',
            studentCount: 25,
            createdAt: '2024-01-10'
        },
        {
            id: 2,
            title: 'JavaScript 심화',
            description: 'ES6+ 문법과 비동기 프로그래밍을 다룹니다.',
            instructor: { id: 2, name: '최동현' },
            status: 'ongoing',
            startDate: '2024-01-15 14:00',
            endDate: '2024-01-15 16:00',
            studentCount: 18,
            createdAt: '2024-01-08'
        },
        {
            id: 3,
            title: 'React 입문',
            description: 'React의 핵심 개념과 실전 프로젝트를 진행합니다.',
            instructor: { id: 1, name: '이영희' },
            status: 'scheduled',
            startDate: '2024-01-20 16:00',
            endDate: '2024-01-20 18:00',
            studentCount: 30,
            createdAt: '2024-01-12'
        },
        {
            id: 4,
            title: 'Node.js 실전',
            description: 'Express와 데이터베이스 연동을 배웁니다.',
            instructor: { id: 2, name: '최동현' },
            status: 'completed',
            startDate: '2024-01-10 10:00',
            endDate: '2024-01-10 12:00',
            studentCount: 15,
            createdAt: '2024-01-05'
        },
        {
            id: 5,
            title: 'TypeScript 마스터',
            description: '타입스크립트로 안전한 코드 작성법을 익힙니다.',
            instructor: { id: 3, name: '임서연' },
            status: 'ongoing',
            startDate: '2024-01-15 09:00',
            endDate: '2024-01-15 11:00',
            studentCount: 22,
            createdAt: '2024-01-11'
        },
    ];

    const instructors = [
        { id: 1, name: '이영희' },
        { id: 2, name: '최동현' },
        { id: 3, name: '임서연' },
    ];

    const students = [
        { id: 1, name: '김철수', email: 'kim@example.com', joinedAt: '2024-01-15 10:05', isOnline: true },
        { id: 2, name: '박민수', email: 'park@example.com', joinedAt: '2024-01-15 10:02', isOnline: true },
        { id: 3, name: '정수진', email: 'jung@example.com', joinedAt: '2024-01-15 10:10', isOnline: false },
        { id: 4, name: '윤재호', email: 'yoon@example.com', joinedAt: '2024-01-15 10:08', isOnline: true },
        { id: 5, name: '한지민', email: 'han@example.com', joinedAt: '2024-01-15 10:15', isOnline: true },
    ];

    const totalPages = Math.ceil(classes.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const displayedClasses = classes.slice(startIndex, startIndex + itemsPerPage);

    const getStatusLabel = (status) => {
        const labels = { scheduled: '시작 전', ongoing: '진행중', completed: '종료됨' };
        return labels[status] || status;
    };

    const handleViewDetail = (classItem) => {
        setSelectedClass(classItem);
        setShowDetailModal(true);
    };

    return (
        <div className={styles.classesView}>
            <header className={styles.header}>
                <div className={styles.headerLeft}>
                    <h1 className={styles.title}>클래스 관리</h1>
                    <p className={styles.subtitle}>총 {classes.length}개의 클래스</p>
                </div>
                <div className={styles.headerActions}>
                    <button className={styles.secondaryBtn}>
                        <Download />
                        <span>엑셀 다운로드</span>
                    </button>
                    <button className={styles.primaryBtn} onClick={() => setShowCreateModal(true)}>
                        <Plus />
                        <span>클래스 생성</span>
                    </button>
                </div>
            </header>

            <div className={styles.toolbar}>
                <div className={styles.searchBox}>
                    <Search className={styles.searchIcon} />
                    <input
                        type="text"
                        placeholder="방 제목, 강사 이름으로 검색..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className={styles.searchInput}
                    />
                </div>

                <div className={styles.filters}>
                    <select
                        value={selectedStatus}
                        onChange={(e) => setSelectedStatus(e.target.value)}
                        className={styles.filterSelect}
                    >
                        <option value="all">모든 상태</option>
                        <option value="scheduled">시작 전</option>
                        <option value="ongoing">진행중</option>
                        <option value="completed">종료됨</option>
                    </select>

                    <select
                        value={selectedSort}
                        onChange={(e) => setSelectedSort(e.target.value)}
                        className={styles.filterSelect}
                    >
                        <option value="recent">최근 생성순</option>
                        <option value="participants">참여자 많은 순</option>
                        <option value="duration">세션 시간 긴 순</option>
                    </select>
                </div>
            </div>

            <div className={styles.tableCard}>
                <table className={styles.table}>
                    <thead>
                    <tr>
                        <th>클래스</th>
                        <th>강사</th>
                        <th>일시</th>
                        <th>참여 학생</th>
                        <th>상태</th>
                        <th>생성일</th>
                        <th>작업</th>
                    </tr>
                    </thead>
                    <tbody>
                    {displayedClasses.map((classItem) => (
                        <tr key={classItem.id}>
                            <td>
                                <div className={styles.classCell}>
                                    <span className={styles.className}>{classItem.title}</span>
                                    <span className={styles.classDesc}>{classItem.description}</span>
                                </div>
                            </td>
                            <td>
                                <div className={styles.instructorCell}>
                                    <div className={styles.instructorAvatar}>
                                        {classItem.instructor.name.charAt(0)}
                                    </div>
                                    <span>{classItem.instructor.name}</span>
                                </div>
                            </td>
                            <td>
                                <div className={styles.dateTimeCell}>
                                    <span className={styles.dateTime}>{classItem.startDate}</span>
                                    <span className={styles.dateSeparator}>~</span>
                                    <span className={styles.dateTime}>{classItem.endDate.split(' ')[1]}</span>
                                </div>
                            </td>
                            <td>
                                <div className={styles.studentCountCell}>
                                    <Users className={styles.studentIcon} />
                                    <span>{classItem.studentCount}명</span>
                                </div>
                            </td>
                            <td>
                  <span className={`${styles.statusBadge} ${styles[classItem.status]}`}>
                    {getStatusLabel(classItem.status)}
                  </span>
                            </td>
                            <td className={styles.dateCell}>{classItem.createdAt}</td>
                            <td>
                                <div className={styles.actions}>
                                    <button
                                        className={styles.actionBtn}
                                        title="상세보기"
                                        onClick={() => handleViewDetail(classItem)}
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
          {startIndex + 1}-{Math.min(startIndex + itemsPerPage, classes.length)} / 전체 {classes.length}개
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

            {/* 클래스 생성 모달 */}
            {showCreateModal && (
                <div className={styles.modalOverlay} onClick={() => setShowCreateModal(false)}>
                    <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                        <div className={styles.modalHeader}>
                            <h2 className={styles.modalTitle}>클래스 생성</h2>
                            <button className={styles.modalClose} onClick={() => setShowCreateModal(false)}>
                                <X />
                            </button>
                        </div>
                        <div className={styles.modalBody}>
                            <div className={styles.formGroup}>
                                <label className={styles.formLabel}>클래스 제목 *</label>
                                <input type="text" className={styles.formInput} placeholder="클래스 제목을 입력하세요" />
                            </div>
                            <div className={styles.formGroup}>
                                <label className={styles.formLabel}>설명</label>
                                <textarea className={styles.formTextarea} placeholder="클래스 설명을 입력하세요" rows={3} />
                            </div>
                            <div className={styles.formRow}>
                                <div className={styles.formGroup}>
                                    <label className={styles.formLabel}>시작 일시 *</label>
                                    <input type="datetime-local" className={styles.formInput} />
                                </div>
                                <div className={styles.formGroup}>
                                    <label className={styles.formLabel}>종료 일시 *</label>
                                    <input type="datetime-local" className={styles.formInput} />
                                </div>
                            </div>
                            <div className={styles.formGroup}>
                                <label className={styles.formLabel}>강사 배정 *</label>
                                <select className={styles.formSelect}>
                                    <option value="">강사를 선택하세요</option>
                                    {instructors.map((instructor) => (
                                        <option key={instructor.id} value={instructor.id}>
                                            {instructor.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className={styles.formGroup}>
                                <label className={styles.formLabel}>학생 배정</label>
                                <button className={styles.assignBtn}>
                                    <UserPlus />
                                    <span>학생 선택하기</span>
                                </button>
                            </div>
                        </div>
                        <div className={styles.modalFooter}>
                            <button className={styles.cancelBtn} onClick={() => setShowCreateModal(false)}>
                                취소
                            </button>
                            <button className={styles.submitBtn}>
                                클래스 생성
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* 클래스 상세 모달 */}
            {showDetailModal && selectedClass && (
                <div className={styles.modalOverlay} onClick={() => setShowDetailModal(false)}>
                    <div className={`${styles.modal} ${styles.wideModal}`} onClick={(e) => e.stopPropagation()}>
                        <div className={styles.modalHeader}>
                            <h2 className={styles.modalTitle}>클래스 상세 정보</h2>
                            <button className={styles.modalClose} onClick={() => setShowDetailModal(false)}>
                                <X />
                            </button>
                        </div>
                        <div className={styles.modalBody}>
                            <div className={styles.detailHeader}>
                                <div className={styles.detailTitleSection}>
                                    <h3 className={styles.detailTitle}>{selectedClass.title}</h3>
                                    <p className={styles.detailDescription}>{selectedClass.description}</p>
                                    <span className={`${styles.statusBadge} ${styles[selectedClass.status]}`}>
                    {getStatusLabel(selectedClass.status)}
                  </span>
                                </div>
                            </div>

                            <div className={styles.detailInfoGrid}>
                                <div className={styles.detailInfoItem}>
                                    <Calendar className={styles.detailIcon} />
                                    <div className={styles.detailInfoContent}>
                                        <span className={styles.detailInfoLabel}>일시</span>
                                        <span className={styles.detailInfoValue}>
                      {selectedClass.startDate} ~ {selectedClass.endDate.split(' ')[1]}
                    </span>
                                    </div>
                                </div>
                                <div className={styles.detailInfoItem}>
                                    <Users className={styles.detailIcon} />
                                    <div className={styles.detailInfoContent}>
                                        <span className={styles.detailInfoLabel}>강사</span>
                                        <span className={styles.detailInfoValue}>{selectedClass.instructor.name}</span>
                                    </div>
                                </div>
                            </div>

                            <div className={styles.studentSection}>
                                <div className={styles.studentSectionHeader}>
                                    <h4 className={styles.sectionTitle}>참여 학생 ({students.length}명)</h4>
                                    <button className={styles.smallSecondaryBtn}>
                                        <Download />
                                        엑셀 다운로드
                                    </button>
                                </div>
                                <div className={styles.studentList}>
                                    <table className={styles.studentTable}>
                                        <thead>
                                        <tr>
                                            <th>학생</th>
                                            <th>입장 시간</th>
                                            <th>접속 상태</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {students.map((student) => (
                                            <tr key={student.id}>
                                                <td>
                                                    <div className={styles.studentCell}>
                                                        <span className={styles.studentName}>{student.name}</span>
                                                        <span className={styles.studentEmail}>{student.email}</span>
                                                    </div>
                                                </td>
                                                <td className={styles.dateCell}>{student.joinedAt}</td>
                                                <td>
                            <span className={`${styles.onlineBadge} ${student.isOnline ? styles.online : styles.offline}`}>
                              <Circle fill="currentColor" />
                                {student.isOnline ? '접속중' : '오프라인'}
                            </span>
                                                </td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div className={styles.modalFooter}>
                            <button className={styles.cancelBtn} onClick={() => setShowDetailModal(false)}>
                                닫기
                            </button>
                            <button className={styles.secondaryBtn}>
                                <Edit />
                                수정
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ClassesView;