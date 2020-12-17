FROM mcr.microsoft.com/dotnet/sdk:3.1 AS build
WORKDIR /app

# copy csproj and restore as distinct layers
COPY *.sln .
COPY SimpleWebApi/*.csproj ./SimpleWebApi/
RUN dotnet restore

# copy everything else and build app
COPY SimpleWebApi/. ./SimpleWebApi/
WORKDIR /app/SimpleWebApi
RUN dotnet publish -c Release -o out

FROM mcr.microsoft.com/dotnet/aspnet:3.1 AS runtime
WORKDIR /app
COPY --from=build /app/SimpleWebApi/out ./
ENTRYPOINT ["dotnet", "SimpleWebApi.dll"]