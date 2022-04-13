#!/bin/bash
player_wins=0
ai_wins=0
ties=0

while true; do
    echo ""
    echo "Rock, paper, scissors, or quit (r, p, s, q): "
    
    # TODO: Read player's key press into user_input variable

    player_move=-1

    [ "$user_input" == "r" ] && player_move="ROCK"
    [ "$user_input" == "p" ] && player_move="PAPER"
    
    # TODO: Handle input for "s" and "q"

    [ $player_move != -1 ] || continue

    # TODO: Set ai_input to a random number on [0, 2]

    [ $ai_input -eq 0 ] && ai_move="ROCK"
    [ $ai_input -eq 1 ] && ai_move="PAPER"
    [ $ai_input -eq 2 ] && ai_move="SCISSORS"

    # TODO: Print player and opponent's move

    if [[ $player_move == $ai_move ]]; then
        echo "It's a tie!"
        ((ties++))
    else
        player_won=1
        
        # TODO: Figure out which player won

        [ $player_won -eq 1 ] && echo "You win!" && ((player_wins++))
        [ $player_won -eq 0 ] && echo "You lose!" && ((ai_wins++))
    fi
done

# TODO: Output result of session to results.txt

echo ""
echo "Session results:" && echo "Session results:"
echo "Player wins: ${player_wins}" && echo "Player wins: ${player_wins}"
echo "Computer wins: ${ai_wins}" && echo "Computer wins: ${ai_wins}"
echo "Ties: ${ties}" && echo "Ties: ${ties}"
echo "" >> results.txt

echo ""
echo "Press enter to exit"
read
