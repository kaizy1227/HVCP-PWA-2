// api/login.js
function readBody(req) {
  return new Promise((resolve) => {
    let data = "";
    req.on("data", (c) => (data += c));
    req.on("end", () => resolve(data ? JSON.parse(data) : {}));
  });
}

async function getTenantAccessToken() {
  const res = await fetch(
    "https://open.larksuite.com/open-apis/auth/v3/tenant_access_token/internal",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        app_id: process.env.LARK_APP_ID,
        app_secret: process.env.LARK_APP_SECRET,
      }),
    }
  );

  const data = await res.json();
  if (!res.ok || data.code !== 0) throw new Error(data.msg || "Token failed");
  return data.tenant_access_token;
}

module.exports = async (req, res) => {
  try {
    if (req.method !== "POST")
      return res.status(405).json({ message: "Method not allowed" });

    const { phone, password } = await readBody(req);
    const p = String(phone || "").trim();
    const pw = String(password || "");

    if (!p || !pw) {
      return res.status(400).json({ message: "Thiếu SĐT hoặc mật khẩu" });
    }

    const token = await getTenantAccessToken();
    const baseToken = process.env.LARK_APP_TOKEN;
    const tableId = process.env.LARK_TABLE_ID;

    // Lấy record list (đủ dùng nội bộ; user ít)
    const url = `https://open.larksuite.com/open-apis/bitable/v1/apps/${baseToken}/tables/${tableId}/records?page_size=500`;

    const r2 = await fetch(url, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });

    const out = await r2.json();
    if (!r2.ok || out.code !== 0) {
      return res.status(400).json({ message: "Không đọc được Lark", detail: out });
    }

    const items = out.data?.items || [];

    // Tìm user theo Số điện thoại
    const record = items.find((it) => String(it.fields?.["Số điện thoại"] || "").trim() === p);

    if (!record) {
      return res.status(401).json({ message: "SĐT không tồn tại" });
    }

    const storedPw = String(record.fields?.["Mật khẩu"] || "");
    if (storedPw !== pw) {
      return res.status(401).json({ message: "Sai mật khẩu" });
    }

    return res.json({
      ok: true,
      user: {
        record_id: record.record_id,
        name: record.fields?.["Tên khách hàng"] || "",
        phone: record.fields?.["Số điện thoại"] || "",
      },
    });
  } catch (e) {
    return res.status(500).json({ message: e.message || "Server error" });
  }
};
