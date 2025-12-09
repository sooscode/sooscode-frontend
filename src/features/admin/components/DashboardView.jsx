import { useState } from 'react';
import styles from './DashboardView.module.css';
import {
    Monitor,
    Users,
    UserCheck,
    GraduationCap,
    UserPlus,
    Server,
    Cpu,
    HardDrive,
    MemoryStick,
    RefreshCw,
    Circle
} from 'lucide-react';

const DashboardView = () => {
    const [lastUpdated, setLastUpdated] = useState(new Date());

    // 실시간 현황 데이터
    const realtimeStats = [
        {
            label: '실시간 활성 방',
            value: '12',
            icon: Monitor,
            color: 'primary',
            description: '현재 진행 중인 세션'
        },
        {
            label: '현재 접속자',
            value: '156',
            icon: Users,
            color: 'success',
            breakdown: { instructor: 8, student: 148 }
        },
        {
            label: '금일 총 사용자',
            value: '423',
            icon: UserCheck,
            color: 'info',
            description: '오늘 접속한 사용자'
        },
        {
            label: '주간 신규 가입',
            value: '67',
            icon: UserPlus,
            color: 'warning',
            description: '최근 7일간'
        },
    ];

    // 서버 상태 데이터
    const serverStatus = [
        { name: '백엔드 서버', status: 'online', latency: '23ms' },
        { name: '컴파일 서버', status: 'online', latency: '45ms' },
        { name: '스트리밍 서버', status: 'online', latency: '12ms' },
    ];

    // 시스템 리소스 데이터
    const systemResources = [
        { name: 'CPU', usage: 42, icon: Cpu },
        { name: '메모리', usage: 68, icon: MemoryStick },
        { name: '디스크', usage: 35, icon: HardDrive },
    ];

    const handleRefresh = () => {
        setLastUpdated(new Date());
        // 실제로는 데이터 fetch 로직
    };

    const formatTime = (date) => {
        return date.toLocaleTimeString('ko-KR', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
    };

    const getUsageColor = (usage) => {
        if (usage >= 80) return 'critical';
        if (usage >= 60) return 'warning';
        return 'normal';
    };

    return (
        <div className={styles.dashboard}>
            <header className={styles.header}>
                <div className={styles.headerLeft}>
                    <h1 className={styles.title}>대시보드</h1>
                    <p className={styles.subtitle}>시스템 현황을 실시간으로 모니터링합니다</p>
                </div>
                <div className={styles.headerRight}>
          <span className={styles.lastUpdated}>
            마지막 업데이트: {formatTime(lastUpdated)}
          </span>
                    <button className={styles.refreshBtn} onClick={handleRefresh}>
                        <RefreshCw />
                        <span>새로고침</span>
                    </button>
                </div>
            </header>

            {/* 실시간 현황 카드 */}
            <section className={styles.statsGrid}>
                {realtimeStats.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                        <div key={index} className={styles.statCard}>
                            <div className={`${styles.statIcon} ${styles[stat.color]}`}>
                                <Icon />
                            </div>
                            <div className={styles.statContent}>
                                <span className={styles.statValue}>{stat.value}</span>
                                <span className={styles.statLabel}>{stat.label}</span>
                                {stat.breakdown && (
                                    <div className={styles.statBreakdown}>
                                        <span>강사 {stat.breakdown.instructor}명</span>
                                        <span className={styles.divider}>|</span>
                                        <span>학생 {stat.breakdown.student}명</span>
                                    </div>
                                )}
                                {stat.description && (
                                    <span className={styles.statDesc}>{stat.description}</span>
                                )}
                            </div>
                        </div>
                    );
                })}
            </section>

            <div className={styles.bottomGrid}>
                {/* 서버 상태 */}
                <section className={styles.card}>
                    <div className={styles.cardHeader}>
                        <h2 className={styles.cardTitle}>
                            <Server className={styles.cardIcon} />
                            서버 상태
                        </h2>
                    </div>
                    <div className={styles.serverList}>
                        {serverStatus.map((server, index) => (
                            <div key={index} className={styles.serverItem}>
                                <div className={styles.serverInfo}>
                                    <Circle
                                        className={`${styles.statusDot} ${styles[server.status]}`}
                                        fill="currentColor"
                                    />
                                    <span className={styles.serverName}>{server.name}</span>
                                </div>
                                <div className={styles.serverMeta}>
                  <span className={`${styles.statusBadge} ${styles[server.status]}`}>
                    {server.status === 'online' ? '정상' : '오프라인'}
                  </span>
                                    <span className={styles.latency}>{server.latency}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 시스템 리소스 */}
                <section className={styles.card}>
                    <div className={styles.cardHeader}>
                        <h2 className={styles.cardTitle}>
                            <Cpu className={styles.cardIcon} />
                            시스템 리소스
                        </h2>
                    </div>
                    <div className={styles.resourceList}>
                        {systemResources.map((resource, index) => {
                            const Icon = resource.icon;
                            return (
                                <div key={index} className={styles.resourceItem}>
                                    <div className={styles.resourceHeader}>
                                        <div className={styles.resourceInfo}>
                                            <Icon className={styles.resourceIcon} />
                                            <span className={styles.resourceName}>{resource.name}</span>
                                        </div>
                                        <span className={`${styles.resourceValue} ${styles[getUsageColor(resource.usage)]}`}>
                      {resource.usage}%
                    </span>
                                    </div>
                                    <div className={styles.progressBar}>
                                        <div
                                            className={`${styles.progressFill} ${styles[getUsageColor(resource.usage)]}`}
                                            style={{ width: `${resource.usage}%` }}
                                        />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </section>
            </div>

            {/* 자동 새로고침 안내 */}
            <div className={styles.autoRefreshNotice}>
                <RefreshCw className={styles.noticeIcon} />
                <span>대시보드는 30초마다 자동으로 새로고침됩니다</span>
            </div>
        </div>
    );
};

export default DashboardView;