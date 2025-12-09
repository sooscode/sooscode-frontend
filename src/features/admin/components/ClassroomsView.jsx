import { useState } from 'react';
import styles from './ClassroomsView.module.css';
import { Search, Plus, Users, Calendar, Clock, MoreVertical, Edit, Trash2, Eye } from 'lucide-react';

const ClassroomsView = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('grid');

  const classrooms = [
    {
      id: 1,
      name: 'Python 기초반',
      instructor: '이영희',
      description: '파이썬 프로그래밍의 기초를 배우는 강의입니다.',
      students: 25,
      maxStudents: 30,
      status: 'active',
      schedule: '월/수/금 10:00',
      createdAt: '2024-01-10'
    },
    {
      id: 2,
      name: 'JavaScript 심화',
      instructor: '최동현',
      description: 'ES6+ 문법과 비동기 프로그래밍을 다룹니다.',
      students: 18,
      maxStudents: 20,
      status: 'active',
      schedule: '화/목 14:00',
      createdAt: '2024-01-08'
    },
    {
      id: 3,
      name: 'React 입문',
      instructor: '이영희',
      description: 'React의 핵심 개념과 실전 프로젝트를 진행합니다.',
      students: 0,
      maxStudents: 30,
      status: 'scheduled',
      schedule: '월/수 16:00',
      createdAt: '2024-01-15'
    },
    {
      id: 4,
      name: 'Node.js 실전',
      instructor: '최동현',
      description: 'Express와 데이터베이스 연동을 배웁니다.',
      students: 15,
      maxStudents: 15,
      status: 'completed',
      schedule: '화/목 10:00',
      createdAt: '2023-12-01'
    },
    {
      id: 5,
      name: 'TypeScript 마스터',
      instructor: '임서연',
      description: '타입스크립트로 안전한 코드 작성법을 익힙니다.',
      students: 22,
      maxStudents: 25,
      status: 'active',
      schedule: '금 14:00',
      createdAt: '2024-01-12'
    },
    {
      id: 6,
      name: 'SQL 기초',
      instructor: '임서연',
      description: '데이터베이스와 SQL 쿼리의 기초를 배웁니다.',
      students: 28,
      maxStudents: 30,
      status: 'active',
      schedule: '월/수 09:00',
      createdAt: '2024-01-05'
    },
  ];

  const getStatusLabel = (status) => {
    const labels = { active: '진행중', scheduled: '예정', completed: '완료' };
    return labels[status] || status;
  };

  const getCapacityPercent = (students, max) => {
    return Math.round((students / max) * 100);
  };

  return (
    <div className={styles.classroomsView}>
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <h1 className={styles.title}>강의실 관리</h1>
          <p className={styles.subtitle}>총 {classrooms.length}개의 강의실</p>
        </div>
        <button className={styles.addBtn}>
          <Plus />
          <span>강의실 생성</span>
        </button>
      </header>

      <div className={styles.toolbar}>
        <div className={styles.searchBox}>
          <Search className={styles.searchIcon} />
          <input
            type="text"
            placeholder="강의실명, 강사명으로 검색..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.searchInput}
          />
        </div>

        <div className={styles.viewToggle}>
          <button
            className={`${styles.toggleBtn} ${viewMode === 'grid' ? styles.active : ''}`}
            onClick={() => setViewMode('grid')}
          >
            그리드
          </button>
          <button
            className={`${styles.toggleBtn} ${viewMode === 'list' ? styles.active : ''}`}
            onClick={() => setViewMode('list')}
          >
            리스트
          </button>
        </div>
      </div>

      {viewMode === 'grid' ? (
        <div className={styles.grid}>
          {classrooms.map((classroom) => (
            <div key={classroom.id} className={styles.card}>
              <div className={styles.cardHeader}>
                <span className={`${styles.statusBadge} ${styles[classroom.status]}`}>
                  {getStatusLabel(classroom.status)}
                </span>
                <button className={styles.moreBtn}>
                  <MoreVertical />
                </button>
              </div>

              <h3 className={styles.cardTitle}>{classroom.name}</h3>
              <p className={styles.cardDescription}>{classroom.description}</p>

              <div className={styles.cardMeta}>
                <div className={styles.metaItem}>
                  <Users className={styles.metaIcon} />
                  <span>{classroom.instructor}</span>
                </div>
                <div className={styles.metaItem}>
                  <Calendar className={styles.metaIcon} />
                  <span>{classroom.schedule}</span>
                </div>
              </div>

              <div className={styles.capacityBar}>
                <div className={styles.capacityHeader}>
                  <span>수강생</span>
                  <span>{classroom.students}/{classroom.maxStudents}명</span>
                </div>
                <div className={styles.progressBg}>
                  <div
                    className={styles.progressFill}
                    style={{ width: `${getCapacityPercent(classroom.students, classroom.maxStudents)}%` }}
                  />
                </div>
              </div>

              <div className={styles.cardActions}>
                <button className={styles.cardBtn}>
                  <Eye />
                  <span>상세보기</span>
                </button>
                <button className={styles.cardBtn}>
                  <Edit />
                  <span>수정</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.tableCard}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>강의실명</th>
                <th>강사</th>
                <th>일정</th>
                <th>수강생</th>
                <th>상태</th>
                <th>생성일</th>
                <th>작업</th>
              </tr>
            </thead>
            <tbody>
              {classrooms.map((classroom) => (
                <tr key={classroom.id}>
                  <td>
                    <div className={styles.classroomCell}>
                      <span className={styles.classroomName}>{classroom.name}</span>
                      <span className={styles.classroomDesc}>{classroom.description}</span>
                    </div>
                  </td>
                  <td>{classroom.instructor}</td>
                  <td>{classroom.schedule}</td>
                  <td>{classroom.students}/{classroom.maxStudents}명</td>
                  <td>
                    <span className={`${styles.statusBadge} ${styles[classroom.status]}`}>
                      {getStatusLabel(classroom.status)}
                    </span>
                  </td>
                  <td className={styles.dateCell}>{classroom.createdAt}</td>
                  <td>
                    <div className={styles.actions}>
                      <button className={styles.actionBtn} title="상세보기">
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
      )}
    </div>
  );
};

export default ClassroomsView;
