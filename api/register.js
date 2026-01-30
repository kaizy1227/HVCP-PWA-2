// api/register.js  (Vercel Serverless Function)
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

    const { name, phone, password } = await readBody(req);
    if (!name?.trim() || !phone?.trim() || !password) {
      return res.status(400).json({ message: "Thiếu thông tin" });
    }

    const token = await getTenantAccessToken();
    const url = `https://open.larksuite.com/open-apis/bitable/v1/apps/${process.env.LARK_APP_TOKEN}/tables/${process.env.LARK_TABLE_ID}/records`;

    const payload = {
      fields: {
        Text: String(phone).trim(), // primary field theo ảnh
        "Tên khách hàng": String(name).trim(),
        "Số điện thoại": String(phone).trim(),
        "Mật khẩu": String(password),
      },
    };

    const r2 = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const out = await r2.json();
    if (!r2.ok || out.code !== 0) {
      return res.status(400).json({ message: "Tạo record thất bại", detail: out });
    }

    return res.json({ ok: true, record_id: out.data?.record?.record_id });
  } catch (e) {
    return res.status(500).json({ message: e.message || "Server error" });
  }
};
