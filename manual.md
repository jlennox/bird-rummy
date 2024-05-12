Bird Rummy
===

Bird Rummy is a card game for 2 players that borrows game mechanics from rummy.

How to play summary
---
Shuffle deck. Place top 2 cards into a discard pile (the "Forest"). Each player is given a 6 card hand.

Players take turns. At the start of each turn, the player draws 2 cards from the draw pile OR takes a run (sequentially
from the top down to a target card) of cards from the discard pile. If cards are taken from the Forest, then the bottom
most card pickup must be the next card played. Person who plays first only draws 1 card on their first turn.

Birds can be played in pairs or better. Each bird being played gives one ability point. Ability points can only be used
on the bird type that is being played. Abilities and their costs are in circled numbers on the bird cards. If 3
Scrub Jays are played, then there's 3 ability points to spend on Scrub Jays' abilities. This can could be one 3 cost
ability, one 2 cost and one 1 cost ability, or three 1 cost abilities. Ability points disappear at the end of turn.

At the end of the turn, the player must discard one card to the Forest. Failure to be able to discard a card means the
game continues on, and they play their next turn as normal.

The game ends when someone ends their turn and discards their last in-hand card. It has to be at turn end, a discard
effect causing a player to discard their last card does not count.

The score is the number of birds you have in play, minus the number of birds you have in your hand. Highest score wins.

Terms
---
- **Nest**: The player's playfield. Each player has a nest. Players play their cards into their nest.
- **Forest**: The shared discard pile.
- **Deck**: The undrawn card pile.
- **Heaven**: The card pile which have been removed from the game.
- **Hand**: The cards an opponent has drawn. The hand should not be shown between players.
- **Group**: Is all birds of a single type in a single nest. **TODO:** Rename to Flock?
- **May**: When an ability or effects says may, ie, "you may," then it is optional.
- **You/your**: In abilities, represents the player using the ability. In an effect, represents the player who's nest the card is in.
- **Effect**: An effect can be triggered by an effect card. Effects on effect cards trigger immediately. Text that begins with "At" or "When" on bird and resource cards are also effects. They trigger at the described event.
- **Discard**: Target player places a card from their hand into the Forest or Heaven. The effect will describe which. Unless noted, it's the player's choice of what to discard.

Game structure
---
1. Shuffle all cards into the deck.
1. Place the top two cards of deck into the Forest.
1. Each player draws 6 cards from the deck.
1. Loser of previous game or winner of a high dice roll decides who plays first.
    - They may look at their hand and the Forest before deciding.

Turn structure
---
1. **Start phase.** "Start of turn" effects trigger.
1. **Draw phase.** Player may decide to draw 2 from the deck. Or take from the Forest. But one or the other must be done.
    - If this is the first turn of the game, then only one card is drawn. (TODO: Unneeded complexity?)
    - If this would overdraw the deck, then the Forest should be shuffled and used as th deck.
        - If the forst and deck are both empty, then the game ends.
    - If taking from the Forest:
        - Player must take at least 2 cards.
        - Player must take sequentially from the top. IE, you can not skip over the top card and take two. Instead the top three would need to be taken.
        - The bottom most card taken must be played this turn.
        - TODO: Should the bottom most card be required to be a bird?
1. **Main phase.** Player may play any number of birds, effects, or resources in any order.
1. **Discard phase.** The player must discard a card. If they can not, then the game continues as normal.
1. The turn is passed to the other player.

End and win condition
---
The game ends when:
- If a player discard's their last card in hand during the discard phase.
    - A discard effect causing a player to discard their last card does not count.
- If both the deck and the Forest are empty.

When the game ends, the winner is determined by who has the most birds, deducting the number of birds in hand.
- Some birds may have a conditional effect that makes them count as more or less.
- Non-card cards (Resources and Effects) do not add or remove from score.

Bird cards
---
- Birds are played from your hand into your nest.
- Birds create ability points when played. The number of ability points given is the sum of the amount of this type of bird you are playing, and the number currently in your nest.
    - Ability points created by playing birds can only trigger the abilities on birds of that type.
    - Unspent ability points disappear at the end of turn.
- Birds have abilities. The abilities are in circled numbers.
    - The ability resolves before the birds are considered in your nest. (TODO: Does this ever mater? If not, remove it)
- The ability points can only be spent on the actively being playing birds unless otherwise written.
- Unless otherwise written, bird cards must be played in pairs OR
    - Bird cards can be played off birds in another player's nest.
        - Example: Opponent has no sparrows in their nest. Youy *can not* play 1 sparrow.
        - Example: Opponent has 1 or more sparrows in their nest. You *can* play 1 sparrow.
    - Bird cards played off someone elses nest only trigger the ability for the count you have.
        - Example: Opponent has 2 sparrows in their nest and you play 1 sparrow. This gives 1 ability point, not 3.
        - Example: Opponent has 2 sparrows in their nest, you have 1 in your nest, and you play 1 sparrow. This gives 2 ability point. 1 for the sparrow in your nest, 1 for the sparrow being played.
- Some birds have effects. Effects trigger at the written turn phases or events.
    - These will begin with "when", "whenever", or "at".

Resource cards
---
- Resources are a type of card that can be played at anytime during your turn.
- They remain in play unless otherwise specified.

Effect cards
---
- Effects can be played during your main phase only.
- Effects go to Heaven once played unless stated otherwise.
    - TODO: Does anything actually state otherwise?
