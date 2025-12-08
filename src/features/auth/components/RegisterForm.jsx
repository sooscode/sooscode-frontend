// features/auth/components/RegisterForm.jsx
import { Link } from 'react-router-dom';
import { FiMail, FiLock, FiUser } from 'react-icons/fi';
import useRegister from '../hooks/useRegister';
import styles from './AuthForm.module.css';

const RegisterForm = () => {
    const {
        form,
        errors,
        loading,
        passwordStrength,
        handleChange,
        handleSubmit,
    } = useRegister();

    return (
        <>
            <h2 className={styles.title}>회원가입</h2>
            <p className={styles.subtitle}>새로운 계정을 만들어보세요.</p>

            <form className={styles.form} onSubmit={handleSubmit}>
                {errors.form && <div className={styles.error}>{errors.form}</div>}

                <div>
                    <label className={styles.label}>이름</label>
                    <div className={styles.inputWrapper}>
                        <FiUser className={styles.inputIcon} />
                        <input
                            className={styles.input}
                            name="name"
                            placeholder="홍길동"
                            value={form.name}
                            onChange={handleChange}
                        />
                    </div>
                    {errors.name && <p className={styles.fieldError}>{errors.name}</p>}
                </div>

                <div>
                    <label className={styles.label}>이메일</label>
                    <div className={styles.inputWrapper}>
                        <FiMail className={styles.inputIcon} />
                        <input
                            className={styles.input}
                            type="email"
                            name="email"
                            placeholder="email@example.com"
                            value={form.email}
                            onChange={handleChange}
                        />
                    </div>
                    {errors.email && <p className={styles.fieldError}>{errors.email}</p>}
                </div>

                <div>
                    <label className={styles.label}>비밀번호</label>
                    <div className={styles.inputWrapper}>
                        <FiLock className={styles.inputIcon} />
                        <input
                            className={styles.input}
                            type="password"
                            name="password"
                            placeholder="••••••••"
                            value={form.password}
                            onChange={handleChange}
                        />
                    </div>
                    {errors.password && <p className={styles.fieldError}>{errors.password}</p>}
                    {form.password && (
                        <p className={
                            passwordStrength === '강함'
                                ? styles.strong
                                : passwordStrength === '보통'
                                    ? styles.medium
                                    : styles.weak
                        }>
                            비밀번호 강도: {passwordStrength}
                        </p>
                    )}
                </div>

                <div>
                    <label className={styles.label}>비밀번호 확인</label>
                    <div className={styles.inputWrapper}>
                        <FiLock className={styles.inputIcon} />
                        <input
                            className={styles.input}
                            type="password"
                            name="confirmPassword"
                            placeholder="••••••••"
                            value={form.confirmPassword}
                            onChange={handleChange}
                        />
                    </div>
                    {errors.confirmPassword && <p className={styles.fieldError}>{errors.confirmPassword}</p>}
                </div>

                <button
                    type="submit"
                    className={styles.primaryButton}
                    disabled={loading}
                >
                    {loading ? '가입 중...' : '회원가입'}
                </button>

                <p className={styles.footerText}>
                    이미 계정이 있으신가요? <Link className={styles.link} to="/login">로그인</Link>
                </p>
            </form>
        </>
    );
};

export default RegisterForm;