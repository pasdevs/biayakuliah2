import { useState } from "react";
import rawDataBiayaProdi from "../data/biayaProdi";

/* ─────────────────────────────────────────
   Inject CSS persis sama dengan HTML asli
───────────────────────────────────────── */
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

  :root {
    --green-50:#ecfdf5;--green-100:#d1fae5;--green-500:#10b981;--green-600:#059669;--green-700:#047857;--green-800:#065f46;
    --gold-50:#fefce8;--gold-100:#fef9c3;--gold-200:#fef08a;--gold-400:#facc15;--gold-500:#eab308;--gold-700:#a16207;
    --blue-50:#eff6ff;--blue-100:#dbeafe;--blue-500:#3b82f6;--blue-700:#1d4ed8;
    --slate-50:#f8fafc;--slate-100:#f1f5f9;--slate-200:#e2e8f0;--slate-300:#cbd5e1;--slate-400:#94a3b8;--slate-500:#64748b;--slate-600:#475569;--slate-700:#334155;--slate-800:#1e293b;--slate-900:#0f172a;
    --r:14px;--rs:10px;
  }
  *{box-sizing:border-box}

  .bk-body{font-family:'Plus Jakarta Sans',sans-serif;background:var(--slate-50);color:var(--slate-800);min-height:100vh}

  .top-bar{background:#fff;border-bottom:1px solid var(--slate-200);padding:14px 20px;display:flex;align-items:center;gap:12px;position:sticky;top:0;z-index:100}
  .logo-c{width:38px;height:38px;background:var(--gold-400);border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:13px;color:var(--slate-800);flex-shrink:0}
  .top-bar h2{font-size:14px;font-weight:700;color:var(--slate-900);margin:0;padding:0}
  .top-bar p{font-size:11px;color:var(--slate-400);font-weight:500;margin:0;padding:0}

  .container{max-width:680px;margin:0 auto;padding:20px 16px 80px}

  .sel-label{font-size:11px;font-weight:700;color:var(--slate-400);text-transform:uppercase;letter-spacing:.7px;margin-bottom:6px}
  .sel-wrap{position:relative;margin-bottom:16px}
  .sel{width:100%;padding:12px 40px 12px 14px;background:#fff;border:1.5px solid var(--slate-200);border-radius:var(--rs);font-family:inherit;font-size:14px;font-weight:600;color:var(--slate-800);-webkit-appearance:none;-moz-appearance:none;appearance:none;cursor:pointer}
  .sel:focus{outline:none;border-color:var(--green-500);box-shadow:0 0 0 3px rgba(16,185,129,.1)}
  .sel-wrap::after{content:'▼';position:absolute;right:14px;top:50%;transform:translateY(-50%);font-size:9px;color:var(--slate-400);pointer-events:none}

  .row2{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:0}
  @media(max-width:480px){.row2{grid-template-columns:1fr}}

  .scheme-toggle{display:flex;gap:6px;background:#fff;border:1.5px solid var(--slate-200);border-radius:var(--rs);padding:3px;margin-bottom:16px}
  .sch-btn{flex:1;padding:9px 8px;border:none;background:none;border-radius:6px;font-family:inherit;font-size:12px;font-weight:600;color:var(--slate-500);cursor:pointer;transition:all .2s}
  .sch-btn.on{background:var(--green-600);color:#fff;box-shadow:0 2px 8px rgba(5,150,105,.25)}

  .hero{border-radius:var(--r);padding:22px 18px;color:#fff;position:relative;overflow:hidden;margin-bottom:10px;box-shadow:0 4px 20px rgba(5,150,105,.22)}
  .hero.green{background:linear-gradient(135deg,var(--green-700),var(--green-800))}
  .hero.dark{background:linear-gradient(135deg,var(--slate-700),var(--slate-900));box-shadow:0 4px 20px rgba(15,23,42,.18)}
  .hero::before{content:'';position:absolute;top:-40px;right:-40px;width:150px;height:150px;background:rgba(255,255,255,.06);border-radius:50%}
  .hero-lbl{font-size:12px;font-weight:600;opacity:.85;margin-bottom:5px}
  .hero-price{font-size:34px;font-weight:800;letter-spacing:-1px;line-height:1.1;margin-bottom:10px;position:relative;z-index:1}
  .hero-msg{display:flex;align-items:flex-start;gap:9px;background:rgba(255,255,255,.13);-webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px);border-radius:var(--rs);padding:11px 13px;font-size:12.5px;line-height:1.5;font-weight:500;position:relative;z-index:1}
  .hero-msg .ic{flex-shrink:0;width:20px;height:20px;background:rgba(255,255,255,.25);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:11px;margin-top:1px}

  .info-strip{display:flex;align-items:center;gap:8px;padding:9px 13px;background:var(--green-50);border:1px solid var(--green-100);border-radius:var(--rs);margin-bottom:20px;font-size:11.5px;color:var(--green-700);font-weight:500;line-height:1.45}
  .info-strip svg{flex-shrink:0}

  .stepper{display:flex;align-items:stretch;margin-bottom:22px;position:relative}
  .step{flex:1;text-align:center;position:relative;padding:0 3px}
  .step-c{width:30px;height:30px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;margin:0 auto 6px;position:relative;z-index:2}
  .step:nth-child(3) .step-c{background:var(--green-600);color:#fff;box-shadow:0 0 0 3px var(--green-100)}
  .step:nth-child(4) .step-c{background:var(--gold-400);color:var(--gold-700);box-shadow:0 0 0 3px var(--gold-100)}
  .step:nth-child(5) .step-c{background:var(--slate-200);color:var(--slate-500);box-shadow:0 0 0 3px var(--slate-100)}
  .step:nth-child(6) .step-c{background:var(--blue-500);color:#fff;box-shadow:0 0 0 3px var(--blue-100)}

  /* Fallback: use data-step attribute for reliable coloring */
  .step[data-step="1"] .step-c{background:var(--green-600);color:#fff;box-shadow:0 0 0 3px var(--green-100)}
  .step[data-step="2"] .step-c{background:var(--blue-500);color:#fff;box-shadow:0 0 0 3px var(--blue-100)}
  .step[data-step="3"] .step-c{background:var(--slate-200);color:var(--slate-500);box-shadow:0 0 0 3px var(--slate-100)}
  .step[data-step="4"] .step-c{background:var(--blue-500);color:#fff;box-shadow:0 0 0 3px var(--blue-100)}
  .step-l{font-size:10.5px;font-weight:600;color:var(--slate-700);margin-bottom:2px;line-height:1.25}
  .step-s{font-size:9.5px;color:var(--slate-400);font-weight:500}
  .stline{position:absolute;top:15px;left:12%;right:12%;height:2px;background:var(--slate-200);z-index:1}
  .stfill{position:absolute;top:15px;left:12%;width:28%;height:2px;background:var(--green-500);z-index:1}

  .sec-t{font-size:14px;font-weight:700;color:var(--slate-800);margin-bottom:10px}
  .inst-grid{display:flex;flex-direction:column;gap:10px;margin-bottom:16px}

  .icard{border-radius:var(--r);overflow:hidden}
  .icard.pri{background:#fff;border:2px solid var(--green-500);box-shadow:0 2px 10px rgba(5,150,105,.1)}
  .icard.sec{background:#fff;border:1.5px solid var(--slate-200)}
  .icard.ter{background:#fff;border:1.5px solid var(--blue-500);box-shadow:0 2px 10px rgba(59,130,246,.08)}

  .ch{padding:12px 14px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:6px}
  .icard.pri .ch{background:var(--green-50);border-bottom:1px solid var(--green-100)}
  .icard.sec .ch{background:var(--slate-50);border-bottom:1px solid var(--slate-100)}
  .icard.ter .ch{background:var(--blue-50);border-bottom:1px solid var(--blue-100)}
  .ch-l{display:flex;align-items:center;gap:7px}
  .cbadge{padding:2px 7px;border-radius:100px;font-size:9px;font-weight:700;letter-spacing:.3px;text-transform:uppercase}
  .icard.pri .cbadge{background:var(--green-600);color:#fff}
  .icard.sec .cbadge{background:var(--slate-200);color:var(--slate-500)}
  .icard.ter .cbadge{background:var(--blue-500);color:#fff}
  .ct{font-size:13px;font-weight:700;color:var(--slate-800)}
  .cp{font-size:15px;font-weight:800;letter-spacing:-.5px}
  .icard.pri .cp{color:var(--green-700)}
  .icard.sec .cp{color:var(--slate-600)}
  .icard.ter .cp{color:var(--blue-700)}

  .cb{padding:0 14px 10px}
  .fr{display:flex;justify-content:space-between;align-items:center;padding:9px 0;border-bottom:1px solid var(--slate-100);font-size:12.5px}
  .fr:last-child{border-bottom:none}
  .fl{color:var(--slate-600);font-weight:500}
  .fl small{display:block;font-size:10px;color:var(--slate-400);font-weight:400;margin-top:1px}
  .fa{font-weight:600;color:var(--slate-700);font-variant-numeric:tabular-nums;white-space:nowrap}
  .fr.tot{border-top:2px solid var(--slate-200);border-bottom:none;padding-top:10px;margin-top:2px}
  .fr.tot .fl{font-weight:700;color:var(--slate-800)}
  .fr.tot .fa{font-weight:800;color:var(--slate-900);font-size:13px}

  .card-toggle{display:flex;align-items:center;justify-content:space-between;width:100%;padding:12px 14px;background:none;border:none;cursor:pointer;font-family:inherit}
  .tgl-l{display:flex;align-items:center;gap:7px}
  .tgl-ic{width:20px;height:20px;border-radius:50%;background:var(--slate-100);display:flex;align-items:center;justify-content:center;transition:transform .25s;font-size:9px;color:var(--slate-500)}
  .tgl-ic.open{transform:rotate(180deg)}
  .collapsible{max-height:0;overflow:hidden;transition:max-height .35s ease}
  .collapsible.open{max-height:500px}

  .total-bar{background:#fff;border:1.5px solid var(--slate-200);border-radius:var(--r);padding:12px 14px;display:flex;justify-content:space-between;align-items:center}
  .tb-l{font-size:12px;font-weight:600;color:var(--slate-500)}
  .tb-s{font-size:10px;color:var(--slate-400);font-weight:500;margin-top:1px}
  .tb-p{font-size:16px;font-weight:800;color:var(--slate-800);letter-spacing:-.5px}

  .notice{border-radius:var(--rs);padding:10px 13px;margin-bottom:14px;font-size:11.5px;font-weight:500;line-height:1.45}
  .notice.gold{background:var(--gold-50);border:1px solid var(--gold-200);color:var(--gold-700)}
  .notice.green{background:var(--green-50);border:1px solid var(--green-100);color:var(--green-700)}

  @keyframes fadeUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
  .anim{animation:fadeUp .3s ease forwards}

  @media(max-width:480px){
    .hero-price{font-size:28px}
    .step-l{font-size:9.5px}
    .step-s{font-size:8.5px}
  }
`;

/* ─────────────────────────────────────────
   Helpers
───────────────────────────────────────── */
const fmt = (n) => {
  if (!n && n !== 0) return "-";
  return "Rp " + Number(n).toLocaleString("id-ID");
};

const komponenDesc = {
  "DP (Dana Pembangunan)": "Biaya pengembangan sarana & prasarana kampus",
  "DPP (Dana Penyelengaraan Pendidikan)": "Biaya pokok perkuliahan per semester",
  "DPPS (Praktikum/Fasilitas)": "Biaya lab, peralatan & fasilitas belajar",
  PKKMB: "Orientasi mahasiswa baru (satu kali bayar)",
  DPP: "Biaya pokok perkuliahan per semester",
  "DP (50%)": "Biaya pengembangan sarana & prasarana kampus (tahap 1)",
  "DP (25%)": "Biaya pengembangan sarana & prasarana kampus (tahap 2)",
  "DPP Semester 1 (50%)": "Biaya pokok perkuliahan semester 1 (tahap 1)",
  "DPP Semester 2 (100%)": "Biaya pokok perkuliahan semester 2",
  "Infak Wajib (50%)": "Sumbangan wajib masuk Fakultas Kedokteran",
  "Infak Kelipatan (50%)": "Sumbangan sukarela (kelipatan Rp 25 juta)",
};

/* ─────────────────────────────────────────
   CicilanCard
───────────────────────────────────────── */
function CicilanCard({ rincian, total, badge, title, cls, collapsible }) {
  const [open, setOpen] = useState(false);

  const rows = (rincian || []).map((r, i) => {
    const isInfakKelipatan = r.komponen?.includes("Infak Kelipatan");
    const nomDisplay = isInfakKelipatan ? "Kelipatan Rp 25.000.000" : fmt(r.nominal);
    const desc = komponenDesc[r.komponen] || "";
    return (
      <div key={i} className="fr">
        <div className="fl">
          {r.komponen}
          {desc && <small>{desc}</small>}
        </div>
        <div className="fa">{nomDisplay}</div>
      </div>
    );
  });

  const totalRow = (
    <div className="fr tot">
      <div className="fl">Total {title}</div>
      <div className="fa">{fmt(total)}</div>
    </div>
  );

  if (collapsible) {
    return (
      <div className={`icard ${cls}`}>
        <button className="card-toggle" onClick={() => setOpen((o) => !o)}>
          <div className="tgl-l">
            <span className="cbadge">{badge}</span>
            <span className="ct">{title}</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "7px" }}>
            <div className="cp">{fmt(total)}</div>
            <div className={`tgl-ic${open ? " open" : ""}`}>▼</div>
          </div>
        </button>
        <div className={`collapsible${open ? " open" : ""}`}>
          <div className="cb">
            {rows}
            {totalRow}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`icard ${cls}`}>
      <div className="ch">
        <div className="ch-l">
          <span className="cbadge">{badge}</span>
          <span className="ct">{title}</span>
        </div>
        <div className="cp">{fmt(total)}</div>
      </div>
      <div className="cb">
        {rows}
        {totalRow}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   RenderCicilan — exact same logic as HTML
───────────────────────────────────────── */
function RenderCicilan({ p, currentSemester, currentGelombang, isFKIP, cCount }) {
  const sems = p.isKedokteran
    ? p.gelombang[currentGelombang]?.semesters || []
    : p.semesters || [];
  const s = sems.find((x) => x.semester === currentSemester) || sems[0];
  if (!s) return <p>Data tidak tersedia.</p>;

  const c1 = s.cicilan1 || 0;
  const c2 = s.cicilan2 || 0;
  const c3 = (isFKIP ? s.cicilan3 : 0) || 0;
  const total = c1 + c2 + c3;
  const isSem1 = s.semester === 1;
  const hasC2 = c2 > 0 && (s.rincianC2 || []).length > 0;
  const hasC3 = isFKIP && c3 > 0 && (s.rincianC3 || []).length > 0;
  const isKedokSingle = p.isKedokteran && s.semester >= 2;

  return (
    <>
      {/* HERO */}
      {isSem1 && !p.isKedokteran && (
        <div className="hero green">
          <div className="hero-lbl">Mulai kuliahmu hanya dengan</div>
          <div className="hero-price">{fmt(c1)}</div>
          <div className="hero-msg">
            <div className="ic">✓</div>
            <div>
              Cukup bayar cicilan pertama, kamu sudah{" "}
              <strong>resmi menjadi mahasiswa</strong> {p.fakultas} Universitas Pasundan.
            </div>
          </div>
        </div>
      )}
      {p.isKedokteran && isSem1 && (
        <div className="hero green">
          <div className="hero-lbl">
            Pembayaran Cicilan 1 — {p.gelombang[currentGelombang]?.label || ""}
          </div>
          <div className="hero-price">{fmt(c1)}</div>
          <div className="hero-msg">
            <div className="ic">ℹ</div>
            <div>
              Pembayaran awal untuk resmi terdaftar sebagai mahasiswa Fakultas Kedokteran
              Universitas Pasundan.
            </div>
          </div>
        </div>
      )}
      {!isSem1 && (
        <div className="hero dark">
          <div className="hero-lbl">Total Biaya Semester {s.semester}</div>
          <div className="hero-price">{fmt(total)}</div>
          <div className="hero-msg">
            <div className="ic">ℹ</div>
            <div>
              {isKedokSingle
                ? "Pembayaran semester ini dilakukan dalam satu tahap."
                : `Dibayar dalam ${cCount} tahap cicilan.`}
            </div>
          </div>
        </div>
      )}

      {/* INFO STRIP */}
      {isSem1 && !p.isKedokteran && (
        <div className="info-strip">
          <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
            <path
              d="M8 1.33C4.32 1.33 1.33 4.32 1.33 8s2.99 6.67 6.67 6.67 6.67-2.99 6.67-6.67S11.68 1.33 8 1.33zm.67 10H7.33V7.33h1.34v4zm0-5.33H7.33V4.67h1.34V6z"
              fill="currentColor"
            />
          </svg>
          Biaya semester 1 dibagi {cCount} tahap pembayaran — sisa cicilan dilunasi sebelum UTS.
        </div>
      )}

      {/* STEPPER */}
      {isSem1 && !p.isKedokteran && (
        <div className="stepper">
          <div className="stline" />
          <div className="stfill" />
          <div className="step" data-step="1">
            <div className="step-c">1</div>
            <div className="step-l">Bayar Cicilan 1</div>
            <div className="step-s">{fmt(c1)}</div>
          </div>
          <div className="step" data-step="2">
            <div className="step-c">2</div>
            <div className="step-l">Mulai Kuliah</div>
            <div className="step-s">Resmi mahasiswa</div>
          </div>
          {isFKIP ? (
            <>
              <div className="step" data-step="3">
                <div className="step-c">3</div>
                <div className="step-l">Cicilan 2</div>
                <div className="step-s">{fmt(c2)}</div>
              </div>
              <div className="step" data-step="4">
                <div className="step-c">4</div>
                <div className="step-l">Cicilan 3</div>
                <div className="step-s">{fmt(c3)}</div>
              </div>
            </>
          ) : (
            <div className="step" data-step="3">
              <div className="step-c">3</div>
              <div className="step-l">Lunasi Cicilan 2</div>
              <div className="step-s">{fmt(c2)}</div>
            </div>
          )}
        </div>
      )}

      {/* SECTION TITLE */}
      <div className="sec-t">
        Rincian — {p.prodi} (Semester {s.semester})
      </div>

      {/* CARDS */}
      <div className="inst-grid">
        <CicilanCard
          rincian={s.rincianC1}
          total={c1}
          badge={isSem1 ? "Bayar Sekarang" : `Cicilan ${(s.semester - 1) * cCount + 1}`}
          title="Cicilan 1"
          cls="pri"
          collapsible={false}
        />
        {hasC2 && (
          <CicilanCard
            rincian={s.rincianC2}
            total={c2}
            badge={isSem1 ? "Bayar Nanti" : `Cicilan ${(s.semester - 1) * cCount + 2}`}
            title="Cicilan 2"
            cls="sec"
            collapsible={true}
          />
        )}
        {hasC3 && (
          <CicilanCard
            rincian={s.rincianC3}
            total={c3}
            badge={isSem1 ? "Bayar Nanti" : `Cicilan ${(s.semester - 1) * cCount + 3}`}
            title="Cicilan 3"
            cls="ter"
            collapsible={true}
          />
        )}
      </div>

      {/* TOTAL BAR */}
      <div className="total-bar">
        <div>
          <div className="tb-l">Total Biaya Semester {s.semester}</div>
          <div className="tb-s">
            {hasC3 ? "Cicilan 1 + 2 + 3" : hasC2 ? "Cicilan 1 + 2" : "Pembayaran penuh"}
          </div>
        </div>
        <div className="tb-p">{fmt(total)}</div>
      </div>
    </>
  );
}

/* ─────────────────────────────────────────
   RenderLunas
───────────────────────────────────────── */
function RenderLunas({ p, currentGelombang, isFKIP, cCount }) {
  const sems = p.isKedokteran
    ? p.gelombang[currentGelombang]?.semesters || []
    : p.semesters || [];
  const maxSem = p.isKedokteran ? 7 : 8;

  const kompMap = {};
  let grand = 0;
  sems
    .filter((s) => s.semester >= 1 && s.semester <= maxSem)
    .forEach((s) => {
      const allR = [
        ...(s.rincianC1 || []),
        ...(s.rincianC2 || []),
        ...(cCount === 3 ? s.rincianC3 || [] : []),
      ];
      allR.forEach((r) => {
        if (r.komponen?.includes("Infak Kelipatan")) return;
        if (!r.nominal) return;
        if (!kompMap[r.komponen]) kompMap[r.komponen] = {};
        if (!kompMap[r.komponen][s.semester]) kompMap[r.komponen][s.semester] = 0;
        kompMap[r.komponen][s.semester] += r.nominal;
        grand += r.nominal;
      });
    });

  const semTotals = {};
  for (let i = 1; i <= maxSem; i++) {
    semTotals[i] = Object.values(kompMap).reduce((sum, row) => sum + (row[i] || 0), 0);
  }

  return (
    <>
      <div className="hero dark">
        <div className="hero-lbl">Total Biaya s/d Lulus ({maxSem} Semester)</div>
        <div className="hero-price">{fmt(grand)}</div>
        <div className="hero-msg">
          <div className="ic">📊</div>
          <div>
            Rincian lengkap biaya dari semester 1 sampai {maxSem}.{" "}
            {p.isKedokteran ? "Belum termasuk Infak Kelipatan." : ""}
          </div>
        </div>
      </div>

      <div
        style={{
          overflowX: "auto",
          marginTop: "16px",
          borderRadius: "var(--r)",
          border: "1.5px solid var(--slate-200)",
        }}
      >
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            fontSize: "11.5px",
            background: "#fff",
            minWidth: `${maxSem * 90 + 200}px`,
          }}
        >
          <thead>
            <tr style={{ background: "var(--slate-100)" }}>
              <th
                style={{
                  padding: "10px 12px",
                  border: "1px solid var(--slate-200)",
                  textAlign: "left",
                  fontWeight: 700,
                  position: "sticky",
                  left: 0,
                  background: "var(--slate-100)",
                  zIndex: 2,
                }}
              >
                Komponen
              </th>
              {Array.from({ length: maxSem }, (_, i) => (
                <th
                  key={i}
                  style={{
                    padding: "10px 8px",
                    border: "1px solid var(--slate-200)",
                    textAlign: "center",
                    fontWeight: 700,
                    whiteSpace: "nowrap",
                  }}
                >
                  Sem {i + 1}
                </th>
              ))}
              <th
                style={{
                  padding: "10px 8px",
                  border: "1px solid var(--slate-200)",
                  textAlign: "center",
                  fontWeight: 800,
                  background: "var(--green-50)",
                }}
              >
                Jumlah
              </th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(kompMap).map(([komp, vals]) => {
              const rowTotal = Object.values(vals).reduce((a, b) => a + b, 0);
              return (
                <tr key={komp}>
                  <td
                    style={{
                      padding: "8px 12px",
                      border: "1px solid var(--slate-200)",
                      fontWeight: 600,
                      position: "sticky",
                      left: 0,
                      background: "#fff",
                      zIndex: 1,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {komp}
                  </td>
                  {Array.from({ length: maxSem }, (_, i) => (
                    <td
                      key={i}
                      style={{
                        padding: "8px",
                        border: "1px solid var(--slate-200)",
                        textAlign: "right",
                      }}
                    >
                      {vals[i + 1] ? fmt(vals[i + 1]) : "-"}
                    </td>
                  ))}
                  <td
                    style={{
                      padding: "8px",
                      border: "1px solid var(--slate-200)",
                      textAlign: "right",
                      fontWeight: 800,
                      background: "var(--green-50)",
                    }}
                  >
                    {fmt(rowTotal)}
                  </td>
                </tr>
              );
            })}
            <tr style={{ background: "var(--slate-50)" }}>
              <td
                style={{
                  padding: "10px 12px",
                  border: "1px solid var(--slate-200)",
                  fontWeight: 800,
                  position: "sticky",
                  left: 0,
                  background: "var(--slate-50)",
                  zIndex: 1,
                }}
              >
                Total
              </td>
              {Array.from({ length: maxSem }, (_, i) => (
                <td
                  key={i}
                  style={{
                    padding: "10px 8px",
                    border: "1px solid var(--slate-200)",
                    textAlign: "right",
                    fontWeight: 700,
                  }}
                >
                  {semTotals[i + 1] ? fmt(semTotals[i + 1]) : "-"}
                </td>
              ))}
              <td
                style={{
                  padding: "10px 8px",
                  border: "1px solid var(--slate-200)",
                  textAlign: "right",
                  fontWeight: 800,
                  background: "var(--gold-50)",
                  color: "var(--slate-900)",
                }}
              >
                {fmt(grand)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {p.isKedokteran && (
        <div className="notice gold" style={{ marginTop: "12px" }}>
          *) Total biaya belum termasuk Infak Kelipatan (minimal kelipatan Rp 25.000.000)
        </div>
      )}
    </>
  );
}

/* ─────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────── */
export default function BiayaKuliah() {
  const [selectedProdiIdx, setSelectedProdiIdx] = useState(0);
  const [scheme, setScheme] = useState("cicilan");
  const [currentSemester, setCurrentSemester] = useState(1);
  const [currentGelombang, setCurrentGelombang] = useState(1);
  const [animKey, setAnimKey] = useState(0);

  const p = rawDataBiayaProdi[selectedProdiIdx] || rawDataBiayaProdi[0];
  const isFKIP = p.fakultas === "Fakultas Keguruan dan Ilmu Pendidikan";
  const cicilanCount = isFKIP ? 3 : 2;

  const getSems = () =>
    p.isKedokteran ? p.gelombang[currentGelombang]?.semesters || [] : p.semesters || [];
  const semNums = [...new Set(getSems().map((s) => s.semester))].sort((a, b) => a - b);

  const triggerAnim = () => setAnimKey((k) => k + 1);

  const handleProdiChange = (idx) => {
    setSelectedProdiIdx(idx);
    setCurrentSemester(1);
    setCurrentGelombang(1);
    triggerAnim();
  };
  const handleSemChange = (sem) => { setCurrentSemester(sem); triggerAnim(); };
  const handleGelChange = (gel) => { setCurrentGelombang(gel); setCurrentSemester(1); triggerAnim(); };
  const handleScheme = (s) => { setScheme(s); triggerAnim(); };

  // Build optgroups
  const groups = [];
  let lastFak = "";
  rawDataBiayaProdi.forEach((prodi, i) => {
    if (prodi.fakultas !== lastFak) {
      groups.push({ fakultas: prodi.fakultas, items: [] });
      lastFak = prodi.fakultas;
    }
    groups[groups.length - 1].items.push({ prodi: prodi.prodi, idx: i });
  });

  return (
    <div className="bk-body">
      <style>{CSS}</style>

      {/* TOP BAR */}
      <div className="top-bar">
        <img
          src="/biaya/rincian-lengkap-v2//logo_unpas.png"
          alt="Logo Universitas Pasundan"
          style={{ width: "38px", height: "38px", objectFit: "contain", flexShrink: 0 }}
        />
        <div>
          <h2>Rincian Biaya Pendidikan (S1)</h2>
          <p>Universitas Pasundan · TA 2025/2026</p>
        </div>
      </div>

      {/* CONTAINER */}
      <div className="container">

        {/* Pilih Program Studi */}
        <div className="sel-label">Pilih Program Studi</div>
        <div className="sel-wrap">
          <select
            className="sel"
            value={selectedProdiIdx}
            onChange={(e) => handleProdiChange(+e.target.value)}
          >
            {groups.map((g) => (
              <optgroup key={g.fakultas} label={g.fakultas}>
                {g.items.map((item) => (
                  <option key={item.idx} value={item.idx}>
                    {item.prodi}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
        </div>

        {/* Semester + Gelombang */}
        <div className={p.isKedokteran ? "row2" : ""}>
          <div>
            <div className="sel-label">Pilih Semester</div>
            <div className="sel-wrap">
              <select
                className="sel"
                value={currentSemester}
                onChange={(e) => handleSemChange(+e.target.value)}
              >
                {semNums.map((n) => (
                  <option key={n} value={n}>Semester {n}</option>
                ))}
              </select>
            </div>
          </div>

          {p.isKedokteran && (
            <div>
              <div className="sel-label">Pilih Gelombang</div>
              <div className="sel-wrap">
                <select
                  className="sel"
                  value={currentGelombang}
                  onChange={(e) => handleGelChange(+e.target.value)}
                >
                  {Object.keys(p.gelombang).map((g) => (
                    <option key={g} value={+g}>{p.gelombang[g].label}</option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Skema Toggle */}
        <div className="sel-label">Skema Pembayaran</div>
        <div className="scheme-toggle">
          <button
            className={`sch-btn${scheme === "cicilan" ? " on" : ""}`}
            onClick={() => handleScheme("cicilan")}
          >
            Cicilan
          </button>
          <button
            className={`sch-btn${scheme === "lunas" ? " on" : ""}`}
            onClick={() => handleScheme("lunas")}
          >
            Lihat s/d Lulus
          </button>
        </div>

        {/* Content */}
        <div key={animKey} className="anim">
          {scheme === "lunas" ? (
            <RenderLunas
              p={p}
              currentGelombang={currentGelombang}
              isFKIP={isFKIP}
              cCount={cicilanCount}
            />
          ) : (
            <RenderCicilan
              p={p}
              currentSemester={currentSemester}
              currentGelombang={currentGelombang}
              isFKIP={isFKIP}
              cCount={cicilanCount}
            />
          )}
        </div>
      </div>
    </div>
  );
}
