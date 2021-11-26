import React from 'react';
import { BooksStatus } from '../types/Book'
import {useTranslation} from "next-i18next";

export const Badge = ({status, className}: {status: BooksStatus | string; className?: string}) => {
    const { t, i18n } = useTranslation("common");
    return (
        <div className={`badge-${status.toString().toLowerCase()} px-2 inline-flex text-sm font-medium rounded-full ${className}`}>
            {t(`${status.toString().toUpperCase()}`)}
        </div>
    );
};
