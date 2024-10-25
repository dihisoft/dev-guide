# iOS Version Guide

- iOS 배포를 위해 버전 관리하는 방법을 설명합니다.

## 목차

- [1. 버전 관리](#1-버전-관리)

## 1. 버전 관리

### 1-1. 버전 번호 구성

iOS 애플리케이션의 버전 번호는 다음과 같은 형식으로 구성됩니다.

- **버전 번호 (CFBundleShortVersionString)**: 사용자에게 표시되는 버전 번호입니다. 일반적으로 `MAJOR.MINOR.PATCH` 형식을 사용합니다.
- **빌드 번호 (CFBundleVersion)**: 각 빌드에 대해 고유한 정수를 사용합니다. Apple은 빌드 번호가 높은 IPA를 최신 버전으로 간주합니다.

### 1-2. 버전 번호 증가 규칙

1. **MAJOR**: 호환되지 않는 API 변경이 있을 때 증가합니다.
2. **MINOR**: 하위 호환성을 유지하면서 새로운 기능을 추가할 때 증가합니다.
3. **PATCH**: 하위 호환성을 유지하면서 버그를 수정할 때 증가합니다.

### 1-3. 예시

- `CFBundleShortVersionString: "1.1.0"`
- `CFBundleVersion: "2"`
