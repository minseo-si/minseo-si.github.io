# 🎬 Video Portfolio

영상 작업물을 한 페이지에서 보여주는 **오픈소스 포트폴리오 웹사이트**입니다.
빌드 도구·서버·프레임워크 없이 HTML/CSS/JS 파일만으로 동작하며, GitHub Pages에 무료로 배포할 수 있습니다.

## 기능

- YouTube · Vimeo · 직접 올린 mp4 영상 지원
- 대표작(Featured) 크게 노출
- 카테고리 필터 + 검색
- 클릭하면 팝업 플레이어로 재생 (닫으면 자동 정지)
- 영상별 공유 링크 (`https://내사이트/#big-buck-bunny` → 바로 재생)
- 다크/라이트 테마, 모바일 대응, 키보드 접근성

## 내 영상으로 바꾸기

**`videos.js` 파일 하나만 수정하면 됩니다.**

```js
{
  title: "브랜드 필름 — OO 캠페인",
  source: { youtube: "aqz-KE-bpKQ" },   // 또는 { vimeo: "76979871" } / { file: "media/clip.mp4" }
  category: "광고",
  year: 2026,
  duration: "1:30",
  role: "편집 · 컬러",
  description: "작업 설명",
  thumbnail: "media/thumb.jpg",          // 선택 (YouTube는 자동)
  featured: true,                         // 선택 (대표작 1개)
}
```

- 카테고리 필터 버튼은 `category` 값에서 자동으로 만들어집니다.
- 목록 순서 = 화면 표시 순서입니다.

## 관리자 페이지로 편집하기

코드를 몰라도 `admin.html`을 열면 화면에서 바로 편집할 수 있어요. (**크롬 또는 엣지** 권장)

- 프로필·링크·화면 비율 수정
- 영상 추가 / 삭제 / 순서 변경 / 대표작 지정
- mp4·썸네일 이미지를 고르면 `media` 폴더에 영어 이름으로 복사, 재생 시간 자동 입력
- **저장**(또는 Ctrl+S) → 처음 한 번 포트폴리오 폴더를 고르면 `videos.js`가 바로 바뀜

저장한 뒤 바뀐 `videos.js`와 새 `media` 파일을 GitHub에 올리면 사이트에 반영돼요.
관리자 페이지는 내 컴퓨터의 파일만 고치므로, GitHub에 같이 올라가도 다른 사람이 내 사이트를 바꿀 수는 없어요.

## 로컬에서 보기

`index.html`을 더블클릭해 브라우저로 열면 됩니다.

## GitHub Pages로 배포하기

1. GitHub에서 새 저장소를 만들고 이 폴더의 파일을 모두 올립니다.
2. 저장소 **Settings → Pages** 에서 Source를 `Deploy from a branch`, 브랜치 `main` / `/ (root)` 로 설정합니다.
3. 1~2분 뒤 `https://<아이디>.github.io/<저장소이름>/` 에서 확인할 수 있습니다.

> 저장소 이름을 `<아이디>.github.io` 로 만들면 `https://<아이디>.github.io/` 주소가 됩니다.

Netlify, Vercel, Cloudflare Pages 에도 폴더를 그대로 올리면 배포됩니다.

## 파일 구조

| 파일 | 역할 |
|---|---|
| `videos.js` | 프로필과 영상 목록 (**여기만 수정**) |
| `index.html` | 페이지 구조 |
| `style.css` | 디자인 (색상은 맨 위 `:root` 변수에서 변경) |
| `app.js` | 필터·검색·플레이어 동작 |

## 라이선스

[MIT](LICENSE) — 자유롭게 복제·수정·배포할 수 있습니다.
샘플 영상은 Blender Foundation의 오픈 무비(CC BY)입니다.
