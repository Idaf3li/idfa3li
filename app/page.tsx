export default function Home() {
  return (
    <main style={{ maxWidth: "1100px", margin: "0 auto", padding: "20px" }}>
      {/* الهيدر */}
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 0" }}>
        <h1 style={{ fontSize: "28px", fontWeight: "800", color: "#0f766e" }}>ادفعلي</h1>
        <div style={{ display: "flex", gap: "10px" }}>
          <button style={{ padding: "10px 20px", borderRadius: "10px", border: "1px solid #ddd", background: "white" }}>تسجيل دخول</button>
          <button style={{ padding: "10px 20px", borderRadius: "10px", border: "none", background: "#0f766e", color: "white", fontWeight: "700" }}>ابدأ مجاناً</button>
        </div>
      </header>

      {/* القسم الرئيسي */}
      <section style={{ textAlign: "center", padding: "70px 20px", background: "white", borderRadius: "20px", marginTop: "20px" }}>
        <span style={{ background: "#ccfbf1", color: "#0f766e", padding: "6px 14px", borderRadius: "20px", fontSize: "14px", fontWeight: "700" }}>الأول في الأردن للدفع الآمن</span>
        <h2 style={{ fontSize: "48px", lineHeight: "1.2", margin: "20px 0", fontWeight: "900" }}>
          ادفع، استلم، وارتاح بالك<br />مع <span style={{ color: "#0f766e" }}>ادفعلي</span>
        </h2>
        <p style={{ color: "#666", fontSize: "18px", maxWidth: "600px", margin: "0 auto 30px" }}>
          أنشئ رابط دفع في ثواني، ابعته لأي حدا، واستلم فلوسك بدون وجعة راس. بدون حساب بنكي معقد.
        </p>
        <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
          <button style={{ padding: "14px 30px", borderRadius: "12px", border: "none", background: "#0f766e", color: "white", fontSize: "16px", fontWeight: "700" }}>أنشئ رابط دفع</button>
          <button style={{ padding: "14px 30px", borderRadius: "12px", border: "1px solid #ddd", background: "white", fontSize: "16px" }}>شاهد كيف يعمل</button>
        </div>
      </section>

      {/* المميزات */}
      <section style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px", marginTop: "20px" }}>
        <div style={{ background: "white", padding: "25px", borderRadius: "16px" }}>
          <div style={{ fontSize: "30px" }}>⚡</div>
          <h3 style={{ margin: "10px 0" }}>سريع جداً</h3>
          <p style={{ color: "#666", fontSize: "15px" }}>رابطك جاهز بأقل من دقيقة، والفلوس بتوصلك فوراً.</p>
        </div>
        <div style={{ background: "white", padding: "25px", borderRadius: "16px" }}>
          <div style={{ fontSize: "30px" }}>🔒</div>
          <h3 style={{ margin: "10px 0" }}>أمان 100%</h3>
          <p style={{ color: "#666", fontSize: "15px" }}>تشفير كامل لبياناتك وبيانات عملائك، بدون أي خطر.</p>
        </div>
        <div style={{ background: "white", padding: "25px", borderRadius: "16px" }}>
          <div style={{ fontSize: "30px" }}>💳</div>
          <h3 style={{ margin: "10px 0" }}>كل طرق الدفع</h3>
          <p style={{ color: "#666", fontSize: "15px" }}>فيزا، ماستر كارد، CliQ، ومحافظ إلكترونية.</p>
        </div>
      </section>

      <footer style={{ textAlign: "center", padding: "40px 0", color: "#888", fontSize: "14px" }}>
        © 2026 ادفعلي - جميع الحقوق محفوظة
      </footer>
    </main>
  );
}
