import React, { useState } from 'react';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  return (
    <div className="min-h-screen bg-gray-100 text-right dir-rtl p-6" dir="rtl">
      {/* Header */}
      <header className="bg-white shadow rounded-lg p-4 mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">نظام إدارة الأسطول والمعدات</h1>
          <p className="text-sm text-gray-500">مرحباً بك، المدير العام (admin)</p>
        </div>
        <button 
          onClick={() => setIsLoggedIn(false)}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm transition"
        >
          تسجيل الخروج
        </button>
      </header>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow border-r-4 border-blue-500">
          <p className="text-gray-500 text-sm">إجمالي المعدات</p>
          <p className="text-2xl font-bold text-gray-800">12</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border-r-4 border-green-500">
          <p className="text-gray-500 text-sm">المعدات النشطة</p>
          <p className="text-2xl font-bold text-gray-800">9</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border-r-4 border-yellow-500">
          <p className="text-gray-500 text-sm">أوامر الصيانة</p>
          <p className="text-2xl font-bold text-gray-800">3</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border-r-4 border-purple-500">
          <p className="text-gray-500 text-sm">سجلات الوقود اليومية</p>
          <p className="text-2xl font-bold text-gray-800">5</p>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-bold mb-4 text-gray-700">قائمة المعدات الرئيسية</h2>
        <table className="w-full text-right border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b">
              <th className="p-3">اسم المعدة</th>
              <th className="p-3">النوع</th>
              <th className="p-3">الحالة</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="p-3 font-medium">حفارة CAT 320</td>
              <td className="p-3">حفارات</td>
              <td className="p-3"><span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">نشط</span></td>
            </tr>
            <tr className="border-b">
              <td className="p-3 font-medium">شاحنة مرسيدس اكتروس</td>
              <td className="p-3">شاحنات نقل</td>
              <td className="p-3"><span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs">صيانة</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
