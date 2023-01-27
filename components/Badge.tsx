import React from 'react';
import { BooksStatus } from '@/types/Book'

export const Badge = ({status, className}: {status: BooksStatus | string; className?: string}) => {
    return (
        <div className={`badge-${status.toString().toLowerCase()} px-2 inline-flex text-sm font-medium rounded-full ${className}`}>
            {status.toString().toUpperCase()}
        </div>
    );
};
