"use client";
import { useState } from "react";

const cases = [
  { title: "كهرباء", limit: "لحد 200 دينار", desc: "فاتورة كهرباء - الدفع مباشر لشركة الكهرباء", tag: "فاتورة كهرباء" },
  { title: "مياه", limit: "لحد 35 دينار", desc: "فاتورة مياه - الدفع مباشر لشركة المياه", tag: "فاتورة مياه" },
  { title: "دواء", limit: "لحد 100 دينار", desc: "يشمل حليب أطفال + حفاضات - فاتورة صيدلية", tag: "فاتورة صيدلية" },
  { title: "علاج", limit: "لحد 300 دينار", desc: "تكاليف علاج وعمليات - تقرير طبي", tag: "تقرير طبي" },
  { title: "متعثر", limit: "لحد 300 دينار", desc: "مساعدة لمتعثر مالي - إثبات تعثر", tag: "إثبات تعثر" },
  { title: "قسط طالب", limit: "لحد 500 دينار", desc: "قسط جامعة / مدرسة - وصل القسط", tag: "وصل قسط" },
  { title: "إيجار بيت", limit: "لحد 250 دينار", desc: "إيجار منزل لعائلة محتاجة - عقد إيجار", tag: "عقد إيجار" },
];

export default function Home() {
  const [selected, setSelected] = useState<any>(null);
  return (
    <div dir="rtl" style={{ fontFamily: "sans-serif", background: "#f6f8f7", minHeight: "100vh" }}>
      <header style={{ background: "#0f3d3e", color: "white", textAlign: "center", padding: "50px 20px" }}>
        <h1 style={{ fontSize: 36, margin: 0 }}>ادفعلي - idfa3li</h1>
        <p style={{ fontSize: 18, marginTop: 10 }}>منصة خيرية من أهل الأردن... لأهل الأردن</p>
        <p style={{ opacity: 0.8 }}>خصوصية كاملة - لا فيديو - لا تشهير - دفع مباشر</p>
        <button style={{ background: "white", color: "#0f3d3e", border: "none", padding: "12px 28px", borderRadius: 10, fontWeight: "bold", marginTop: 15, cursor: "pointer" }}>اطلب المساعدة بسرية</button>
      </header>

      <main style={{ maxWidth: 1100, margin: "0 auto", padding: 20 }}>
        <h2 style={{ textAlign: "center" }}>الحالات المتاحة للكفالة</h2>
        <p style={{ textAlign: "center", color: "#666" }}>7 حالات فقط - كل حالة لها سقف ودفع مباشر للجهة المستحقة</p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))", gap: 16, marginTop: 20 }}>
          {cases.map((c) => (
            <div key={c.title} style={{ background: "white", padding: 20, borderRadius: 16, boxShadow: "0 2px 10px rgba(0,0,0,0.06)", textAlign: "center" }}>
              <h3 style={{ fontSize: 22 }}>{c.title}</h3>
              <p style={{ fontWeight: "bold", color: "#0f766e" }}>{c.limit}</p>
              <p style={{ color: "#555", minHeight: 40 }}>{c.desc}</p>
              <span style={{ fontSize: 12, background: "#eef2f2", padding: "4px 10px", borderRadius: 20 }}>{c.tag}</span>
              <br /><br />
              <button onClick={() => setSelected(c)} style={{ background: "#0f766e", color: "white", border: "none", padding: "10px 20px", borderRadius: 10, cursor: "pointer", width: "100%" }}>تكفل بهذه الحالة</button>
            </div>
          ))}
        </div>

        {selected && (
          <div style={{ background: "white", marginTop: 20, padding: 20, borderRadius: 16, textAlign: "center" }}>
            <h3>كفالة: {selected.title} - {selected.limit}</h3>
            <p>شكراً لك! تواصل معنا على واتساب لإتمام الكفالة بشكل مباشر وآمن.</p>
            <a href="https://wa.me/962790000000" target="_blank" style={{ background: "#25D366", color: "white", padding: "10px 20px", borderRadius: 10, textDecoration: "none", display: "inline-block" }}>تواصل واتساب</a>
            <br /><br />
            <button onClick={() => setSelected(null)}>إغلاق</button>
          </div>
        )}
      </main>
      <footer style={{ textAlign: "center", padding: 20, color: "#888" }}>من تشامي الوطن... لأبناء الوطن | ادفعلي © 2026</footer>
    </div>
  );
}
