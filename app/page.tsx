"use client";
import { useState } from "react";

const cases = [
  { title: "كهرباء", limit: "لحد 200 دينار", desc: "فاتورة كهرباء - الدفع مباشر لشركة الكهرباء" },
  { title: "مياه", limit: "لحد 35 دينار", desc: "فاتورة مياه - الدفع مباشر لشركة المياه" },
  { title: "دواء", limit: "لحد 100 دينار", desc: "يشمل حليب أطفال + حفاضات - فاتورة صيدلية" },
  { title: "علاج", limit: "لحد 300 دينار", desc: "تكاليف علاج وعمليات - تقرير طبي" },
  { title: "متعثر", limit: "لحد 300 دينار", desc: "مساعدة لمتعثر مالي - إثبات تعثر" },
  { title: "قسط طالب", limit: "لحد 500 دينار", desc: "قسط جامعة / مدرسة - وصل القسط" },
  { title: "إيجار بيت", limit: "لحد 250 دينار", desc: "إيجار منزل لعائلة محتاجة - عقد إيجار مصدق" },
];

export default function Home() {
  const [selected, setSelected] = useState<any>(null);
  return (
    <div dir="rtl" style={{ fontFamily: "sans-serif", background: "#fff", minHeight: "100vh" }}>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "15px 30px", background: "white", borderBottom: "1px solid #eee" }}>
        <div style={{ fontWeight: "bold", fontSize: 24, color: "#0f2e2e" }}>ادفع لي ♥</div>
        <nav style={{ display: "flex", gap: 20, color: "#444" }}>
          <span>من نحن</span><span>الحالات</span><span>كيف نعمل</span><span>الأمان</span><span>أسئلة</span>
        </nav>
        <button style={{ background: "#dc2645", color: "white", border: "none", padding: "10px 18px", borderRadius: 10, fontWeight: "bold" }}>ارفع فاتورتك</button>
      </header>

      <section style={{ background: "linear-gradient(180deg,#0F2E1F 0%,#14532D 40%,#166534 70%,#1E7A4A 100%)", color: "white", textAlign: "center", padding: "60px 20px" }}>
        <span style={{ background: "rgba(255,255,255,0.15)", padding: "6px 18px", borderRadius: 20, fontSize: 14 }}>ادفع لي</span>
        <h1 style={{ fontSize: 42, lineHeight: 1.4, margin: "20px 0 10px" }}>منصة خيرية من أهل الأردن... لأهل الأردن<br />من نشامى الوطن... لأبناء الوطن</h1>
        <p style={{ opacity: 0.9 }}>تكفل بفاتورة كهرباء أو مياه أو دواء لعائلة محتاجة، وادفعها بنفسك مباشرة للشركة.<br />لا أموال تمر عبر المنصة.</p>
        <p style={{ fontWeight: "bold", fontSize: 20, marginTop: 15 }}>تكافل • تراحم • تعاضد • إيثار</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 450, margin: "25px auto 0" }}>
          <button style={{ background: "#D92D6B", color: "white", border: "none", padding: "14px", borderRadius: 12, fontWeight: "bold", fontSize: 16 }}>♥ سأتكفل بفاتورة</button>
          <button style={{ background: "transparent", color: "white", border: "1px solid white", padding: "14px", borderRadius: 12, fontWeight: "bold", fontSize: 16 }}>عندي فاتورة محتاج مساعدة فيها</button>
        </div>
      </section>

      <main style={{ maxWidth: 1100, margin: "0 auto", padding: "30px 20px" }}>
        <h2 style={{ textAlign: "center", fontSize: 28 }}>الحالات المتاحة للكفالة</h2>
        <p style={{ textAlign: "center", color: "#666" }}>7 حالات فقط - كل حالة لها سقف ودفع مباشر للجهة المستحقة</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))", gap: 16, marginTop: 20 }}>
          {cases.map((c) => (
            <div key={c.title} style={{ background: "white", padding: 20, borderRadius: 16, boxShadow: "0 2px 12px rgba(0,0,0,0.08)", textAlign: "center", border: "1px solid #eee" }}>
              <h3 style={{ fontSize: 22 }}>{c.title}</h3>
              <p style={{ fontWeight: "bold", color: "#0f766e" }}>{c.limit}</p>
              <p style={{ color: "#555" }}>{c.desc}</p>
              <button onClick={() => setSelected(c)} style={{ background: "#0f766e", color: "white", border: "none", padding: "10px 20px", borderRadius: 10, width: "100%", cursor: "pointer" }}>تكفل بهذه الحالة</button>
            </div>
          ))}
        </div>
        {selected && (
          <div style={{ background: "#f0fdfa", marginTop: 20, padding: 20, borderRadius: 16, textAlign: "center", border: "1px solid #99f6e4" }}>
            <h3>كفالة: {selected.title} - {selected.limit}</h3>
            <p>شكراً لك! تواصل معنا على واتساب لإتمام الكفالة.</p>
            <a href="https://wa.me/962790000000" target="_blank" style={{ background: "#25D366", color: "white", padding: "10px 20px", borderRadius: 10, textDecoration: "none", display: "inline-block" }}>تواصل واتساب</a>
            <br /><br /><button onClick={() => setSelected(null)}>إغلاق</button>
          </div>
        )}
      </main>
      <footer style={{ textAlign: "center", padding: 20, color: "#888" }}>من نشامى الوطن... لأبناء الوطن | ادفعلي © 2026</footer>
    </div>
  );
}
