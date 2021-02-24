# Sims Colony
The game is basically like The Sims.
But each sim is always active.
Player can't give any orders to sims.
Player can build environment for them.

Needs
    Survive
    Social
    Reproduction

Bot is addicted to Reward Hormone.
Everything that gives a reward is good for bot.

Each skill has next paramters:
    Cost
        Skill cost in stamina
    Stamina
        Current stamina
    Level
        Determines max stamina

Skills are chain of bot's systems.

Example: Speech
Brain: generate own speech -> Vocal tract: render speech

Vocal tract
    Larynx

Bot
    Mouth
    Larynx
    Lungs
    Food Tract


Bot
    Lips
    Teeth
    Jaws
    Tongue
    Food Tract
    Vocal Box
    Lungs
    Liver
    Kidney
    Stomach

Bot
    Brain
    Face
    Ears
    Eyes
    Nose
    Mouth
    Stomach
    Liver
    Lungs
    Heart
    Bladder
    Body
    Hands
    Legs

Everything consumes brain's power when acting.



Bot
    Energy
    Hunger
    Bladder
    Hygiene
    Social


Each bot has opinions like:
    If you want to be popular, then
        Work as Actress
        Work as Singer
        Work as Idiot
    If you want to be safe
        Don't trust anyone
        Be smart
        Play guitar

Opinion is long-term issue.
So, when a bot is in danger he will not Play guitar.
Instead, after danger, bot would think that it happened because he had played guitar too rarely.
It's complicated to change opinion. The stronger opinion - the harder to change it.

Opinions tend to mix in a single one.

Each bot has some opinion what reason he is live for.
He could think for no reason or for god or something.

Дворецкий пришёл на работу.
Ходит по дому, выполняет работу.
Что он думает при этом?
Ни о чем, просто нужно сделать дела.
Рассматривает комнаты, думает что хочет жить также.
Ищет лазейки, как жить хорошо.
Думает, как бы обокрасть.
Почему он вообще стал дворецким?

Допустим, персонажу нравится следить за порядком.
Также ему нужны деньги.
Он смотри доступные вакансии - дворецкий самое то.
Надо много убирать.
Также он знает образ чувака, который важно ходит по дому и убирает.
Он может не знать ещё, что не всё так, как он придумал.
Дворецкий может быть неуверенным в себе или наоборот.
Он может думать, что самый крутой и всё умеет.
Или быть неуверенным в своих делах.

Если персонаж любить убирать, значит он будет делать это везде.
У него зудит.


Боты хотят кушать, спать, в туалет.
Боту очень важно удовлетворить эти потребности.
В зависимости от воспитания, он может гадить в туалет или под себя.
Бот должен узнать, что ходить в туалет - хорошо или плохо.

Для начала - все боты уникальны. Никто никому не ребенок.
Каждый здесь по своим приничам и решает свои задачи.

Есть предметы, которые приносят боту удовольствие.
Например, музыка или игровой автомат.
Когда бот танцует, он повышает владение телом.
Если бот танцует определённые танцы - он учит, как владеть телом для этого танца.
Чем лучше он вообще владеет телом, тем проще ему даются другие танцы.


Бот
    Моторика рук
    Моторика ног
    Моторика тела
    Моторика пальцев
    Комбинация рук + ног + тела + ...
 
Танцевать
    руки + ритм
    ноги + ритм

Танцевать танго
    (Танцевать руками + Танцевать ногами) + (танго)

Танцевать вальс
    (Танцевать) + (вальс)


Руки + танец.
Танец может быть фристайлом(просто туса), брейкданс или вальс.
Когда бот танцует ногами под вальс, у него растёт умение (ноги + вальс).
Это означает, что он всё лучше и лучше танцует вальс ногами.
При этом также прокачивается скил (ноги).
Когда бот начнет танцевать под другой танец - он быстрее его освоит.

            2  1   1         2  0   1
Танец: ( (руки + танец) + (ноги + танец) )
Вальс: (Танец)


Motor skills



# Example
- Basketball
    Handling
        Hands (to throw and bounce)
        Legs (to move)
    Endurance
        Hands (how long can throw and bounce)
        Legs (how long can move)
    Strength
        Hands (how far can throw)
        Legs (how high can jump)

- Basketball
    Hands
        Handling, Strength, Endurance
    Legs
        Handling, Strength, Endurance


Hands + Basketball
Legs + Basketball


Basketball = sport + run, jump, ball, basket
run = legs(endurance, power), breath
jump = legs(power), breath
ball = hands(endurance, power), legs(endurance), breath
basket = hands(endurance, power), breath
sport = team work, rules











Muscle (hand, leg, shoulder etc)
    Max Energy
    Charge Rate

Running
    legs.maxEnergy+++
    legs.chargeRate--
    legs.energy----
    
    torso.energy--
    torso.maxEnergy++
    torso.chargeRate-
    
    breath.energy-;
    breath.chargeRate+;


energy
    hands
    legs
    torso
fat
    hands
    legs
    torso

Fat
    growth rate




Everything is built from atoms.
That's why anything in game can be melting, boiling etc.
Atoms are similar to real world atoms in terms they are bulding blocks.
They have nucleus and shells.
Shells are filled from lower-energy to upper.
Then atoms interacts forming compounds.

E.g. ground in the game made up of tightly coupled atoms.
That's why it isn't melting or boling with common termperature and pressure.
But player could gather block of ground and split it into atoms.
Player could play with differnt atom combination or investigate the world for existed.
There are limited possible combinations.

Air is filled with compounds like x-x, y-x-y, etc.
Bot's are made up of another compounds. 
So, they could need some compounds inside to resists negative effects.

