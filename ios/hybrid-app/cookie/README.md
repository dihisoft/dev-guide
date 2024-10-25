# iOS Hybrid App Dev Guide

iOS 앱에서 웹뷰를 사용하는 경우, ios 쿠키 보존 및 새창 열기를 처리하는 방법을 설명합니다.

## 목차

[1. 쿠키 보존](#1-쿠키-보존)
[2. 새창 열기](#2-새창-열기)

## 1. 쿠키 보존

- 기본 쿠키세팅 예시

  ```swift
  let webView = WKWebView(frame: .zero)
  let cookieStore = webView.configuration.websiteDataStore.httpCookieStore

  let cookie = HTTPCookie(properties: [
      .domain: ".yourwebsite.com",
      .path: "/",
      .name: "key",
      .value: "value",
      .secure: "TRUE",
      .expires: NSDate(timeIntervalSinceNow: 31556926)
  ])!

  cookieStore.setCookie(cookie) {
      webView.load(URLRequest(url: URL(string: "https://yourwebsite.com")!))
  }
  ```

- 하이브리드 앱에서 쿠키 보존은 사용자 세션을 유지하는 데 중요합니다. 위의 코드 예제에서는 ios 쿠키를 설정하고 웹뷰에 적용하는 방법을 보여줍니다.
- WKHTTPCookieStore를 사용하여 쿠키를 설정하고, 웹뷰에 로드하기 전에 쿠키를 적용합니다.
- 상세한 예시는 아래와 같습니다.

1. WKWebView에서는 WebsiteDataStore 안에 쿠키를 저장하고 있습니다. 이 쿠키는 웹뷰간 공유되지 않기 때문에 HTTPCookieStore에 이를 따로 저장해 동기화해주어야 합니다. 관련 로직은 webView의 Delegate 메서드 내부에서 진행할 수 있습니다.

   ```swift
   class Coordinator: NSObject, WKNavigationDelegate, WKUIDelegate, UIScrollViewDelegate, WKScriptMessageHandler {
       func webView(_ webView: WKWebView, decidePolicyFor navigationAction: WKNavigationAction, decisionHandler: @escaping (WKNavigationActionPolicy) -> Void) {
           webView.configuration.websiteDataStore.httpCookieStore.getAllCookies { cookies in
               for cookie in cookies {
                   HTTPCookieStorage.shared.setCookie(cookie)
               }
           }
       }

       func webView(_ webView: WKWebView, didFinish navigation: WKNavigation!) {
           webView.configuration.websiteDataStore.httpCookieStore.getAllCookies { cookies in
               for cookie in cookies {
                   HTTPCookieStorage.shared.setCookie(cookie)
               }
           }
       }
   }
   ```

2. HTTPCookieStorage에 저장된 내용은 필요시 UserDefault에 보존해 둘 수 있으며, 저장된 쿠키 내용은 WebView를 실행할 때 WebsiteDataStore의 쿠키 내용을 동기화할 때 사용합니다.

   ```swift
   // UserDefault에 저장
   class Coordinator: NSObject, WKNavigationDelegate, WKUIDelegate, UIScrollViewDelegate, WKScriptMessageHandler {
       override func observeValue(forKeyPath keyPath: String?, of object: Any?, change: [NSKeyValueChangeKey : Any]?, context: UnsafeMutableRawPointer?) {
           self.webView?.configuration.websiteDataStore.httpCookieStore.getAllCookies { cookies in
               let cookieDicts = cookies.map { $0.properties }
               UserDefaults.standard.set(cookieDicts, forKey: "savedCookies")
           }
       }
   }

   // WebsiteDataStore 쿠키 동기화
   struct WebViewRepresenntable: UIViewRepresentable {
       func makeUIView(context: Context) -> WKWebView {
           if let cookieDicts = UserDefaults.standard.array(forKey: "savedCookies") as? [[HTTPCookiePropertyKey: Any]] {
               for cookieDict in cookieDicts {
                   if let cookie = HTTPCookie(properties: cookieDict) {
                   webConfiguration.websiteDataStore.httpCookieStore.setCookie(cookie)
                   }
               }
           }
       }
   }
   ```

## 2. 새창 열기

1. 동일한 웹뷰 형식의 새창을 생성해야 할 경우 새로운 뷰를 만든 뒤 현재 뷰에 subView로 추가해 줍니다.

   ```swift
   class ViewController: UIViewController, WKUIDelegate {
       var webView: WKWebView!

       override func viewDidLoad() {
           super.viewDidLoad()
           webView = WKWebView(frame: self.view.frame)
           webView.uiDelegate = self
           self.view.addSubview(webView)

           let url = URL(string: "https://yourwebsite.com")!
           let request = URLRequest(url: url)
           webView.load(request)
       }

       func webView(_ webView: WKWebView, createWebViewWith configuration: WKWebViewConfiguration, for navigationAction: WKNavigationAction, windowFeatures: WKWindowFeatures) -> WKWebView? {
           if navigationAction.targetFrame == nil {
               webView.load(navigationAction.request)
           }
           return nil
       }
   }
   ```

- 하이브리드 앱에서 웹뷰 내에서 새창을 열기 위해서는 별도의 처리가 필요합니다. 위의 코드 예제에서는 ios 새창 열기를 처리하는 방법을 보여줍니다.

- WKUIDelegate를 사용하여 새창 열기 요청을 가로채고, 동일한 웹뷰에서 URL을 로드합니다.

2. 특정 링크에서 외부 브라우저를 띄워야 할 경우에는 기존 웹뷰의 이동을 cancel처리하고, UIApplication.shared.open을 활용합니다.
   ```swift
   func webView(_ webView: WKWebView, decidePolicyFor navigationAction: WKNavigationAction, decisionHandler: @escaping (WKNavigationActionPolicy) -> Void) {
       if let navigationUrl = navigationAction.request.url, navigationUrl.absoluteString.contains("kakao.com") {
           UIApplication.shared.open(navigationUrl)
           decisionHandler(.cancel)
           return
       }
       decisionHandler(.allow)
   }
   ```
