"use client";
import { useState, useEffect } from "react";

const OLIVE = "#0E3B2E";
const RED = "#D92D20";
const BLUE = "#2563EB";
const FONT = "Tahoma, Arial, sans-serif";

const cases = [
  { title: "كهرباء", icon: "⚡", bg: "#FFF7CC", color: "#B45309", limit: "حتى 200 دينار", desc: "فاتورة كهرباء", payType: "دفع كامل" },
  { title: "مياه", icon: "💧", bg: "#DBEAFE", color: "#1D4ED8", limit: "حتى 35 دينار", desc: "فاتورة مياه", payType: "دفع كامل" },
  { title: "دواء", icon: "💊", bg: "#FCE7F3", color: "#BE185D", limit: "حتى 100 دينار", desc: "يشمل حليب أطفال وحفاضات - فاتورة صيدلية", payType: "دفع جزئي مسموح" },
  { title: "علاج", icon: "🏥", bg: "#DCFCE7", color: "#15803D", limit: "حتى 300 دينار", desc: "تكاليف علاج وعمليات - تقرير طبي", payType: "دفع جزئي مسموح" },
  { title: "متعثر", icon: "🤝", bg: "#FEF3C7", color: "#92400E", limit: "حتى 300 دينار", desc: "مساعدة لمتعثر مالي - إثبات تعثر", payType: "دفع جزئي مسموح" },
  { title: "قسط طالب", icon: "🎓", bg: "#E0E7FF", color: "#4338CA", limit: "حتى 500 دينار", desc: "قسط جامعة أو مدرسة - وصل القسط", payType: "دفع جزئي مسموح" },
  { title: "إيجار منزل", icon: "🏠", bg: "#FFEDD5", color: "#C2410C", limit: "حتى 250 دينار", desc: "إيجار منزل لعائلة محتاجة - عقد إيجار مصدق", payType: "دفع جزئي مسموح" },
  { title: "حالة أخرى", icon: "📄", bg: "#F3F4F6", color: "#374151", limit: "يتم تحديدها بعد المراجعة", desc: "لديك حالة غير مذكورة؟ ارفع فاتورتك واشرح حالتك، وسيتم مراجعتها والموافقة عليها أو رفضها", payType: "دفع جزئي مسموح" },
];

const faqs = [
  { q: "كيف أتكفل بفاتورة؟", a: "اختر الحالة، وستبدأ الساعة الرملية لمدة خمس عشرة دقيقة، وادفع بنفسك مباشرة للجهة المستحقة عبر إي فواتيركم أو البنك، لا تمر أي أموال عبر المنصة." },
  { q: "كيف يتم الدفع؟", a: "الكهرباء والمياه: دفع كامل. باقي الحالات: دفع جزئي مسموح. يتم الدفع مباشرة من المتكفل للجهة المستحقة، من خلال إي فواتيركم أو عبر البنوك المعتمدة." },
  { q: "كيف تتأكدون من أحقية الحالة؟", a: "يتم التحقق من كل حالة من خلال المستندات الرسمية: فاتورة، تقرير طبي، عقد إيجار، أو وصل قسط، ويتم التأكد من صحتها قبل النشر." },
  { q: "حالتي غير موجودة ضمن الحالات، ماذا أفعل؟", a: "اختر حالة أخرى، ارفع فاتورتك واشرح حالتك، وسيتم مراجعتها والموافقة عليها أو رفضها حسب الشروط." },
  { q: "لدي فاتورة، كيف أرفعها؟", a: "اضغط على زر ارفع فاتورتك في الأعلى، وعبئ الخانات كاملة: الاسم الأول، رقم واتسابه، الحي، نوع الفاتورة، المبلغ، رقم الاشتراك، صورة الفاتورة، وخانة اكتب قصتك." },
  { q: "من يطلع على الفاتورة؟", a: "يطلع عليها فقط فريق التحقق والمتكفل الذي اختار الحالة. لا يتم عرض الفاتورة للعامة أبدا." },
  { q: "تم حظر رقمي، ماذا أفعل؟", a: "ادخل إلى خانة طلب فك الحظر في الأسفل، اكتب رقم واتسابه وسبب الطلب، وسيتم مراجعته من قبل المدير، وهو وحده من يقرر القبول أو الرفض." },
];

export default function Home() {
  const [selected, setSelected] = useState<any>(null);
  const [active, setActive] = useState("home");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [reservedCase, setReservedCase] = useState<any>(null);
  const [timeLeft, setTimeLeft] = useState(900);
  const [showAdmin, setShowAdmin] = useState(false);
  const [unblockPhone, setUnblockPhone] = useState("");
  const [unblockReason, setUnblockReason] = useState("");
  const [unblockSent, setUnblockSent] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", area: "", type: "كهرباء", amount: "", subNo: "", story: "" });
  const [formSent, setFormSent] = useState(false);

  const go = (id: string) => { setActive(id); document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); };
  const openUpload = () => { go("upload"); };

  useEffect(() => {
    if (!reservedCase) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) { clearInterval(timer); setReservedCase(null); return 900; }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [reservedCase]);

  const formatTime = (s: number) => { const m = Math.floor(s / 60); const sec = s % 60; return `${m}:${sec < 10 ? "0" + sec : sec}`; };
  const startReservation = (c: any) => { setSelected(null); setReservedCase(c); setTimeLeft(900); go("cases"); };
  const cancelReservation = () => { setReservedCase(null); setTimeLeft(900); };

  return (
    <div dir="rtl" style={{ fontFamily: FONT, background: "#fff", minHeight: "100vh" }}>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "15px 30px", background: "white", borderBottom: "1px solid #eee", position: "sticky", top: 0, zIndex: 100 }}>
        <div onClick={() => go("home")} style={{ fontWeight: "bold", fontSize: 24, color: OLIVE, cursor: "pointer", fontFamily: FONT }}>ادفع لي <span style={{ color: RED }}>♥</span></div>
        <nav style={{ display: "flex", gap: 20 }}>
          {[{ id: "about", label: "من نحن" }, { id: "cases", label: "الحالات" }, { id: "how", label: "كيف نعمل" }, { id: "safety", label: "الأمان" }, { id: "faq", label: "أسئلة" }].map((n) => (
            <span key={n.id} onClick={() => go(n.id)} style={{ cursor: "pointer", color: active === n.id ? RED : "#444", fontWeight: active === n.id ? "bold" : "normal", borderBottom: active === n.id ? `2px solid ${RED}` : "none", paddingBottom: 3, fontFamily: FONT }}>{n.label}</span>
          ))}
        </nav>
        <button onClick={openUpload} style={{ background: RED, color: "white", border: "none", padding: "10px 18px", borderRadius: 10, fontWeight: "bold", fontFamily: FONT, cursor: "pointer" }}>ارفع فاتورتك</button>
      </header>

      <section id="home" style={{ background: OLIVE, color: "white", textAlign: "center", padding: "60px 20px" }}>
        <span style={{ background: "rgba(255,255,255,0.15)", padding: "6px 18px", borderRadius: 20, fontSize: 14, fontFamily: FONT }}>ادفع لي</span>
        <h1 style={{ fontSize: 42, lineHeight: 1.4, margin: "20px 0 10px", fontFamily: FONT }}>منصة خيرية من أهل الأردن... لأهل الأردن<br />من نشامى الوطن... لأبناء الوطن</h1>
        <p style={{ opacity: 0.9, fontFamily: FONT }}>تكفل بفاتورة كهرباء أو مياه أو دواء لعائلة محتاجة، وادفعها بنفسك مباشرة للجهة المستحقة عبر إي فواتيركم أو البنك.<br />لا تمر أي أموال عبر المنصة.</p>
        <p style={{ fontWeight: "bold", fontSize: 20, marginTop: 15, fontFamily: FONT }}>تكافل • تراحم • تعاضد • إيثار</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 450, margin: "25px auto 0" }}>
          <button onClick={() => go("cases")} style={{ background: RED, color: "white", border: "none", padding: "14px", borderRadius: 12, fontWeight: "bold", fontSize: 16, fontFamily: FONT, cursor: "pointer" }}>♥ سأتكفل بفاتورة</button>
          <button onClick={openUpload} style={{ background: "transparent", color: "white", border: "1px solid white", padding: "14px", borderRadius: 12, fontWeight: "bold", fontSize: 16, fontFamily: FONT, cursor: "pointer" }}>لدي فاتورة وأحتاج المساعدة فيها</button>
        </div>
      </section>

      <section id="about" style={{ maxWidth: 900, margin: "0 auto", padding: "50px 20px", textAlign: "center" }}>
        <h2 style={{ fontSize: 28, fontFamily: FONT }}>من نحن</h2>
        <p style={{ color: "#555", lineHeight: 1.8, fontFamily: FONT, marginTop: 10 }}>ادفع لي منصة خيرية أردنية، تربط بين متكفل كريم وعائلة محتاجة. يدفع المتكفل الفاتورة بنفسه مباشرة للجهة المستحقة، دون وسيط، من خلال إي فواتيركم أو البنوك المعتمدة. هدفنا: ألا تنقطع الكهرباء والمياه عن أي منزل، وألا ينام أحد جائعا أو دون دواء.</p>
      </section>

      <main id="cases" style={{ maxWidth: 1100, margin: "0 auto", padding: "10px 20px 30px" }}>
        <h2 style={{ textAlign: "center", fontSize: 28, fontFamily: FONT }}>الحالات المتاحة للكفالة</h2>
        <p style={{ textAlign: "center", color: "#666", fontFamily: FONT }}>7 حالات رئيسية، بالإضافة إلى إمكانية رفع أي حالة أخرى للمراجعة - الكهرباء والمياه: دفع كامل، وباقي الحالات: دفع جزئي مسموح</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))", gap: 16, marginTop: 20 }}>
          {cases.map((c) => (
            <div key={c.title} style={{ background: c.title === "حالة أخرى" ? "#FFF7F7" : "white", padding: 20, borderRadius: 16, boxShadow: "0 2px 12px rgba(0,0,0,0.08)", textAlign: "center", border: c.title === "حالة أخرى" ? "1px dashed #D92D20" : "1px solid #eee" }}>
              <div style={{ fontSize: 42, background: c.bg, color: c.color, width: 76, height: 76, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px", border: `2px solid ${c.color}33` }}>{c.icon}</div>
              <h3 style={{ fontSize: 22, fontFamily: FONT, margin: 0 }}>{c.title}</h3>
              <p style={{ fontWeight: "bold", color: OLIVE, fontFamily: FONT }}>{c.limit}</p>
              <p style={{ color: "#555", fontFamily: FONT }}>{c.desc}</p>
              <p style={{ background: c.payType === "دفع كامل" ? "#DCFCE7" : "#FEF3C7", padding: "6px 10px", borderRadius: 20, fontSize: 13, fontWeight: "bold", display: "inline-block", fontFamily: FONT }}>{c.payType}</p>
              <div style={{ marginTop: 10 }}>
                {c.title === "حالة أخرى" ? (
                  <button onClick={openUpload} style={{ background: RED, color: "white", border: "none", padding: "10px 20px", borderRadius: 10, width: "100%", cursor: "pointer", fontFamily: FONT }}>ارفع حالتك للمراجعة</button>
                ) : (
                  <button onClick={() => startReservation(c)} style={{ background: OLIVE, color: "white", border: "none", padding: "10px 20px", borderRadius: 10, width: "100%", cursor: "pointer", fontFamily: FONT }}>تكفل بهذه الحالة</button>
                )}
              </div>
            </div>
          ))}
        </div>
        {reservedCase && (
          <div style={{ background: "#FFF7ED", border: "2px solid #D92D20", borderRadius: 16, padding: 20, textAlign: "center", marginTop: 20 }}>
            <h3 style={{ fontFamily: FONT }}>⏳ الساعة الرملية - محجوزة لك - بقي {formatTime(timeLeft)} دقيقة</h3>
            <p style={{ fontFamily: FONT }}>الحالة: {reservedCase.title} - {reservedCase.limit} - {reservedCase.payType}</p>
            <div style={{ background: "#FEE2E2", height: 12, borderRadius: 10, overflow: "hidden", margin: "12px 0" }}><div style={{ width: `${(timeLeft / 900) * 100}%`, background: RED, height: "100%" }}></div></div>
            <p style={{ fontFamily: FONT, color: "#555" }}>رقم الاشتراك سيظهر هنا بعد الحجز. ادفع عن طريق إي فواتيركم، ثم أرسل إثبات الدفع.</p>
            <p style={{ fontFamily: FONT, color: RED, fontWeight: "bold" }}>إذا لم تدفع خلال خمس عشرة دقيقة، سينفك الحجز تلقائيا، وستعود الحالة إلى الجميع.</p>
            <a href="https://wa.me/962790000000" target="_blank" style={{ background: "#25D366", color: "white", padding: "12px 20px", borderRadius: 10, textDecoration: "none", display: "inline-block", fontFamily: FONT, width: "100%" }}>لقد دفعت، أرسل إثبات الدفع عبر واتسابه</a>
            <br /><br /><button onClick={cancelReservation} style={{ background: "white", color: "#333", border: "1px solid #ccc", padding: "12px 20px", borderRadius: 10, width: "100%", cursor: "pointer", fontFamily: FONT }}>إلغاء الحجز</button>
          </div>
        )}
        {selected && (
          <div style={{ background: "#F0F5F1", marginTop: 20, padding: 20, borderRadius: 16, textAlign: "center", border: "1px solid #BFD3C6" }}>
            <h3 style={{ fontFamily: FONT }}>كفالة: {selected.title} - {selected.limit}</h3>
            <p style={{ fontFamily: FONT }}>شكرا لك! تواصل معنا عبر واتساب لإتمام الكفالة.</p>
            <a href="https://wa.me/962790000000" target="_blank" style={{ background: "#25D366", color: "white", padding: "10px 20px", borderRadius: 10, textDecoration: "none", display: "inline-block", fontFamily: FONT }}>تواصل عبر واتساب</a>
            <br /><br /><button onClick={() => setSelected(null)} style={{ fontFamily: FONT }}>إغلاق</button>
          </div>
        )}
      </main>

      <section id="how" style={{ background: "#F8F8F8", padding: "50px 20px", textAlign: "center" }}>
        <h2 style={{ fontSize: 28, fontFamily: FONT }}>كيف نعمل</h2>
        <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap", marginTop: 20 }}>
          <div style={{ background: "white", padding: 20, borderRadius: 12, width: 250 }}><div style={{ fontSize: 36 }}>📤</div><h3 style={{ fontFamily: FONT }}>1. رفع الفاتورة</h3><p style={{ fontFamily: FONT, color: "#555" }}>يرفع صاحب الحاجة فاتورته عبر زر ارفع فاتورتك، مع كتابة قصته</p></div>
          <div style={{ background: "white", padding: 20, borderRadius: 12, width: 250 }}><div style={{ fontSize: 36 }}>🔍</div><h3 style={{ fontFamily: FONT }}>2. التحقق والمراجعة</h3><p style={{ fontFamily: FONT, color: "#555" }}>يتم التحقق من الفاتورة والتأكد من صحتها قبل النشر</p></div>
          <div style={{ background: "white", padding: 20, borderRadius: 12, width: 250 }}><div style={{ fontSize: 36 }}>👤</div><h3 style={{ fontFamily: FONT }}>3. اختيار الحالة</h3><p style={{ fontFamily: FONT, color: "#555" }}>يختار المتكفل الحالة المناسبة، وتبدأ الساعة الرملية 15 دقيقة</p></div>
          <div style={{ background: "white", padding: 20, borderRadius: 12, width: 250 }}><div style={{ fontSize: 36 }}>💳</div><h3 style={{ fontFamily: FONT }}>4. الدفع المباشر</h3><p style={{ fontFamily: FONT, color: "#555" }}>يدفع المتكفل بنفسه للجهة المستحقة، عبر إي فواتيركم أو البنك - الكهرباء والمياه كامل، والباقي جزئي</p></div>
        </div>
        <p style={{ marginTop: 20, color: "#888", fontFamily: FONT, fontSize: 14 }}>لا يتم عرض الفاتورة للعامة أبدا، حفاظا على خصوصية العائلات.</p>
      </section>

      <section id="safety" style={{ background: "white", padding: "60px 20px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontSize: 28, fontFamily: FONT }}>الأمان والموثوقية</h2>
          <p style={{ color: "#666", fontFamily: FONT, marginTop: 10, lineHeight: 1.8 }}>نعمل وفق آلية واضحة تضمن وصول الدعم لمستحقيه، وتحمي خصوصية جميع الأطراف.</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))", gap: 16, marginTop: 30, textAlign: "center" }}>
            <div style={{ background: "#F8F8F8", padding: 24, borderRadius: 16 }}>
              <div style={{ width: 76, height: 76, borderRadius: "50%", background: "white", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}><svg width="64" height="64" viewBox="0 0 100 100"><circle cx="50" cy="50" r="48" fill="white" stroke="#D92D20" strokeWidth="2" /><circle cx="50" cy="50" r="36" fill="#D92D20" /><circle cx="50" cy="50" r="26" fill="white" /><circle cx="50" cy="50" r="16" fill="#D92D20" /><circle cx="50" cy="50" r="7" fill="white" /><g transform="translate(52,42) rotate(45)"><rect x="-3" y="-22" width="6" height="24" fill="#2563EB" rx="2" /><path d="M -8 -24 L 0 -34 L 8 -24 Z" fill="#2563EB" /><path d="M -6 -2 L 0 6 L 6 -2 Z" fill="#60A5FA" /></g></svg></div>
              <h3 style={{ fontFamily: FONT, fontSize: 18, color: OLIVE }}>دفع مباشر دون وسيط</h3>
              <p style={{ fontFamily: FONT, color: "#555", lineHeight: 1.8, marginTop: 8 }}>يتم تسديد الفاتورة من المتكفل مباشرة إلى الجهة المستحقة، من خلال القنوات المعتمدة، دون أن تمر أي أموال عبر المنصة.</p>
            </div>
            <div style={{ background: "#F8F8F8", padding: 24, borderRadius: 16 }}>
              <div style={{ fontSize: 42, background: "white", width: 72, height: 72, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px" }}>✅</div>
              <h3 style={{ fontFamily: FONT, fontSize: 18, color: OLIVE }}>تحقق موثق</h3>
              <p style={{ fontFamily: FONT, color: "#555", lineHeight: 1.8, marginTop: 8 }}>يتم مراجعة كل فاتورة والتأكد منها قبل النشر، لضمان وصول الدعم لمستحقيه.</p>
            </div>
            <div style={{ background: "#F8F8F8", padding: 24, borderRadius: 16 }}>
              <div style={{ fontSize: 42, background: "white", width: 72, height: 72, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px" }}>🔒</div>
              <h3 style={{ fontFamily: FONT, fontSize: 18, color: OLIVE }}>خصوصية كاملة</h3>
              <p style={{ fontFamily: FONT, color: "#555", lineHeight: 1.8, marginTop: 8 }}>تُحفظ بيانات المستفيد بسرية تامة، ولا تظهر أي معلومات شخصية.</p>
            </div>
            <div style={{ background: "#F8F8F8", padding: 24, borderRadius: 16 }}>
              <div style={{ fontSize: 42, background: "white", width: 72, height: 72, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px" }}>💛</div>
              <h3 style={{ fontFamily: FONT, fontSize: 18, color: OLIVE }}>بدون أي رسوم</h3>
              <p style={{ fontFamily: FONT, color: "#555", lineHeight: 1.8, marginTop: 8 }}>المنصة لا تأخذ أي عمولة أو رسوم، ويصل الدعم كاملا للمستحق.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="upload" style={{ maxWidth: 700, margin: "0 auto", padding: "20px 20px 40px" }}>
        <h2 style={{ textAlign: "center", fontSize: 28, fontFamily: FONT }}>ارفع فاتورتك</h2>
        <p style={{ textAlign: "center", color: "#666", fontFamily: FONT }}>عبئ الخانات كاملة، كما في عينة فاتورة الكهرباء والمياه، وسيتم مراجعة طلبك قبل النشر.</p>
        {formSent ? (
          <div style={{ background: "#DCFCE7", padding: 20, borderRadius: 12, textAlign: "center" }}><h3 style={{ fontFamily: FONT }}>تم استلام طلبك بنجاح</h3><p style={{ fontFamily: FONT }}>سيتم مراجعة فاتورتك وقصتك، وسيتم إعلامك عند النشر.</p><button onClick={() => setFormSent(false)} style={{ padding: "10px 20px", borderRadius: 10, border: "1px solid #ccc", background: "white", cursor: "pointer", fontFamily: FONT }}>رفع فاتورة أخرى</button></div>
        ) : (
          <div style={{ background: "white", border: "1px solid #eee", borderRadius: 16, padding: 20, boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
            <label style={{ fontFamily: FONT }}>الاسم الأول فقط *</label><input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="مثال: أبو محمد" style={{ width: "100%", padding: 12, border: "1px solid #ddd", borderRadius: 10, margin: "6px 0 12px", fontFamily: FONT }} />
            <label style={{ fontFamily: FONT }}>رقم واتسابه *</label><input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="07XXXXXXXX" style={{ width: "100%", padding: 12, border: "1px solid #ddd", borderRadius: 10, margin: "6px 0 12px", fontFamily: FONT }} />
            <label style={{ fontFamily: FONT }}>الحي *</label><input value={form.area} onChange={(e) => setForm({ ...form, area: e.target.value })} placeholder="مثال: جبل الحسين" style={{ width: "100%", padding: 12, border: "1px solid #ddd", borderRadius: 10, margin: "6px 0 12px", fontFamily: FONT }} />
            <label style={{ fontFamily: FONT }}>نوع الفاتورة *</label><select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} style={{ width: "100%", padding: 12, border: "1px solid #ddd", borderRadius: 10, margin: "6px 0 12px", fontFamily: FONT }}><option>كهرباء - دفع كامل حتى 200 دينار</option><option>مياه - دفع كامل حتى 35 دينار</option><option>دواء - دفع جزئي حتى 100 دينار</option><option>علاج - دفع جزئي حتى 300 دينار</option><option>متعثر - دفع جزئي حتى 300 دينار</option><option>قسط طالب - دفع جزئي حتى 500 دينار</option><option>إيجار منزل - دفع جزئي حتى 250 دينار</option><option>حالة أخرى</option></select>
            <label style={{ fontFamily: FONT }}>مبلغ الفاتورة *</label><input value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} placeholder="مثال: 85" style={{ width: "100%", padding: 12, border: "1px solid #ddd", borderRadius: 10, margin: "6px 0 12px", fontFamily: FONT }} />
            <label style={{ fontFamily: FONT }}>رقم الاشتراك / رقم الفاتورة *</label><input value={form.subNo} onChange={(e) => setForm({ ...form, subNo: e.target.value })} placeholder="كما يظهر في عينة الفاتورة" style={{ width: "100%", padding: 12, border: "1px solid #ddd", borderRadius: 10, margin: "6px 0 12px", fontFamily: FONT }} />
            <label style={{ fontFamily: FONT }}>صورة الفاتورة *</label><input type="file" style={{ width: "100%", padding: 12, border: "1px solid #ddd", borderRadius: 10, margin: "6px 0 12px", fontFamily: FONT }} />
            <label style={{ fontFamily: FONT }}>اكتب قصتك *</label><textarea value={form.story} onChange={(e) => setForm({ ...form, story: e.target.value })} rows={4} placeholder="مثال: أنا أرملة، ولدي ثلاثة أطفال ولا معيل لهم، والكهرباء منقطعة..." style={{ width: "100%", padding: 12, border: "1px solid #ddd", borderRadius: 10, margin: "6px 0 12px", fontFamily: FONT }} />
            <button onClick={() => setFormSent(true)} style={{ background: RED, color: "white", border: "none", padding: "14px", borderRadius: 10, width: "100%", fontWeight: "bold", cursor: "pointer", fontFamily: FONT }}>إرسال للمراجعة</button>
            <p style={{ textAlign: "center", marginTop: 10, fontFamily: FONT }}><a href="https://wa.me/962790000000?text=مرحبا، أرغب في رفع فاتورة للمساعدة" target="_blank" style={{ color: OLIVE }}>أو أرسل عبر واتسابه مباشرة</a></p>
          </div>
        )}
      </section>

      <section style={{ maxWidth: 700, margin: "0 auto", padding: "0 20px 40px" }}>
        <h2 style={{ textAlign: "center", fontSize: 24, fontFamily: FONT }}>طلب فك الحظر</h2>
        <p style={{ textAlign: "center", color: "#666", fontFamily: FONT }}>إذا تم حظر رقمك، يمكنك تقديم طلب فك الحظر هنا، وسيقرر المدير القبول أو الرفض.</p>
        {unblockSent ? (
          <div style={{ background: "#DCFCE7", padding: 20, borderRadius: 12, textAlign: "center" }}><h3 style={{ fontFamily: FONT }}>تم إرسال طلب فك الحظر</h3><p style={{ fontFamily: FONT }}>سيتم مراجعة طلبك من قبل المدير.</p></div>
        ) : (
          <div style={{ background: "#FFF7ED", border: "1px solid #FDBA74", borderRadius: 16, padding: 20 }}>
            <label style={{ fontFamily: FONT }}>رقم واتسابه *</label><input value={unblockPhone} onChange={(e) => setUnblockPhone(e.target.value)} placeholder="07XXXXXXXX" style={{ width: "100%", padding: 12, border: "1px solid #ddd", borderRadius: 10, margin: "6px 0 12px", fontFamily: FONT }} />
            <label style={{ fontFamily: FONT }}>سبب طلب فك الحظر *</label><textarea value={unblockReason} onChange={(e) => setUnblockReason(e.target.value)} rows={3} placeholder="اشرح سبب طلب فك الحظر بصدق..." style={{ width: "100%", padding: 12, border: "1px solid #ddd", borderRadius: 10, margin: "6px 0 12px", fontFamily: FONT }} />
            <button onClick={() => setUnblockSent(true)} style={{ background: OLIVE, color: "white", border: "none", padding: "14px", borderRadius: 10, width: "100%", fontWeight: "bold", cursor: "pointer", fontFamily: FONT }}>إرسال طلب فك الحظر</button>
          </div>
        )}
        <div style={{ textAlign: "center", marginTop: 16 }}><button onClick={() => setShowAdmin(!showAdmin)} style={{ background: "white", border: "1px solid #ccc", padding: "10px 20px", borderRadius: 10, cursor: "pointer", fontFamily: FONT }}>لوحة تحكم المدير - خاصة بك فقط</button></div>
        {showAdmin && (
          <div style={{ background: "#F8F8F8", border: "1px solid #eee", borderRadius: 16, padding: 20, marginTop: 12 }}>
            <h3 style={{ textAlign: "center", fontFamily: FONT }}>لوحة تحكم المدير</h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, textAlign: "center", fontFamily: FONT }}><div style={{ background: "white", padding: 12, borderRadius: 10 }}><b>طلبات جديدة</b><div>3</div></div><div style={{ background: "white", padding: 12, borderRadius: 10 }}><b>حالات معروضة الآن</b><div>12</div></div><div style={{ background: "white", padding: 12, borderRadius: 10 }}><b>حالات محجوزة الآن</b><div>{reservedCase ? "1 - بقي " + formatTime(timeLeft) : "0"}</div></div><div style={{ background: "white", padding: 12, borderRadius: 10 }}><b>حالات تمت مساعدتها</b><div>48</div></div></div>
            <p style={{ marginTop: 12, fontFamily: FONT }}>طلبات جديدة: قبول ونشر / رفض - حالات محجوزة: الساعة الرملية تعمل - حالات تم الدفع: بانتظار التأكيد - طلبات فك الحظر: قبول / رفض - القرار لك وحدك.</p>
          </div>
        )}
      </section>

      <section id="faq" style={{ maxWidth: 800, margin: "0 auto", padding: "20px 20px 50px" }}>
        <h2 style={{ textAlign: "center", fontSize: 28, fontFamily: FONT }}>أسئلة</h2>
        {faqs.map((f, i) => (
          <div key={i} onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{ background: "white", border: "1px solid #eee", borderRadius: 12, padding: 16, marginTop: 12, cursor: "pointer" }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontWeight: "bold", fontFamily: FONT }}><span>{f.q}</span><span>{openFaq === i ? "−" : "+"}</span></div>
            {openFaq === i && <p style={{ marginTop: 10, color: "#555", fontFamily: FONT }}>{f.a}</p>}
          </div>
        ))}
      </section>
      <footer style={{ textAlign: "center", padding: 20, color: "#888", fontFamily: FONT }}>من نشامى الوطن... لأبناء الوطن | ادفع لي © 2026</footer>
    </div>
  );
}
