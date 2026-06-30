import dspy


class PromptOptimizer(dspy.Signature):
    """
    Rewrite the user's prompt so that another LLM can answer it better.

    Do not answer the question.
    Only improve the prompt.
    """

    user_prompt = dspy.InputField()
    optimized_prompt = dspy.OutputField()


class PromptOptimizerModule(dspy.Module):
    def __init__(self):
        super().__init__()
        self.optimizer = dspy.Predict(PromptOptimizer)

    def forward(self, user_prompt):
        return self.optimizer(user_prompt=user_prompt)