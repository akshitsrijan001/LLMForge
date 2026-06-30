import dspy


class PromptOptimizer(dspy.Signature):
    """
    Rewrite the user's prompt to improve clarity while preserving intent.
    """

    prompt = dspy.InputField()
    optimized = dspy.OutputField()


def configure_dspy(model_name: str):

    lm = dspy.LM(
        model=f"ollama_chat/{model_name}",
        api_base="http://127.0.0.1:11434",
    )

    dspy.configure(lm=lm)

    return dspy.Predict(PromptOptimizer)


def optimize_prompt(prompt: str, model_name: str) -> str:
    """
    Optimize the user's prompt using DSPy.
    """

    optimizer = configure_dspy(model_name)

    result = optimizer(prompt=prompt)

    return result.optimized