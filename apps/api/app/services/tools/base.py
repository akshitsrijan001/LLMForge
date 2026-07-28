from __future__ import annotations

from abc import ABC, abstractmethod
from typing import Any


class Tool(ABC):
    """
    Base class for every tool in LLMForge.
    """

    name: str = ""
    description: str = ""

    @abstractmethod
    def can_handle(self, plan) -> bool:
        """Return True if this tool should execute."""
        pass

    @abstractmethod
    def execute(self, **kwargs) -> Any:
        """Execute the tool."""
        pass