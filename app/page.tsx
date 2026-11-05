'use client'
import { useState } from 'react'

const cases = [
  { id: 1, cat: 'كهرباء', title: 'فاتورة كهرباء لعائلة من الزرقاء', story: 'أم لثلاثة أطفال، تراكم عليها مبلغ الكهرباء بعد انقطاع دخل زوجها. تريد سداد جزء من الفاتورة لتفادي القطع.', need: 85, city: 'الزرقاء', days: 'منذ يومين' },
  { id: 2, cat: 'مياه', title: 'فاتورة مياه لأب كبير بالسن', story: 'رجل متقاعد يعيش وحده، فاتورة المياه تراكمت عليه بسبب تسريب لم ينتبه له. يحتاج مساعدة عاجلة.', need: 42, city: 'عمان - جبل الحسين', days: 'منذ 5 ساعات' },
  { id: 3, cat: 'دواء', title: 'دواء شهري لطفلة', story: 'طفلة تحتاج دواء شهري لعلاج مزمن، والدها عامل مياومة ودخله لا يكفي لتغطية الدواء والفاتورة معا.', need: 65, city: 'إربد', days: 'منذ ساعة' },
  { id: 4, cat: 'كهرباء', title: 'فاتورة كهرباء لأسرة من الكرك', story: 'أسرة مكونة من 5 أفراد، الأب فقد عمله، والفاتورة مهددة بالقطع قبل الشتاء.', need: 110, city: 'الكرك', days: 'منذ يوم' },
]

export default function Home() {
  const [filter, setFilter] = useState('الكل')
  const [showForm, setShowForm] = useState(false)
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ name: '', phone: '', type: 'كهرباء', amount: '', desc: '' })

  const filtered = filter === 'الكل' ? cases : cases.filter(c => c.cat === filter)

  return (
    <div>
      <header className="header">
        <div className="logo"><i>♥</i> ادفع لي</div>
        <nav className="nav"><a onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>من نحن</a><a href="#cases">الحالات</a><a href="#how">كيف نعمل</a><a href="#faq">الأمان</a><a href="#faq">أسئلة</a></nav>
        <button className="btn btn-red" onClick={() => setShowForm(true)}>ارفع فاتورتك</button>
      </header>

      <section className="hero">
        <span className="pill">● حالات موثّقة 100% - ادفع مباشرة للشركة</span>
        <h1>منصة خيرية من أهل الأردن... لأهل الأردن<br />من نشامى الوطن... لأبناء الوطن</h1>
        <p>تكفّل بفاتورة كهرباء أو مياه أو دواء لعائلة محتاجة، وادفعها بنفسك مباشرة للشركة.<br />لا أموال تمر عبر المنصة.</p>
        <div className="values">تكافل • تراحم • تعاضد • إيثار</div>
        <div className="cta">
          <button className="btn btn-red big" onClick={() => document.getElementById('cases')?.scrollIntoView({ behavior: 'smooth' })}>♥ سأتكفل بفاتورة</button>
          <button className="btn btn-outline big" onClick={() => setShowForm(true)}>عندي فاتورة محتاج مساعدة فيها</button>
        </div>
      </section>

      <div className="trust">
        <div><span>🛡️</span><b>100% موثّقة</b><p>كل حالة يتم التأكد منها قبل النشر</p></div>
        <div><span>💳</span><b>دفع مباشر</b><p>تدفع للشركة مباشرة، بدون وسطاء</p></div>
        <div><span>👁️</span><b>شفافية كاملة</b><p>تشوف الفاتورة قبل ما تدفع</p></div>
        <div><span>❤️</span><b>بدون عمولة</b><p>0% عمولة، كل قرش يوصل لمكانه</p></div>
      </div>

      <section className="section" id="how">
        <div className="card"><h2>كيف نعمل؟ 3 خطوات بسيطة</h2>
          <div className="steps">
            <div><div className="num">1</div><b>اختر حالة</b><p>تصفح الحالات الموثقة واختر اللي حاب تساعد فيها</p></div>
            <div><div className="num">2</div><b>ادفع مباشرة</b><p>ادفع فاتورة الكهرباء أو المياه أو الدواء مباشرة للشركة</p></div>
            <div><div className="num">3</div><b>تأكيد وطمأنينة</b><p>نأكد سداد الفاتورة ونطمن العائلة</p></div>
          </div>
          <p className="values2">تكافل • تراحم • تعاضد • إيثار - قيمّنا اللي بتجمعنا</p>
        </div>
      </section>

      <section className="section" id="cases">
        <h2>حالات تحتاج مساعدتك اليوم</h2>
        <p className="sub">كل حالة موثقة. اختر حالة وادفع فاتورتها مباشرة للشركة.</p>
        <div className="filters">
          {['الكل', 'كهرباء', 'مياه', 'دواء'].map(f => <button key={f} className={filter === f ? 'on' : ''} onClick={() => setFilter(f)}>{f}</button>)}
        </div>
        <div className="grid">
          {filtered.map(c => (
            <div key={c.id} className="case">
              <div className="case-top"><span className="tag">{c.cat}</span><span className="muted">{c.days} • {c.city}</span></div>
              <h3>{c.title}</h3>
              <p className="story">{c.story}</p>
              <div className="row"><span>المبلغ المطلوب</span><span className="price">{c.need} د.أ</span></div>
              <button className="btn btn-red full" onClick={() => alert('شكرا لك! تواصل معنا لإتمام الدفع مباشرة للشركة - رقم الحالة: ' + c.id)}>سأتكفل بهذه الفاتورة ♥</button>
            </div>
          ))}
        </div>
      </section>

      <section className="section" id="faq">
        <div className="card"><h2>ارفع فاتورتك - نوصلك بفاعل خير</h2>
          {!showForm && !sent && <button className="btn btn-red" style={{ marginTop: 16 }} onClick={() => setShowForm(true)}>ابدأ طلب المساعدة</button>}
          {showForm && !sent && (
            <form className="form" style={{ marginTop: 16 }} onSubmit={(e) => { e.preventDefault(); setSent(true) }}>
              <label>الاسم الكامل</label><input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="مثال: أحمد محمد" />
              <label>رقم الهاتف</label><input required value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} placeholder="07XXXXXXXX" />
              <label>نوع الفاتورة</label><select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}><option>كهرباء</option><option>مياه</option><option>دواء</option></select>
              <label>مبلغ الفاتورة (د.أ)</label><input required value={form.amount} onChange={e => setForm({ ...form, amount: e.target.value })} placeholder="مثال: 85" />
              <label>اشرح حالتك باختصار</label><textarea rows={3} value={form.desc} onChange={e => setForm({ ...form, desc: e.target.value })} placeholder="اكتب قصتك هنا..." />
              <button className="btn btn-red full" type="submit">إرسال الطلب</button>
            </form>
          )}
          {sent && <p className="ok">✅ تم استلام طلبك! سنتواصل معك قريبا للتحقق من الفاتورة.</p>}
        </div>
      </section>

      <footer>ادفع لي - منصة خيرية أردنية<br />تكافل • تراحم • تعاضد • إيثار<br />لا أموال تمر عبر المنصة - تدفع مباشرة للشركة</footer>
    </div>
  )
}
