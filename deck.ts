interface IGenericCardDefinition {
    readonly title: string;
    readonly type: "Resource" | "Effect" | "Bird";
    readonly text: string;
    readonly count?: number;
    readonly textScale?: number;
    readonly advanced?: boolean;
}

interface IResourceEffectCardDefinition extends IGenericCardDefinition {
    readonly type: "Resource" | "Effect";
}

interface IBirdCardDefinition extends IGenericCardDefinition {
    readonly type: "Bird";
}

type ICardDefinition = IResourceEffectCardDefinition | IBirdCardDefinition;

const terms = {
    Lure: "Take a single bird from opponent's nest or the Forest and place it into your nest",
};

const cardDefinitions: readonly ICardDefinition[] = [
    // == Resources
    {
        title: "Bird Bath",
        type: "Resource",
        text: `
            *Morning Bath*: At the start of each turn, you may gain 1 ability point.

            *Leak*: Place ~ in heaven to gain 2 ability points.

            Ability points gained this way may be spent on the abilities of your choice of any bird in your nest or being played. Unused points are lost at the end of turn.
            `, // Call "Leak" "Knock Over*" instead?
    },

    {
        title: "River",
        type: "Resource",
        text: `*Fish*: At the start of your turn, you may draw a card from the deck.`,
    },

    // {
    //     title: "Bird Feeder",
    //     type: "Resource",
    //     text: `
    //         *Lure*: At the start of your turn, flip a coin. If heads, take any single bird from opponent's nest and place it into yours.
    //
    //         At anytime if an opponent does not have any birds in their nest, place ~ into Heaven.`,
    // },

    {
        title: "Seasonal Winds",
        type: "Resource",
        text: `*Gust*: At the start of your turn, you may place a card from the Forest into opponent's hand.`
    },

    // == Effects

    {
        title: "Wrath of the Scrub Jay",
        type: "Effect",
        text: `*Knocks Stuff Over*: All resource cards in nests are placed in the Forest.`,
    }, // TODO: This card isn't great. You remove all resources, then your opponent gets a strong scoop from the Forest next turn.

    {
        title: "Bird Food",
        type: "Effect",
        count: 4,
        text: `
            *Lure*: ${terms.Lure}. A bird pair is not required.

            It generates ability points as though it was played from your hand.
            `,
            // Change to Gust? IE, the bird gets blown over.
    },

     {
         title: "Nesting Materials",
         type: "Effect",
         textScale: 1, //0.95,
         advanced: true,
         text: `
            Place on any bird group in your nest. That bird may no longer be the target of effects or abilities controlled by an opponent.

            This effect may be played in response to an effect or ability, causing it to have no effect.

            If all birds in targeted bird group are removed from your nest, place ~ in the Forest.`
            // define "causing _it_" better?
            // Word heavy, but this card invents counterspells and shroud without additional rules?
            // It's also an effect that stays present in your nest, which is weird.
     },

    {
        title: "Eternal Migration",
        type: "Effect",
        count: 1,
        text: `*H5N1*: Place all cards in the Forest into Heaven. Place the top two cards from the deck into the Forest.`,
    },

    {
        title: "Mating Call",
        type: "Effect",
        text: `
            *Lure*: ${terms.Lure}. This must be a bird type already in your nest.

            Gain ability points as though it was played from your hand.
            `,
    },

    {
        title: "Bird Law",
        type: "Effect",
        count: 1,
        advanced: true,
        text: `
            Pick one:
            - Switch hands with opponent.
            - Place all cards in the Forest into Heaven.
            - Flip ~ like a coin using your thumb. It must go at least 10 inches into the air. Place any card it touches into Heaven.
            `,
    },

    {
        title: "French Fries",
        type: "Effect",
        text: `Activate an ability of any bird in your nest without paying the cost.`,
    },

    // == Birds

    {
        title: "Great Blue Heron",
        type: "Bird",
        count: 2,
        textScale: 1, //0.95,
        text: `
            If you have a !River! in your nest during scoring, ~ counts as two birds when scoring.
            If you have a !River! in your nest, ~ generates double the ability points.

            (2) *Go Fish*: Look at a random card from opponent's hand. You may choose a card in your hand to exchange for the revealed card.
            `,
        // This wording is a bit awkward. I want the river to need to be in play at the end of game for the score
        // doubling, but it sounds like it's a delayed effect and the river has to be in play when played.
        // I've changed it, but now it's too may words :/
    },

    {
        title: "Scrub Jay",
        type: "Bird",
        text: `
            (2) *Squawk*: Place one bird from any nest into the Forest.
            (2) *Forage*: Take one card from the Forest. Place it into either your or your opponent's hand.
            `,
    },

    {
        title: "Bushtit",
        type: "Bird",
        count: 6,
        text: `
            ~s must be played in groups of 3 or more.

            *Flock*: When playing ~, you may play ~s from the Forest as though they are in your hand.

            (1) *TODO*: Draw 1 card from the Forest or deck. (TODO: too strong?)
            (3) *TODO*
            `,
    },

    {
        title: "Mallard",
        type: "Bird",
        text: `
            *Splashdown Rivalry*: When played, ~s in opponent's nest are placed into Heaven.

            (2) *Duck and Cover*: Place a Resource from opponent's nest into the Forest.
            (2) *Bottom Feeder*: Place a Resource or Effect card from the Forest into your hand.
            `,
            // I dislike that they go to Heaven, but placing into the Forest created a game play loop.
    },

    {
        title: "Chickadee",
        type: "Bird",
        text: `
            (1) *Investigation*: Look at the top 3 cards of the deck. Place them back in any order.
            (2) *Cache*: Discard a card from your hand into the Forest. Draw a card from the deck.
            `,
    },

    {
        title: "Crow",
        type: "Bird",
        text: `
            (2) *Murder*: Place a group (all of one bird type from a single nest) into Heaven.
            (3) *Shiny Trinket*: Place a Resource from opponent's nest into your own.
            `,
    },

    {
        title: "Sparrow",
        type: "Bird",
        text: `
            (2) *Urban Forager*: Search the deck for a !Bird Food! card, show opponent, and place it into your hand. Shuffle deck afterward.
            (2) *Clever Buccaneer*: Take one card at random from opponent's hand.
            `,
    },

    {
        title: "Cuckoo",
        type: "Bird",
        text: `
            ~ add no points when scoring. Instead, each ~ in hand or in your nest deducts 2 points.

            (2) *Parasite*: All ~s in your nest or being played are instead placed into opponent's nest.
            `,
    },

    {
        title: "Mockingbird",
        type: "Bird",
        count: 2,
        textScale: .95,
        text: `
            *Mimicry*: When played, select a bird in your nest or currently being played.

            ~ is considered that bird type for all abilities, effects, and scoring.

            If moved directly to another nest, that nest's owner must select a bird from their nest to mimic.

            If there's no targets or there's no birds of the mimicked type in the same nest, then place ~ the Forest.
            `,

            // Should this provide 0 points? I want to think that it's a check on how powerful this card is, but I'm not sure.
            // Might be needless complexity.
    },

    {
        title: "Northern Flicker",
        type: "Bird",
        text: `
            (2) *TODO*:
            `,
    },

    {
        title: "Towhee",
        type: "Bird",
        text: `
            *Bully*: When played, place any Sparrows in opponent's nest are placed into the Forest.

            (2) *Dirt Dance*: Place 2 cards from the Forest into opponent's hand, and 1 into yours.
            `,
    },
];

class DOM {
    private static readonly escapableHtmlExpr = /[&<>"']/g;

    public static element(type: string, klass: string, body: string): HTMLElement {
        const el = document.createElement(type);
        el.className = klass;
        el.innerHTML = body;
        return el;
    }

    public static escape(string: string): string {
        return string.replace(DOM.escapableHtmlExpr, (chr) => {
            if (chr === '&') return '&amp;';
            if (chr === '<') return '&lt;';
            if (chr === '>') return '&gt;';
            if (chr === '"') return '&quot;';
            if (chr === "'") return '&#39;';
            return chr;
        });
    }
}

class Card implements IGenericCardDefinition {
    public readonly title: string;
    public readonly type: "Resource" | "Effect" | "Bird";
    public readonly text: string;
    public readonly count?: number | undefined;
    public readonly textScale?: number | undefined;

    constructor(def: ICardDefinition) {
        this.title = def.title;
        this.type = def.type;
        this.text = def.text;
        this.count = def.count;
        this.textScale = def.textScale;
    }

    public render(): HTMLElement {
        const bodyScale = this.textScale == null ? "" : `font-size: ${this.textScale}em;`
        return DOM.element("div", "card", `
            <h2>${DOM.escape(this.title)}</h2>
            <div class="type">${DOM.escape(this.type)}</div>
            <div class="image" style="background-image: url('images/black_white/${encodeURI(this.title)}.png');"></div>
            <div class="body" style="${bodyScale}">${this.text}</div>
        `);
    }

    public static processDefinition<T extends IGenericCardDefinition>(def: T, allCards: readonly IGenericCardDefinition[]): T {
        //  TODO: Escape HTML :)
        const text = ("\n" + def.text)
            .replaceAll("~", def.title)
            .replaceAll("heaven", "Heaven")
            .replaceAll("forest", "Forest")
            .replaceAll("resource", "Resource")
            .replaceAll(/\n+/g, "\n")
            .replaceAll(/\*(.+?)\*/g, "<em>$1</em>")
            .replaceAll(/\((\d+)\)/g, "<span class='ability-cost'>$1</span>")
            .replaceAll(/\n\s+/g, "\n")
            .replaceAll(/\n([^\n]*)/g, "<p>$1</p>")
            .replaceAll(/!([\w\s]+)!/g, (_, capture) => {
                const card = allCards.find((c) => c.title == capture);
                if (card == null) throw new Error(`Unknown card: ${capture}`);

                return `<span class="card-ref">${DOM.escape(capture)}</span>`;
            });

        const count = def.count ?? (def.type == "Bird" ? 4 : 2);
        return { ...def, text, count };
    }

    public static processDefinitions(defs: readonly ICardDefinition[]): readonly Card[] {
        const deck: Card[] = [];

        for (const def of cardDefinitions) {
            const fixedDef = Card.processDefinition(def, cardDefinitions);
            for (let i = 0; i < fixedDef.count!; ++i) {
                // new instance for each one?
                deck.push(new Card(fixedDef));
            }
        }

        return deck;
    }
}

const deck = Card.processDefinitions(cardDefinitions);

console.log("deck", deck);

class Deck {
    public cards: Card[];

    constructor() {
        this.cards = deck.slice();
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
        this.deck.shuffle();

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
