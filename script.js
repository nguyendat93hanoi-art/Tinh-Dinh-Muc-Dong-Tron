const $ = (id) => document.getElementById(id);

function readPositiveNumber(id, label, integer = false) {
  const raw = $(id).value.trim().replace(',', '.');
  const value = Number(raw);
  if (raw === '' || !Number.isFinite(value) || value <= 0) {
    throw new Error(`Vui lòng nhập ${label} lớn hơn 0.`);
  }
  if (integer && !Number.isInteger(value)) {
    throw new Error(`${label} phải là số nguyên.`);
  }
  return value;
}

function fmt(value, digits = 4) {
  return value.toLocaleString('vi-VN', { maximumFractionDigits: digits });
}

function showResult(id, html, status = 'success') {
  const el = $(id);
  el.className = `result ${status}`;
  el.innerHTML = html;
}

function showError(id, error) {
  showResult(id, `<strong>Chưa tính được.</strong><p>${escapeHtml(error.message || String(error))}</p>`, 'error');
}

function escapeHtml(text) {
  return String(text).replace(/[&<>"']/g, (char) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  })[char]);
}

// Diện tích tiết diện của một sợi tròn: S1 = πd²/4.
$('calculateCurrent').addEventListener('click', () => {
  try {
    const d = readPositiveNumber('diameter', 'đường kính lõi đồng');
    const n = readPositiveNumber('strandCount', 'số sợi', true);
    const oneArea = Math.PI * d * d / 4;
    const totalArea = oneArea * n;
    const densityRaw = $('density').value.trim().replace(',', '.');

    let html = `<p>Tiết diện một sợi: <strong>${fmt(oneArea)} mm²</strong></p>` +
      `<p>Tổng tiết diện đồng (${fmt(n, 0)} sợi): <strong>${fmt(totalArea)} mm²</strong></p>`;

    if (densityRaw !== '') {
      const J = Number(densityRaw);
      if (!Number.isFinite(J) || J <= 0) throw new Error('Mật độ dòng J phải lớn hơn 0, hoặc để trống nếu chỉ cần tiết diện.');
      const current = J * totalArea;
      html += `<p>Dòng ước tính theo J = ${fmt(J)} A/mm²: <strong>${fmt(current)} A</strong></p>` +
        `<p class="result-note">Đây là phép tính theo J đã nhập, không xác nhận dòng tải cho phép thực tế.</p>`;
    } else {
      html += `<p>Chưa tính dòng vì bạn chưa nhập mật độ dòng J.</p>`;
    }
    showResult('currentResult', html);
  } catch (error) {
    showError('currentResult', error);
  }
});

// Giải ngược: S = I/J; d = √(4S/(πn)).
$('calculateSize').addEventListener('click', () => {
  try {
    const current = readPositiveNumber('requiredCurrent', 'dòng điện yêu cầu');
    const J = readPositiveNumber('designDensity', 'mật độ dòng J');
    const n = readPositiveNumber('designStrands', 'số sợi', true);
    const requiredArea = current / J;
    const perStrandArea = requiredArea / n;
    const strandDiameter = Math.sqrt(4 * perStrandArea / Math.PI);
    const equivalentDiameter = Math.sqrt(4 * requiredArea / Math.PI);

    const html = `<p>Tổng tiết diện đồng tính theo J: <strong>${fmt(requiredArea)} mm²</strong></p>` +
      `<p>Đường kính tương đương nếu dùng 1 sợi đặc: <strong>${fmt(equivalentDiameter)} mm</strong></p>` +
      `<p>Với ${fmt(n, 0)} sợi bằng nhau: đường kính mỗi sợi ≈ <strong>${fmt(strandDiameter)} mm</strong></p>` +
      `<p class="result-note">Đây là kích thước hình học theo mật độ dòng đã nhập; khi thiết kế phải chọn tiết diện thương mại phù hợp và kiểm tra theo tiêu chuẩn.</p>`;
    showResult('sizeResult', html);
  } catch (error) {
    showError('sizeResult', error);
  }
});
