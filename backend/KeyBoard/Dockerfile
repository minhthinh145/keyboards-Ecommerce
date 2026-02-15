# Build stage
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copy csproj and restore dependencies
COPY ["KeyBoard.csproj", "./"]
RUN dotnet restore "KeyBoard.csproj"

# Copy everything else and build
COPY . .
RUN dotnet build "KeyBoard.csproj" -c Release -o /app/build

# Publish stage
FROM build AS publish
RUN dotnet publish "KeyBoard.csproj" -c Release -o /app/publish /p:UseAppHost=false

# Runtime stage
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app

# Install culture data for Vietnamese locale
RUN apt-get update && apt-get install -y locales && rm -rf /var/lib/apt/lists/*

EXPOSE 8080
EXPOSE 8081

COPY --from=publish /app/publish .

# Set environment variables
ENV ASPNETCORE_URLS=http://+:8080
ENV ASPNETCORE_ENVIRONMENT=Production

ENTRYPOINT ["dotnet", "KeyBoard.dll"]
