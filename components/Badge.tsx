import React from 'react';

enum BooksStatus {
    HOLD,
    OPEN,
    SWAPPING,
    EXTRACTED
}

type BadgeProps ={
    status: BooksStatus
}

const Badge = ({status}: BadgeProps) => {
    return (
        <div className={`badge-${status.toString().toLowerCase()} px-5 py-1.5 text-white rounded-full max-w-min`}>
            {status}
        </div>
    );
};

export default Badge;