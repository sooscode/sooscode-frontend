import { useState } from 'react';
import styles from './SettingsView.module.css';
import { Globe, Bell, Shield, Palette, Database, Mail } from 'lucide-react';

const SettingsView = () => {
  const [activeTab, setActiveTab] = useState('general');

  const tabs = [
    { id: 'general', label: '일반', icon: Globe },
    { id: 'notifications', label: '알림', icon: Bell },
    { id: 'security', label: '보안', icon: Shield },
    { id: 'appearance', label: '외관', icon: Palette },
    { id: 'database', label: '데이터', icon: Database },
    { id: 'email', label: '이메일', icon: Mail },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'general':
        return (
          <div className={styles.settingsGroup}>
            <div className={styles.settingItem}>
              <div className={styles.settingInfo}>
                <h3 className={styles.settingTitle}>사이트 이름</h3>
                <p className={styles.settingDesc}>서비스의 이름을 설정합니다.</p>
              </div>
              <input 
                type="text" 
                defaultValue="SoosCode" 
                className={styles.textInput}
              />
            </div>

            <div className={styles.settingItem}>
              <div className={styles.settingInfo}>
                <h3 className={styles.settingTitle}>사이트 URL</h3>
                <p className={styles.settingDesc}>서비스의 기본 URL을 설정합니다.</p>
              </div>
              <input 
                type="text" 
                defaultValue="https://sooscode.com" 
                className={styles.textInput}
              />
            </div>

            <div className={styles.settingItem}>
              <div className={styles.settingInfo}>
                <h3 className={styles.settingTitle}>기본 언어</h3>
                <p className={styles.settingDesc}>서비스의 기본 언어를 선택합니다.</p>
              </div>
              <select className={styles.selectInput}>
                <option value="ko">한국어</option>
                <option value="en">English</option>
                <option value="ja">日本語</option>
              </select>
            </div>

            <div className={styles.settingItem}>
              <div className={styles.settingInfo}>
                <h3 className={styles.settingTitle}>유지보수 모드</h3>
                <p className={styles.settingDesc}>사이트를 유지보수 모드로 전환합니다.</p>
              </div>
              <label className={styles.toggle}>
                <input type="checkbox" />
                <span className={styles.toggleSlider}></span>
              </label>
            </div>
          </div>
        );

      case 'notifications':
        return (
          <div className={styles.settingsGroup}>
            <div className={styles.settingItem}>
              <div className={styles.settingInfo}>
                <h3 className={styles.settingTitle}>이메일 알림</h3>
                <p className={styles.settingDesc}>새로운 사용자 가입 시 이메일로 알림을 받습니다.</p>
              </div>
              <label className={styles.toggle}>
                <input type="checkbox" defaultChecked />
                <span className={styles.toggleSlider}></span>
              </label>
            </div>

            <div className={styles.settingItem}>
              <div className={styles.settingInfo}>
                <h3 className={styles.settingTitle}>시스템 알림</h3>
                <p className={styles.settingDesc}>시스템 오류 발생 시 알림을 받습니다.</p>
              </div>
              <label className={styles.toggle}>
                <input type="checkbox" defaultChecked />
                <span className={styles.toggleSlider}></span>
              </label>
            </div>

            <div className={styles.settingItem}>
              <div className={styles.settingInfo}>
                <h3 className={styles.settingTitle}>리포트 알림</h3>
                <p className={styles.settingDesc}>주간/월간 리포트를 이메일로 받습니다.</p>
              </div>
              <label className={styles.toggle}>
                <input type="checkbox" />
                <span className={styles.toggleSlider}></span>
              </label>
            </div>
          </div>
        );

      case 'security':
        return (
          <div className={styles.settingsGroup}>
            <div className={styles.settingItem}>
              <div className={styles.settingInfo}>
                <h3 className={styles.settingTitle}>2단계 인증</h3>
                <p className={styles.settingDesc}>관리자 계정에 2단계 인증을 필수로 설정합니다.</p>
              </div>
              <label className={styles.toggle}>
                <input type="checkbox" defaultChecked />
                <span className={styles.toggleSlider}></span>
              </label>
            </div>

            <div className={styles.settingItem}>
              <div className={styles.settingInfo}>
                <h3 className={styles.settingTitle}>세션 만료 시간</h3>
                <p className={styles.settingDesc}>사용자 세션이 만료되는 시간을 설정합니다.</p>
              </div>
              <select className={styles.selectInput}>
                <option value="1">1시간</option>
                <option value="6">6시간</option>
                <option value="24">24시간</option>
                <option value="168">1주일</option>
              </select>
            </div>

            <div className={styles.settingItem}>
              <div className={styles.settingInfo}>
                <h3 className={styles.settingTitle}>로그인 시도 제한</h3>
                <p className={styles.settingDesc}>로그인 실패 시 계정 잠금까지의 시도 횟수입니다.</p>
              </div>
              <input 
                type="number" 
                defaultValue="5" 
                min="3"
                max="10"
                className={styles.numberInput}
              />
            </div>

            <div className={styles.settingItem}>
              <div className={styles.settingInfo}>
                <h3 className={styles.settingTitle}>IP 화이트리스트</h3>
                <p className={styles.settingDesc}>허용된 IP에서만 관리자 접근을 허용합니다.</p>
              </div>
              <label className={styles.toggle}>
                <input type="checkbox" />
                <span className={styles.toggleSlider}></span>
              </label>
            </div>
          </div>
        );

      case 'appearance':
        return (
          <div className={styles.settingsGroup}>
            <div className={styles.settingItem}>
              <div className={styles.settingInfo}>
                <h3 className={styles.settingTitle}>다크 모드</h3>
                <p className={styles.settingDesc}>기본 테마를 다크 모드로 설정합니다.</p>
              </div>
              <label className={styles.toggle}>
                <input type="checkbox" />
                <span className={styles.toggleSlider}></span>
              </label>
            </div>

            <div className={styles.settingItem}>
              <div className={styles.settingInfo}>
                <h3 className={styles.settingTitle}>테마 색상</h3>
                <p className={styles.settingDesc}>서비스의 주요 테마 색상을 선택합니다.</p>
              </div>
              <div className={styles.colorPicker}>
                <button className={`${styles.colorBtn} ${styles.blue} ${styles.active}`}></button>
                <button className={`${styles.colorBtn} ${styles.green}`}></button>
                <button className={`${styles.colorBtn} ${styles.purple}`}></button>
                <button className={`${styles.colorBtn} ${styles.orange}`}></button>
                <button className={`${styles.colorBtn} ${styles.red}`}></button>
              </div>
            </div>

            <div className={styles.settingItem}>
              <div className={styles.settingInfo}>
                <h3 className={styles.settingTitle}>사이드바 접힘</h3>
                <p className={styles.settingDesc}>기본으로 사이드바를 접힌 상태로 표시합니다.</p>
              </div>
              <label className={styles.toggle}>
                <input type="checkbox" />
                <span className={styles.toggleSlider}></span>
              </label>
            </div>
          </div>
        );

      default:
        return (
          <div className={styles.emptyState}>
            <p>설정 내용이 없습니다.</p>
          </div>
        );
    }
  };

  return (
    <div className={styles.settingsView}>
      <header className={styles.header}>
        <h1 className={styles.title}>설정</h1>
        <p className={styles.subtitle}>시스템 설정을 관리합니다</p>
      </header>

      <div className={styles.settingsContainer}>
        <nav className={styles.tabNav}>
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                className={`${styles.tabBtn} ${activeTab === tab.id ? styles.active : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                <Icon className={styles.tabIcon} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>

        <div className={styles.tabContent}>
          {renderTabContent()}

          <div className={styles.actionButtons}>
            <button className={styles.cancelBtn}>취소</button>
            <button className={styles.saveBtn}>저장</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsView;
