## Table of Contents

- [About](#about)
- [Setup](#setup)
- [File Structure](#file-structure)
- [Contributing](#contibuting)
- [Meet the Team](#meet-the-team)

<p align="center">
  <img src="./src/assets/logo.png">
</p>

## ABOUT

**Kubby Buddy** is your container manegment buddy, giving you an easy to use GUI for all your Docker needs. All you need to do is launch our application, and your local images will load into our app, from there you can easily view, launch, stop and even delete your containers and images straight from our app. We also include metrics and even averages of your CPU and memory usgage utilizing a containerized database running on your local machine.

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
├── __mocks__
├── __tests__
│   ├── controllers
│   └── routes
├── coverage
│   └── lcov-report
├── cypress
│   ├── e2e
│   ├── fixtures
│   ├── integration
│   └── support
├── grafana
│   └── data
├── server
│   ├── controllers
│   ├── models
│   └── routes
└── src
    ├── assets
    └── components
```

## Contibuting

Contributing is what makes the open source community great. If you want to contribute to this project, you can follow these guidelines.

- Fork and clone the repository.
- Branch off the dev branch, with a branch name starting in feat, fix, bug, docs, test, wip or merge, then adding a new folder named whatever it is you are adding. (ex. feat/database)
- When you commit, be sure to follow [conventional commit](https://www.conventionalcommits.org/en/v1.0.0/) standards.
- Once your new feture is built out, you can submit a pull request to dev.

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

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
