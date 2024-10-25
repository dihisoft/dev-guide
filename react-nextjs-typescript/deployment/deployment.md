# Next.js 배포 전략

이 문서는 Next.js 애플리케이션을 PM2와 스크립트를 이용하여 무중단 배포하는 전략을 설명합니다.

## 목차

1. [기본 배포 절차](#기본-배포-절차)
2. [PM2 설정](#pm2-설정)
3. [환경별 시작 스크립트](#환경별-시작-스크립트)
4. [무중단 배포 전략](#무중단-배포-전략)

## 기본 배포 절차

Next.js 애플리케이션을 배포하는 기본 절차는 다음과 같습니다:

1. 원격 저장소의 변경 사항을 가져옵니다:

```bash
git fetch
```

2. 최신 변경 사항을 병합합니다:

```bash
git pull
```

3. 애플리케이션을 빌드합니다:

```bash
npm install
npm run build
```

4. PM2를 이용하여 애플리케이션을 시작하거나 재시작합니다:
   - 개발 환경:
     ```bash
     npm run start:dev
     ```
   - 스테이징 환경:
     ```bash
     npm run start:stg
     ```
   - 프로덕션 환경:
     ```bash
     npm run start:prod
     ```

## PM2 설정

1. PM2는 `ecosystem.config.js` 파일을 이용하여 설정됩니다. 설정 파일은 다음과 같습니다:

```javascript
코드 복사
module.exports = {
  apps: [
    // 프로덕션 설정
    {
      name: 'welluga-front-staff',
      script: 'dist/server.js',
      args: 'cross-env NODE_ENV=production',
      cwd: '/home/ec2-user/frontend/welluga-staff-front/current', // 심볼릭 링크 경로
      instances: '2', // 클러스터 모드 활성화
      instance_var: 'INSTANCE_ID',
      exec_mode: 'cluster',
      listen_timeout: 50000,
      kill_timeout: 5000,
      autorestart: true,
      watch: false,
      env: {
        NODE_ENV: 'production',
        PORT: 5001,
      },
    },
    // 스테이징 설정
    {
      name: 'welluga-front-staff-stg',
      script: 'dist/server.js',
      args: 'cross-env NODE_ENV=test',
      cwd: '/var/www/welluga-staff-front/current', // 심볼릭 링크 경로
      instances: '2', // 클러스터 모드 활성화
      instance_var: 'INSTANCE_ID',
      exec_mode: 'cluster',
      listen_timeout: 50000,
      kill_timeout: 5000,
      autorestart: false,
      watch: false,
      env: {
        NODE_ENV: 'test',
        PORT: 4000,
      },
    },
    // 개발 설정
    {
      name: 'welluga-front-staff-dev',
      script: 'dist/server.js',
      args: 'cross-env NODE_ENV=development',
      instances: '2', // 클러스터 모드 활성화
      instance_var: 'INSTANCE_ID',
      exec_mode: 'cluster',
      listen_timeout: 50000,
      kill_timeout: 5000,
      autorestart: false,
      watch: false,
      env: {
        NODE_ENV: 'development',
        PORT: 3000,
      },
    },
  ],
};
```

## 환경별 시작 스크립트

1. package.json 파일에서 환경별로 애플리케이션을 시작하는 스크립트는 다음과 같습니다:

```json
{
  "scripts": {
    "dev:origin": "next dev",
    "dev": "cross-env env-cmd -f .env.development next dev",
    "start:local": "cross-env NODE_ENV=development ENV_FILE=.env.development PORT=3000 node server",
    "build:dev": "cross-env NODE_ENV=development env-cmd -f .env.development next build && tsc --project tsconfig.server.json",
    "start:dev": "pm2 startOrReload ecosystem.config.js --only welluga-front-staff-dev",
    "build:stg": "cross-env NODE_ENV=test env-cmd -f .env.test next build && tsc --project tsconfig.server.json",
    "start:stg": "pm2 startOrReload ecosystem.config.js --only welluga-front-staff-stg",
    "build:prod": "cross-env NODE_ENV=production env-cmd -f .env.production next build && tsc --project tsconfig.server.json",
    "start:prod": "pm2 startOrReload ecosystem.config.js --only welluga-front-staff",
    "lint": "next lint"
  }
}
```

2. 각 스크립트의 설명은 다음과 같습니다:

```
dev:origin: Next.js 기본 개발 서버를 시작합니다.
dev: 개발 환경에서 Next.js 개발 서버를 시작합니다.
start:local: 로컬 환경에서 개발 서버를 시작합니다.
start:local-prod: 로컬 환경에서 프로덕션 모드의 서버를 시작합니다.
build:dev: 개발 환경에서 애플리케이션을 빌드합니다.
start:dev: 개발 환경에서 PM2를 이용하여 애플리케이션을 시작하거나 재시작합니다.
build:stg: 스테이징 환경에서 애플리케이션을 빌드합니다.
start:stg: 스테이징 환경에서 PM2를 이용하여 애플리케이션을 시작하거나 재시작합니다.
build:prod: 프로덕션 환경에서 애플리케이션을 빌드합니다.
start:prod: 프로덕션 환경에서 PM2를 이용하여 애플리케이션을 시작하거나 재시작합니다.
```

## 무중단 배포 전략

무중단 배포를 구현하기 위해 PM2의 클러스터 모드와 startOrReload 명령을 사용합니다. 이를 통해 새로운 코드가 배포되는 동안에도 애플리케이션의 가용성을 유지할 수 있습니다.

### 클러스터 모드 설정

PM2의 클러스터 모드를 사용하여 다중 인스턴스를 실행함으로써 애플리케이션의 가용성을 높이고, 무중단 배포를 가능하게 합니다. ecosystem.config.js 파일에서 exec_mode를 cluster로 설정하고, instances를 원하는 개수로 지정합니다.

### startOrReload 명령 사용

startOrReload 명령은 새로운 인스턴스를 시작하면서 이전 인스턴스를 종료하지 않고, 새로운 인스턴스가 준비된 후에 이전 인스턴스를 종료합니다. 이를 통해 무중단 배포를 구현할 수 있습니다.

### 배포 스크립트

1. 다음은 배포 스크립트의 전체 내용입니다:

```bash
#!/bin/bash

# 현재 심볼릭 링크가 가리키는 경로를 확인하여 CURRENT_PATH 변수에 저장
CURRENT_PATH=$(readlink /var/www/welluga-staff-front/current)

# 현재 경로가 'welluga-staff-front-a'라면 NEW_PATH를 'welluga-staff-front-b'로 설정
# 그렇지 않으면 'welluga-staff-front-a'로 설정
if [ "$CURRENT_PATH" == "/var/www/welluga-staff-front/welluga-staff-front-a" ]; then
  NEW_PATH="/var/www/welluga-staff-front/welluga-staff-front-b"
else
  NEW_PATH="/var/www/welluga-staff-front/welluga-staff-front-a"
fi

# NEW_PATH로 이동
cd ${NEW_PATH}

# 최신 변경사항을 가져오기 위해 Git 저장소에서 fetch 명령어 실행
git fetch

# 'development' 브랜치로 체크아웃
git checkout development

# 'development' 브랜치의 최신 변경사항을 pull
git pull

# 빌드 시작 시간을 'Asia/Seoul' 타임존으로 설정하여 BUILD_START_TIME_KST 파일에 저장
TZ="Asia/Seoul" date '+%Y-%m-%d %H:%M:%S' > BUILD_START_TIME_KST

# 마지막 Git 커밋 메시지를 GIT_MESSAGE 파일에 저장
# 메시지에서 따옴표를 이스케이프 처리하여 저장
git show --summary | sed 's/"/\\"/g' > GIT_MESSAGE

# 프로젝트의 npm 패키지를 설치
npm install

# 스테이징 환경을 위한 빌드를 실행
npm run build-stg

# /var/www/welluga-staff-front/current 심볼릭 링크를 NEW_PATH가 가리키는 경로로 변경
ln -sfn $NEW_PATH /var/www/welluga-staff-front/current

# PM2를 사용하여 'welluga-front-staff-stg' 프로세스를 시작 또는 재로드
pm2 startOrReload ecosystem.config.js --only "welluga-front-staff-stg"
```

### 배포 스크립트 설명

1. 심볼릭 링크를 통한 경로 전환:

readlink /var/www/welluga-staff-front/current 명령어를 통해 현재 배포된 경로를 확인하고, 새 경로로 전환합니다. 이는 현재 실행 중인 애플리케이션을 중단하지 않고 새로운 경로에서 배포를 준비할 수 있게 합니다.

2. 코드 업데이트:

git fetch와 git pull 명령어를 통해 최신 코드를 가져옵니다. 이를 통해 최신 코드로 애플리케이션을 빌드할 수 있습니다.
빌드 정보 기록:

BUILD_START_TIME_KST 파일에 빌드 시작 시간을 기록하고, GIT_MESSAGE 파일에 최신 Git 커밋 메시지를 기록합니다. 이는 배포 버전을 추적하고 문제 발생 시 어떤 코드가 배포되었는지 확인할 수 있게 합니다.

3. 애플리케이션 빌드:

npm install --force로 필요한 패키지를 설치하고, npm run build-stg로 애플리케이션을 빌드합니다. 이는 최신 코드를 기반으로 새로운 빌드를 생성합니다.

4. 심볼릭 링크 업데이트:

ln -sfn $NEW_PATH /var/www/welluga-staff-front/current 명령어를 통해 심볼릭 링크를 새로운 빌드 경로로 업데이트합니다. 이를 통해 새로운 빌드가 준비된 후에 바로 서비스를 전환할 수 있습니다.

5. PM2 재시작:

pm2 startOrReload ecosystem.config.js --only "welluga-front-staff-stg" 명령어를 통해 PM2를 이용하여 애플리케이션을 무중단으로 재시작합니다. 이를 통해 새로운 빌드가 반영된 인스턴스를 실행합니다.

### wait_ready, listen_timeout, kill_timeout 설정

- wait_ready: 이 설정이 true로 설정되면, PM2는 애플리케이션이 process.send('ready') 메시지를 보낼 때까지 대기합니다. 이를 통해 애플리케이션이 완전히 시작될 때까지 새로운 요청을 받지 않도록 할 수 있습니다. 이는 애플리케이션의 안정적인 시작을 보장합니다.

- listen_timeout: PM2가 새로운 인스턴스가 준비되기를 기다리는 최대 시간(밀리초)입니다. 이 시간이 초과되면, PM2는 인스턴스가 준비되지 않았다고 간주하고 롤백할 수 있습니다. 이는 새로운 인스턴스가 예상 시간 내에 준비되지 않을 경우 롤백할 수 있게 하여 서비스 중단을 방지합니다.

- kill_timeout: PM2가 종료 신호를 보낸 후 프로세스가 강제로 종료되기 전에 기다리는 시간(밀리초)입니다. 이 시간 내에 프로세스가 종료되지 않으면 강제로 종료됩니다. 이는 오래 걸리는 종료 프로세스를 강제로 종료하여 자원 누수를 방지합니다.

이와 같은 방식으로 PM2를 사용하여 무중단 배포를 구현할 수 있습니다. 각 단계에서 필요한 설정과 절차를 따라 애플리케이션의 가용성을 유지하면서 효율적으로 배포할 수 있습니다.
