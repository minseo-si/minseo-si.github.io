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
    role: "콘텐츠 기획자",
    bio: "공감으로 대중과 소통합니다. 주로 숏폼 콘텐츠를 만듭니다.",
    links: [
      { label: "Email", url: "mailto:hellojagguri@gmail.com" },
      { label: "YouTube", url: "https://www.youtube.com/@jangguri_life" },
      { label: "Instagram", url: "https://www.instagram.com/jangguri_life/" },
    ],
  },

  videos: [
    {
      title: "[서울시 공모전] 덕수궁 잡상의 서울 정찰",
      // 원래 유튜브 주소: https://youtube.com/shorts/9ZLoyLo3mNQ
      source: { file: "media/bamlog.mp4" },
      category: "롱폼",
      year: 2026,
      duration: "1:07",
      role: "기획, 제작, 편집 ",
      description: "덕수궁 처마 위를 지키던 잡상이 사람의 모습으로 깨어나, 등불을 들고 청계천·남산 등 서울의 밤거리를 정찰합니다. 전통 캐릭터와 현대 서울의 야경을 엮은 서울시 '밤로그' 공모전 출품작.",
      featured: true,
    },
    {
      title: "[AI 소개팅 예능] 그니까 솔로 – 박강식 편",
      source: { file: "media/blind-date.mp4" },
      category: "롱폼",
      year: 2026,
      duration: "1:12",
      role: "기획, 제작, 편집",
      description: "코미디 소개팅 예능 팀 프로젝트 중 '박강식' 편. 소개팅 자리에서 케이크를 자로 재고, 라떼 한 모금까지 그램으로 달아 정산하는 짠돌이 캐릭터를 그렸습니다. AI로 생성한 장면은 Camera Raw로 화질을 보정했습니다.",
    },
    {
      title: "[기관 홍보] 한방진흥센터 – 엄마와 12,000원 데이트",
      source: { file: "media/mom-date.mp4" },
      category: "숏폼",
      year: 2026,
      duration: "1:00",
      role: "기획, 제작, 편집",
      description: "장꾸리가 엄마와 함께 한방진흥센터를 찾아 한복 입기, 보자기 한방 체험, 약초 족욕까지 12,000원으로 즐기는 하루. 기관 홍보를 모녀의 따뜻한 데이트 이야기로 풀었습니다.",
    },
    {
      title: "[공감 숏폼] 배달비 0원의 함정",
      source: { file: "media/delivery.mp4" },
      category: "숏폼",
      year: 2026,
      duration: "0:38",
      role: "기획, 제작, 편집",
      description: "'배달비 0원, 총액은 묻지 마세요.' 무료배송 금액을 채우려다 혼자 먹기엔 너무 많은 떡볶이 한 상을 시켜 버린 장꾸리. 누구나 한 번쯤 해 본 배달 앱 속 합리화를 그린 공감 애니메이션.",
    },
    {
      title: "[공감 숏폼] 자야 하는데 못 자는 밤",
      source: { file: "media/sleep.mp4" },
      category: "숏폼",
      year: 2026,
      duration: "0:15",
      role: "기획, 제작, 편집",
      description: "'저녁은 아깝고 아침은 두려워.' 불 끄고 누워서도 끝없는 쇼츠를 넘기다 결국 아침을 맞는 장꾸리. 잠들기 아쉬운 밤의 마음을 15초에 담았습니다.",
    },
    {
      title: "[캐릭터 브이로그] 집 앞 바다에 상어가 나타났을 때",
      // 인스타 릴스 주소 대신 mp4 파일로 바꿨어요 (화면이 더 깔끔해요)
      // 원래 주소: https://www.instagram.com/reel/DeMY5WPue5p/
      source: { file: "media/shark.mp4" },
      category: "숏폼",
      year: 2026,
      duration: "0:48",
      role: "기획, 제작, 편집",
      description: "부산 고향 바다에 나타난 상어 '부캉이'를 보러 장꾸리가 엄마와 함께 나선 하루. 상어를 찾아 두리번거리는 설렘을 캐릭터 브이로그로 담았습니다.",
    },
    {
      title: "[캐릭터 브이로그] 추석, 본가에서 못 떠나는 이유",
      source: { file: "media/chuseok.mp4" },
      category: "숏폼",
      year: 2026,
      duration: "0:44",
      role: "기획, 제작, 편집",
      description: "'상어 보러 본가에 내려가면 안 되는 이유.' 고향 집이 너무 편해서 서울로 돌아가는 기차표를 자꾸 미루게 되는 장꾸리의 추석. 돌아가는 길에 다시 엄마가 보고 싶어지는 마음까지 담았습니다.",
    },
    {
      title: "[공감 숏폼] 청소하려다 추억 정리",
      source: { file: "media/cleaning.mp4" },
      category: "숏폼",
      year: 2026,
      duration: "0:29",
      role: "기획, 제작, 편집",
      description: "'난 분명 청소하려 했어.' 서랍 정리를 시작했다가 옛날 앨범과 물건에 빠져, 결국 방이 처음보다 더 어질러지는 장꾸리의 이야기.",
    },
    {
      title: "[공감 숏폼] 하루가 짧은 이유",
      source: { file: "media/short-day.mp4" },
      category: "숏폼",
      year: 2026,
      duration: "0:06",
      role: "기획, 제작, 편집",
      description: "아침에 잠깐 집어 든 스마트폰. 창밖이 노을에서 밤으로 바뀌는 동안 그대로인 장꾸리를 통해 '하루가 짧은 이유'를 6초 만에 보여 줍니다.",
    },
    {
      title: "[캐릭터 숏폼] 금요일 좋아",
      source: { file: "media/friday.mp4" },
      category: "숏폼",
      year: 2026,
      duration: "0:06",
      role: "기획, 제작, 편집",
      description: "금요일이 반가워 온몸으로 춤추는 장꾸리. 짧고 경쾌한 6초 루프 영상.",
    },
    {
      title: "[서울 홍보] 나의 서울",
      source: { file: "media/my-seoul.mp4" },
      aspect: "16:9", // 가로 영상이라 재생할 때 가로로 나와요
      category: "숏폼",
      year: 2026,
      duration: "0:30",
      role: "기획, 제작, 편집",
      description: "한강 공원, 남산이 보이는 언덕, 돌담길과 골목 — 서울 곳곳에서 어린 시절부터 지금까지의 나와 마주치는 이야기. 같은 장소에 쌓인 시간을 한 사람의 걸음으로 이은 가로형 영상.",
    },
  ],
};
