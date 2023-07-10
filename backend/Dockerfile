FROM python:3.10.9
WORKDIR /app

COPY ./req.txt .

# ENV PYTHONDONTWRITEBYTECODE 1
# ENV PYTHONBUFFERED 1

RUN pip install --no-cache-dir --upgrade -r ./req.txt


COPY . .
COPY ./resources ../resources

RUN ls -la

EXPOSE 8000

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
