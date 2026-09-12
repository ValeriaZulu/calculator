# 🧮 Full-Stack Neumorphic Calculator

A full-stack web application developed for the **Sezzle Software Engineering Internship Technical Assessment**.

The project features a lightweight REST API backend built with **Go (Golang)** and a responsive, custom neumorphic user interface developed with **React, TypeScript, and Tailwind CSS**.

The application supports basic and advanced arithmetic operations, input validation, error handling, automated testing, and containerized execution with Docker.

**Made by:** Valeria Zuluaga Alzate

---

## 📋 Project Overview

The application follows a client-server architecture where a React frontend communicates with a Go REST API to perform arithmetic operations.

The main goals of the project are:

* Maintainable and readable code.
* Clear separation of responsibilities.
* RESTful API communication.
* Input validation and error handling.
* Unit and integration testing.
* Responsive user interface.
* Simple and reproducible development and deployment setup.

---

## 🏗️ Architecture & Design Decisions

### 1. Backend — Go

* **Standard Library Architecture:** Implemented using Go's standard `net/http` package to minimize external dependencies and keep the service lightweight.
* **Separation of Concerns:** Arithmetic business logic is isolated in `pkg/calculator/service.go`, separated from HTTP handlers to facilitate testing and maintainability.
* **Boundary Validation:** Explicit validation is implemented for cases such as division by zero (`ErrDivisionByZero`) and square roots of negative numbers (`ErrNegativeSqrt`).
* **HTTP Error Handling:** Invalid operations and mathematical errors return appropriate `422 Unprocessable Entity` responses with standardized JSON error payloads.
* **CORS:** CORS middleware is configured to allow communication between the frontend and backend during local development and containerized execution.

### 2. Frontend — React + TypeScript + Tailwind CSS

* **Custom Neumorphic UI/UX:** A soft cream and pastel pink visual design with interactive button states and a feline-inspired aesthetic touch (`0 🐾`).
* **Expression History:** The interface displays the active input and previous equation expressions, such as `2 + 1 =`, improving usability and context.
* **Type Safety:** TypeScript interfaces are used for API payloads and responses, including `CalculationRequest` and `CalculationResponse`.
* **Error Handling:** Visual alert messages provide feedback for connection problems and invalid mathematical operations.
* **Responsive Design:** The interface adapts to smaller screen sizes for basic mobile compatibility.

---

## 📁 Project Structure

```text
calculator/
├── backend/
│   ├── main.go                 # REST API router and endpoints
│   ├── Dockerfile              # Multi-stage Go build image
│   ├── go.mod                  # Go module definition
│   └── pkg/
│       └── calculator/
│           ├── service.go      # Calculator business logic
│           └── service_test.go # Go unit tests
│
├── frontend/
│   ├── src/
│   │   ├── App.tsx             # Main calculator UI component
│   │   ├── App.test.tsx        # Vitest & React Testing Library tests
│   │   ├── index.css           # Custom Tailwind/neumorphic styles
│   │   └── main.tsx            # React application entry point
│   ├── .dockerignore            # Excludes node_modules from Docker context
│   ├── Dockerfile               # Multi-stage build with Nginx
│   ├── tailwind.config.js       # Custom theme configuration
│   └── vite.config.ts           # Vite and Vitest configuration
│
├── docker-compose.yml           # Multi-container service orchestration
├── .gitignore                   # Environment, OS, build, and binary rules
└── README.md                    # Project documentation and AI prompt history
```

---

## ⚙️ Setup & Running Instructions

### Option A — Docker Compose (Recommended)

Docker Compose can be used to build and run both services together.

```bash
docker compose up --build
```

Once the containers are running:

* **Frontend:** `http://localhost:3000`
* **Backend API:** `http://localhost:8080`

To stop the containers:

```bash
docker compose down
```

### Option B — Local Development

#### 1. Start the Backend

```bash
cd backend
go run main.go
```

The backend will run at:

```text
http://localhost:8080
```

#### 2. Start the Frontend

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

The frontend will run at:

```text
http://localhost:5173
```

---

## 🔌 API Reference

### `POST /api/v1/calculate`

Performs an arithmetic operation using a JSON request body.

### Request Example

```json
{
  "operation": "add",
  "a": 10,
  "b": 5
}
```

### Success Response — `200 OK`

```json
{
  "result": 15
}
```

### Error Response — `422 Unprocessable Entity`

```json
{
  "error": "cannot divide by zero"
}
```

### Supported Operations

| Operation    | Description                        |
| ------------ | ---------------------------------- |
| `add`        | Addition (`a + b`)                 |
| `subtract`   | Subtraction (`a - b`)              |
| `multiply`   | Multiplication (`a × b`)           |
| `divide`     | Division (`a ÷ b`)                 |
| `power`      | Exponentiation (`a^b`)             |
| `sqrt`       | Square root (`√a`)                 |
| `percentage` | Percentage calculation (`a / 100`) |

---

## 🧪 Testing & Code Coverage

### Backend Unit Tests — Go

Run:

```bash
cd backend
go test ./... -v -cover
```

The tests cover the core calculator service, supported operations, and relevant boundary conditions.

The current implementation achieves **more than 80% statement coverage**.

### Frontend Tests — Vitest & React Testing Library

Run:

```bash
cd frontend
npm test
```

The frontend tests verify key UI behavior, including:

* Component rendering.
* User digit interaction.
* Display updates.
* Clear (`AC`) behavior.

---

## 🤖 AI Collaboration & Prompt Log

AI tools were used during development in accordance with the assessment instructions.

AI assistance was used for **technical exploration, implementation assistance, testing, UI development, Docker configuration, and documentation**. The generated suggestions and code were reviewed and adapted during development to ensure consistency with the project's requirements and architecture.

The following prompts represent the main AI-assisted development tasks.

### 1. Backend Architecture & Domain Modeling

> Act as a Senior Go Software Engineer. Help me structure a clean, modular Go backend for a full-stack calculator REST API supporting addition, subtraction, multiplication, division, exponentiation, square roots, and percentages. Include custom error handling for edge cases such as division by zero and square roots of negative numbers.

### 2. Unit Testing & Coverage — Go

> Write unit tests for the Go calculator package using table-driven testing in Go (`t.Run`). Ensure tests cover edge cases like division by zero and negative square roots, aiming for high statement coverage.

### 3. Frontend UI/UX Design & API Integration

> Create a responsive calculator UI using React, TypeScript, and Tailwind CSS. Apply a custom neumorphic pastel design system with soft inset shadows, operator preview history, error alert banners, and seamless REST API integration with the Go backend.

### 4. Frontend Testing — Vitest + React Testing Library

> Set up Vitest and React Testing Library for a Vite React project. Write integration tests for the main App component to verify component rendering, user digit interaction, display clearing, and element assertions.

### 5. Dockerization & Container Orchestration

> Create multi-stage Dockerfiles for the Go backend and React frontend (using Nginx for static serving), along with a `docker-compose.yml` file to build and run both services with a single command.

---

## 📌 Design Priorities

The implementation prioritizes:

1. **Correctness** — Arithmetic operations and validation behave as expected.
2. **Maintainability** — Business logic is separated from transport and presentation concerns.
3. **Testability** — Core functionality is covered by automated tests.
4. **Simplicity** — The application avoids unnecessary dependencies and complexity.
5. **Usability** — The interface provides clear feedback and responsive interaction.
6. **Reproducibility** — Docker Compose provides a consistent way to run the complete application.

---

## 📄 Assessment Deliverables

This repository contains the requested assessment deliverables:

* ✅ Full-stack application.
* ✅ React + TypeScript frontend.
* ✅ Go REST API backend.
* ✅ Input validation and error handling.
* ✅ Unit/integration tests.
* ✅ Test coverage information.
* ✅ Setup and usage instructions.
* ✅ API examples.
* ✅ Design decisions.
* ✅ AI prompts used during development.
* ✅ Docker configuration.

---

**Made with 💜 by Valeria Zuluaga Alzate**
