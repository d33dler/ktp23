FROM mcr.microsoft.com/dotnet/sdk:6.0-alpine as build
WORKDIR /app
COPY . .
RUN dotnet dev-certs https --trust
EXPOSE 7223
EXPOSE 5162
# RUN dotnet restore
# RUN dotnet publish -o /app/published-app

# FROM mcr.microsoft.com/dotnet/aspnet:6.0-alpine as runtime
# WORKDIR /app
# COPY . .
# COPY --from=build /app/published-app /app
# ENTRYPOINT [ "dotnet", "/app/app.dll" ]
# RUN "dotnet dev-certs https --trust"
CMD [ "dotnet", "watch", "run", "--project", "backend" ]