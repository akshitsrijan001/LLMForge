from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    APP_NAME: str = "LLMForge"

    OLLAMA_URL: str = "http://localhost:11434"

    DEFAULT_MODEL: str = "gemma3:1b"

    class Config:
        env_file = ".env"


settings = Settings()