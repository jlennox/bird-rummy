const definitions = [
    // == Resources
    {
        title: "Bird Bath",
        type: "Resource",
        text: `
            *Morning Bath* - You may gain 1 ability point at the start of each turn.

            *Knock Over* - Send Bird Bath to heaven to gain 2 ability points.

            The ability points may be spent on the abilities of your choice of any bird in your nest or being played.
            `,
    },

    {
        title: "River",
        type: "Resource",
        text: ``,
    },

    {
        title: "Bird Feeder",
        type: "Resource",
        text: `*Lore* At the start of your turn, flip a coin. If heads, take any single bird from opponent's nest and place it into yours.

        At anytime if an opponent does not have any birds in their nest, place ~ into Heaven.`,
    },

    // == Effects

    {
        title: "Wrath of the Scrub Jay",
        type: "Effect",
        text: `*TODO* - All resource cards in nests go to the forest.`
    },

    {
        title: "Bird Food",
        type: "Effect",
        text: `*Lore* Take any single bird from opponent's nest and place it into yours.`
    },

    {
        title: "Nesting Materials",
        type: "Effect",
        text: `
            *Nest* Place on any bird in your nest. That bird may no longer be targeted by effects or abilities controlled by an opponent.

            This effect may be played in response to an opponent's effect or ability, causing them to have no effect.

            If the bird is removed from your nest, discard ~.`
    },

    {
        title: "Eternal Migration",
        type: "Effect",
        text: `*H5N1* Place all cards in The Forest into Heaven. Place the top two cards from the deck into the Forest.`
    },

    {
        title: "Mating Call",
        type: "Effect",
        text: `*Lore* Play any single bird from the Forest and place it into your nest as though it were in your hand.`
    },

    // == Birds

    {
        title: "Great Blue Heron",
        type: "Bird",
        value: 5,
        count: 2,
        text: `
            (2): *Go Fish* Look at a random card from opponent's hand. You may exchange it for one card from your hand.
        `
    },

    {
        title: "Scrub Jay",
        type: "Bird",
        value: 3,
        text: `
            (2): *Squawk* Place one bird from any nest into the Forest.
            (2): *Forage* Take one card from the Forest. Place it into either your or your opponent's hand.
            `
    },

    {
        title: "Bushtits",
        type: "Bird",
        value: 1,
        count: 6,
        text: `
            Must play at least 3 ~ at once.

            *Flock* When playing ~, you may play ~ from the Forest as though they are in your hand.

            (1): *TODO* Draw 1 card from the Forest or the deck.
            (3): *TODO*
        `
    },

    {
        title: "Mallards",
        type: "Bird",
        value: 0,
        text: `
            *Splashdown Rivalry* When played, ~ in opponent's nest are placed into the Forest.

            (2): *Duck and Cover* Place a Resource from opponent's nest into the Forest.
            (2): *Bottom Feeder* Place a Resource or Effect card from the Forest into your hand.
            `
    },

    {
        title: "Chickadee",
        type: "Bird",
        value: 0,
        text: `
            (1): *Investigation* Look at the top 3 cards of the deck. Place them back in any order.
            (2): *MORE*
            `
    },

    {
        title: "Crow",
        type: "Bird",
        value: 0,
        text: `
            (2): *Murder* Place a group (all of one bird type from a single nest) into Heaven.
            (3): *Shiny Trinket* Place a resource from opponent's nest into your own.
            `
    },

    {
        title: "Osprey",
        type: "Bird",
        value: 0,
        text: ``
    },

    {
        title: "Cuckoo",
        type: "Bird",
        value: 0,
        text: `
            *Feed* At the start of your turn, for every 2 ~s in your nest, discard one card into the Forest.

            (2): *Parasite* ~ is instead placed into opponent's nest.
            `
    },
];

const defaults = {
    "Resource": { count: 2 },
    "Effect": { count: 2 },
    "Bird": { count: 4 },
};

class DOM {
    private static reUnescapedHtml = /[&<>"']/g;

    public static element(type: string, klass: string, body: string): HTMLElement {
        const el = document.createElement(type);
        el.className = klass;
        el.innerHTML = body;
        return el;
    }

    public static escape(string: string): string {
        return string.replace(DOM.reUnescapedHtml, (chr) => {
            if (chr === '&') return '&amp;';
            if (chr === '<') return '&lt;';
            if (chr === '>') return '&gt;';
            if (chr === '"') return '&quot;';
            if (chr === "'") return '&#39;';
            return chr;
        });
    }
}

class Card {
    constructor(
        public readonly title: string,
        public readonly type: string,
        public readonly text: string,
        public readonly value?: number,
    ) {}

    public render(): HTMLElement {
        return DOM.element("div", "card", `
            <h2>${DOM.escape(this.title)}</h2>
            <div class="body">${this.text}</div>
        `);
    }
}

const deck: Card[] = [];

for (const def of definitions) {
    const count = def.count ?? (def.type == "Bird" ? 4 : 2);
    const card = new Card(
        def.title,
        def.type,
        def.text.replace("~", def.title)
            .replace("heaven", "Heaven")
            .replace("forest", "Forest")
            .replace(/\*(.+?)\*/g, "<em>$1</em>")
            .replace(/\n\s+/g, "\n")
            .replace(/\n([^\n]*)/g, "<p>$1</p>"), //  TODO: Escape HTML :)
        def.value);

    for (let i = 0; i < count; i++) {
        deck.push(card);
    }
}

class Deck {
    public cards: Card[];

    constructor() {
        this.cards = deck.slice();
        this.shuffle();
    }

    public shuffle(): void {
        this.cards = this.cards.sort(() => Math.random() - 0.5);
    }

    public draw(): Card {
        const card = this.cards.pop()
        if (card == null) {
            throw new Error("Deck is empty.");
        }

        return card;
    }
}

class Hand {
    public cards: Card[];

    constructor() {
        this.cards = [];
    }

    public draw(deck: Deck): void {
        this.cards.push(deck.draw());
    }

    public render(): HTMLElement {
        const el = DOM.element("div", "hand", "<h3>Hand</h3>");
        for (const card of this.cards) {
            el.appendChild(card.render());
        }

        return el;
    }
}

class Playfield {
    public cards: Card[] = [];

    constructor() {
    }

    public play(card: Card): void {
        this.cards.push(card);
    }

    public render(): HTMLElement {
        const el = DOM.element("div", "playfield", "<h3>Playfield</h3>");
        for (const card of this.cards) {
            el.appendChild(card.render());
        }

        return el;
    }
}

class Player {
    public hand: Hand = new Hand();
    public playfield: Playfield = new Playfield();

    constructor(public readonly name: string) {
    }

    public draw(deck: Deck): void {
        this.hand.draw(deck);
    }

    public render(): HTMLElement {
        const el = DOM.element("div", "player", `<h2>${DOM.escape(this.name)}</h2>`);
        el.appendChild(this.playfield.render());
        el.appendChild(this.hand.render());
        return el;
    }
}

enum TurnPhase {
    Start, Draw, Main, End
}

class Game {
    public deck: Deck = new Deck();
    public playerA: Player = new Player("Player A");
    public playerB: Player = new Player("Player B");
    public exiled: Card[] = [];
    public discard: Card[] = [];
    public turnPhase: TurnPhase = TurnPhase.Start;

    constructor() {
        this.discard.push(this.deck.draw());
        this.discard.push(this.deck.draw());

        for (let i = 0; i < 5; ++i) {
            this.playerA.draw(this.deck);
            this.playerB.draw(this.deck);
        }
    }

    public render(): HTMLElement {
        const el = DOM.element("div", "game", "");
        el.appendChild(this.playerA.render());
        el.appendChild(this.playerB.render());
        return el;
    }
}
