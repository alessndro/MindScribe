<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->
<a name="readme-top"></a>

<!-- PROJECT LOGO -->

<h1 align="center">Welcome to MindScribe 👋</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000" />
</p>

> MindScribe is a revolutionary web application that combines the power of React, React Router, external APIs, and serverless functions to enhance your learning experience. Designed with simplicity and efficiency in mind, MindScribe empowers users with a unique platform for extracting valuable insights from videos or articles, transforming them into comprehensive summaries, and generating practice questions for further engagement.

### 🚀 [The Story](https://lighthearted-tulumba-ad8574.netlify.app)

In the fast-paced world of valuable information, keeping up with educational videos can be a challenge. I found myself in this situation, unable to allocate hours to watch these videos due to my increasingly busy schedule. Still, my passion for staying informed persisted.

To address this need for quick and efficient knowledge absorption, I conceptualized MindScribe. This platform was designed to provide concise summaries of investment-related videos and articles. But it didn't stop there. I wanted it to be a place where users could not only read summaries but also practice and ask questions. MindScribe was conceived as a solution to my own problem, and it soon became evident that many others faced a similar dilemma.

The development of MindScribe was driven by my determination to create a tool that could offer more than just condensed content. I envisioned a platform that would empower users with interactive learning and expert guidance.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### 🧠 [The Logic](https://lighthearted-tulumba-ad8574.netlify.app)

The MindScribe website is built on React, serving as the primary framework for its frontend development. Firebase is utilized for user authentication, ensuring secure login processes. Additionally, Firebase functions as the database for storing and managing summaries, streamlining data retrieval and storage.

The development of MindScribe involves the integration of various APIs to enhance the summarization process for both articles and videos. For video content, an initial API is employed to obtain a transcript. Subsequently, for both video and article content, a summarize API from Rapid API is utilized to condense the text before passing it to the OpenAI API.

This two-step summarization process optimizes the utilization of the OpenAI API, enabling the generation of comprehensive summaries with embedded questions. By systematically employing these APIs, MindScribe achieves a nuanced approach to content summarization, ensuring an enriched user experience and facilitating interactive learning.

Netlify plays a crucial role in the implementation of serverless functions and management of environment variables. This combination of technologies aims to create an efficient and dynamic platform, delivering interactive learning and expert guidance beyond traditional content-focused websites

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### 🏠 [Homepage](https://lighthearted-tulumba-ad8574.netlify.app)

![Homepage demo](https://github.com/alessndro/MindScribe/blob/main/src/assets/home.gif)

## Home
![Homepage](https://github.com/alessndro/MindScribe/blob/main/src/assets/home.png)

## Dashboard
![Homepage](https://github.com/alessndro/MindScribe/blob/main/src/assets/dashboard.png)

## Dashboard - Summary
![Summary](https://github.com/alessndro/MindScribe/blob/main/src/assets/dashboardSummary.png)

## Dashboard - Practice
![Practice](https://github.com/alessndro/MindScribe/blob/main/src/assets/dashboardPractice.png)

## Dashboard - Tutor
![Tutor](https://github.com/alessndro/MindScribe/blob/main/src/assets/dashboardTutor.png)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### ✨ [Demo](https://lighthearted-tulumba-ad8574.netlify.app)

## Install

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/your-username/your-repository.git
   cd your-repository
   ```

2. **Install Node.js:**

   Make sure you have Node.js installed on your system. You can download it from [nodejs.org](https://nodejs.org/).

3. **Install Dependencies:**

   Use npm or yarn to install project dependencies listed in `package.json`:

   ```bash
   npm install
   # or
   yarn install
   ```

4. **Set Up Environment Variables:**

   Create a `.env` file in the project root directory and add the necessary environment variables for your project. Ensure you set the required variables for Netlify serverless functions and any other APIs you are using.

5. **Run the Development Server:**

   Start the development server to run your React application.

   ```bash
   npm run dev
   # or
   yarn dev
   ```

6. **View the Application:**

   Open your web browser and go to `http://localhost:3000` to access the running application.

7. **Explore the Project:**

   You can now explore and interact with your project, including its React components, React Router routes, and any serverless functions you have set up.

8. **Build for Production:**

   When you're ready to deploy your project, build the production-ready version:

   ```bash
   npm run build
   # or
   yarn build
   ```

9. **Deployment:**

   Deploy your project to a hosting service like Netlify, Vercel, or any other of your choice. Make sure to configure the environment variables in your hosting service to match those defined in your `.env` file.

10. **Enjoy Your Application:**

   Once deployed, your project will be accessible to users on the internet. Enjoy your creation!

If you encounter any issues during the installation process or while running the project, please refer to the project's documentation or seek assistance as needed.
```
Remember to replace `"your-username/your-repository"` with the actual URL of your Git repository. Additionally, make sure to populate the `.env` file with the required environment variables for your specific project.
```
<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Built With

* React: At the core of Mindscribe is React, a JavaScript library for building user interfaces. React allows for the creation of dynamic and responsive web applications with its component-based architecture.

* React Router: Mindscribe uses React Router to enable smooth navigation. It provides the ability to create multiple views and routes within a single-page application, enhancing user experience.

* OpenAI API: Mindscribe integrates the OpenAI API to deliver text summarization and generate practice questions. OpenAI's AI models extract key information and create educational content, enhancing the learning experience.

* RapidAPI: To streamline the summarization process, Mindscribe makes use of RapidAPI, a platform that connects developers with a wide range of APIs. RapidAPI facilitates the quick development and integration of third-party services and data sources.

* Netlify: Netlify was used for hosting the website. Furthermore, to hide my API keys I made use of severless function and environment variables, which are both part of netlify's features.

* Additional Libraries: Mindscribe relies on additional libraries and functions to optimize its features. For instance, Firebase is employed for user authentication and Firestore for database management, ensuring secure user interactions and data storage. Various other libraries and functions work together to enhance Mindscribe's overall efficiency and effectiveness.

[![React][React.js]][React-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTACT -->
## Author

👤 **Alessandro Degenkamp**

* Website: http://alessndro.nl
* Github: [@Alessndro](https://github.com/Alessndro)
* LinkedIn: [@https:\/\/www.linkedin.com\/in\/alessandro-degenkamp-390a231b5\/](https://linkedin.com/in/https:\/\/www.linkedin.com\/in\/alessandro-degenkamp-390a231b5\/)

## Show your support

Give a ⭐️ if this project helped you!

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/othneildrew/Best-README-Template.svg?style=for-the-badge
[contributors-url]: https://github.com/alessndro/MindScribe/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/othneildrew/Best-README-Template.svg?style=for-the-badge
[forks-url]: https://github.com/alessndro/MindScribe/network/members
[stars-shield]: https://img.shields.io/github/stars/othneildrew/Best-README-Template.svg?style=for-the-badge
[stars-url]: https://github.com/othneildrew/Best-README-Template/stargazers
[issues-shield]: https://img.shields.io/github/issues/othneildrew/Best-README-Template.svg?style=for-the-badge
[issues-url]: https://github.com/alessndro/MindScribe/issues
[license-shield]: https://img.shields.io/github/license/othneildrew/Best-README-Template.svg?style=for-the-badge
[license-url]: https://github.com/othneildrew/Best-README-Template/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: [https://linkedin.com/in/othneildrew](https://www.linkedin.com/in/alessandro-degenkamp-390a231b5/)
[product-screenshot]: images/screenshot.png
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Vue.js]: https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D
[Vue-url]: https://vuejs.org/
[Angular.io]: https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white
[Angular-url]: https://angular.io/
[Svelte.dev]: https://img.shields.io/badge/Svelte-4A4A55?style=for-the-badge&logo=svelte&logoColor=FF3E00
[Svelte-url]: https://svelte.dev/
[Laravel.com]: https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white
[Laravel-url]: https://laravel.com
[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com
[JQuery.com]: https://img.shields.io/badge/jQuery-0769AD?style=for-the-badge&logo=jquery&logoColor=white
[JQuery-url]: https://jquery.com 
