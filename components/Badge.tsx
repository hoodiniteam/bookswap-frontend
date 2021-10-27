import React from 'react';
import { BooksStatus } from '../types/Book'
import {useTranslation} from "next-i18next";

export const Badge = ({status}: {status: BooksStatus}) => {
    const { t, i18n } = useTranslation("common");
    return (
        <div className={`badge-${status.toString().toLowerCase()} px-5 py-1.5 text-white rounded-full max-w-min`}>
            {t(`${status.toString().toUpperCase()}`)}
        </div>
    );
};
