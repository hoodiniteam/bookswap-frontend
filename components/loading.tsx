import Head from "next/head";
import React from "react";

export const Loading = () => {
    return (
        <div className="fixed left-0 top-0 w-screen h-screen bg-white flex items-center justify-center">
            <p className="font-medium text-lg">Loading ...</p>
        </div>
    )
}
