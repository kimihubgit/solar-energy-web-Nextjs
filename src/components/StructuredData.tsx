export default function StructuredData() {
  const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://thego.starwar.vn';

  // 1. LocalBusiness / Electrician Schema for GEO & Local SEO
  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'Electrician', 'HomeAndConstructionBusiness'],
    '@id': `${BASE_URL}/#organization`,
    name: 'CÔNG TY TNHH TM & DV KỸ THUẬT ĐIỆN TH-EGO',
    alternateName: ['TH-EGO', 'Điện mặt trời TH-EGO Đắk Lắk', 'TH-EGO Solar'],
    url: BASE_URL,
    logo: `${BASE_URL}/assets/img/logo.png`,
    image: `${BASE_URL}/assets/img/logo.png`,
    description: 'Chuyên cung cấp giải pháp, thiết bị và thi công trọn gói điện mặt trời áp mái, hệ thống lưu trữ pin Lithium LiFePO4, Inverter Hybrid cho hộ gia đình và doanh nghiệp tại Đắk Lắk và Tây Nguyên.',
    taxID: '6001761015',
    founder: {
      '@type': 'Person',
      name: 'Trần Thị Thu Hiền',
      jobTitle: 'Giám đốc',
    },
    telephone: '+84949371919',
    priceRange: '₫₫₫',
    currenciesAccepted: 'VND',
    paymentAccepted: 'Tiền mặt, Chuyển khoản ngân hàng',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '26A Y Thuyên Ksơr, Phường Tân Lập',
      addressLocality: 'Thành phố Buôn Ma Thuột',
      addressRegion: 'Đắk Lắk',
      postalCode: '63000',
      addressCountry: 'VN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 12.6806,
      longitude: 108.0645,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday',
        ],
        opens: '07:30',
        closes: '18:00',
      },
    ],
    areaServed: [
      { '@type': 'AdministrativeArea', name: 'Đắk Lắk' },
      { '@type': 'City', name: 'Buôn Ma Thuột' },
      { '@type': 'AdministrativeArea', name: 'Tây Nguyên' },
      { '@type': 'AdministrativeArea', name: 'Gia Lai' },
      { '@type': 'AdministrativeArea', name: 'Đắk Nông' },
      { '@type': 'AdministrativeArea', name: 'Lâm Đồng' },
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Giải pháp & Thiết bị Năng lượng mặt trời TH-EGO',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Lắp đặt điện mặt trời áp mái hộ gia đình và doanh nghiệp',
            description: 'Khảo sát tận nơi, thiết kế hệ thống và thi công trọn gói tại Đắk Lắk.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Hệ thống lưu trữ năng lượng pin Lithium và Inverter Hybrid',
            description: 'Giải pháp chủ động nguồn điện 24/7 kể cả khi cúp điện lưới.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Thi công điện dân dụng, công nghiệp & Tủ điện ATS',
            description: 'Tư vấn, lắp ráp tủ điện chuyển nguồn tự động và hệ thống chống sét.',
          },
        },
      ],
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+84949371919',
      contactType: 'customer service',
      areaServed: 'VN',
      availableLanguage: ['Vietnamese'],
    },
  };

  // 2. FAQPage Schema for AIO (AI Overviews) & AEO (Answer Engine Optimization)
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Chi phí lắp đặt hệ thống điện mặt trời tại Đắk Lắk là bao nhiêu?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Chi phí lắp đặt điện mặt trời phụ thuộc vào công suất và nhu cầu lưu trữ: Hệ hòa lưới bám tải cho hộ gia đình thường từ 3 – 10 kWp; Hệ Hybrid có pin lưu trữ Lithium LiFePO4 thường dao động từ 15 – 25 triệu/kWp tùy loại pin và inverter. Thời gian hoàn vốn trung bình khoảng 3,5 đến 5 năm tại khu vực Tây Nguyên nhờ bức xạ nắng dồi dào (~4,5 đến 5 giờ nắng/ngày).',
        },
      },
      {
        '@type': 'Question',
        name: 'Hệ thống điện mặt trời Hybrid khác gì với hệ hòa lưới thông thường?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Hệ hòa lưới bám tải chỉ cấp điện khi có ánh nắng mặt trời và tự ngắt khi cúp điện lưới để đảm bảo an toàn. Ngược lại, hệ Hybrid kết hợp pin lưu trữ Lithium (LiFePO4) tích trữ điện năng dư thừa vào ban ngày để dùng ban đêm hoặc tự động chuyển sang nguồn dự phòng khi lưới điện bị ngắt, giúp ngôi nhà luôn có điện liên tục 24/7.',
        },
      },
      {
        '@type': 'Question',
        name: 'Pin Lithium LiFePO4 có an toàn và tuổi thọ bao lâu?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Pin Lithium Iron Phosphate (LiFePO4) là công nghệ lưu trữ an toàn nhất hiện nay với khả năng chống cháy nổ và chịu nhiệt cao. Tuổi thọ pin đạt từ 6.000 chu kỳ sạc xả (tương đương 10 – 15 năm sử dụng), vượt trội hoàn toàn so với ắc quy chì truyền thống.',
        },
      },
      {
        '@type': 'Question',
        name: 'TH-EGO cung cấp dịch vụ tại những khu vực nào?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'TH-EGO có trụ sở tại 26A Y Thuyên Ksơr, Phường Tân Lập, Buôn Ma Thuột và phục vụ khảo sát miễn phí, thi công tận nơi trên toàn tỉnh Đắk Lắk (Buôn Ma Thuột, Cư M\'gar, Krông Pắc, Krông Ana, Ea Kar, Buôn Đôn, Lắk...) và các tỉnh lân cận tại Tây Nguyên.',
        },
      },
      {
        '@type': 'Question',
        name: 'Quy trình thi công điện mặt trời tại TH-EGO gồm những bước nào?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Quy trình trọn gói 4 bước gồm: 1. Khảo sát mái và đo đạc hiện trạng điện miễn phí. 2. Lập bản vẽ thiết kế kỹ thuật và báo giá chi tiết. 3. Thi công lắp đặt an toàn, đúng tiến độ. 4. Nghiệm thu, hướng dẫn cài app giám sát từ xa và bảo hành, bảo trì định kỳ.',
        },
      },
    ],
  };

  // 3. WebSite Schema
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'TH-EGO — Năng lượng mặt trời & Kỹ thuật điện Đắk Lắk',
    url: BASE_URL,
    inLanguage: 'vi-VN',
    publisher: {
      '@id': `${BASE_URL}/#organization`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  );
}
