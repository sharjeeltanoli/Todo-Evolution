# Stage 1: Dependencies
FROM python:3.13-slim as build-deps

# Install uv
RUN pip install uv

# Create a virtual environment
RUN python -m venv /opt/venv
ENV PATH="/opt/venv/bin:$PATH"

# Copy requirements and install dependencies
COPY requirements.txt .
RUN uv pip install --no-cache-dir -r requirements.txt

# Stage 2: Runner
FROM python:3.13-slim as runner

# Install curl for healthcheck
RUN apt-get update && apt-get install -y curl && rm -rf /var/lib/apt/lists/*

# Create a non-root user
RUN useradd -m appuser

# Copy virtual environment from build-deps stage
COPY --from=build-deps /opt/venv /opt/venv

# Set path to use virtual environment
ENV PATH="/opt/venv/bin:$PATH"

# Copy application code
COPY . /app
RUN chown -R appuser:appuser /app
WORKDIR /app

USER appuser

# Healthcheck
HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:8000/health || exit 1

# Expose port and run application
EXPOSE 8000
CMD ["/opt/venv/bin/uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
