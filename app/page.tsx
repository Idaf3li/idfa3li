// app/page.tsx - idfa3li - ادفعلي - Beta
// القائمة النهائية: 7 حالات

const cases = [
  {
    id: "electricity",
    title: "كهرباء",
    cap: 200,
    desc: "فاتورة كهرباء - الدفع مباشر لشركة الكهرباء",
    proof: "فاتورة كهرباء",
  },
  {
    id: "water",
    title: "مياه",
    cap: 35,
    desc: "فاتورة مياه - الدفع مباشر لشركة المياه",
    proof: "فاتورة مياه",
  },
  {
    id: "medicine",
    title: "دواء",
    cap: 100,
    desc: "يشمل حليب أطفال + حفاضات - فاتورة صيدلية",
    proof: "فاتورة صيدلية",
  },
  {
    id: "treatment",
    title: "علاج",
    cap: 300,
    desc: "تقرير طبي + فاتورة علاج - الدفع مباشر للجهة الطبية",
    proof: "تقرير طبي + فاتورة",
  },
  {
    id: "distressed",
    title: "متعثر",
    cap: 300,
    desc: "اثبات تعثر - الدفع مباشر للجهة المستحقة",
    proof: "ورقة اثبات تعثر",
  },
  {
    id: "student",
    title: "قسط طالب",
    cap: 500,
    desc: "جامعة + تخصص + رقم جامعي + كشف قسط - الدفع مباشر للجامعة",
    proof: "كشف قسط جامعي",
  },
  {
    id: "rent",
    title: "إيجار بيت",
    cap: 250,
    desc: "عقد إيجار - الدفع مباشر لصاحب البيت",
    proof: "عقد إيجار + رقم صاحب البيت",
  },
];

export default function Home() {
  return (
    <main style={{ background: "#fff", minHeight: "100vh", direction: "rtl", fontFamily: "sans-serif" }}>
      <header style={{ background: "#0B3D2E", color: "#fff", padding: "32px 20px", textAlign: "center" }}>
        <h1 style={{ fontSize: "32px", margin: 0 }}>ادفعلي - idfa3li</h1>
        <p style={{ margin: "12px 0 0", fontSize: "18px" }}>منصة خيرية من أهل الأردن... لأهل الأردن</p>
        <p style={{ margin: "8px 0 0", opacity: 0.85 }}>خصوصية كاملة - لا فيديو - لا تشهير - دفع مباشر</p>
        <button style={{ marginTop: "20px", background: "#fff", color: "#0B3D2E", border: "none", padding: "12px 28px", borderRadius: "12px", fontWeight: "bold", fontSize: "16px" }}>
          اطلب المساعدة بسرية
        </button>
      </header>

      <section style={{ maxWidth: "900px", margin: "0 auto", padding: "24px 16px" }}>
        <h2 style={{ textAlign: "center", color: "#0B3D2E" }}>الحالات المتاحة للكفالة</h2>
        <p style={{ textAlign: "center", color: "#555" }}>7 حالات فقط - كل حالة لها سقف ودفع مباشر للجهة المستحقة</p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "16px", marginTop: "20px" }}>
          {cases.map((c) => (
            <div key={c.id} style={{ border: "1px solid #e5e5e5", borderRadius: "16px", padding: "20px", background: "#fff" }}>
              <h3 style={{ margin: "0 0 8px", color: "#0B3D2E", fontSize: "20px" }}>{c.title}</h3>
              <div style={{ background: "#EAF5EF", color: "#0B3D2E", display: "inline-block", padding: "4px 12px", borderRadius: "20px", fontWeight: "bold", fontSize: "14px" }}>
                لحد {c.cap} دينار
              </div>
              <p style={{ color: "#444", margin: "12px 0 6px", lineHeight: "1.6" }}>{c.desc}</p>
              <p style={{ color: "#777", fontSize: "13px", margin: 0 }}>الاثبات المطلوب: {c.proof}</p>
              <button style={{ marginTop: "14px", width: "100%", background: "#0B3D2E", color: "#fff", border: "none", padding: "11px", borderRadius: "10px", fontWeight: "bold" }}>
                تكفل بهذه الحالة
              </button>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
