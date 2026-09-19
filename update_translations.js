const fs = require('fs');

const filePath = '/Users/admin/Documents/ha/src/translations.ts';
let content = fs.readFileSync(filePath, 'utf8');

const newEnAbout = `
    about: {
      title: "THE DISCIPLINE BEHIND THE RESULTS",
      story: "From a desk-bound IT professional to a competitive Men's Physique athlete, my journey is built on one core principle: Discipline. I understand the struggles of balancing a demanding career with fitness goals because I've lived it. Now, I engineer high-performance systems for your body, turning guesswork into science.",
      signature: "— River, Elite Coach"
    },
    workflow: {
      title: "YOUR ROADMAP TO SUCCESS",
      step1: "Dial In Strategy",
      step1Desc: "Comprehensive consultation and assessment.",
      step2: "Custom Blueprint",
      step2Desc: "Personalized nutrition & training protocol.",
      step3: "Execution & Check-ins",
      step3Desc: "Daily tracking and weekly form checks."
    },`;

const newViAbout = `
    about: {
      title: "KỶ LUẬT ĐẰNG SAU NHỮNG THÀNH QUẢ",
      story: "Từ một chuyên viên IT gắn chặt với bàn làm việc đến một vận động viên Men's Physique thi đấu chuyên nghiệp, hành trình của tôi được xây dựng trên một nguyên tắc cốt lõi: Kỷ luật. Tôi hiểu rõ những khó khăn khi phải cân bằng giữa công việc bận rộn và mục tiêu hình thể, bởi vì tôi đã từng như vậy. Giờ đây, tôi thiết kế các hệ thống tối ưu cho cơ thể bạn, biến phỏng đoán thành khoa học.",
      signature: "— River, Elite Coach"
    },
    workflow: {
      title: "LỘ TRÌNH THÀNH CÔNG",
      step1: "Xây Dựng Chiến Lược",
      step1Desc: "Tư vấn và đánh giá thể trạng toàn diện.",
      step2: "Giáo Án Độc Bản",
      step2Desc: "Thiết kế thực đơn & lộ trình tập luyện cá nhân hoá.",
      step3: "Thực Thi & Kiểm Tra",
      step3Desc: "Theo dõi hàng ngày và đánh giá kỹ thuật hàng tuần."
    },`;

// Insert into English block
content = content.replace(/en: {/, 'en: {' + newEnAbout);
// Insert into Vietnamese block
content = content.replace(/vi: {/, 'vi: {' + newViAbout);

// Update English Pricing
content = content.replace(/offlineDesc: "In-person 1-on-1 coaching at our facility in Da Nang."/, 'offlineDesc: "In-person 1-on-1 coaching at our facility in Da Nang.",\n      featuresOffline: ["In-person 1-on-1 coaching", "Custom workout & diet plan", "Form correction in real-time", "Weekly progress check-ins", "Contest prep guidance"],\n      featuresOnlineCall: ["Direct video call coaching", "Custom workout & diet plan", "Live form correction", "Weekly progress check-ins", "24/7 Support"],\n      featuresOnlineNoCall: ["Custom workout & diet plan", "Weekly form checks via video", "Weekly progress check-ins", "24/7 Support"]');

// Update Vietnamese Pricing
content = content.replace(/onlineCallDesc: "Huấn luyện 1-kèm-1 qua video call trực tiếp trong lúc tập."/, 'onlineCallDesc: "Huấn luyện 1-kèm-1 qua video call trực tiếp trong lúc tập.",\n      featuresOffline: ["Huấn luyện trực tiếp 1-kèm-1", "Giáo án tập & thực đơn cá nhân", "Chỉnh sửa kỹ thuật trực tiếp", "Kiểm tra tiến độ hàng tuần", "Hỗ trợ thi đấu"],\n      featuresOnlineCall: ["Huấn luyện qua Video call", "Giáo án tập & thực đơn cá nhân", "Sửa lỗi kỹ thuật trực tuyến", "Kiểm tra tiến độ hàng tuần", "Hỗ trợ 24/7"],\n      featuresOnlineNoCall: ["Giáo án tập & thực đơn cá nhân", "Sửa lỗi kỹ thuật qua video", "Kiểm tra tiến độ hàng tuần", "Hỗ trợ 24/7 qua Zalo"]');

// Update English Calculator
content = content.replace(/katchMcardleNote: "\\(Ignored when Body Fat is provided\\)"/, 'katchMcardleNote: "(Ignored when Body Fat is provided)",\n      ctaText: "Now you know your numbers. Let\'s build a plan around them.",\n      ctaButton: "GET YOUR CUSTOM MEAL PLAN"');

// Update Vietnamese Calculator
content = content.replace(/katchMcardleNote: "\\(Vô hiệu khi có Tỷ lệ mỡ\\)"/, 'katchMcardleNote: "(Vô hiệu khi có Tỷ lệ mỡ)",\n      ctaText: "Bây giờ bạn đã biết các chỉ số của mình. Hãy để tôi xây dựng lộ trình cho bạn.",\n      ctaButton: "NHẬN THỰC ĐƠN CÁ NHÂN HOÁ"');

// Update English Feedback
content = content.replace(/subtitle: "Real results. Real discipline."/, 'subtitle: "Real results. Real discipline.",\n      tagFatLoss: "Fat Loss",\n      tagMuscle: "Muscle Building",\n      weeks: "Weeks"');

// Update Vietnamese Feedback
content = content.replace(/subtitle: "Kết quả thực. Kỷ luật thực."/, 'subtitle: "Kết quả thực. Kỷ luật thực.",\n      tagFatLoss: "Giảm mỡ",\n      tagMuscle: "Tăng cơ",\n      weeks: "Tuần"');


fs.writeFileSync(filePath, content);
console.log("Translations updated successfully.");
