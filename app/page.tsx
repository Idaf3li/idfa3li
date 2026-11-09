"use client";
import { useState } from "react";

const OLIVE = "#0E3B2E";
const RED = "#D92D20";
const FONT = "Tahoma, Arial, sans-serif";

const cases = [
  { title: "كهرباء", limit: "حتى 200 دينار", desc: "فاتورة كهرباء - الدفع مباشرة لشركة الكهرباء" },
  { title: "مياه", limit: "حتى 35 دينار", desc: "فاتورة مياه - الدفع مباشرة لشركة المياه" },
  { title: "دواء", limit: "حتى 100 دينار", desc: "يشمل حليب أطفال وحفاضات - فاتورة صيدلية" },
  { title: "علاج", limit: "حتى 300 دينار", desc: "تكاليف علاج وعمليات - تقرير طبي" },
  { title: "متعثر", limit: "حتى 300 دينار", desc: "مساعدة لمتعثر مالي - إثبات تعثر" },
  { title: "قسط طالب", limit: "حتى 500 دينار", desc: "قسط جامعة أو مدرسة - وصل القسط" },
  { title: "إيجار منزل", limit: "حتى 250 دينار", desc: "إيجار منزل لعائلة محتاجة - عقد إيجار مصدق" },
];

const faqs = [
  { q: "كيف أتكفل بفاتورة؟", a: "اختر الحالة، تواصل معنا عبر واتساب، وادفع بنفسك مباشرة للجهة المستحقة، لا تمر أي أموال عبر المنصة." },
  { q: "هل تتقاضى المنصة عمولة؟", a: "لا أبداً، 0% عمولة، يصل المبلغ كاملاً للفاتورة." },
  { q: "كيف تتأكدون من أحقية الحالة؟", a: "يتم التحقق من كل حالة من خلال المستندات الرسمية: فاتورة، تقرير طبي، عقد إيجار، أو وصل قسط، ويتم التأكد من صحتها قبل النشر." },
  { q: "لدي فاتورة، كيف أرفعها؟", a: "اضغط على زر ارفع فاتورتك في الأعلى، وسيتم فتح نموذج جديد لإرسال الفاتورة ومراجعتها." },
  { q: "من يطلع على الفاتورة؟", a: "يطلع عليها فقط فريق التحقق والمتكفل الذي اختار الحالة. لا يتم عرض الفاتورة للعامة أبداً." },
];

export default function Home() {
  const [selected, setSelected] = useState<any>(null);
  const [active, setActive] = useState("home");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const go = (id: string) => {
    setActive(id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const openUpload = () => {
    window.open("https://wa.me/962790000000?text=مرحبا، أرغب في رفع فاتورة للمساعدة", "_blank");
  };

  return (
    <div dir="rtl" style={{ fontFamily: FONT, background: "#fff", minHeight: "100vh" }}>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "15px 30px", background: "white", borderBottom: "1px solid #eee", position: "sticky", top: 0, zIndex: 100 }}>
        <div onClick={() => go("home")} style={{ fontWeight: "bold", fontSize: 24, color: OLIVE, cursor: "pointer", fontFamily: FONT }}>ادفع لي <span style={{ color: RED }}>♥</span></div>
        <nav style={{ display: "flex", gap: 20 }}>
          {[
            { id: "about", label: "من نحن" },
            { id: "cases", label: "الحالات" },
            { id: "how", label: "كيف نعمل" },
            { id: "safety", label: "الأمان" },
            { id: "faq", label: "أسئلة" },
          ].map((n) => (
            <span key={n.id} onClick={() => go(n.id)} style={{ cursor: "pointer", color: active === n.id ? RED : "#444", fontWeight: active === n.id ? "bold" : "normal", borderBottom: active === n.id ? `2px solid ${RED}` : "none", paddingBottom: 3, fontFamily: FONT }}>{n.label}</span>
          ))}
        </nav>
        <button onClick={openUpload} style={{ background: RED, color: "white", border: "none", padding: "10px 18px", borderRadius: 10, fontWeight: "bold", fontFamily: FONT, cursor: "pointer" }}>ارفع فاتورتك</button>
      </header>

      <section id="home" style={{ background: OLIVE, color: "white", textAlign: "center", padding: "60px 20px" }}>
        <span style={{ background: "rgba(255,255,255,0.15)", padding: "6px 18px", borderRadius: 20, fontSize: 14, fontFamily: FONT }}>ادفع لي</span>
        <h1 style={{ fontSize: 42, lineHeight: 1.4, margin: "20px 0 10px", fontFamily: FONT }}>منصة خيرية من أهل الأردن... لأهل الأردن<br />من نشامى الوطن... لأبناء الوطن</h1>
        <p style={{ opacity: 0.9, fontFamily: FONT }}>تكفل بفاتورة كهرباء أو مياه أو دواء لعائلة محتاجة، وادفعها بنفسك مباشرة للجهة المستحقة.<br />لا تمر أي أموال عبر المنصة.</p>
        <p style={{ fontWeight: "bold", fontSize: 20, marginTop: 15, fontFamily: FONT }}>تكافل • تراحم • تعاضد • إيثار</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 450, margin: "25px auto 0" }}>
          <button onClick={() => go("cases")} style={{ background: RED, color: "white", border: "none", padding: "14px", borderRadius: 12, fontWeight: "bold", fontSize: 16, fontFamily: FONT, cursor: "pointer" }}>♥ سأتكفل بفاتورة</button>
          <button onClick={openUpload} style={{ background: "transparent", color: "white", border: "1px solid white", padding: "14px", borderRadius: 12, fontWeight: "bold", fontSize: 16, fontFamily: FONT, cursor: "pointer" }}>لدي فاتورة وأحتاج المساعدة فيها</button>
        </div>
      </section>

      <section id="about" style={{ maxWidth: 900, margin: "0 auto", padding: "50px 20px", textAlign: "center" }}>
        <h2 style={{ fontSize: 28, fontFamily: FONT }}>من نحن</h2>
        <p style={{ color: "#555", lineHeight: 1.8, fontFamily: FONT, marginTop: 10 }}>ادفع لي منصة خيرية أردنية، تربط بين متكفل كريم وعائلة محتاجة. يدفع المتكفل الفاتورة بنفسه للجهة المستحقة، دون وسيط ودون عمولة. هدفنا: ألا تنقطع الكهرباء والمياه عن أي منزل، وألا ينام أحد جائعاً أو دون دواء.</p>
      </section>

      <main id="cases" style={{ maxWidth: 1100, margin: "0 auto", padding: "10px 20px 30px" }}>
        <h2 style={{ textAlign: "center", fontSize: 28, fontFamily: FONT }}>الحالات المتاحة للكفالة</h2>
        <p style={{ textAlign: "center", color: "#666", fontFamily: FONT }}>7 حالات فقط - لكل حالة سقف محدد ودفع مباشر للجهة المستحقة</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))", gap: 16, marginTop: 20 }}>
          {cases.map((c) => (
            <div key={c.title} style={{ background: "white", padding: 20, borderRadius: 16, boxShadow: "0 2px 12px rgba(0,0,0,0.08)", textAlign: "center", border: "1px solid #eee" }}>
              <h3 style={{ fontSize: 22, fontFamily: FONT }}>{c.title}</h3>
              <p style={{ fontWeight: "bold", color: OLIVE, fontFamily: FONT }}>{c.limit}</p>
              <p style={{ color: "#555", fontFamily: FONT }}>{c.desc}</p>
              <button onClick={() => setSelected(c)} style={{ background: OLIVE, color: "white", border: "none", padding: "10px 20px", borderRadius: 10, width: "100%", cursor: "pointer", fontFamily: FONT }}>تكفل بهذه الحالة</button>
            </div>
          ))}
        </div>
        {selected && (
          <div style={{ background: "#F0F5F1", marginTop: 20, padding: 20, borderRadius: 16, textAlign: "center", border: "1px solid #BFD3C6" }}>
            <h3 style={{ fontFamily: FONT }}>كفالة: {selected.title} - {selected.limit}</h3>
            <p style={{ fontFamily: FONT }}>شكراً لك! تواصل معنا عبر واتساب لإتمام الكفالة.</p>
            <a href="https://wa.me/962790000000" target="_blank" style={{ background: "#25D366", color: "white", padding: "10px 20px", borderRadius: 10, textDecoration: "none", display: "inline-block", fontFamily: FONT }}>تواصل عبر واتساب</a>
            <br /><br /><button onClick={() => setSelected(null)} style={{ fontFamily: FONT }}>إغلاق</button>
          </div>
        )}
      </main>

      <section id="how" style={{ background: "#F8F8F8", padding: "50px 20px", textAlign: "center" }}>
        <h2 style={{ fontSize: 28, fontFamily: FONT }}>كيف نعمل</h2>
        <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap", marginTop: 20 }}>
          <div style={{ background: "white", padding: 20, borderRadius: 12, width: 250 }}><h3 style={{ fontFamily: FONT }}>1. رفع الفاتورة</h3><p style={{ fontFamily: FONT, color: "#555" }}>يرفع صاحب الحاجة فاتورته عبر زر ارفع فاتورتك</p></div>
          <div style={{ background: "white", padding: 20, borderRadius: 12, width: 250 }}><h3 style={{ fontFamily: FONT }}>2. التحقق والمراجعة</h3><p style={{ fontFamily: FONT, color: "#555" }}>يتم التحقق من الفاتورة والتأكد من صحتها قبل النشر</p></div>
          <div style={{ background: "white", padding: 20, borderRadius: 12, width: 250 }}><h3 style={{ fontFamily: FONT }}>3. اختيار الحالة</h3><p style={{ fontFamily: FONT, color: "#555" }}>يختار المتكفل الحالة المناسبة ويطلع على فاتورتها</p></div>
          <div style={{ background: "white", padding: 20, borderRadius: 12, width: 250 }}><h3 style={{ fontFamily: FONT }}>4. الدفع المباشر</h3><p style={{ fontFamily: FONT, color: "#555" }}>يدفع المتكفل بنفسه للجهة المستحقة، دون وسيط</p></div>
        </div>
        <p style={{ marginTop: 20, color: "#888", fontFamily: FONT, fontSize: 14 }}>لا يتم عرض الفاتورة للعامة أبداً، حفاظاً على خصوصية العائلات.</p>
      </section>

      <section id="safety" style={{ maxWidth: 900, margin: "0 auto", padding: "50px 20px", textAlign: "center" }}>
        <h2 style={{ fontSize: 28, fontFamily: FONT }}>الأمان</h2>
        <p style={{ color: "#555", lineHeight: 1.8, fontFamily: FONT, marginTop: 10 }}>✔ لا تمر أي أموال عبر المنصة<br />✔ يتم التحقق من كل فاتورة والتأكد من صحتها قبل النشر<br />✔ لا يطلع على الفاتورة إلا المتكفل بعد اختياره للحالة<br />✔ الدفع مباشرة للجهة المستحقة<br />✔ لا يتم نشر أسماء أو صور العائلات</p>
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
