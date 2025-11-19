def map_sentiment_to_emoji(score):

    if score >= 0.7:
        return "😃🤩🔥"
    if score >= 0.3:
        return "🙂😊"
    if score > -0.3 and score < 0.3:
        return "😐🤔"
    if score <= -0.3 and score > -0.7:
        return "😕😢"
    if score <= -0.7:
        return "😡😭💔"

    return "❓"
