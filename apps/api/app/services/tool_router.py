from app.services.tool_registry import TOOLS


def select_tool(plan):

    for tool in TOOLS:

        if tool.can_handle(plan):
            return tool

    return None