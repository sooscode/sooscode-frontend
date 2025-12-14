import React from 'react';

/**
 * React 페이지네이션 컴포넌트
 *
 * @param {number} currentPage - 현재 페이지 (0-indexed)
 * @param {number} totalPages - 전체 페이지 수
 * @param {function} onPageChange - 페이지 변경 콜백 함수
 * @param {boolean} showPageInfo - 페이지 정보 표시 여부 (기본: true)
 */
const Pagination = ({
                        currentPage = 0,
                        totalPages = 1,
                        onPageChange,
                        showPageInfo = true
                    }) => {
    // 페이지가 1개 이하면 렌더링하지 않음
    if (totalPages <= 1) return null;

    // 페이지 번호 배열 생성
    const getPageNumbers = () => {
        const delta = 2;
        const range = [];
        const withDots = [];
        let last;

        range.push(0);
        for (let i = currentPage - delta; i <= currentPage + delta; i++) {
            if (i > 0 && i < totalPages - 1) range.push(i);
        }
        if (totalPages > 1) range.push(totalPages - 1);

        for (let i of range) {
            if (last !== undefined) {
                if (i - last === 2) withDots.push(last + 1);
                else if (i - last > 1) withDots.push('...');
            }
            withDots.push(i);
            last = i;
        }

        return withDots.filter(i => i === '...' || (i >= 0 && i < totalPages));
    };

    const handlePageChange = (page) => {
        if (page >= 0 && page < totalPages && page !== currentPage) {
            onPageChange(page);
        }
    };

    const pageNumbers = getPageNumbers();

    return (
        <div className="pagination">
            {/* 처음 */}
            <button
                onClick={() => handlePageChange(0)}
                disabled={currentPage === 0}
                className="btn-page"
                title="처음"
            >
                «
            </button>

            {/* 이전 */}
            <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 0}
                className="btn-page"
                title="이전"
            >
                ‹
            </button>

            {/* 페이지 번호들 */}
            {pageNumbers.map((num, idx) =>
                num === '...' ? (
                    <span key={`ellipsis-${idx}`} className="ellipsis">...</span>
                ) : (
                    <button
                        key={num}
                        onClick={() => handlePageChange(num)}
                        className={`btn-page ${num === currentPage ? 'active' : ''}`}
                    >
                        {num + 1}
                    </button>
                )
            )}

            {/* 다음 */}
            <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages - 1}
                className="btn-page"
                title="다음"
            >
                ›
            </button>

            {/* 마지막 */}
            <button
                onClick={() => handlePageChange(totalPages - 1)}
                disabled={currentPage === totalPages - 1}
                className="btn-page"
                title="마지막"
            >
                »
            </button>

            {/* 페이지 정보 */}
            {showPageInfo && (
                <span className="page-info">{currentPage + 1} / {totalPages} 페이지</span>
            )}
        </div>
    );
};

export default Pagination;