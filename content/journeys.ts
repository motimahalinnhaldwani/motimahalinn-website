import type { ImageKey } from "./images";

export type Journey = {
  slug: string;
  name: string;
  deva: string;
  km: number;
  drive: string;
  leaveBy: string;
  season: string;
  hero: ImageKey;
  hook: string;
  summary: string;
  sections: { heading: string; body: string[] }[];
  practical: { label: string; value: string }[];
  weDo: string[];
  faqs: { q: string; a: string }[];
};

export const journeys: Journey[] = [
  {
    slug: "kainchi-dham",
    name: "Kainchi Dham",
    deva: "कैंची धाम",
    km: 38,
    drive: "1 hr 15 min",
    leaveBy: "6:00 a.m.",
    season: "All year. Avoid 15 June unless you have come for the bhandara.",
    hero: "kainchiDham",
    hook: "The 6 a.m. start. We’ll have chai ready at 5:30.",
    summary:
      "Neem Karoli Baba’s ashram sits in a fold of the Kosi valley thirty-eight kilometres above Haldwani. The road is narrow, the parking is finite, and the difference between a calm morning and three hours in a queue is when you leave.",
    sections: [
      {
        heading: "Why people come",
        body: [
          "Kainchi Dham is an ashram, not a monument. Neem Karoli Baba established it in the early 1960s on a bend of the road between Bhowali and Almora — kainchi means scissors, for the way two hairpins cross here. For thirty years it was known mostly within Kumaon.",
          "Then the Western students who had come to him in the 1970s went home and became famous, and a handful of them talked about the place in interviews. Since then the crowds have changed shape entirely. On a weekend in season you will share the courtyard with families from Delhi, students from Bengaluru, and grandmothers from two valleys over who have been coming since before any of it.",
          "What has not changed is the scale of the thing. It is small. A temple to Hanuman, a few rooms, a stream running under the road, and pine going up sharply on both sides. People sit. That is most of what happens.",
        ],
      },
      {
        heading: "The drive, honestly",
        body: [
          "Thirty-eight kilometres, and between an hour and an hour and a quarter if the road is clear. You leave Haldwani on NH-87, climb through Jyolikot, turn right at Bhowali, and follow the Almora road down into the valley.",
          "The climb begins almost immediately after Haldwani and does not really stop. It is a good road, well surfaced, and thoroughly bent. If anyone in the car is prone to motion sickness, this is the drive that will find out. Sit them in front, keep a window cracked, and do not eat a heavy breakfast before leaving.",
          "The last four kilometres are the problem. The road narrows to roughly a car and a half, the ashram parking fills by about half past eight in season, and once it is full the queue backs up the hill in both directions with nowhere to turn. This is why the departure time matters more than anything else in this guide.",
        ],
      },
      {
        heading: "When to leave",
        body: [
          "Leave Haldwani at six. You will be parked by a quarter past seven, in the courtyard by half past, and back in the car before the first wave arrives. The light in the valley at that hour is worth the alarm on its own.",
          "Leave at eight and you will probably still get in, with a walk from wherever you end up parking. Leave at ten on a Saturday in May and you should plan for the possibility of not getting in at all.",
          "The ashram generally opens around seven in the morning and closes in the evening, with a break through the middle of the day. Timings shift with the season and with festivals, so it is worth a phone call the night before — we can make it for you.",
          "One date to know: 15 June is the ashram’s annual bhandara, the anniversary of its founding. Tens of thousands of people come. The road is effectively closed to ordinary traffic and the whole valley is given over to it. If that is what you have come for, come — but come knowing.",
        ],
      },
      {
        heading: "What it costs",
        body: [
          "Nothing, to enter. There is no ticket and no queue-jumping fee, whatever anyone in the parking area tells you.",
          "A taxi from Haldwani, waiting and returning, runs somewhere in the region of ₹2,000 to ₹2,800 depending on the season and how long you want it to wait. We arrange these at a fixed rate agreed before you leave, so there is no negotiation at the other end.",
          "Prasad is given. If you would like to contribute, there is a proper donation counter inside — use that rather than anyone approaching you outside.",
        ],
      },
      {
        heading: "What to do with the rest of the day",
        body: [
          "Most people are finished at Kainchi by nine in the morning, which leaves the whole day. The sensible loop is to carry on rather than turn back.",
          "Bhowali is eight kilometres back up the hill and has a fruit market that is genuinely worth stopping at — peaches and plums in summer, apples and walnuts later in the year. From Bhowali it is twelve kilometres to Nainital, or eleven down to Bhimtal.",
          "If you have the appetite for it, Almora is about two hours further on the same road, and the drive through Kosi valley is one of the better ones in Kumaon.",
        ],
      },
      {
        heading: "What to eat",
        body: [
          "There are small tea stalls on the road below the ashram doing chai, maggi and pakoras. That is the extent of it, and it is enough for the morning.",
          "For a real meal, Bhowali has a handful of decent dhabas on the main road. Or come back down — our kitchen is open from half seven and the drive down takes an hour.",
        ],
      },
    ],
    practical: [
      { label: "Distance", value: "38 km from the hotel door" },
      { label: "Drive", value: "1 hr 15 min, all uphill, many bends" },
      { label: "Leave by", value: "6:00 a.m. in season" },
      { label: "Entry", value: "Free" },
      { label: "Taxi, return", value: "₹2,000 – ₹2,800 with waiting" },
      { label: "Time needed", value: "Half a day" },
    ],
    weDo: [
      "Chai and biscuits at 5:30 a.m., no need to ask the night before",
      "A packed breakfast to take in the car",
      "A taxi at a fixed rate agreed before you leave",
      "A phone call to confirm the ashram’s timings for your date",
      "Late checkout on the day you go, so you can shower when you get back",
    ],
    faqs: [
      {
        q: "How far is Kainchi Dham from Haldwani?",
        a: "Thirty-eight kilometres, about an hour and fifteen minutes by road via Jyolikot and Bhowali.",
      },
      {
        q: "What time should I leave Haldwani for Kainchi Dham?",
        a: "Six in the morning in season. The ashram parking fills by around half past eight and the approach road is too narrow to queue on comfortably.",
      },
      {
        q: "Is there an entry fee at Kainchi Dham?",
        a: "No. Entry is free and prasad is given. Donations go through the counter inside the ashram.",
      },
      {
        q: "Where should I stay before visiting Kainchi Dham?",
        a: "Haldwani is the usual base for an early start, since it is the last town on the plains with a full range of hotels and the drive up takes just over an hour.",
      },
    ],
  },

  {
    slug: "nainital",
    name: "Nainital",
    deva: "नैनीताल",
    km: 35,
    drive: "1 hr 30 min",
    leaveBy: "6:30 a.m.",
    season: "March to June, and October to November. December for snow, sometimes.",
    hero: "nainital",
    hook: "Thirty-five kilometres and about nine hundred metres of altitude.",
    summary:
      "The lake everyone comes for, and the town that has been managing that fact since 1841. Go early, park once, and walk.",
    sections: [
      {
        heading: "Why people come",
        body: [
          "Naini lake is a kidney-shaped body of green water sitting at 1,938 metres with a town wrapped tightly around it. On a still morning the hills come down to the water on all sides and double themselves in it. That is the picture, and it does not disappoint.",
          "The town itself is a Victorian hill station that never stopped being busy — a mall road along the north shore, boats on the water, a ropeway up to Snow View, and a temple at the Mallital end that predates the British entirely.",
          "It is not a quiet place in season. Anyone who tells you otherwise has been in October.",
        ],
      },
      {
        heading: "The drive, honestly",
        body: [
          "Thirty-five kilometres on NH-87 through Jyolikot, and roughly an hour and a half for the climb. The last stretch from Jyolikot is continuous switchbacks.",
          "Parking is the entire difficulty of a day in Nainital. The town has a finite number of spaces and in May they are gone by nine. There is a check post on the approach that closes the town to further vehicles when it is full, and on peak weekends you can be turned back at Rusi bypass and sent to park below.",
          "The answer is to be there before it happens. Leave Haldwani at half past six, be parked at Mallital by eight, and spend the day on foot — the town is small enough that you never need the car again until you leave.",
        ],
      },
      {
        heading: "What to do, in a sensible order",
        body: [
          "Start at Naina Devi temple at the Mallital end, before the queue builds. It is one of the fifty-one shaktipeeths and the reason there was a settlement here at all.",
          "Walk the Thandi Sadak along the quiet western shore rather than the Mall Road — same lake, a tenth of the people, and it takes twenty minutes end to end.",
          "Boating is best in the first two hours of the day, when the water is flat. Fix the price before you get in.",
          "The ropeway to Snow View runs from Mallital and gives you the lake from above plus, on a clear day, the Himalaya on the northern horizon. The queue at midday can be an hour; go at opening or not at all.",
          "Tiffin Top and Land’s End are a walk or a pony ride from the Ayarpatta side, and are where you go if you want the town to be small and distant for an hour.",
        ],
      },
      {
        heading: "When to go",
        body: [
          "March to June is the season, and also the crowd. April and early June are the pleasantest.",
          "October and November are the sensible choice: the air is clear, the Himalaya are visible from Snow View more days than not, and the town is returned to a manageable size.",
          "Winter is cold and occasionally white. Snow in Nainital is real but not reliable — it usually arrives in January and rarely lasts a week.",
          "The monsoon, July to September, is beautiful and problematic. The lake is full, the hills are green, and landslides close roads with very little notice. If you go, keep the plan loose.",
        ],
      },
      {
        heading: "What it costs",
        body: [
          "A return taxi from Haldwani with waiting runs roughly ₹2,200 to ₹3,000. A shared jeep from the Haldwani stand is a few hundred rupees a head and leaves when it fills.",
          "Boating is around ₹210 to ₹400 for a shared or private round of the lake, depending on the season and the boatman. The ropeway is in the region of ₹300 return for an adult. Both change; both are posted at the counter.",
          "Parking in town, if you find it, is a few hundred rupees for the day.",
        ],
      },
      {
        heading: "What to eat",
        body: [
          "Mall Road has the famous places and the prices that go with them. The bhutta and the bun-tikki carts along the lake are better value and more fun.",
          "Buy bal mithai to bring back — the chocolate-brown khoya fudge rolled in white sugar balls is Kumaon’s own, and it keeps for a few days.",
          "If you are driving back in the evening, eat here rather than there. Our kitchen runs until eleven and the drive down takes just over an hour.",
        ],
      },
    ],
    practical: [
      { label: "Distance", value: "35 km from the hotel door" },
      { label: "Drive", value: "1 hr 30 min via Jyolikot" },
      { label: "Leave by", value: "6:30 a.m. in season" },
      { label: "Altitude", value: "1,938 m" },
      { label: "Taxi, return", value: "₹2,200 – ₹3,000 with waiting" },
      { label: "Time needed", value: "A full day" },
    ],
    weDo: [
      "Breakfast from 7:30, or packed earlier if you are leaving before that",
      "A taxi at a fixed rate, agreed before you leave",
      "Honest advice on whether the parking is worth attempting on your date",
      "A room held for the night you come back down, if you decide to stay up there instead",
    ],
    faqs: [
      {
        q: "How far is Nainital from Haldwani?",
        a: "Thirty-five kilometres, about an hour and a half by road via Jyolikot.",
      },
      {
        q: "Where should I stay before going to Nainital?",
        a: "Haldwani is the last town on the plains before the climb, with rooms at a fraction of Nainital’s in-season rates and a drive of under ninety minutes. Many people stay here and go up for the day.",
      },
      {
        q: "Is parking difficult in Nainital?",
        a: "Yes, in season. Spaces are usually gone by nine in the morning and the town closes to further vehicles when full. Arriving before eight is the reliable answer.",
      },
    ],
  },

  {
    slug: "bhimtal",
    name: "Bhimtal",
    deva: "भीमताल",
    km: 25,
    drive: "50 min",
    leaveBy: "8:00 a.m.",
    season: "All year. Best October to March for still water.",
    hero: "bhimtal",
    hook: "A bigger lake than Nainital’s, with about a fifth of the people.",
    summary:
      "Twenty-five kilometres up the same road, and the easiest good day out from Haldwani. If Nainital in season sounds like hard work, come here instead.",
    sections: [
      {
        heading: "Why people come",
        body: [
          "Bhimtal’s lake is larger than Naini and considerably quieter. There is an island in the middle with an aquarium and a café on it, a dam at the southern end you can walk across, and an old Bhimeshwar temple on the bank that gives the place its name.",
          "The town around it is unremarkable, which is part of the appeal — nobody is trying to sell you very much. You come for the water, you sit by it, you have lunch, you go back.",
          "It sits at about 1,370 metres, five hundred below Nainital, which means it is warmer in winter and still pleasant in April.",
        ],
      },
      {
        heading: "The drive",
        body: [
          "Twenty-five kilometres, fifty minutes, and considerably gentler than the Nainital road. You climb from Haldwani through Kathgodam and turn off before Jyolikot.",
          "Parking is straightforward outside peak weekends. This is the day trip you can leave for at eight without consequence.",
        ],
      },
      {
        heading: "The other three lakes",
        body: [
          "Bhimtal is the anchor of a cluster, and the cluster is the reason to give it a full day rather than a morning.",
          "Sattal is four kilometres away — seven small interconnected lakes under dense oak, and the best birdwatching in the lower Kumaon by a wide margin. If anyone in the car owns binoculars, this is where they justify them.",
          "Naukuchiatal, the nine-cornered lake, is another four kilometres on. Deeper, quieter, and the local story is that if you can see all nine corners from one spot you get a wish. It is also where the paragliding operators are.",
          "Together the three make a loop of about twenty kilometres that takes a comfortable day.",
        ],
      },
      {
        heading: "What it costs",
        body: [
          "A return taxi from Haldwani is roughly ₹1,500 to ₹2,200 with waiting. Buses and shared jeeps run from the Haldwani stand through the day for well under a hundred rupees a head.",
          "Boating on Bhimtal is a few hundred rupees. The island aquarium charges a small entry. Paragliding at Naukuchiatal runs from about ₹1,800 for a short tandem flight.",
        ],
      },
      {
        heading: "What to eat",
        body: [
          "There are cafés along the Bhimtal bank with lake views and reasonable food, and the island café is pleasant if unhurried.",
          "Sattal has a couple of good spots under the trees. Naukuchiatal is thinner on options — eat before you go.",
        ],
      },
    ],
    practical: [
      { label: "Distance", value: "25 km from the hotel door" },
      { label: "Drive", value: "50 min" },
      { label: "Leave by", value: "8:00 a.m." },
      { label: "Altitude", value: "1,370 m" },
      { label: "Taxi, return", value: "₹1,500 – ₹2,200 with waiting" },
      { label: "Time needed", value: "Half a day, or a full day with Sattal and Naukuchiatal" },
    ],
    weDo: [
      "A taxi for the three-lake loop at a fixed rate",
      "A packed lunch, if you would rather eat by the water than in a café",
      "Directions to the Sattal birding trails that do not involve a guide fee",
    ],
    faqs: [
      {
        q: "How far is Bhimtal from Haldwani?",
        a: "Twenty-five kilometres, about fifty minutes by road.",
      },
      {
        q: "Is Bhimtal better than Nainital?",
        a: "It is quieter, warmer, easier to park at and has a larger lake. Nainital has the town, the ropeway and the temple. If you have one day and dislike crowds, Bhimtal is the better use of it.",
      },
    ],
  },

  {
    slug: "mukteshwar",
    name: "Mukteshwar",
    deva: "मुक्तेश्वर",
    km: 65,
    drive: "2 hr 30 min",
    leaveBy: "7:00 a.m.",
    season: "October to April for Himalayan views. March and April for the orchards.",
    hero: "mukteshwar",
    hook: "The furthest of the easy days, and the one with the Himalaya in it.",
    summary:
      "Sixty-five kilometres and two and a half hours, at 2,286 metres. On a clear winter morning you can see Nanda Devi, Trishul and the Panchachuli from a cliff edge with a railing and not much else.",
    sections: [
      {
        heading: "Why people come",
        body: [
          "Mukteshwar is a ridge with a temple on it, an old colonial research institute beside it, and a view north that is the reason anyone makes the drive.",
          "The Mukteshwar Dham is a small Shiva temple at the highest point, reached by a flight of steps. Beside it is Chauli ki Jali — a rock cliff dropping away several hundred feet, with a gap in the stone that people climb through. The railing is adequate. The drop is not to be treated casually, particularly with children.",
          "The Indian Veterinary Research Institute has been here since 1893 and its campus, with its stone buildings and deodar, is a large part of the character of the place.",
          "On a clear day, and clear days are a winter phenomenon here, the northern horizon carries Nanda Devi, Trishul, Nanda Kot and the Panchachuli ridge. It is the closest an easy day trip from the plains gets you to the high Himalaya.",
        ],
      },
      {
        heading: "The drive",
        body: [
          "Sixty-five kilometres, and allow two and a half hours honestly rather than the two that a map will promise. You climb via Bhowali and Bhimtal, then take the road through Ramgarh.",
          "The Ramgarh stretch is the good part — orchards on both sides, apricot and plum and peach, and in March and April the whole hillside is in blossom. Ramgarh is worth a stop for that alone.",
          "The last fifteen kilometres are narrow and slow. This is a drive for a confident driver in daylight. Do not attempt to come back down after dark if you can avoid it.",
        ],
      },
      {
        heading: "When to go",
        body: [
          "October to early December, and February to April. These are the months the air is clear enough for the mountains to show themselves.",
          "In summer the haze usually closes the view entirely — you will have a pleasant cool day at 2,286 metres and see nothing north of the nearest ridge. In the monsoon, do not plan on it at all.",
          "Whatever the month, the view is a morning thing. Cloud builds from about eleven. Being at Chauli ki Jali by nine is the difference between the drive being worth it and not.",
        ],
      },
      {
        heading: "What it costs",
        body: [
          "A return taxi with waiting is roughly ₹3,000 to ₹4,000 — this is a long day for a driver and the rate reflects it. There is no sensible public transport option for a day trip.",
          "There is no entry fee at the temple or the cliff. Parking is a small charge.",
          "Adventure operators near Chauli ki Jali run rappelling and rock climbing from about ₹500 to ₹1,500 a person.",
        ],
      },
      {
        heading: "What to eat",
        body: [
          "There are a few cafés near the temple and on the approach road, some of them with better views than food. It is a pleasant place to sit with a coffee.",
          "Buy fruit in Ramgarh on the way through in season. Apricots in June, peaches in July, apples from September.",
        ],
      },
    ],
    practical: [
      { label: "Distance", value: "65 km from the hotel door" },
      { label: "Drive", value: "2 hr 30 min via Bhowali and Ramgarh" },
      { label: "Leave by", value: "7:00 a.m." },
      { label: "Altitude", value: "2,286 m" },
      { label: "Taxi, return", value: "₹3,000 – ₹4,000 with waiting" },
      { label: "Time needed", value: "A full day, leaving early" },
    ],
    weDo: [
      "Breakfast from 7:30, or packed if you want to be on the road before it",
      "A taxi with a driver who has done the Ramgarh road before",
      "An honest read on the visibility for your date — if the haze is in, we will tell you and suggest Bhimtal instead",
    ],
    faqs: [
      {
        q: "Can you see the Himalaya from Mukteshwar?",
        a: "Yes, on clear days between roughly October and April — Nanda Devi, Trishul and the Panchachuli range. Summer haze usually closes the view. Mornings are far more reliable than afternoons.",
      },
      {
        q: "How long is the drive from Haldwani to Mukteshwar?",
        a: "Sixty-five kilometres and about two and a half hours, via Bhowali and Ramgarh.",
      },
    ],
  },

  {
    slug: "jim-corbett",
    name: "Jim Corbett",
    deva: "जिम कॉर्बेट",
    km: 70,
    drive: "2 hr",
    leaveBy: "4:30 a.m. for a morning safari",
    season: "November to June. Dhikala and Bijrani close in the monsoon; Jhirna and Dhela stay open.",
    hero: "corbett",
    hook: "Seventy kilometres west, and a different landscape entirely.",
    summary:
      "India’s oldest national park, two hours from the door along the Terai. The safari is bookable, the permit is not optional, and the zone you get decides your day.",
    sections: [
      {
        heading: "Why people come",
        body: [
          "Corbett was established in 1936 and is the oldest national park in India. It covers roughly 1,300 square kilometres of sal forest, grassland and riverbed along the Ramganga, and it holds one of the densest tiger populations anywhere.",
          "You may see a tiger. Most visitors do not, and a day built entirely around that hope tends to disappoint. What you will certainly see is elephant, spotted and sambar deer, langur, a very large number of birds, and — if you are lucky and quiet — gharial or otter on the river.",
          "The forest itself is the thing. Sal running to eighty feet, grassland the colour of wheat, and the Himalayan foothills standing behind all of it.",
        ],
      },
      {
        heading: "The zones, which matter more than anything",
        body: [
          "Corbett is not one gate. It is divided into tourism zones and the one you get changes the day completely.",
          "Bijrani is the closest to Ramnagar and the usual choice for a day safari from outside — mixed forest and grassland, good sightings, easy to reach.",
          "Jhirna and Dhela stay open through the year, including the monsoon when the rest closes. Drier, more open scrub, good for elephant.",
          "Dhikala is the famous one, deep inside on the Ramganga reservoir. Day entry is restricted; realistically it requires a night at the forest rest house, which books out months ahead.",
          "Durga Devi is the hilly northeastern zone, quieter, best for birds and for the river. Sitabani is a buffer outside the core — no permit lottery, no tigers to speak of, and genuinely lovely if you just want to be in the forest.",
        ],
      },
      {
        heading: "Permits and timing",
        body: [
          "Safari permits are issued through the Uttarakhand forest department’s online system and sell out for the popular zones well in advance, particularly for weekends and holidays. This is not a thing to arrange on the morning.",
          "Two slots a day: a morning one starting around first light, and an afternoon one from around two. Morning is better for sightings and worse for sleep.",
          "For a morning safari from Haldwani you are leaving at half past four to reach the Ramnagar gate for reporting. It is a real commitment. Many people prefer to stay a night at Ramnagar, and we will say so rather than sell you a room we do not think you should take.",
          "Carry photo ID matching the permit. It is checked at the gate and there is no negotiating it.",
        ],
      },
      {
        heading: "What it costs",
        body: [
          "A shared jeep safari runs roughly ₹2,000 to ₹3,000 a head including permit, guide and vehicle. A private jeep is in the region of ₹6,000 to ₹9,000 for the vehicle. Canter safaris into Dhikala are cheaper per head and considerably less flexible.",
          "Indian and foreign national rates differ. All of these figures move with the season — treat them as a shape, not a quote.",
          "A taxi from Haldwani to the gate and back, with the waiting a safari requires, is roughly ₹3,500 to ₹4,500.",
        ],
      },
      {
        heading: "What to bring",
        body: [
          "Layers. A November morning in an open jeep at first light is genuinely cold, and by ten you will be in a shirt.",
          "Binoculars if you own them. Muted clothing. No perfume. Nothing in plastic you might drop.",
          "A thermos. We will fill it before you leave.",
        ],
      },
    ],
    practical: [
      { label: "Distance", value: "70 km to Ramnagar" },
      { label: "Drive", value: "2 hr" },
      { label: "Leave by", value: "4:30 a.m. for a morning safari" },
      { label: "Permit", value: "Online, in advance. Photo ID checked at the gate." },
      { label: "Safari, shared", value: "₹2,000 – ₹3,000 a head" },
      { label: "Time needed", value: "A full day, or a night at Ramnagar" },
    ],
    weDo: [
      "A 4:00 a.m. flask of chai and something to eat in the car",
      "A taxi arranged the night before at a fixed rate",
      "Help with the permit booking, if you have left it late enough to need it",
      "An honest answer about whether to stay here or at Ramnagar for your dates",
    ],
    faqs: [
      {
        q: "How far is Jim Corbett from Haldwani?",
        a: "About seventy kilometres to the Ramnagar gate, roughly two hours by road.",
      },
      {
        q: "Can I do a Corbett safari as a day trip from Haldwani?",
        a: "Yes for the afternoon slot, and yes for the morning slot if you are willing to leave at half past four. For Dhikala specifically, a night inside the park is effectively required.",
      },
      {
        q: "Do I need to book a Corbett safari permit in advance?",
        a: "Yes. Permits are issued online and the popular zones sell out well ahead, particularly on weekends and in the holiday season.",
      },
    ],
  },
];

export const journeyBySlug = (slug: string) => journeys.find((j) => j.slug === slug);
