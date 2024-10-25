# CSS Coding Convention

## 목차

- [1. 브라우저 간 css 일관성 유지하기](#1-브라우저-간-css-일관성-유지하기)
- [2. font-family 적용](#2-font-family-적용)
    - [2-1. custom-font 지정하기](#2-1-custom-font-지정하기)
    - [2-2. fallback font 지정하기](#2-2-fallback-font-지정하기)
## 1. 브라우저 간 css 일관성 유지하기

일반적으로 브라우저마다 기본적으로 제공하는 css 스타일은 약간씩 차이가 있다.

따라서 프로젝트를 시작하기 전, 브라우저마다 다른 스타일을 조정함으로써 css 크로스 브라우징 문제를 최소화하는 것이 스타일의 일관성을 유지하는데 도움이 된다.

이를 위해서는 [reset.css](https://github.com/shannonmoeller/reset-css)나 [normalize.css](https://github.com/necolas/normalize.css)를 통해 각 브라우저마다 다르게 렌더링되는 스타일을 최소화하는 것이 좋다.

두 스타일시트의 차이점은 `reset.css`는 모든 기본 스타일을 제거하지만, `normalize.css`는 각 태그의 기본적인 스타일은 유지하되 브라우저 간 일관성이 없는 스타일은 최소화하는데 목적이 있다.

예를 들어, 다음은 `reset.css` 코드이다:

```css
/* reset.css */
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
main, menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
}

/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure,
footer, header, hgroup, main, menu, nav, section {
	display: block;
}

/* HTML5 hidden-attribute fix for newer browsers */
*[hidden] {
    display: none;
}

body {
	line-height: 1;
}

menu, ol, ul {
	list-style: none;
}

blockquote, q {
	quotes: none;
}

blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}

table {
	border-collapse: collapse;
	border-spacing: 0;
}
```

다음은 `normalize.css`의 일부 코드이다:

```css
/* normalize.css */
/**
 * 1. Correct the line height in all browsers.
 * 2. Prevent adjustments of font size after orientation changes in iOS.
 */

html {
  line-height: 1.15; /* 1 */
  -webkit-text-size-adjust: 100%; /* 2 */
}

/**
 * Remove the margin in all browsers.
 */

body {
  margin: 0;
}

main {
  display: block;
}

h1 {
  font-size: 2em;
  margin: 0.67em 0;
}

/**
 * 1. Correct the inheritance and scaling of font size in all browsers.
 * 2. Correct the odd `em` font sizing in all browsers.
 */

pre {
  font-family: monospace, monospace; /* 1 */
  font-size: 1em; /* 2 */
}

/**
 * Remove the gray background on active links in IE 10.
 */

a {
  background-color: transparent;
}

/**
 * Add the correct font weight in Chrome, Edge, and Safari.
 */

b,
strong {
  font-weight: bolder;
}

/**
 * Remove the border on images inside links in IE 10.
 */

img {
  border-style: none;
}

/**
 * 1. Change the font styles in all browsers.
 * 2. Remove the margin in Firefox and Safari.
 */

button,
input,
optgroup,
select,
textarea {
  font-family: inherit; /* 1 */
  font-size: 100%; /* 1 */
  line-height: 1.15; /* 1 */
  margin: 0; /* 2 */
}

/**
 * Show the overflow in IE.
 * 1. Show the overflow in Edge.
 */

button,
input { /* 1 */
  overflow: visible;
}

/**
 * Remove the inheritance of text transform in Edge, Firefox, and IE.
 * 1. Remove the inheritance of text transform in Firefox.
 */

button,
select { /* 1 */
  text-transform: none;
}

/**
 * Correct the inability to style clickable types in iOS and Safari.
 */

button,
[type="button"],
[type="reset"],
[type="submit"] {
  -webkit-appearance: button;
}

/**
 * Remove the inner border and padding in Firefox.
 */

button::-moz-focus-inner,
[type="button"]::-moz-focus-inner,
[type="reset"]::-moz-focus-inner,
[type="submit"]::-moz-focus-inner {
  border-style: none;
  padding: 0;
}

/**
 * Restore the focus styles unset by the previous rule.
 */

button:-moz-focusring,
[type="button"]:-moz-focusring,
[type="reset"]:-moz-focusring,
[type="submit"]:-moz-focusring {
  outline: 1px dotted ButtonText;
}

/**
 * Remove the default vertical scrollbar in IE 10+.
 */

textarea {
  overflow: auto;
}

/**
 * 1. Add the correct box sizing in IE 10.
 * 2. Remove the padding in IE 10.
 */

[type="checkbox"],
[type="radio"] {
  box-sizing: border-box; /* 1 */
  padding: 0; /* 2 */
}

/**
 * Correct the cursor style of increment and decrement buttons in Chrome.
 */

[type="number"]::-webkit-inner-spin-button,
[type="number"]::-webkit-outer-spin-button {
  height: auto;
}

/**
 * 1. Correct the odd appearance in Chrome and Safari.
 * 2. Correct the outline style in Safari.
 */

[type="search"] {
  -webkit-appearance: textfield; /* 1 */
  outline-offset: -2px; /* 2 */
}

/**
 * Remove the inner padding in Chrome and Safari on macOS.
 */

[type="search"]::-webkit-search-decoration {
  -webkit-appearance: none;
}

::-webkit-file-upload-button {
  -webkit-appearance: button; /* 1 */
  font: inherit; /* 2 */
}

...
```

코드를 살펴보면, `reset.css`는 모든 스타일을 제거하여 개발자가 스타일링을 처음부터 직접 정의하도록 하는데 목적이 있고, `normalize.css`는 각 태그의 기본 스타일은 유지하되 브라우저마다 약간씩 다른 스타일을 맞추는데 목적이 있다.

`reset.css`나 `normalize.css`는 직접 스타일시트를 복사하여 직접 css 파일로 만들어 `import`하거나 다음 Github 링크를 통해 설치 후 `import`하여 사용하면 된다.

- [reset.css](https://github.com/shannonmoeller/reset-css)
- [normalize.css](https://github.com/necolas/normalize.css/blob/master/normalize.css)

## 2. font-family 적용

### 2-1. custom-font 지정하기

```css
@font-face {
  font-family: "notosans";
  src: url(/fonts/notosans/NotoSansKR-Medium.woff2) format('woff2');
  font-weight: 500;
  font-style: normal;
  unicode-range: U+AC00-D7AF, U+0020-002F, U+003A-0040, U+005B-0060, U+007B-007E;
}
```

- `font-family` 속성을 통해 custom font에 대해 사용할 font 이름을 지정한다. 이때, custom font의 이름은 **쌍따옴표("")** 안에 명시하여 시스템에 기본적으로 내장된 폰트(예: `sans-serif`)와 구분할 수 있도록 한다.
- `src` 속성을 통해 해당 폰트 파일의 위치를 명시한다.
- `unicode-range`를 통해 특정 문자 집합에 대해서만 이 폰트를 적용할 수 있도록 할 수 있다. 예를 들어, 한글에만 적용하려면 `unicode-range: U+AC00-D7AF`, 한글과 숫자에만 적용하려면 `unicode-range: U+AC00-D7AF, U+0030-0039`와 같은 값으로 작성하면 된다.

참고로, `font-family`에 쌍따옴표를 붙이는 경우는 폰트명에 공백이 포함되어 있거나 Custom font인 경우에 붙여주는 것이 좋다.

### 2-2. fallback font 지정하기

특정 요소에 `font-family`를 지정할 때 하나의 폰트명만 명시하는 것보다는 폰트가 적용안되었을 경우를 대비하여 시스템 폰트를 fallback으로 사용하는 것이 좋다.

```css
/**
 * ❌: font 적용 실패 시, p 태그가 아예 보이지 않음
 */
p {
    font-family: "notosans";
}

/**
 * ✅: font를 앞에서부터 차례대로 적용 시도하게 된다. 
 * 시스템에서 제공되는 폰트를 fallback으로 사용하여
 * 커스텀 폰트를 적용하지 못하더라도 시스템 폰트를
 * 대신하여 사용하게 된다.
 */
p {
    font-family: "notosans", system-ui, -apple-system, "Helvetica Neue", Arial, sans-serif;
}
```