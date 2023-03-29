# Tehnicki Pregled - WebService
<a name="readme-top"></a>

[![LinkedIn][linkedin-shield]][linkedin-url]



<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/Aleksa0308/TehnickiPregledWebService">
    <h1>PREGLED+</h1>
  </a>
</div>

<!-- ABOUT THE PROJECT -->
## About The Project

[![Image from Gyazo](https://i.gyazo.com/db578271d43dc722c6f72e604eab3efd.png)](https://gyazo.com/db578271d43dc722c6f72e604eab3efd)

An easy way to keep a record of all vehicles! The Web Service makes it easy to input all the necesery data and save it to the database! The web service also has a feature that alowes the user the save the data in an Excel sheet!
The user at the end of the work day simple input all the information. Saves the data in the database and download the info in a excel sheet!
Admin has the ability to view the statistics from a selected period of time. Also Admin can download all relevant stats in an excel sheet!
The App autmomaticly calculates all the payed prices, total amout of vehicles, types of vehicles, amount of vehicles each agency had, and the total of all mentoned categories.
The database consists of Users, Specifications, Types of vehicles, Agencies, Brands of cars, motorcycles, Tractors etc.


## Green Border around the elements and green number indicates that those elements are SAVED in the database, no Border and blue number indicates that the element isn't save!
## Elements can be edited and deleted!


<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

React.js and TailwindCSS were used on the frontend, while the backend was bulid using Node.js with Express.js, database built using MySQL, backend calls sent to the database were made using Sequelize!
Authentication and authorization made using JWT!

* [![React][React.js]][React-url]
* [![Express.js][Express.js]][Express-url]
* [![TailwindCSS][TailwindCSS]][Tailwind-url]
* [![Chart.js][Chart.js]][Chart-url]
* [![MySQL][MySQL]][MySQL-url]
* [![Sequelize][Sequelize]][Sequelize-url]
* ![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Statistics Page
[![Image from Gyazo](https://i.gyazo.com/7d85ffcc59c385291da8cc611fa42b7a.png)](https://gyazo.com/7d85ffcc59c385291da8cc611fa42b7a)

Statisctics page displays all relevet information depenting on the inputed dates at the top. Doughnut chart displays total amount of vehicles depenting on the agency, the card to the right displays total amount, and the total amount that has been payed. And the tables below display display total stats depending on the agency. The green button 'Preuzmi' allows the Admin to download the statistics to an Excel sheet!

### Admin Page

[![Image from Gyazo](https://i.gyazo.com/f9dacdbe2a1c86f7fd0aba63d59980cb.png)](https://gyazo.com/f9dacdbe2a1c86f7fd0aba63d59980cb)

Gives all the authority and all CRUD operations to the Admin user. If he edits an agency name, it updates all rows in the Specification datebase so that the Statistics stay relevant.

### Downloading data to Excel Sheets
[![Image from Gyazo](https://i.gyazo.com/2dcb64fe0fdf7260577437f3a5d67542.png)](https://gyazo.com/2dcb64fe0fdf7260577437f3a5d67542)

### How the data looks

[![Image from Gyazo](https://i.gyazo.com/8da7fc8c578a4e2aebde9e853bcf3471.png)](https://gyazo.com/8da7fc8c578a4e2aebde9e853bcf3471) [![Image from Gyazo](https://i.gyazo.com/873563ec3274ea8551a31666508322be.png)](https://gyazo.com/873563ec3274ea8551a31666508322be)



<!-- CONTACT -->
## Contact

Aleksa Stojanovic - aleksas0308@gmail.com

Project Link: https://github.com/Aleksa0308/TehnickiPregledWebService

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/aleksa0308/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/

[Express.js]: https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB
[Express-url]: https://expressjs.com/
[TailwindCSS]: https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white
[Tailwind-url]: https://tailwindcss.com/
[Chart-url]: https://www.chartjs.org/
[Chart.js]: https://img.shields.io/badge/chart.js-F5788D.svg?style=for-the-badge&logo=chart.js&logoColor=white
[MySQL]: https://img.shields.io/badge/mysql-%2300f.svg?style=for-the-badge&logo=mysql&logoColor=white
[MySQL-url]: https://www.mysql.com/
[Sequelize]: https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=Sequelize&logoColor=white
[Sequelize-url]: https://sequelize.org/
