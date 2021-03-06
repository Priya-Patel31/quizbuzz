import { Server, Model, RestSerializer } from "miragejs";
import {
  loginHandler,
  signupHandler,
} from "./backend/controllers/AuthController";
import { categories } from "./backend/db/categories";
import {
  getAllCategoriesHandler,
  getCategoryHandler,
} from "./backend/controllers/CategoryController";
import { users } from "./backend/db/users";

import { quizzes } from "./backend/db/quizzes";
import { getQuizById } from "./backend/controllers/QuizController";

export function makeServer({ environment = "development" } = {}) {
  return new Server({
    serializers: {
      application: RestSerializer,
    },
    environment,
    // TODO: Use Relationships to have named relational Data
    models: {
      category: Model,
      user: Model,
      quizzes : Model
    },

    // Runs on the start of the server
    seeds(server) {
      server.logging = false;
      categories.forEach((item) => server.create("category", { ...item }));
      users.forEach((item) =>
        server.create("user", {
          ...item
        })
      );
      quizzes.forEach((item) => {
        server.create("quiz", { ...item });
      });
    },

    routes() {
      this.namespace = "api";
      // auth routes (public)
      this.post("/auth/signup", signupHandler.bind(this));
      this.post("/auth/login", loginHandler.bind(this));


      // TODO: POST VIDEO TO DB

      // categories routes (public)
      this.get("/categories", getAllCategoriesHandler.bind(this));
      this.get("/categories/:categoryId", getCategoryHandler.bind(this));

  
      //quiz routes
      this.get("/quiz/:quizId", getQuizById.bind(this));
    },
  });

}
