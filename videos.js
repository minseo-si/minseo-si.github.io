/*
 * ✏️ 이 파일만 수정하면 포트폴리오가 바뀝니다.
 *
 * profile : 상단 소개 영역
 * videos  : 영상 목록 (위에 있을수록 먼저 표시)
 *
 * 영상 소스(source) 작성법 — 셋 중 하나:
 *   { youtube: "주소 또는 ID" }      예) "https://youtu.be/aqz-KE-bpKQ" 또는 "aqz-KE-bpKQ" (쇼츠 주소도 가능)
 *   { vimeo: "주소 또는 ID" }        예) "https://vimeo.com/76979871" 또는 "76979871"
 *   { instagram: "릴스 주소" }       예) "https://www.instagram.com/reel/XXXXXXXXXXX/"
 *                                    (릴스는 썸네일이 자동으로 안 나와요 → thumbnail 을 직접 넣어 주세요)
 *   { file: "media/영상.mp4" }       가장 깔끔하게 재생돼요. 썸네일은 첫 장면으로 자동 생성.
 *
 * views (선택): 조회수. 숫자로 쓰면 자동 변환 → views: 12345  →  "1.2만"
 *               글자로 써도 돼요          → views: "12만"
 *   { file: "media/내영상.mp4" }     저장소에 직접 넣은 영상 파일
 *
 * thumbnail 은 선택 사항입니다. YouTube는 자동으로 가져오고,
 * Vimeo·파일 영상은 직접 이미지 경로를 넣어 주세요.
 *
 * 아래 샘플은 Blender Foundation의 오픈 무비(CC BY)입니다. 내 영상으로 바꿔 주세요.
 */
window.PORTFOLIO = {
  // 화면 비율: "9:16" (세로·쇼츠) 또는 "16:9" (가로)
  // 영상 하나만 다르게 하려면 그 영상에 aspect: "16:9" 를 추가하세요.
  aspect: "9:16",

  profile: {
    name: "시민서",
    role: "Video Editor · Motion Designer",
    bio: "공감으로 대중과 소통합니다. 브랜드 필름, 숏폼 콘텐츠를 만듭니다.",
    links: [
      { label: "Email", url: "mailto:hellojagguri@gmail.com" },
      { label: "YouTube", url: "https://www.youtube.com/@jangguri_life" },
      { label: "Instagram", url: "https://www.instagram.com/jangguri_life/" },
    ],
  },

  videos: [
    {
      title: "덕수궁 잡상의 서울 정찰",
      // 원래 유튜브 주소: https://youtube.com/shorts/9ZLoyLo3mNQ
      source: { file: "media/bamlog.mp4" },
      category: "공모전·홍보",
      year: 2026,
      duration: "1:07",
      role: "기획, 제작, 편집 ",
      description: " 덕수궁 처마 위의 잡상이 깨어나 서울을 지키며, 서울의 밤을 즐기는 모습을 그린 서울시 홍보 영상. 서울시 밤로그 공모전 제출.",
      featured: true,
    },
    {
      title: "엄마와 12,000원 데이트",
      source: { file: "media/mom-date.mp4" },
      category: "공모전·홍보",
      year: 2026,
      duration: "1:00",
      role: "기획, 제작, 편집",
      description: "한방진흥센터에서 엄마와의 데이트 하는 영상",
    },
    {
      title: "배달음식",
      source: { file: "media/delivery.mp4" },
      category: "공감 애니메이션",
      year: 2026,
      duration: "0:38",
      role: "기획, 제작, 편집",
      description: "",
    },
    {
      title: "자야하는데",
      source: { file: "media/sleep.mp4" },
      category: "공감 애니메이션",
      year: 2026,
      duration: "0:15",
      role: "기획, 제작, 편집",
      description: "자야하는데 핸드폰을 놓지 못하는 공감형 영상",
    },
    {
      title: "상어가 집앞에 나타났을 때",
      // 인스타 릴스 주소 대신 mp4 파일로 바꿨어요 (화면이 더 깔끔해요)
      // 원래 주소: https://www.instagram.com/reel/DeMY5WPue5p/
      source: { file: "media/shark.mp4" },
      category: "일상 브이로그",
      year: 2026,
      duration: "0:48",
      role: "기획, 제작, 편집",
      description: "오랜만에 부산 고향에 부캉이를 보러 엄마와 함께 구경하는 이야기.",
    },
    {
      title: "추석",
      source: { file: "media/chuseok.mp4" },
      category: "일상 브이로그",
      year: 2026,
      duration: "0:44",
      role: "기획, 제작, 편집",
      description: "고향에 내려가 부캉이 보며 힐링하는 영상",
    },
    {
      title: "청소",
      source: { file: "media/cleaning.mp4" },
      category: "공감 애니메이션",
      year: 2026,
      duration: "0:29",
      role: "기획, 제작, 편집",
      description: "",
    },
    {
      title: "하루가 짧은 이유",
      source: { file: "media/short-day.mp4" },
      category: "공감 애니메이션",
      year: 2026,
      duration: "0:06",
      role: "기획, 제작, 편집",
      description: "스마트폰을 보다 하루가 다 지나버린 공감형 이야기",
    },
    {
      title: "금요일 좋아",
      source: { file: "media/friday.mp4" },
      category: "공감 애니메이션",
      year: 2026,
      duration: "0:06",
      role: "기획, 제작, 편집",
      description: "금요일에 신난 장꾸리",
    },
    {
      title: "나의 서울",
      source: { file: "media/my-seoul.mp4" },
      aspect: "16:9", // 가로 영상이라 재생할 때 가로로 나와요
      category: "공모전·홍보",
      year: 2026,
      duration: "0:30",
      role: "기획, 제작, 편집",
      description: "",
    },
  ],
};
