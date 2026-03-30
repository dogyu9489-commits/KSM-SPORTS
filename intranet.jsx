import { useState, useEffect } from "react";

// ── 초기 데이터 ──────────────────────────────────────────────
const INITIAL_NOTICES = [
  { id: 1, title: "2025년 하반기 워크숍 일정 안내", author: "인사팀", date: "2025-03-28", category: "인사", content: "2025년 하반기 전사 워크숍이 6월 20일~21일 양일간 강원도 평창에서 진행됩니다. 참석 여부를 4월 10일까지 인사팀에 회신 바랍니다.", pinned: true },
  { id: 2, title: "사내 보안 정책 업데이트", author: "IT팀", date: "2025-03-25", category: "IT", content: "개인정보보호법 개정에 따라 사내 보안 정책이 업데이트되었습니다. 모든 임직원은 4월 1일 전까지 보안 교육을 완료해 주시기 바랍니다.", pinned: true },
  { id: 3, title: "3월 생일자 축하합니다 🎉", author: "총무팀", date: "2025-03-01", category: "공지", content: "이번 달 생일을 맞이한 임직원들을 축하합니다. 해당 직원들은 총무팀에서 소정의 선물을 수령하시기 바랍니다.", pinned: false },
  { id: 4, title: "구내식당 3월 메뉴 공지", author: "총무팀", date: "2025-03-01", category: "공지", content: "3월 구내식당 주간 메뉴가 업데이트되었습니다. 매주 화·목요일은 특식이 제공될 예정입니다.", pinned: false },
];

const INITIAL_EMPLOYEES = [
  { id: 1, name: "김민준", dept: "개발팀", role: "팀장", email: "minjun.kim@company.com", phone: "010-1234-5678", status: "재직" },
  { id: 2, name: "이서연", dept: "디자인팀", role: "선임디자이너", email: "seoyeon.lee@company.com", phone: "010-2345-6789", status: "재직" },
  { id: 3, name: "박지호", dept: "영업팀", role: "팀장", email: "jiho.park@company.com", phone: "010-3456-7890", status: "재직" },
  { id: 4, name: "최유진", dept: "인사팀", role: "HR매니저", email: "yujin.choi@company.com", phone: "010-4567-8901", status: "재직" },
  { id: 5, name: "정다은", dept: "개발팀", role: "백엔드개발자", email: "daeun.jung@company.com", phone: "010-5678-9012", status: "재직" },
  { id: 6, name: "한소희", dept: "마케팅팀", role: "마케터", email: "sohee.han@company.com", phone: "010-6789-0123", status: "출장" },
  { id: 7, name: "윤성호", dept: "IT팀", role: "시스템엔지니어", email: "sungho.yoon@company.com", phone: "010-7890-1234", status: "재직" },
  { id: 8, name: "임채원", dept: "디자인팀", role: "UI디자이너", email: "chaewon.lim@company.com", phone: "010-8901-2345", status: "휴가" },
];

const INITIAL_DOCS = [
  { id: 1, name: "2025 사업계획서.pdf", dept: "경영기획", size: "2.4MB", date: "2025-03-20", type: "pdf", downloads: 34 },
  { id: 2, name: "직원 복리후생 안내.docx", dept: "인사팀", size: "856KB", date: "2025-03-15", type: "doc", downloads: 112 },
  { id: 3, name: "Q1 영업 실적 보고서.xlsx", dept: "영업팀", size: "1.2MB", date: "2025-03-28", type: "xls", downloads: 28 },
  { id: 4, name: "사내 보안 가이드라인.pdf", dept: "IT팀", size: "3.1MB", date: "2025-03-25", type: "pdf", downloads: 67 },
  { id: 5, name: "신입사원 온보딩 자료.pptx", dept: "인사팀", size: "18.7MB", date: "2025-02-28", type: "ppt", downloads: 45 },
  { id: 6, name: "마케팅 브랜드 가이드.pdf", dept: "마케팅팀", size: "7.8MB", date: "2025-03-10", type: "pdf", downloads: 89 },
];

const INITIAL_EVENTS = [
  { id: 1, title: "전체 주간 회의", date: "2025-03-31", time: "10:00", dept: "전사", color: "#6366f1" },
  { id: 2, title: "개발팀 스프린트 리뷰", date: "2025-04-02", time: "14:00", dept: "개발팀", color: "#0ea5e9" },
  { id: 3, title: "신입사원 OT", date: "2025-04-03", time: "09:00", dept: "인사팀", color: "#10b981" },
  { id: 4, title: "Q1 성과 발표", date: "2025-04-07", time: "15:00", dept: "경영기획", color: "#f59e0b" },
  { id: 5, title: "보안 교육", date: "2025-04-10", time: "11:00", dept: "전사", color: "#ef4444" },
  { id: 6, title: "마케팅 캠페인 킥오프", date: "2025-04-14", time: "13:00", dept: "마케팅팀", color: "#ec4899" },
];

const DEPT_COLORS = {
  개발팀: "#6366f1",
  디자인팀: "#ec4899",
  영업팀: "#0ea5e9",
  인사팀: "#10b981",
  마케팅팀: "#f59e0b",
  IT팀: "#ef4444",
  경영기획: "#8b5cf6",
  총무팀: "#14b8a6",
};

const FILE_ICONS = {
  pdf: { icon: "📄", color: "#ef4444", bg: "#fef2f2" },
  doc: { icon: "📝", color: "#3b82f6", bg: "#eff6ff" },
  xls: { icon: "📊", color: "#10b981", bg: "#f0fdf4" },
  ppt: { icon: "📋", color: "#f59e0b", bg: "#fffbeb" },
};

// ── 유틸 ────────────────────────────────────────────────────
function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}
function getFirstDayOfMonth(year, month) {
  return new Date(year, month, 1).getDay();
}
const MONTHS_KR = ["1월","2월","3월","4월","5월","6월","7월","8월","9월","10월","11월","12월"];
const DAYS_KR = ["일","월","화","수","목","금","토"];

// ── 컴포넌트들 ───────────────────────────────────────────────

function Avatar({ name, size = 36, dept }) {
  const color = DEPT_COLORS[dept] || "#6366f1";
  const initials = name ? name[0] : "?";
  return (
    <div style={{
      width: size, height: size, borderRadius: "50%",
      background: color + "22", color,
      display: "flex", alignItems: "center", justifyContent: "center",
      fontWeight: 700, fontSize: size * 0.38,
      border: `2px solid ${color}44`, flexShrink: 0,
      fontFamily: "'Noto Sans KR', sans-serif",
    }}>{initials}</div>
  );
}

function Badge({ label, color }) {
  return (
    <span style={{
      background: color + "18", color,
      padding: "2px 10px", borderRadius: 20,
      fontSize: 11, fontWeight: 700, letterSpacing: 0.3,
    }}>{label}</span>
  );
}

function StatusDot({ status }) {
  const map = { 재직: "#10b981", 출장: "#f59e0b", 휴가: "#6366f1", 퇴직: "#ef4444" };
  return <span style={{ width: 8, height: 8, borderRadius: "50%", background: map[status] || "#94a3b8", display: "inline-block", marginRight: 5 }} />;
}

// ── 공지사항 ─────────────────────────────────────────────────
function NoticeBoard() {
  const [notices, setNotices] = useState(INITIAL_NOTICES);
  const [selected, setSelected] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState("");
  const [form, setForm] = useState({ title: "", author: "", category: "공지", content: "" });

  const filtered = notices.filter(n =>
    n.title.includes(search) || n.author.includes(search) || n.category.includes(search)
  );
  const sorted = [...filtered].sort((a, b) => b.pinned - a.pinned || new Date(b.date) - new Date(a.date));

  function submit() {
    if (!form.title || !form.content) return;
    const next = { ...form, id: Date.now(), date: new Date().toISOString().slice(0,10), pinned: false };
    setNotices(p => [next, ...p]);
    setForm({ title: "", author: "", category: "공지", content: "" });
    setShowForm(false);
  }

  const catColors = { 인사: "#10b981", IT: "#6366f1", 공지: "#f59e0b", 공고: "#ec4899" };

  return (
    <div style={{ display: "flex", gap: 20, height: "100%", minHeight: 0 }}>
      {/* 목록 */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 14, minWidth: 0 }}>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <div style={{ flex: 1, position: "relative" }}>
            <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "#94a3b8", fontSize: 15 }}>🔍</span>
            <input value={search} onChange={e => setSearch(e.target.value)}
              placeholder="공지사항 검색..."
              style={{ width: "100%", padding: "9px 12px 9px 36px", borderRadius: 10, border: "1.5px solid #e2e8f0", background: "#f8fafc", fontSize: 13, outline: "none", boxSizing: "border-box" }} />
          </div>
          <button onClick={() => setShowForm(p => !p)} style={{ padding: "9px 18px", background: "#6366f1", color: "#fff", border: "none", borderRadius: 10, cursor: "pointer", fontWeight: 700, fontSize: 13, whiteSpace: "nowrap" }}>
            + 새 공지
          </button>
        </div>

        {showForm && (
          <div style={{ background: "#f8fafc", border: "1.5px solid #e2e8f0", borderRadius: 14, padding: 18, display: "flex", flexDirection: "column", gap: 10 }}>
            <b style={{ fontSize: 14, color: "#334155" }}>새 공지사항 작성</b>
            <div style={{ display: "flex", gap: 8 }}>
              <input value={form.title} onChange={e => setForm(p => ({...p, title: e.target.value}))}
                placeholder="제목" style={{ flex: 1, padding: "8px 12px", borderRadius: 8, border: "1.5px solid #e2e8f0", fontSize: 13 }} />
              <input value={form.author} onChange={e => setForm(p => ({...p, author: e.target.value}))}
                placeholder="작성팀" style={{ width: 100, padding: "8px 12px", borderRadius: 8, border: "1.5px solid #e2e8f0", fontSize: 13 }} />
              <select value={form.category} onChange={e => setForm(p => ({...p, category: e.target.value}))}
                style={{ padding: "8px 10px", borderRadius: 8, border: "1.5px solid #e2e8f0", fontSize: 13 }}>
                {["공지","인사","IT","공고"].map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <textarea value={form.content} onChange={e => setForm(p => ({...p, content: e.target.value}))}
              placeholder="내용을 입력하세요..." rows={3}
              style={{ padding: "8px 12px", borderRadius: 8, border: "1.5px solid #e2e8f0", fontSize: 13, resize: "vertical" }} />
            <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
              <button onClick={() => setShowForm(false)} style={{ padding: "7px 16px", background: "#f1f5f9", border: "none", borderRadius: 8, cursor: "pointer", fontSize: 13 }}>취소</button>
              <button onClick={submit} style={{ padding: "7px 16px", background: "#6366f1", color: "#fff", border: "none", borderRadius: 8, cursor: "pointer", fontWeight: 700, fontSize: 13 }}>등록</button>
            </div>
          </div>
        )}

        <div style={{ display: "flex", flexDirection: "column", gap: 8, overflowY: "auto", flex: 1 }}>
          {sorted.map(n => (
            <div key={n.id} onClick={() => setSelected(selected?.id === n.id ? null : n)}
              style={{
                padding: "14px 18px", background: selected?.id === n.id ? "#eef2ff" : "#fff",
                border: `1.5px solid ${selected?.id === n.id ? "#6366f1" : "#e2e8f0"}`,
                borderRadius: 12, cursor: "pointer", transition: "all .15s",
                display: "flex", alignItems: "flex-start", gap: 12,
              }}>
              {n.pinned && <span style={{ fontSize: 15, marginTop: 1 }}>📌</span>}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                  <Badge label={n.category} color={catColors[n.category] || "#6366f1"} />
                  <span style={{ fontWeight: 700, fontSize: 14, color: "#1e293b", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{n.title}</span>
                </div>
                <div style={{ fontSize: 12, color: "#94a3b8" }}>{n.author} · {n.date}</div>
                {selected?.id === n.id && (
                  <div style={{ marginTop: 10, fontSize: 13, color: "#475569", lineHeight: 1.7, borderTop: "1px solid #e2e8f0", paddingTop: 10 }}>
                    {n.content}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── 직원 디렉토리 ─────────────────────────────────────────────
function EmployeeDirectory() {
  const [employees] = useState(INITIAL_EMPLOYEES);
  const [search, setSearch] = useState("");
  const [deptFilter, setDeptFilter] = useState("전체");
  const [selected, setSelected] = useState(null);

  const depts = ["전체", ...Array.from(new Set(employees.map(e => e.dept)))];
  const filtered = employees.filter(e =>
    (deptFilter === "전체" || e.dept === deptFilter) &&
    (e.name.includes(search) || e.email.includes(search) || e.role.includes(search))
  );

  return (
    <div style={{ display: "flex", gap: 20, height: "100%", minHeight: 0 }}>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 14 }}>
        {/* 검색 & 필터 */}
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <div style={{ flex: 1, minWidth: 180, position: "relative" }}>
            <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "#94a3b8" }}>🔍</span>
            <input value={search} onChange={e => setSearch(e.target.value)}
              placeholder="이름, 직책, 이메일 검색..."
              style={{ width: "100%", padding: "9px 12px 9px 36px", borderRadius: 10, border: "1.5px solid #e2e8f0", background: "#f8fafc", fontSize: 13, boxSizing: "border-box" }} />
          </div>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {depts.map(d => (
              <button key={d} onClick={() => setDeptFilter(d)}
                style={{ padding: "8px 14px", borderRadius: 20, border: "1.5px solid", cursor: "pointer", fontSize: 12, fontWeight: 600,
                  borderColor: deptFilter === d ? "#6366f1" : "#e2e8f0",
                  background: deptFilter === d ? "#6366f1" : "#fff",
                  color: deptFilter === d ? "#fff" : "#475569" }}>
                {d}
              </button>
            ))}
          </div>
        </div>

        {/* 직원 카드 그리드 */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 14, overflowY: "auto", flex: 1 }}>
          {filtered.map(e => (
            <div key={e.id} onClick={() => setSelected(selected?.id === e.id ? null : e)}
              style={{
                background: "#fff", border: `1.5px solid ${selected?.id === e.id ? "#6366f1" : "#e2e8f0"}`,
                borderRadius: 16, padding: 20, cursor: "pointer", transition: "all .15s",
                boxShadow: selected?.id === e.id ? "0 4px 20px #6366f120" : "none",
              }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                <Avatar name={e.name} dept={e.dept} size={44} />
                <div>
                  <div style={{ fontWeight: 700, fontSize: 15, color: "#1e293b" }}>{e.name}</div>
                  <div style={{ fontSize: 12, color: "#94a3b8" }}>{e.role}</div>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
                <Badge label={e.dept} color={DEPT_COLORS[e.dept] || "#6366f1"} />
                <div style={{ display: "flex", alignItems: "center" }}>
                  <StatusDot status={e.status} />
                  <span style={{ fontSize: 11, color: "#64748b" }}>{e.status}</span>
                </div>
              </div>
              {selected?.id === e.id && (
                <div style={{ borderTop: "1px solid #f1f5f9", paddingTop: 12, display: "flex", flexDirection: "column", gap: 6 }}>
                  <div style={{ fontSize: 12, color: "#475569" }}>✉️ {e.email}</div>
                  <div style={{ fontSize: 12, color: "#475569" }}>📞 {e.phone}</div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── 문서 공유 ─────────────────────────────────────────────────
function DocumentShare() {
  const [docs, setDocs] = useState(INITIAL_DOCS);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("전체");
  const [showUpload, setShowUpload] = useState(false);
  const [newDoc, setNewDoc] = useState({ name: "", dept: "", type: "pdf" });

  const types = ["전체", "pdf", "doc", "xls", "ppt"];
  const filtered = docs.filter(d =>
    (typeFilter === "전체" || d.type === typeFilter) &&
    (d.name.includes(search) || d.dept.includes(search))
  );

  function upload() {
    if (!newDoc.name) return;
    setDocs(p => [{
      ...newDoc, id: Date.now(),
      size: "—", date: new Date().toISOString().slice(0,10), downloads: 0,
    }, ...p]);
    setNewDoc({ name: "", dept: "", type: "pdf" });
    setShowUpload(false);
  }

  function download(id) {
    setDocs(p => p.map(d => d.id === id ? { ...d, downloads: d.downloads + 1 } : d));
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14, height: "100%", minHeight: 0 }}>
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
        <div style={{ flex: 1, minWidth: 180, position: "relative" }}>
          <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "#94a3b8" }}>🔍</span>
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="파일명, 부서 검색..."
            style={{ width: "100%", padding: "9px 12px 9px 36px", borderRadius: 10, border: "1.5px solid #e2e8f0", background: "#f8fafc", fontSize: 13, boxSizing: "border-box" }} />
        </div>
        <div style={{ display: "flex", gap: 6 }}>
          {types.map(t => (
            <button key={t} onClick={() => setTypeFilter(t)}
              style={{ padding: "8px 14px", borderRadius: 20, border: "1.5px solid", cursor: "pointer", fontSize: 12, fontWeight: 600,
                borderColor: typeFilter === t ? "#6366f1" : "#e2e8f0",
                background: typeFilter === t ? "#6366f1" : "#fff",
                color: typeFilter === t ? "#fff" : "#475569" }}>
              {t.toUpperCase()}
            </button>
          ))}
        </div>
        <button onClick={() => setShowUpload(p => !p)} style={{ padding: "9px 18px", background: "#6366f1", color: "#fff", border: "none", borderRadius: 10, cursor: "pointer", fontWeight: 700, fontSize: 13, whiteSpace: "nowrap" }}>
          + 업로드
        </button>
      </div>

      {showUpload && (
        <div style={{ background: "#f8fafc", border: "1.5px solid #e2e8f0", borderRadius: 14, padding: 18, display: "flex", gap: 10, alignItems: "flex-end", flexWrap: "wrap" }}>
          <div style={{ flex: 1, minWidth: 160 }}>
            <div style={{ fontSize: 12, color: "#64748b", marginBottom: 4 }}>파일명</div>
            <input value={newDoc.name} onChange={e => setNewDoc(p => ({...p, name: e.target.value}))}
              placeholder="예: 보고서.pdf"
              style={{ width: "100%", padding: "8px 12px", borderRadius: 8, border: "1.5px solid #e2e8f0", fontSize: 13, boxSizing: "border-box" }} />
          </div>
          <div style={{ width: 120 }}>
            <div style={{ fontSize: 12, color: "#64748b", marginBottom: 4 }}>부서</div>
            <input value={newDoc.dept} onChange={e => setNewDoc(p => ({...p, dept: e.target.value}))}
              placeholder="부서명"
              style={{ width: "100%", padding: "8px 12px", borderRadius: 8, border: "1.5px solid #e2e8f0", fontSize: 13, boxSizing: "border-box" }} />
          </div>
          <div style={{ width: 90 }}>
            <div style={{ fontSize: 12, color: "#64748b", marginBottom: 4 }}>형식</div>
            <select value={newDoc.type} onChange={e => setNewDoc(p => ({...p, type: e.target.value}))}
              style={{ width: "100%", padding: "8px 10px", borderRadius: 8, border: "1.5px solid #e2e8f0", fontSize: 13 }}>
              {["pdf","doc","xls","ppt"].map(t => <option key={t}>{t}</option>)}
            </select>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button onClick={() => setShowUpload(false)} style={{ padding: "8px 14px", background: "#f1f5f9", border: "none", borderRadius: 8, cursor: "pointer", fontSize: 13 }}>취소</button>
            <button onClick={upload} style={{ padding: "8px 16px", background: "#6366f1", color: "#fff", border: "none", borderRadius: 8, cursor: "pointer", fontWeight: 700, fontSize: 13 }}>등록</button>
          </div>
        </div>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: 8, overflowY: "auto", flex: 1 }}>
        {filtered.map(d => {
          const fi = FILE_ICONS[d.type] || FILE_ICONS.pdf;
          return (
            <div key={d.id} style={{ background: "#fff", border: "1.5px solid #e2e8f0", borderRadius: 12, padding: "14px 18px", display: "flex", alignItems: "center", gap: 14 }}>
              <div style={{ width: 42, height: 42, borderRadius: 10, background: fi.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>
                {fi.icon}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 600, fontSize: 14, color: "#1e293b", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{d.name}</div>
                <div style={{ fontSize: 12, color: "#94a3b8", marginTop: 2 }}>{d.dept} · {d.size} · {d.date}</div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <span style={{ fontSize: 12, color: "#94a3b8" }}>⬇️ {d.downloads}</span>
                <button onClick={() => download(d.id)} style={{ padding: "7px 16px", background: "#f8fafc", border: "1.5px solid #e2e8f0", borderRadius: 8, cursor: "pointer", fontSize: 12, fontWeight: 600, color: "#475569" }}>
                  다운로드
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── 캘린더 ───────────────────────────────────────────────────
function Calendar() {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const [events, setEvents] = useState(INITIAL_EVENTS);
  const [showForm, setShowForm] = useState(false);
  const [selectedDay, setSelectedDay] = useState(null);
  const [form, setForm] = useState({ title: "", time: "09:00", dept: "전사" });

  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);

  function prevMonth() { if (month === 0) { setYear(y => y - 1); setMonth(11); } else setMonth(m => m - 1); }
  function nextMonth() { if (month === 11) { setYear(y => y + 1); setMonth(0); } else setMonth(m => m + 1); }

  function getEventsForDay(d) {
    const dateStr = `${year}-${String(month+1).padStart(2,"0")}-${String(d).padStart(2,"0")}`;
    return events.filter(e => e.date === dateStr);
  }

  function addEvent() {
    if (!form.title || !selectedDay) return;
    const dateStr = `${year}-${String(month+1).padStart(2,"0")}-${String(selectedDay).padStart(2,"0")}`;
    const deptColors = { 전사:"#6366f1", 개발팀:"#0ea5e9", 인사팀:"#10b981", 영업팀:"#f59e0b", 마케팅팀:"#ec4899", IT팀:"#ef4444", 경영기획:"#8b5cf6" };
    setEvents(p => [...p, { ...form, id: Date.now(), date: dateStr, color: deptColors[form.dept] || "#6366f1" }]);
    setForm({ title: "", time: "09:00", dept: "전사" });
    setShowForm(false);
  }

  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let i = 1; i <= daysInMonth; i++) cells.push(i);

  const upcoming = [...events]
    .filter(e => e.date >= `${year}-${String(month+1).padStart(2,"0")}-01`)
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 5);

  return (
    <div style={{ display: "flex", gap: 20, height: "100%", minHeight: 0 }}>
      {/* 달력 */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 14, minWidth: 0 }}>
        {/* 헤더 */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <button onClick={prevMonth} style={{ width: 34, height: 34, borderRadius: 8, border: "1.5px solid #e2e8f0", background: "#fff", cursor: "pointer", fontSize: 16 }}>‹</button>
          <span style={{ fontWeight: 800, fontSize: 18, color: "#1e293b" }}>{year}년 {MONTHS_KR[month]}</span>
          <button onClick={nextMonth} style={{ width: 34, height: 34, borderRadius: 8, border: "1.5px solid #e2e8f0", background: "#fff", cursor: "pointer", fontSize: 16 }}>›</button>
        </div>

        {/* 요일 헤더 */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 4 }}>
          {DAYS_KR.map((d, i) => (
            <div key={d} style={{ textAlign: "center", fontSize: 12, fontWeight: 700, color: i === 0 ? "#ef4444" : i === 6 ? "#3b82f6" : "#94a3b8", padding: "4px 0" }}>{d}</div>
          ))}
        </div>

        {/* 날짜 셀 */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 4, flex: 1 }}>
          {cells.map((d, i) => {
            if (!d) return <div key={i} />;
            const dayEvents = getEventsForDay(d);
            const isToday = d === today.getDate() && month === today.getMonth() && year === today.getFullYear();
            const isSelected = d === selectedDay;
            const dow = (firstDay + d - 1) % 7;
            return (
              <div key={i} onClick={() => { setSelectedDay(d); setShowForm(true); }}
                style={{
                  borderRadius: 10, padding: "6px 4px", minHeight: 64, cursor: "pointer",
                  background: isSelected ? "#eef2ff" : isToday ? "#fef9ff" : "#fff",
                  border: `1.5px solid ${isSelected ? "#6366f1" : isToday ? "#a5b4fc" : "#f1f5f9"}`,
                  transition: "all .12s",
                  display: "flex", flexDirection: "column", alignItems: "center", gap: 2,
                }}>
                <div style={{ fontWeight: isToday ? 800 : 500, fontSize: 13,
                  color: isToday ? "#6366f1" : dow === 0 ? "#ef4444" : dow === 6 ? "#3b82f6" : "#1e293b",
                  background: isToday ? "#eef2ff" : "transparent",
                  width: 24, height: 24, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
                }}>{d}</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 2, width: "100%" }}>
                  {dayEvents.slice(0, 2).map(ev => (
                    <div key={ev.id} style={{
                      background: ev.color + "22", color: ev.color,
                      fontSize: 9, fontWeight: 600, padding: "1px 4px",
                      borderRadius: 4, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                    }}>{ev.title}</div>
                  ))}
                  {dayEvents.length > 2 && <div style={{ fontSize: 9, color: "#94a3b8", textAlign: "center" }}>+{dayEvents.length - 2}</div>}
                </div>
              </div>
            );
          })}
        </div>

        {/* 이벤트 추가 폼 */}
        {showForm && selectedDay && (
          <div style={{ background: "#f8fafc", border: "1.5px solid #e2e8f0", borderRadius: 14, padding: 16 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#334155", marginBottom: 10 }}>
              {month+1}월 {selectedDay}일 일정 추가
            </div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <input value={form.title} onChange={e => setForm(p => ({...p, title: e.target.value}))}
                placeholder="일정 제목" style={{ flex: 1, minWidth: 120, padding: "8px 12px", borderRadius: 8, border: "1.5px solid #e2e8f0", fontSize: 13 }} />
              <input type="time" value={form.time} onChange={e => setForm(p => ({...p, time: e.target.value}))}
                style={{ width: 100, padding: "8px 10px", borderRadius: 8, border: "1.5px solid #e2e8f0", fontSize: 13 }} />
              <select value={form.dept} onChange={e => setForm(p => ({...p, dept: e.target.value}))}
                style={{ padding: "8px 10px", borderRadius: 8, border: "1.5px solid #e2e8f0", fontSize: 13 }}>
                {["전사","개발팀","디자인팀","영업팀","인사팀","마케팅팀","IT팀","경영기획"].map(d => <option key={d}>{d}</option>)}
              </select>
              <button onClick={addEvent} style={{ padding: "8px 16px", background: "#6366f1", color: "#fff", border: "none", borderRadius: 8, cursor: "pointer", fontWeight: 700, fontSize: 13 }}>추가</button>
              <button onClick={() => setShowForm(false)} style={{ padding: "8px 14px", background: "#f1f5f9", border: "none", borderRadius: 8, cursor: "pointer", fontSize: 13 }}>닫기</button>
            </div>
          </div>
        )}
      </div>

      {/* 사이드: 다가오는 일정 */}
      <div style={{ width: 230, display: "flex", flexDirection: "column", gap: 12, flexShrink: 0 }}>
        <div style={{ fontWeight: 700, fontSize: 14, color: "#334155" }}>다가오는 일정</div>
        {upcoming.map(ev => (
          <div key={ev.id} style={{ background: "#fff", border: "1.5px solid #e2e8f0", borderRadius: 12, padding: "12px 14px", borderLeft: `4px solid ${ev.color}` }}>
            <div style={{ fontWeight: 700, fontSize: 13, color: "#1e293b", marginBottom: 4 }}>{ev.title}</div>
            <div style={{ fontSize: 11, color: "#94a3b8" }}>{ev.date} {ev.time}</div>
            <div style={{ marginTop: 6 }}><Badge label={ev.dept} color={ev.color} /></div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── 대시보드 ──────────────────────────────────────────────────
function Dashboard({ setTab }) {
  const today = new Date();
  const todayStr = today.toISOString().slice(0,10);
  const todayEvents = INITIAL_EVENTS.filter(e => e.date === todayStr);
  const pinnedNotices = INITIAL_NOTICES.filter(n => n.pinned);

  const stats = [
    { label: "전체 직원", value: INITIAL_EMPLOYEES.length, icon: "👥", color: "#6366f1" },
    { label: "공지사항", value: INITIAL_NOTICES.length, icon: "📢", color: "#0ea5e9" },
    { label: "공유 문서", value: INITIAL_DOCS.length, icon: "📁", color: "#10b981" },
    { label: "이번 달 일정", value: INITIAL_EVENTS.length, icon: "📅", color: "#f59e0b" },
  ];

  const deptCounts = INITIAL_EMPLOYEES.reduce((acc, e) => { acc[e.dept] = (acc[e.dept]||0)+1; return acc; }, {});

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      {/* 통계 카드 */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: 14 }}>
        {stats.map(s => (
          <div key={s.label} style={{ background: "#fff", border: "1.5px solid #e2e8f0", borderRadius: 16, padding: "20px 18px", display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ width: 46, height: 46, borderRadius: 12, background: s.color + "18", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 }}>{s.icon}</div>
            <div>
              <div style={{ fontSize: 26, fontWeight: 800, color: s.color, lineHeight: 1 }}>{s.value}</div>
              <div style={{ fontSize: 12, color: "#94a3b8", marginTop: 3 }}>{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        {/* 부서별 인원 */}
        <div style={{ background: "#fff", border: "1.5px solid #e2e8f0", borderRadius: 16, padding: "20px 22px" }}>
          <div style={{ fontWeight: 700, fontSize: 14, color: "#334155", marginBottom: 14 }}>부서별 인원</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {Object.entries(deptCounts).map(([dept, count]) => {
              const pct = Math.round((count / INITIAL_EMPLOYEES.length) * 100);
              const color = DEPT_COLORS[dept] || "#6366f1";
              return (
                <div key={dept}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 4 }}>
                    <span style={{ fontWeight: 600, color: "#475569" }}>{dept}</span>
                    <span style={{ color: "#94a3b8" }}>{count}명</span>
                  </div>
                  <div style={{ height: 6, borderRadius: 6, background: "#f1f5f9" }}>
                    <div style={{ height: "100%", width: `${pct}%`, borderRadius: 6, background: color, transition: "width .6s" }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 고정 공지 & 오늘 일정 */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div style={{ background: "#fff", border: "1.5px solid #e2e8f0", borderRadius: 16, padding: "20px 22px", flex: 1 }}>
            <div style={{ fontWeight: 700, fontSize: 14, color: "#334155", marginBottom: 12 }}>📌 고정 공지</div>
            {pinnedNotices.length === 0 && <div style={{ fontSize: 13, color: "#94a3b8" }}>없음</div>}
            {pinnedNotices.map(n => (
              <div key={n.id} style={{ marginBottom: 10, paddingBottom: 10, borderBottom: "1px solid #f1f5f9" }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: "#1e293b" }}>{n.title}</div>
                <div style={{ fontSize: 11, color: "#94a3b8", marginTop: 2 }}>{n.author} · {n.date}</div>
              </div>
            ))}
          </div>
          <div style={{ background: "#fff", border: "1.5px solid #e2e8f0", borderRadius: 16, padding: "20px 22px", flex: 1 }}>
            <div style={{ fontWeight: 700, fontSize: 14, color: "#334155", marginBottom: 12 }}>📅 오늘 일정</div>
            {todayEvents.length === 0 ? <div style={{ fontSize: 13, color: "#94a3b8" }}>오늘은 일정이 없습니다</div> : todayEvents.map(e => (
              <div key={e.id} style={{ fontSize: 13, color: "#475569", marginBottom: 6, display: "flex", gap: 8, alignItems: "center" }}>
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: e.color, flexShrink: 0, display: "inline-block" }} />
                {e.time} {e.title}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── 메인 앱 ──────────────────────────────────────────────────
const TABS = [
  { id: "dashboard", label: "대시보드", icon: "🏠" },
  { id: "notice", label: "공지사항", icon: "📢" },
  { id: "directory", label: "직원 디렉토리", icon: "👥" },
  { id: "docs", label: "문서 공유", icon: "📁" },
  { id: "calendar", label: "업무 캘린더", icon: "📅" },
];

export default function App() {
  const [tab, setTab] = useState("dashboard");
  const today = new Date();
  const dateStr = `${today.getFullYear()}년 ${today.getMonth()+1}월 ${today.getDate()}일`;

  return (
    <div style={{
      minHeight: "100vh", background: "#f8fafc",
      fontFamily: "'Noto Sans KR', 'Apple SD Gothic Neo', sans-serif",
      display: "flex", flexDirection: "column",
    }}>
      {/* 상단 헤더 */}
      <header style={{
        background: "#fff", borderBottom: "1.5px solid #e2e8f0",
        padding: "0 32px", height: 60,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        position: "sticky", top: 0, zIndex: 100,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 34, height: 34, borderRadius: 10, background: "linear-gradient(135deg,#6366f1,#8b5cf6)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>🏢</div>
          <span style={{ fontWeight: 800, fontSize: 18, color: "#1e293b", letterSpacing: -0.5 }}>Company Intranet</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <span style={{ fontSize: 12, color: "#94a3b8" }}>{dateStr}</span>
          <Avatar name="나" dept="개발팀" size={34} />
        </div>
      </header>

      <div style={{ display: "flex", flex: 1, minHeight: 0 }}>
        {/* 사이드바 */}
        <nav style={{
          width: 210, background: "#fff", borderRight: "1.5px solid #e2e8f0",
          padding: "20px 12px", display: "flex", flexDirection: "column", gap: 4,
          position: "sticky", top: 60, height: "calc(100vh - 60px)", alignSelf: "flex-start",
        }}>
          {TABS.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              style={{
                display: "flex", alignItems: "center", gap: 10, padding: "11px 14px",
                borderRadius: 10, border: "none", cursor: "pointer", textAlign: "left",
                background: tab === t.id ? "#eef2ff" : "transparent",
                color: tab === t.id ? "#6366f1" : "#475569",
                fontWeight: tab === t.id ? 700 : 500, fontSize: 14,
                transition: "all .12s",
              }}>
              <span style={{ fontSize: 17 }}>{t.icon}</span>
              {t.label}
            </button>
          ))}
        </nav>

        {/* 콘텐츠 */}
        <main style={{ flex: 1, padding: "28px 32px", overflowY: "auto", minWidth: 0 }}>
          <div style={{ marginBottom: 20 }}>
            <h1 style={{ fontWeight: 800, fontSize: 22, color: "#1e293b", margin: 0 }}>
              {TABS.find(t => t.id === tab)?.icon} {TABS.find(t => t.id === tab)?.label}
            </h1>
          </div>
          {tab === "dashboard"  && <Dashboard setTab={setTab} />}
          {tab === "notice"     && <NoticeBoard />}
          {tab === "directory"  && <EmployeeDirectory />}
          {tab === "docs"       && <DocumentShare />}
          {tab === "calendar"   && <Calendar />}
        </main>
      </div>
    </div>
  );
}
