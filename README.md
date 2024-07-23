# Dokumentasi

## Setup App Development Environment

1. Download and install [Visual Studio Code](https://code.visualstudio.com/download)
2. Download / clone this repository to a folder on your computer :
   `git clone https://github.com/habibfr/crud-express-with-repo-patern.git`
3. Start VS Code, open your source code folder and open terminal then run `npm install` to download dependency, this might take a while.
4. Setup your database in `.env` file with your data
5. Run with `npm start`
6. :tada:

## Explanation

### [A. Visual Studio Code](https://code.visualstudio.com/)

Visual Studio Code (VS Code) adalah salah satu kode editor yang dikembangkan oleh Microsoft. VS Code sangat populer di kalangan pengembang karena menyediakan berbagai fitur yang powerful dan fleksibel untuk pengembangan perangkat lunak. Fitur Utama VS Code adalah sebagai berikut :

1.  Code Editing
    Mendukung berbagai bahasa pemrograman dengan fitur seperti syntax highlighting, code completion, linting, dan debugging.

2.  Integrated Terminal
    Terminal bawaan memungkinkan Anda menjalankan perintah langsung dari editor.

3.  Extensions
    VS Code memiliki ekosistem ekstensi yang luas untuk menambahkan fungsionalitas tambahan, seperti integrasi dengan sistem kontrol versi, dukungan bahasa tambahan, tema, dan banyak lagi.

### [B. DBeaver](https://dbeaver.io/)

DBeaver adalah aplikasi database universal yang digunakan untuk manajemen dan administrasi berbagai jenis database. DBeaver mendukung banyak jenis database termasuk MySQL, PostgreSQL, Oracle, SQL Server, SQLite, dan banyak lagi. Fitur Utama DBeaver adalah sebagai berikut :

1.  Database Management
    Menyediakan antarmuka grafis untuk mengelola database, membuat tabel, menjalankan query SQL, dan melihat data.

2.  ER Diagrams
    Mendukung pembuatan diagram ER (Entity-Relationship) untuk desain database.

3.  SQL Editor
    Editor SQL yang kuat dengan fitur seperti syntax highlighting, auto-completion, dan formatting.

### [C. PostgreSQL](https://www.postgresql.org/)

PostgreSQL adalah sistem manajemen basis data relasional (RDBMS) yang bersifat open-source dan canggih. Kelebihan postgreSQL sebagai berikut :

1. OpenSource
   PostgreSQL tersedia secara gratis di bawah lisensi PostgreSQL License, yang mirip dengan lisensi MIT
2. Kinerja
   Mendukung indexing yang canggih (B-tree, Hash, GiST, SP-GiST, GIN, BRIN), optimisasi query, dan caching untuk meningkatkan kinerja query.
3. Keamanan
   Mendukung berbagai fitur keamanan seperti otentikasi pengguna, kontrol akses tingkat baris (Row Level Security), dan enkripsi.

### [D. Sequlize](https://sequelize.org/)

Sequelize adalah ORM (Object-Relational Mapping) untuk Node.js yang mendukung berbagai basis data SQL, termasuk PostgreSQL, MySQL, SQLite, dan MSSQL. Sequelize memungkinkan pengembang untuk berinteraksi dengan basis data menggunakan objek JavaScript daripada menulis query SQL langsung. Berikut adalah beberapa poin utama yang menjelaskan Sequelize:

1. ORM (Object-Relational Mapping)
   Mengkonversi tabel basis data menjadi model JavaScript, memungkinkan pengembang untuk berinteraksi dengan basis data menggunakan objek dan metode.
2. Dukungan Multi-Dialek
   Mendukung berbagai dialek SQL, termasuk PostgreSQL, MySQL, SQLite, dan MSSQL, sehingga memudahkan penggunaan dengan berbagai basis data.
3. Query Builder
   Menyediakan API untuk membangun query SQL yang kompleks menggunakan JavaScript, yang membuat kode lebih mudah dibaca dan dikelola.

#### Installasi

`npm install sequelize`

#### Konfigurasi

```js
const { Sequelize } = require("sequelize");

// Membuat instance Sequelize
const sequelize = new Sequelize("database", "username", "password", {
  host: "localhost",
  dialect: "postgres",
});
```

##### Model

```js
const { DataTypes } = require("sequelize");

const User = sequelize.define("User", {
  // Mendefinisikan atribut model
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  birthday: {
    type: DataTypes.DATE,
  },
});
```

#### Migration

Installasi :
`npm install sequelize-cli`

Membuat file migration :
`npx  sequelize-cli  migration:generate  --name  create-users`

Config Database :

```json
{
  "development": {
    "username": "username",
    "password": "password",
    "database": "database_name",
    "host": "localhost",
    "dialect": "postgres"
  }
}
```

Run Migration :
`npx  sequelize-cli  db:migrate`

### [E. Express JS](https://expressjs.com/)

Express.js adalah framework web minimalis untuk Node.js yang menyediakan berbagai fitur untuk membangun aplikasi web dan API. Dengan Express.js, dapat membuat server HTTP dan mengatur berbagai rute untuk menangani permintaan HTTP.

Installasi :
`npm install express`

init express :

```js
import express from "express";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
```

Membuat route :

```js
import express from "express";
const router = express.Router();

router.get("/users", userController.getUsers);
router.post("/users", userController.createUser);
router.get("/users/:id", userController.getUserById);
router.put("/users/:id", userController.updateUserById);
router.delete("/users/:id", userController.deleteUser);

export { router };
```

#### Controller

```js
import { json } from "sequelize";
import UserService from "../service/user-service.js";

export default class userController {
  static async createUser(req, res, nextFunction) {
    try {
      const user = await UserService.createUser(req.body);
      if (user.error) {
        return res.status(400).json(user);
      }
      return res.status(201).json(user);
    } catch (error) {
      nextFunction(error);
    }
  }
}
```

#### Service

```js
import UserRepository from "../repository/user-repository.js";

export default class UserService {
  static async createUser(user) {
    try {
      return await UserRepository.addUser(user);
    } catch (error) {
      return { error: error.message };
    }
  }
}
```

#### Repository

```js
import { User } from "../models/user-model.js";

export default class UserRepository {
  static async addUser(user) {
    return await User.create(user);
  }
  static async getAllUsers() {
    return await User.findAll();
  }
  static async findUser(id) {
    return await User.findOne({
      where: { id: id },
    });
  }
}
```

### [F. Nodemon](https://nodemon.io/)

Nodemon adalah tool yang membantu pengembang Node.js dengan secara otomatis me-restart aplikasi ketika ada perubahan pada file di direktori.

Installasi :
`npm install nodemen`

Mengubah scripts di _package.json_
`"scripts":  {  "start":  "nodemon index.js"  }`

### [G. Postman](https://www.postman.com/)

Postman adalah aplikasi yang digunakan untuk menguji API dengan mengirim permintaan HTTP dan memeriksa respons yang diberikan oleh server.
