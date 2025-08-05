# 🧠 Cognicare – Multi‑Service AI‑Driven Healthcare Platform

> A **full‑stack, multi‑language, microservices‑based healthcare platform** for Alzheimer’s care — integrating AI‑powered MRI analysis, cognitive progression tracking, and treatment planning.  
> Built with **Node.js**, **Python FastAPI**, **React**, **Docker**, and deployed to **Google Kubernetes Engine (GKE)** using **GitOps** with **ArgoCD**.

---

## 📜 Table of Contents
1. [Overview](#-overview)
2. [Architecture](#-architecture)
3. [Repository Structure](#-repository-structure)
4. [Technology Stack](#-technology-stack)
5. [Key Tools & Integrations](#-key-tools--integrations)
6. [DevOps, CI/CD & GitOps Pipeline](#-devops-cicd--gitops-pipeline)
7. [Getting Started (For New Developers)](#-getting-started-for-new-developers)
8. [Local Development](#-local-development)
9. [Testing](#-testing)
10. [Security & Quality](#-security--quality)
11. [Deployment](#-deployment)
12. [Helpful Links](#-helpful-links)
13. [License](#-license)

---

## 🚀 Overview

Cognicare is a **smart healthcare platform** designed to support:
- 🩻 **MRI Image Analysis** – Detects Alzheimer’s patterns using AI models.
- 🧩 **Cognitive Progression Tracking** – Predicts decline through cognitive test data.
- 📋 **Personalized Treatment Planning** – Doctor availability scheduling and AI‑based plan suggestions.
- 👩‍⚕️ **Multi‑Role Access** – Dashboards for Admins, Doctors, Vendors, CSR staff, and Patients.

This repository contains:
- All **source code** for microservices and frontend.
- Configurations for **automated builds, tests, and security scans**.
- Integration with a **separate GitOps manifest repo** for Kubernetes deployments.

---

## 🏗 Architecture

```

+-----------------+         +-----------------------------+
\|  Frontend (SPA) | <-----> | Gateway Service (Node.js)    |
+-----------------+         +-------------+---------------+
|
+--------------+---------------+--------------+
\|              |               |              |
+----------v-----+ +------v---------+ +----v------------+ +----v------------+
\| MRI Service    | | Progress Track | | Treatment Plan  | | Other Services  |
\| (FastAPI, AI)  | | (FastAPI, AI)  | | (FastAPI, Logic)| | (Future)        |
+----------------+ +----------------+ +----------------+ +-----------------+
\              |               |              /
\             |               |             /
+------------+---------------+------------+
|
+-------v-------+
\| Google GAR    |  <-- Docker Images
+---------------+
|
+-------v-------+
\| Manifest Repo |
\| (Helm Charts) |
+---------------+
|
+-------v-------+
\| ArgoCD        |
\| (GitOps)      |
+---------------+
|
+-------v-------+
\| GKE Cluster   |
+---------------+

```

---

## 📂 Repository Structure

```

academiay4-cognicare-app/
├── backend/
│   ├── gateway-service/           # Node.js API Gateway
│   ├── mri-service/               # FastAPI MRI AI analysis
│   ├── progress-tracking-service/ # FastAPI cognitive tracking
│   └── treatment-planning-service/# FastAPI treatment planning
├── frontend/                      # React (Vite) frontend app
├── .github/workflows/             # CI/CD pipelines
├── sonar-project.properties       # SonarQube config
└── README.md                      # You are here

````

---

## ⚙ Technology Stack

### **Frontend**
- **React (Vite)** – Fast modern SPA framework
- **Tailwind CSS** – Utility-first CSS styling
- **Firebase Auth** – Secure authentication & social logins
- **Role-based Routing** – Different dashboards for each user type

### **Gateway Service**
- **Node.js (Express)** – API gateway and request routing
- **JWT Authentication** – Token-based authentication
- **Yup Validation** – Strong request schema validation
- **Middleware** – Centralized auth, header, and body validation

### **AI-Driven Backend Services**
- **FastAPI (Python)** – High-performance API framework
- **TensorFlow / Keras** – AI model inference for MRI & cognitive tests
- **Modular Design** – Separate routers, services, schemas

### **DevOps / Deployment**
- **Docker** – Containerization of all services
- **Helm Charts** – Kubernetes packaging for easy deployment
- **GKE (Google Kubernetes Engine)** – Managed Kubernetes cluster
- **ArgoCD** – GitOps continuous delivery
- **Google Artifact Registry (GAR)** – Docker image storage

---

## 🔧 Key Tools & Integrations

| Tool / Service | Purpose |
|----------------|---------|
| **SonarQube**  | Code quality & maintainability analysis |
| **Snyk**       | Detects vulnerabilities in dependencies |
| **Trivy**      | Container image vulnerability scanning |
| **GitHub Actions** | CI/CD automation |
| **pytest / Jest** | Python / Node.js testing frameworks |
| **Firebase**   | Authentication & real-time capabilities |
| **Yup**        | Schema validation for API requests |
| **JWT**        | Secure authentication between services |

---

## 🔄 DevOps, CI/CD & GitOps Pipeline

This repository implements a **modern DevOps workflow** combining **Continuous Integration (CI)**, **Continuous Delivery (CD)**, and **GitOps** principles.

### **📦 CI/CD Overview**

1. **Developer Commit**
   - Code pushed to a feature branch or `main`.
   - Pull Requests trigger **branch-specific CI pipelines**.

2. **Automated Builds**
   - Each service has its own build pipeline:
     - **Gateway Service** → Node.js build via `npm ci`.
     - **Python Services** → Build via `pip install`.
     - **Frontend** → React build via `npm run build`.

3. **Automated Testing**
   - **Gateway Service** → Jest unit tests.
   - **Python Services** → `pytest` unit tests.
   - Code coverage results are collected for quality reports.

4. **Static Code Analysis (Quality Gates)**
   - **SonarQube** checks:
     - Code smells, bugs, security hotspots.
     - Enforces minimum code coverage thresholds.
   - PRs fail if **quality gate** is not passed.

5. **Security Scanning**
   - **Snyk** → Scans dependencies for known vulnerabilities.
   - **Trivy** → Scans built Docker images for OS & library vulnerabilities.

6. **Docker Build & Push**
   - Multi-stage Docker builds minimize image size.
   - Images tagged with `service-name:git-sha` or semantic version.
   - Pushed to **Google Artifact Registry (GAR)**.

7. **Manifest Repo Update (GitOps Trigger)**
   - A bot workflow automatically updates:
     - `image.tag` in the Helm chart values.
     - Commits change to the **cognicare-manifest** repo.
   - This triggers **ArgoCD sync** in the GKE cluster.

8. **ArgoCD Deployment**
   - ArgoCD detects manifest changes.
   - Syncs Kubernetes resources to match the Git state.
   - Rollouts are monitored for success or rollback.

---

### **🛠 Tools Used in DevOps Pipeline**

| Tool | Role |
|------|------|
| **GitHub Actions** | CI/CD automation for builds, tests, scans, and deployments |
| **Docker** | Containerization of microservices |
| **Helm** | Kubernetes deployment packaging |
| **Google Artifact Registry (GAR)** | Private image repository |
| **SonarQube** | Static code analysis and quality gates |
| **Snyk** | Dependency vulnerability scanning |
| **Trivy** | Container image security scanning |
| **ArgoCD** | GitOps continuous delivery for Kubernetes |
| **Google Kubernetes Engine (GKE)** | Managed Kubernetes runtime |

---

### **📜 GitHub Actions Workflows in This Repo**

| Workflow | Purpose |
|----------|---------|
| **gateway-ci.yaml** | Builds & tests Gateway Service |
| **mri-ci.yaml** | Builds & tests MRI Service |
| **progress-tracking-ci.yaml** | Builds & tests Progress Tracking Service |
| **treatment-planning-ci.yaml** | Builds & tests Treatment Planning Service |
| **frontend-ci.yaml** | Builds & tests Frontend |
| **build-and-push.yaml** | Multi-service Docker build & push to GAR |
| **helm-tag.yaml** | Updates manifest repo with new image tags |
| **sonarqube-analysis.yaml** | Runs SonarQube quality analysis |
| **snyk-scan.yaml** | Dependency vulnerability scanning |
| **trivy-scan.yaml** | Container image vulnerability scanning |

---

### **📊 DevOps Workflow Diagram**

```mermaid
flowchart LR
    A[Developer Commit] --> B[GitHub Actions CI]
    B --> C[Build & Unit Tests]
    C --> D[SonarQube Analysis]
    C --> E[Snyk & Trivy Scans]
    D --> F[Docker Build]
    E --> F
    F --> G[Push Image to GAR]
    G --> H[Update Manifest Repo]
    H --> I[ArgoCD Sync Trigger]
    I --> J[GKE Deployment]
    J --> K[Production Ready]
````

---

### **⚡ GitOps in Action**
This repo is inluded in the below link check that repo for gitops specific details

```bash
https://github.com/AcademiaY4/CogniCare-Manifest
```

* **Single Source of Truth** → The **manifest repo** (`cognicare-manifest`) defines what’s deployed.
* **Automated Sync** → ArgoCD continuously reconciles the cluster state with Git.
* **Safe Rollouts** → Rollbacks are as simple as reverting a Git commit.

---

### **🌐 Environments**

The system supports **multi-environment deployments** via separate Helm values files in the manifest repo:

| Environment    | Branch    | Deployment               |
| -------------- | --------- | ------------------------ |
| **Dev**        | `develop` | GKE Dev Namespace        |
| **Staging**    | `staging` | GKE Staging Namespace    |
| **Production** | `main`    | GKE Production Namespace |

---

## 🛠 Getting Started (For New Developers)

### **1️⃣ Prerequisites**

* [Node.js 18+](https://nodejs.org/)
* [Python 3.10+](https://www.python.org/)
* [Docker](https://www.docker.com/)
* [Helm](https://helm.sh/)
* [Google Cloud SDK](https://cloud.google.com/sdk/docs/install) (optional)
* [kubectl](https://kubernetes.io/docs/tasks/tools/)

---

### **2️⃣ Clone the Repository**

```bash
git clone https://github.com/academiay4/cognicare-app.git
cd cognicare-app
```

---

### **3️⃣ Configure Environment Variables**

Each service requires its own `.env` file.

Example for **Gateway Service**:

```env
PORT=8080
JWT_SECRET=your-secret
CORS_ORIGIN=http://localhost:5173
```

---

### **4️⃣ Install Dependencies & Run Locally**

#### **Frontend**

```bash
cd frontend
npm install
npm run dev
```

Runs at → `http://localhost:5173`

#### **Gateway Service**

```bash
cd backend/gateway-service
npm install
npm run dev
```

Runs at → `http://localhost:8080`

#### **Python Services**

```bash
cd backend/mri-service
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8001
```

Runs at → `http://localhost:8001`


## 🧪 Testing

* **Gateway Service**

```bash
cd backend/gateway-service
npm run test
```

* **Python Services**

```bash
cd backend/mri-service
pytest
```

---

## 🔒 Security & Quality

| Tool          | Purpose                     |
| ------------- | --------------------------- |
| **SonarQube** | Code quality gates          |
| **Snyk**      | Dependency vulnerabilities  |
| **Trivy**     | Container image scanning    |
| **JWT**       | Secure API access           |
| **Yup**       | Strong API input validation |

---

## 🚀 Deployment

Deployment is fully automated via:

* **GitHub Actions** → Build, test, scan, push to GAR
* **Manifest Repo** → Updated with new image tag
* **ArgoCD** → Syncs to GKE

Manual deployment (for testing):

```bash
helm upgrade --install cognicare ./helm-chart \
  -f environments/dev/values.yaml \
  --namespace cognicare --create-namespace
```

---

## 📚 Helpful Links

* [FastAPI Documentation](https://fastapi.tiangolo.com/)
* [React (Vite) Docs](https://vitejs.dev/)
* [Helm Charts Guide](https://helm.sh/docs/chart_template_guide/getting_started/)
* [ArgoCD Documentation](https://argo-cd.readthedocs.io/)

---

## 📜 License

Licensed under the **MIT License**. See the [LICENSE](LICENSE) file.

