from app.services.dspy_service import configure_dspy
import dspy

configure_dspy("gemma3:1b")

class QA(dspy.Signature):
    question = dspy.InputField()
    answer = dspy.OutputField()

predict = dspy.Predict(QA)

result = predict(question="Why is the sky blue?")

print(result.answer)