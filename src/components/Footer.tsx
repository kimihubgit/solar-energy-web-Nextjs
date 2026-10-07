export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container foot-wrap">
        <div className="foot-grid">
          <div>
            <div className="foot-brand">
              <span className="logo-mark"></span>
              <span className="brand-name">TH-<b style={{ color: 'var(--g400)' }}>EGO</b></span>
            </div>
            <p>Green house – green life. Giải pháp điện mặt trời &amp; kỹ thuật điện tại Đắk Lắk.</p>
          </div>
          <div>
            <h5>DỊCH VỤ</h5>
            <ul>
              <li><a href="/dich-vu">Điện mặt trời áp mái</a></li>
              <li><a href="/dich-vu">Lưu trữ năng lượng</a></li>
              <li><a href="/dich-vu">Thi công điện</a></li>
              <li><a href="/dich-vu">Bảo trì hệ thống</a></li>
            </ul>
          </div>
          <div>
            <h5>SẢN PHẨM</h5>
            <ul>
              <li><a href="/san-pham">Tấm pin mặt trời</a></li>
              <li><a href="/san-pham">Inverter</a></li>
              <li><a href="/san-pham">Pin lưu trữ</a></li>
              <li><a href="/san-pham">Thiết bị điện</a></li>
            </ul>
          </div>
          <div>
            <h5>LIÊN HỆ</h5>
            <ul>
              <li>26A Y Thuyên Ksơr, P. Tân Lập, Đắk Lắk</li>
              <li><a href="tel:0949371919">094.937.1919</a></li>
              <li><a href="tel:0862855339">0862.855.339</a></li>
              <li><a href="tel:02626289999">0262 628 9999</a></li>
            </ul>
          </div>
        </div>
        <div className="giant" aria-hidden="true">TH-EGO</div>
        <div className="copy">
          <span>© <span id="y">2026</span> CÔNG TY TNHH TM &amp; DV KỸ THUẬT ĐIỆN TH-EGO · MST 6001761015</span>
          <span>Ảnh minh họa: Unsplash</span>
        </div>
      </div>
    </footer>
  );
}
