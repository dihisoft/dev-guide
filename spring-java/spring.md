# Spring Style Guide

<aside>
💡 본문은 Spring 스타일 가이드 입니다.

</aside>

[Java code style은 여기를 참고해주세요.](./java.md)

## 목차
---
### [1. 소개(Intro)](#1-소개intro)
- [1.1 용어(term)](#11-용어term)
### [2. 패키지 포맷(Package format)](#2-패키지-포맷package-format)
- [2.1 도메인 패키지(domain package)](#21-도메인-패키지domain-package)
- [2.2 글로벌 패키지(global package)](#22-글로벌-패키지global-package)
- [2.3 인프라 패키지(Infra package)](#23-인프라-패키지infra-package)
- [2.4 패키지 구조(package structure)](#24-패키지-구조package-structure)
### [3. 이름(Name)](#3-이름name)
- [3.1 복수, 단수 규칙(Plural and singular rules)](#31-복수-단수-규칙plural-and-singular-rules)
- [3.2 서비스(Service)](#32-서비스service)
- [3.3 컨트롤러(Controller)](#33-컨트롤러controller)
- [3.4 엔티티(Entity)](#34-엔티티entity)
- [3.5 데이터 전송 객체(DTO)](#35-데이터-전송-객체dto)
- [3.6 저장소(Repository)](#36-저장소repository)
- [3.7 타입(Type)](#37-타입type)
- [3.8 구성(Config)](#38-구성config)
### [4. 순서(Ordinary)](#4-순서ordinary)
- [4.1 어노테이션(Annotation)](#41-어노테이션annotation)
	- [4.1.1 Entity Class / Dto Class](#411-entity-class--dto-class)
	- [4.1.2 Entity 내 Column](#412-entity-내-column)
	- [4.1.3 DTO 내 필드(Field in DTO)](#413-dto-내-필드field-in-dto)
	- [4.1.4 서비스 클래스(Service class)](#414-서비스-클래스service-class)
	- [4.1.5 컨트롤러 클래스(Controller class)](#415-컨트롤러-클래스controller-class)
	- [4.1.6 컨트롤러 매개변수(Controller parameter)](#416-컨트롤러-매개변수controller-parameter)
- [4.2 검증 메소드(Validation Method)](#42-검증-메소드validation-method)
### [5. 주석 템플릿(Comments Templete)](#5-주석-템플릿comments-templete)


---
# 1. 소개(Intro)

---

본 문서는 Nangman의 Spring 스타일을 설명합니다.

## 1.1 용어(term)

---

1. 로직(Logic) 용어는 아래를 의미합니다.
    - 메소드(Method)
    - 클래스(Class)
    - 인터페이스(Interface)
2. 도메인(Domain) 용어는 아래를 의미합니다.
    - 프로그램 상 해결하고자 하는 문제 혹은 기능 영역

<aside>
💡 본문에서 사용하진 않으나, 네트워크 상 식별가능한 호스트영역을 의미하는 Domain Name도 위 단어를 사용합니다.

</aside>

1. 서비스(Service) 용어는 아래를 의미합니다.
    - 비즈니스 상 필요한 기능을 수행하는 영역 혹은 로직
2. 컨트롤러(Controller) 용어는 아래를 의미합니다.
    - API 엔드포인트를 정의하고, 제공하는 영역 혹은 로직
3. 엔티티(Entity) 용어는 아래를 의미합니다.
    - 데이터 베이스의 열과 행을 다룰 수 있는 영역 혹은 로직
4. 데이터 전송 객체(Data Transfer Object) 용어는 아래를 의미합니다.
    - DTO라고 하며 데이터 전송만을 위해 사용하는 객체
5. 저장소(Repository) 용어는 아래를 의미합니다.
    - 데이터 베이스에 접근하는 메서드 혹은 인터페이스가 정의된 영역
6. 구성(Config)
    - 동작을 수행하는데 필요한 설정파일 영역 혹은 로직
7. 타입(Type) 용어는 아래를 의미합니다.
    - Enum Class로 정의된 Type 클래스
    - Type을 DB에 저장할 때는 String으로 저장하고, 클래스나 컬럼 명 또한 접미사로 Type을 붙입니다.
    - Response의 경우, Type은 String 형식으로 반환합니다.
8. 상태(State)
    - Enum Class로 정의된 State 클래스
    - State는 Integer로 구성된 state number와, String으로 구성된  Description을 항상 갖습니다.
    - State를 DB에 저장할 때는 상수로 저장하고, 클래스나 컬럼 명 또한 접미사로 State를 붙입니다.
    - Response의 경우 state는 기본적으로 Integer Type으로 반환합니다.
    - 상황에 따라 FrontEnd 측에서 State에 대한 설명(String)이 필요한 경우 State에 대한 설명을 함께 반환하며, 이 때 JSON Field 이름은 ~~StateDescription의 형식을 가집니다.
9. 검증(Validation) 용어는 아래를 의미합니다.
    - 유효성을 검증하는 영역 혹은 로직
10. 주석 템플릿(Comment(s) Template) 용어는 아래를 의미합니다.
    - 클래스 바로 위 정의되는 코드 작성자의 기본정보 양식

# 2. 패키지 포맷(Package format)

---

<aside>
💡 Nangman은 도메인 별로 패키지를 구분합니다.

</aside>

## 2.1 도메인 패키지(domain package)

---

- 이름에 대문자를 사용하지 않습니다.

<aside>
💡 도메인(domain)은 API 경로 중 하나를 사용하여 구분 짓습니다.

</aside>

- 도메인 패키지는 여러 개의 도메인 패키지를 포함하며 해당 패키지의 구성은 아래와 같습니다.
    - 컨트롤러 패키지(controller package) : 컨트롤러 로직을 포함
    - 서비스 패키지(service package) : 서비스 로직을 포함
    - DTO 패키지(dto package) : DTO 로직을 포함
    - 엔티티 패키지(entity package) : 엔티티 로직과 저장소 로직을 포함

## 2.2 글로벌 패키지(global package)

---

- 이름에 대문자를 사용하지 않습니다.
- 글로벌 : 어느 한 도메인에 속하지 않고, 도메인 내에서 광범위하게 사용하는 로직의 구분
- 글로벌 패키지는 아래 패키지를 포함합니다.
    - 구성(config) : 구성 로직을 포함
    - 예외(exception) : 예외처리 로직을 포함
    - 타입(type) : 타입 로직을 포함
    - 유틸(util) : 이로운 기능인 유틸 로직을 포함

## 2.3 인프라 패키지(Infra package)

---

- 이름에 대문자를 사용하지 않습니다.
- 인프라 : 외부 API를 사용하는 로직의 구분
- 인프라 패키지의 구성은 아래와 같습니다.
    - 서비스 패키지(service package) : 서비스 로직을 포함
    - DTO 패키지(dto package) : DTO 로직을 포함
    - 엔티티 패키지(entity package) : 엔티티 로직과 저장소 로직을 포함

<aside>
💡 글로벌 패키지는 도메인 패키지와 닮아 있지만, 컨트롤러를 생성하지 않습니다. 또한 여러 프로젝트에 중복 작성될 가능성이 높습니다.

</aside>

## 2.4 패키지 구조(package structure)

```
(예시)

├── 🗂com.nangman
   ├── domain
   |   ├── user
   |   |   ├── controller
   |   |   ├── dto
   |   |   ├── entity
   |   |   └── service
   |   |
   |   └── post
   |       ├── controller
   |       ├── dto
   |       ├── entity
   |       └── service
   |   
   └── global
       ├── config
       ├── exception
       ├── type
       └── util
```

# 3. 이름(Name)

---

<aside>
💡 로직에 대한 명명 규칙을 설명합니다.

</aside>

## 3.1 복수, 단수 규칙(Plural and singular rules)

---

- 복수는 로직의 반환 결과가 여러 개인 경우를 의미합니다.
- 단수는 로직의 반환 결과가 한 개인 경우를 의미합니다.
- 복, 단수와 관계없이 로직을 설명할 수 있는 정확한 이름을 작성합니다.

```
(예시)

(하나의 게시글)
(O) BoardDetailDto
(X) BoardDto

(게시글 목록)
(O) BoardListDto
```

- 하나의 로직에서 복수와, 단수 로직을 동시에 포함하는 경우 로직이 구분되는 곳에서 이를 정의합니다.

```java

(게시글을 처리하는 서비스 로직)
//BoardService.java

void findAllBoard() { //게시글 목록 반환
	......
}
void findDetailBoard() { //한 개의 게시글 반환
	......
}
```

## 3.2 서비스(Service)

---

- 일반적으로 명사와 명사구로 작성합니다.
- Service 로직의 Class 이름은 Service로 끝납니다.

```
(예시) 
(O) CompanyService
```

## 3.3 컨트롤러(Controller)

---

- 응답 형태에 따라 이름을 구분 짓습니다.
- 일반적으로 명사와 명사구로 작성합니다.
- Controller 로직의 Class 이름은 Controller로 끝납니다.
- RestController 로직의 Class 이름은 ApiController로 끝납니다.

```
(예제)
(O) CompanyApiController
(O) UserController
```

## 3.4 엔티티(Entity)

---

- 일반적으로 명사와 명사구로 작성합니다.
- 명사 혹은 명사 구로 이뤄진 접미사를 추가할 수 있습니다.

```
(예제)
(O) Company
(O) AwsS3
```

## 3.5 데이터 전송 객체(DTO)

---

- 일반적으로 명사와 명사구로 작성합니다.
- 아래와 같은 형태를 따릅니다.
    
    (Name)(Behavior)(Request/Response)(Dto)
    
- Name : 속한 도메인 혹은 잘 설명할 수 있는 명사 및 명사구
- Behavior : 해당 DTO가 수행하는 동작
- Request/Response : 해당 DTO의 용도

- DTO 로직의 Class 이름은 Dto로 끝납니다.

```
(모든 Company Behavior에 대하여 사용하는 DTO)
(O) CompanyRequestDto

(Boss 생성을 요청할 때 사용하는 DTO)
(O) BossCreateRequestDto

(Boss 수정을에 대한 결과를 응답할 때 사용하는 DTO)
(O) BossEditResponseDto
```

## 3.6 저장소(Repository)

---

- Repository 로직의 Class 이름은 Entity에 이름으로 시작하고,  Repository로 끝납니다.
- 단 Repository 형태에 따라 Custom 및 Impl 접미사를 추가할 수 있습니다.

```
(Company Entity에 대하여 사용하는 Repository)
(O) CompanyRepository
(O) CompanyRepositoryCustom
(O) CompanyRepositoryImpl
```

## 3.7 타입(Type)

---

- 일반적으로 명사와 명사구로 작성합니다.
- Type 클래스의 경우 Type으로 끝납니다.

```
(예시)
(O) DomainNameType
(O) RoleType
(O) TargetType
```

## 3.8 구성(Config)

---

- 일반적으로 명사와 명사구로 작성합니다.
- Config 로직의 Class 이름은 Config로 끝납니다.

```
(예시)
(O) KakaoConfig
(O) AwsS3Config
```

# 4. 순서(Ordinary)

---

어노테이션과 메소드의 순서를 다룹니다.

## 4.1 어노테이션(Annotation)

---

- 어노테이션의 구분
    
    ```
    [Lombok]
    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @RequiredArgsConstructor
    @Builder
    @Data
    @ToString
    @EqualsAndHashCode
    
    [JPA - class]
    @Entity
    @MappedSuperClass
    @EntityListener
    @Table
    
    [Jpa - Column]
    @Column
    @JoinColumn
    @NToM
    @Validation (NotNull, NotBlank, min ...)
    @Custom (Merge, etc...)
    @Pattern
    
    [Spring]
    @RestController / @Controller
    @RequestMapping
    @Service
    @Transactional
    @PathVariable
    @RequestPart
    @RequestParam
    @RequestBody
    @Valid
    
    =============
    
    ```
    

<aside>
💡 부등호가 클수록 클래스에 가깝게 등장합니다.

</aside>

### 4.1.1 Entity Class / Dto Class

- @Entity > @Constructor > (@Builder) > @Getter 순서를 가집니다.

```java
(예시)

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class UserEditRequestDto... {

}
```

### 4.1.2 Entity 내 Column

- @Column > @GeneratedValue > @Id 순서를 가집니다.

```java
(예시)

@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
@Column(name = "QNA_ID")
private Long id;
```

- @Column > @JoinColumn > @NToM > @Pattern > @Validation > @Custom 순서를 가집니다.
- NToM : oneTomany 등 테이블 연관관계와 관련된 어노테이션입니다.
- Validation : Max, Min, NotNull 등 값 처리와 관련된 어노테이션입니다.
- Custom : 직접 구현한 어노테이션을 의미합니다.

```java
(예시)

@Custom
@Validation
@Pattern
@NToM
@JoinColumn
@Column
private User user;
```

### 4.1.3 DTO 내 필드(Field in DTO)

- @Pattern > @Validation > @Custom 순서를 가집니다.

```java
(예시)

@Custom
@Validation
@Pattern
private String phoneNumber;
```

### 4.1.4 서비스 클래스(Service class)

- @Service > @Constructor > @Transactional 순서를 가집니다.

```java
(예시)

@Transactional
@RequiredArgsConstructor
@Service
public class UserService{
	...
}
```

### 4.1.5 컨트롤러 클래스(Controller class)

- @Controller > @Constructor > @Mapping 순서를 가집니다.

```java
(예시)

@RequestMapping("/api/v1/post")
@RequiredArgsContructor
@RestController
public class UserApiController{
	...
}
```

### 4.1.6 컨트롤러 매개변수(Controller parameter)

- @Valid와 @RequestBody 등 파라미터의 어노테이션의 줄바꿈은 자율적으로 진행합니다.

```java
@PostMapping("/save")
public Long createUser(@Valid @RequestBody UserRequestDto requestDto){
	....
}
```

## 4.2 검증 메소드(Validation Method)

---

- 메소드 A, B, C가 있고 이를 검증하는 메소드가 각각 a, b, c가 있을 때 각 메소드가 위치하는 순서는 아래와 같습니다.

```java
A
a
B
b
C
c
```

- 공용으로 사용하는 메소드 ab와 abc가 생성된 경우 아래와 같습니다.

```java
A
a
ab
abc
B
b
C
c
```

<aside>
💡 일반 메소드와 검증 메소드의 순서를 아래 예시를 통해 설명합니다.

</aside>

- createUser와 editUser 메소드가 존재
- createUser를 validation하는 validationCreateUserRequest 존재
- editUser를 validation하는 validationEditUserRequest 존재
- createUser와 editUser 메소드에 공용으로 사용하는 validationUserRequest 존재

<aside>
💡 위 상황에서 아래와 같은 순서를 따릅니다.

</aside>

```java
public void createUser() {
	...
}
public void validationCreateUserRequest() {
	...
}
public void validationUserRequest() {
	...
}
public void editUser() {
	...
}
public void validationeditUserRequest() {
	...
}

```

일반화 된 순서는 아래와 같습니다.

# 5. 주석 템플릿(Comments Templete)

---

- class위에 아래와 같은 템플릿을 적용하여 사용합니다.

```
/**
* @date       : ${YEAR}-${MONTH}-${DAY}
* @author     : Minjun-KANG
*/
```
