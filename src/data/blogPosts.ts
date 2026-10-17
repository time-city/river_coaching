import { Language } from '@/translations';

export interface BlogSection {
  id: string;
  heading: string;
  content: string[];
  quote?: string;
  keyTakeaways?: string[];
  tips?: string[];
}

export interface LocalizedPostData {
  title: string;
  deck: string;
  category: string;
  publishedAt: string;
  readTime: string;
  excerpt: string;
  tags: string[];
  sections: BlogSection[];
}

export interface BlogPost {
  slug: string;
  coverImage: string;
  featured?: boolean;
  author: {
    name: string;
    avatar: string;
    role: { vi: string; en: string };
    bio: { vi: string; en: string };
  };
  vi: LocalizedPostData;
  en: LocalizedPostData;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'giam-mo-tang-co-dong-thoi-khoa-hoc-body-recomposition',
    coverImage: '/discipline.jpeg',
    featured: true,
    author: {
      name: 'River',
      avatar: '/IMG_2089-Photoroom.png',
      role: {
        vi: "Men's Physique Athlete",
        en: "Men's Physique Athlete",
      },
      bio: {
        vi: 'Vận động viên Men’s Physique đạt 3 Huy Chương Đồng VCS 2026. Hơn 5 năm rèn luyện thực chiến và đồng hành cùng nhiều anh em thay đổi hình thể.',
        en: "Competitive Men's Physique athlete with 3 Bronze medals at VCS 2026. Over 5 years of personal lifting and directly guiding athletes and clients.",
      },
    },
    vi: {
      title: 'KHOA HỌC BODY RECOMPOSITION: GIẢM MỠ VÀ TĂNG CƠ ĐỒNG THỜI CÓ THỰC SỰ KHẢ THI?',
      deck: 'Phá vỡ quan niệm truyền thống "phải xả cơ rồi mới siết". Đây là phác đồ khoa học chuẩn xác giúp đốt mỡ thừa và gia tăng khối lượng cơ bắp nạc cùng một lúc.',
      category: 'Khoa Học Thể Hình',
      publishedAt: '18 Tháng 10, 2026',
      readTime: '6 phút đọc',
      excerpt: 'Tìm hiểu cơ chế sinh hóa đằng sau Body Recomposition. Làm thế nào để thâm hụt calo thông minh kết hợp Progressive Overload giúp bạn vừa săn chắc vừa nở nang khối cơ.',
      tags: ['Body Recomposition', 'Tăng Cơ Giảm Mỡ', 'Dinh Dưỡng Khoa Học', 'Hypertrophy'],
      sections: [
        {
          id: 'co-che-sinh-hoa',
          heading: '1. Bản Chất Sinh Hóa Của Quá Trình Recomposition',
          content: [
            'Trong giới thể hình truyền thống, hầu như ai cũng tin vào giáo điều: "Muốn to phải Bulking (ăn dư thừa calo), muốn nét phải Cutting (ăn thâm hụt calo)". Hai trạng thái này dường như mâu thuẫn về mặt nhiệt động lực học.',
            'Tuy nhiên, mô mỡ (adipose tissue) và mô cơ (skeletal muscle tissue) là hai hệ sinh thái trao đổi chất hoàn toàn độc lập. Cơ thể bạn có thể huy động năng lượng từ lượng triglyceride dự trữ trong tế bào mỡ để bù đắp cho nhu cầu tái tạo và tổng hợp protein cơ bắp (MPS - Muscle Protein Synthesis).',
            'Nói một cách khoa học: Mỡ là năng lượng dự trữ, còn cơ bắp là bộ máy chuyển hóa. Khi có đủ kích thích cơ học và nguồn axit amin thiết yếu, cơ thể hoàn toàn có thể lấy chính mỡ thừa để làm nhiên liệu xây dựng sợi cơ mới.'
          ],
          quote: 'Mỡ thừa không tự biến thành cơ bắp, nhưng nó là nguồn nhiên liệu hóa học nuôi dưỡng quá trình tổng hợp sợi cơ trong môi trường dinh dưỡng chính xác.',
          keyTakeaways: [
            'Mô mỡ và mô cơ vận hành theo hai cơ chế chuyển hóa sinh hóa riêng biệt.',
            'Năng lượng đốt cháy từ mỡ dự trữ có thể hỗ trợ trực tiếp cho quá trình tổng hợp Protein (MPS).',
            'Bạn không cần phải tăng mỡ mặt hay phình bụng mới có thể xây dựng cơ bắp.'
          ]
        },
        {
          id: 'doi-tuong-phu-hop',
          heading: '2. Những Ai Đạt Hiệu Quả Recomposition Tối Đa?',
          content: [
            'Body Recomposition có thể diễn ra ở hầu hết mọi người, nhưng tỷ lệ thành công và tốc độ sẽ vượt trội nhất ở 3 nhóm đối tượng sau:',
            '• Người mới bắt đầu (Beginner / Newbie Gains): Khối lượng cơ chưa thích nghi với kích thích kháng lực, độ nhạy insulin của cơ bắp cực cao. Đây là giai đoạn "vàng" có thể tăng 3-5kg cơ và giảm 3-5kg mỡ cùng lúc.',
            '• Người quay lại tập luyện sau chấn thương hoặc gián đoạn (Muscle Memory): Nhờ hiện tượng "trí nhớ cơ bắp" (Myonuclear Domain Theory), các nhân tế bào cơ đã hình thành từ trước sẽ tái kích hoạt thần tốc.',
            '• Người có tỷ lệ mỡ cơ thể cao (> 20% ở nam, > 28% ở nữ): Lượng calo nội sinh dự trữ dồi dào, cho phép cơ thể thâm hụt calo từ ăn uống mà không bị ức chế quá trình tăng cơ.'
          ]
        },
        {
          id: 'tru-cot-dinh-duong',
          heading: '3. Phác Đồ Dinh Dưỡng: Thâm Hụt Nhẹ & Protein Tối Đa',
          content: [
            'Chìa khóa then chốt của Recomposition nằm ở việc kiểm soát mức thâm hụt calo chính xác: KHÔNG ĐƯỢC thâm hụt quá sâu. Một mức thâm hụt từ 10% đến 15% tổng năng lượng tiêu hao (TDEE) là tỷ lệ vàng (thường tương đương 250 - 400 kcal/ngày).',
            'Về Protein: Cần nạp từ 2.0g đến 2.4g protein trên mỗi kg trọng lượng cơ thể mỗi ngày. Protein không chỉ cung cấp khối xây dựng (Leucine kích hoạt mTOR) mà còn có hiệu ứng nhiệt tiêu hóa (TEF) cao nhất trong các nhóm chất, giúp đốt thêm calo tự nhiên.',
            'Phân bổ bữa ăn: Chia đều lượng protein thành 3 - 5 cữ ăn trong ngày (mỗi cữ cách nhau 3-4 giờ), đảm bảo mỗi cữ có ít nhất 25-35g protein chất lượng cao để kích hoạt ngưỡng Leucine tổng hợp cơ bắp liên tục.'
          ],
          tips: [
            'Ưu tiên thực phẩm nguyên bản: Ức gà, thăn bò nạc, cá hồi, trứng gà, whey isolate và các loại đậu.',
            'Uống đủ 2.5 - 3.5 lít nước mỗi ngày để hỗ trợ tế bào cơ trữ nước nội bào (Cell Volumization).',
            'Tập trung Carbohydrate phức tạp vào trước và sau buổi tập (khoảng thời gian Peri-workout) để tối ưu hiệu suất.'
          ]
        },
        {
          id: 'tap-luyen-progressive-overload',
          heading: '4. Chiến Lược Tập Luyện: Progressive Overload & Ngưỡng RIR 1-2',
          content: [
            'Không có dinh dưỡng nào cứu vãn được một buổi tập thiếu kích thích. Tín hiệu sinh học duy nhất buộc cơ thể giữ lại và phát triển cơ bắp trong trạng thái thâm hụt calo là: SỨC CĂNG CƠ HỌC (Mechanical Tension).',
            'Bạn phải áp dụng nguyên tắc Progressive Overload (Quá tải lũy tiến) liên tục: tăng dần mức tạ, số lần lặp (reps) hoặc cải thiện form chuyển động qua từng tuần.',
            'Mỗi hiệp tập làm việc (Working set) cần đạt ngưỡng cách thất bại từ 1 đến 2 reps (RIR 1-2). Nếu bạn kết thúc hiệp tập khi vẫn còn dư 5-6 cái một cách nhẹ nhàng, cơ thể sẽ không có bất kỳ lý do gì để bảo toàn khối cơ nạc đắt giá.'
          ]
        },
        {
          id: 'loi-ket-va-hanh-dong',
          heading: '5. Lời Khuyên Từ Mình: Kiên Định Với Con Số & Kỷ Luật',
          content: [
            'Body Recomposition là một cuộc chạy marathon, không phải một cuộc nước rút 100 mét. Bạn sẽ không thấy cân nặng thay đổi chóng mặt từng ngày, nhưng số đo vòng eo sẽ nhỏ lại, bờ vai sẽ rộng ra và những múi cơ sẽ dần lộ diện sắc nét.',
            'Đừng để sự thiếu kiên nhẫn làm bạn quay cuồng giữa những chế độ ăn kiêng cực đoan hay những buổi cardio kiệt sức vô nghĩa. Hãy tin vào khoa học, theo dõi thông số chuẩn xác và giữ vững kỷ luật hàng ngày.'
          ]
        }
      ]
    },
    en: {
      title: 'THE SCIENCE OF BODY RECOMPOSITION: CAN YOU SIMULTANEOUSLY BUILD MUSCLE AND BURN FAT?',
      deck: 'Breaking the dogmatic bulk-then-cut paradigm. Here is the evidence-based protocol to oxidize stubborn fat while actively synthesizing lean skeletal muscle mass.',
      category: 'Physique Science',
      publishedAt: 'October 18, 2026',
      readTime: '6 min read',
      excerpt: 'Understand the biochemistry behind body recomposition. Learn how moderate caloric deficit paired with progressive overload helps you get shredded without muscle loss.',
      tags: ['Body Recomposition', 'Hypertrophy', 'Evidence-Based Nutrition', 'Fat Loss'],
      sections: [
        {
          id: 'co-che-sinh-hoa',
          heading: '1. The Biochemical Foundations of Recomposition',
          content: [
            'In traditional bodybuilding folklore, dogma dictates: "You must bulk to gain size, and cut to get shredded." These two states seem thermodynamically incompatible.',
            'However, adipose tissue (stored fat) and skeletal muscle tissue operate within independent metabolic compartments. Your body can liberate energy from stored triglycerides to fuel muscle protein synthesis (MPS).',
            'Put scientifically: Body fat is stored chemical potential energy, while muscle tissue is a metabolic engine. Given mechanical tension and essential amino acids, fat directly fuels lean tissue synthesis.'
          ],
          quote: 'Body fat doesn’t convert directly into muscle, but its stored calories provide the chemical fuel necessary for muscle protein synthesis in an optimized nutritional environment.',
          keyTakeaways: [
            'Adipose tissue and skeletal muscle operate under distinct biochemical pathways.',
            'Oxidized calories from fat reserves directly fuel muscle protein synthesis (MPS).',
            'You do not need to accumulate unnecessary fat to gain muscle tissue.'
          ]
        },
        {
          id: 'doi-tuong-phu-hop',
          heading: '2. Who Achieves Maximum Recomposition Velocity?',
          content: [
            'While body recomposition is possible for almost anyone, three groups experience exponential rates of return:',
            '• Beginners ("Newbie Gains"): Untrained skeletal muscle possesses extraordinary anabolic signaling sensitivity and insulin responsiveness.',
            '• Detrained Lifters (Muscle Memory): Driven by the Myonuclear Domain Theory, previously acquired cell nuclei rapidly reactivate upon training resumption.',
            '• Individuals with Higher Body Fat (>20% in men, >28% in women): Abundant endogenous energy reserves allow substantial caloric deficits without blunting anabolism.'
          ]
        },
        {
          id: 'tru-cot-dinh-duong',
          heading: '3. Nutritional Blueprint: Mild Deficit & Maximized Protein',
          content: [
            'The cornerstone of recomposition is a controlled caloric deficit: 10% to 15% below Total Daily Energy Expenditure (TDEE), roughly 250 - 400 kcal/day.',
            'For Protein: Target 2.0g to 2.4g per kilogram of total body weight daily. High protein maximizes leucine-triggered mTOR activation and exhibits the highest Thermic Effect of Food (TEF).',
            'Meal Distribution: Evenly space protein intake across 3 to 5 meals per day (every 3-4 hours), ensuring 25-35g of high-quality protein per meal to consistently surpass the leucine threshold.'
          ],
          tips: [
            'Base meals on whole, nutrient-dense foods: lean beef, chicken breast, salmon, eggs, and whey isolate.',
            'Maintain 2.5 - 3.5 liters of clean water daily to support intracellular cell volumization.',
            'Concentrate complex carbohydrates peri-workout (pre and post training) for optimal glycogen re-synthesis.'
          ]
        },
        {
          id: 'tap-luyen-progressive-overload',
          heading: '4. Training Strategy: Progressive Overload & RIR 1-2',
          content: [
            'Nutrition cannot compensate for inadequate mechanical stimulus. The primary biological signal compelling your body to retain and synthesize muscle is Mechanical Tension.',
            'Consistently implement Progressive Overload: progressively increase load, repetitions, or execution control week over week.',
            'Every working set must reach within 1 to 2 reps in reserve (RIR 1-2). Terminating sets with 5-6 easy reps remaining fails to trigger full motor-unit recruitment.'
          ]
        },
        {
          id: 'loi-ket-va-hanh-dong',
          heading: '5. Final Advice from River: Numbers & Unwavering Discipline',
          content: [
            'Body recomposition is an ultra-marathon, not a 100-meter sprint. The scale may not fluctuate drastically each day, but your waistline will shrink, shoulders will broaden, and striations will emerge.',
            'Do not allow impatience to drive you into erratic crash diets or exhausting cardio sessions. Trust the science, measure your metrics, and show up with discipline daily.'
          ]
        }
      ]
    }
  },
  {
    slug: 'toi-uu-phi-dai-co-bap-hypertrophy-3-yeu-to-cot-loi',
    coverImage: '/post_insta/post5.jpg',
    author: {
      name: 'River',
      avatar: '/IMG_2089-Photoroom.png',
      role: {
        vi: "Men's Physique Athlete",
        en: "Men's Physique Athlete",
      },
      bio: {
        vi: 'Vận động viên Men’s Physique đạt 3 Huy Chương Đồng VCS 2026. Chuyên thiết kế lộ trình tập luyện cá nhân hóa theo cấu trúc giải phẫu sinh học.',
        en: 'Competitive athlete with 3 Bronze medals at VCS 2026. Specialist in biomechanically tailored hypertrophy and structural anatomy protocols.',
      },
    },
    vi: {
      title: 'TỐI ƯU PHÌ ĐẠI CƠ BẮP (HYPERTROPHY): 3 YẾU TỐ CỐT LÕI MÀ 90% GYMER ĐANG BỎ QUÊN',
      deck: 'Đừng chỉ đếm số hiệp hay nâng tạ vô thức. Khám phá Mechanical Tension, thể tích tập luyện hiệu quả và khoảng cách đến ngưỡng thất bại (RIR).',
      category: 'Tập Luyện',
      publishedAt: '15 Tháng 10, 2026',
      readTime: '5 phút đọc',
      excerpt: 'Hầu hết mọi người tập nhiều nhưng không to vì rơi vào bẫy "Junk Volume". Đây là hướng dẫn chi tiết giúp bạn tối ưu từng hiệp tập để kích hoạt phì đại cơ bắp nhanh nhất.',
      tags: ['Hypertrophy', 'Phì Đại Cơ Bắp', 'Tập Luyện Khoa Học', 'Progressive Overload'],
      sections: [
        {
          id: 'suc-cang-co-hoc',
          heading: '1. Sức Căng Cơ Học (Mechanical Tension) - Vua Của Phát Triển Cơ',
          content: [
            'Nhiều người nghĩ rằng cảm giác "mỏi rã rời" hay "bơm máu căng phồng" (The Pump) là dấu hiệu tốt nhất của một buổi tập hiệu quả. Thực tế, khoa học sinh học vận động (Biomechanics) đã chứng minh: Sức căng cơ học mới là yếu tố quyết định số một.',
            'Khi sợi cơ chịu tải trọng đủ lớn ở toàn bộ phạm vi chuyển động (Full Range of Motion - ROM), các thụ thể cơ học (Mechanosensors) trên màng tế bào sẽ kích hoạt con đường dẫn truyền tín hiệu mTORC1, thúc đẩy tổng hợp sợi cơ mới.',
            'Để tối ưu sức căng cơ học, bạn cần kiểm soát pha hạ tạ (Eccentric Phase) trong 2-3 giây có kiểm soát, thay vì thả rơi tự do mức tạ.'
          ],
          quote: 'Một hiệp tập chuẩn form với mức tạ vừa đủ và kiểm soát pha ly tâm có giá trị phì đại cao gấp 3 lần việc quăng tạ nặng nhưng sai tư thế.'
        },
        {
          id: 'bay-junk-volume',
          heading: '2. Tránh Bẫy "Junk Volume" (Khối Lượng Tập Rác)',
          content: [
            'Tập 25-30 hiệp cho một nhóm cơ trong một buổi không làm bạn to nhanh hơn, mà chỉ tích lũy thêm mệt mỏi hệ thần kinh trung ương (CNS Fatigue).',
            'Nghiên cứu của Schoenfeld và cộng sự chỉ ra rằng: Số hiệp tập hiệu quả cho một nhóm cơ dao động từ 10 đến 20 hiệp mỗi tuần. Quá con số này, tỷ lệ kích thích cơ giảm dần và nguy cơ chấn thương tăng vọt.',
            'Thay vì nhồi nhét bài tập, hãy chia nhỏ thể tích tập thành 2 buổi/tuần cho mỗi nhóm cơ để cơ bắp luôn được kích thích ở trạng thái sung mãn nhất.'
          ],
          keyTakeaways: [
            'Chất lượng từng hiệp tập quan trọng hơn số lượng hiệp tập.',
            '10 - 16 hiệp chất lượng cao mỗi tuần là ngưỡng tối ưu cho đại đa số người tập.',
            'Tập một nhóm cơ 2 lần/tuần vượt trội hơn hẳn so với việc dồn toàn bộ bài tập vào 1 ngày duy nhất.'
          ]
        },
        {
          id: 'nguong-that-bai-rir',
          heading: '3. Quy Tắc RIR: Hiểu Rõ Khoảng Cách Đến Thất Bại',
          content: [
            'RIR (Reps In Reserve) là số rep bạn còn có thể nâng được trước khi kiệt sức hoàn toàn.',
            'Để kích hoạt các sợi cơ co rút nhanh (Type II Muscle Fibers) - nhóm sợi cơ có tiềm năng phì đại lớn nhất - bạn bắt buộc phải đưa hiệp tập về ngưỡng RIR 0 đến 2.',
            'Nếu hiệp tập của bạn dừng lại ở RIR 4 hay 5, đó chỉ là bài khởi động nâng cao, không tạo ra đủ áp lực để cơ bắp nhận diện nhu cầu phải phát triển.'
          ]
        }
      ]
    },
    en: {
      title: 'HYPERTROPHY OPTIMIZATION: 3 CRITICAL PILLARS 90% OF LIFTERS OVERLOOK',
      deck: 'Stop mindlessly chasing the pump. Understand mechanical tension, effective training volume, and proximity to failure (RIR) to unlock rapid hypertrophy.',
      category: 'Training',
      publishedAt: 'October 15, 2026',
      readTime: '5 min read',
      excerpt: 'Most gym-goers fail to grow because of junk volume. Here is a definitive guide to making every single working set count toward maximum muscle hypertrophy.',
      tags: ['Hypertrophy', 'Muscle Growth', 'Evidence-Based Training', 'Progressive Overload'],
      sections: [
        {
          id: 'suc-cang-co-hoc',
          heading: '1. Mechanical Tension: The Undisputed King of Growth',
          content: [
            'Many lifters mistake metabolic burn or "the pump" as the primary driver of hypertrophy. Biomechanical research unequivocally demonstrates that high mechanical tension is the primary stimulus.',
            'When active muscle fibers contract against heavy resistance through a full range of motion, membrane mechanosensors trigger the mTORC1 signaling pathway, driving protein synthesis.',
            'To maximize mechanical tension, control the eccentric (lowering) phase for 2 to 3 seconds rather than dropping the weight.'
          ],
          quote: 'One set executed with pristine form, controlled eccentric velocity, and true intensity delivers 3x more hypertrophic signal than throwing ego weight with compromised technique.'
        },
        {
          id: 'bay-junk-volume',
          heading: '2. Eliminating Junk Volume',
          content: [
            'Blasting 25-30 sets for a single muscle group in one marathon workout does not accelerate growth; it merely accumulates central nervous system (CNS) fatigue.',
            'Clinical meta-analyses by Dr. Brad Schoenfeld demonstrate that 10 to 20 hard weekly sets per muscle group represents the optimal threshold. Beyond this, stimulus diminishes while systemic fatigue skyrockets.',
            'Distribute your weekly volume across 2 sessions per muscle group (such as Push/Pull/Legs or Upper/Lower splits) to train with maximum intensity each time.'
          ],
          keyTakeaways: [
            'Set quality completely supersedes set quantity.',
            '10 - 16 high-intensity working sets per week yields optimal growth for 95% of natural lifters.',
            'Hitting each muscle group 2x weekly produces significantly superior hypertrophy compared to once-weekly "bro splits".'
          ]
        },
        {
          id: 'nguong-that-bai-rir',
          heading: '3. Reps in Reserve (RIR): Training Close to Failure',
          content: [
            'Reps In Reserve (RIR) defines how many repetitions you could perform before reaching concentric failure.',
            'To recruit high-threshold Type II motor units (the muscle fibers with the greatest hypertrophy potential), your working sets must terminate within RIR 0 to 2.',
            'Stopping a set at RIR 4 or 5 is merely a glorified warm-up set that fails to stimulate new tissue synthesis.'
          ]
        }
      ]
    }
  },
  {
    slug: 'an-uong-tham-hut-calo-ma-khong-mat-co-bap',
    coverImage: '/post1.jpg',
    author: {
      name: 'River',
      avatar: '/IMG_2089-Photoroom.png',
      role: {
        vi: "Men's Physique Athlete",
        en: "Men's Physique Athlete",
      },
      bio: {
        vi: 'Chia sẻ kiến thức dinh dưỡng chuẩn khoa học thể thao cho các bạn tập luyện tại River Coaching.',
        en: 'Directly engineers sports-science based nutrition protocols and macro blueprints for competitive athletes and lifestyle clients.',
      },
    },
    vi: {
      title: 'THÂM HỤT CALO KHÔNG ĐÓI: NGHỆ THUẬT SIẾT MỠ BẢO TOÀN KHỐI CƠ TỐI ĐA',
      deck: 'Làm thế nào để cắt giảm mỡ thừa xuống dưới 12% mà không bị teo cơ, tụt năng lượng hay suy giảm trao đổi chất tự nhiên.',
      category: 'Dinh Dưỡng',
      publishedAt: '12 Tháng 10, 2026',
      readTime: '7 phút đọc',
      excerpt: 'Siết mỡ không có nghĩa là nhịn ăn. Hướng dẫn toàn diện về phân bổ Macronutrient, kiểm soát cơn đói và kỹ thuật Refeed giúp cơ thể bạn đốt mỡ bền vững.',
      tags: ['Thâm Hụt Calo', 'Siết Mỡ', 'Dinh Dưỡng Thể Hình', 'Tối Ưu Macro'],
      sections: [
        {
          id: 'con-so-vang-tham-hut',
          heading: '1. Con Số Vàng Trong Thâm Hụt Calo',
          content: [
            'Sai lầm lớn nhất của người muốn giảm cân nhanh là cắt giảm đột ngột 800 - 1000 kcal mỗi ngày. Hậu quả tức thì: nồng độ hormone tuyến giáp (T3/T4) tụt giảm, Leptin sụt đáy và cơ thể chuyển sang chế độ "bảo vệ sinh tồn" (Starvation Mode).',
            'Khi đó, cơ thể sẽ ưu tiên phân giải mô cơ để lấy năng lượng thay vì đốt mỡ. Bạn sẽ trở thành tạng người "Skinny Fat": gầy đi nhưng mềm nhão, không săn chắc và rất dễ tăng mỡ lại.',
            'Nguyên tắc vàng: Thâm hụt tối đa 0.5% - 1% trọng lượng cơ thể mỗi tuần. Nếu bạn nặng 70kg, mức giảm hợp lý là 350g - 700g/tuần.'
          ]
        },
        {
          id: 'chien-luoc-khoi-luong-thuc-pham',
          heading: '2. Chiến Lược Calorie Density: Ăn No Nê Nhưng Vẫn Thâm Hụt',
          content: [
            'Bạn không cần phải chịu đựng những cơn cồn cào ruột gan nếu biết tận dụng mật độ calo của thực phẩm (Calorie Density).',
            '100g khoai lang chỉ chứa khoảng 86 kcal nhưng chiếm thể tích lớn trong dạ dày và chứa nhiều chất xơ hòa tan, so với 100g bánh ngọt có thể chứa tới 450 kcal mà không mang lại cảm giác no.',
            'Hãy lấp đầy 50% đĩa ăn bằng rau xanh nhiều nước (dưa chuột, cải bó xôi, súp lơ xanh), 30% bằng nguồn đạm nạc (thịt bò nạc, ức gà, tôm, lòng trắng trứng) và 20% tinh bột phức hợp.'
          ],
          tips: [
            'Bắt đầu bữa ăn bằng 1 bát canh rau hoặc 1 đĩa salad lớn trước khi ăn thịt và tinh bột.',
            'Sử dụng các loại gia vị không calo (tiêu, ớt, quế, tỏi) để món ăn luôn thơm ngon mà không nạp thêm mỡ xấu.',
            'Uống 1 cốc nước lọc lớn trước bữa ăn 15 phút để kích hoạt thụ thể căng thành dạ dày.'
          ]
        },
        {
          id: 'refeed-va-diet-break',
          heading: '3. Vũ Khí Bí Mật: Kỹ Thuật Refeed Hàng Tuần',
          content: [
            'Sau 2-3 tuần thâm hụt liên tục, lượng glycogen dự trữ trong gan và cơ bắp sẽ cạn kiệt, khiến buổi tập trở nên uể oải.',
            'Một ngày Refeed (tăng lượng tinh bột lên mức duy trì TDEE, giữ nguyên protein và hạ thấp chất béo) sẽ giúp bổ sung đầy đủ glycogen cho cơ bắp, kích thích hormone Leptin phục hồi và reset tâm lý giải tỏa căng thẳng.'
          ]
        }
      ]
    },
    en: {
      title: 'CALORIE DEFICIT WITHOUT HUNGER: PRESERVING PEAK LEAN MASS DURING A CUT',
      deck: 'How to shed body fat below 12% without sacrificing hard-earned muscle, tanking energy levels, or triggering metabolic slowdown.',
      category: 'Nutrition',
      publishedAt: 'October 12, 2026',
      readTime: '7 min read',
      excerpt: 'Cutting fat does not require starvation. A masterclass on macro distribution, high-volume eating strategies, and periodic refeeds.',
      tags: ['Caloric Deficit', 'Fat Loss', 'Sports Nutrition', 'Macro Optimization'],
      sections: [
        {
          id: 'con-so-vang-tham-hut',
          heading: '1. The Golden Rate of Fat Loss',
          content: [
            'The single biggest pitfall in cutting is dropping 800 - 1000 kcal overnight. Thyroid hormones (T3/T4) plummet, leptin drops, and your body enters survival mode.',
            'Under extreme deficits, your body cannibalizes skeletal muscle for gluconeogenesis. You end up "skinny fat" - lighter on the scale but soft, flat, and metabolically compromised.',
            'The evidence-based standard: Aim to lose 0.5% to 1.0% of total body weight per week. For a 70kg individual, that translates to 350g - 700g weekly.'
          ]
        },
        {
          id: 'chien-luoc-khoi-luong-thuc-pham',
          heading: '2. Caloric Density & Volume Eating',
          content: [
            'Satiety is primarily governed by stomach mechanoreceptor stretch, not just total calorie intake.',
            '100g of sweet potato provides ~86 kcal with high fiber and volume, while 100g of pastries delivers 450+ kcal with zero lasting fullness.',
            'Fill 50% of your plate with fibrous cruciferous greens, 30% with ultra-lean proteins (chicken breast, egg whites, white fish, lean flank), and 20% complex unrefined carbohydrates.'
          ],
          tips: [
            'Consume a large bowl of vegetable broth or leafy greens prior to consuming dense proteins and carbs.',
            'Leverage zero-calorie seasonings (black pepper, smoked paprika, garlic, cinnamon) to maintain flavor without hidden fats.',
            'Drink 500ml of cold water 15 minutes before main meals to stimulate gastric stretch receptors.'
          ]
        },
        {
          id: 'refeed-va-diet-break',
          heading: '3. Strategic High-Carb Refeeds',
          content: [
            'Following 2-3 weeks of continuous deficit, intramyocellular glycogen stores deplete, diminishing training output and lowering circulating leptin.',
            'A structured 24-48 hour refeed (elevating carbohydrates to maintenance TDEE while keeping protein steady and fats minimal) replenishes glycogen and provides crucial psychological relief.'
          ]
        }
      ]
    }
  },
  {
    slug: 'ky-luat-vuot-len-dong-luc-tu-duy-thi-dau-men-physique',
    coverImage: '/post_insta/post7.jpg',
    author: {
      name: 'River',
      avatar: '/IMG_2089-Photoroom.png',
      role: {
        vi: "Men's Physique Athlete",
        en: "Men's Physique Athlete",
      },
      bio: {
        vi: 'Người sáng lập River Coaching. Triết lý dựa trên kỷ luật cá nhân, tính chính xác khoa học và kết quả đo lường thực tế.',
        en: 'Founder of River Coaching. Built on personal discipline, biological precision, and measurable athletic results.',
      },
    },
    vi: {
      title: "KỶ LUẬT VƯỢT LÊN ĐỘNG LỰC: TƯ DUY TẬP LUYỆN CỦA VẬN ĐỘNG VIÊN MEN'S PHYSIQUE",
      deck: 'Động lực chỉ giúp bạn bắt đầu, nhưng kỷ luật mới đưa bạn về đích. Chia sẻ chân thực từ hành trình thiếu niên 40kg đến bục huy chương VCS.',
      category: 'Tư Duy & Kỷ Luật',
      publishedAt: '08 Tháng 10, 2026',
      readTime: '4 phút đọc',
      excerpt: 'Khi sự hào hứng ban đầu qua đi, thứ giữ chân bạn ở phòng gym vào những ngày mưa gió mệt mỏi chính là hệ thống kỷ luật tự thân.',
      tags: ['Kỷ Luật', 'Mindset', 'Men\'s Physique', 'Tư Duy Thể Thao'],
      sections: [
        {
          id: 'bay-dong-luc',
          heading: '1. Bẫy Cảm Xúc: Khi Động Lực Biến Mất Sau Tuần Thứ 3',
          content: [
            'Động lực là một thứ cảm xúc rẻ tiền và ngắn hạn. Nó đến khi bạn xem một video truyền cảm hứng trên TikTok vào lúc nửa đêm, nhưng lại biến mất không dấu vết vào lúc 6 giờ sáng khi chuông báo thức reo.',
            'Nếu bạn chỉ tập luyện khi "cảm thấy có hứng", bạn sẽ không bao giờ đạt được một thể hình vượt trội. Vận động viên đỉnh cao và người bình thường không khác nhau ở chỗ họ không biết mệt, mà khác nhau ở chỗ: Vận động viên vẫn xuất hiện và hoàn thành nhiệm vụ ngay cả trong ngày họ ghét phòng gym nhất.'
          ],
          quote: 'Bạn không cần phải có cảm hứng để bước vào phòng tập. Bạn chỉ cần bước vào phòng tập, cảm hứng sẽ tự tìm đến sau set tạ đầu tiên.'
        },
        {
          id: 'xay-dung-he-thong',
          heading: '2. Xây Dựng Hệ Thống Thay Vì Dựa Vào Ý Chí',
          content: [
            'Ý chí là một nguồn tài nguyên hữu hạn bị bào mòn suốt cả ngày làm việc căng thẳng. Đừng bắt não bộ phải ra quyết định: "Hôm nay có nên đi tập không?".',
            'Hãy biến tập luyện thành một hệ sinh thái thói quen tự động hóa:',
            '• Chuẩn bị sẵn quần áo tập và bình nước từ tối hôm trước.',
            '• Khóa lịch tập cố định vào khung giờ không thể thương lượng trong ngày.',
            '• Có sẵn giáo án bài tập trong điện thoại, bước vào phòng gym là thực thi, không cần phân vân tập bài gì.'
          ],
          keyTakeaways: [
            'Đừng tin vào ý chí, hãy xây dựng một hệ thống không thể thất bại.',
            'Kỷ luật nhỏ mỗi ngày sẽ tạo nên kết quả khổng lồ sau 12 tháng.',
            'Sự nhất quán (Consistency) luôn đánh bại cường độ nhất thời.'
          ]
        }
      ]
    },
    en: {
      title: "DISCIPLINE OVER MOTIVATION: THE COMPETITIVE MEN'S PHYSIQUE MINDSET",
      deck: 'Motivation gets you out the door, but relentless discipline takes you to the podium. An honest perspective from a 40kg teenager to a VCS medal winner.',
      category: 'Mindset & Discipline',
      publishedAt: 'October 08, 2026',
      readTime: '4 min read',
      excerpt: 'When initial excitement inevitably fades, the only thing keeping you accountable on cold, exhausting mornings is an unbreakable disciplined system.',
      tags: ['Discipline', 'Mindset', 'Men\'s Physique', 'Athletic Mindset'],
      sections: [
        {
          id: 'bay-dong-luc',
          heading: '1. The Motivation Trap: When Enthusiasm Dies on Week 3',
          content: [
            'Motivation is a fickle, short-lived emotion. It strikes when you watch an inspirational lifting edit at midnight, but vanishes completely when the 6:00 AM alarm rings.',
            'If you only train when you "feel like it," you will never build an exceptional physique. Elite athletes and average gym-goers experience the exact same fatigue. The distinction: Elite athletes show up and execute precisely on the days they want to train the least.'
          ],
          quote: 'You do not need to feel inspired to walk through the gym doors. Just step inside; intensity and focus invariably ignite after the first working set.'
        },
        {
          id: 'xay-dung-he-thong',
          heading: '2. Building Automated Systems Over Raw Willpower',
          content: [
            'Willpower is a depleting biological currency. Do not force your prefrontal cortex to debate: "Should I work out today?".',
            'Automate your fitness lifestyle through environmental design:',
            '• Pack your training bag and meal containers the night prior.',
            '• Block off your workout as a non-negotiable professional appointment.',
            '• Keep your structured workout blueprint on your phone; step in and execute with zero hesitation.'
          ],
          keyTakeaways: [
            'Never rely on emotional motivation; build an airtight system that makes failure difficult.',
            'Micro-disciplines compounding daily create jaw-dropping 12-month transformations.',
            'Relentless consistency forever defeats sporadic intensity.'
          ]
        }
      ]
    }
  }
];

// Helper functions for easy querying
export function getAllPosts(): BlogPost[] {
  return BLOG_POSTS;
}

export function getFeaturedPost(): BlogPost {
  return BLOG_POSTS.find((p) => p.featured) || BLOG_POSTS[0];
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}

export function getPostLocalized(post: BlogPost, lang: Language = 'vi') {
  const data = (lang === 'en' ? post.en : post.vi) || post.vi;
  return {
    slug: post.slug,
    coverImage: post.coverImage,
    featured: post.featured,
    author: {
      name: post.author.name,
      avatar: post.author.avatar,
      role: (lang === 'en' ? post.author.role.en : post.author.role.vi) || post.author.role.vi,
      bio: (lang === 'en' ? post.author.bio.en : post.author.bio.vi) || post.author.bio.vi,
    },
    ...data,
  };
}

export type LocalizedBlogPost = ReturnType<typeof getPostLocalized>;

export function getRelatedPosts(currentSlug: string, category: string, limit = 3): BlogPost[] {
  const sameCategory = BLOG_POSTS.filter((p) => p.slug !== currentSlug && (p.vi.category === category || p.en.category === category));
  if (sameCategory.length >= limit) return sameCategory.slice(0, limit);
  const otherPosts = BLOG_POSTS.filter((p) => p.slug !== currentSlug && p.vi.category !== category && p.en.category !== category);
  return [...sameCategory, ...otherPosts].slice(0, limit);
}
