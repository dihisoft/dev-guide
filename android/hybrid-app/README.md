# Android Hybrid App Dev Guide

- 해당 가이드를 진행하면 아래 동영상처럼 React 코드를 수정했을 때, 스마트폰에 즉시 반영이 된다.

|                                   디버깅 환경 구축 결과<br/>                                   |
| :--------------------------------------------------------------------------------------------: |
| <video src="https://github.com/user-attachments/assets/b1d1684e-f05d-43bf-8192-f66af8bb26ad"/> |

## 1. 네이티브 하이브리드 앱의 문제

- **프론트엔드 개발의 경우**

  - 프론트엔드는 PC에서 로컬 서버를 구동하며, 개발 또한 로컬 PC에서 이루어지므로 개발 환경 구축이 비교적 간단하다.

- **네이티브 하이브리드 앱 개발의 경우**
  - 하이브리드 앱에서만 발생하는 에러를 디버깅 하기 어렵다.
  - 하이브리드 앱은 `스마트폰에서 실행`되기 때문에, `로컬 PC에서 구동 중인 서버`에 직접 접근하는 것이 어렵다.

<br/>

## 2. 디버깅 환경 구축의 필요성

- 하이브리드 앱에서만 발생한 에러를 디버깅 하는 상황이 생길 수 있다.
- 아래와 같은 장점도 얻을 수 있다.
  - PC에서 수정한 코드를 실시간으로 스마트폰에서 확인 가능
  - API 서버와의 통신 문제 디버깅
  - 프론트엔드 및 백엔드 로컬 서버 디버깅을 한 곳에서 관리 가능
- **즉, 네이티브 앱에서 로컬 서버로 접속할 수 있는 방법이 필요**하며, 이를 위해 추가적인 설정이 필요하다.

<br/>

## 3. 하이브리드앱 <-> 로컬 서버 디버깅 환경 구축 과정

- 스마트폰과 개발 PC는 동일한 네트워크 망을 사용해야함

### 3-1. 개발 PC에 프록시 서버 설정

- [Fiddler Classic](https://www.telerik.com/fiddler/fiddler-classic) 을 설치한다.
- `Tools > Options > Connections` 메뉴를 선택한다.

  - `Allow remote computers to connect` 를 체크한다.
  - `포트`를 `8866` 으로 지정한다.

    <img width="600" src="https://github.com/user-attachments/assets/7666226c-65e8-4e6f-9e14-25379db0720a" />

- Fiddler Classic를 `재시작`해서 설정을 적용한다.

### 3-2. 스마트폰의 WIFI 설정에서 프록시 설정

- 스마트폰의 WIFI 설정에서 프록시(수동)으로 설정한다.

  - `프록시 호스트 이름`에 로컬 PC의 IP 주소를 입력한다 (예: `192.168.0.128`)
  - `프록시 포트`에 1번 과정에서 설정한 포트를 입력한다. (예: `8866`)

    <img width="300" src="https://github.com/user-attachments/assets/75db592b-bd0d-4c51-97ac-32cc996b0640" />

### 3-3. 로컬 서버 접속 확인

- 스마트폰의 브라우저에서 로컬 서버인 `https://welluga-local-mfront.starter.myds.me:3000/login`로 접속이 가능해진다.

### 3-4. API 서버 인증서 오류 발생

- 하지만 API 서버에 접근 시 인증서 오류가 발생한다.
- 이를 해결하기 위해 안드로이드 웹뷰 설정에서 인증서 오류를 무시하도록 설정해야한다.

  ```kotlin
  this.webViewClient = object : WebViewClient() {
    override fun onReceivedSslError(
        view: WebView?,
        handler: SslErrorHandler?,
        error: SslError?
    ) {
        if (BuildConfig.BUILD_TYPE == "debug") {
            handler?.proceed() // debug 환경에서만 인증서 오류 무시
        } else {
            super.onReceivedSslError(view, handler, error)
        }
    }
    ...
  }
  ```

### 3-5. Chrome 개발자 도구 활용

- `Html Element` `Css` `Network` 등을 확인하기 위해서 Chrome 개발자 도구를 활용한다.
- [chrome://inspect/#devices](chrome://inspect/#devices) 페이지에서 `inspect`버튼을 누르면 스마트폰 브라우저의 개발자 도구에 접근이 가능하다.

  |                                      chrome://inspect/#devices 화면                                       |                     inspect를 눌러서<br/>스마트폰 브라우저 개발자 도구로 진입한 모습                      |
  | :-------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------: |
  | <img width="500" src="https://github.com/user-attachments/assets/44c0d7b7-9102-42ec-b438-25cb982a9b72" /> | <img width="300" src="https://github.com/user-attachments/assets/c6b913f2-8080-4847-bdfd-0b1eef5a6b6b" /> |

### 3-6. 실시간 코드 반영

- 개발 PC에서 웹(React) 코드를 수정하면, 스마트폰에서 즉시 변경 사항이 반영되는 모습을 볼 수 있다.
