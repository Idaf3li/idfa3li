'use client'
import { useState } from 'react'

// السقوف بس - بدون تغيير الواجهة
const LIMITS: any = {
  "كهرباء": 200,
  "مياه": 35,
  "دواء": 100,
  "علاج": 300,
  "متعثر": 300,
  "قسط طالب": 500,
  "أخرى": 200,
};

const cases = [
  { id: 1, cat: 'كهرباء', title: 'فاتورة كهرباء لعائلة من الأردن', story: 'عائلة محتاجة، تراكم عليها فاتورة الكهرباء، وبحاجة لمساعدة عاجلة قبل الفصل.', need: 85, city: 'جبل الحسين' },
  { id: 2, cat: 'مياه', title: 'فاتورة مياه لبيت صغير', story: 'فاتورة مياه متأخرة، وبحاجة لمساعدة سريعة.', need: 30, city: 'النزهة' },
  { id: 3, cat: 'دواء', title: 'دواء لعلاج شهري', story: 'مريض بحاجة لدواء شهري، وما بقدر يشتريه هاد الشهر.', need: 60, city: 'الأشرفية' },
  { id: 4, cat: 'كهرباء', title: 'فاتورة كهرباء لأسرة من 5 أفراد', story: 'أسرة وضعها صعب، وفاتورة الكهرباء تراكمت عليهم.', need: 120, city: 'جبل الحسين' },
];

export default function Home() {
  const [filter, setFilter] = useState('الكل')
  const [showForm, setShowForm] = useState(false)
  const [sent, setSent] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [form, setForm] = useState({ name: '', phone: '', type: 'كهرباء', amount: '', desc: '', city: 'جبل الحسين', subNumber: '' })

  const filtered = filter === 'الكل' ? cases : cases.filter(c => c.cat === filter)
  const currentLimit = LIMITS[form.type] || 200

  const handleSubmit = (e: any) => {
    e.preventDefault()
    setErrorMsg('')
    const amt = Number(form.amount)
    const limit = LIMITS[form.type] || 200
    if (!form.name || !form.phone || !form.amount) { setErrorMsg('عبي كل الحقول المطلوبة'); return }
    if (amt <= 0) { setErrorMsg('حط مبلغ صحيح'); return }
    if (amt > limit) { setErrorMsg(`عذراً، الحد الأقصى لفاتورة ${form.type} هو ${limit} دينار`); return }
    setSent(true)
  }

  return (
    <main style={{ maxWidth: '1100px', margin: '0 auto', padding: '20px', fontFamily: 'sans-serif', direction: 'rtl', background: '#f8f7f2', minHeight: '100vh' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 0' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 900, color: '#111' }}>ادفعلي ❤️</h1>
        <span style={{ fontSize: '13px', background: 'white', padding: '6px 12px', borderRadius: '20px', border: '1px solid #ddd' }}>منصة خيرية من أهل الأردن لأهل الأردن</span>
      </header>

      <section style={{ textAlign: 'center', padding: '60px 20px', background: 'linear-gradient(180deg, #0B4F3A 0%, #0F766E 100%)', borderRadius: '20px', color: 'white' }}>
        <h2 style={{ fontSize: '38px', lineHeight: '1.4', fontWeight: 900 }}>منصة خيرية من أهل الأردن...<br />لأهل الأردن</h2>
        <p style={{ opacity: 0.9, marginTop: '10px' }}>بدون وسيط مالي، دفع مباشر، خصوصية تامة، تحقق من كل فاتورة</p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginTop: '25px', flexWrap: 'wrap' }}>
          <button onClick={() => { setShowForm(false); window.scrollTo({ top: 650, behavior: 'smooth' }) }} style={{ padding: '14px 28px', borderRadius: '12px', border: 'none', background: '#C1272D', color: 'white', fontWeight: 800, fontSize: '16px', cursor: 'pointer' }}>سأتكفل بفاتورة</button>
          <button onClick={() => { setShowForm(true); setSent(false) }} style={{ padding: '14px 28px', borderRadius: '12px', border: 'none', background: 'white', color: '#333', fontWeight: 800, fontSize: '16px', cursor: 'pointer' }}>عندي فاتورة محتاج مساعدة فيها</button>
        </div>
      </section>

      <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', marginTop: '25px', textAlign: 'center' }}>
        <div><div style={{ fontSize: '26px' }}>📤</div><b>1. ارفع فاتورتك</b><p style={{ color: '#888', fontSize: '12px' }}>بسرية تامة</p></div>
        <div><div style={{ fontSize: '26px' }}>🔍</div><b>2. الإدارة تراجع فاتورتك</b><p style={{ color: '#888', fontSize: '12px' }}>تحقق من كل فاتورة</p></div>
        <div><div style={{ fontSize: '26px' }}>❤️</div><b>3. متبرع يدفع مباشرة للشركة</b><p style={{ color: '#888', fontSize: '12px' }}>بدون وسيط مالي</p></div>
      </section>

      {showForm && (
        <section style={{ background: 'white', padding: '25px', borderRadius: '16px', marginTop: '20px' }}>
          {sent ? (
            <div style={{ textAlign: 'center', padding: '20px' }}><div style={{ fontSize: '50px' }}>✅</div><h3>تم استلام طلبك</h3><p style={{ color: '#666' }}>الإدارة رح تراجع فاتورتك، واذا انقبلت رح تنزل على الموقع بسرية تامة.</p><button onClick={() => { setShowForm(false); setSent(false) }} style={{ marginTop: '15px', padding: '10px 20px', borderRadius: '10px', border: 'none', background: '#0B4F3A', color: 'white', cursor: 'pointer' }}>رجوع</button></div>
          ) : (
            <form onSubmit={handleSubmit}>
              <h3 style={{ marginBottom: '15px' }}>ارفع فاتورتك</h3>
              {errorMsg && <div style={{ background: '#ffe3e3', color: '#C1272D', padding: '12px', borderRadius: '10px', marginBottom: '15px', fontWeight: 700 }}>{errorMsg}</div>}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <input placeholder="الاسم الأول فقط" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} style={{ padding: '12px', borderRadius: '10px', border: '1px solid #ddd' }} />
                <input placeholder="رقم الواتساب" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} style={{ padding: '12px', borderRadius: '10px', border: '1px solid #ddd' }} />
                <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })} style={{ padding: '12px', borderRadius: '10px', border: '1px solid #ddd' }}>
                  <option>كهرباء</option><option>مياه</option><option>دواء</option><option>علاج</option><option>متعثر</option><option>قسط طالب</option><option>أخرى</option>
                </select>
                <select value={form.city} onChange={e => setForm({ ...form, city: e.target.value })} style={{ padding: '12px', borderRadius: '10px', border: '1px solid #ddd' }}>
                  <option>جبل الحسين</option><option>النزهة</option><option>الأشرفية</option><option>جبل النصر</option><option>ماركا</option><option>أخرى</option>
                </select>
                <input placeholder={`مبلغ الفاتورة - الحد الأقصى ${currentLimit} دينار`} type="number" value={form.amount} onChange={e => setForm({ ...form, amount: e.target.value })} style={{ padding: '12px', borderRadius: '10px', border: '1px solid #ddd' }} />
                <input placeholder="رقم الاشتراك / رقم الفاتورة" value={form.subNumber} onChange={e => setForm({ ...form, subNumber: e.target.value })} style={{ padding: '12px', borderRadius: '10px', border: '1px solid #ddd' }} />
              </div>
              <textarea placeholder="نبذة قصيرة عن حالتك (بدون أسماء)" value={form.desc} onChange={e => setForm({ ...form, desc: e.target.value })} style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #ddd', marginTop: '12px', minHeight: '80px' }} />
              <p style={{ fontSize: '12px', color: '#888', marginTop: '8px' }}>بالضغط على إرسال، أنت تقر أن المعلومات صحيحة، وأن الفاتورة حقيقية.</p>
              <button type="submit" style={{ width: '100%', padding: '14px', borderRadius: '12px', border: 'none', background: '#0B4F3A', color: 'white', fontWeight: 800, fontSize: '16px', marginTop: '10px', cursor: 'pointer' }}>إرسال للمراجعة</button>
            </form>
          )}
        </section>
      )}

      <section style={{ marginTop: '30px' }}>
        <h3>فواتير بانتظار أهل الخير</h3>
        <div style={{ display: 'flex', gap: '8px', margin: '15px 0', flexWrap: 'wrap' }}>
          {['الكل', 'كهرباء', 'مياه', 'دواء', 'علاج', 'متعثر', 'قسط طالب'].map(f => (
            <button key={f} onClick={() => setFilter(f)} style={{ padding: '8px 16px', borderRadius: '20px', border: '1px solid #ddd', background: filter === f ? '#0B4F3A' : 'white', color: filter === f ? 'white' : '#333', cursor: 'pointer' }}>{f}</button>
          ))}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
          {filtered.map(c => (
            <div key={c.id} style={{ background: 'white', padding: '20px', borderRadius: '16px' }}>
              <span style={{ background: '#e8f5ee', color: '#0B4F3A', padding: '4px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: 700 }}>{c.cat}</span>
              <h4 style={{ margin: '10px 0 5px' }}>{c.title}</h4>
              <p style={{ color: '#666', fontSize: '13px', lineHeight: '1.6' }}>{c.story}</p>
              <p style={{ fontSize: '13px', color: '#888' }}>📍 {c.city} • 💰 {c.need} دينار</p>
              <button style={{ width: '100%', padding: '12px', borderRadius: '10px', border: 'none', background: '#C1272D', color: 'white', fontWeight: 800, marginTop: '10px', cursor: 'pointer' }}>سأتكفل بهذه الفاتورة</button>
            </div>
          ))}
        </div>
      </section>
      <footer style={{ textAlign: 'center', padding: '30px 0', color: '#888', fontSize: '13px' }}>© 2026 ادفعلي - جميع الحقوق محفوظة • خصوصية تامة</footer>
    </main>
  )
}
