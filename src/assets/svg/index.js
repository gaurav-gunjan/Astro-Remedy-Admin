export const ViewSvg = ({ h = '20', w = '20' }) => {
    return (
        <>
            <svg xmlns="http://www.w3.org/2000/svg" height={h} width={w} viewBox="0 0 24 24"><path fill="currentColor" fillRule="evenodd" d="M20.77 12c0-.359-.194-.594-.582-1.066C18.768 9.21 15.636 6 12 6c-3.636 0-6.768 3.21-8.188 4.934c-.388.472-.582.707-.582 1.066c0 .359.194.594.582 1.066C5.232 14.79 8.364 18 12 18c3.636 0 6.768-3.21 8.188-4.934c.388-.472.582-.707.582-1.066M12 15a3 3 0 1 0 0-6a3 3 0 0 0 0 6" clipRule="evenodd" /></svg>
        </>
    )
}

export const EditSvg = ({ h = '20', w = '20' }) => {
    return (
        <>
            <svg xmlns="http://www.w3.org/2000/svg" height={h} width={w} viewBox="0 0 24 24"><path fill="currentColor" d="M15.891 3.048a3.578 3.578 0 1 1 5.061 5.06l-.892.893L15 3.94zM13.94 5.001L3.94 15a3.1 3.1 0 0 0-.825 1.476L2.02 21.078a.75.75 0 0 0 .904.903l4.601-1.096a3.1 3.1 0 0 0 1.477-.825L19 10.061z" /></svg>
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