"use strict";
const cardDefinitions = [
    // == Resources
    {
        title: "Bird Bath",
        type: "Resource",
        text: `
            *Morning Bath*: You may gain 1 ability point at the start of each turn.

            *Leak*: Place ~ in heaven to gain 2 ability points.

            The ability points may be spent on the abilities of your choice of any bird in your nest or being played.
            `, // Call "Leak" "Knock Over*" instead?
    },
    {
        title: "River",
        type: "Resource",
        text: `*Fish*: At the start of your turn, you may draw a card from the deck.`,
    },
    {
        title: "Bird Feeder",
        type: "Resource",
        text: `
            *Lore*: At the start of your turn, flip a coin. If heads, take any single bird from opponent's nest and place it into yours.

            At anytime if an opponent does not have any birds in their nest, place ~ into Heaven.`,
    },
    // == Effects
    {
        title: "Wrath of the Scrub Jay",
        type: "Effect",
        text: `*Knocks Stuff Over*: All resource cards in nests are placed in the Forest.`
    },
    {
        title: "Bird Food",
        type: "Effect",
        count: 4,
        text: `*Lore*: Take a single bird from opponent's nest or the Forest and place it into your nest.`
    },
    {
        title: "Nesting Materials",
        type: "Effect",
        text: `
            *Nest*: Place on any bird group in your nest. That bird may no longer be targeted by effects or abilities controlled by an opponent.

            This effect may be played in response to an opponent's effect or ability, causing it to have no effect.

            If all birds in targeted bird group are removed from your nest, place ~ in the Forest.`
        // define "causing _it_" better?
    },
    {
        title: "Eternal Migration",
        type: "Effect",
        text: `*H5N1*: Place all cards in The Forest into Heaven. Place the top two cards from the deck into the Forest.`
    },
    {
        title: "Mating Call",
        type: "Effect",
        text: `
            *Lore*: Place a single bird from the Forest or opponent's nest and place it into your nest. This must be a bird type already in your nest.

            Gain ability points as though it was played from your hand.
            `
    },
    {
        title: "Bird Law",
        type: "Effect",
        count: 1,
        text: `
            You make up a new rule that will be in effect until your next turn.

            Can only be used on your own.
            Rule changes can't modify game ending or win conditions.
            Rule changes must be agreed upon by all players.
        `,
    },
    {
        title: "French Fries",
        type: "Effect",
        text: `
            Activate the ability of any bird in any nest without paying the cost.

            If the bird is in your opponent's nest, it effects them as though they activated it.
            `,
    },
    // == Birds
    {
        title: "Great Blue Heron",
        type: "Bird",
        value: 5,
        count: 2,
        text: `
            If there is any !River! in play, ~'s value is 10, and create twice as many ability points when played.

            (2) *Go Fish*: Look at a random card from opponent's hand. You may choose a card in your hand to exchange for the revealed card.
        `
    },
    {
        title: "Scrub Jay",
        type: "Bird",
        value: 5,
        text: `
            (2) *Squawk*: Place one bird from any nest into the Forest.
            (2) *Forage*: Take one card from the Forest. Place it into either your or your opponent's hand.
            `
    },
    {
        title: "Bushtits",
        type: "Bird",
        value: 3,
        count: 6,
        text: `
            ~ must be played in groups of 3 or more.

            *Flock*: When playing ~, you may play ~ from the Forest as though they are in your hand.

            (1) *TODO*: Draw 1 card from the Forest or the deck. (TODO: too strong?)
            (3) *TODO*
        `
    },
    {
        title: "Mallards",
        type: "Bird",
        value: 5,
        text: `
            *Splashdown Rivalry*: When played, ~ in opponent's nest are placed into the Forest.

            (2) *Duck and Cover*: Place a Resource from opponent's nest into the Forest.
            (2) *Bottom Feeder*: Place a Resource or Effect card from the Forest into your hand.
            `
    },
    {
        title: "Chickadee",
        type: "Bird",
        value: 5,
        text: `
            (1) *Investigation*: Look at the top 3 cards of the deck. Place them back in any order.
            (2) *TODO*
            `
    },
    {
        title: "Crow",
        type: "Bird",
        value: 5,
        text: `
            (2) *Murder*: Place a group (all of one bird type from a single nest) into Heaven.
            (3) *Shiny Trinket*: Place a resource from opponent's nest into your own.
            `
    },
    {
        title: "Sparrows",
        type: "Bird",
        value: 5,
        text: `
            (2) *Urban Forager*: Take a !Bird Food! card from the Forest and place it into your hand.
            `
    },
    {
        title: "Cuckoo",
        type: "Bird",
        value: 10, // Or perhaps go negative?
        text: `
            *Feed*: At the start of your turn, for every 2 ~s in your nest, discard one card into the Forest.

            (2) *Parasite*: ~ is instead placed into opponent's nest.
            `
    },
    {
        title: "Joker",
        type: "Bird",
        value: 0, // intentional 0.
        count: 2,
        text: `*Mimicry*: Can be played as though it's any other type of bird.`
    },
];
class DOM {
    static escapableHtmlExpr = /[&<>"']/g;
    static element(type, klass, body) {
        const el = document.createElement(type);
        el.className = klass;
        el.innerHTML = body;
        return el;
    }
    static escape(string) {
        return string.replace(DOM.escapableHtmlExpr, (chr) => {
            if (chr === '&')
                return '&amp;';
            if (chr === '<')
                return '&lt;';
            if (chr === '>')
                return '&gt;';
            if (chr === '"')
                return '&quot;';
            if (chr === "'")
                return '&#39;';
            return chr;
        });
    }
}
class Card {
    title;
    type;
    text;
    value;
    constructor(title, type, text, value) {
        this.title = title;
        this.type = type;
        this.text = text;
        this.value = value;
    }
    render() {
        return DOM.element("div", "card", `
            <h2>${DOM.escape(this.title)}</h2>
            <div class="type">${DOM.escape(this.type)}</div>
            <div class="image" style="background-image: url('images/black_white/${encodeURI(this.title)}.webp');"></div>
            <div class="body">${this.text}</div>
            ${this.value == null ? "" : `<div class="value">${this.value}</div>`}
        `);
    }
    static fromDefinition(def) {
        // Hacky code. Needs an actual parser. The initial "\n" is so one-liners get <p> wrapped.
        return new Card(def.title, def.type, ("\n" + def.text)
            .replaceAll("~", def.title)
            .replaceAll("heaven", "Heaven")
            .replaceAll("forest", "Forest")
            .replaceAll(/\n+/g, "\n")
            .replaceAll(/\*(.+?)\*/g, "<em>$1</em>")
            .replaceAll(/\((\d+)\)/g, "<span class='ability-cost'>$1</span>")
            .replaceAll(/\n\s+/g, "\n")
            .replaceAll(/\n([^\n]*)/g, "<p>$1</p>"), //  TODO: Escape HTML :)
        def.type == "Bird" ? def.value : undefined);
    }
}
const deck = [];
for (const def of cardDefinitions) {
    const count = def.count ?? (def.type == "Bird" ? 4 : 2);
    const card = Card.fromDefinition(def);
    for (let i = 0; i < count; ++i) {
        deck.push(card);
    }
}
console.log("deck", deck);
class Deck {
    cards;
    constructor() {
        this.cards = deck.slice();
    }
    shuffle() {
        this.cards = this.cards.sort(() => Math.random() - 0.5);
    }
    draw() {
        const card = this.cards.pop();
        if (card == null) {
            throw new Error("Deck is empty.");
        }
        return card;
    }
}
class Hand {
    cards;
    constructor() {
        this.cards = [];
    }
    draw(deck) {
        this.cards.push(deck.draw());
    }
    render() {
        const el = DOM.element("div", "hand", "<h3>Hand</h3>");
        for (const card of this.cards) {
            el.appendChild(card.render());
        }
        return el;
    }
}
class Playfield {
    cards = [];
    constructor() {
    }
    play(card) {
        this.cards.push(card);
    }
    render() {
        const el = DOM.element("div", "playfield", "<h3>Playfield</h3>");
        for (const card of this.cards) {
            el.appendChild(card.render());
        }
        return el;
    }
}
class Player {
    name;
    hand = new Hand();
    playfield = new Playfield();
    constructor(name) {
        this.name = name;
    }
    draw(deck) {
        this.hand.draw(deck);
    }
    render() {
        const el = DOM.element("div", "player", `<h2>${DOM.escape(this.name)}</h2>`);
        el.appendChild(this.playfield.render());
        el.appendChild(this.hand.render());
        return el;
    }
}
var TurnPhase;
(function (TurnPhase) {
    TurnPhase[TurnPhase["Start"] = 0] = "Start";
    TurnPhase[TurnPhase["Draw"] = 1] = "Draw";
    TurnPhase[TurnPhase["Main"] = 2] = "Main";
    TurnPhase[TurnPhase["End"] = 3] = "End";
})(TurnPhase || (TurnPhase = {}));
class Game {
    deck = new Deck();
    playerA = new Player("Player A");
    playerB = new Player("Player B");
    exiled = [];
    discard = [];
    turnPhase = TurnPhase.Start;
    constructor() {
        this.deck.shuffle();
        this.discard.push(this.deck.draw());
        this.discard.push(this.deck.draw());
        for (let i = 0; i < 5; ++i) {
            this.playerA.draw(this.deck);
            this.playerB.draw(this.deck);
        }
    }
    render() {
        const el = DOM.element("div", "game", "");
        el.appendChild(this.playerA.render());
        el.appendChild(this.playerB.render());
        return el;
    }
}
