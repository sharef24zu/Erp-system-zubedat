import React, { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function App() {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState<any>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');

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
        setError('خطأ في الاتصال: ' + error.message);
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
      <div style={{ minHeight: '100vh', backgroundColor: '#f3f4f6', fontFamily: 'sans-serif', direction: 'rtl', padding: '20px' }}>
        {/* الشريط العلوي */}
        <header style={{ backgroundColor: '#fff', padding: '15px 20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div>
            <h1 style={{ margin: 0, fontSize: '20px', color: '#1f2937' }}>نظام إدارة الأسطول والمعدات</h1>
            <span style={{ fontSize: '14px', color: '#6b7280' }}>مرحباً بك، <b>{user.full_name}</b> ({user.role})</span>
          </div>
          <button 
            onClick={() => setUser(null)}
            style={{ backgroundColor: '#ef4444', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}
          >
            تسجيل الخروج
          </button>
        </header>

        {/* أزرار التنقل */}
        <nav style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
          <button onClick={() => setActiveTab('dashboard')} style={{ padding: '10px 20px', borderRadius: '6px', border: 'none', cursor: 'pointer', backgroundColor: activeTab === 'dashboard' ? '#2563eb' : '#fff', color: activeTab === 'dashboard' ? '#fff' : '#374151', fontWeight: 'bold' }}>الرئيسية</button>
          <button onClick={() => setActiveTab('equipment')} style={{ padding: '10px 20px', borderRadius: '6px', border: 'none', cursor: 'pointer', backgroundColor: activeTab === 'equipment' ? '#2563eb' : '#fff', color: activeTab === 'equipment' ? '#fff' : '#374151', fontWeight: 'bold' }}>المعدات</button>
          <button onClick={() => setActiveTab('work_orders')} style={{ padding: '10px 20px', borderRadius: '6px', border: 'none', cursor: 'pointer', backgroundColor: activeTab === 'work_orders' ? '#2563eb' : '#fff', color: activeTab === 'work_orders' ? '#fff' : '#374151', fontWeight: 'bold' }}>أوامر العمل</button>
        </nav>

        {/* البطاقات الإحصائية */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px', marginBottom: '20px' }}>
          <div style={{ backgroundColor: '#fff', padding: '15px', borderRadius: '8px', borderRight: '4px solid #3b82f6', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            <span style={{ color: '#6b7280', fontSize: '14px' }}>إجمالي المعدات</span>
            <h2 style={{ margin: '5px 0 0 0', color: '#111827' }}>12</h2>
          </div>
          <div style={{ backgroundColor: '#fff', padding: '15px', borderRadius: '8px', borderRight: '4px solid #10b981', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            <span style={{ color: '#6b7280', fontSize: '14px' }}>المعدات النشطة</span>
            <h2 style={{ margin: '5px 0 0 0', color: '#111827' }}>9</h2>
          </div>
          <div style={{ backgroundColor: '#fff', padding: '15px', borderRadius: '8px', borderRight: '4px solid #f59e0b', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            <span style={{ color: '#6b7280', fontSize: '14px' }}>طلبات الصيانة</span>
            <h2 style={{ margin: '5px 0 0 0', color: '#111827' }}>3</h2>
          </div>
        </div>

        {/* جدول المحتوى */}
        <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <h3 style={{ marginTop: 0, color: '#374151' }}>قائمة المعدات الحالية</h3>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'right' }}>
            <thead>
              <tr style={{ backgroundColor: '#f9fafb', borderBottom: '2px solid #e5e7eb' }}>
                <th style={{ padding: '10px' }}>اسم المعدة</th>
                <th style={{ padding: '10px' }}>النوع</th>
                <th style={{ padding: '10px' }}>الحالة</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                <td style={{ padding: '10px' }}>حفارة CAT 320</td>
                <td style={{ padding: '10px' }}>حفارات</td>
                <td style={{ padding: '10px' }}><span style={{ backgroundColor: '#d1fae5', color: '#065f46', padding: '2px 8px', borderRadius: '4px', fontSize: '12px' }}>نشط</span></td>
              </tr>
              <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                <td style={{ padding: '10px' }}>شاحنة مرسيدس اكتروس</td>
                <td style={{ padding: '10px' }}>شاحنات نقل</td>
                <td style={{ padding: '10px' }}><span style={{ backgroundColor: '#fef3c7', color: '#92400e', padding: '2px 8px', borderRadius: '4px', fontSize: '12px' }}>صيانة</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f3f4f6', fontFamily: 'sans-serif', direction: 'rtl' }}>
      <form onSubmit={handleLogin} style={{ border: '1px solid #e5e7eb', padding: 25, borderRadius: 10, width: 320, backgroundColor: '#fff', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
        <h2 style={{ marginTop: 0, textAlign: 'center', color: '#1f2937' }}>تسجيل الدخول للنظام</h2>
        {error && <p style={{ color: '#ef4444', fontSize: 14, backgroundColor: '#fee2e2', padding: '8px', borderRadius: '4px' }}>{error}</p>}
        <div style={{ marginBottom: 15 }}>
          <label style={{ fontSize: '14px', color: '#4b5563' }}>اسم المستخدم:</label>
          <input 
            type="text" 
            value={userId} 
            onChange={(e) => setUserId(e.target.value)} 
            style={{ width: '100%', padding: '10px', marginTop: 5, boxSizing: 'border-box', border: '1px solid #d1d5db', borderRadius: '6px' }} 
            required 
          />
        </div>
        <div style={{ marginBottom: 20 }}>
          <label style={{ fontSize: '14px', color: '#4b5563' }}>كلمة المرور:</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            style={{ width: '100%', padding: '10px', marginTop: 5, boxSizing: 'border-box', border: '1px solid #d1d5db', borderRadius: '6px' }} 
            required 
          />
        </div>
        <button 
          type="submit" 
          disabled={loading}
          style={{ width: '100%', padding: 12, backgroundColor: '#2563eb', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer', fontWeight: 'bold' }}
        >
          {loading ? 'جاري التحقق...' : 'دخول'}
        </button>
      </form>
    </div>
  );
}
