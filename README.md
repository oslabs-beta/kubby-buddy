## Table of Contents

- [About](#about)
- [Demo](#demo)
- [Setup](#setup)
- [File Structure](#file-structure)
- [Contributing](#contibuting)
- [Progress](#progress)
- [Meet the Team](#meet-the-team)
- [License](#license)

<p align="center">
  <img src="./src/assets/logo.png">
</p>

## ABOUT

**Kubby Buddy** is your container manegment buddy, giving you an easy to use GUI for all your Docker needs. All you need to do is launch our application, and your local images will load into our app, from there you can easily view, launch, stop and even delete your containers and images straight from our app. We also include metrics and even averages of your CPU and memory usgage utilizing a containerized database running on your local machine.

<div align="center">
  <img src="https://img.shields.io/badge/circleci-343434?style=for-the-badge&logo=circleci&logoColor=white"/>
  <img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white"/>
  <img src="https://img.shields.io/badge/Chart.js-FF6384?style=for-the-badge&logo=chartdotjs&logoColor=white"/>
  <img src="https://img.shields.io/badge/Cypress-17202C?style=for-the-badge&logo=cypress&logoColor=white"/>
  <img src="https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white"/>
  <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white"/>
  <img src="https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white"/>
  <img src="https://img.shields.io/badge/ts--node-3178C6?style=for-the-badge&logo=ts-node&logoColor=white"/>
  <img src="https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white"/>
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB"/>
  <img src="https://img.shields.io/badge/React_Query-FF4154?style=for-the-badge&logo=React_Query&logoColor=white"/>
  <img src="https://img.shields.io/badge/Sass-CC6699?style=for-the-badge&logo=sass&logoColor=white"/>
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white"/>
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white"/>
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white"/>
</div>

## Demo

Here we can see creating a container from an image.
<img src="./src/assets/Main_App_Images.gif"/>

Here we can see our running containers, starting and stopping those containers as well as the logs for those containers.
<img src="./src/assets/Main_App_Containers.gif"/>

Here we create a new volume, then delete it.
<img src="./src/assets/Main_App_Volumes.gif"/>

## SETUP

Follow these steps for easy setup.

1. Fork and clone this repository.

```bash
git clone https://github.com/<your-github-username>/kubby-buddy.git
```

2. Navigate to the directory of the cloned repository.

```bash
cd kubby-buddy
```

3. Install the npm packages.

```bash
npm install
```

4. Start kubby buddy in your terminal.

```bash
npm start
```

5. In your browser open 'http://localhost:8080/'.

And you're done, enjoy the simplicity of using your new container management buddy.

## File Structure

```
.
├── LICENSE
├── README.md
├── __mocks__
│   ├── dockerode.ts
│   ├── fileMock.ts
│   ├── node-fetch.ts
│   └── urlMock.ts
├── __tests__
│   ├── controllers
│   └── routes
├── babel.config.js
├── cypress
│   ├── e2e
│   ├── fixtures
│   ├── integration
│   └── support
├── cypress.config.ts
├── docker-compose.yml
├── jest.config.ts
├── package-lock.json
├── package.json
├── server
│   ├── controllers
│   ├── db.ts
│   ├── models
│   ├── routes
│   ├── server.ts
│   └── util.ts
├── src
│   ├── App.scss
│   ├── App.tsx
│   ├── UserContext.tsx
│   ├── assets
│   ├── components
│   ├── global.d.ts
│   ├── index.html
│   ├── index.tsx
│   └── types.ts
├── tsconfig.json
├── types.ts
└── webpack.config.cjs
```

## Contibuting

Contributing is what makes the open source community great. If you want to contribute to this project, you can follow these guidelines.

- Fork and clone the repository.
- Branch off the dev branch, with a branch name starting in feat, fix, bug, docs, test, wip or merge, then adding a new folder named whatever it is you are adding. (ex. feat/database)
- When you commit, be sure to follow [conventional commit](https://www.conventionalcommits.org/en/v1.0.0/) standards.
- Once your new feture is built out, you can submit a pull request to dev.

## Progress

| Feature | Status |
| ------- | ------ |
|         | ✅     |
|         | ✅     |
|         | ✅     |
|         | ✅     |
|         | ⏳     |
|         | ⏳     |
|         | ⏳     |
|         | 🙏🏻     |

## Meet the Team!

<table align="center">
  <tr>
    <td align="center">
      <img src="https://avatars.githubusercontent.com/u/123416896?v=4" width="100"/>
      <br />
      <sub><b>Chang Moon</b></sub>
      <br />
      <a href="https://www.linkedin.com/in/kasualkid12/"><img src="./src/assets/linkedin-favicon.png" width="20"/></a>
      <a href="https://www.linkedin.com/in/kasualkid12/"><img src="./src/assets/github-favicon.png" width="20"/></a>
    </td>
    <td align="center">
      <img src="https://avatars.githubusercontent.com/u/126903033?v=4" width="100"/>
      <br />
      <sub><b>Josh Goo</b></sub>
      <br />
      <a href="https://www.linkedin.com/in/kasualkid12/"><img src="./src/assets/linkedin-favicon.png" width="20"/></a>
      <a href="https://www.linkedin.com/in/kasualkid12/"><img src="./src/assets/github-favicon.png" width="20"/></a>
    </td>
    <td align="center">
      <img src="https://avatars.githubusercontent.com/u/108921232?v=4" width="100"/>
      <br />
      <sub><b>Steve Lemlek</b></sub>
      <br />
      <a href="https://www.linkedin.com/in/kasualkid12/"><img src="./src/assets/linkedin-favicon.png" width="20"/></a>
      <a href="https://www.linkedin.com/in/kasualkid12/"><img src="./src/assets/github-favicon.png" width="20"/></a>
    </td>
    <td align="center">
      <img src="https://avatars.githubusercontent.com/u/22490059?v=4" width="100"/>
      <br />
      <sub><b>Trey Walker</b></sub>
      <br />
      <a href="https://www.linkedin.com/in/kasualkid12/"><img src="./src/assets/linkedin-favicon.png" width="20"/></a>
      <a href="https://www.linkedin.com/in/kasualkid12/"><img src="./src/assets/github-favicon.png" width="20"/></a>
    </td>
    <td align="center">
      <img src="https://avatars.githubusercontent.com/u/127268892?v=4" width="100"/>
      <br />
      <sub><b>William Reilly</b></sub>
      <br />
      <a href="https://www.linkedin.com/in/kasualkid12/"><img src="./src/assets/linkedin-favicon.png" width="20"/></a>
      <a href="https://www.linkedin.com/in/kasualkid12/"><img src="./src/assets/github-favicon.png" width="20"/></a>
    </td>
  </tr>
</table>

## License

This project is licensed under the terms of the [MIT LICENSE](./LICENSE).
