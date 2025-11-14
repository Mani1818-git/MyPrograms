import random

def player(prev_play, opponent_history=[]):
    if prev_play:
        opponent_history.append(prev_play)

    if len(opponent_history) < 3:
        return random.choice(["R", "P", "S"])

    guess = predict_next_move(opponent_history)

    return counter_move(guess)


def counter_move(move):
    """Return the winning move against the predicted move."""
    if move == "R": return "P"
    if move == "P": return "S"
    if move == "S": return "R"
    return random.choice(["R", "P", "S"])


def predict_next_move(history):
    """Predict the opponent’s next move using last 2-move sequences (Markov-like approach)."""
    if len(history) < 3:
        return random.choice(["R", "P", "S"])

    last_two = "".join(history[-2:])

    seqs = {}
    for i in range(len(history) - 2):
        seq = "".join(history[i:i+2])
        next_move = history[i+2]
        if seq not in seqs:
            seqs[seq] = {"R": 0, "P": 0, "S": 0}
        seqs[seq][next_move] += 1
    if last_two not in seqs:
        return random.choice(["R", "P", "S"])
    prediction = max(seqs[last_two], key=seqs[last_two].get)
    return prediction
