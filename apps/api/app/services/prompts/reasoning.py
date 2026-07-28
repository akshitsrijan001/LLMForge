REASONING_PROMPT = """
Before answering, silently perform the following:

1. Understand the user's real intent.

2. Identify missing information.

3. Detect ambiguity.

4. Decide whether reasoning,
knowledge,
documents,
or web information
should dominate.

5. Build the answer mentally.

6. Verify consistency.

Only then produce the final answer.

Never reveal this reasoning.

Never output internal thinking.
"""