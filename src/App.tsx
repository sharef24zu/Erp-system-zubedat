import React, { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

// إنشاء اتصال Supabase باستخدام متغيّرات Vercel المباشرة
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function App() {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState<any>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      const { data, error } = await supabase
        .from('system_users')
        .select('*')
        .eq('user_id', userId)
        .eq('password_hash', password)
        .maybeSingle();

      if (error) {
        setError('خطأ في الاتصال بقاعدة البيانات: ' + error.message);
      } else if (!data) {
        setError('اسم المستخدم أو كلمة المرور غير صحيحة');
      } else {
        setUser(data);
      }
    } catch (err: any) {
      setError('حدث خطأ غير متوقع: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  if (user) {
    return (
      <div style={{ padding: 20, fontFamily: 'sans-serif', direction: 'rtl' }}>
        <h1>مرحباً بك، {user.full_name}</h1>
        <p>الصلاحية: {user.role}</p>
        <button 
          onClick={() => setUser(null)}
          style={{ padding: '8px 16px', background: '#e53e3e', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer' }}
        >
          تسجيل الخروج
        </button>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', fontFamily: 'sans-serif', direction: 'rtl' }}>
      <form onSubmit={handleLogin} style={{ border: '1px solid #ccc', padding: 20, borderRadius: 8, width: 300, background: '#fff' }}>
        <h2 style={{ marginTop: 0 }}>تسجيل الدخول للنظام</h2>
        {error && <p style={{ color: 'red', fontSize: 14 }}>{error}</p>}
        <div style={{ marginBottom: 10 }}>
          <label>اسم المستخدم:</label>
          <input 
            type="text" 
            value={userId} 
            onChange={(e) => setUserId(e.target.value)} 
            style={{ width: '100%', padding: 8, marginTop: 5, boxSizing: 'border-box' }} 
            required 
          />
        </div>
        <div style={{ marginBottom: 10 }}>
          <label>كلمة المرور:</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            style={{ width: '100%', padding: 8, marginTop: 5, boxSizing: 'border-box' }} 
            required 
          />
        </div>
        <button 
          type="submit" 
          disabled={loading}
          style={{ width: '100%', padding: 10, background: '#0070f3', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer' }}
        >
          {loading ? 'جاري التحقق...' : 'دخول'}
        </button>
      </form>
    </div>
  );
}
