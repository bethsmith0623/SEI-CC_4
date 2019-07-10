# My First Sort
Before we get into any code, let's try sorting a deck of cards by hand.

## Group Activity: Grab a Partner!
With a partner, acquire a set of playing cards. (Your instructor should have one for you.) Assign one person to move cards (the "card person") and one person to be in charge of comparisons (the "comparison person").

### What to Do
The card person should lay the cards out in a line on the table. The card person's goal is to sort the cards. 

Starting at the beginning of the line, for the first two cards, ask the comparison person whether they should swap the two cards or not. Continue this process for the next two cards, then the next two, and so on until the end of the line. Start over at the beginning when you're done. 

Keep doing this process until you make a pass through your line of cards with zero swaps. Congratulations, you have a sorted deck of cards!

> **Note**: If you need a tiebreaker, the comparison person should always answer ties with "don't swap." We'll talk about why that's important in a moment!

Typically, you might have your chosen card order be numerical (as it is in poker), but feel free to pick whatever variation you would like. For example, what if aces were always low? How about reverse order? Or what about using Pinochle ordering: [9, J, Q, K, 10, A]?

Swap roles, shuffle your deck, and repeat the process.

### After You're Done With the Activity

When you're finished having each person play each role, discuss with your partner your thoughts on the following questions:

```
1. How fast was this sort? Fast, slow, medium?
2. Did you require any extra space besides the space that the cards were originally laid out in?
3. What effect did it have on the end result that you did not swap "ties" (e.g., a 5 of hearts and a 5 of diamonds)?
4. How fast or slow would it be to sort cards that start out already in order?
5. How fast or slow would it be to sort cards that start out in completely reversed order?
6. Hypothetically, if you wanted to sort by suits (e.g., clubs < diamonds < hearts < spades) and then by card value, how would your swap/comparison logic change?
7. Given your answers to the previous questions, hazard a guess at what this sort's stats are:
    * Best-case time complexity (Big Ω)
    * Worst-case time complexity (Big O)
    * Space complexity? (Big O)
    * Is this a stable or unstable sort?
```

The sort you performed is called "bubble sort." Perhaps you were able to see why in a visual way when you were sorting your cards: If you had a face card at the front of the deck, it sort of "bubbled" up to the place it was supposed to be.

## More Sorts

Once you're done with the bubble sort activity, you and your partner should also do this next sort with your deck of playing cards.

### Insertion Sort

You and your partner each have your own table. Start with the cards in random order on one person's table. That person takes one card from the front of the deck and hands it to the second person. The second person organizes the card on their own table, placing each successive card in order as they come. To do this, compare the new card received to every card on the new table until you find where it fits.

After you're done, make your best guess at the stats for `Insertion Sort` based on your experience. What do you think the best-case, average, and worst-case time complexities are? How about space complexity? How about stability?
