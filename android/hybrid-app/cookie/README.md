# 하이브리드 앱 개발

안드로이드 앱에서 웹뷰를 사용하는 경우, 안드로이드 쿠키 보존 및 새창 열기를 처리하는 방법을 설명합니다.

## 목차

1. [쿠키 보존](#쿠키-보존)
2. [새창 열기](#새창-열기)

## 쿠키 보존

1.  WebView에 CookieManager를 사용하여 쿠키를 설정합니다.

2.  쿠키를 WebView에 적용합니다.

    ```kotlin
    val webView: WebView = findViewById(R.id.webView)
    val cookieManager: CookieManager = CookieManager.getInstance()
    cookieManager.setAcceptCookie(true)
    cookieManager.setAcceptThirdPartyCookies(webView, true)

    // 시 쿠키 설정
    cookieManager.setCookie("https://yourwebsite.com", "key=value; Domain=.yourwebsite.com")

    webView.webViewClient = object : WebViewClient() {
        override fun onPageFinished(view: WebView?, url: String?) {
            super.onPageFinished(view, url)
            // MPA 기반의 웹인 경우, onPageFinished에서 flush() 함수 호출
            cookieManager.flush()
        }

        override fun doUpdateVisitedHistory(view: WebView?, url: String?, isReload: Boolean) {
            super.doUpdateVisitedHistory(view, url, isReload)
            // SPA 기반의 웹인 경우, doUpdateVisitedHistory에서 flush() 함수 호출
            cookieManager.flush()
        }
    }
    ```

3.  웹뷰를 담고있는 Activity에도 쿠키 동기화를 진행합니다.

    - 팝업에 '하루동안 보지 않기' 기능이 있는 경우, 하루동안 보지 않기를 클릭하고 앱을 종료한 경우에는
      쿠키가 손실되어서 팝업이 지속적으로 나타나므로 액티비티의 `onPause()`에도 동기화를 진행해야합니다.

             ```kotlin
             // MainActivity.kt
              override fun onPause() {
                  super.onPause()
                  CookieManager.getInstance().flush()
              }
             ```

- 하이브리드 앱에서 쿠키 보존은 사용자 세션을 유지하는 데 중요합니다. 위의 코드 예제에서는 안드로이드 쿠키를 설정하고 웹뷰에 적용하는 방법을 보여줍니다.

- CookieManager를 사용하여 쿠키를 설정하고, 웹페이지가 로드된 후 쿠키를 플러시합니다.

## 새창 열기

1. WebViewClient를 사용하여 새창 열기를 처리합니다.

   ```kotlin
   webView.webViewClient = object : WebViewClient() {
       override fun shouldOverrideUrlLoading(view: WebView?, request: WebResourceRequest?): Boolean {
           if (request == null) return false

           if (request.url.host == baseUrl && request.url.path == path) {
               return false
           } else {
               // 암시적 인텐트를 사용해서 사용자가 선택한 브라우저로 URL을 실행
               val intent = Intent(Intent.ACTION_VIEW)
               intent.data = request.url
               startActivity(intent)
               return true
           }
       }
   }
   ```

- 하이브리드 앱에서 웹뷰 내에서 새창을 열기 위해서는 별도의 처리가 필요합니다. 위의 코드 예제에서는 안드로이드 새창 열기를 처리하는 방법을 보여줍니다.

- 새창 열기를 하고 싶으면 암시적 인텐트를 사용합니다.
