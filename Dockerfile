FROM python:3.12-slim
ENV PYTHONUNBUFFERED=1
WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copiá TODO (incluyendo server.py en la raíz)
COPY . .

EXPOSE 8080

# Ahora sí, servidor en server.py
CMD ["uvicorn", "server:app", "--host", "0.0.0.0", "--port", "8080"]
