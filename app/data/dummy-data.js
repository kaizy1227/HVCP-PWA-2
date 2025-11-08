import Service from "../models/service";
import Course from "../models/course";
import CatCourse from "../models/catcourse";
import Machine from "../models/machine";
import CatMachine from "../models/catmachine";
import Equipment from "../models/equipment"
import CatDrink from "../models/catdrink"
import Drink from "../models/drink"
import Ingredient from "../models/ingredient"
import CatIngredient from "../models/catingredient"
import FullService from "../models/fullservice"
import CatFullService from "../models/catfullservice"
import NitroSoda from "../models/nitrosoda"
import CatNitroSoda from "../models/catnitrosoda"

export const USERS = [
    {
        id: "u1",
        username: "admin",
        password: "123",
        role: "admin",
        name: "Admin",
    },
    {
        id: "u2",
        username: "vuthanhhai126",
        password: "123",
        role: "it",
        name: "Hải",
    },
];


export const CATFULLSERVICES = [
    new CatFullService('1', 'Dịch vụ trọn bộ'),
//    new CatFullService('2', 'Đào tạo các khóa học tại trung tâm'),
    new CatFullService('3', 'Khóa khởi nghiệp'),
    new CatFullService('4', 'Đào tạo pha chế tại quán + hỗ trợ khai trương'),
    new CatFullService('5', 'Đào tạo vận hành'),
    new CatFullService('6', 'Setup menu'),
//    new CatFullService('7', 'Đào tạo thu ngân, phần mềm bán hàng'),
//    new CatFullService('8', 'Cung cấp nguyên vật liệu, dụng cụ'),
//    new CatFullService('9', 'Cung cấp máy móc, thiết bị'),
    new CatFullService('10', 'Setup quầy'),
    new CatFullService('11', 'Thiết kế - thi công'),
    new CatFullService('12', 'Bộ nhận diện thương hiệu'),
    new CatFullService('13', 'Giấy phép kinh doanh - VSATTP'),
//    new CatFullService('14', 'Marketing từ cơ bản đến nâng cao'),
//    new CatFullService('15', 'Thiết kế web'),
//    new CatFullService('16', 'Trợ lí app bán hàng'),
//    new CatFullService('17', 'Chụp ảnh'),
//    new CatFullService('18', 'Quay phim'),
];


export const FULLSERVICES = [
  new FullService(
    "1a",
    ["1"],
    "Gói Setup Quán Cafe Trọn Bộ",
    require("../images/dichvutronbo.png"),
    [
      require("../images/dichvutronbo.png"),
      { uri: "https://cdn.dieptra.com/services/setup1.jpg" },
      { uri: "https://cdn.dieptra.com/services/setup2.jpg" },
    ],
    "Gói dịch vụ trọn gói từ thiết kế, setup quầy pha chế đến đào tạo nhân viên vận hành."
  ),

  new FullService(
    "2a",
    ["2"],
    "Khóa Học Pha Chế Chuyên Nghiệp",
    require("../images/khoahocphache.png"),
    [
      require("../images/khoahocphache.png"),
      { uri: "https://cdn.dieptra.com/services/barista1.jpg" },
      { uri: "https://cdn.dieptra.com/services/barista2.jpg" },
    ],
    "Chương trình đào tạo bài bản cho Barista, từ cơ bản đến nâng cao, phù hợp cho mở quán."
  ),

  new FullService(
    "3a",
    ["3"],
    "Khóa khởi nghiệp",
     '/images/FullService/khoa_khoi_nghiep/khoa_khoi_nghiep.jpg' ,
    [
      '/images/FullService/khoa_khoi_nghiep/khoa_khoi_nghiep.jpg' ,
    ],
    "Hướng dẫn khởi nghiệp, nâng cao kiến thức quản lý và vận hành quán tối ưu."
  ),

  new FullService(
    "4a",
    ["4"],
    "Đào Tạo Tại Quán",
    'images/FullService/dao_tao_tai_quan/dao_tao_tai_quan.png',
    [
      'images/FullService/dao_tao_tai_quan/dao_tao_tai_quan.png',
      { uri: "https://cdn.dieptra.com/services/manage1.jpg" },
    ],
    "Khóa học chuyên sâu giúp chủ quán nắm vững quy trình quản lý, kiểm soát chi phí hiệu quả."
  ),

  new FullService(
    "5a",
    ["5"],
    "Đào Tạo Quản Lý Vận Hành",
    'images/FullService/dao_tao_quan_ly_van_hanh/dao_tao_quan_ly_van_hanh.png',
    [
      'images/FullService/dao_tao_quan_ly_van_hanh/dao_tao_quan_ly_van_hanh.png',
      { uri: "https://cdn.dieptra.com/services/manage1.jpg" },
    ],
    "Khóa học chuyên sâu giúp chủ quán nắm vững quy trình quản lý, kiểm soát chi phí hiệu quả."
  ),

  new FullService(
    "6a",
    ["6"],
    "Thiết Kế Setup Menu",
    '/images/FullService/setup_menu/setup_menu.jpg' ,
    [
      '/images/FullService/setup_menu/setup_menu.jpg' ,
      { uri: "https://cdn.dieptra.com/services/menu1.jpg" },
    ],
    "Thiết kế menu, tính cost, định lượng công thức và layout trình bày chuyên nghiệp."
  ),

  new FullService(
    "7a",
    ["7"],
    "Trọn Bộ Combo Thu Ngân",
    require("../images/tronbocombothungan.png"),
    [
      require("../images/tronbocombothungan.png"),
      { uri: "https://cdn.dieptra.com/services/pos1.jpg" },
      { uri: "https://cdn.dieptra.com/services/pos2.jpg" },
    ],
    "Gói combo gồm phần mềm quản lý, máy POS, máy in bill, két tiền — sẵn sàng sử dụng ngay."
  ),

  new FullService(
    "11a",
    ["11"],
    "Thiết Kế Thi Công",
    '/images/FullService/thiet_ke_thi_cong/thiet_ke_thi_cong_01.jpg' ,
    [
      '/images/FullService/thiet_ke_thi_cong/thiet_ke_thi_cong_01.jpg' ,
      '/images/FullService/thiet_ke_thi_cong/thiet_ke_thi_cong_02.jpg' ,
      { uri: "https://cdn.dieptra.com/services/pos2.jpg" },
    ],
    "Thiết kế thi công, khảo sát mặt bằng."
  ),

  new FullService(
    "12a",
    ["12"],
    "Thiết Kế Nhận Diện Thương Hiệu",
    '/images/FullService/nhan_dien_thuong_hieu/nhan_dien_thuong_hieu.png' ,
    [
     '/images/FullService/nhan_dien_thuong_hieu/nhan_dien_thuong_hieu.png' ,
    ],
    "Thiết kế logo, màu sắc, concept thương hiệu nhất quán cho quán cà phê của bạn."
  ),

  new FullService(
    "13a",
    ["13"],
    "Đăng Ký Giấy Phép Kinh Doanh",
    '/images/FullService/giay_phep_kinh_doanh/giay_phep_kinh_doanh.png' ,
    [
      '/images/FullService/giay_phep_kinh_doanh/giay_phep_kinh_doanh.png' ,
    ],
    "Hỗ trợ thủ tục pháp lý, đăng ký kinh doanh nhanh chóng, tiết kiệm thời gian."
  ),

  new FullService(
    "13b",
    ["13"],
    "Đăng Ký Giấy Phép Vệ Sinh An Toàn Thực Phẩm (Hộ Kinh Doanh)",
    '/images/FullService/giay_phep_kinh_doanh/ho_kinh_doanh.png' ,
    [
      '/images/FullService/giay_phep_kinh_doanh/ho_kinh_doanh.png' ,
    ],
    "Hỗ trợ thủ tục pháp lý, đăng ký kinh doanh nhanh chóng, tiết kiệm thời gian."
  ),

  new FullService(
    "13c",
    ["13"],
    "Đăng Ký Giấy Phép Vệ Sinh An Toàn Thực Phẩm (Doanh Nghiệp)",
    '/images/FullService/giay_phep_kinh_doanh/doanh_nghiep.png' ,
    [
      '/images/FullService/giay_phep_kinh_doanh/doanh_nghiep.png' ,
    ],
    "Hỗ trợ thủ tục pháp lý, đăng ký kinh doanh nhanh chóng, tiết kiệm thời gian."
  ),
];


export const CATDRINKS = [
    new CatDrink("1", "Món sáng tạo"),
    new CatDrink("ca_phe_may", "Cà phê máy"),
    new CatDrink("ca_phe_phin", "Cà phê phin"),
    new CatDrink("matcha", "Matcha"),
    new CatDrink("sinh_to", "Sinh tố"),
    new CatDrink("tra_trai_cay", "Trà trái cây"),
    new CatDrink("sparkling", "Sparkling"),
    new CatDrink("healthy_drink", "Healthy Drink"),
    new CatDrink("topping", "Topping"),
];
export const CATCOURSES = [
    new CatCourse("1", "Danh Sách Khóa Học"),
    new CatCourse("2", "Khóa Pha Chế Tổng Hợp"),
    new CatCourse("3", "Khóa Lẻ Tự Chọn"),
    new CatCourse("4", "Khóa Nâng Cấp Menu (Mới)"),
];
export const CATINGREDIENTS = [
    new CatIngredient("bot", "Bột"),
    new CatIngredient("cafe_cacao", "Cafe - Cacao"),
    new CatIngredient("do_dong_lanh", "Đồ đông lạnh"),
    new CatIngredient("kem_suachua", "Kem - Sữa chua"),
    new CatIngredient("mut", "Mứt các loại"),
    new CatIngredient("siro", "Siro"),
    new CatIngredient("topping", "Topping"),
    new CatIngredient("tra", "Trà"),
];


export const INGREDIENTS = [
    new Ingredient("SP000554", ["bot"], "Bột Mochi Lermao", "110,000", "Chưa có dữ liệu", "Chưa có dữ liệu", '/images/Nguyen_lieu_pha_che/bot/no_data.png'),
    new Ingredient("SP000512", ["bot"], "Bột pudding tàu hũ vị phô mai 800gr", "115,000", "Chưa có dữ liệu", "Chưa có dữ liệu", '/images/Nguyen_lieu_pha_che/bot/Bột pudding tàu hũ vị phô mai 800gr.webp'),
    new Ingredient("SP000511", ["bot"], "Bột kem cheese vị muối biển", "205,000", "Chưa có dữ liệu", "Chưa có dữ liệu", '/images/Nguyen_lieu_pha_che/bot/no_data.png'),
    new Ingredient("SP000510", ["bot"], "Bột màng sữa PHÔ MAI muối biển", "0,000", "Chưa có dữ liệu", "Chưa có dữ liệu", '/images/Nguyen_lieu_pha_che/bot/no_data.png'),
    new Ingredient("SP000506", ["bot"], "Bột matcha trà xanh Bạch Dương 250g", "218,000", "Chưa có dữ liệu", "Chưa có dữ liệu", '/images/Nguyen_lieu_pha_che/bot/Bột matcha trà xanh Bạch Dương 250g.webp'),
    new Ingredient("SP000505", ["bot"], "Bột thạch thuỷ tinh Mao Mao", "0,000", "Chưa có dữ liệu", "Chưa có dữ liệu", '/images/Nguyen_lieu_pha_che/bot/no_data.png'),
    new Ingredient("SP000492", ["bot"], "Bột thạch Jelly Power 500g", "60,000", "Chưa có dữ liệu", "Chưa có dữ liệu", '/images/Nguyen_lieu_pha_che/bot/Bột thạch Jelly Power 500g.webp'),
    new Ingredient("SP000454", ["bot"], "Matcha Ceremonia Grade (100g)", "0,000", "Chưa có dữ liệu", "Chưa có dữ liệu", '/images/Nguyen_lieu_pha_che/bot/no_data.png'),
    new Ingredient("SP000453", ["bot"], "Matcha Culinary Grade (100g)", "0,000", "Chưa có dữ liệu", "Chưa có dữ liệu", '/images/Nguyen_lieu_pha_che/bot/no_data.png'),
    new Ingredient("SP000431", ["bot"], "Bột pudding trứng Mole", "205,000", "Chưa có dữ liệu", "Chưa có dữ liệu", '/images/Nguyen_lieu_pha_che/bot/Bột pudding trứng Mole.webp'),
    new Ingredient("SP000424", ["bot"], "Bột chanh Naivta 350gr", "100,000", "Chưa có dữ liệu", "Chưa có dữ liệu", '/images/Nguyen_lieu_pha_che/bot/Bột chanh Naivta 350gr.webp'),
    new Ingredient("SP000423", ["bot"], "Muối hồng 200gr", "25,000", "Chưa có dữ liệu", "Chưa có dữ liệu", '/images/Nguyen_lieu_pha_che/bot/Muối hồng 200gr.webp'),
    new Ingredient("SP000413", ["bot"], "Bột sữa Bắp Day to Day", "0,000", "Chưa có dữ liệu", "Chưa có dữ liệu", '/images/Nguyen_lieu_pha_che/bot/Bột sữa Bắp Day to Day.webp'),
    new Ingredient("SP000412", ["bot"], "Bột Frapper Ciel 1kg", "110,000", "Chưa có dữ liệu", "Chưa có dữ liệu", '/images/Nguyen_lieu_pha_che/bot/Bột Frapper Ciel 1kg.webp'),
    new Ingredient("SP000411", ["bot"], "Bột Thạch Jelly Ciel 1kg", "100,000", "Chưa có dữ liệu", "Chưa có dữ liệu", '/images/Nguyen_lieu_pha_che/bot/Bột Thạch Jelly Ciel 1kg.webp'),
    new Ingredient("SP000377", ["bot"], "Bột Gelatine Ewald", "308,000", "Chưa có dữ liệu", "Chưa có dữ liệu", '/images/Nguyen_lieu_pha_che/bot/Bột Gelatine Ewald.webp'),
    new Ingredient("NL000337", ["bot"], "Bột Sương Sáo Đài Loan Herbal", "69,000", "Gói 400g", "Chưa có dữ liệu", '/images/Nguyen_lieu_pha_che/bot/Bột Sương Sáo Đài Loan Herbal.webp'),
    new Ingredient("SP000300", ["bot"], "Bột sữa chua Mao Mao", "125,000", "Gói 800g", "Chưa có dữ liệu", '/images/Nguyen_lieu_pha_che/bot/Bột sữa chua Mao Mao.webp'),
    new Ingredient("SP000261", ["bot"], "Bột Kem Không Sữa Mộc Lam ( Truyền Thống)", "80,000", "Chưa có dữ liệu", "Chưa có dữ liệu", '/images/Nguyen_lieu_pha_che/bot/Bột Kem Không Sữa Mộc Lam ( Truyền Thống).webp'),
    new Ingredient("SP000395", ["bot"], "Bột Kem Không Sữa Mộc Lam ( Truyền Thống)", "984,000", "Chưa có dữ liệu", "Chưa có dữ liệu", '/images/Nguyen_lieu_pha_che/bot/no_data.png'),
    new Ingredient("SP000237", ["bot"], "Bột khoai môn Binbaoli", "132,000", "Chưa có dữ liệu", "Chưa có dữ liệu", '/images/Nguyen_lieu_pha_che/bot/Bột khoai môn Binbaoli.webp'),
    new Ingredient("SP000035", ["bot"], "Bột Fraper Luave 1kg", "142,000", "Chưa có dữ liệu", "Chưa có dữ liệu", '/images/Nguyen_lieu_pha_che/bot/Bột Fraper Luave 1kg.webp'),
    new Ingredient("SP000064", ["bot"], "Bột kem phô mai Eurodeli", "255,000", "Chưa có dữ liệu", "Chưa có dữ liệu", '/images/Nguyen_lieu_pha_che/bot/Bột kem phô mai Eurodeli.webp'),
    new Ingredient("SP000065", ["bot"], "Bột đậu xanh Minh Ngọc", "53,000", "Chưa có dữ liệu", "Chưa có dữ liệu", '/images/Nguyen_lieu_pha_che/bot/Bột đậu xanh Minh Ngọc.webp'),
    new Ingredient("SP000066", ["bot"], "Bột matcha nhật", "148,000", "Chưa có dữ liệu", "Chưa có dữ liệu", '/images/Nguyen_lieu_pha_che/bot/Bột matcha nhật.webp'),
    new Ingredient("SP000094", ["bot"], "Bột Sữa Kem Béo Mộc Lam (Hiện Đại)", "118,000", "Chưa có dữ liệu", "Chưa có dữ liệu", '/images/Nguyen_lieu_pha_che/bot/Bột Sữa Kem Béo Mộc Lam (Hiện Đại).webp'),
    new Ingredient("SP000125", ["bot"], "Bột KEM trứng", "140,000", "Chưa có dữ liệu", "Chưa có dữ liệu", '/images/Nguyen_lieu_pha_che/bot/Bột KEM trứng.webp'),
    new Ingredient("SP000137", ["bot"], "Bột PUDDING trứng", "130,000", "Chưa có dữ liệu", "Chưa có dữ liệu", '/images/Nguyen_lieu_pha_che/bot/Bột PUDDING trứng.webp'),
    new Ingredient("SP000169", ["bot"], "Bột Làm Kem Tươi Mộc Lam ( Túi 2KG)", "210,000", "Chưa có dữ liệu", "Chưa có dữ liệu", '/images/Nguyen_lieu_pha_che/bot/Bột Làm Kem Tươi Mộc Lam ( Túi 2KG).webp'),
    new Ingredient("10406982", ["bot"], "Socola đen sữa dừa", "150,000", "Chưa có dữ liệu", "Chưa có dữ liệu", '/images/Nguyen_lieu_pha_che/bot/Socola đen sữa dừa.webp'),
    new Ingredient("SP000176", ["bot"], "Bột kem vị Dưa lưới", "135,000", "Chưa có dữ liệu", "Chưa có dữ liệu", '/images/Nguyen_lieu_pha_che/bot/Bột kem vị Dưa lưới.webp'),
    new Ingredient("8934974041443", ["bot"], "Bột kem vị dâu tây", "135,000", "Chưa có dữ liệu", "Chưa có dữ liệu", '/images/Nguyen_lieu_pha_che/bot/Bột kem vị dâu tây.webp'),
    new Ingredient("SP000184", ["bot"], "Bột kem vị Dừa", "135,000", "Chưa có dữ liệu", "Chưa có dữ liệu", '/images/Nguyen_lieu_pha_che/bot/Bột kem vị Dừa.webp'),
    new Ingredient("SP000185", ["bot"], "Bột kem vị sầu riêng", "135,000", "Chưa có dữ liệu", "Chưa có dữ liệu", '/images/Nguyen_lieu_pha_che/bot/Bột kem vị sầu riêng.webp'),
    new Ingredient("SP000562", ["cafe_cacao"], "Cafe hạt Arabica", "340,000", "Chưa có dữ liệu", "Chưa có dữ liệu", '/images/Nguyen_lieu_pha_che/cafe_cacao/caphehatarabica.webp'),
    new Ingredient("SP000507", ["cafe_cacao"], "Cacao nguyên chất Bạch Dương 1kg", "315,000", "Chưa có dữ liệu", "Chưa có dữ liệu", '/images/Nguyen_lieu_pha_che/cafe_cacao/Cacao nguyên chất Bạch Dương 1kg.webp'),
    new Ingredient("SP000378", ["cafe_cacao"], "Cafe hạt Robusta", "260,000", "Chưa có dữ liệu", "Chưa có dữ liệu", '/images/Nguyen_lieu_pha_che/cafe_cacao/caphehatrobusta.webp'),
    new Ingredient("8938507329022", ["cafe_cacao"], "Cafe phin rang xay số 5 Mộc Lam (xay sẵn)", "252,000", "Chưa có dữ liệu", "Chưa có dữ liệu", '/images/Nguyen_lieu_pha_che/cafe_cacao/caphephinso5.webp'),
    new Ingredient("SP000221", ["cafe_cacao"], "Cafe hạt Blend 1kg (Pha Máy)", "320,000", "Chưa có dữ liệu", "Chưa có dữ liệu", '/images/Nguyen_lieu_pha_che/cafe_cacao/caphehatblend.webp'),
    new Ingredient("SP000082", ["cafe_cacao"], "Cacao Rich nguyên chất 100%", "120,000", "Chưa có dữ liệu", "Chưa có dữ liệu", '/images/Nguyen_lieu_pha_che/cafe_cacao/Cacao Rich nguyên chất 100.webp'),
    new Ingredient("SP000087", ["cafe_cacao"], "Cafe hạt tổng hợp nguyên chất (chưa xay)", "245,000", "Chưa có dữ liệu", "Chưa có dữ liệu", '/images/Nguyen_lieu_pha_che/cafe_cacao/caphehattonghop.webp'),
    new Ingredient("SP000543", ["do_dong_lanh"], "Trân châu MATCHA nhân phô mai 500gr (ĐỒ ĐÔNG LẠNH)", "57,000", "Chưa có dữ liệu", "Chưa có dữ liệu", '/images/Nguyen_lieu_pha_che/do_dong_lanh/Trân châu MATCHA nhân phô mai 500gr (ĐỒ ĐÔNG LẠNH).webp'),
    new Ingredient("SP000540", ["do_dong_lanh"], "Trân châu đen nấu nhanh (ĐỒ ĐÔNG LẠNH)", "66,000", "Chưa có dữ liệu", "Chưa có dữ liệu", '/images/Nguyen_lieu_pha_che/do_dong_lanh/Trân châu đen nấu nhanh (ĐỒ ĐÔNG LẠNH).webp'),
    new Ingredient("SP000504", ["do_dong_lanh"], "Khoai môn nghiền (ĐỒ ĐÔNG LẠNH)", "57,000", "Chưa có dữ liệu", "Chưa có dữ liệu", '/images/Nguyen_lieu_pha_che/do_dong_lanh/Khoai môn nghiền (ĐỒ ĐÔNG LẠNH).webp'),
    new Ingredient("SP000450", ["do_dong_lanh"], "Kem Béo Thực Vật Ice Hot Rich's (ĐỒ ĐÔNG LẠNH) 454g/ hộp", "32,000", "454g/ hộp", "Chưa có dữ liệu", '/images/Nguyen_lieu_pha_che/do_dong_lanh/Kem Béo Thực Vật Ice Hot Rich (ĐỒ ĐÔNG LẠNH).webp'),
    new Ingredient("SP000451", ["do_dong_lanh"], "Kem Béo Thực Vật Ice Hot Rich's (ĐỒ ĐÔNG LẠNH) 24 hộp/ thùng", "720,000", "454g/ hộp, 24 hộp/ thùng", "Chưa có dữ liệu", '/images/Nguyen_lieu_pha_che/do_dong_lanh/Kem Béo Thực Vật Ice Hot Rich (ĐỒ ĐÔNG LẠNH).webp'),
    new Ingredient("SP000449", ["do_dong_lanh"], "Trân Châu Táo gai (ĐỒ ĐÔNG LẠNH)", "50,000", "Chưa có dữ liệu", "Chưa có dữ liệu", '/images/Nguyen_lieu_pha_che/do_dong_lanh/Trân Châu Táo gai (ĐỒ ĐÔNG LẠNH).webp'),
    new Ingredient("SP000448", ["do_dong_lanh"], "Trân Châu Thanh Mai (ĐỒ ĐÔNG LẠNH)", "54,000", "Chưa có dữ liệu", "Chưa có dữ liệu", '/images/Nguyen_lieu_pha_che/do_dong_lanh/Trân Châu Thanh Mai (ĐỒ ĐÔNG LẠNH).webp'),
    new Ingredient("SP000445", ["do_dong_lanh"], "Trân châu OLONG nhài ( ĐỒ ĐÔNG LẠNH)", "48,000", "Chưa có dữ liệu", "Chưa có dữ liệu", '/images/Nguyen_lieu_pha_che/do_dong_lanh/Trân châu OLONG nhài ( ĐỒ ĐÔNG LẠNH).webp'),
    new Ingredient("SP000414", ["do_dong_lanh"], "Kem béo VỊ SỮA ICE HOT (ĐỒ ĐÔNG LẠNH)", "46,000", "Chưa có dữ liệu", "Chưa có dữ liệu", '/images/Nguyen_lieu_pha_che/do_dong_lanh/Kem béo VỊ SỮA ICE HOT (ĐỒ ĐÔNG LẠNH).webp'),
    new Ingredient("SP000344", ["do_dong_lanh"], "Trân Châu Nhân Phô Mai (ĐỒ ĐÔNG LẠNH)", "59,000", "500g/ gói", "Chưa có dữ liệu", '/images/Nguyen_lieu_pha_che/do_dong_lanh/Trân Châu Nhân Phô Mai (ĐỒ ĐÔNG LẠNH).webp'),
    new Ingredient("SP000110", ["do_dong_lanh"], "Kem pha chế đa năng ONTOP (ĐỒ ĐÔNG LẠNH) 907g/ hộp", "75,000", "907g/ hộp", "Chưa có dữ liệu", '/images/Nguyen_lieu_pha_che/do_dong_lanh/Kem pha chế đa năng ONTOP (ĐỒ ĐÔNG LẠNH).webp'),
    new Ingredient("SP000363", ["do_dong_lanh"], "Kem pha chế đa năng ONTOP (ĐỒ ĐÔNG LẠNH) 24 hộp/ thùng", "720,000", "907g/ hộp, 24 hộp/ thùng", "Chưa có dữ liệu", '/images/Nguyen_lieu_pha_che/do_dong_lanh/Kem pha chế đa năng ONTOP (ĐỒ ĐÔNG LẠNH).webp'),
    new Ingredient("SP000196", ["do_dong_lanh"], "Kem SỮA CHUA phô mai Nhất Hương (ĐỒ ĐÔNG LẠNH)", "47,000", "Chưa có dữ liệu", "Chưa có dữ liệu", '/images/Nguyen_lieu_pha_che/do_dong_lanh/Kem SỮA CHUA phô mai Nhất Hương (ĐỒ ĐÔNG LẠNH).webp'),
    new Ingredient("8936022044918", ["do_dong_lanh"], "Kem LÁ DỨA phô mai Nhất Hương (ĐỒ ĐÔNG LẠNH)", "47,000", "500g/ hộp", "Chưa có dữ liệu", '/images/Nguyen_lieu_pha_che/do_dong_lanh/Kem LÁ DỨA phô mai Nhất Hương (ĐỒ ĐÔNG LẠNH).webp'),
    new Ingredient("SP000202", ["do_dong_lanh"], "Trân châu Khổng Lồ Chesseball (ĐỒ ĐÔNG LẠNH)", "84,000", "25 viên/ vỉ", "Chưa có dữ liệu", '/images/Nguyen_lieu_pha_che/do_dong_lanh/Trân châu Khổng Lồ Chesseball (ĐỒ ĐÔNG LẠNH).webp'),
    new Ingredient("SP000203", ["do_dong_lanh"], "Trân Châu Phomai Khoai Môn Tím Chesseball (ĐỒ ĐÔNG LẠNH)", "84,000", "25 viên/ vỉ", "Chưa có dữ liệu", '/images/Nguyen_lieu_pha_che/do_dong_lanh/Trân Châu Phomai Khoai Môn Tím Chesseball (ĐỒ ĐÔNG LẠNH).webp'),
    new Ingredient("SP000213", ["do_dong_lanh"], "Trân châu củ năng hồng Mao Mao 500g (ĐỒ ĐÔNG LẠNH)", "55,000", "Chưa có dữ liệu", "Chưa có dữ liệu", '/images/Nguyen_lieu_pha_che/do_dong_lanh/Trân châu củ năng hồng Mao Mao 500g (ĐỒ ĐÔNG LẠNH).webp'),
    new Ingredient("SP000546", ["kem_suachua"], "Sữa nước Guangxi không chất béo 1kg", "120,000", "1kg/ hộp", "Chưa có dữ liệu", '/images/Nguyen_lieu_pha_che/kem_suachua/Sữa nước Guangxi không chất béo 1kg.webp'),
    new Ingredient("SP000536", ["kem_suachua"], "Sữa tươi Tiệt Trùng Western 1L", "29,000", "1L/ hộp", "Chưa có dữ liệu", '/images/Nguyen_lieu_pha_che/kem_suachua/sua-tuoi-western.jpg'),
    new Ingredient("3517673314909", ["kem_suachua"], "SỮA ĐẶC NGÔI SAO PHƯƠNG NAM 1.284kg/ hộp", "65,000", "1.284kg/ hộp", "Chưa có dữ liệu", '/images/Nguyen_lieu_pha_che/kem_suachua/SỮA ĐẶC NGÔI SAO PHƯƠNG NAM 1.284kg.webp'),
    new Ingredient("SP000364", ["kem_suachua"], "SỮA ĐẶC NGÔI SAO PHƯƠNG NAM 1.284kg/ hộp, 12 hộp/ thùng", "768,000", "1.284kg/ hộp, 12 hộp/ thùng", "Chưa có dữ liệu", '/images/Nguyen_lieu_pha_che/kem_suachua/SỮA ĐẶC NGÔI SAO PHƯƠNG NAM 1.284kg.webp'),
    new Ingredient("SP000054", ["kem_suachua"], "Sữa tươi tiệt trùng HAPPY BARN Sữa Ba Lan (không đường) 1L/ hộp", "30,000", "1L/ hộp", "Chưa có dữ liệu", '/images/Nguyen_lieu_pha_che/kem_suachua/Sữa tươi tiệt trùng HAPPY BARN Sữa Ba Lan (không đường).webp'),
    new Ingredient("SP000372", ["kem_suachua"], "Sữa tươi tiệt trùng HAPPY BARN Sữa Ba Lan (không đường) 1L/ hộp, 12 hộp/ thùng", "348,000", "1L/ hộp, 12 hộp/ thùng", "Chưa có dữ liệu", '/images/Nguyen_lieu_pha_che/kem_suachua/Sữa tươi tiệt trùng HAPPY BARN Sữa Ba Lan (không đường).webp'),
    new Ingredient("SP000440", ["mut"], "Mứt Ổi hồng", "115,000", "1kg/ hũ", "Chưa có dữ liệu", '/images/Nguyen_lieu_pha_che/mut/Mứt Ổi hồng.webp'),
    new Ingredient("SP000552", ["mut"], "Mứt dâu Đan Đông", "100,000", "1kg/ túi", "Chưa có dữ liệu", '/images/Nguyen_lieu_pha_che/mut/Mứt dâu Đan Đông.webp'),
    new Ingredient("SP000250", ["mut"], "Mứt dưa lưới Dedu 1.2kg", "110,000", "1.2kg/ hộp", "Chưa có dữ liệu", '/images/Nguyen_lieu_pha_che/mut/Mứt dưa lưới Dedu 1.2kg.webp'),
    new Ingredient("8935282904895", ["mut"], "Mứt vải & hoa hồng ANDROS CHUNKY 1KG", "179,000", "1kg/ túi", "Chưa có dữ liệu", '/images/Nguyen_lieu_pha_che/mut/Mứt vải & hoa hồng ANDROS CHUNKY 1KG.webp'),
    new Ingredient("SP000539", ["mut"], "Mứt chanh Kum quất", "110,000", "1kg/ túi", "Chưa có dữ liệu", '/images/Nguyen_lieu_pha_che/mut/Mứt chanh Kum quất.webp'),
    new Ingredient("SP000537", ["mut"], "Mứt lê Lermao", "93,000", "1L/ hộp", "Chưa có dữ liệu", '/images/Nguyen_lieu_pha_che/mut/no_data.png'),
    new Ingredient("SP000542", ["mut"], "Mứt nhãn Lermao", "135,000", "1L/ hộp", "Chưa có dữ liệu", '/images/Nguyen_lieu_pha_che/mut/no_data.png'),
    new Ingredient("SP000528", ["mut"], "Mứt dứa Lermao (MỨT THƠM MAOMAO)", "120,000", "1kg/ túi", "Chưa có dữ liệu", '/images/Nguyen_lieu_pha_che/mut/Mứt dứa Lermao (MỨT THƠM MAOMAO).webp'),
    new Ingredient("SP000538", ["mut"], "Mứt quế hoa Lermao", "110,000", "1kg/ túi", "Chưa có dữ liệu", '/images/Nguyen_lieu_pha_che/mut/Mứt quế hoa Lermao.webp'),
    new Ingredient("SP000340", ["mut"], "Tép Bưởi Nước Đường Wonderful", "85,000", "850g/ hộp", "Chưa có dữ liệu", '/images/Nguyen_lieu_pha_che/mut/no_data.png'),
    new Ingredient("SP00241", ["mut"], "Mứt XOÀI Mao Mao hộp 1.36kg", "108,000", "1.3kg/ hộp", "Chưa có dữ liệu", '/images/Nguyen_lieu_pha_che/mut/Mứt XOÀI Mao Mao hộp 1.36kg.webp'),
    new Ingredient("SP00240", ["mut"], "Mứt mật ong ĐÀO Mao Mao 1.36kg", "105,000", "1.3kg/ hộp", "Chưa có dữ liệu", '/images/Nguyen_lieu_pha_che/mut/Mứt mật ong ĐÀO Mao Mao 1.36kg.webp'),
    new Ingredient("SP000108", ["mut"], "Mứt đào Tainong 1.36kg", "105,000", "1.3kg/ hộp", "Chưa có dữ liệu", '/images/Nguyen_lieu_pha_che/mut/Mứt đào Tainong 1.36kg.webp'),
    new Ingredient("SP00239", ["mut"], "Mứt DÂU tây Mao Mao 1.36kg", "115,000", "1.3kg/ hộp", "Chưa có dữ liệu", '/images/Nguyen_lieu_pha_che/mut/Mứt DÂU tây Mao Mao 1.36kg.webp'),
    new Ingredient("SP000283", ["mut"], "Fruit mix Mãng Cầu Andros 820ml", "155,000", "820ml/ chai", "Chưa có dữ liệu", '/images/Nguyen_lieu_pha_che/mut/Fruit mix Mãng Cầu Andros 820ml.webp'),
    new Ingredient("SP000496", ["mut"], "Mứt Quất Hồng Bì Mao Mao", "120,000", "1.2kg/ hộp", "Chưa có dữ liệu", '/images/Nguyen_lieu_pha_che/mut/no_data.png'),
    new Ingredient("SP000545", ["mut"], "Mứt Dâu tằm Lermao", "98,000", "1kg/ túi", "Chưa có dữ liệu", '/images/Nguyen_lieu_pha_che/mut/no_data.png'),
    new Ingredient("SP000336", ["mut"], "Mứt Khoai Lang Tím Chunky", "135,000", "1kg/ túi", "Chưa có dữ liệu", '/images/Nguyen_lieu_pha_che/mut/Mứt Khoai Lang Tím Chunky.webp'),
    new Ingredient("SP000509", ["mut"], "Mứt Hoa Nhài Mao Mao", "160,000", "1.2kg/ hộp", "Chưa có dữ liệu", '/images/Nguyen_lieu_pha_che/mut/no_data.png'),
    new Ingredient("SP000568", ["mut"], "Mứt sầu riêng Labon", "230,000", "Chưa có dữ liệu", "Chưa có dữ liệu", '/images/Nguyen_lieu_pha_che/mut/no_data.png'),
    new Ingredient("SP000439", ["mut"], "Mứt Lá Dứa Mao Mao", "110,000", "1kg/ túi", "Chưa có dữ liệu", '/images/Nguyen_lieu_pha_che/mut/Mứt Lá Dứa Mao Mao.webp'),
    new Ingredient("SP000418", ["mut"], "Mứt khế ép Labon 1kg", "165,000", "1kg/ túi", "Chưa có dữ liệu", '/images/Nguyen_lieu_pha_che/mut/Mứt khế ép Labon 1kg.webp'),
    new Ingredient("SP000197", ["mut"], "Mứt vải Boduo 1kg", "140,000", "1kg/ hũ", "Chưa có dữ liệu", '/images/Nguyen_lieu_pha_che/mut/Mứt vải Boduo 1kg.webp'),
    new Ingredient("SP000571", ["mut"], "Mứt Bưởi mật ong ColoMix", "168,000", "1.2kg/ hộp", "Chưa có dữ liệu", '/images/Nguyen_lieu_pha_che/mut/Mứt Bưởi mật ong ColoMix.webp'),
    new Ingredient("SP000572", ["mut"], "Mứt Vải Hoa hồng ColoMix", "125,000", "900g/ hũ", "Chưa có dữ liệu", '/images/Nguyen_lieu_pha_che/mut/Mứt Vải Hoa hồng ColoMix.webp'),
    new Ingredient("SP000573", ["mut"], "Siro Lựu ColoMix", "128,000", "900g/ hũ", "Chưa có dữ liệu", '/images/Nguyen_lieu_pha_che/mut/Siro Lựu ColoMix.webp'),

    new Ingredient("SP000083", ["siro"], "Siro nhiệt đới Mao Mao", "155,000", "1.3kg/ chai", "Chưa có dữ liệu", '/images/Nguyen_lieu_pha_che/siro/Siro nhiệt đới Mao Mao.webp'),
    new Ingredient("SP000526", ["siro"], "Siro bí đao Bạch Dương", "155,000", "2.5kg/ can", "Chưa có dữ liệu", '/images/Nguyen_lieu_pha_che/siro/Siro bí đao Bạch Dương.webp'),
    new Ingredient("SP000338", ["siro"], "Siro Caramel Maulin", "218,000", "1.3kg/ chai", "Chưa có dữ liệu", '/images/Nguyen_lieu_pha_che/siro/Siro Caramel Maulin.webp'),
    new Ingredient("SP000342", ["siro"], "Siro Bưởi Đỏ Wonderfull", "135,000", "1.3kg/ chai", "Chưa có dữ liệu", '/images/Nguyen_lieu_pha_che/siro/Siro Bưởi Đỏ Wonderfull.webp'),
    new Ingredient("SP000321", ["siro"], "Siro Boduo Việt Quất (2 Lít)", "125,000", "2L/ chai", "Chưa có dữ liệu", '/images/Nguyen_lieu_pha_che/siro/Siro Boduo Việt Quất (2 Lít).webp'),
    new Ingredient("SP000076", ["siro"], "Siro monin matcha 0.7l", "220,000", "700ml/ chai", "Chưa có dữ liệu", '/images/Nguyen_lieu_pha_che/siro/Siro monin matcha 0.7l.webp'),
    new Ingredient("SP000326", ["siro"], "Sữa dừa Amo Pastel", "68,000", "1L/ chai", "Chưa có dữ liệu", '/images/Nguyen_lieu_pha_che/siro/Sữa dừa Amo Pastel.webp'),
    new Ingredient("SP000022", ["siro"], "Siro đường đen Mộc Lam", "110,000", "1.3kg/ chai", "Chưa có dữ liệu", '/images/Nguyen_lieu_pha_che/siro/Siro đường đen Mộc Lam.webp'),
    new Ingredient("SP000386", ["siro"], "Syrup Torani Vải (Lychee) 750ml", "185,000", "750ml/ chai", "Chưa có dữ liệu", '/images/Nguyen_lieu_pha_che/siro/no_data.png'),
    new Ingredient("SP000067", ["siro"], "Socola chocolate hershey 1.36kg", "145,000", "1.36kg/ chai", "Chưa có dữ liệu", '/images/Nguyen_lieu_pha_che/siro/Socola chocolate hershey 1.36kg.webp'),
    new Ingredient("SP000347", ["siro"], "Siro Vanila Teissiere 700ml", "190,000", "750ml/ chai", "Chưa có dữ liệu", '/images/Nguyen_lieu_pha_che/siro/Siro Vanila Teissiere 700ml.webp'),
    new Ingredient("SP000229", ["siro"], "Siro Lựu Mao Mao", "165,000", "1.2kg/ chai", "Chưa có dữ liệu", '/images/Nguyen_lieu_pha_che/siro/Siro Lựu Mao Mao.webp'),
    new Ingredient("SP000525", ["siro"], "Syrup Torani Bạc Hà Xanh", "0,000", "750ml/ chai", "Chưa có dữ liệu", '/images/Nguyen_lieu_pha_che/siro/no_data.png'),
    new Ingredient("SP000555", ["siro"], "Siro đường nâu chanti 1.3kg", "85,000", "1.3kg/ chai", "Chưa có dữ liệu", '/images/Nguyen_lieu_pha_che/siro/Siro đường nâu chanti 1.3kg.webp'),
    new Ingredient("SP000415", ["siro"], "Sốt Caramel ICE HOT", "170,000", "1kg/ chai", "Chưa có dữ liệu", '/images/Nguyen_lieu_pha_che/siro/Sốt Caramel ICE HOT.webp'),
    new Ingredient("SP000410", ["siro"], "Siro Davinci Hạt Dẻ 750ml", "184,000", "750ml/ chai", "Chưa có dữ liệu", '/images/Nguyen_lieu_pha_che/siro/Siro Davinci Hạt Dẻ 750ml.webp'),
    new Ingredient("SP000143", ["siro"], "Siro TORANI Vanila", "172,000", "850ml/ chai", "Chưa có dữ liệu", '/images/Nguyen_lieu_pha_che/siro/Siro TORANI Vanila.webp'),
    new Ingredient("SP000212", ["siro"], "Sốt nướng Koca", "82,000", "1kg/ hũ", "Chưa có dữ liệu", '/images/Nguyen_lieu_pha_che/siro/Sốt nướng Koca.webp'),
    new Ingredient("SP000251", ["topping"], "Trân châu đen 3A Wonderfull 3kg", "105,000", "3kg/ bịch", "Chưa có dữ liệu", '/images/Nguyen_lieu_pha_che/topping/Trân châu đen 3A Wonderfull 3kg.webp'),
    new Ingredient("4620748760088", ["topping"], "Đào ngâm Countree 820G", "32,000", "820g/ hộp", "Chưa có dữ liệu", '/images/Nguyen_lieu_pha_che/topping/Đào ngâm Countree 820G.webp'),
    new Ingredient("SP000103", ["topping"], "Thạch Trân châu trắng 3Q Zion", "54,000", "2kg/ bịch", "Chưa có dữ liệu", '/images/Nguyen_lieu_pha_che/topping/Thạch Trân châu trắng 3Q Zion.webp'),
    new Ingredient("SP000090", ["topping"], "Hạt sen ngâm đường NIF", "57,000", "560g/ hộp", "Chưa có dữ liệu", '/images/Nguyen_lieu_pha_che/topping/Hạt sen ngâm đường NIF.webp'),
    new Ingredient("SP000532", ["topping"], "Vải ngâm Pogi 565g", "34,000", "565g/ hộp", "Chưa có dữ liệu", '/images/Nguyen_lieu_pha_che/topping/Vải ngâm Pogi 565g.webp'),
    new Ingredient("SP000393", ["topping"], "Đậu Đỏ Ngâm Đường Đóng Hộp Mao Mao", "53,000", "950g/ hộp", "Chưa có dữ liệu", '/images/Nguyen_lieu_pha_che/topping/Đậu Đỏ Ngâm Đường Đóng Hộp Mao Mao.webp'),
    new Ingredient("SP000353", ["topping"], "Hạt nổ củ năng ánh HỒNG Mao Mao", "92,000", "850g/ hộp", "Chưa có dữ liệu", '/images/Nguyen_lieu_pha_che/topping/Hạt nổ củ năng ánh HỒNG Mao Mao.webp'),
    new Ingredient("893853077254", ["topping"], "Thạch Trân Châu Đen Nâu 3Q Zion", "55,000", "2kg/ bịch", "Chưa có dữ liệu", '/images/Nguyen_lieu_pha_che/topping/Thạch Trân Châu Đen Nâu 3Q Zion.webp'),
    new Ingredient("SP000155", ["topping"], "Thạch nổ nhân củ năng Mao Mao", "92,000", "850g/ hộp", "Chưa có dữ liệu", '/images/Nguyen_lieu_pha_che/topping/Thạch nổ nhân củ năng Mao Mao.webp'),
    new Ingredient("SP000443", ["topping"], "Vải ngâm Phương Linh 565g", "42,000", "565g/ hộp", "Chưa có dữ liệu", '/images/Nguyen_lieu_pha_che/topping/Vải ngâm Phương Linh 565g.webp'),
    new Ingredient("SP000339", ["topping"], "Nhãn Ngâm Phương Linh", "35,000", "565g/ hộp", "Chưa có dữ liệu", '/images/Nguyen_lieu_pha_che/topping/Nhãn Ngâm Phương Linh.webp'),
    new Ingredient("SP000398", ["topping"], "Hạt nổ yến mạch Mao Mao", "99,000", "850g/ hộp", "Chưa có dữ liệu", '/images/Nguyen_lieu_pha_che/topping/Hạt nổ yến mạch Mao Mao.webp'),
    new Ingredient("SP000060", ["topping"], "Nha đam Xuân Thịnh", "36,000", "1kg/ bịch", "Chưa có dữ liệu", '/images/Nguyen_lieu_pha_che/topping/Nha đam Xuân Thịnh.webp'),
    new Ingredient("SP000140", ["topping"], "Vụn dừa nướng 1kg", "100,000", "1kg/ bịch", "Chưa có dữ liệu", '/images/Nguyen_lieu_pha_che/topping/Vụn dừa nướng 1kg.webp'),
    new Ingredient("SP000556", ["topping"], "Hạt sen KT Food", "56,000", "Chưa có dữ liệu", "Chưa có dữ liệu", '/images/Nguyen_lieu_pha_che/topping/no_data.png'),
    new Ingredient("8858878300010", ["topping"], "Chôm chôm ngâm đường AA 565gr", "62,000", "Chưa có dữ liệu", "Chưa có dữ liệu", '/images/Nguyen_lieu_pha_che/topping/Chôm chôm ngâm đường AA 565gr.webp'),
    new Ingredient("SP000550", ["topping"], "Thạch nổ phô mai chảy 850gr", "135,000", "850g/ hộp", "Chưa có dữ liệu", '/images/Nguyen_lieu_pha_che/topping/Thạch nổ phô mai chảy 850gr.webp'),
    new Ingredient("SP000535", ["topping"], "Vải ngâm Tim", "45,000", "Chưa có dữ liệu", "Chưa có dữ liệu", '/images/Nguyen_lieu_pha_che/topping/no_data.png'),
    new Ingredient("SP000433", ["topping"], "Trân Châu OLONG MaoMao", "47,000", "1kg/ bịch", "Chưa có dữ liệu", '/images/Nguyen_lieu_pha_che/topping/no_data.png'),
    new Ingredient("SP000286", ["topping"], "Nha đam Đại Lộc", "37,000", "1kg/ bịch", "Chưa có dữ liệu", '/images/Nguyen_lieu_pha_che/topping/Nha đam Đại Lộc.webp'),
    new Ingredient("SP000050", ["topping"], "Cốm Màu Rắc", "175,000", "1kg/ bịch", "Chưa có dữ liệu", '/images/Nguyen_lieu_pha_che/topping/Cốm Màu Rắc.webp'),
    new Ingredient("SP000549", ["tra"], "Trà Kombucha 1L", "49,000", "1L/ chai", "Chưa có dữ liệu", '/images/Nguyen_lieu_pha_che/tra/Trà Kombucha 1L.webp'),
    new Ingredient("SP000230", ["tra"], "Trà OLONG Truyền Thống Mộc Lam", "250,000", "1kg/ bịch", "Chưa có dữ liệu", '/images/Nguyen_lieu_pha_che/tra/Trà OLONG Truyền Thống Mộc Lam.webp'),
    new Ingredient("SP000012", ["tra"], "Lục Trà Nhài Mộc Lam 1kg", "365,000", "1kg/ bịch", "Chưa có dữ liệu", '/images/Nguyen_lieu_pha_che/tra/Lục Trà Nhài Mộc Lam 1kg.webp'),
    new Ingredient("SP000243", ["tra"], "Trà Pha Máy - Hồng Trà Mộc Lam", "348,000", "1kg/ bịch", "Chưa có dữ liệu", '/images/Nguyen_lieu_pha_che/tra/Trà Pha Máy - Hồng Trà Mộc Lam.webp'),
    new Ingredient("SP000231", ["tra"], "Hồng Trà Truyền Thống Mộc Lam", "180,000", "1kg/ bịch", "Chưa có dữ liệu", '/images/Nguyen_lieu_pha_che/tra/Hồng Trà Truyền Thống Mộc Lam.webp'),
    new Ingredient("SP000455", ["tra"], "Trà Shan tuyết Mộc Lam PHA MÁY", "370,000", "1kg/ bịch", "Chưa có dữ liệu", '/images/Nguyen_lieu_pha_che/tra/Trà Shan tuyết Mộc Lam PHA MÁY.webp'),
    new Ingredient("SP000425", ["tra"], "Hồng trà đậm vị Mộc Lam 1kg", "320,000", "1kg/ bịch", "Chưa có dữ liệu", '/images/Nguyen_lieu_pha_che/tra/Hồng trà đậm vị Mộc Lam 1kg.webp'),
    new Ingredient("SP000557", ["tra"], "Trà Đại Hồng Bào 1kg", "260,000", "1kg/ bịch", "Chưa có dữ liệu", '/images/Nguyen_lieu_pha_che/tra/no_data.png'),
    new Ingredient("SP000494", ["tra"], "Trà Shan Tuyết Mộc Lam", "359,000", "1kg/ bịch", "Chưa có dữ liệu", '/images/Nguyen_lieu_pha_che/tra/Trà Shan Tuyết Mộc Lam.webp'),
    new Ingredient("SP000346", ["tra"], "Trà Gạo Rang", "360,000", "1kg/ bịch", "Chưa có dữ liệu", '/images/Nguyen_lieu_pha_che/tra/Trà Gạo Rang.webp'),
    new Ingredient("SP000566", ["tra"], "Trà Oolong Phong Lan 1kg", "390,000", "1kg/ bịch", "Chưa có dữ liệu", '/images/Nguyen_lieu_pha_che/tra/no_data.png'),
    new Ingredient("SP000541", ["tra"], "Trà OLONG kiều mạch 1kg", "360,000", "1kg/ bịch", "Chưa có dữ liệu", '/images/Nguyen_lieu_pha_che/tra/no_data.png'),
    new Ingredient("SP000531", ["tra"], "Hồng trà Sài Gòn - Túi 500gr", "360,000", "500g/ túi", "Chưa có dữ liệu", '/images/Nguyen_lieu_pha_che/tra/no_data.png'),
    new Ingredient("SP000206", ["tra"], "Trà Pha Máy - OLONG Mộc Lam", "365,000", "1kg/ bịch", "Chưa có dữ liệu", '/images/Nguyen_lieu_pha_che/tra/Trà Pha Máy - OLONG Mộc Lam.webp'),
    new Ingredient("SP000574", ["tra"], "Trà Ô long Nhài thượng hạng Bạch Dương", "372,000", "1kg/ bịch", "Chưa có dữ liệu", '/images/Nguyen_lieu_pha_che/tra/no_data.png'),

];

export const DRINKS = [
    new Drink(
        "100",
        ["1"],
        "Kombucha chanh dâu",
        "/images/thumbnails/catdrink/Drink_GV_An_webp/37. Kombucha chanh dâu.webp",
        [
            "/images/full/catdrink/Drink_GV_An_webp/37. Kombucha chanh dâu bg.png",
            "/images/full/catdrink/Drink_GV_An_webp/37. Kombucha chanh dâu.png",
        ],
        `100ml Kombucha
      30g mứt dâu Lermao
      10g chanh thơm
      30ml trà lục hoa nhài
      50g dâu tươi
      30g đường`,
        ["SP000552", "SP000012", "SP000549"]
    ),

    new Drink(
        "101",
        ["1"],
        "Hồng hoa lệ chi",
        "/images/thumbnails/catdrink/Drink_GV_An_webp/1. Hồng hoa lệ chi.webp",
        [
            "/images/full/catdrink/Drink_GV_An_webp/1. Hồng hoa lệ chi bg.png",
            "/images/full/catdrink/Drink_GV_An_webp/1. Hồng hoa lệ chi.png",
        ],
        `100ml Trà hoa hồng
      50ml nước vải ép
      30g vải tươi bóc vỏ
      20ml syrup hồng hoa
      20g đường
      Đá viên vừa đủ`,
        ["SP000555", "SP000019", "SP000502"]
    ),

    // 🍹 DANH SÁCH ĐỒ UỐNG (ID: 102–119)
    new Drink(
        "102",
        ["1"],
        "Cung hỷ phát tài",
        "/images/thumbnails/catdrink/Drink_GV_An_webp/2. Cung hỷ phát tài.webp",
        [
            "/images/full/catdrink/Drink_GV_An_webp/2. Cung hỷ phát tài bg.png",
            "/images/full/catdrink/Drink_GV_An_webp/2. Cung hỷ phát tài.png",
        ],
        `100ml Hồng trà Mộc Lam
  30g Mứt đào Mao Mao
  20ml Siro đường đen Mộc Lam
  30g Đào ngâm Countree
  Đá viên vừa đủ`,
        ["SP000231", "SP00240", "SP000022", "4620748760088"]
    ),

    new Drink(
        "103",
        ["1"],
        "Lục ngọc thiên hương",
        "/images/thumbnails/catdrink/Drink_GV_An_webp/3. Lục ngọc thiên hương.webp",
        [
            "/images/full/catdrink/Drink_GV_An_webp/3. Lục ngọc thiên hương bg.png",
            "/images/full/catdrink/Drink_GV_An_webp/3. Lục ngọc thiên hương.png",
        ],
        `120ml Trà Oolong Phong Lan
  30g Mứt nhãn Lermao
  20ml Siro đường nâu Chanti
  50g Nhãn ngâm Phương Linh
  Đá viên vừa đủ`,
        ["SP000566", "SP000542", "SP000555", "SP000339"]
    ),

    new Drink(
        "104",
        ["1"],
        "Túy lựu đào hoa",
        "/images/thumbnails/catdrink/Drink_GV_An_webp/4. Túy lựu đào hoa.webp",
        [
            "/images/full/catdrink/Drink_GV_An_webp/4. Túy lựu đào hoa bg.png",
            "/images/full/catdrink/Drink_GV_An_webp/4. Túy lựu đào hoa.png",
        ],
        `100ml Lục trà nhài
  30g Mứt đào Tainong
  20ml Siro Lựu Mao Mao
  30g Đào ngâm Countree
  Đá viên vừa đủ`,
        ["SP000012", "SP000108", "SP000229", "4620748760088"]
    ),

    new Drink(
        "105",
        ["1"],
        "Kim lý hoa quế",
        "/images/thumbnails/catdrink/Drink_GV_An_webp/5. Kim lý hoa quế.webp",
        [
            "/images/full/catdrink/Drink_GV_An_webp/5. Kim lý hoa quế bg.png",
            "/images/full/catdrink/Drink_GV_An_webp/5. Kim lý hoa quế.png",
        ],
        `100ml Hồng trà Mộc Lam
  20g Mứt quế hoa Lermao
  20ml Siro Caramel Maulin
  30ml Kem béo thực vật Ice Hot
  Đá viên vừa đủ`,
        ["SP000231", "SP000538", "SP000338", "SP000450"]
    ),

    new Drink(
        "106",
        ["1"],
        "Oolong nhãn thanh trà",
        "/images/thumbnails/catdrink/Drink_GV_An_webp/6. Oolong nhãn thanh trà.webp",
        [
            "/images/full/catdrink/Drink_GV_An_webp/6. Oolong nhãn thanh trà bg.png",
            "/images/full/catdrink/Drink_GV_An_webp/6. Oolong nhãn thanh trà.png",
        ],
        `120ml Trà Oolong Truyền Thống
  30g Mứt nhãn Lermao
  15ml Siro đường đen Mộc Lam
  50g Nhãn ngâm Phương Linh
  Đá viên vừa đủ`,
        ["SP000230", "SP000542", "SP000022", "SP000339"]
    ),

    new Drink(
        "107",
        ["1"],
        "Hồng trà vàng son sủi bọt",
        "/images/thumbnails/catdrink/Drink_GV_An_webp/7. Hồng trà vàng son sủi bọt.webp",
        [
            "/images/full/catdrink/Drink_GV_An_webp/7. Hồng trà vàng son sủi bọt bg.png",
            "/images/full/catdrink/Drink_GV_An_webp/7. Hồng trà vàng son sủi bọt.png",
        ],
        `100ml Hồng trà đậm vị
  30ml Siro đường nâu Chanti
  50ml Kem béo thực vật Ice Hot
  Khuấy đều tạo bọt nhẹ
  Thêm đá vừa đủ`,
        ["SP000425", "SP000555", "SP000450"]
    ),

    new Drink(
        "108",
        ["1"],
        "Oolong lài sữa",
        "/images/thumbnails/catdrink/Drink_GV_An_webp/8. Oolong lài sữa.webp",
        [
            "/images/full/catdrink/Drink_GV_An_webp/8. Oolong lài sữa bg.png",
            "/images/full/catdrink/Drink_GV_An_webp/8. Oolong lài sữa.png",
        ],
        `120ml Trà Oolong Nhài
  40ml Sữa tươi tiệt trùng Happy Barn
  20ml Siro đường nâu Chanti
  Đá viên vừa đủ`,
        ["SP000574", "SP000054", "SP000555"]
    ),

    new Drink(
        "109",
        ["1"],
        "Hồng trà sữa",
        "/images/thumbnails/catdrink/Drink_GV_An_webp/9. Hồng trà sữa.webp",
        [
            "/images/full/catdrink/Drink_GV_An_webp/9. Hồng trà sữa bg.png",
            "/images/full/catdrink/Drink_GV_An_webp/9. Hồng trà sữa.png",
        ],
        `100ml Hồng trà Mộc Lam
  40ml Sữa tươi Western
  20ml Siro đường nâu
  Thêm kem sữa béo Mộc Lam 20g`,
        ["SP000231", "SP000536", "SP000555", "SP000094"]
    ),

    new Drink(
        "110",
        ["1"],
        "Khoai môn kem lá dứa",
        "/images/thumbnails/catdrink/Drink_GV_An_webp/10. Khoai môn kem lá dứa.webp",
        [
            "/images/full/catdrink/Drink_GV_An_webp/10. Khoai môn kem lá dứa bg.png",
            "/images/full/catdrink/Drink_GV_An_webp/10. Khoai môn kem lá dứa.png",
        ],
        `100ml Sữa tươi Happy Barn
  30g Bột khoai môn Binbaoli
  20g Mứt lá dứa Mao Mao
  20g Kem béo thực vật Ice Hot`,
        ["SP000054", "SP000237", "SP000439", "SP000450"]
    ),

    new Drink(
        "111",
        ["1"],
        "Trà sữa hạt dẻ",
        "/images/thumbnails/catdrink/Drink_GV_An_webp/11. Trà sữa hạt dẻ.webp",
        [
            "/images/full/catdrink/Drink_GV_An_webp/11. Trà sữa hạt dẻ bg.png",
            "/images/full/catdrink/Drink_GV_An_webp/11. Trà sữa hạt dẻ.png",
        ],
        `100ml Hồng trà Mộc Lam
  20ml Siro Davinci Hạt Dẻ
  40ml Sữa tươi Western
  Đá viên vừa đủ`,
        ["SP000231", "SP000410", "SP000536"]
    ),

    new Drink(
        "112",
        ["1"],
        "Sầu riêng kem lá dứa",
        "/images/thumbnails/catdrink/Drink_GV_An_webp/12. Sầu riêng kem lá dứa.webp",
        [
            "/images/full/catdrink/Drink_GV_An_webp/12. Sầu riêng kem lá dứa bg.png",
            "/images/full/catdrink/Drink_GV_An_webp/12. Sầu riêng kem lá dứa.png",
        ],
        `100ml Sữa tươi Happy Barn
  30g Mứt sầu riêng Labon
  20g Mứt lá dứa Mao Mao
  30ml Kem béo Ice Hot`,
        ["SP000054", "SP000568", "SP000439", "SP000450"]
    ),

    new Drink(
        "113",
        ["1"],
        "Hồng ngọc matcha",
        "/images/thumbnails/catdrink/Drink_GV_An_webp/13. Hồng ngọc matcha.webp",
        [
            "/images/full/catdrink/Drink_GV_An_webp/13. Hồng ngọc matcha bg.png",
            "/images/full/catdrink/Drink_GV_An_webp/13. Hồng ngọc matcha.png",
        ],
        `80ml Hồng trà Mộc Lam
  30g Bột matcha trà xanh Bạch Dương
  40ml Sữa tươi Western
  20ml Siro đường nâu`,
        ["SP000231", "SP000506", "SP000536", "SP000555"]
    ),

    new Drink(
        "114",
        ["1"],
        "Matcha latte",
        "/images/thumbnails/catdrink/Drink_GV_An_webp/14. Matcha latte.webp",
        [
            "/images/full/catdrink/Drink_GV_An_webp/14. Matcha latte bg.png",
            "/images/full/catdrink/Drink_GV_An_webp/14. Matcha latte.png",
        ],
        `60ml Matcha Ceremonia
  100ml Sữa tươi Happy Barn
  20ml Siro đường nâu
  Khuấy nhẹ và thêm đá`,
        ["SP000454", "SP000054", "SP000555"]
    ),

    new Drink(
        "115",
        ["1"],
        "Matcha creamy (1)",
        "/images/thumbnails/catdrink/Drink_GV_An_webp/15. Matcha creamy (1).webp",
        [
            "/images/full/catdrink/Drink_GV_An_webp/15. Matcha creamy (1) bg.png",
            "/images/full/catdrink/Drink_GV_An_webp/15. Matcha creamy (1).png",
        ],
        `100ml Matcha trà xanh Bạch Dương
  30ml Kem béo thực vật Ice Hot
  10g Bột kem phô mai Eurodeli
  20ml Siro đường nâu`,
        ["SP000506", "SP000450", "SP000064", "SP000555"]
    ),

    new Drink(
        "116",
        ["1"],
        "Matcha milktea",
        "/images/thumbnails/catdrink/Drink_GV_An_webp/16. Matcha milktea.webp",
        [
            "/images/full/catdrink/Drink_GV_An_webp/16. Matcha milktea bg.png",
            "/images/full/catdrink/Drink_GV_An_webp/16. Matcha milktea.png",
        ],
        `100ml Trà Oolong Nhài
  20g Bột matcha trà xanh Bạch Dương
  40ml Sữa tươi Western
  20ml Siro đường nâu`,
        ["SP000574", "SP000506", "SP000536", "SP000555"]
    ),

    new Drink(
        "117",
        ["1"],
        "Đen đá",
        "/images/thumbnails/catdrink/Drink_GV_An_webp/17. Đen đá.webp",
        [
            "/images/full/catdrink/Drink_GV_An_webp/17. Đen đá bg.png",
            "/images/full/catdrink/Drink_GV_An_webp/17. Đen đá.png",
        ],
        `60ml Cafe hạt Robusta pha phin
  20ml Siro đường nâu
  Đá viên vừa đủ`,
        ["SP000378", "SP000555"]
    ),

    new Drink(
        "118",
        ["1"],
        "Matcha Ice blended",
        "/images/thumbnails/catdrink/Drink_GV_An_webp/18. Matcha Ice blended.webp",
        [
            "/images/full/catdrink/Drink_GV_An_webp/18. Matcha Ice blended bg.png",
            "/images/full/catdrink/Drink_GV_An_webp/18. Matcha Ice blended.png",
        ],
        `80ml Sữa tươi Western
  30g Bột matcha trà xanh Bạch Dương
  20g Bột Frapper Ciel
  Đá xay nhuyễn mịn`,
        ["SP000536", "SP000506", "SP000412"]
    ),

    new Drink(
        "119",
        ["1"],
        "Oreo Ice Blended",
        "/images/thumbnails/catdrink/Drink_GV_An_webp/19. Oreo Ice Blended.webp",
        [
            "/images/full/catdrink/Drink_GV_An_webp/19. Oreo Ice Blended bg.png",
            "/images/full/catdrink/Drink_GV_An_webp/19. Oreo Ice Blended.png",
        ],
        `100ml Sữa tươi Happy Barn
  20g Bột Fraper Luave
  2 bánh Oreo nghiền
  30ml Kem béo thực vật Ice Hot
  Đá xay nhuyễn`,
        ["SP000054", "SP000035", "SP000450"]
    ),

    new Drink(
        "120",
        ["1"],
        "Caramel Ice Blended",
        "/images/thumbnails/catdrink/Drink_GV_An_webp/20. Caramel Ice Blended.webp",
        [
            "/images/full/catdrink/Drink_GV_An_webp/20. Caramel Ice Blended bg.png",
            "/images/full/catdrink/Drink_GV_An_webp/20. Caramel Ice Blended.png",
        ],
        `100ml Sữa tươi Happy Barn
  20g Bột Frapper Ciel
  20ml Sốt Caramel ICE HOT
  Đá xay nhuyễn mịn, thêm kem béo nếu thích`,
        ["SP000054", "SP000412", "SP000415"]
    ),

    new Drink(
        "121",
        ["1"],
        "Sữa đá",
        "/images/thumbnails/catdrink/Drink_GV_An_webp/21. Sữa đá.webp",
        [
            "/images/full/catdrink/Drink_GV_An_webp/21. Sữa đá bg.png",
            "/images/full/catdrink/Drink_GV_An_webp/21. Sữa đá.png",
        ],
        `60ml Cafe phin Robusta
  40ml Sữa đặc Ngôi Sao Phương Nam
  Đá viên vừa đủ`,
        ["SP000378", "3517673314909"]
    ),

    new Drink(
        "122",
        ["1"],
        "Bạc xỉu",
        "/images/thumbnails/catdrink/Drink_GV_An_webp/22. Bạc xỉu.webp",
        [
            "/images/full/catdrink/Drink_GV_An_webp/22. Bạc xỉu bg.png",
            "/images/full/catdrink/Drink_GV_An_webp/22. Bạc xỉu.png",
        ],
        `40ml Cafe phin Robusta
  60ml Sữa đặc Ngôi Sao Phương Nam
  40ml Sữa tươi Happy Barn
  Đá viên vừa đủ`,
        ["SP000378", "3517673314909", "SP000054"]
    ),

    new Drink(
        "123",
        ["1"],
        "Cà phê muối",
        "/images/thumbnails/catdrink/Drink_GV_An_webp/23. Cà phê muối.webp",
        [
            "/images/full/catdrink/Drink_GV_An_webp/23. Cà phê muối bg.png",
            "/images/full/catdrink/Drink_GV_An_webp/23. Cà phê muối.png",
        ],
        `50ml Cafe phin Robusta
  30ml Kem béo thực vật Ice Hot
  2g Muối hồng
  Đá viên vừa đủ`,
        ["SP000378", "SP000450", "SP000423"]
    ),

    new Drink(
        "124",
        ["1"],
        "Americano đá",
        "/images/thumbnails/catdrink/Drink_GV_An_webp/24. Americano đá.webp",
        [
            "/images/full/catdrink/Drink_GV_An_webp/24. Americano đá bg.png",
            "/images/full/catdrink/Drink_GV_An_webp/24. Americano đá.png",
        ],
        `60ml Cafe hạt Arabica pha espresso
  90ml Nước lọc
  Đá viên vừa đủ`,
        ["SP000562"]
    ),

    new Drink(
        "125",
        ["1"],
        "Matcha coco ice blended",
        "/images/thumbnails/catdrink/Drink_GV_An_webp/25. Matcha coco ice blended.webp",
        [
            "/images/full/catdrink/Drink_GV_An_webp/25. Matcha coco ice blended bg.png",
            "/images/full/catdrink/Drink_GV_An_webp/25. Matcha coco ice blended.png",
        ],
        `80ml Sữa tươi Happy Barn
  30g Bột matcha trà xanh Bạch Dương
  20ml Sữa dừa Amo Pastel
  20g Bột Frapper Ciel
  Đá xay nhuyễn`,
        ["SP000054", "SP000506", "SP000326", "SP000412"]
    ),

    new Drink(
        "126",
        ["1"],
        "Matcha taro ice blended",
        "/images/thumbnails/catdrink/Drink_GV_An_webp/26. Matcha taro ice blended.webp",
        [
            "/images/full/catdrink/Drink_GV_An_webp/26. Matcha taro ice blended bg.png",
            "/images/full/catdrink/Drink_GV_An_webp/26. Matcha taro ice blended.png",
        ],
        `80ml Sữa tươi Western
  20g Bột khoai môn Binbaoli
  20g Bột matcha trà xanh Bạch Dương
  20g Bột Frapper Ciel
  Đá xay nhuyễn`,
        ["SP000536", "SP000237", "SP000506", "SP000412"]
    ),

    new Drink(
        "127",
        ["1"],
        "Cà phê cốt dừa",
        "/images/thumbnails/catdrink/Drink_GV_An_webp/27. Cà phê cốt dừa.webp",
        [
            "/images/full/catdrink/Drink_GV_An_webp/27. Cà phê cốt dừa bg.png",
            "/images/full/catdrink/Drink_GV_An_webp/27. Cà phê cốt dừa.png",
        ],
        `50ml Cafe phin Robusta
  40ml Sữa đặc Ngôi Sao Phương Nam
  30ml Sữa dừa Amo Pastel
  Đá viên vừa đủ`,
        ["SP000378", "3517673314909", "SP000326"]
    ),

    new Drink(
        "128",
        ["1"],
        "Latte nóng",
        "/images/thumbnails/catdrink/Drink_GV_An_webp/28. Latte nóng.webp",
        [
            "/images/full/catdrink/Drink_GV_An_webp/28. Latte nóng bg.png",
            "/images/full/catdrink/Drink_GV_An_webp/28. Latte nóng.png",
        ],
        `40ml Espresso Arabica
  150ml Sữa tươi Happy Barn đun nóng
  Đánh bọt sữa và rót nhẹ lên trên`,
        ["SP000562", "SP000054"]
    ),

    new Drink(
        "129",
        ["1"],
        "Latte nóng (2)",
        "/images/thumbnails/catdrink/Drink_GV_An_webp/29. Latte nóng.webp",
        [
            "/images/full/catdrink/Drink_GV_An_webp/29. Latte nóng bg.png",
            "/images/full/catdrink/Drink_GV_An_webp/29. Latte nóng.png",
        ],
        `Giống Latte nóng (1) nhưng có thêm 10ml Siro Vanila Teissiere
  Cho hương thơm nhẹ nhàng hơn`,
        ["SP000562", "SP000054", "SP000347"]
    ),

    new Drink(
        "130",
        ["1"],
        "Cappuccino nóng",
        "/images/thumbnails/catdrink/Drink_GV_An_webp/30. Cappuccino nóng.webp",
        [
            "/images/full/catdrink/Drink_GV_An_webp/30. Cappuccino nóng bg.png",
            "/images/full/catdrink/Drink_GV_An_webp/30. Cappuccino nóng.png",
        ],
        `40ml Espresso Arabica
  100ml Sữa tươi đánh bọt
  Rắc thêm bột cacao Rich lên mặt`,
        ["SP000562", "SP000054", "SP000082"]
    ),

    new Drink(
        "131",
        ["1"],
        "Americano đào",
        "/images/thumbnails/catdrink/Drink_GV_An_webp/31. Americano đào.webp",
        [
            "/images/full/catdrink/Drink_GV_An_webp/31. Americano đào bg.png",
            "/images/full/catdrink/Drink_GV_An_webp/31. Americano đào.png",
        ],
        `60ml Cafe hạt Arabica
  30ml Mứt đào Tainong
  30ml Nước lọc
  Đá viên vừa đủ`,
        ["SP000562", "SP000108"]
    ),

    new Drink(
        "132",
        ["1"],
        "Bơ già dừa non",
        "/images/thumbnails/catdrink/Drink_GV_An_webp/32. Bơ già dừa non.webp",
        [
            "/images/full/catdrink/Drink_GV_An_webp/32. Bơ già dừa non bg.png",
            "/images/full/catdrink/Drink_GV_An_webp/32. Bơ già dừa non.png",
        ],
        `100ml Sữa tươi Western
  30ml Siro đường nâu
  20ml Sữa dừa Amo Pastel
  20g Thạch dừa non topping`,
        ["SP000536", "SP000555", "SP000326"]
    ),

    new Drink(
        "133",
        ["1"],
        "Cà phê sữa",
        "/images/thumbnails/catdrink/Drink_GV_An_webp/33. Cà phê sữa.webp",
        [
            "/images/full/catdrink/Drink_GV_An_webp/33. Cà phê sữa bg.png",
            "/images/full/catdrink/Drink_GV_An_webp/33. Cà phê sữa.png",
        ],
        `50ml Cafe phin Robusta
  40ml Sữa đặc Ngôi Sao Phương Nam
  Đá viên vừa đủ`,
        ["SP000378", "3517673314909"]
    ),

    new Drink(
        "134",
        ["1"],
        "Coldbrew cam",
        "/images/thumbnails/catdrink/Drink_GV_An_webp/34. Coldbrew cam.webp",
        [
            "/images/full/catdrink/Drink_GV_An_webp/34. Coldbrew cam bg.png",
            "/images/full/catdrink/Drink_GV_An_webp/34. Coldbrew cam.png",
        ],
        `100ml Coldbrew Arabica
  30ml Nước cam tươi
  20ml Siro đường nâu
  Đá viên vừa đủ`,
        ["SP000562", "SP000555"]
    ),

    new Drink(
        "135",
        ["1"],
        "Coldbrew Kombucha ổi",
        "/images/thumbnails/catdrink/Drink_GV_An_webp/35. Coldbrew Kombucha ổi.webp",
        [
            "/images/full/catdrink/Drink_GV_An_webp/35. Coldbrew Kombucha ổi bg.png",
            "/images/full/catdrink/Drink_GV_An_webp/35. Coldbrew Kombucha ổi.png",
        ],
        `80ml Coldbrew Arabica
  60ml Kombucha ổi hồng
  20ml Siro đường nâu
  Đá viên vừa đủ`,
        ["SP000562", "SP000440", "SP000555"]
    ),

    new Drink(
        "136",
        ["1"],
        "Đào xoài macchiato",
        "/images/thumbnails/catdrink/Drink_GV_An_webp/36. Đào xoài macchiato.webp",
        [
            "/images/full/catdrink/Drink_GV_An_webp/36. Đào xoài macchiato bg.png",
            "/images/full/catdrink/Drink_GV_An_webp/36. Đào xoài macchiato.png",
        ],
        `100ml Trà Oolong Mộc Lam
  20g Mứt đào Mao Mao
  20g Mứt xoài Mao Mao
  30ml Kem béo thực vật Ice Hot`,
        ["SP000230", "SP00240", "SP00241", "SP000450"]
    ),

    new Drink(
        "137",
        ["1"],
        "Kombucha chanh dâu",
        "/images/thumbnails/catdrink/Drink_GV_An_webp/37. Kombucha chanh dâu.webp",
        [
            "/images/full/catdrink/Drink_GV_An_webp/37. Kombucha chanh dâu bg.png",
            "/images/full/catdrink/Drink_GV_An_webp/37. Kombucha chanh dâu.png",
        ],
        `100ml Kombucha
  30g Mứt dâu Lermao
  10g Chanh thơm
  30ml Trà lục hoa nhài
  50g Dâu tươi
  30g Đường`,
        ["SP000552", "SP000012", "SP000549"]
    ),

    new Drink(
        "138",
        ["1"],
        "Kombucha chanh vàng",
        "/images/thumbnails/catdrink/Drink_GV_An_webp/38. Kombucha chanh vàng.webp",
        [
            "/images/full/catdrink/Drink_GV_An_webp/38. Kombucha chanh vàng bg.png",
            "/images/full/catdrink/Drink_GV_An_webp/38. Kombucha chanh vàng.png",
        ],
        `100ml Kombucha
  30g Mứt chanh Kum quất
  20ml Siro đường nâu
  Đá viên vừa đủ`,
        ["SP000549", "SP000539", "SP000555"]
    ),

    new Drink(
        "139",
        ["1"],
        "Kombucha táo đào",
        "/images/thumbnails/catdrink/Drink_GV_An_webp/39. Kombucha táo đào.webp",
        [
            "/images/full/catdrink/Drink_GV_An_webp/39. Kombucha táo đào bg.png",
            "/images/full/catdrink/Drink_GV_An_webp/39. Kombucha táo đào.png",
        ],
        `100ml Kombucha
  30g Mứt đào Mao Mao
  30g Mứt táo (hoặc mứt lê)
  20ml Siro đường nâu`,
        ["SP000549", "SP00240", "SP000537", "SP000555"]
    ),

    new Drink(
        "140",
        ["1"],
        "Kombucha xoài chanh leo",
        "/images/thumbnails/catdrink/Drink_GV_An_webp/40. Kombucha xoài chanh leo.webp",
        [
            "/images/full/catdrink/Drink_GV_An_webp/40. Kombucha xoài chanh leo bg.png",
            "/images/full/catdrink/Drink_GV_An_webp/40. Kombucha xoài chanh leo.png",
        ],
        `100ml Kombucha
  30g Mứt xoài Mao Mao
  20g Mứt chanh Kum quất
  Đá viên vừa đủ`,
        ["SP000549", "SP00241", "SP000539"]
    ),

    new Drink(
        "141",
        ["1"],
        "Matcha Creamy (2)",
        "/images/thumbnails/catdrink/Drink_GV_An_webp/41. Matcha Creamy (2).webp",
        [
            "/images/full/catdrink/Drink_GV_An_webp/41. Matcha Creamy (2) bg.png",
            "/images/full/catdrink/Drink_GV_An_webp/41. Matcha Creamy (2).png",
        ],
        `80ml Matcha trà xanh Bạch Dương
  20g Bột kem phô mai Eurodeli
  20ml Siro đường nâu
  Kem béo phủ mặt`,
        ["SP000506", "SP000064", "SP000555"]
    ),

    new Drink(
        "142",
        ["1"],
        "Matcha đậu đỏ",
        "/images/thumbnails/catdrink/Drink_GV_An_webp/42. Matcha đậu đỏ.webp",
        [
            "/images/full/catdrink/Drink_GV_An_webp/42. Matcha đậu đỏ bg.png",
            "/images/full/catdrink/Drink_GV_An_webp/42. Matcha đậu đỏ.png",
        ],
        `100ml Matcha trà xanh Bạch Dương
  30g Đậu đỏ ngâm Mao Mao
  40ml Sữa tươi Happy Barn
  20ml Siro đường nâu`,
        ["SP000506", "SP000393", "SP000054", "SP000555"]
    ),

    new Drink(
        "143",
        ["1"],
        "Trà đào cam sả",
        "/images/thumbnails/catdrink/Drink_GV_An_webp/43. Trà đào cam sả.webp",
        [
            "/images/full/catdrink/Drink_GV_An_webp/43. Trà đào cam sả bg.png",
            "/images/full/catdrink/Drink_GV_An_webp/43. Trà đào cam sả.png",
        ],
        `120ml Lục trà nhài
  30g Mứt đào Mao Mao
  20ml Nước cam
  2 lát sả dập nhẹ`,
        ["SP000012", "SP00240"]
    ),

    new Drink(
        "144",
        ["1"],
        "Trà sen vàng",
        "/images/thumbnails/catdrink/Drink_GV_An_webp/44. Trà sen vàng.webp",
        [
            "/images/full/catdrink/Drink_GV_An_webp/44. Trà sen vàng bg.png",
            "/images/full/catdrink/Drink_GV_An_webp/44. Trà sen vàng.png",
        ],
        `120ml Trà Oolong Mộc Lam
  30g Mứt sen
  20ml Siro đường nâu
  Hạt sen topping`,
        ["SP000230", "SP000090", "SP000555"]
    ),

    new Drink(
        "145",
        ["1"],
        "Trà sữa bơ",
        "/images/thumbnails/catdrink/Drink_GV_An_webp/45. Trà sữa bơ.webp",
        [
            "/images/full/catdrink/Drink_GV_An_webp/45. Trà sữa bơ bg.png",
            "/images/full/catdrink/Drink_GV_An_webp/45. Trà sữa bơ.png",
        ],
        `100ml Hồng trà Mộc Lam
  30ml Siro đường nâu
  40ml Sữa tươi Happy Barn
  20g Bột sữa Bắp Day to Day
  Đá viên vừa đủ`,
        ["SP000231", "SP000555", "SP000054", "SP000413"]
    ),

    new Drink(
        "146",
        ["1"],
        "Trà sữa chôm chôm",
        "/images/thumbnails/catdrink/Drink_GV_An_webp/46. Trà sữa chôm chôm.webp",
        [
            "/images/full/catdrink/Drink_GV_An_webp/46. Trà sữa chôm chôm bg.png",
            "/images/full/catdrink/Drink_GV_An_webp/46. Trà sữa chôm chôm.png",
        ],
        `100ml Hồng trà Mộc Lam
  40ml Sữa tươi Happy Barn
  20ml Siro đường nâu
  30g Chôm chôm ngâm AA topping`,
        ["SP000231", "SP000054", "SP000555", "8858878300010"]
    ),

    new Drink(
        "147",
        ["1"],
        "Trà sữa dâu",
        "/images/thumbnails/catdrink/Drink_GV_An_webp/47. Trà sữa dâu.webp",
        [
            "/images/full/catdrink/Drink_GV_An_webp/47. Trà sữa dâu bg.png",
            "/images/full/catdrink/Drink_GV_An_webp/47. Trà sữa dâu.png",
        ],
        `100ml Hồng trà Mộc Lam
  30g Mứt dâu Mao Mao
  40ml Sữa tươi Happy Barn
  20ml Siro đường nâu`,
        ["SP000231", "SP00239", "SP000054", "SP000555"]
    ),

    new Drink(
        "148",
        ["1"],
        "Trà sữa kem trứng nướng",
        "/images/thumbnails/catdrink/Drink_GV_An_webp/48. Trà sữa kem trứng nướng.webp",
        [
            "/images/full/catdrink/Drink_GV_An_webp/48. Trà sữa kem trứng nướng bg.png",
            "/images/full/catdrink/Drink_GV_An_webp/48. Trà sữa kem trứng nướng.png",
        ],
        `100ml Hồng trà Mộc Lam
  30ml Sữa tươi Happy Barn
  20g Bột kem trứng
  20ml Siro đường nâu
  Đánh lớp kem trứng phủ mặt, rắc bột cacao nhẹ`,
        ["SP000231", "SP000054", "SP000125", "SP000555", "SP000082"]
    ),

    new Drink(
        "149",
        ["1"],
        "Trà sữa trân châu đen",
        "/images/thumbnails/catdrink/Drink_GV_An_webp/49. Trà sữa trân châu đen.webp",
        [
            "/images/full/catdrink/Drink_GV_An_webp/49. Trà sữa trân châu đen bg.png",
            "/images/full/catdrink/Drink_GV_An_webp/49. Trà sữa trân châu đen.png",
        ],
        `100ml Hồng trà Mộc Lam
  40ml Sữa tươi Happy Barn
  20ml Siro đường nâu
  50g Trân châu đen 3A Wonderfull`,
        ["SP000231", "SP000054", "SP000555", "SP000251"]
    ),

    new Drink(
        "150",
        ["1"],
        "Trà vải",
        "/images/thumbnails/catdrink/Drink_GV_An_webp/50. Trà vải.webp",
        [
            "/images/full/catdrink/Drink_GV_An_webp/50. Trà vải bg.png",
            "/images/full/catdrink/Drink_GV_An_webp/50. Trà vải.png",
        ],
        `120ml Lục trà nhài
  30g Mứt vải Hoa hồng ColoMix
  20ml Siro Lựu Mao Mao
  30g Vải ngâm Pogi topping`,
        ["SP000012", "SP000572", "SP000229", "SP000532"]
    ),

        new Drink(
            "ca_phe_may_01",
            ["ca_phe_may"],
            "CAPPUCCINO NÓNG 350ml",
            "/images/thumbnails/catdrink/Drink_GV_An_webp/30. Cappuccino nóng.webp",
            [
                "/images/full/catdrink/Drink_GV_An_webp/30. Cappuccino nóng bg.png",
                "/images/full/catdrink/Drink_GV_An_webp/30. Cappuccino nóng.png",
            ],
            `# Nguyên liệu
             18gr Cà phê hạt
             200ml Sữa tươi

             # Cách pha chế
             Chiết xuất tay đôi (18gr) được 45ml cốt café vào ly
             Cho 200ml sữa tươi lạnh vào ca inox
             Dùng cần đánh đầy bọt mịn
             Xúc bọt ngập bề mặt ly rồi đổ sữa nóng vừa đánh đến đầy ly
             Có thể rắc bột cacao lên trên
             Thêm đường que và sữa đặc ở ngoài. Dùng kèm 1-2 bánh quy`,
            ["SP000562","SP000536"]
        ),
        new Drink(
            "ca_phe_may_02",
            ["ca_phe_may"],
            "CAPPUCCINO ĐÁ 500ml",
            "/images/thumbnails/catdrink/Drink_GV_An_webp/22. Bạc xỉu.webp",
            [
                "/images/full/catdrink/Drink_GV_An_webp/22. Bạc xỉu bg.png",
                "/images/full/catdrink/Drink_GV_An_webp/22. Bạc xỉu.png",
            ],
            `# Nguyên liệu
             18gr Cà phê hạt
             150ml Sữa tươi
             15ml Đường/Sữa đặc

             # Cách pha chế
             Cho 150ml sữa vào ca inox đánh tạo bọt trước
             Cho đá vào đầy cốc, rót 100ml sữa tươi lạnh lên trên
             Thêm 15ml đường hoặc sữa đặc nếu khách muốn,khuấy đều
             Hớt bọt đã đánh lên trên đến gần đầy ly
             Chiết xuất tay đơn (18gr) được 45ml cốt café rót lên trên`,
            ["SP000562","SP000536"]
        ),
        new Drink(
                    "ca_phe_may_03",
                    ["ca_phe_may"],
                    "AMERICANO NÓNG 350ml",
                    "/images/Drink/no_data.png",
                    [
                        "/images/Drink/no_data.png",
                        "/images/Drink/no_data.png",
                    ],
                    `# Nguyên liệu
                     18gr Cà phê hạt
                     180ml Nước nóng
                     1-2 Bánh quy

                     # Cách pha chế
                     Đong 180ml nước nóng vào ly
                     Chiết xuất tay đôi (18gr) được 45ml cốt café rót lên trên
                     Dùng kèm 1-2 bánh quy`,
                    ["SP000562"]
                ),
        new Drink(
                    "ca_phe_may_04",
                    ["ca_phe_may"],
                    "AMERICANO ĐÁ 500ml",
            "/images/thumbnails/catdrink/Drink_GV_An_webp/24. Americano đá.webp",
            [
                "/images/full/catdrink/Drink_GV_An_webp/24. Americano đá bg.png",
                "/images/full/catdrink/Drink_GV_An_webp/24. Americano đá.png",
            ],
                    `# Nguyên liệu
                     18gr Cà phê hạt
                     180ml Nước lọc

                     # Cách pha chế
                     Đong 180ml nước lọc vào ly và thêm đá
                     Chiết xuất tay đôi (18gr) được 45ml cốt café rót lên trên`,
                    ["SP000562"]
                ),
        new Drink(
                    "ca_phe_may_05",
                    ["ca_phe_may"],
                    "LATTE NÓNG 350ml",
            "/images/thumbnails/catdrink/Drink_GV_An_webp/28. Latte nóng.webp",
            [
                "/images/full/catdrink/Drink_GV_An_webp/28. Latte nóng bg.png",
                "/images/full/catdrink/Drink_GV_An_webp/28. Latte nóng.png",
            ],
                    `# Nguyên liệu
                     10gr Cà phê hạt
                     240ml Sữa tươi
                     1-2 Bánh quy

                     # Cách pha chế
                     Chiết xuất tay đơn (10gr) được 25ml cốt café vào ly
                     Cho 240ml sữa tươi lạnh vào ca inox. Dùng cần đánh bọt mỏng mịn
                     Đổ tạo hình lên bề mặt ly
                     Thêm đường que và sữa đặc ở ngoài
                     Dùng kèm 1-2 bánh quy`,
                    ["SP000562"]
                ),
        new Drink(
                    "ca_phe_may_06",
                    ["ca_phe_may"],
                    "LATTE ĐÁ 500ml",
            "/images/thumbnails/catdrink/Drink_GV_An_webp/22. Bạc xỉu.webp",
            [
                "/images/full/catdrink/Drink_GV_An_webp/22. Bạc xỉu bg.png",
                "/images/full/catdrink/Drink_GV_An_webp/22. Bạc xỉu.png",
            ],
                    `# Nguyên liệu
                     18gr Cà phê hạt
                     150ml Sữa tươi
                     15ml Đường/Sữa đặc

                     # Cách pha chế
                     Đong 150ml sữa tươi vào ly
                     Thêm 15ml đường hoặc sữa đặc nếu khách muốn,khuấy đều
                     Cho đá đến gần đầy ly
                     Chiết xuất tay đơn (10gr) được 25ml cốt café rót lên trên`,
                    ["SP000562","SP000536","3517673314909"]
                ),
        new Drink(
                    "ca_phe_may_07",
                    ["ca_phe_may"],
                    "ĐEN ĐÁ 500ml",
            "/images/thumbnails/catdrink/Drink_GV_An_webp/17. Đen đá.webp",
            [
                "/images/full/catdrink/Drink_GV_An_webp/17. Đen đá bg.png",
                "/images/full/catdrink/Drink_GV_An_webp/17. Đen đá.png",
            ],
                    `# Nguyên liệu
                     18gr Cà phê hạt
                     10ml Đường

                     # Cách pha chế
                     Chiết xuất tay đôi thu được ~45ml cốt cà phê
                     Thêm đường vào cf dùng máy đánh tạo bọt
                     Cho đá đến gần đầy ly`,
                    ["SP000562"]
                ),
        new Drink(
                    "ca_phe_may_08",
                    ["ca_phe_may"],
                    "CÀ PHÊ SỮA ĐÁ 500ml",
            "/images/thumbnails/catdrink/Drink_GV_An_webp/21. Sữa đá.webp",
            [
                "/images/full/catdrink/Drink_GV_An_webp/21. Sữa đá bg.png",
                "/images/full/catdrink/Drink_GV_An_webp/21. Sữa đá.png",
            ],
                    `# Nguyên liệu
                     18gr Cà phê hạt
                     20ml Sữa đặc

                     # Cách pha chế
                     Chiết xuất tay đôi thu được ~45ml cốt cà phê
                     Thêm sữa đặc vào cf dùng máy đánh tạo bọt
                     Cho đá đến gần đầy ly`,
                    ["SP000562"]
                ),

        new Drink(
                    "ca_phe_may_09",
                    ["ca_phe_may"],
                    "OSMANTHUS COFFEE FUSION 500ml",
            "/images/Katy_Thao_25102025/Katy_Thao_25102025/hinh_anh_xu_ly/1. OSMANTHUS COFFEE FUSION 500ml.webp",
            [
                "/images/Katy_Thao_25102025/Katy_Thao_25102025/hinh_anh_xu_ly/1. OSMANTHUS COFFEE FUSION 500ml bg.png",
                "/images/Katy_Thao_25102025/Katy_Thao_25102025/hinh_anh_xu_ly/1. OSMANTHUS COFFEE FUSION 500ml.png",
            ],
                    `# Nguyên liệu
                    20gr Mứt quế hoa
                    100ml Sữa tươi
                    5ml Vani
                    10gr Cà phê hạt

                     # Cách pha chế
                     Cho Mứt quế hoa vào đáy ly
                     Sau đó cho lần lượt đá , Sữa tươi , Vani vào ly
                     Chiết xuất tay đơn (10gr) thu được ~25ml cốt cà phê
                     Cốt cà phê đánh bông đổ lên trên`,
                    ["SP000562","SP000536","SP000347","SP000538"]
                ),
        new Drink(
                    "ca_phe_may_10",
                    ["ca_phe_may"],
                    "UBE LATTE 500ml",
            "/images/Katy_Thao_25102025/Katy_Thao_25102025/hinh_anh_xu_ly/2. UBE LATTE 500ml.webp",
            [
                "/images/Katy_Thao_25102025/Katy_Thao_25102025/hinh_anh_xu_ly/2. UBE LATTE 500ml bg.png",
                "/images/Katy_Thao_25102025/Katy_Thao_25102025/hinh_anh_xu_ly/2. UBE LATTE 500ml.png",
            ],
                    `# Nguyên liệu
                    20ml Nước nóng
                    20gr Bột khoai môn
                    150ml Sữa tươi
                    5ml Vani
                    10gr Cà phê hạt

                     # Cách pha chế
                     Cho Nước nóng, Bột khoai môn vào ly khuấy đều , cho đá gần đầy ly
                     Sau đó cho lần lượt Sữa tươi , Vani vào ly
                     Chiết xuất tay đơn (10gr) thu được ~25ml cốt cà phê
                     Dùng ca riêng đánh bông cà phê rót lên sau cùng
                     Cho đá đến gần đầy ly`,
                    ["SP000562","SP000536","SP000237","SP000347"]
                ),
        new Drink(
                    "ca_phe_may_11",
                    ["ca_phe_may"],
                    "OAT COFFEE 500ml",
        "/images/thumbnails/catdrink/Drink_GV_An_webp/22. Bạc xỉu.webp",
        [
            "/images/full/catdrink/Drink_GV_An_webp/22. Bạc xỉu bg.png",
            "/images/full/catdrink/Drink_GV_An_webp/22. Bạc xỉu.png",
        ],
                    `# Nguyên liệu
                    18gr Cà phê hạt
                    110ml Sữa hạt Oatside
                    15ml Đường
                    20ml Rich sữa

                     # Cách pha chế
                     Chiết xuất tay đơn thu được ~25ml cốt cà phê
                     Cho Sữa hạt Oatside, Đường, Rich sữa vào cốc dùng máy tạo bọt đánh đều
                     Cho đá gần đầy ly
                     Cà phê đánh bông rót lên trên cùng`,
                    ["SP000562","SP000450","SP000536"]
                ),
        new Drink(
                    "ca_phe_phin_01",
                    ["ca_phe_phin"],
                    "ĐEN ĐÁ (500ml)",
        "/images/thumbnails/catdrink/Drink_GV_An_webp/17. Đen đá.webp",
        [
            "/images/full/catdrink/Drink_GV_An_webp/17. Đen đá bg.png",
            "/images/full/catdrink/Drink_GV_An_webp/17. Đen đá.png",
        ],
                    `# Nguyên liệu
                    50ml Cốt cà phê
                    10ml Đường

                     # Cách pha chế
                     Đong 50ml Cafe pha sẵn cho vào cốc
                     Dùng máy tạo bọt 50%
                     Thêm 10ml đường nước vào cốc ( hỏi ý kiến khách )
                     Thêm đá đến 2/3 cốc`,
                    ["8938507329022"]
                ),
        new Drink(
                    "ca_phe_phin_02",
                    ["ca_phe_phin"],
                    "SỮA ĐÁ (500ml)",
        "/images/thumbnails/catdrink/Drink_GV_An_webp/21. Sữa đá.webp",
        [
            "/images/full/catdrink/Drink_GV_An_webp/21. Sữa đá bg.png",
            "/images/full/catdrink/Drink_GV_An_webp/21. Sữa đá.png",
        ],
                    `# Nguyên liệu
                    50ml Cốt cà phê
                    30ml Sữa đặc

                     # Cách pha chế
                     Đong 50ml Cafe pha sẵn cho vào cốc
                     Dùng máy tạo bọt 50%
                     Thêm 30ml sữa đặc rót gọn vào cốc
                     Thêm đá đến 2/3 cốc`,
                    ["8938507329022","3517673314909"]
                ),
        new Drink(
                    "ca_phe_phin_03",
                    ["ca_phe_phin"],
                    "BẠC XỈU (500ml)",
        "/images/thumbnails/catdrink/Drink_GV_An_webp/22. Bạc xỉu.webp",
        [
            "/images/full/catdrink/Drink_GV_An_webp/22. Bạc xỉu bg.png",
            "/images/full/catdrink/Drink_GV_An_webp/22. Bạc xỉu.png",
        ],
                    `# Nguyên liệu
                    35ml Cốt cà phê
                    30ml Sữa đặc
                    50ml Sữa tươi
                    5ml Vani

                     # Cách pha chế
                     Đong 30ml sữa đặc + 50ml sữa tươi + 5ml siro vani cho vào cốc
                     Thêm đá 2/3 cốc
                     Đong 35ml cốt Cafe pha sẵn cho vào 1 cốc khác dùng máy tạo bọt 100% đổ lên trên hỗn hợp
                     (Dùng nóng thì thêm 120ml nước sôi thay vì cho đá vào)`,
                    ["8938507329022","3517673314909","SP000347","SP000536"]
                ),
        new Drink(
                    "ca_phe_phin_04",
                    ["ca_phe_phin"],
                    "CÀ PHÊ MUỐI (500ml)",
        "/images/thumbnails/catdrink/Drink_GV_An_webp/23. Cà phê muối.webp",
        [
            "/images/full/catdrink/Drink_GV_An_webp/23. Cà phê muối bg.png",
            "/images/full/catdrink/Drink_GV_An_webp/23. Cà phê muối.png",
        ],
                    `# Nguyên liệu
                    50ml Cốt cà phê
                    20ml Sữa đặc
                    3 thìa Kem muối

                     # Cách pha chế
                     Đong 50ml Cốt cà phê cho vào cốc
                     Thêm 20ml Sữa đặc KHUẤY ĐỀU
                     Thêm đá đến 2/3 cốc
                     Thêm 3 thìa định lượng kem muối lên trên`,
                    ["8938507329022","3517673314909"]
                ),
        new Drink(
                    "ca_phe_phin_05",
                    ["ca_phe_phin"],
                    "CÀ PHÊ CỐT DỪA (500ml)",
        "/images/thumbnails/catdrink/Drink_GV_An_webp/27. Cà phê cốt dừa.webp",
        [
            "/images/full/catdrink/Drink_GV_An_webp/27. Cà phê cốt dừa bg.png",
            "/images/full/catdrink/Drink_GV_An_webp/27. Cà phê cốt dừa.png",
        ],
                    `# Nguyên liệu
                    100ml Cốt dừa
                    70ml Sữa đặc
                    25ml Cốt cà phê

                     # Cách pha chế
                     Đong 100ml cốt dừa + 70ml Sữa đặc cho vào máy xay
                     Thêm 270g đá
                     Xay hỗn hợp 35s , cho ra ly
                     Chiết xuất tay đơn (10gr) thu 25ml cà phê , cho ra ca riêng đánh tạo bọt
                     Đổ lên trên cùng`,
                    ["8938507329022","3517673314909","SP000326"]
                ),
        new Drink(
                    "ca_phe_phin_06",
                    ["ca_phe_phin"],
                    "CÀ PHÊ KEM TRỨNG (500ml)",
        "/images/Katy_Thao_25102025/Katy_Thao_25102025/hinh_anh_xu_ly/3. CÀ PHÊ KEM TRỨNG (500ml).webp",
        [
            "/images/Katy_Thao_25102025/Katy_Thao_25102025/hinh_anh_xu_ly/3. CÀ PHÊ KEM TRỨNG (500ml) bg.png",
            "/images/Katy_Thao_25102025/Katy_Thao_25102025/hinh_anh_xu_ly/3. CÀ PHÊ KEM TRỨNG (500ml).png",
        ],
                    `# Nguyên liệu
                    50ml Cốt cà phê
                    20ml Sữa đặc
                    3 thìa Kem trứng

                     # Cách pha chế
                     Đong 50ml cốt café cho vào cốc
                     Thêm 20ml sữa đặc KHUẤY ĐỀU
                     Thêm đá đến 2/3 cốc
                     Thêm 3 thìa định lượng kem trứng lên trên`,
                    ["8938507329022","3517673314909"]
                ),
        new Drink(
                    "ca_phe_phin_07",
                    ["ca_phe_phin"],
                    "CACAO KEM TRỨNG/KEM MUỐI (500ml)",
        "/images/Katy_Thao_25102025/Katy_Thao_25102025/hinh_anh_xu_ly/4. CACAO KEM TRỨNGKEM MUỐI (500ml).webp",
        [
            "/images/Katy_Thao_25102025/Katy_Thao_25102025/hinh_anh_xu_ly/4. CACAO KEM TRỨNGKEM MUỐI (500ml) bg.png",
            "/images/Katy_Thao_25102025/Katy_Thao_25102025/hinh_anh_xu_ly/4. CACAO KEM TRỨNGKEM MUỐI (500ml).png",
        ],
                    `# Nguyên liệu
                    ~10gr Bột cacao
                    40ml Sữa đặc
                    30ml Sữa tươi

                     # Cách pha chế
                     1 thìa định lượng Bột cacao cho vào bình lắc
                     Thêm 50ml nước sôi dùng máy đánh tan
                     Thêm 30ml Sữa tươi + 40ml Sữa đặc
                     Thêm 300ml đá lắc đều đổ ra cốc
                     Note : Có thể thêm topping kem trứng/kem muối (hớt bọt trước khi cho kem)
                     (Dùng nóng thì thay đá bằng 120ml nước sôi khuấy đều)`,
                    ["SP000536","3517673314909","SP000507"]
                ),
new Drink(
                    "matcha_01",
                    ["matcha"],
                    "MATCHA LATTE (freshmilk/oatmilk/organic milk/cocomilk) (500ml)",
        "/images/thumbnails/catdrink/Drink_GV_An_webp/14. Matcha latte.webp",
        [
            "/images/full/catdrink/Drink_GV_An_webp/14. Matcha latte bg.png",
            "/images/full/catdrink/Drink_GV_An_webp/14. Matcha latte.png",
        ],
                    `# Nguyên liệu
                    100ml Sữa tươi
                    20ml Rich sữa
                    20ml Đường
                    4g Matcha

                     # Cách pha chế
                     Cho Sữa tươi, Rich sữa, Đường vào cốc dùng máy tạo bọt đánh 10s , cho đá gần đầy ly
                     Cho 40ml nước ấm vào ca riêng , thêm Matcha , dùng máy tạo bọt đánh đều
                     Rót lên trên cùng
                     (Lưu ý nước ấm 75-85 độ)`,
                    ["SP000506","SP000450","SP000536"]
                ),
new Drink(
                    "matcha_02",
                    ["matcha"],
                    "MATCHA & FLOWER (500ml) (matcha chanh hoa)",
        "/images/Katy_Thao_25102025/Katy_Thao_25102025/hinh_anh_xu_ly/5. MATCHA & FLOWER (500ml) (matcha chanh hoa).webp",
        [
            "/images/Katy_Thao_25102025/Katy_Thao_25102025/hinh_anh_xu_ly/5. MATCHA & FLOWER (500ml) (matcha chanh hoa) bg.png",
            "/images/Katy_Thao_25102025/Katy_Thao_25102025/hinh_anh_xu_ly/5. MATCHA & FLOWER (500ml) (matcha chanh hoa).png",
        ],
                    `# Nguyên liệu
                    40gr Thạch quế hoa
                    10gr Mứt quế hoa
                    10ml Đường
                    150ml Nước lọc
                    20ml Kumquat
                    3gr Matcha

                     # Cách pha chế
                     Cho Thạch quế hoa ,Mứt quế hoa vào đáy cốc , sau đó thêm khoảng 200gr đá
                     Cho Đường, Nước lọc, Kumquat vào ca riêng khuấy đều rồi đổ vào cốc
                     Cuối cùng đánh cho 40ml nước ấm vào ca riêng , thêm matcha , dùng máy tạo bọt đánh đều
                     Rót lên trên cùng`,
                    ["SP000506","SP000538","SP000539"]
                ),
new Drink(
                    "sinh_to_01",
                    ["sinh_to"],
                    "Sinh tố Bơ",
        "/images/Katy_Thao_25102025/Katy_Thao_25102025/hinh_anh_xu_ly/6. Sinh tố bơ.webp",
        [
            "/images/Katy_Thao_25102025/Katy_Thao_25102025/hinh_anh_xu_ly/6. Sinh tố bơ bg.png",
            "/images/Katy_Thao_25102025/Katy_Thao_25102025/hinh_anh_xu_ly/6. Sinh tố bơ.png",
        ],
                    `# Nguyên liệu
                    100gr Bơ
                    30ml Sữa tươi
                    50ml Sữa đặc
                    40ml Nước lọc
                    100gr Đá

                     # Cách pha chế
                     Cân 100g Bơ cho vào máy xay (có thể cấp đông 100g/túi)
                     Thêm 30ml Sữa tươi + 50ml Sữa đặc
                     Thêm 40ml nước lọc
                     Thêm 100g đá ( 2/3 cốc đá 350ml )
                     Xay hỗn hợp 35s đổ ra cốc `,
                    ["3517673314909","SP000536"]
                ),
new Drink(
                    "sinh_to_02",
                    ["sinh_to"],
                    "Sinh tố Dâu",
        "/images/Katy_Thao_25102025/Katy_Thao_25102025/hinh_anh_xu_ly/7. Sinh tố dâu.webp",
        [
            "/images/Katy_Thao_25102025/Katy_Thao_25102025/hinh_anh_xu_ly/7. Sinh tố dâu bg.png",
            "/images/Katy_Thao_25102025/Katy_Thao_25102025/hinh_anh_xu_ly/7. Sinh tố dâu.png",
        ],
                    `# Nguyên liệu
                    100gr Dâu tươi
                    30ml Sữa tươi
                    50ml Sữa đặc
                    40ml Nước lọc
                    160gr Đá

                     # Cách pha chế
                     Cân dâu và chuối cho vào máy xay (có thể cấp đông 100g/túi)
                     Thêm 30ml Sữa tươi + 50ml Sữa đặc
                     Thêm 40ml nước lọc
                     Thêm 160g đá
                     Xay hỗn hợp 15s đổ ra cốc `,
                    ["3517673314909","SP000536"]
                ),
new Drink(
                    "sinh_to_03",
                    ["sinh_to"],
                    "Sinh tố Dứa (Thơm)",
        "/images/Katy_Thao_25102025/Katy_Thao_25102025/hinh_anh_xu_ly/8. Sinh tố Dứa (Thơm).webp",
        [
            "/images/Katy_Thao_25102025/Katy_Thao_25102025/hinh_anh_xu_ly/8. Sinh tố Dứa (Thơm) bg.png",
            "/images/Katy_Thao_25102025/Katy_Thao_25102025/hinh_anh_xu_ly/8. Sinh tố Dứa (Thơm).png",
        ],
                    `# Nguyên liệu
                    100gr Dứa (Thơm)
                    30ml Sữa tươi
                    50ml Sữa đặc
                    40ml Nước lọc
                    150gr Đá

                     # Cách pha chế
                     Cân Dứa (Thơm) cho vào máy xay (có thể cấp đông 90g/túi)
                     Thêm 30ml Sữa tươi + 50ml Sữa đặc
                     Thêm 40ml nước lọc
                     Thêm 150g đá ( 2/3 cốc đá 350ml )
                     Xay hỗn hợp 35s đổ ra cốc `,
                    ["3517673314909","SP000536"]
                ),
new Drink(
                    "tra_trai_cay_01",
                    ["tra_trai_cay"],
                    "BLUEBERRY TEA (500ml)",
        "/images/Katy_Thao_25102025/Katy_Thao_25102025/hinh_anh_xu_ly/9. BLUEBERRY TEA (500ml).webp",
        [
            "/images/Katy_Thao_25102025/Katy_Thao_25102025/hinh_anh_xu_ly/9. BLUEBERRY TEA (500ml) bg.png",
            "/images/Katy_Thao_25102025/Katy_Thao_25102025/hinh_anh_xu_ly/9. BLUEBERRY TEA (500ml).png",
        ],
                    `# Nguyên liệu
                    100ml Lục trà
                    50ml Nước lọc
                    40gr Mứt việt quất
                    10ml Đường
                    10gr Chanh vàng

                     # Cách pha chế
                     Cho tất cả nguyên liệu vào bình lắc (shaker)
                     Sau đó thêm đá đến vạch 400ml
                     Lắc đều rồi cho ra ly
                     (Trang trí trái cây tươi , topping , lá bạc hà , hạt chia)`,
                    ["SP000012","SP000321"]
                ),
new Drink(
                    "tra_trai_cay_02",
                    ["tra_trai_cay"],
                    "GREEN GRAPE TEA (500ml)",
        "/images/Katy_Thao_25102025/Katy_Thao_25102025/hinh_anh_xu_ly/10. GREEN GRAPE TEA (500ml).webp",
        [
            "/images/Katy_Thao_25102025/Katy_Thao_25102025/hinh_anh_xu_ly/10. GREEN GRAPE TEA (500ml) bg.png",
            "/images/Katy_Thao_25102025/Katy_Thao_25102025/hinh_anh_xu_ly/10. GREEN GRAPE TEA (500ml).png",
        ],
                    `# Nguyên liệu
                    100ml Lục trà
                    50ml Nước lọc
                    30gr Mứt nho
                    10ml Đường
                    10gr Chanh vàng

                     # Cách pha chế
                     Cho tất cả nguyên liệu vào bình lắc (shaker)
                     Sau đó thêm đá đến vạch 400ml
                     Lắc đều rồi cho ra ly
                     (Trang trí trái cây tươi , topping , lá bạc hà , hạt chia)`,
                    ["SP000012"]
                ),
new Drink(
                    "tra_trai_cay_03",
                    ["tra_trai_cay"],
                    "PEACHPOME TEA (500ml)",
        "/images/Katy_Thao_25102025/Katy_Thao_25102025/hinh_anh_xu_ly/11. PEACHPOME TEA (500ml).webp",
        [
            "/images/Katy_Thao_25102025/Katy_Thao_25102025/hinh_anh_xu_ly/11. PEACHPOME TEA (500ml) bg.png",
            "/images/Katy_Thao_25102025/Katy_Thao_25102025/hinh_anh_xu_ly/11. PEACHPOME TEA (500ml).png",
        ],
                    `# Nguyên liệu
                    100ml Lục trà
                    50ml Nước lọc
                    20gr Mứt đào
                    10ml Syrup lựu
                    10ml Đường
                    10gr Chanh vàng

                     # Cách pha chế
                     Cho tất cả nguyên liệu vào bình lắc (shaker)
                     Sau đó thêm đá đến vạch 400ml
                     Lắc đều rồi cho ra ly
                     (Trang trí trái cây tươi , topping , lá bạc hà , hạt chia)`,
                    ["SP000012","SP000108","SP000573"]
                ),
new Drink(
                    "tra_trai_cay_04",
                    ["tra_trai_cay"],
                    "ORANGE TEA (500ml)",
        "/images/Katy_Thao_25102025/Katy_Thao_25102025/hinh_anh_xu_ly/12. ORANGE TEA (500ml).webp",
        [
            "/images/Katy_Thao_25102025/Katy_Thao_25102025/hinh_anh_xu_ly/12. ORANGE TEA (500ml) bg.png",
            "/images/Katy_Thao_25102025/Katy_Thao_25102025/hinh_anh_xu_ly/12. ORANGE TEA (500ml).png",
        ],
                    `# Nguyên liệu
                    100ml Lục trà
                    100ml Cốt cam
                    10ml Đường

                     # Cách pha chế
                     Cho tất cả nguyên liệu vào bình lắc (shaker)
                     Sau đó thêm đá đến vạch 400ml
                     Lắc đều rồi cho ra ly
                     (Trang trí trái cây tươi , topping , lá bạc hà , hạt chia)`,
                    ["SP000012"]
                ),
new Drink(
                    "tra_trai_cay_05",
                    ["tra_trai_cay"],
                    "PEAR TEA (500ml)",
        "/images/Katy_Thao_25102025/Katy_Thao_25102025/hinh_anh_xu_ly/13. PEAR TEA (500ml).webp",
        [
            "/images/Katy_Thao_25102025/Katy_Thao_25102025/hinh_anh_xu_ly/13. PEAR TEA (500ml) bg.png",
            "/images/Katy_Thao_25102025/Katy_Thao_25102025/hinh_anh_xu_ly/13. PEAR TEA (500ml).png",
        ],
                    `# Nguyên liệu
                    100ml Lục trà
                    50ml Nước lọc
                    35gr Mứt lê
                    10gr Chanh vàng

                     # Cách pha chế
                     Cho tất cả nguyên liệu vào bình lắc (shaker)
                     Sau đó thêm đá đến vạch 400ml
                     Lắc đều rồi cho ra ly
                     (Trang trí trái cây tươi , topping , lá bạc hà , hạt chia)`,
                    ["SP000012","SP000537"]
                ),
new Drink(
                    "sparkling_01",
                    ["sparkling"],
                    "LEMONADE SPARKLING (500ml)",
        "/images/Katy_Thao_25102025/Katy_Thao_25102025/hinh_anh_xu_ly/14. LEMONADE SPARKLING (500ml).webp",
        [
            "/images/Katy_Thao_25102025/Katy_Thao_25102025/hinh_anh_xu_ly/14. LEMONADE SPARKLING (500ml) bg.png",
            "/images/Katy_Thao_25102025/Katy_Thao_25102025/hinh_anh_xu_ly/14. LEMONADE SPARKLING (500ml).png",
        ],
                    `# Nguyên liệu
                    20ml Kumquat
                    20ml Đường
                    220gr Đá
                    160ml Soda

                     # Cách pha chế
                     Dằm 1/2 lát chanh vàng đáy ly
                     Cho Kumquat, Đường vào đáy ly , sau đó thêm đá khuấy đều cho lạnh hỗn hợp
                     Rót soda sau cùng
                     (Trang trí hạt chia và lá bạc hà)`,
                    ["SP000539"]
                ),
new Drink(
                    "sparkling_02",
                    ["sparkling"],
                    "ROSE SPARKLING TEA (500ml)",
        "/images/Katy_Thao_25102025/Katy_Thao_25102025/hinh_anh_xu_ly/15. ROSE SPARKLING TEA (500ml).webp",
        [
            "/images/Katy_Thao_25102025/Katy_Thao_25102025/hinh_anh_xu_ly/15. ROSE SPARKLING TEA (500ml) bg.png",
            "/images/Katy_Thao_25102025/Katy_Thao_25102025/hinh_anh_xu_ly/15. ROSE SPARKLING TEA (500ml).png",
        ],
                    `# Nguyên liệu
                    30ml Trà hoa hồng
                    30ml Syrup hoa hồng
                    10ml Syrup lựu
                    5ml Chanh
                    220gr Đá
                    150ml Soda

                     # Cách pha chế
                     Dằm 1/2 lát chanh vàng đáy ly
                     Cho Trà hoa hồng, Syrup hoa hồng, Syrup lựu, Chanh vào đáy ly , sau đó thêm đá khuấy đều cho lạnh hỗn hợp
                     Rót soda sau cùng
                     (Trang trí hạt chia và lá bạc hà)`,
                    ["SP000573"]
                ),
new Drink(
                    "sparkling_03",
                    ["sparkling"],
                    "GRAPEFRUIT SPARKLING (500ml)",
        "/images/Katy_Thao_25102025/Katy_Thao_25102025/hinh_anh_xu_ly/16. GRAPEFRUIT SPARKLING (500ml).webp",
        [
            "/images/Katy_Thao_25102025/Katy_Thao_25102025/hinh_anh_xu_ly/16. GRAPEFRUIT SPARKLING (500ml) bg.png",
            "/images/Katy_Thao_25102025/Katy_Thao_25102025/hinh_anh_xu_ly/16. GRAPEFRUIT SPARKLING (500ml).png",
        ],
                    `# Nguyên liệu
                    10gr Cam vàng
                    40gr Mứt bưởi
                    1 trái Tắc
                    220gr Đá
                    150ml Soda

                     # Cách pha chế
                     Cho Cam vàng vào ly dùng dụng cụ dằm nhẹ
                     Thêm Mứt bưởi, Tắc, Đá vào ly khuấy đều cho lạnh hỗn hợp
                     Rót Soda lên trên cùng
                     (Trang trí hạt chia và lá bạc hà)`,
                    ["SP000571"]
                ),
new Drink(
                    "sparkling_04",
                    ["sparkling"],
                    "GREEN GRAPE SPARKLING (500ml)",
        "/images/Katy_Thao_25102025/Katy_Thao_25102025/hinh_anh_xu_ly/17. GREEN GRAPE SPARKLING (500ml).webp",
        [
            "/images/Katy_Thao_25102025/Katy_Thao_25102025/hinh_anh_xu_ly/17. GREEN GRAPE SPARKLING (500ml) bg.png",
            "/images/Katy_Thao_25102025/Katy_Thao_25102025/hinh_anh_xu_ly/17. GREEN GRAPE SPARKLING (500ml).png",
        ],
                    `# Nguyên liệu
                    20gr Mứt nho
                    10gr Mứt quế hoa
                    220gr Đá
                    2 lát Chanh vàng
                    150ml Soda

                     # Cách pha chế
                     Cho Mứt nho, Mứt quế hoa, Đá, Chanh vàng khuấy đều cho lạnh hỗn hợp
                     Rót Soda lên sau cùng
                     (Trang trí hạt chia và lá bạc hà)`,
                    ["SP000538"]
                ),
new Drink(
                    "sparkling_05",
                    ["sparkling"],
                    "DEEP BLUE SPARKLING (500ml)",
        "/images/Katy_Thao_25102025/Katy_Thao_25102025/hinh_anh_xu_ly/18. DEEP BLUE SPARKLING (500ml).webp",
        [
            "/images/Katy_Thao_25102025/Katy_Thao_25102025/hinh_anh_xu_ly/18. DEEP BLUE SPARKLING (500ml) bg.png",
            "/images/Katy_Thao_25102025/Katy_Thao_25102025/hinh_anh_xu_ly/18. DEEP BLUE SPARKLING (500ml).png",
        ],
                    `# Nguyên liệu
                    10gr Cam vàng
                    30ml Syrup curacao
                    5ml Chanh
                    220gr Đá
                    150ml Soda

                     # Cách pha chế
                     Cho Cam vàng, Syrup curacao, Chanh, Đá khuấy đều cho lạnh hỗn hợp
                     Rót Soda lên sau cùng
                     (Trang trí hạt chia và lá bạc hà)`,
                ),
new Drink(
                    "healthy_drink_01",
                    ["healthy_drink"],
                    "CINNAMON HOT TEA (350ml)",
        "/images/Katy_Thao_25102025/Katy_Thao_25102025/hinh_anh_xu_ly/19. CINNAMON HOT TEA (350ml).webp",
        [
            "/images/Katy_Thao_25102025/Katy_Thao_25102025/hinh_anh_xu_ly/19. CINNAMON HOT TEA (350ml) bg.png",
            "/images/Katy_Thao_25102025/Katy_Thao_25102025/hinh_anh_xu_ly/19. CINNAMON HOT TEA (350ml).png",
        ],
                    `# Nguyên liệu
                    4gr Quế cây
                    10ml Đường
                    25ml Cốt cam
                    50ml Lục trà
                    20ml Mật ong

                     # Cách pha chế
                     Quế khô bẻ nhỏ cho vào 50ml nước sôi ngâm 1 phút lấy vị
                     Cho Đường, Cốt cam, Lục trà kèm 100ml nước sôi khuấy đều
                     Phục vụ món kèm 1 cup mật ong (20ml) để khách tự điều chỉnh độ ngọt
                     (Trang trí 1 lát chanh khô)`,
                     ["SP000012"]
                ),
new Drink(
                    "healthy_drink_02",
                    ["healthy_drink"],
                    "OSMANTHUS HONEY TEA HOT (350ml)",
        "/images/Katy_Thao_25102025/Katy_Thao_25102025/hinh_anh_xu_ly/20. OSMANTHUS HONEY TEA HOT (350ml).webp",
        [
            "/images/Katy_Thao_25102025/Katy_Thao_25102025/hinh_anh_xu_ly/20. OSMANTHUS HONEY TEA HOT (350ml) bg.png",
            "/images/Katy_Thao_25102025/Katy_Thao_25102025/hinh_anh_xu_ly/20. OSMANTHUS HONEY TEA HOT (350ml).png",
        ],
                    `# Nguyên liệu
                    20gr Mứt quế hoa
                    100ml Lục trà
                    100ml Nước nóng

                     # Cách pha chế
                     Cho Mứt quế hoa vào đáy ly
                     Rót từ từ Lục trà và nước nóng vào ly
                     (Trang trí hoa khô , hoa quế khô)`,
                     ["SP000012","SP000538"]
                ),
new Drink(
                    "healthy_drink_03",
                    ["healthy_drink"],
                    "OSMANTHUS HONEY TEA ICED (500ml)",
        "/images/Katy_Thao_25102025/Katy_Thao_25102025/hinh_anh_xu_ly/21. OSMANTHUS HONEY TEA ICED (500ml).webp",
        [
            "/images/Katy_Thao_25102025/Katy_Thao_25102025/hinh_anh_xu_ly/21. OSMANTHUS HONEY TEA ICED (500ml) bg.png",
            "/images/Katy_Thao_25102025/Katy_Thao_25102025/hinh_anh_xu_ly/21. OSMANTHUS HONEY TEA ICED (500ml).png",
        ],
                    `# Nguyên liệu
                    100ml Lục trà
                    50ml Nước nóng
                    20gr Mứt quế hoa

                     # Cách pha chế
                     Cho tất cả nguyên liệu vào shake
                     Cho đá đến vạch 400ml lắc đều cho ra ly
                     (Trang trí sẵn trân châu trắng)`,
                     ["SP000012","SP000538"]
                ),
new Drink(
                    "healthy_drink_04",
                    ["healthy_drink"],
                    "ROSE ICED (500ml)",
        "/images/Katy_Thao_25102025/Katy_Thao_25102025/hinh_anh_xu_ly/22. ROSE ICED (500ml).webp",
        [
            "/images/Katy_Thao_25102025/Katy_Thao_25102025/hinh_anh_xu_ly/22. ROSE ICED (500ml) bg.png",
            "/images/Katy_Thao_25102025/Katy_Thao_25102025/hinh_anh_xu_ly/22. ROSE ICED (500ml).png",
        ],
                    `# Nguyên liệu
                    4gr Quế cây
                    20gr Mứt lê
                    100ml Trà hoa hồng
                    10gr Chanh vàng

                     # Cách pha chế
                     Quế khô bẻ nhỏ cho vào 50ml nước sôi ngâm 1 phút lấy vị
                     Cho Mứt lê, Trà hoa hồng, Chanh vàng vào shake cùng nước quế đã ngâm
                     Cho đá đến vạch 400ml lắc đều cho ra ly`,
                     ["SP000537"]
                ),
];

export const SERVICES = [
    new Service("s1", "Đào tạo pha chế", require('../images/ServicesScreen/daotaophache.jpg')),
    new Service("s2", "Danh mục đồ uống", require('../images/ServicesScreen/danhmucdouong.jpg')),
    new Service("s3", "Máy pha chế", require('../images/ServicesScreen/mayphache.jpg')),
    new Service("s4", "Nguyên liệu pha chế", require('../images/ServicesScreen/nguyenlieuphache.jpg')),
    new Service("s5", "Trọn bộ dịch vụ", require('../images/ServicesScreen/tronbodichvu.jpg')),
    new Service("s6", "Setup menu", require('../images/ServicesScreen/vatlieusetupquan.jpg')),
    new Service("s7", "Máy nitro soda", require('../images/ServicesScreen/maynitrosoda.jpg')),
    new Service("s9", "Form Đánh Giá Dịch Vụ", require('../images/ServicesScreen/danhgiadichvu.jpg')),
    new Service("s10", "Thanh toán dịch vụ", require('../images/ServicesScreen/thanhtoandichvu.jpg')),
];

export const CATMACHINES = [
    new CatMachine("may_ep_hoa_qua", "Máy ép hoa quả"),
    new CatMachine("may_pha_ca_phe", "Máy pha cà phê"),
    new CatMachine("may_xay_ca_phe_hat", "Máy xay cà phê hạt"),
    new CatMachine("may_xay_sinh_to", "Máy xay sinh tố"),
    new CatMachine("may_va_thiet_bi_khac", "Máy và thiết bị khác"),
    new CatMachine("may_cho_quan_tra_sua", "Máy cho quán trà sữa"),
    new CatMachine("may_lam_da", "Máy làm đá"),
    new CatMachine("may_lam_kem", "Máy làm kem"),
    new CatMachine("may_pha_tra", "Máy pha trà"),
    new CatMachine("may_thu_ngan", "Máy thu ngân"),
];

export const MACHINES = [
    new Machine(
        "SP000252",
        ["may_ep_hoa_qua"],
        "Máy ép nhanh Uniblend SS-01",
        "https://cdn2-retail-images.kiotviet.vn/khohvcpsg/3ef5ed36254f4cdb930d6a857f3cfad0.jpg",
        "2,550,000",

    ),
    new Machine(
        "XP000233",
        ["may_ep_hoa_qua"],
        "Máy ép hoa quả chậm Promix PM-800",
        "https://cdn-images.kiotviet.vn/mayphache/0605ff1f18c2463487135a2b00cf60a9.jpg",
        "3,000,000",

    ),
    new Machine(
        "XP000296",
        ["may_ep_hoa_qua"],
        "Máy ép nhanh Promix FJ-04",
        "https://cdn2-retail-images.kiotviet.vn/mayphache/e0b425463dd74bab870d69e274fa1797.jpg",
        "2,800,000",
    ),

    new Machine(
        "SP000253",
        ["may_pha_ca_phe"],
        "Máy vắt cam chuyên dụng Uniblend",
        "https://dptmgixyejobj-domestic307-sg.vcdn.cloud/khohvcpsg/2e6e203fa9f24601ac3bbe4f9cbe9b4b.jpeg",
        "950,000",
    ),
    new Machine(
        "SP000242",
        ["may_pha_ca_phe"],
        "Máy pha trà cà phê 2 in 1",
        "https://cdn2-retail-images.kiotviet.vn/khohvcpsg/7dc5e0bfb3fd4a558cece13588cee6ad.jpeg",
        "29,000,000",
    ),
    new Machine(
        "XP000280",
        ["may_pha_ca_phe"],
        "Máy pha cà phê Wega Lunna 1 Group",
        "https://cdn-images.kiotviet.vn/mayphache/dc95166fa6824032b59ff7ed7ff42a9b.png",
        "55,660,000",
    ),
    new Machine(
        "XP000111",
        ["may_xay_ca_phe_hat"],
        "Máy xay cà phê hạt Casalano Fin CM520",
        "https://cdn-images.kiotviet.vn/mayphache/63b437f069844e3daf23a46bb75b14c1.jpg",
        "7,800,000",
    ),
];

export const EQUIPMENTS = [
    new Equipment(
        "101",
        ["may_ep_hoa_qua"],
        "Máy ép nhanh Uniblend SS-01",
        "https://cdn2-retail-images.kiotviet.vn/khohvcpsg/3ef5ed36254f4cdb930d6a857f3cfad0.jpg",
        "2,550,000",

    ),
    new Equipment(
        "102",
        ["may_ep_hoa_qua"],
        "Máy ép hoa quả chậm Promix PM-800",
        "https://cdn-images.kiotviet.vn/mayphache/0605ff1f18c2463487135a2b00cf60a9.jpg",
        "3,000,000",

    ),
    new Equipment(
        "103",
        ["may_ep_hoa_qua"],
        "Máy ép nhanh Promix FJ-04",
        "https://cdn2-retail-images.kiotviet.vn/mayphache/e0b425463dd74bab870d69e274fa1797.jpg",
        "2,800,000",
    ),
];

export const CATNITROSODAS = [
    new CatNitroSoda("1", "Giới Thiệu Máy"),
    new CatNitroSoda("2", "Thông Tin Máy"),
    new CatNitroSoda("3", "Pha Chế Máy"),

];

export const NITROSODAS = [
    new NitroSoda(
        "1",
        ["1"],
        "Giới thiệu về máy Nitro Soda",
        "Mỗi khóa học sẽ có thời gian học khác nhau",
        "Xem thêm chi tiết trong ảnh",
//        "/images/Course/Nang_Cap_Menu/nitro_soda.mp4"
        "/videos/nitro_soda.mp4" // ✅ đường dẫn public
    ),
    new NitroSoda(
        "2",
        ["2"],
        "Danh Sách Các Khóa Học Pha Chế",
        "Mỗi khóa học sẽ có thời gian học khác nhau",
        "Xem thêm chi tiết trong ảnh",
//        "/images/Course/Nang_Cap_Menu/nitro_soda.mp4"
        "/videos/nitro_soda.mp4" // ✅ đường dẫn public
    ),
];
export const COURSES = [
    new Course(
        "t0",
        ["1"],
        "Danh Sách Các Khóa Học Pha Chế",
        "Mỗi khóa học sẽ có thời gian học khác nhau",
        "Xem thêm chi tiết trong ảnh",
        "/images/Course/Danh_Sach_Khoa_Hoc/danh_sach.jpg",
        [
            "/images/Course/Danh_Sach_Khoa_Hoc/danh_sach.jpg",
            "/images/Course/Truyen_Thong/menu_truyen_thong.png",
            "/images/Course/Hien_Dai/menu_hien_dai.png",
            "/images/Course/Nang_Cap_Menu/menu_nang_cap.PNG",
        ]
    ),
    new Course(
        "t1",
        ["2"],
        "Tổng Hợp Truyền Thống",
        "3 Ngày (6 Buổi)",
        "5,200,000",
        "/images/Course/Truyen_Thong/truyen_thong_1.png",
        [
            "/images/Course/Truyen_Thong/truyen_thong_1.png",
            "/images/Course/Truyen_Thong/truyen_thong_2.png",
            "/images/Course/Truyen_Thong/truyen_thong_3.png",
            "/images/Course/Truyen_Thong/menu_truyen_thong.png",
        ]
    ),
    new Course(
        "t2",
        ["2"],
        "Tổng Hợp Hiện Đại",
        "4 Ngày (8 Buổi)",
        "7,500,000",
        "/images/Course/Hien_Dai/hien_dai_1.png",
        [
            "/images/Course/Hien_Dai/hien_dai_1.png",
            "/images/Course/Hien_Dai/hien_dai_2.png",
            "/images/Course/Hien_Dai/hien_dai_3.png",
            "/images/Course/Hien_Dai/hien_dai_4.png",
            "/images/Course/Hien_Dai/menu_hien_dai.png",
        ]
    ),
    new Course(
        "t3",
        ["3"],
        "Cà Phê Máy - Cacao & Socola",
        "1 Ngày (2 Buổi)",
        "2,500,000",
        "/images/Course/Hien_Dai/hien_dai_1.png",
        [
            "/images/Course/Hien_Dai/hien_dai_1.png",
            "/images/Course/Hien_Dai/menu_hien_dai.png",
        ]
    ),
    new Course(
        "t4",
        ["3"],
        "Trà Sữa - Topping",
        "1 Ngày (2 Buổi)",
        "2,500,000",
        "/images/Course/Truyen_Thong/truyen_thong_2.png",
        [
            "/images/Course/Truyen_Thong/truyen_thong_2.png",
            "/images/Course/Truyen_Thong/menu_truyen_thong.png",
        ]
    ),
    new Course(
        "t5",
        ["3"],
        "Cà Phê Phin - Cacao & Socola - Đá Xay & Sinh Tố - Sữa Chua",
        "1 Ngày (2 Buổi)",
        "2,200,000",
        "/images/Course/Truyen_Thong/truyen_thong_3.png",
        [
            "/images/Course/Truyen_Thong/truyen_thong_3.png",
            "/images/Course/Truyen_Thong/menu_truyen_thong.png",
        ]
    ),
    new Course(
        "t6",
        ["3"],
        "Cà Phê Máy Chuyên Sâu",
        "3 Ngày (6 Buổi)",
        "8,300,000",
        "/images/Course/Ca_Phe_May/ca_phe_may_chuyen_sau.jpg",
        [
            "/images/Course/Ca_Phe_May/ca_phe_may_chuyen_sau.jpg",
        ]
    ),
    new Course(
        "t7",
        ["3"],
        "Trà Pha Máy - Topping",
        "1 Ngày (2 Buổi)",
        "2,500,000",
        "/images/Course/Hien_Dai/hien_dai_2.png",
        [
            "/images/Course/Hien_Dai/hien_dai_2.png",
            "/images/Course/Hien_Dai/menu_hien_dai.png",
        ]
    ),
    new Course(
        "t8",
        ["3"],
        "Cocomilk - Đá Xay Hiện Đại - Sinh Tố",
        "1 Ngày (2 Buổi)",
        "2,500,000",
        "/images/Course/Hien_Dai/hien_dai_3.png",
        [
            "/images/Course/Hien_Dai/hien_dai_3.png",
            "/images/Course/Hien_Dai/menu_hien_dai.png",
        ]
    ),
    new Course(
        "t9",
        ["3"],
        "Trà Kombucha - Matcha - Topping",
        "1 Ngày (2 Buổi)",
        "2,500,000",
        "/images/Course/Hien_Dai/hien_dai_4.png",
        [
            "/images/Course/Hien_Dai/hien_dai_4.png",
            "/images/Course/Hien_Dai/menu_hien_dai.png",
        ]
    ),
    new Course(
        "t10",
        ["4"],
        "Nâng Cấp Menu",
        "1 Ngày (2 Buổi)",
        "2,500,000",
        "/images/Course/Nang_Cap_Menu/nang_cap_menu.jpg",
        [
            "/images/Course/Nang_Cap_Menu/nang_cap_menu.jpg",
            "/images/Course/Nang_Cap_Menu/menu_nang_cap.PNG",
            "/images/Course/Nang_Cap_Menu/voi1_voi2.PNG",
            "/images/Course/Nang_Cap_Menu/voi3_voi4.PNG",
            "/images/Course/Nang_Cap_Menu/may01.jpg",
            "/images/Course/Nang_Cap_Menu/may02.jpg",
            "/images/Course/Nang_Cap_Menu/may03.jpg",
            "/images/Course/Nang_Cap_Menu/may04.jpg",
            "/images/Course/Nang_Cap_Menu/maynitrogen.jpg",
        ]
    ),
    new Course(
        "t11",
        ["3"],
        "Cà Phê Máy Cơ Bản",
        "1 Ngày (2 Buổi)",
        "2,500,000",
        "/images/Course/Ca_Phe_May/ca_phe_may_co_ban.png",
        [
            "/images/Course/Ca_Phe_May/ca_phe_may_co_ban.png",
        ]
    ),

];




