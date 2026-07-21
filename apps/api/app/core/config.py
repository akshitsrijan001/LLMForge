from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    APP_NAME: str = "LLMForge"

    OLLAMA_URL: str = "http://localhost:11434"

    DEFAULT_MODEL: str = "gemma3:1b"

    # ADD THIS
    SERPER_API_KEY: str = ""

    model_config = SettingsConfigDict(
        env_file=".env",
        extra="ignore",
    )


settings = Settings()