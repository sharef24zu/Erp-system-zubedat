import React, { useState } from 'react';
import { supabase } from './supabaseClient';

export default function App() {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState<any>(null);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    const { data, error } = await supabase
      .from('system_users')
      .select('*')
      .eq('user_id', userId)
      .eq('password_hash', password)
      .single();

    if (error || !data) {
      setError('اسم المستخدم أو كلمة المرور غير صحيحة');
    } else {
      setUser(data);
    }
  };

  if (user) {
    return (
      <div style={{ padding: 20, fontFamily: 'sans-serif', direction: 'rtl' }}>
        <h1>مرحباً بك، {user.full_name}</h1>
        <p>الصلاحية: {user.role}</p>
        <button onClick={() => setUser(null)}>تسجيل الخروج</button>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', fontFamily: 'sans-serif', direction: 'rtl' }}>
      <form onSubmit={handleLogin} style={{ border: '1px solid #ccc', padding: 20, borderRadius: 8, width: 300 }}>
        <h2>تسجيل الدخول للنظام</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <div style={{ marginBottom: 10 }}>
          <label>اسم المستخدم:</label>
          <input type="text" value={userId} onChange={(e) => setUserId(e.target.value)} style={{ width: '100%', padding: 8, marginTop: 5 }} required />
        </div>
        <div style={{ marginBottom: 10 }}>
          <label>كلمة المرور:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} style={{ width: '100%', padding: 8, marginTop: 5 }} required />
        </div>
        <button type="submit" style={{ width: '100%', padding: 10, background: '#0070f3', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer' }}>دخول</button>
      </form>
    </div>
  );
}
