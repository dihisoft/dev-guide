# Node.js 배포 전략

이 문서는 Node.js 애플리케이션을 PM2를 이용하여 무중단 배포하는 전략을 설명합니다.

## 목차

1. [기본 배포 절차](#기본-배포-절차)
2. [PM2 설정](#pm2-설정)
3. [환경별 시작 스크립트](#환경별-시작-스크립트)
4. [무중단 배포 전략](#무중단-배포-전략)

## 기본 배포 절차

Node.js 애플리케이션을 배포하는 기본 절차는 다음과 같습니다:

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
module.exports = {
  apps: [
    {
      name: "dihisoft-dev-backend",
      script: "dist/src",
      instances: 2,
      exec_mode: "cluster",
      autorestart: false,
      watch: false,
      env: {
        PORT: 4000,
        NODE_ENV: "dev",
      },
    },
    {
      name: "dihisoft-stg-backend",
      script: "dist/src",
      instances: 1,
      exec_mode: "cluster",
      autorestart: false,
      watch: false,
      env: {
        PORT: 4000,
        NODE_ENV: "stg",
      },
      wait_ready: true,
      listen_timeout: 50000,
      kill_timeout: 5000,
    },
    {
      name: "dihisoft-backend",
      script: "dist/src",
      instances: 0,
      exec_mode: "cluster",
      autorestart: true,
      watch: false,
      env: {
        PORT: 4000,
        NODE_ENV: "production",
      },
      wait_ready: true,
      listen_timeout: 50000,
      kill_timeout: 5000,
    },
  ],
};
```

## 환경별 시작 스크립트

1. package.json 파일에서 환경별로 애플리케이션을 시작하는 스크립트는 다음과 같습니다:

```json
{
  "scripts": {
    "start:local": "NODE_ENV=local ts-node-dev --no-notify --respawn --transpile-only src/index.ts",
    "start:dev": "pm2 startOrReload ecosystem.config.js --only dihisoft-dev-backend --update-env",
    "start:stg": "pm2 startOrReload ecosystem.config.js --only dihisoft-stg-backend --update-env",
    "start:prod": "pm2 startOrReload ecosystem.config.js --only dihisoft-backend --update-env",
    "build": "npm -s run clean && npm -s run generate && tsc"
  }
}
```

2. 각 스크립트의 설명은 다음과 같습니다:

```
start:local: 로컬 환경에서 개발 서버를 시작합니다.
start:dev: 개발 환경에서 PM2를 이용하여 애플리케이션을 시작하거나 재시작합니다.
start:stg: 스테이징 환경에서 PM2를 이용하여 애플리케이션을 시작하거나 재시작합니다.
start:prod: 프로덕션 환경에서 PM2를 이용하여 애플리케이션을 시작하거나 재시작합니다.
build: 애플리케이션을 빌드합니다. (클린업, 파일 생성, TypeScript 컴파일)
```

## 무중단 배포 전략

무중단 배포를 구현하기 위해 PM2의 클러스터 모드와 startOrReload 명령을 사용합니다. 이를 통해 새로운 코드가 배포되는 동안에도 애플리케이션의 가용성을 유지할 수 있습니다.

### 클러스터 모드 설정

- PM2의 클러스터 모드를 사용하여 다중 인스턴스를 실행함으로써 애플리케이션의 가용성을 높이고, 무중단 배포를 가능하게 합니다. ecosystem.config.js 파일에서 exec_mode를 cluster로 설정하고, instances를 원하는 개수로 지정합니다.

### startOrReload 명령 사용

startOrReload 명령은 새로운 인스턴스를 시작하면서 이전 인스턴스를 종료하지 않고, 새로운 인스턴스가 준비된 후에 이전 인스턴스를 종료합니다. 이를 통해 무중단 배포를 구현할 수 있습니다.

### wait_ready, listen_timeout, kill_timeout 설정

- wait_ready: 이 설정이 true로 설정되면, PM2는 애플리케이션이 process.send('ready') 메시지를 보낼 때까지 대기합니다. 이를 통해 애플리케이션이 완전히 시작될 때까지 새로운 요청을 받지 않도록 할 수 있습니다.

- listen_timeout: PM2가 새로운 인스턴스가 준비되기를 기다리는 최대 시간(밀리초)입니다. 이 시간이 초과되면, PM2는 인스턴스가 준비되지 않았다고 간주하고 롤백할 수 있습니다. 기본값은 5000 밀리초입니다.

- kill_timeout: PM2가 종료 신호를 보낸 후 프로세스가 강제로 종료되기 전에 기다리는 시간(밀리초)입니다. 이 시간 내에 프로세스가 종료되지 않으면 강제로 종료됩니다. 기본값은 1600 밀리초입니다.

이와 같은 방식으로 PM2를 사용하여 무중단 배포를 구현할 수 있습니다. 각 단계에서 필요한 설정과 절차를 따라 애플리케이션의 가용성을 유지하면서 효율적으로 배포할 수 있습니다.
