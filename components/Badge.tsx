import React from 'react';
import { BooksStatus } from '../types/Book'

const Badge = ({status}: {status: BooksStatus}) => {
    return (
        <div className={`badge-${status.toString().toLowerCase()} px-5 py-1.5 text-white rounded-full max-w-min`}>
            {status}
        </div>
    );
};

export default Badge;
