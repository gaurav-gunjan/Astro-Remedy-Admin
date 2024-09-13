export const ViewSvg = ({ h = '20', w = '20' }) => {
    return (
        <>
            <svg xmlns="http://www.w3.org/2000/svg" height={h} width={w} viewBox="0 0 24 24"><path fill="currentColor" d="m12 20.05l-7-4.025v-8.05l7-4.025l7 4.025v8.05zm-1-2.875v-4.6L7 10.25v4.625zm2 0l4-2.3V10.25l-4 2.325zM2 7V2h5v2H4v3zm5 15H2v-5h2v3h3zm10 0v-2h3v-3h2v5zm3-15V4h-3V2h5v5zm-8 3.85l3.95-2.325L12 6.25L8.05 8.525zm-1 1.725" /></svg>
        </>
    )
}

export const EditSvg = ({ h = '20', w = '20' }) => {
    return (
        <>
            <svg xmlns="http://www.w3.org/2000/svg" height={h} width={w} viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3"><path d="m16.475 5.408l2.117 2.117m-.756-3.982L12.109 9.27a2.1 2.1 0 0 0-.58 1.082L11 13l2.648-.53c.41-.082.786-.283 1.082-.579l5.727-5.727a1.853 1.853 0 1 0-2.621-2.621" /><path d="M19 15v3a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h3" /></g></svg>
        </>
    )
}

export const DeleteSvg = ({ h = '20', w = '20' }) => {
    return (
        <>
            <svg xmlns="http://www.w3.org/2000/svg" height={h} width={w} viewBox="0 0 24 24"><path fill="currentColor" d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2zM18 4h-2.5l-.71-.71c-.18-.18-.44-.29-.7-.29H9.91c-.26 0-.52.11-.7.29L8.5 4H6c-.55 0-1 .45-1 1s.45 1 1 1h12c.55 0 1-.45 1-1s-.45-1-1-1" /></svg>
        </>
    )
}

export const UploadImageSvg = ({ w = '25', h = '25', color = '#000' }) => {
    return (
        <>
            <svg xmlns="http://www.w3.org/2000/svg" width={w} height={h} viewBox="0 0 24 24"><g fill="none" stroke={color} strokeLinecap="round" strokeWidth="1.5"><path d="M6.286 19C3.919 19 2 17.104 2 14.765c0-2.34 1.919-4.236 4.286-4.236c.284 0 .562.028.83.08m7.265-2.582a5.765 5.765 0 0 1 1.905-.321c.654 0 1.283.109 1.87.309m-11.04 2.594a5.577 5.577 0 0 1-.354-1.962C6.762 5.528 9.32 3 12.476 3c2.94 0 5.361 2.194 5.68 5.015m-11.04 2.594a4.29 4.29 0 0 1 1.55.634m9.49-3.228C20.392 8.78 22 10.881 22 13.353c0 2.707-1.927 4.97-4.5 5.52" /><path strokeLinejoin="round" d="M12 16v6m0-6l2 2m-2-2l-2 2" /></g></svg>
        </>
    )
}

export const CrossSvg = ({ w = '30', h = '30' }) => {
    return (
        <>
            <svg xmlns="http://www.w3.org/2000/svg" width={w} height={h} viewBox="0 0 24 24"><path fill="currentColor" d="m8.4 17l3.6-3.6l3.6 3.6l1.4-1.4l-3.6-3.6L17 8.4L15.6 7L12 10.6L8.4 7L7 8.4l3.6 3.6L7 15.6zm3.6 5q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22" /></svg>
        </>
    )
}

export const DownloadSvg = ({ h = '20', w = '20', color = '#667284' }) => {
    return (
        <>
            <svg xmlns="http://www.w3.org/2000/svg" height={h} width={w} viewBox="0 0 24 24"><g fill="none" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"><path strokeDasharray="14" strokeDashoffset="14" d="M6 19h12"><animate fill="freeze" attributeName="strokeDashoffset" begin="0.5s" dur="0.4s" values="14;0" /></path><path strokeDasharray="18" strokeDashoffset="18" d="M12 4 h2 v6 h2.5 L12 14.5M12 4 h-2 v6 h-2.5 L12 14.5"><animate fill="freeze" attributeName="strokeDashoffset" dur="0.4s" values="18;0" /><animate attributeName="d" calcMode="linear" dur="1.5s" keyTimes="0;0.7;1" repeatCount="indefinite" values="M12 4 h2 v6 h2.5 L12 14.5M12 4 h-2 v6 h-2.5 L12 14.5;M12 4 h2 v3 h2.5 L12 11.5M12 4 h-2 v3 h-2.5 L12 11.5;M12 4 h2 v6 h2.5 L12 14.5M12 4 h-2 v6 h-2.5 L12 14.5" /></path></g></svg>
        </>
    )
}

export const SwitchOnSvg = ({ w = '30', h = '30' }) => {
    return (
        <>
            <svg xmlns="http://www.w3.org/2000/svg" width={w} height={h} viewBox="0 0 24 24"><path fill="green" d="M17 7a5 5 0 0 1 0 10H7A5 5 0 1 1 7 7h10Zm-10 2a3 3 0 1 0 0 6a3 3 0 0 0 0-6Z"><animate fill="freeze" attributeName="d" dur="0.2s" values="M17 7a5 5 0 0 1 0 10H7A5 5 0 1 1 7 7h10Zm-10 2a3 3 0 1 0 0 6a3 3 0 0 0 0-6Z;M17 7a5 5 0 0 1 0 10H7A5 5 0 1 1 7 7h10Zm0 2a3 3 0 1 0 0 6a3 3 0 0 0 0-6Z" /></path></svg>
        </>
    )
}

export const SwitchOffSvg = ({ w = '30', h = '30' }) => {
    return (
        <>
            <svg xmlns="http://www.w3.org/2000/svg" width={w} height={h} viewBox="0 0 24 24"><path fill="red" d="M17 7a5 5 0 0 1 0 10H7A5 5 0 1 1 7 7h10Zm0 2a3 3 0 1 0 0 6a3 3 0 0 0 0-6Z"><animate fill="freeze" attributeName="d" dur="0.2s" values="M17 7a5 5 0 0 1 0 10H7A5 5 0 1 1 7 7h10Zm0 2a3 3 0 1 0 0 6a3 3 0 0 0 0-6Z;M17 7a5 5 0 0 1 0 10H7A5 5 0 1 1 7 7h10Zm-10 2a3 3 0 1 0 0 6a3 3 0 0 0 0-6Z" /></path></svg>
        </>
    )
}