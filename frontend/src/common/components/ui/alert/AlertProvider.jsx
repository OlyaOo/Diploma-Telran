import React, { useState, useRef, useCallback } from "react";
import { AlertContext } from "./AlertContext";

const AlertProvider = ({ children }) => {
    const [alerts, setAlerts] = useState([]);
    const idRef = useRef(0);

    const showAlert = useCallback((message, type = "success") => {
        const id = ++idRef.current;
        setAlerts(prev => [...prev, { id, type, message }]);

        setTimeout(() => {
            setAlerts(prev => prev.filter(a => a.id !== id));
        }, 5000);
    }, []);

    return (
        <AlertContext.Provider value={{ showAlert }}>
            {children}

            <div
                id="Alert"
                style={{
                    position: "fixed",
                    bottom: 20,
                    right: 20,
                    zIndex: 9999,
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                }}
            >
                {alerts.map(({ id, message, type }) => (
                    <div
                        key={id}
                        className={`alert alert-${type} d-flex align-items-center`}
                        style={{
                            backgroundColor: type === "success" ? "#DAF3A1" : "#F8D7DA",
                            color: "#101B2D",
                            fontFamily: `"Inter Tight", sans-serif`,
                            fontWeight: 500,
                            fontSize: "14px",
                            padding: "12px",
                            borderRadius: "8px",
                            minWidth: "200px",
                            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.05)",
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                        }}
                        role="alert"
                    >
                        {type === "success" ? (
                            <div style={{ display: "flex", alignItems: "center" }}>
                                <svg
                                    width="20"
                                    height="21"
                                    viewBox="0 0 20 21"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M20 10.5C20 16.0228 15.5228 20.5 10 20.5C4.47715 20.5 0 16.0228 0 10.5C0 4.97715 4.47715 0.5 10 0.5C15.5228 0.5 20 4.97715 20 10.5ZM14.0303 7.46967C14.3232 7.76256 14.3232 8.23744 14.0303 8.53033L9.03033 13.5303C8.73744 13.8232 8.26256 13.8232 7.96967 13.5303L5.96967 11.5303C5.67678 11.2374 5.67678 10.7626 5.96967 10.4697C6.26256 10.1768 6.73744 10.1768 7.03033 10.4697L8.5 11.9393L10.7348 9.7045L12.9697 7.46967C13.2626 7.17678 13.7374 7.17678 14.0303 7.46967Z"
                                        fill="#3E4E64"
                                    />
                                </svg>
                            </div>
                        ) : (
                            <div style={{ fontSize: "18px" }}>⛔</div>
                        )}
                        <div className="alertinfo">{message}</div>
                    </div>
                ))}
            </div>
        </AlertContext.Provider>
    );
};

export default AlertProvider;
