# Stage 1: Build stage
FROM python:3.9-slim as builder

# Set the working directory
WORKDIR /app

# Copy the requirements file
COPY requirements.txt .

# Install dependencies
RUN pip install --user -r requirements.txt

# Stage 2: Slim Python image for runtime
FROM python:3.9-slim

# Copy the virtual environment from the builder stage
COPY --from=builder /root/.local /root/.local

# Set the working directory
WORKDIR /app

# Copy the application code
COPY . .

# Set the PATH environment variable
ENV PATH=/root/.local:$PATH

# Set the Flask application environment variables
ENV FLASK_APP=app.py
ENV FLASK_ENV=production

# Expose the port the app runs on
EXPOSE 5000

# Run the application
CMD ["python3", "app.py"]

