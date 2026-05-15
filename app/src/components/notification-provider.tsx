"use client";

import React, { createContext, useContext, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, AlertCircle, Info, Bell } from 'lucide-react';

type NotificationType = 'success' | 'error' | 'info' | 'warning';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
}

interface NotificationContextType {
  notify: (title: string, message: string, type?: NotificationType) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const notify = useCallback((title: string, message: string, type: NotificationType = 'info') => {
    const id = Math.random().toString(36).substring(2, 9);
    setNotifications((prev) => [...prev, { id, title, message, type }]);
    
    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    }, 5000);
  }, []);

  const remove = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <NotificationContext.Provider value={{ notify }}>
      {children}
      <div style={{
        position: 'fixed', bottom: 24, right: 24, zIndex: 9999,
        display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 360, width: '100%',
      }}>
        <AnimatePresence>
          {notifications.map((n) => (
            <motion.div
              key={n.id}
              initial={{ opacity: 0, x: 20, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
              className="glass-strong"
              style={{
                padding: '16px 20px', borderRadius: 'var(--radius-lg)',
                boxShadow: 'var(--shadow-lg)', display: 'flex', gap: 14,
                position: 'relative', overflow: 'hidden',
              }}
            >
              <div style={{
                width: 32, height: 32, borderRadius: 'var(--radius-full)',
                background: n.type === 'success' ? 'var(--success-bg)' : 
                            n.type === 'error' ? 'var(--error-bg)' : 
                            n.type === 'warning' ? 'var(--warning-bg)' : 'var(--info-bg)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              }}>
                {n.type === 'success' && <CheckCircle2 size={18} style={{ color: 'var(--success)' }} />}
                {n.type === 'error' && <AlertCircle size={18} style={{ color: 'var(--error)' }} />}
                {n.type === 'warning' && <AlertCircle size={18} style={{ color: 'var(--warning)' }} />}
                {n.type === 'info' && <Info size={18} style={{ color: 'var(--info)' }} />}
              </div>
              
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 2 }}>{n.title}</div>
                <div style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.4 }}>{n.message}</div>
              </div>
              
              <button onClick={() => remove(n.id)} style={{
                background: 'transparent', border: 'none', cursor: 'pointer',
                color: 'var(--text-muted)', padding: 4, height: 'fit-content',
              }}>
                <X size={16} />
              </button>
              
              {/* Progress bar */}
              <motion.div
                initial={{ width: '100%' }}
                animate={{ width: 0 }}
                transition={{ duration: 5, ease: 'linear' }}
                style={{
                  position: 'absolute', bottom: 0, left: 0, height: 3,
                  background: n.type === 'success' ? 'var(--success)' : 
                              n.type === 'error' ? 'var(--error)' : 
                              n.type === 'warning' ? 'var(--warning)' : 'var(--info)',
                  opacity: 0.5,
                }}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </NotificationContext.Provider>
  );
};

export const useNotify = () => {
  const context = useContext(NotificationContext);
  if (!context) throw new Error('useNotify must be used within NotificationProvider');
  return context;
};
