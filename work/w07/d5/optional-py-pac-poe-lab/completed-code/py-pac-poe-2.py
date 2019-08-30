# Py-Pac-Poe
print("----------------------")
print("Let's play Py-Pac-Poe!")
print("----------------------\n\n")

state = {}
state['score'] = {'X': 0, 'O': 0, 'T': 0}
num_wins = int(input("How many wins to play to? "))

def play_game():
  init_game()
  while not state['winner']:
    print_board()
    move = get_move()
    state['board'][move] = state['turn']
    # Python's ternary expression!
    state['turn'] = 'O' if state['turn'] == 'X' else 'X'
    state['winner'] = get_winner()
  handle_winner()

def init_game():
  state['board'] = {
    'a1': None, 'b1': None, 'c1': None,
    'a2': None, 'b2': None, 'c2': None,
    'a3': None, 'b3': None, 'c3': None
  }
  state['turn'] = 'X'
  state['winner'] = None

def print_board():
  b = state['board']
  print(
    """
        A   B   C

    1)  {} | {} | {} 
        ----------
    2)  {} | {} | {}
        ----------
    3)  {} | {} | {}
    """.format(
      str(b['a1'] or ' '), str(b['b1'] or ' '), str(b['c1'] or ' '),
      str(b['a2'] or ' '), str(b['b2'] or ' '), str(b['c2'] or ' '),
      str(b['a3'] or ' '), str(b['b3'] or ' '), str(b['c3'] or ' ')
    )
  )

def get_move():
  while True:
    move = input(f"Player {state['turn']}'s Move (example B2): ").lower()
    if move in state['board'] and not state['board'][move]:
      return move
    else:
      print("Bogus move! Try again...\n")

def get_winner():
  b = state['board']
  if b['a1'] and (b['a1'] == b['b1'] == b['c1']): return b['a1']
  if b['a2'] and (b['a2'] == b['b2'] == b['c2']): return b['a2']
  if b['a3'] and (b['a3'] == b['b3'] == b['c3']): return b['a3']
  if b['a1'] and (b['a1'] == b['a2'] == b['a3']): return b['a1']
  if b['b1'] and (b['b1'] == b['b2'] == b['b3']): return b['b1']
  if b['c1'] and (b['c1'] == b['c2'] == b['c3']): return b['c1']
  if b['a1'] and (b['a1'] == b['b2'] == b['c3']): return b['a1']
  if b['c1'] and (b['c1'] == b['b2'] == b['a3']): return b['c1']
  return None if None in b.values() else 'T'

def handle_winner():
  print_board()
  if state['winner'] == 'T':
    print("Another tie!")
  else:
    print("Player", state['winner'], "wins the game!\n")
  state['score'][state['winner']] += 1
  print(f"SCORE:\nPlayer X: {state['score']['X']}  Player O: {state['score']['O']}  Ties: {state['score']['T']}\n")
  if state['score']['X'] == num_wins or state['score']['O'] == num_wins:
    print(f"\nCongrats to player {state['winner']} for winning {num_wins} game{'s' if num_wins > 1 else ''}!\n")
  else:
    play_game()

play_game()
