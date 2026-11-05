'use client'
import { useState } from 'react'

const initialCases = [
  { name: 'أم محمد', area: 'جبل الحسين', type: 'كهرباء', amount: 68, ref: '123456789', story: 'أرملة وعندي 3 أطفال، فاتورة الكهربا تراكمت عليّ وخايفة تنقطع علينا.' },
  { name: 'أبو أحمد', area: 'النزهة', type: 'دواء', amount: 45, ref: '987654321', story: 'مريض سكري وبحتاج دواء شهري، ومش قادر أجيبو هالشهر.' },
  { name: 'س.', area: 'الأشرفية', type: 'قسط جامعي', amount: 180, ref: '555444333', story: 'طالبة جامعة سنة أخيرة، باقي علي قسط ومش قادرة أكمل بدونو.' },
]

export default function Home() {
  const [page, setPage] = useState<'home'|'cases'|'add'>('home')
  const [cases, setCases] = useState(initialCases)
  const [typeF, setTypeF] = useState('الكل')
  const [areaF, setAreaF] = useState('الكل')
  const [form, setForm] = useState({ name:'', phone:'', area:'جبل الحسين', type:'كهرباء', amount:'', ref:'', story:'' })
  const [msg, setMsg] = useState('')

  const types = ['الكل','كهرباء','ماء','دواء','قسط جامعي','دين متعثر','أخرى']
  const areas = ['الكل','جبل الحسين','النزهة','الأشرفية','جبل النصر','ماركا','الزرقاء','إربد','الكرك','العقبة']
  const filtered = cases.filter(c => (typeF==='الكل'||c.type===typeF) && (areaF==='الكل'||c.area===areaF))

  const submit = () => {
    if(!form.name || !form.amount || Number(form.amount)>200){ alert('عبي الاسم والمبلغ، والمبلغ 200 أو أقل'); return }
    setCases([{ name: form.name, area: form.area, type: form.type, amount: Number(form.amount), ref: form.ref||'—', story: form.story||'محتاج مساعدة بهذه الفاتورة.' }, ...cases])
    setMsg('تم استلام فاتورتك! الإدارة رح تراجعها وتنشرها.')
  }

  return (
    <div>
      <header className="header">
        <div className="logo">ادفعلي<span>.</span></div>
        <nav className="nav"><a onClick={()=>setPage('home')}>الرئيسية</a><a onClick={()=>setPage('cases')}>الحالات</a><a onClick={()=>setPage('add')}>ارفع فاتورتك</a></nav>
        <button className="btn btn-green" onClick={()=>setPage('cases')}>سأتكفل بفاتورة</button>
      </header>

      {page==='home' && (
        <main>
          <div className="hero">
            <div className="pills"><span className="pill">✓ مجاناً 100% - بدون عمولة</span><span className="pill">✓ بدون وسيط مالي</span><span className="pill">✓ خدمة بلا أرباح</span></div>
            <h1>منصة خيرية من أهل الأردن...<br/><span>لأهل الأردن</span></h1>
            <p>ادفعلي منصة خيرية مجانية بالكامل. الفقير بنزل فاتورتو، والغني بدفعها مباشرة عن طريق إي فواتيركم. <b>المنصة ما بتمسك مصاري أبداً، وما بتاخد عمولة أبداً.</b><br/>الخير بوصّل مباشرة منك لصاحب الفاتورة.</p>
            <div className="cta"><button className="btn btn-green big" onClick={()=>setPage('cases')}>سأتكفل بفاتورة ❤️</button><button className="btn btn-orange big" onClick={()=>setPage('add')}>عندي فاتورة محتاج مساعدة</button></div>
          </div>
          <div className="trust">
            <div><b>🛡️ بدون وسيط مالي</b><p>ادفع مباشرة للشركة عبر إي فواتيركم، المصاري ما بتمر علينا.</p></div>
            <div><b>🔒 خصوصية تامة</b><p>الاسم الأول فقط، بدون كشف هوية، وبدون إحراج.</p></div>
            <div><b>✅ تحقق من كل فاتورة</b><p>الإدارة تراجع كل فاتورة وصورتها قبل النشر.</p></div>
          </div>
          <div className="how"><div className="card"><h2>كيف نعمل؟</h2><div className="steps">
            <div><div className="num">1</div><b>ارفع فاتورتك</b><p>ارفع فاتورة كهرباء، ماء، دواء، قسط جامعي، دين متعثر أو أخرى.</p></div>
            <div><div className="num">2</div><b>الإدارة تراجع فاتورتك</b><p>نتأكد من صحة الفاتورة وننشرها بدون اسمك الكامل.</p></div>
            <div><div className="num">3</div><b>متبرع يدفع مباشرة للشركة</b><p>المتبرع بدفع عن طريق إي فواتيركم برقم الاشتراك، وانت بتوصلك رسالة.</p></div>
          </div></div></div>
        </main>
      )}

      {page==='cases' && (
        <div className="section"><h2>فواتير بانتظار أهل الخير</h2><p className="sub">اختار فاتورة، ادفعها مباشرة عن طريق إي فواتيركم.</p>
          <div className="filters">{types.map(t=><button key={t} className={typeF===t?'on':''} onClick={()=>setTypeF(t)}>{t}</button>)}</div>
          <div className="filters">{areas.map(a=><button key={a} className={areaF===a?'on':''} onClick={()=>setAreaF(a)}>{a}</button>)}</div>
          <div className="grid">{filtered.map((c,i)=>(
            <div key={i} className="case"><div className="case-top"><span className="tag">{c.type}</span><span className="muted">{c.area}</span></div>
            <h3>فاتورة {c.type} - {c.name}</h3><p className="story">{c.story}</p>
            <div className="row"><span>رقم الاشتراك: <b>{c.ref}</b></span><span className="price">{c.amount} د.أ</span></div>
            <button className="btn btn-green full" onClick={()=>alert(`ادفع عبر إي فواتيركم برقم: ${c.ref} - المبلغ: ${c.amount} دينار`)}>سأتكفل بهذه الفاتورة ❤️</button></div>
          ))}</div>
        </div>
      )}

      {page==='add' && (
        <div className="section"><div className="card form">
          <h2>ارفع فاتورتك</h2><p className="sub">مجاني 100% - بدون عمولة. الإدارة بتراجع فاتورتك قبل النشر. الحد الأقصى 200 دينار.</p>
          <label>الاسم الأول فقط *</label><input placeholder="مثال: أحمد" onChange={e=>setForm({...form,name:e.target.value})} />
          <label>رقم الواتساب *</label><input placeholder="07XXXXXXXX" onChange={e=>setForm({...form,phone:e.target.value})} />
          <label>الحي / المدينة *</label><select onChange={e=>setForm({...form,area:e.target.value})}>{areas.slice(1).map(a=><option key={a}>{a}</option>)}</select>
          <label>نوع الفاتورة *</label><select onChange={e=>setForm({...form,type:e.target.value})}>{types.slice(1).map(t=><option key={t}>{t}</option>)}</select>
          <label>مبلغ الفاتورة (دينار) - حد أقصى 200 *</label><input type="number" placeholder="مثال: 85" onChange={e=>setForm({...form,amount:e.target.value})} />
          <label>رقم الاشتراك / رقم الفاتورة (لإي فواتيركم) *</label><input placeholder="الرقم اللي المتبرع رح يدفع عليه" onChange={e=>setForm({...form,ref:e.target.value})} />
          <label>نبذة قصيرة عن وضعك *</label><textarea rows={3} placeholder="احكي باختصار ليش مش قادر تدفع..." onChange={e=>setForm({...form,story:e.target.value})} />
          <button className="btn btn-green full big" onClick={submit}>أرسل فاتورتي للمراجعة</button>
          <p className="ok">{msg}</p>
        </div></div>
      )}
      <footer>ادفعلي - خدمة خيرية بلا أرباح - مجاناً بالكامل - بدون عمولة<br/>الدفع مباشرة عبر إي فواتيركم، المنصة لا تستلم أي مبلغ</footer>
    </div>
  )
}
