#!/bin/bash

# Define la URL del endpoint de la API
API_URL="http://localhost:9090/api/actualizar-bolsas-vencidas"

# Realiza la petición GET y guarda la respuesta en una variable
response=$(curl -s -w "%{http_code}" -o temp_response.txt "$API_URL")

# Extrae el código de estado HTTP y el cuerpo de la respuesta
http_code="${response:(-3)}"
response_body=$(cat temp_response.txt)

# Genera un log con la fecha, el código de estado y el cuerpo de la respuesta
echo "$(date '+%Y-%m-%d %H:%M:%S') - HTTP Code: $http_code - Response: $response_body" >> actualizar_bolsas.log

# Elimina el archivo temporal
rm temp_response.txt
