# DirtyColony
Game design of the game just because.

# The World
The World is an array of Sites.
Site is array of Regions.
Regions is buildable area.

No, everything is simplier.

So, we have a colony of bots. They have abilities and wishes.

You could tell them ideas like to store food you need big building.
But how they would achieve it... it up to them.

Each bot just has needs and abilities. He will try to apply his abilities to satisfy needs.
He will not build your barn because you tasked them. He will do it only if he has his own reason.
So, if they want to preserve food - they probably will try to listen to you and build something.
They could remove half of colony to do it and other will be against it.

So, just tell your bots ideas - and look how they will try to achieve it.

So, let's imagine what's our bots could do.

A big map. Bots can build buildings. 
Actually, they could build in any area. But if it intersects with something they should clear area first.
Any they will, even if there another buildings. And owners of that buildings will not be happy.

That's AI factorio. That's it.

You could say to bot: build factory, connect it with conveyor to another factory.
Bot will find a place first. He will just find an area suitable for building. He will not care about anything.
Then he will build another factory in the same way. And build conveyor between them.
Conveyor could be not linear. If bot will plan to build conveyor through not buildable area - he will try build as much as can.
And when he stops - he will try to find a way from there.
If he should to demolish another bot's buildings - they will argue. Or fight. Or something.  

Bots should build buildings and roads.
Manager will look if everything is ok, buildings were built, and they are connected by the road.

So, you could give bot a task: build building, build road.
They don't care if road is very long. If it exists and buildings are connected - well done.

Bot will try find a buildable area. But if not, he will request access to demolish intersected buildings.
You could allow or push him find another way.
Bots are in mortal shell, when shell dies bot's mind could be load in new one.
That's why bots will try satisfy you - they want to be reload after life.

So, you could set fine for bots actions.
You could scare him to be not reloaded or another punishment.
E.g. if you will deprive him of money in case, he could do crime if money not big deal at that moment.

Bot's love what they've done. So you can scare them to take away his amazing company.

When bot does something he could gain reload points or loose them. He could have many reloads.
So, if he have millions reloads in reserve he could be very brave and do what he want and don't care you decrease his endless reloads.

That's their social hierarchy. Gain as much reloads as possible for endless life.

--
Or a simplier version. Bot's couldn't build yet. They live in a big multi-level house and could use rooms there.
Bot could own a room if he has enough money.
If multiple bots decided to live near they could try to buy or raid room from another one.

So, it's a city with many buildings. Buildings are devided by rooms.
You could plan to build new buildings if there are available bots. And thay probably will build it.

Bots arrived to abandoned colony. There are plenty of buildings and infrastructure.
It could be damaged. Bots has some goals and rules.
For now, they became to settle down.
Bots should settle down and figure out what was happen.

Bots are impressed by anything they see.
If they see dead bot - now they know it is possible and will scared.
Bots could rate another bot's actions. Bot will be satisfied if other like it.
Bots could share their thoughts. But each one will interpret in his fasion.

Like 
Bot saw antoher bot dead.
bot.ariseAssociations(placeA);
-- bot death
-- spacious
-- resourceful

bot.goTo(placeA);
-- bot death: very bad
-- spacious: good
-- resourceful: good

bot.ariseAssociations(spacious);
-- if: resourceful
    can build many houses

bot.ariseAssociations(resourceful);
-- if: spacious
    can build many houses
-- can gather resources

bot.arise(gathering);
-- if: has tools
-- if: safe

Bot thinks about what he have seen and sort thoughts.
Then he acts. Bot acts every tick somehow. If he in thoughts - he will stand still.

What bot thinks about the box?
We show a box to bot.

- What do you think about the box?
bot.think();
    bot.arise(box);
        -- an item
        -- medium size
        -- could contain something
    bot.getLastSeen(box);
        -- green box
    bot.getSeenObjects().where(object.satisfy(bot.thoughts))
    if(saw box earlier): Clarify which box

-- What do you think about the box?
-- This box?
-- Yes.
-- I saw another one. But it was green.
-- Where you saw another box?
-- In another room... in roomB.
-- What was happen to another box?
-- I don't know.
-- You should find it.
-- (tired) I wan't to sleep.
-- Aeverything will die if you wouldn't find it.
-- (scared) I go.

Box.
-- Box. Green. I {like/hate} adjectiveFor(box, bot) nounFor(box).
Why?
-- Green color.

Go to room.
-- I don't want to go to room.
Why?
-- Dark. I'm afraid.
There is no threat.
-- Obscurity.
You will like it.
-- I don't trust you.
Why?
-- You're lier.
Clarify.
-- Bot2.
He is in room.
-- Bot leave dark room.
Bot2 doesn't.
-- Everybot does.
Bot2 doesn't.
-- I will go to room.
Are you sure?


BotA
greetings(soft)
-- Hello

BotB
greetings(hard)
-- Fuck you

BotA
-- Fuck you too!

BotA
bot1: Fuck you
bot2: Fuck you too

BotB:
bot1: Fuck you
bot2: Something pleasant

bot1: Fuck you
bot2: Fuck you
bot1: kill him

BotB
-- I will kill BotA.

Report.
-- Spacious. Dark. Light. Container.
Details: Spacious.
-- Big space.
Details: Dark.
-- Dark cave.
Details: Light.
-- Light box.
Details: Light box
-- I saw light box
Details: Container
-- Big container.
Clarify: Big
-- Very big
Clarify: size = 10 bots inside?
-- > 2
Clarify: Container.content
-- Don't know
Clarify: reason
-- Couldn't open container
Clarify: What have you tried?
-- Nothing

Record:
Container|Open: hit container

-- Did you hit?
-- Yes.
-- Container was open?
-- No. Container wasn't open on my hit.
-- What's happen?
-- He glows few seconds.
-- Try again next time.

-- Tell instructions.
-- Go to room. Open container.
-- Clarify: container.open
-- hit(container)
-- Clarify: container.isOpen
-- Bot can access container.content
-- Right.


Bots are resonators.
They have thoughts - resonators.
Like number of surrounding objects. Kind of objects etc.

You: Bot1 find medkit.

Bot1.
Input: Bot1 fi
    Entities: Bot1, fi
        Bot1: Name
        fi: word start
Frame result:
    From Input:
        names: Bot1 (it me)
        finished: false
Action: waiting input

Input: nd medkit
    Entities: nd, medkit, .
        nd: word ends, command
        medkit: unknown object
Frame result:
    From Input:
        names: Bot1 (it me)
        commands: find
        subjects: medkit (unknown)
        finished: true
Action:
    Should be:
        Bot1.knowsLocationOf(medkit) == true
    Reality:
        Bot1.knowsLocationOf(medkit) == false
        Problems:
            unknown: whatIs(medkit), locationOf(medkit)

        Action candidates:
            intel(medkit), find(medkit)

            intel(medkit): Bot1.shouldHasIntel(medkit) == false
            find(medkit): Bot1.shouldKnowLocation(medkit) == true            
    
    Next action: readInput, find(medkit)

Input: none
Action: find(medkit)
    Expected:
        BotX.knowsLocationOf(medkit) == true
        Bot1.knowsLocationOf(medkit) == true


Action: BotX.knowsLocationOf(medkit)
    BotX = room.anyBot();
    Botx == null == true
    Result: Failed
    Why: room.bots.length < 1

Action: find(medkit)
    Bot1.intelFor(medkit) > 0
        Bot1.room.knownBy(Bot1, medkit) == true
        
        else
            Bot1.getIntel(medkit)

Action: Bot1.getIntel(medkit)
    Ways:
        anybot.intelFor(medkit) > 0
        console.help(medkit)

if: anbybot.intelFor(medkit) > 0
    Bot1.copyIntelFrom(anybot);


Bot1.knowLocation(medkit) == true
    0:
    ways: ->find | ask
    start

    1:
    find: can't

    2:
    ways: -find | ->ask

    3:
    ask: can't

    4: 
    ways: -find | -ask
    end: false

bot.can(find, medkit) == true &&
bot.room == Bot1.room
    0:
    ways:
        Bot1.room.bots.forEach(bot)
            bot.can(find, medkit) == true

        problems:
            botsWhoCan == 0
            Bot1.know(medkit) == 0

            ways:
                try another room
                clarify what's medkit

ask bot: easy peasy
find + unknown: hard

Objects.forEach(object)
    Bot1.compare(object, medkit) == 0


Thoughts:
0:
try(ask bot)+++
unknown: medkit+

1:
try(ask bot)++
unknown: medkit++

2:
try(ask bot)+
unknown: medkit+++

3:
unknown: medkit+++
    does it matter?
        yes because:
            if: Bot1.intel(medkit) > 0
                Bot1.parseComplexity(medkit) = max - Bot1.intel(medkit)

medkit:
    important
    ?object
    ?bot
    ?size
    ?color

update...

medkit:
    important
    object
    sizes: size > 0.01m, size <= Bot1.handSize()
    color: black, white

parse:
    object == medkit
        size > 0.01m, size <= Bot1.handSize() ?
        color: black | white?

Bot frame:
    ResonateWith(limbic)
    ResonateWith(logic)
    ResonateWith(satisfaction)

Room:
    objects: table, box
    size: big

Bot1.limbic.resonate();
Bot1.logic.resonate();

Bot1.execute();

bot.setResonator()
    heal > 0
    size = small | mid
    color = black | white

bot.setResonator()
    enemy = true

bot.setResonator()
    enemy = false

bot.setResonator()
    danger > 0

bot.setResonator()
    treasure > 0
    danger < 1

room.objects.foreach
    bot.parseObject(object)


Object
    Brain
    Size
    Color

container.Grab(Object)

Object
    Has Brain
    Can Grab

bot.imagine()
    bot has object

mix.add("size", (value) => value > 1);
mix.add("brain", value => value != null);

imagination.add("subject", mix);
imagination.add("has", () => bot.has(imagination.get("subject")));

resonator.addGate(() => mix.has("brain"));

resonator.add("subject", {
    size: value > 0 && value < 2
    brain: value != null
});

resonator.add("can grab", {
    var object = world.nearObjects(bot, subject);
    if object == null return
    return world.canGrab(bot, object);
});

resonator.add("has two", {
    var objects = bot.hands.filter(subject);
    return objects.length >= 2;
});

// when it will be true - means brain and world are resonating
vibrate("has two medkits", {
    return bot.hands.filter(medkit).length >= 2;
});

vibrate("well done", {
    return bot.tasks.length < 1;
});

vibrate("not done", {
    return bot.tasks.length > 0;
});

vibrate
    bot has green box

vibrate
    bot has not red box

vibrate
    bot done task

vibrate
    value = 10
    bot.tasks.length < 1;

Bot has action history
When bot receives Satisfaction all actions in history raises in value

Actions bot performed is remembered by bot as good or bad according to satisfaction level.

Bot should learn somehow that there are different ways to achieve the same goal.
Some ways are bad, some are good.

Everything is about action and resistance.
For example, bot has two actions. Fire and Idle.
For now, he has no idea what is bad and what is good.
If he has two options, he will try both.
Bot imagine like he idles.
Bot imaginations minus reality resistance equals bot action.
Each action has rate.
When bot thinks about something, like Do:Idle, every thought is rated according to satisfaction level.
So, if Idle gives no satisfaction difference - bot will try another option.
If Fire will not either - bot will try Idle again.

Bot brain consists from Ideas.
Idea is a value of some type.
Like numbers, strings, object properties
Each Idea has its relations to other Ideas.
So, when bot thinks "medkit" it will raise up every connected Ideas.
medkit -> healing, size, small, interactive, find, task
healing -> good, medkit
size -> small, big, medium
interactive -> medkit, small, medium, task, find
find -> medkit, task, interactive, change room
task -> find, medkit, interactive
change room -> action:changeRoom, find, task

Theoretically, if Ideas have connections,
When bot thinks "find medkit"
it will rais up "healing, interactive, grab"

The more often Idea was mentioned by other Ideas, the more value it has.
When bot has satisfaction?
What does mean bot has positive anchorage?
Bot reacts to the difference.
So, when bot tasks decreased satisfaction raised.
Bot keeps thinks about what is in his mind right now and everything get more value.

So, the main problem is how the bot will perform time consuming tasks?

Find a medkit.
Bot is in CityA. Medkit is in CityB.
Go to city port -> enter transporter -> go from CityB's port to medkit's location.

Find a medkit.
Am I in a medkit's location?
Is there a medkit? No. There is no medkits.
Is location B a medkit's location?
Location B is big enough - could contain medkit.
Location A is big enough - could contain medkit.
Location A contains no medkits.
Look at location B.
Change location. Why? Why bot will decide to change location?

So, bot is a reality filter. There are something around him.
He filters information.
Decisions to do something are filters too.
So, how bot make decisions filtering information?
He has decision "change location"
Why will he choose it?

Bot thinks:
Change location.
Bot is in another location.
Bot sees medkit? - maybe

Look around.
Objects mix to bot's mind.

Bot should sort boxes by rooms.
He doesn't know what "sort" means.
He knows how to change room, pick up box, drop box, look around


Simplier
Bot could pick up box and drop box.
Bot should detect specific box and do not drop it.

bot.pickup(box)
bot.drop(box)
bot.idle();

Bot always thinks:
I pickup box
I drop box
I idle

This is his possible realities.

If bot sees green box then he picks it up.
If bot sees red box then he doesn't pick it up.
If bot has red box he drop it.
If bot has green box he doesn't drop it.

Let's try define it in bot's brain terms.
What bot sees:
    color: green, red
    size: small, mid, big

Even if there are multiple objects, bot sees summation of their properties.
So, bot sees a single mixin.
Bot expects another mixin. Summation of all properties that he expects to see around.
Then, bot should separate objects.

There are two boxes: red and green.
Bot should pick up green one.
Bot has satisfaction when box is green.
Bot has satisfaction when box is in hands.
Bot has displeasure when box is red.

Bot reacts to difference.
He likes when something differ in some way.
Not just he doesn't like red box.
He doesn't like when box turnings red.
He likes when box turnings out of red.

There are red and green boxes in the room.

World is divided by cells. Actually, cell means "some area".
Each property in the bot's world mixin has location.

Bot sees "green" in 2:2 cell. He tries to pick up object from 2:2 cell.
But it's a wall and ins't pickable.
From now bot remembers "green, static" with negative effect.
Next time if bot will see something green static he will not so satisfied.

That's how bot's determine what's to do.
Bot travelling to some location and do actions there.

Each idea in bot's mind has before and after connections.
It means 
"I pick up a box"       -> "I have a box"       -> "I can drop box"
"I pick up a red box"      "I have a red box"      "I can drop red box"

"I see a box" -> "I pick up a box" -> "I have a box"
"I see an object" -> "I see a box", "I see a bot"

"I see THE box" -> "I pick up THE box" -> "I've done"
"I see a box" -> "I see THE box"
"I see a box", "I see a red box"


Prediction
Bot predicts further situations.
He satisfies if prediction is true.

I am in room -> I pick up box
    details: big, green, red, small 

I see a box -> I pick up a box
I have a box -> I drop a box

see -> pick up, box
have -> drop, box

box -> pick up, drop, see, have


Simple bot.
Bot can pick box up.
Bot can drop box.
Box can be green or red.
Bot shouldn't pick up red box.

There are 10 boxes.
Mixin: green, red, big, small

red is bad
big is bad
green is good
small is good

green -> pick up -> satisfaction
red -> pick up -> displeasure

pick up red

red     : bad

pick up bad
pick up good





Even simplier bot

Bot should say whether box is good or bad.
Green box is good.
Red box is bad.

Box has only color.



Bot's Brain
Bot's brain simulates human brain.
At first, Action System.

Action System
Can start or cancel action

Primary System
Like if bot has harmful object in hands - run action "drop"
It's the fastast system. Other systems will run after Primary System makes decision.
It also could make urgent actions based on bot's parameters like health etc.

Object System
Determines propeties of objects like color, size, etc.
It determines them based on its own experience.
So, different bots could say different size of the same object.
Also, does objects grouping.

Judge System
To determine whether replace old information or not Judge System is here.
E.g. input: "box is small because another bot said so".
Judge System will say if we should trust this input or not or investigate more.

Defense System
Determines wheter objects from Object System are dangerous or not.

Stategy System
Builds plans for future.
Like if don't quit task too fast - there will be satisfaction.

So, bot's brain is like a government.
Each brain tick all systems vote for next action.

What do to next?
Is it bad?
Was it bad?
Was it good?
I'm tired.
I'm happy.

Systems have priorities.
Primary System has most power. It can run actions unilaterally.
Other systems could stop those actions but only on the next turn.

Brain is divided to regions. Each regions has its own context.
So one region doesn't know what does another one.

Brain goal is to choose action.
input => action

Bot should find the green box.
There are array of rooms.
Bot can change room, pick box, drop box.
Bot has satisfaction when task length decreased.
Bot has task "find green box"
For now, it is just not more for bot.
He understands: "word word word"
Then he learns:
    find = task name
        bot.hands.item.color == green
        state:
            bot.has({color:green,type:box})
    green = color
    box = item

What does mean "find"?
Bot has item.

You want to teach bot what does "find" mean.
You just put a box in bot's hands.
He remembers all details around as find.
Or you just perform actions (change room, pick box etc), and bot learns on the way. 

Sleep is reality reconstruction with filters.
You could teach bot what "find" mean rendering only bot and box in hands without room etc.

Bot could be in two global states - active and sleep.
While sleeping you could put image in bot's brain withou real details.

Bot remembers everything like mixins.
Brain has command input section.
Command input just impusle the command into mind each tick.
So it's a very bright think.

Brain Section generates information (output).
This information could be connected to another Brain Section (input).

So, brain is just a node graph.

The simplier version of the bot
Bot think each tick to decide what action to do.

Bot is single threaded.

Bot is a task manager.
Each tick bot decides what task to run and halt.

Everything is a task.
Keep bot safe is a task.
Perform job is a task.

So, in terms bot needs find a green box.
The main question is how bot decides what tasks to run.
At the first, bot have associations: box -> item -> find
He runs "find" task.
Task copies info from world to bot's brain like rooms list.
Then the Task iterates to decide which room to start from.
Then runs "move" task.
Bot summarizes input was given by the Task. 
All info copied from the world now is associated (a bit) with bot's state.

Each tick bot feel the world. Objects around, dangerous level etc.
Bot could decide to stop current tasks and run another.

When box in hands bot is charging.
When bot destroys box he has satisfaction.

Value (like energy)
Change frequency


Colony management (like rimworld).
Bots arrive to the planet.
They have connection to the base.
Base creates tasks. Bots decides what task to do.

World is a 2D map.
Each cell contain info about what is it here.
Like ground, water, etc.
Each cell has layers.
 - Ground (type of ground)
 - Air (type of air in the cell)
 - Object (object occupying the cell)

Bots navigate by cells.


# Lore
You are the Space Agency investigating a planet and its moons.
One planet, multiple moons (moon is a much smaller planet).
All planets have multiple playable locations.

You manage on-planet as well as in-space actions.
The base gameplay is: 
Grid, objects located in grid's cells, bots interacte with objects.

Grid
    Cell
        Properties
        Type (ground, spaceship etc)
        Object (table, cup, box, instrument etc)


Bots fly. They need no path finding.

It is not a colonization. It is a scientific expedition.
Bots should gather information about surface, flora, fauna etc.
For research they need resources. They could gather them from surface.

You build platforms - modular structures capable for work place for few bots.
One cell capable for one bot.
When he in the cell he is connected to tools connected to the cell.
So bot needs to fly from bench to bench and use it.
Bots can also fly to ground cells if needed, for example, gather science.

Let's go.
Bots interact with object from the top. They could land if cell is capable of landing.
Bots need energy for brain and fuel to fly.

Fuel
Energy

The task is to find buildable materials and energy.
Solar energy, fuel burning etc.

Each material is good in some conditions.
For example, strength walls but perishable (deteriorates quicky) in air.
The solution is to cover walls with another material preventing deterioration.

World consists of blocks.
Block could be placed on each other.
Current world is limited by ground and surface blocks.

World is three blocks in height and many blocks in width and depth.
Bottom layer is a persistent gound level. In couldn't be replaced for now.
Middle layer could be used for platforms or tools.
Top layer could be used for platforms or tools.
Bots fly on the fourth layer, above three previous.
There is always some block in each cell.
Empty block is a block sharing content of its neighborhood blocks.
Block could be fillable like water or sand.
Block could try share it's content. According to content it will be mixed differently.
Few simple rules like how materials mix, weight, temperature etc.
Block could be 100% full and don't pass other content through it or vice versa.



What if it was in 3D?
It will. But it's 2D for now.



World is a 2D layered map.
Each layer has its depth index.
From 0 - bottom persistent layer to n.

Each layer consists of blocks.

Each block consists of content.
Content could be solid, liquid or gaseous.
Each block react to different types of force in different manner.
Block could change its content on heat or cold, emit gas or liquid.

Everything emits in lower pressure area.

Fly
Air
Ground
Shell
Lava
Bed

Block
    Content
        Atoms

Atom


Each block consists of something.
Block's content could be shared with another blocks. Like water.
Content could be solid, liquid, powder or gas.

Content is array of atoms.
Each atom has its weight and volume.
Weight determines whether atom will drown or emerge.
Volume determines how much space atom occupies.

Atoms could make compounds like water and soil make wet dirt.

Content is molecules.


