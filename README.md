# Postex-VRP Project

## Overview

The Postex-VRP (Vehicle Routing Problem) project is designed to efficiently manage and solve routing problems typically encountered in logistics and transportation planning. This application utilizes advanced algorithms to optimize routes based on various constraints and parameters.

## Features

- **Route Optimization**: Implements algorithms for optimizing vehicle routes for delivery and transportation.
- **API Integration**: Provides API endpoints for integration with other systems and real-time data processing.
- **Flexible Data Handling**: Supports various data formats and sources for route planning.
- **User-Friendly Interface**: Includes a web interface for easy interaction and visualization.

## Getting Started

### Prerequisites

- Docker
- Docker Compose

### Setup and Installation

**Clone the Repository**:

```bash
git clone git@gitlab.postex.ir:o.zamani/vrp.git
```

**Navigate to the Project Directory**:

```bash
cd vrp
```

**Build and Run with Docker Compose**:

```bash
docker-compose up --build
```

## Using the Application

After successfully launching the application, you can access the web interface at `http://localhost:<port>` (replace `<port>` with the port number specified in the `docker-compose.yml` file). API endpoints can be accessed as per the API documentation (if available).

## Docker Customization

- **Dockerfile**: Defines the environment for running the application, using a multi-stage build process for optimization.
- **docker-compose.yml**: Contains the configuration to set up and link multiple services, including the main application and reverse proxy using Caddy.
- **Caddyfile**: Configures the Caddy server for reverse proxy and SSL termination (if SSL is enabled).
```